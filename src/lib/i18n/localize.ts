import { TERMS, indicatorView } from "@/lib/encyclopedia";
import type { Article } from "@/lib/knowledge/types";
import { ARTICLES_EN } from "./articles-en";
import { ARTICLES_EN_LONG } from "./articles-en-long";
import type { Lang } from "./lang";
import { labelOf } from "./lexicon";

const CAPTION_EN = "Diagram only — don’t fertilise from this photo alone.";

const PHRASE: [RegExp, string][] = [
  [/示意图，不能单凭此图下肥。?/g, CAPTION_EN],
  [/示意图/g, "diagram"],
  [/请对照自家地/g, "match it to your own field"],
  [/土面/g, "soil surface"],
  [/剖面/g, "profile"],
  [/瘦土/g, "thin soil"],
  [/每亩/g, "/mu "],
  [/公斤/g, "kg"],
  [/吨量级|吨/g, "t"],
  [/分两次/g, "split"],
  [/宁少勿多/g, "better too little than too much"],
  [/农用石灰/g, "agricultural lime"],
  [/白云石粉/g, "dolomite"],
  [/腐熟有机肥|有机肥/g, "rotted manure"],
  [/尿素/g, "urea"],
  [/复合肥/g, "compound fertiliser"],
  [/水溶肥/g, "soluble fertiliser"],
  [/先别做[:：]?/g, "Don’t: "],
  [/何时测土[:：]?/g, "When to test: "],
  [/按测土/g, "follow a soil test"],
  [/当地农技站/g, "local extension"],
  [/包装说明/g, "the label"],
];

function hasHan(s: string): boolean {
  return /[\u4e00-\u9fff]/.test(s);
}

function scrub(text: string, fallback: string): string {
  if (!text) return fallback;
  if (!hasHan(text)) return text;
  let out = text;
  for (const [re, en] of PHRASE) out = out.replace(re, en);
  out = out.replace(/[\u4e00-\u9fff]+/g, " ").replace(/\s+/g, " ").trim();
  return out.length >= 8 ? out : fallback;
}

function scrubList(list: string[] | undefined, fallback: string[]): string[] {
  if (!list?.length) return fallback;
  const next = list.map((x, i) => scrub(x, fallback[i] ?? fallback[0] ?? ""));
  return next.filter(Boolean);
}

export function localizeArticle(article: Article, lang: Lang): Article {
  const crops = article.crops.map((c) => labelOf(c, lang));
  const problems = article.problems.map((c) => labelOf(c, lang));
  const regions = article.regions.map((c) => labelOf(c, lang));
  const seasons = article.seasons.map((c) => labelOf(c, lang));
  const tags = article.tags.map((c) => labelOf(c, lang));
  if (lang !== "en") {
    return { ...article, crops, problems, regions, seasons, tags };
  }
  const en = { ...ARTICLES_EN[article.slug], ...ARTICLES_EN_LONG[article.slug] };
  const title = en?.title ?? article.title;
  const subtitle = en?.subtitle ?? title;
  const summary = en?.summary ?? subtitle;
  const photos = article.photos.map((p, i) => ({
    ...p,
    alt: `${title} ${i === 0 ? "field view" : "close-up"}`,
    caption: `${title}. ${CAPTION_EN}`,
  }));
  const genericConfuse = [
    {
      lookalike: "Other yellowing or stall",
      difference: "Check which leaves, the roots, and the soil surface before you treat.",
      photoHint: "Whole plant, close-up, soil surface.",
    },
  ];
  const confuse = (en?.confuse ?? []).map((c, i) => ({
    lookalike: c.lookalike,
    difference: c.difference,
    photoHint: c.photoHint ?? article.confuse[i]?.photoHint ?? genericConfuse[0].photoHint,
  }));
  const indicators = article.indicators.map((i) => {
    const id = TERMS.find((t) => t.name === i.name || t.nameEn === i.name || t.id === i.name.toLowerCase());
    const viewName = indicatorView(i.name, "en");
    return {
      name: viewName,
      meaning: id?.plainEn ?? scrub(i.meaning, "See the glossary."),
      typical: id ? scrub(i.typical, "Follow the local lab range.") : scrub(i.typical, "Follow the local lab range."),
    };
  });
  const videos = article.solutions.videos.map((v) => ({
    ...v,
    title: hasHan(v.title) ? `${title} — field talk` : v.title,
  }));
  const fallbackSteps = [
    "Test the soil first.",
    "Follow the local extension rate. Better too little than too much.",
    "Don’t dump fertiliser from leaf colour alone.",
  ];
  return {
    ...article,
    title,
    subtitle,
    summary,
    crops,
    problems,
    regions,
    seasons,
    tags,
    photos,
    phenomenon: {
      appearance: en?.appearance ?? summary,
      conditions: en?.conditions ?? subtitle,
      commonCrops: en?.commonCrops ?? crops.join(", "),
    },
    confuse: confuse.length ? confuse : genericConfuse,
    causes: {
      natural: scrubList(en?.natural, ["Natural soil and weather."]),
      human: scrubList(en?.human, ["What was done in the field."]),
      plainExplain: en?.plainExplain ?? summary,
    },
    solutions: { steps: en?.steps?.length ? en.steps : fallbackSteps, videos },
    dosage: (en?.dosage ?? article.dosage).map((d) => ({
      name: labelOf(d.name, "en") === d.name ? scrub(d.name, d.name) : labelOf(d.name, "en"),
      range: scrub(d.range, d.range),
      note: scrub(d.note, "Follow a soil test and local advice."),
    })),
    prevention: scrubList(en?.prevention, ["Keep organic matter up.", "Don’t run one fertiliser every year."]),
    fieldCheck: en?.fieldCheck ?? "Check leaves, roots and the soil surface. Test if those three don’t line up.",
    dontDo: scrubList(en?.dontDo, ["Don’t dump fertiliser from leaf colour alone."]),
    whenToTest: en?.whenToTest ?? "Test before you treat, and again the next season.",
    indicators,
    reviewer: labelOf(article.reviewer, "en"),
    longform: en?.longform?.length
      ? en.longform
      : (article.longform ?? []).map((p) => scrub(p, summary)),
  };
}
