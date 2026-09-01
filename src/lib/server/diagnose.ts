import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { getArticle, hardRoute, retrieveForRag } from "@/lib/knowledge/search";
import { ARTICLES_EN } from "@/lib/i18n/articles-en";
import type { Lang } from "@/lib/i18n/lang";

export type DiagnoseCategory = "更像土壤问题" | "更像病害虫" | "更像药害" | "信息不够" | "More like a soil problem" | "More like pest / disease" | "More like spray injury" | "Not enough information";

export type DiagnoseResult = {
  category: string;
  analysis: string;
  seen: string[];
  diagnoses: { name: string; probability: string; summary: string; sourceSlug?: string }[];
  dont: string[];
  next: string[];
  labNotes?: string;
  causes: string[];
  relatedSlugs: string[];
  needLabTest: boolean;
  disclaimer: string;
  followUp?: string;
  fromAi: boolean;
};

export type ChatTurn = { role: "user" | "assistant"; text: string };

export type DiagnosePayload = {
  question: string;
  images?: string[];
  crop?: string;
  region?: string;
  stage?: string;
  fertilizer?: string;
  labText?: string;
  ph?: string;
  ec?: string;
  om?: string;
  n?: string;
  p?: string;
  k?: string;
  lang?: Lang;
  history?: ChatTurn[];
};

const CAT_ZH: Record<string, string> = {
  soil: "更像土壤问题",
  pest_disease: "更像病害虫",
  pesticide_injury: "更像药害",
  not_enough: "信息不够",
};
const CAT_EN: Record<string, string> = {
  soil: "More like a soil problem",
  pest_disease: "More like pest / disease",
  pesticide_injury: "More like spray injury",
  not_enough: "Not enough information",
};

function mapProb(raw: unknown, lang: Lang): string {
  const s = String(raw ?? "").toLowerCase();
  if (lang === "en") {
    if (s.includes("high") || s.includes("高")) return "high";
    if (s.includes("low") || s.includes("低")) return "low";
    if (s.includes("medium") || s.includes("中")) return "medium";
    return s || "medium";
  }
  if (s.includes("high") || s.includes("高")) return "高";
  if (s.includes("low") || s.includes("低")) return "低";
  if (s.includes("medium") || s.includes("中")) return "中";
  return s || "中";
}

function mapCategory(raw: unknown, lang: Lang): string {
  const s = String(raw ?? "").toLowerCase();
  const table = lang === "en" ? CAT_EN : CAT_ZH;
  if (s.includes("pest") || s.includes("disease") || s.includes("病害") || s.includes("虫")) return table.pest_disease;
  if (s.includes("pesticide") || s.includes("spray") || s.includes("药害")) return table.pesticide_injury;
  if (s.includes("not_enough") || s.includes("不够") || s.includes("information")) return table.not_enough;
  if (s.includes("soil") || s.includes("土壤")) return table.soil;
  if (table[s]) return table[s];
  return table.soil;
}

function ragFallback(slugs: string[], lang: Lang, question: string): DiagnoseResult {
  const articles = slugs.map(getArticle).filter((a): a is NonNullable<typeof a> => Boolean(a));
  const top = articles[0];
  const titleOf = (slug: string) => {
    if (lang === "en") return ARTICLES_EN[slug]?.title ?? getArticle(slug)?.title ?? slug;
    return getArticle(slug)?.title ?? slug;
  };
  const summaryOf = (slug: string) => {
    if (lang === "en") return ARTICLES_EN[slug]?.summary ?? getArticle(slug)?.summary ?? "";
    return getArticle(slug)?.summary ?? "";
  };
  return {
    category: lang === "en" ? CAT_EN.soil : CAT_ZH.soil,
    analysis:
      lang === "en"
        ? `Photo model didn’t return. From the notes (“${question.slice(0, 40)}”), start with ${titleOf(top?.slug ?? "")}. Check which leaves, the roots and the soil surface before you fertilise.`
        : `这次照片对照没回来。按你写的「${question.slice(0, 40)}」，先对照「${titleOf(top?.slug ?? "")}」。下地先看叶位、根和土面，再决定测土。`,
    seen: [question.slice(0, 80)].filter(Boolean),
    diagnoses: articles.slice(0, 3).map((a, i) => ({
      name: titleOf(a.slug),
      probability: i === 0 ? mapProb("high", lang) : mapProb("medium", lang),
      summary: summaryOf(a.slug),
      sourceSlug: a.slug,
    })),
    dont: [lang === "en" ? "Don’t dump fertiliser from leaf colour alone." : "不要只看叶子就猛下肥。"],
    next: [lang === "en" ? "Open the related guide, then test 0–20 cm if it still doesn’t fit." : "先打开相关知识条对照，对不上再取 0～20 厘米测土。"],
    causes: [],
    relatedSlugs: slugs.slice(0, 4),
    needLabTest: true,
    disclaimer: disclaimer(lang),
    followUp: lang === "en" ? "Did you look at the roots and the soil surface?" : "根和土面看了没有？",
    fromAi: false,
  };
}

function capImages(images: string[]): string[] {
  const out: string[] = [];
  let total = 0;
  const per = 720_000;
  const all = 2_200_000;
  for (const img of images) {
    if (!img.startsWith("data:image/")) continue;
    if (out.length >= 4) break;
    if (img.length > per) continue;
    if (total + img.length > all) break;
    out.push(img);
    total += img.length;
  }
  return out;
}

function disclaimer(lang: Lang): string {
  return lang === "en"
    ? "Diagnosis is for learning only. It does not replace a local agronomist or a lab test."
    : "诊断结果仅供学习参考，不能替代专业农技指导。严重问题请咨询当地农技站或进行土壤检测。";
}

function shortRef(slug: string, lang: Lang): string {
  const en = ARTICLES_EN[slug];
  const a = getArticle(slug);
  if (!a) return "";
  if (lang === "en" && en) {
    return `slug:${slug}\n${en.title}\n${en.summary ?? ""}\n${en.plainExplain ?? ""}\n${en.fieldCheck ?? ""}\n${(en.dontDo ?? []).join("；")}`;
  }
  return `slug:${slug}\n${a.title}\n${a.summary}\n${a.causes.plainExplain}\n${a.fieldCheck ?? ""}\n${(a.dontDo ?? []).join("；")}`;
}

function parseResult(text: string, relatedSlugs: string[], lang: Lang): DiagnoseResult | null {
  const stripped = text.replace(/```json|```/g, "").trim();
  const jsonMatch = stripped.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const raw = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
    const list = Array.isArray(raw.diagnoses) ? raw.diagnoses : [];
    const diagnoses = list
      .filter((d): d is Record<string, unknown> => Boolean(d) && typeof d === "object")
      .map((d) => ({
        name: String(d.name ?? ""),
        probability: mapProb(d.probability, lang),
        summary: String(d.summary ?? ""),
        sourceSlug: d.sourceSlug && getArticle(String(d.sourceSlug)) ? String(d.sourceSlug) : undefined,
      }))
      .filter((d) => d.name);
    const aiSlugs = Array.isArray(raw.relatedSlugs) ? raw.relatedSlugs.map(String) : [];
    const slugs = [...new Set([...relatedSlugs.slice(0, 3), ...aiSlugs])]
      .filter((s) => Boolean(getArticle(s)))
      .slice(0, 4);
    const dont = Array.isArray(raw.dont) ? raw.dont.map(String) : [];
    const next = Array.isArray(raw.next) ? raw.next.map(String) : [];
    const seen = Array.isArray(raw.seen) ? raw.seen.map(String) : [];
    const analysis = String(raw.analysis ?? "").trim();
    if (!analysis && !diagnoses.length) return null;
    return {
      category: mapCategory(raw.category ?? raw.kind, lang),
      analysis: analysis || diagnoses[0]?.summary || "",
      seen: seen.slice(0, 8),
      diagnoses: diagnoses.slice(0, 4),
      dont: dont.slice(0, 6),
      next: next.slice(0, 6),
      labNotes: raw.labNotes ? String(raw.labNotes) : undefined,
      causes: (Array.isArray(raw.causes) ? raw.causes.map(String) : []).slice(0, 6),
      relatedSlugs: slugs.length ? slugs : relatedSlugs,
      needLabTest: Boolean(raw.needLabTest),
      disclaimer: disclaimer(lang),
      followUp: raw.followUp ? String(raw.followUp) : undefined,
      fromAi: true,
    };
  } catch {
    return null;
  }
}

function rawAsResult(text: string, relatedSlugs: string[], lang: Lang): DiagnoseResult {
  const clean = text.replace(/```json|```/g, "").trim();
  return {
    category: lang === "en" ? "More like a soil problem" : "更像土壤问题",
    analysis: clean.slice(0, 4000) || (lang === "en" ? "The read came back empty." : "这次没有返回文字。"),
    seen: [],
    diagnoses: [],
    dont: [],
    next: [],
    causes: [],
    relatedSlugs,
    needLabTest: true,
    disclaimer: disclaimer(lang),
    fromAi: true,
  };
}

async function callGrok(apiKey: string, body: unknown): Promise<{ ok: true; text: string } | { ok: false; status: number }> {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) return { ok: false, status: res.status };
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return { ok: true, text: json.choices?.[0]?.message?.content ?? "" };
}

export const diagnoseSoil = createServerFn({ method: "POST" })
  .validator((input: DiagnosePayload) => input)
  .handler(async ({ data }): Promise<{ ok: true; result: DiagnoseResult } | { ok: false; error: string }> => {
    const lang: Lang = data.lang === "en" ? "en" : "zh";
    const question = (data.question ?? "").trim();
    const images = capImages(data.images ?? []);
    const history = (data.history ?? []).slice(-6);
    if (question.length < 1 && images.length === 0 && history.length === 0) {
      return { ok: false, error: lang === "en" ? "Take at least one photo, or write a few lines." : "请拍至少一张照片，或写几句现象。" };
    }

    const labBits = [
      data.labText,
      data.ph && `pH=${data.ph}`,
      data.ec && `EC=${data.ec}`,
      data.om && (lang === "en" ? `organic matter=${data.om}` : `有机质=${data.om}`),
      data.n && `N=${data.n}`,
      data.p && `P=${data.p}`,
      data.k && `K=${data.k}`,
    ]
      .filter(Boolean)
      .join(" ");

    const ragQuery = [question, data.crop, data.region, data.fertilizer, data.stage, labBits].filter(Boolean).join(" ") || "soil 土壤";
    const retrieved = retrieveForRag(ragQuery, 8);
    const slugs = retrieved.map((a) => a.slug);
    const refs = retrieved.map((a) => shortRef(a.slug, lang)).filter(Boolean).join("\n\n----\n\n");

    void (async () => {
      try {
        const sql = await getSql();
        await sql`insert into diagnose_logs (question, has_image) values (${question.slice(0, 500) || "(photo)"}, ${images.length > 0})`;
      } catch {
        /* ignore */
      }
    })();

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: true, result: ragFallback(slugs, lang, question) };
    }

    const speak = lang === "en" ? "English, spoken, like talking in the field" : "简体中文，像蹲在地头跟农民说话，短句，用人话";
    const hard = hardRoute(ragQuery);
    const hardLine = hard
      ? lang === "en"
        ? `HARD ROUTE: this note matches “${hard.labelEn}”. First sourceSlug MUST be ${hard.slugs[0]}. Do NOT call it nitrogen unless the farmer described old leaves evenly yellow with greener new leaves and no green veins on new leaves.`
        : `硬规则：这段描述更像「${hard.labelZh}」。diagnoses[0].sourceSlug 必须是 ${hard.slugs[0]}。不要判成缺氮，除非农户说的是下部老叶匀黄、新叶还绿、而且新叶不是脉绿。`
      : "";
    const system = `You are Li Zeyu on the field for Tuzhi (土知). A farmer sent photos and notes.
LOOK AT THE PHOTOS FIRST. Say what you actually see in spoken language: which leaves (new vs old), colour pattern, soil surface (white crust, hard cap, puddle, cracks), roots if visible, lab sheet if in frame.
Then name the most likely problem with confidence. Pick sourceSlug from the handbook snippets. Do not collapse acid / lime / aluminium / tea-lime into one job.
Split soil trouble from pest/disease and from spray injury.
${hardLine}
Decision tree (must follow):
- New leaves yellow, veins still green → iron (or high pH locking iron), NOT nitrogen
- Old leaves evenly yellow, new leaves greener, roots white → nitrogen more likely
- Margin scorch + white crust / recent compound fertiliser → salt or fertiliser burn, not drought
- Wilt by day, recover at night, wet soil or standing water → waterlog, not drought, not nitrogen
- Brown bald root tips + rusty water → acid / aluminium, not “just hungry”
- Twist/mottle 1–3 days after a spray → spray injury
- Patchy death, knots or brown stem pipes → soil-borne / nematode before “just acid”
If lab numbers exist, read pH / EC / OM / NPK first and fill labNotes.
Do not invent pesticide brand names. Do not write illegal recipes. If photos are weak, say so.
Reply in ${speak}. Short sentences. No textbook tone.
Output ONLY a JSON object:
{"category":"soil|pest_disease|pesticide_injury|not_enough","analysis":"2-6 spoken sentences of what you see and why","seen":["visual evidence"],"diagnoses":[{"name":"","probability":"high|medium|low","summary":"","sourceSlug":"optional-slug"}],"dont":[""],"next":[""],"labNotes":"","causes":[""],"relatedSlugs":["slug"],"needLabTest":true,"followUp":"one short question to ask the farmer"}
Handbook snippets (reference, not a script):
${refs || "(none matched)"}`;

    const userText = [
      lang === "en" ? `Farmer notes: ${question || "(look at the photos)"}` : `农户描述：${question || "（主要看照片）"}`,
      data.crop ? (lang === "en" ? `Crop: ${data.crop}` : `作物：${data.crop}`) : "",
      data.region ? (lang === "en" ? `Region: ${data.region}` : `地区：${data.region}`) : "",
      data.stage ? (lang === "en" ? `Stage: ${data.stage}` : `生育期：${data.stage}`) : "",
      data.fertilizer ? (lang === "en" ? `Recent fertiliser: ${data.fertilizer}` : `近期施肥：${data.fertilizer}`) : "",
      labBits ? (lang === "en" ? `Numbers the farmer typed: ${labBits}` : `农户填写的化验数字：${labBits}`) : "",
      images.length
        ? lang === "en"
          ? `${images.length} photo(s) attached (may include a lab sheet).`
          : `附照片 ${images.length} 张（可能含化验单）`
        : lang === "en"
          ? "No photo."
          : "无照片",
    ]
      .filter(Boolean)
      .join("\n");

    type Part = { type: "text"; text: string } | { type: "image_url"; image_url: { url: string } };
    const parts: Part[] = [{ type: "text", text: userText }];
    for (const url of images) parts.push({ type: "image_url", image_url: { url } });

    const messages: Array<{ role: string; content: unknown }> = [{ role: "system", content: system }];
    for (const turn of history) {
      messages.push({ role: turn.role, content: turn.text });
    }
    messages.push({ role: "user", content: parts });

    const payload = {
      model: "grok-4.5",
      temperature: 0.15,
      max_tokens: 1800,
      response_format: { type: "json_object" },
      messages,
    };

    try {
      let call = await callGrok(apiKey, payload);
      if (!call.ok && call.status >= 500) {
        call = await callGrok(apiKey, payload);
      }
      if (!call.ok && call.status === 400) {
        const { response_format: _fmt, ...rest } = payload;
        call = await callGrok(apiKey, rest);
      }
      if (!call.ok) return { ok: true, result: ragFallback(slugs, lang, question) };
      const parsed = parseResult(call.text, slugs, lang) ?? rawAsResult(call.text, slugs, lang);
      if (!parsed.labNotes && labBits) {
        parsed.labNotes = lang === "en" ? `Farmer typed: ${labBits}` : `农户手填：${labBits}`;
      }
      if (!parsed.relatedSlugs.length) parsed.relatedSlugs = slugs;
      if (hard) {
        parsed.relatedSlugs = [...new Set([...hard.slugs, ...parsed.relatedSlugs])].filter((s) => Boolean(getArticle(s))).slice(0, 4);
        const top = hard.slugs[0];
        const hit = parsed.diagnoses.some((d) => d.sourceSlug === top || d.name.includes(hard.labelZh) || d.name.toLowerCase().includes(hard.labelEn));
        const wronglyN =
          hard.labelZh !== "缺氮" &&
          parsed.diagnoses.some((d) => d.sourceSlug === "que-dan" || /缺氮|nitrogen/i.test(`${d.name}${d.summary}`));
        if (!hit || wronglyN) {
          const art = getArticle(top);
          parsed.diagnoses = [
            {
              name: lang === "en" ? hard.labelEn : hard.labelZh,
              probability: lang === "en" ? "high" : "高",
              summary: lang === "en" ? (ARTICLES_EN[top]?.summary ?? art?.summary ?? "") : (art?.summary ?? ""),
              sourceSlug: top,
            },
            ...parsed.diagnoses.filter((d) => d.sourceSlug !== "que-dan" && d.sourceSlug !== top),
          ].slice(0, 4);
        }
      }
      return { ok: true, result: parsed };
    } catch {
      return { ok: true, result: ragFallback(slugs, lang, question) };
    }
  });
