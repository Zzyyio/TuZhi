import { ARTICLE_REVIEWER, ARTICLE_UPDATED_AT } from "@/lib/constants";
import { MORE2 } from "./more2";
import { NOTES } from "./notes";
import { photosFor } from "./covers";
import { videoForSlug } from "./videos";
import type { Article, ArticleDose, ArticlePhoto, ArticleVideo } from "./types";

export type ConfuseIn = {
  other?: string;
  lookalike?: string;
  difference: string;
  lookAt?: string;
  photoHint?: string;
};

export type DoseIn = {
  item?: string;
  name?: string;
  range: string;
  note: string;
};

const TOPIC_BV: [RegExp, string][] = [
  [/酸化|酸土|石灰|铝毒|pH|调酸/, "BV1jT6TYXEjx"],
  [/盐碱|返盐|白霜|洗盐|咸/, "BV1T7411x7Go"],
  [/板结|犁底|硬盖|戴帽/, "BV1po4y1W7Fv"],
  [/缺素|缺氮|缺铁|缺钾|缺磷|黄叶|焦边/, "BV1Cz4y1S7Ro"],
  [/测土|取样|化验|配方/, "BV1kZfsBdEBc"],
  [/有机质|秸秆|腐熟/, "BV13E421M7Ly"],
  [/连作|死棵|重茬/, "BV1T7411x7Go"],
  [/涝|积水|淹/, "BV1kZfsBdEBc"],
  [/肥害|烧苗|烧根/, "BV1T7411x7Go"],
];

export function bvidForTopic(topic: string): string {
  return TOPIC_BV.find(([re]) => re.test(topic))?.[1] ?? "BV13E421M7Ly";
}

export function biliSearch(keyword: string, bv?: string): ArticleVideo {
  const picked = bv ?? bvidForTopic(keyword);
  return {
    platform: "bilibili",
    title: keyword,
    url: `https://www.bilibili.com/video/${picked}/`,
  };
}

type Draft = Omit<Article, "updatedAt" | "reviewer" | "confuse" | "dosage" | "photos"> & {
  confuse?: Article["confuse"];
  confuseWith?: ConfuseIn[];
  dosage?: ArticleDose[];
  dosages?: DoseIn[];
  photos?: ArticlePhoto[];
};

function splitMore2(slug: string): { dontDo: string[]; whenToTest: string } {
  const raw = MORE2[slug] ?? "";
  const [left, right] = raw.split("何时测土：");
  const dont = (left ?? "")
    .replace(/^先别做：/, "")
    .split(/[、。；]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);
  return { dontDo: dont.slice(0, 4), whenToTest: (right ?? "").trim() };
}

export function makeArticle(p: Draft): Article {
  const confuseSrc: ConfuseIn[] = (p.confuse ?? p.confuseWith ?? []).map((c) => ({
    lookalike: "lookalike" in c ? c.lookalike : undefined,
    other: "other" in c ? c.other : undefined,
    difference: c.difference,
    photoHint: "photoHint" in c ? c.photoHint : undefined,
    lookAt: "lookAt" in c ? c.lookAt : undefined,
  }));
  const confuse = confuseSrc.map((c) => ({
    lookalike: c.lookalike || c.other || "容易看走眼的情况",
    difference: c.difference,
    photoHint: c.photoHint || c.lookAt || "对照邻地健康株，看叶位、根和土面。",
  }));
  const dosageSrc: DoseIn[] = (p.dosage ?? p.dosages ?? []).map((d) => ({
    name: "name" in d ? d.name : undefined,
    item: "item" in d ? d.item : undefined,
    range: d.range,
    note: d.note,
  }));
  const dosage = dosageSrc.map((d) => ({
    name: d.name || d.item || "用量",
    range: d.range,
    note: d.note,
  }));
  const extra = splitMore2(p.slug);
  const photos = p.photos?.length ? p.photos : photosFor(p.slug);
  return {
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    summary: p.summary,
    crops: p.crops,
    problems: p.problems,
    regions: p.regions,
    seasons: p.seasons,
    tags: p.tags,
    coverCrop: p.coverCrop,
    coverType: p.coverType,
    photos,
    phenomenon: {
      appearance: p.phenomenon.appearance,
      conditions: p.phenomenon.conditions,
      commonCrops: p.phenomenon.commonCrops,
    },
    confuse,
    causes: {
      natural: p.causes.natural,
      human: p.causes.human,
      plainExplain: p.causes.plainExplain,
    },
    solutions: {
      ...p.solutions,
      videos: [videoForSlug(p.slug, p.solutions.videos[0]?.title || p.title)],
    },
    dosage,
    prevention: p.prevention,
    indicators: p.indicators,
    relatedSlugs: p.relatedSlugs,
    featured: p.featured,
    hot: p.hot,
    fieldCheck: p.fieldCheck ?? NOTES[p.slug],
    dontDo: p.dontDo ?? extra.dontDo,
    whenToTest: p.whenToTest ?? extra.whenToTest,
    updatedAt: ARTICLE_UPDATED_AT,
    reviewer: ARTICLE_REVIEWER,
  };
}
