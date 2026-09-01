import { i as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { a as getArticle, n as ARTICLES_EN, s as retrieveForRag } from "./search-D6Ts0OEn.mjs";
import { r as getSql } from "./db-BE1y4DGW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnose-C-RsVXAY.js
var CAT_ZH = {
	soil: "更像土壤问题",
	pest_disease: "更像病害虫",
	pesticide_injury: "更像药害",
	not_enough: "信息不够"
};
var CAT_EN = {
	soil: "More like a soil problem",
	pest_disease: "More like pest / disease",
	pesticide_injury: "More like spray injury",
	not_enough: "Not enough information"
};
function mapProb(raw, lang) {
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
function mapCategory(raw, lang) {
	const s = String(raw ?? "").toLowerCase();
	const table = lang === "en" ? CAT_EN : CAT_ZH;
	if (s.includes("pest") || s.includes("disease") || s.includes("病害") || s.includes("虫")) return table.pest_disease;
	if (s.includes("pesticide") || s.includes("spray") || s.includes("药害")) return table.pesticide_injury;
	if (s.includes("not_enough") || s.includes("不够") || s.includes("information")) return table.not_enough;
	if (s.includes("soil") || s.includes("土壤")) return table.soil;
	if (table[s]) return table[s];
	return table.soil;
}
function capImages(images) {
	const out = [];
	let total = 0;
	const per = 72e4;
	const all = 22e5;
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
function disclaimer(lang) {
	return lang === "en" ? "Diagnosis is for learning only. It does not replace a local agronomist or a lab test." : "诊断结果仅供学习参考，不能替代专业农技指导。严重问题请咨询当地农技站或进行土壤检测。";
}
function shortRef(slug, lang) {
	const en = ARTICLES_EN[slug];
	const a = getArticle(slug);
	if (!a) return "";
	if (lang === "en" && en) return `slug:${slug}\n${en.title}\n${en.summary ?? ""}\n${en.plainExplain ?? ""}\n${en.fieldCheck ?? ""}\n${(en.dontDo ?? []).join("；")}`;
	return `slug:${slug}\n${a.title}\n${a.summary}\n${a.causes.plainExplain}\n${a.fieldCheck ?? ""}\n${(a.dontDo ?? []).join("；")}`;
}
function parseResult(text, relatedSlugs, lang) {
	const jsonMatch = text.replace(/```json|```/g, "").trim().match(/\{[\s\S]*\}/);
	if (!jsonMatch) return null;
	try {
		const raw = JSON.parse(jsonMatch[0]);
		const diagnoses = (Array.isArray(raw.diagnoses) ? raw.diagnoses : []).filter((d) => Boolean(d) && typeof d === "object").map((d) => ({
			name: String(d.name ?? ""),
			probability: mapProb(d.probability, lang),
			summary: String(d.summary ?? ""),
			sourceSlug: d.sourceSlug && getArticle(String(d.sourceSlug)) ? String(d.sourceSlug) : void 0
		})).filter((d) => d.name);
		const slugs = (Array.isArray(raw.relatedSlugs) ? raw.relatedSlugs.map(String) : relatedSlugs).filter((s) => Boolean(getArticle(s))).slice(0, 4);
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
			labNotes: raw.labNotes ? String(raw.labNotes) : void 0,
			causes: (Array.isArray(raw.causes) ? raw.causes.map(String) : []).slice(0, 6),
			relatedSlugs: slugs.length ? slugs : relatedSlugs,
			needLabTest: Boolean(raw.needLabTest),
			disclaimer: disclaimer(lang),
			followUp: raw.followUp ? String(raw.followUp) : void 0,
			fromAi: true
		};
	} catch {
		return null;
	}
}
function rawAsResult(text, relatedSlugs, lang) {
	const clean = text.replace(/```json|```/g, "").trim();
	return {
		category: lang === "en" ? "More like a soil problem" : "更像土壤问题",
		analysis: clean.slice(0, 4e3) || (lang === "en" ? "The read came back empty." : "这次没有返回文字。"),
		seen: [],
		diagnoses: [],
		dont: [],
		next: [],
		causes: [],
		relatedSlugs,
		needLabTest: true,
		disclaimer: disclaimer(lang),
		fromAi: true
	};
}
async function callGrok(apiKey, body) {
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(6e4)
	});
	if (!res.ok) return {
		ok: false,
		status: res.status
	};
	return {
		ok: true,
		text: (await res.json()).choices?.[0]?.message?.content ?? ""
	};
}
var diagnoseSoil_createServerFn_handler = createServerRpc({
	id: "a29cfa2c77164a6d97b20c71f1e3255dc6e98cfdee831aafc853a32032476348",
	name: "diagnoseSoil",
	filename: "src/lib/server/diagnose.ts"
}, (opts) => diagnoseSoil.__executeServer(opts));
var diagnoseSoil = createServerFn({ method: "POST" }).validator((input) => input).handler(diagnoseSoil_createServerFn_handler, async ({ data }) => {
	const lang = data.lang === "en" ? "en" : "zh";
	const question = (data.question ?? "").trim();
	const images = capImages(data.images ?? []);
	const history = (data.history ?? []).slice(-6);
	if (question.length < 1 && images.length === 0 && history.length === 0) return {
		ok: false,
		error: lang === "en" ? "Take at least one photo, or write a few lines." : "请拍至少一张照片，或写几句现象。"
	};
	const labBits = [
		data.labText,
		data.ph && `pH=${data.ph}`,
		data.ec && `EC=${data.ec}`,
		data.om && (lang === "en" ? `organic matter=${data.om}` : `有机质=${data.om}`),
		data.n && `N=${data.n}`,
		data.p && `P=${data.p}`,
		data.k && `K=${data.k}`
	].filter(Boolean).join(" ");
	const ragQuery = [
		question,
		data.crop,
		data.region,
		data.fertilizer,
		data.stage,
		labBits
	].filter(Boolean).join(" ") || "soil 土壤";
	const retrieved = retrieveForRag(ragQuery, 8);
	const slugs = retrieved.map((a) => a.slug);
	const refs = retrieved.map((a) => shortRef(a.slug, lang)).filter(Boolean).join("\n\n----\n\n");
	(async () => {
		try {
			await (await getSql())`insert into diagnose_logs (question, has_image) values (${question.slice(0, 500) || "(photo)"}, ${images.length > 0})`;
		} catch {}
	})();
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: lang === "en" ? "This read isn’t available right now." : "这次对照暂时不可用。"
	};
	const system = `You are the field agronomist for Tuzhi (土知). A farmer sent photos and notes.
LOOK AT THE PHOTOS FIRST. Say what you actually see: leaf position (new vs old), colour pattern, soil surface (white crust, crust, puddle, cracks), roots if visible, whether a lab sheet is in the frame.
Then name the most likely problem(s) with confidence. The handbook has 100 distinct field guides — pick sourceSlug from the snippets. Do not collapse “acid soil / lime / aluminium / tea-lime” into one answer; they are different jobs. Do not copy snippets as the answer, and do not ignore the photos.
Split soil trouble from pest/disease and from spray injury.
Rules of thumb:
- New leaves yellow, veins green → iron/sulfur/spray, not nitrogen
- Old leaves evenly yellow, new leaves greener → nitrogen more likely
- Margin scorch + white crust → salt / fertiliser burn, not “just drought”
- Twist/mottle 1–3 days after a spray → spray injury
- Patchy death, black roots, pinched stem → soil-borne disease before “just acid”
- Wilt by day, recover at night, wet soil → waterlog / root rot
- If lab numbers exist, read pH / EC / OM / NPK first and fill labNotes
Do not invent pesticide brand names. Do not write illegal or highly toxic recipes. If photos are weak, say so.
Reply in ${lang === "en" ? "English" : "简体中文，大白话"}, spoken language a farmer understands.
Output ONLY a JSON object:
{"category":"soil|pest_disease|pesticide_injury|not_enough","analysis":"2-6 sentences of what you see and why","seen":["visual evidence"],"diagnoses":[{"name":"","probability":"high|medium|low","summary":"","sourceSlug":"optional-slug"}],"dont":[""],"next":[""],"labNotes":"","causes":[""],"relatedSlugs":["slug"],"needLabTest":true,"followUp":"one short question to ask the farmer"}
Handbook snippets (reference, not a script):
${refs || "(none matched)"}`;
	const parts = [{
		type: "text",
		text: [
			lang === "en" ? `Farmer notes: ${question || "(look at the photos)"}` : `农户描述：${question || "（主要看照片）"}`,
			data.crop ? lang === "en" ? `Crop: ${data.crop}` : `作物：${data.crop}` : "",
			data.region ? lang === "en" ? `Region: ${data.region}` : `地区：${data.region}` : "",
			data.stage ? lang === "en" ? `Stage: ${data.stage}` : `生育期：${data.stage}` : "",
			data.fertilizer ? lang === "en" ? `Recent fertiliser: ${data.fertilizer}` : `近期施肥：${data.fertilizer}` : "",
			labBits ? lang === "en" ? `Numbers the farmer typed: ${labBits}` : `农户填写的化验数字：${labBits}` : "",
			images.length ? lang === "en" ? `${images.length} photo(s) attached (may include a lab sheet).` : `附照片 ${images.length} 张（可能含化验单）` : lang === "en" ? "No photo." : "无照片"
		].filter(Boolean).join("\n")
	}];
	for (const url of images) parts.push({
		type: "image_url",
		image_url: { url }
	});
	const messages = [{
		role: "system",
		content: system
	}];
	for (const turn of history) messages.push({
		role: turn.role,
		content: turn.text
	});
	messages.push({
		role: "user",
		content: parts
	});
	const payload = {
		model: "grok-4.5",
		temperature: .3,
		max_tokens: 2500,
		response_format: { type: "json_object" },
		messages
	};
	const busy = lang === "en" ? "That read didn’t come back. Try again." : "这次没对照上。请再试一次。";
	try {
		let call = await callGrok(apiKey, payload);
		if (!call.ok && (call.status === 429 || call.status >= 500)) call = await callGrok(apiKey, payload);
		if (!call.ok && call.status === 400) {
			const { response_format: _fmt, ...rest } = payload;
			call = await callGrok(apiKey, rest);
		}
		if (!call.ok) return {
			ok: false,
			error: busy
		};
		const parsed = parseResult(call.text, slugs, lang) ?? rawAsResult(call.text, slugs, lang);
		if (!parsed.labNotes && labBits) parsed.labNotes = lang === "en" ? `Farmer typed: ${labBits}` : `农户手填：${labBits}`;
		if (!parsed.relatedSlugs.length) parsed.relatedSlugs = slugs;
		return {
			ok: true,
			result: parsed
		};
	} catch {
		return {
			ok: false,
			error: busy
		};
	}
});
//#endregion
export { diagnoseSoil_createServerFn_handler };
