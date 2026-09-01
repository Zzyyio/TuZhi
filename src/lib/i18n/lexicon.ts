import type { Lang } from "./lang";

const CROP: Record<string, string> = {
  水稻: "Rice",
  小麦: "Wheat",
  玉米: "Maize",
  大豆: "Soybean",
  棉花: "Cotton",
  蔬菜: "Vegetables",
  果树: "Fruit trees",
  马铃薯: "Potato",
  花生: "Peanut",
  设施蔬菜: "Greenhouse veg",
  茶叶: "Tea",
  全国: "Nationwide",
};

const PROBLEM: Record<string, string> = {
  酸化: "Acidification",
  盐碱: "Saline-alkali",
  板结: "Compaction",
  有机质低: "Low organic matter",
  缺素: "Nutrient deficiency",
  连作障碍: "Replant trouble",
  涝害: "Waterlogging",
  肥害: "Fertiliser burn",
  其他: "Other",
};

const REGION: Record<string, string> = {
  东北: "Northeast",
  华北: "North China",
  黄淮海: "Huang-Huai-Hai",
  长江中下游: "Mid-lower Yangtze",
  华南: "South China",
  西南: "Southwest",
  西北: "Northwest",
  全国: "Nationwide",
};

const SEASON: Record<string, string> = {
  春季: "Spring",
  夏季: "Summer",
  秋季: "Autumn",
  冬季: "Winter",
  全年: "Year-round",
};

const STAGE: Record<string, string> = {
  苗期: "Seedling",
  生长期: "Vegetative",
  开花结果: "Flower / fruit",
  收获后: "After harvest",
  不确定: "Not sure",
};

const FERT: Record<string, string> = {
  尿素: "Urea",
  复合肥: "Compound fertiliser",
  有机肥: "Organic manure",
  水溶肥: "Soluble fertiliser",
  没施: "None recently",
  不确定: "Not sure",
  农用石灰: "Agricultural lime",
  白云石粉: "Dolomite",
  腐熟有机肥: "Rotted manure",
  用量: "Rate",
};

const EXTRA: Record<string, string> = {
  pH: "pH",
  EC: "EC",
  有机质: "Organic matter",
  石灰: "Lime",
  铝毒: "Aluminium toxicity",
  返盐: "Salt rising",
  健康对照: "Healthy check",
  "土知内容组（农技审校）": "Tuzhi editorial (agronomy review)",
  农户: "Farmer",
  平台农技员: "Tuzhi extension",
};

export function labelOf(zh: string, lang: Lang): string {
  if (lang !== "en") return zh;
  return CROP[zh] ?? PROBLEM[zh] ?? REGION[zh] ?? SEASON[zh] ?? STAGE[zh] ?? FERT[zh] ?? EXTRA[zh] ?? zh;
}

export const LEX = { CROP, PROBLEM, REGION, SEASON, STAGE, FERT };
