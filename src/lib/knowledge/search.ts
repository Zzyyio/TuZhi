import { ARTICLES_EN } from "@/lib/i18n/articles-en";
import type { Lang } from "@/lib/i18n/lang";
import { ARTICLES } from "./articles";
import type { Article } from "./types";

export type KnowledgeFilters = {
  q?: string;
  crop?: string;
  problem?: string;
  region?: string;
  season?: string;
  lang?: Lang;
};

/** Farmer spoken aliases — never index the shared “先看三样” boilerplate. */
const ALIASES: Record<string, string[]> = {
  "yan-jian": ["土发白", "土面发白", "发白", "白霜", "白粉", "返盐", "盐碱", "咸", "叶缘焦", "white crust", "white soil", "saline", "salt crust"],
  "fan-yan": ["土发白", "土面发白", "发白", "白霜", "返盐", "浇完更白", "rising salt", "white after irrigation"],
  "dashe-yanzhi": ["土发白", "白霜", "大棚盐", "膜下白", "咸", "greenhouse salt", "drip white"],
  "suan-hua": ["发酸", "土发酸", "土变酸", "锈水", "酸化", "铝毒", "苗僵", "acid soil", "acidic", "rusty water", "stunted"],
  "cha-yuan-guo-suan": ["发酸", "土发酸", "茶园", "过酸", "tea acid"],
  "xiu-shui-tian": ["锈水", "发酸", "亚铁", "油膜", "rusty water"],
  "ban-jie": ["板结", "土硬", "像砖", "锄不动", "硬块", "戴帽", "hard soil", "compaction", "brick", "cap"],
  "li-di-ceng": ["板结", "土硬", "犁底层", "硬盖", "像砖", "plough pan", "hardpan"],
  "huang-ye-jian-bie": ["苗黄", "叶黄", "黄叶", "发黄", "yellow leaves"],
  "que-dan": ["苗黄", "叶黄", "黄叶", "底下黄", "老叶黄", "缺氮", "nitrogen", "old leaves yellow"],
  "que-tie": ["苗黄", "叶黄", "黄叶", "新叶黄", "叶脉绿", "缺铁", "iron", "new leaves yellow", "green veins"],
  "que-liu": ["苗黄", "叶黄", "整株黄", "缺硫", "sulfur"],
  "que-mei": ["苗黄", "脉间黄", "缺镁", "magnesium"],
  "que-jia": ["焦边", "叶缘焦", "火燎", "缺钾", "potassium", "scorched margin"],
  "lv-hai": ["焦边", "叶缘焦", "氯害", "chloride"],
  "han-yan-jian-bie": ["焦边", "萎蔫", "旱了", "咸了", "drought", "salt"],
  "ce-tu-bao-gao": ["化验单", "测土", "pH", "EC", "有机质", "报告", "lab sheet", "soil test"],
  "ce-tu-qu-yang": ["化验单", "测土", "取样", "土钻", "sampling"],
  "you-ji-zhi": ["有机质", "土瘦", "家底", "肉少", "organic matter", "pale soil"],
  "hong-huang-rang-gai-suan": ["红黄壤", "改酸", "石灰", "red yellow"],
  "lv-du-shang-gen": ["铝毒", "根尖秃", "aluminium", "aluminum"],
  "suan-yu-que-gai": ["脐腐", "裂果", "缺钙", "blossom end"],
  "suan-tu-shi-lin": ["磷被锁", "苗紫", "缺磷"],
  "cha-yuan-shi-hui-jin-ji": ["茶园", "石灰禁忌", "tea lime"],
  "su-da-yan-jian": ["苏打", "碱土", "石膏", "soda"],
  "bin-hai-yan-tu": ["滨海", "盐土", "coastal"],
  "wei-xian-shui-guan-gai": ["微咸水", "灌溉", "brackish"],
  "di-biao-fu-yan": ["覆膜", "膜边", "返盐", "film salt"],
  "xi-yan-pai-shui": ["洗盐", "排水", "leach"],
  "da-peng-huan-tu-xi-yan": ["换土", "洗盐", "大棚"],
  "xuan-geng-bian-qian": ["旋耕", "耕层浅"],
  "shen-song-shi-ji": ["深松", "窗口"],
  "ji-ya-che-zhe": ["碾压", "车辙", "rut"],
  "lv-fei-fan-ya": ["绿肥", "翻压"],
  "sheng-wu-tan": ["生物炭", "biochar"],
  "jie-gan-bu-dan": ["秸秆", "补氮", "抢氮"],
  "que-xin-yu-lin": ["缺锌", "高磷"],
  "que-peng-hua-er-bu-shi": ["花而不实", "缺硼"],
  "hua-sheng-kong-jia": ["空荚", "花生", "缺钙", "empty pod"],
  "shui-dao-jiang-miao": ["僵苗", "水稻"],
  "yu-mi-miao-huang": ["玉米", "苗黄"],
  "gen-jie-xian-chong": ["根结", "线虫", "根瘤"],
  "tu-chuan-ku-wei": ["枯萎", "维管束", "土传"],
  "qing-ku-bing-tu": ["青枯", "菌脓"],
  "cao-mei-lian-zuo": ["草莓", "连作"],
  "ping-guo-zai-zhi": ["苹果", "再植"],
  "gao-wen-men-peng": ["闷棚", "高温闷棚", "solarisation", "solarization"],
  "shui-fei-yi-ti-hua-ec": ["EC", "水肥一体化", "电导", "滴灌"],
  "jian-yi-ph-ec": ["试纸", "电导仪", "pH", "EC"],
  "ji-zhi-yu-tu-rang": ["基质", "椰糠"],
  "tu-rang-xiao-du-bian-jie": ["消毒", "闷棚"],
  "nan-fang-shui-tian-yang-fen": ["水田", "还原层"],
  "qi-zi-huang-hua": ["柑橘", "黄化", "黄龙"],
  "pu-tao-shi-hui-tu-que-tie": ["葡萄", "石灰土", "缺铁"],
  "han-lao-ji-zhuan": ["旱涝急转"],
  "di-xia-shui-wei-gao": ["地下水位"],
  "leng-shui-guan-miao": ["冷水", "灌苗"],
  "shao-gen": ["烧苗", "烧根", "肥害", "fertiliser burn", "seed burn"],
  "yao-hai": ["药害", "斑扭", "喷药", "spray injury", "herbicide"],
  "lao-hai": ["积水", "涝", "淹", "水淹", "地湿", "白天蔫", "晚上缓", "waterlog", "standing water", "wilt by day"],
};

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "");
}

function indexText(article: Article): string {
  const en = ARTICLES_EN[article.slug];
  return normalize(
    [
      article.title,
      article.subtitle,
      article.summary,
      en?.title ?? "",
      en?.subtitle ?? "",
      en?.summary ?? "",
      article.tags.join(""),
      article.problems.join(""),
      article.crops.join(""),
      article.phenomenon.conditions,
      article.phenomenon.commonCrops,
      (ALIASES[article.slug] ?? []).join(""),
    ].join(""),
  );
}

function scoreArticle(article: Article, q: string): number {
  if (!q) return 1;
  const nq = normalize(q);
  if (!nq) return 1;
  const aliases = ALIASES[article.slug] ?? [];
  let score = 0;
  for (const a of aliases) {
    const na = normalize(a);
    if (na === nq) score += 24;
    else if (na.includes(nq) || nq.includes(na)) score += 16;
  }
  const hay = indexText(article);
  if (hay.includes(nq)) score += 10;
  if (normalize(article.title).includes(nq)) score += 8;
  const enTitle = ARTICLES_EN[article.slug]?.title;
  if (enTitle && normalize(enTitle).includes(nq)) score += 8;
  if (normalize(article.summary).includes(nq)) score += 4;
  for (const tag of article.tags) {
    const nt = normalize(tag);
    if (nq === nt || nt.includes(nq) || nq.includes(nt)) score += 6;
  }
  return score;
}

export function filterArticles(filters: KnowledgeFilters): Article[] {
  const q = filters.q?.trim() ?? "";
  const locale = filters.lang === "en" ? "en" : "zh";
  return ARTICLES.filter((a) => {
    if (filters.crop && filters.crop !== "全部" && !a.crops.includes(filters.crop) && !a.crops.includes("全国")) {
      return false;
    }
    if (filters.problem && filters.problem !== "全部") {
      if (filters.problem === "酸化") {
        if (a.problems[0] !== "酸化") return false;
      } else if (a.problems[0] !== filters.problem && !a.problems.includes(filters.problem)) {
        return false;
      }
    }
    if (
      filters.region &&
      filters.region !== "全部" &&
      !a.regions.includes(filters.region) &&
      !a.regions.includes("全国")
    ) {
      return false;
    }
    if (
      filters.season &&
      filters.season !== "全部" &&
      !a.seasons.includes(filters.season) &&
      !a.seasons.includes("全年")
    ) {
      return false;
    }
    if (!q) return true;
    return scoreArticle(a, q) >= 6;
  }).sort((a, b) => {
    if (q) return scoreArticle(b, q) - scoreArticle(a, q);
    if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
    return a.title.localeCompare(b.title, locale === "en" ? "en" : "zh");
  });
}

export function facetCounts() {
  const problems: Record<string, number> = {};
  const crops: Record<string, number> = {};
  const regions: Record<string, number> = {};
  const seasons: Record<string, number> = {};
  for (const a of ARTICLES) {
    const primary = a.problems[0];
    if (primary) problems[primary] = (problems[primary] ?? 0) + 1;
    for (const c of a.crops) {
      if (c === "全国") continue;
      crops[c] = (crops[c] ?? 0) + 1;
    }
    for (const r of a.regions) regions[r] = (regions[r] ?? 0) + 1;
    for (const s of a.seasons) seasons[s] = (seasons[s] ?? 0) + 1;
  }
  return { problems, crops, regions, seasons };
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(article: Article, limit = 3): Article[] {
  const wanted = article.relatedSlugs.map(getArticle).filter((a): a is Article => Boolean(a));
  if (wanted.length >= limit) return wanted.slice(0, limit);
  const pool = ARTICLES.filter((a) => a.slug !== article.slug && !wanted.some((w) => w.slug === a.slug));
  const scored = pool
    .map((a) => {
      let s = 0;
      if (a.problems[0] && a.problems[0] === article.problems[0]) s += 4;
      for (const t of article.tags) if (a.tags.includes(t)) s += 2;
      for (const c of article.crops) if (a.crops.includes(c)) s += 1;
      return { a, s };
    })
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s);
  return [...wanted, ...scored.map((x) => x.a)].slice(0, limit);
}

export type HardHit = { slugs: string[]; labelZh: string; labelEn: string };

/** Deterministic field triads — used by RAG and to override a wrong AI first guess. */
export function hardRoute(query: string): HardHit | null {
  const q = query;
  if ((/白霜|土面发白|土发白|白粉/.test(q) && /焦|叶缘|烫/.test(q)) || (/白霜/.test(q) && /复合肥|刚施/.test(q))) {
    return { slugs: ["yan-jian", "fan-yan", "han-yan-jian-bie", "dashe-yanzhi"], labelZh: "盐碱", labelEn: "saline-alkali" };
  }
  if (/新叶/.test(q) && /黄/.test(q) && /叶脉|脉绿|脉还绿/.test(q)) {
    return { slugs: ["que-tie", "shi-hui-xing-tu", "pu-tao-shi-hui-tu-que-tie"], labelZh: "缺铁", labelEn: "iron chlorosis" };
  }
  if (/白天.*蔫|晚上.*缓/.test(q) || (/地湿|明水|积水/.test(q) && /蔫|缓|臭|涝/.test(q)) || /waterlog|wilt by day/i.test(q)) {
    return { slugs: ["lao-hai", "han-lao-ji-zhuan", "di-xia-shui-wei-gao"], labelZh: "涝害", labelEn: "waterlog" };
  }
  if (/烧根|贴着种子|种肥|根尖发黑|肥害|fertiliser burn|seed burn/i.test(q)) {
    return { slugs: ["shao-gen", "miao-qi-fei-hai", "di-guan-nong-du"], labelZh: "肥害", labelEn: "fertiliser burn" };
  }
  if ((/锈水|根尖.*褐|铝毒|土发酸|酸化/.test(q) && /僵|褐|秃|酸/.test(q)) || /acid soil.*brown root/i.test(q)) {
    return { slugs: ["suan-hua", "lv-du-shang-gen", "xiu-shui-tian"], labelZh: "酸化", labelEn: "acid soil" };
  }
  if (/老叶/.test(q) && /匀黄|下部.*黄/.test(q) && /新叶.*绿/.test(q) && !/叶脉/.test(q)) {
    return { slugs: ["que-dan", "yu-mi-miao-huang", "huang-ye-jian-bie"], labelZh: "缺氮", labelEn: "nitrogen" };
  }
  if ((/脐腐|空荚/.test(q) || (/心叶/.test(q) && /焦/.test(q))) && !/白霜/.test(q)) {
    return { slugs: ["que-gai", "hua-sheng-kong-jia", "suan-yu-que-gai"], labelZh: "缺钙", labelEn: "calcium" };
  }
  if (/根.*珠|根结|线虫|nematode/i.test(q)) {
    return { slugs: ["gen-jie-xian-chong", "lian-zuo", "cao-mei-lian-zuo"], labelZh: "连作障碍", labelEn: "replant" };
  }
  if (/板结|像砖|戴帽|锄不动|车辙|hard soil|plough pan/i.test(q)) {
    return { slugs: ["ban-jie", "li-di-ceng", "ji-ya-che-zhe"], labelZh: "板结", labelEn: "compaction" };
  }
  return null;
}

export function retrieveForRag(query: string, limit = 4): Article[] {
  const nq = normalize(query);
  const hard = hardRoute(query);
  const scored = ARTICLES.map((a) => {
    let s = scoreArticle(a, query);
    if (hard) {
      const i = hard.slugs.indexOf(a.slug);
      if (i >= 0) s += 40 - i * 4;
      if (a.slug === "que-dan" && hard.labelZh !== "缺氮") s -= 30;
    }
    if (/白霜|土面发白|土发白/.test(query) && /焦|叶缘/.test(query)) {
      if (["yan-jian", "fan-yan", "han-yan-jian-bie", "dashe-yanzhi"].includes(a.slug)) s += 18;
      if (a.slug === "que-dan") s -= 20;
    }
    if (/新叶/.test(query) && /叶脉/.test(query)) {
      if (["que-tie", "shi-hui-xing-tu", "pu-tao-shi-hui-tu-que-tie"].includes(a.slug)) s += 18;
      if (a.slug === "que-dan") s -= 20;
    }
    if (/白天.*蔫|晚上.*缓|地湿|明水/.test(query) || nq.includes("waterlog")) {
      if (["lao-hai", "han-lao-ji-zhuan", "di-xia-shui-wei-gao"].includes(a.slug)) s += 18;
      if (["que-dan", "you-ji-zhi"].includes(a.slug)) s -= 12;
    }
    return { a, s };
  })
    .filter((x) => x.s > 0.8)
    .sort((x, y) => y.s - x.s);
  const top = scored.slice(0, limit).map((x) => x.a);
  if (hard) {
    const forced = hard.slugs.map((slug) => ARTICLES.find((a) => a.slug === slug)).filter((a): a is Article => Boolean(a));
    const rest = top.filter((a) => !hard.slugs.includes(a.slug));
    return [...forced, ...rest].slice(0, limit);
  }
  if (top.length === 0) return ARTICLES.filter((a) => a.featured || a.hot).slice(0, limit);
  return top;
}

export function articleToRagChunk(a: Article): string {
  return [
    `标题：${a.title}`,
    `摘要：${a.summary}`,
    `现象：${a.phenomenon.appearance}`,
    `易混：${a.confuse.map((c) => `${c.lookalike}→${c.difference}`).join("；")}`,
    `通俗原因：${a.causes.plainExplain}`,
    a.fieldCheck ? `地里确认：${a.fieldCheck}` : "",
    a.dontDo?.length ? `先别做：${a.dontDo.join("；")}` : "",
    a.whenToTest ? `何时测土：${a.whenToTest}` : "",
    `处理：${a.solutions.steps.join("；")}`,
    `用量：${a.dosage.map((d) => `${d.name}${d.range}`).join("；")}`,
    `标签：${a.tags.join("、")}`,
    `slug：${a.slug}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function allSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
