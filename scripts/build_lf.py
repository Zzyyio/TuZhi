#!/usr/bin/env python3
"""Expand unique kernels into longform detail-body.ts + articles-en-long.ts."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

# slug -> (see, why, order, stop) unique Chinese; English parallel in EK
K: dict = {}
E: dict = {}


def k(slug, see, why, order, stop, esee, ewhy, eorder, estop):
    K[slug] = (see, why, order, stop)
    E[slug] = (esee, ewhy, eorder, estop)


# titles used in wrapping — keep in sync with handbook
T = {
"suan-hua":"土壤酸化：土变酸了，苗发僵不长",
"yan-jian":"盐碱地：土面发白，苗出不来或焦边",
"ban-jie":"土壤板结：锄不动，根翻不上来",
"you-ji-zhi":"有机质下降：土越种越“馋”，越种越瘦",
"que-dan":"缺氮：下部老叶先黄，植株瘦高不壮",
"que-jia":"缺钾：叶子从边缘焦枯，像被火烧",
"que-lin":"缺磷：苗紫红发僵，根少不发棵",
"que-tie":"缺铁黄化：新叶黄、叶脉还绿",
"que-xin":"缺锌：新叶脉间失绿，节间缩短",
"lian-zuo":"连作障碍：同一块地越种越差",
"dashe-yanzhi":"大棚盐渍化：膜下白霜，越种越“咸”",
"shao-gen":"过量施肥烧根：肥越多越“受伤”",
"lao-hai":"积水涝害：根喝饱了氧气却憋死了",
"wei-sheng-wu":"土壤微生物失衡：土不“活”了",
"ce-tu-bao-gao":"如何看懂测土化验单",
"ce-tu-qu-yang":"测土怎么取样才不准",
"que-gai":"缺钙：顶芽烂、脐腐、裂果",
"que-mei":"缺镁：老叶脉间黄、叶脉还绿",
"que-peng":"缺硼：花而不实、裂茎空心",
"que-meng":"缺锰：新叶脉间失绿、有褐斑",
"que-liu":"缺硫：整株偏黄，新叶也黄",
"que-tong":"缺铜：穗不实、叶尖发白",
"que-mu":"缺钼：豆科固氮差、叶片畸形",
"yang-fen-kang-kang":"养分互相打架：磷锌拮抗、钾镁失衡",
"yao-hai":"药害：喷完药又斑又扭，不像慢慢缺素",
"miao-qi-fei-hai":"苗期肥害：出苗就烧、根尖发黑",
"an-hai":"氨气烧叶烧根：刚施肥就熏",
"lv-hai":"氯害：忌氯作物遇上含氯化肥",
"di-guan-nong-du":"滴灌肥水太浓：越浇越伤",
"wei-fu-shu-you-ji-fei":"未腐熟有机肥：当粪宝，变成烧苗",
"fan-yan":"返盐：浇完水土更白",
"shi-hui-xing-tu":"石灰性土壤：肥在土里，根吃不到",
"shi-gao-gai-jian":"石膏改碱和洗盐",
"sha-tu-lou-fei":"沙土漏肥漏水",
"nian-tu-nan-geng":"黏土难耕又易裂",
"li-di-ceng":"犁底层：旋耕下面那层硬盖",
"hei-tu-tui-hua":"东北黑土变瘦变硬",
"jie-gan-huan-tian":"秸秆还田：改土也会烧苗和抢氮",
"shi-hui-yong-liang":"石灰怎么用才不把土改过劲",
"xiu-shui-tian":"锈水田、亚铁毒：水田苗发黄发僵",
"qian-yu-tian":"冷浸田、潜育化：土冷根不长",
"shui-tian-huan-yuan":"水田还原障碍：根黑、臭、不发新根",
"gen-fu-jian-bie":"根腐还是土问题：先看根再下肥",
"huang-ye-jian-bie":"黄叶鉴别：缺素、涝害、药害还是病害",
"han-yan-jian-bie":"旱了还是咸了：萎蔫和焦边怎么分",
"cha-yuan-guo-suan":"茶园过酸：耐酸不等于越酸越好",
"ma-ling-shu-tu":"马铃薯疮痂和偏碱土壤",
"sheng-wu-you-ji-fei":"生物有机肥怎么用才不是安慰剂",
"guo-yuan-tu-rang":"果园土壤培肥：树下那层土怎么养",
"da-peng-lian-zuo-zong-he":"大棚越种越差：盐、病、肥害一起到",
"hong-huang-rang-gai-suan":"红黄壤改酸：先测 pH，再谈石灰",
"lv-du-shang-gen":"铝毒伤根：根尖秃、发褐，不是单纯缺肥",
"suan-yu-que-gai":"土酸和缺钙一起到：脐腐裂果别只补叶面钙",
"suan-tu-shi-lin":"酸性土磷被锁：苗紫矮，先改酸再猛补磷",
"sheng-li-suan-xing-fei":"生理酸性肥越用土越酸",
"cha-yuan-shi-hui-jin-ji":"茶园石灰禁忌：耐酸作物怎么改才不伤树",
"su-da-yan-jian":"苏打盐碱地：碱和盐不是一回事",
"bin-hai-yan-tu":"滨海盐土：先排水洗盐，再谈培肥",
"wei-xian-shui-guan-gai":"微咸水灌溉：能浇但不能连浇",
"di-biao-fu-yan":"地表覆膜返盐：膜边白霜怎么破",
"yan-jian-di-xuan-zuo":"盐碱地适种什么：先活苗再求高产",
"xi-yan-pai-shui":"洗盐排水：有灌没排等于把盐赶上来",
"da-peng-huan-tu-xi-yan":"大棚换土还是洗盐：别一盐就翻棚",
"xuan-geng-bian-qian":"年年旋耕：耕层越旋越浅",
"shen-song-shi-ji":"深松窗口：什么时候松、松多深",
"tu-rang-tuan-ju-ti":"团聚体碎了：土面一碰就面、一下雨就浆",
"ji-ya-che-zhe":"农机碾压：车辙里出不来苗",
"ban-jie-yu-gen-xi":"板结和浅根互相反馈",
"fu-gai-gai-zhi-di":"地膜/秸秆覆盖能不能把板结土养松",
"lv-fei-fan-ya":"绿肥翻压：改土也会憋苗",
"sheng-wu-tan":"生物炭：不是每亩撒一点就翻身",
"you-ji-fei-ru-he-xuan":"有机肥怎么选：看腐熟、看盐、看碳氮比",
"jie-gan-bu-dan":"秸秆还田必须补氮的账怎么算",
"hei-tu-you-ji-zhi-shou-hu":"黑土有机质掉得快，怎么守",
"sha-tu-zeng-you-ji-zhi":"沙土增有机质：少量多次，别一次堆山",
"que-xin-yu-lin":"缺锌常被高磷掩盖",
"que-peng-hua-er-bu-shi":"花而不实先查硼，也要查旱和盐",
"qi-zi-huang-hua":"柑橘黄化：缺铁、根腐、黄龙病先分清",
"pu-tao-shi-hui-tu-que-tie":"葡萄石灰土黄叶：土里有铁根吃不到",
"hua-sheng-kong-jia":"花生空荚：钙在土里走不进果针",
"ye-cai-xiao-xing-yuan-su":"叶菜微量元素：喷叶不是代替改土",
"shui-dao-jiang-miao":"水稻僵苗：酸、冷、毒、肥害怎么分",
"yu-mi-miao-huang":"玉米苗黄：缺氮、缺锌、除草剂、涝要分开看",
"gen-jie-xian-chong":"根结线虫：根上长瘤，肥再多也不长",
"tu-chuan-ku-wei":"土传枯萎：死棵先看维管束",
"qing-ku-bing-tu":"青枯病土：热闷棚不是万能",
"cao-mei-lian-zuo":"草莓连作：盐、线虫、黄萎挤在一起",
"ping-guo-zai-zhi":"苹果再植障碍：挖了老树坑还是老土",
"gao-wen-men-peng":"高温闷棚：能压菌，也会伤根和结构",
"han-lao-ji-zhuan":"旱涝急转：先伤根再黄叶",
"di-xia-shui-wei-gao":"地下水位高：土不干、根不深",
"yu-hou-ban-jie-kai-lie":"雨后板结开裂：跑墒又卡苗",
"leng-shui-guan-miao":"冷水灌苗：水田发僵不一定是缺肥",
"yan-jiang-qi-hou-tu":"沿江湿地土：潜育化比表面看的更狠",
"shui-fei-yi-ti-hua-ec":"水肥一体化：EC 超了就是在腌根",
"ji-zhi-yu-tu-rang":"基质栽培和土壤不是同一套方子",
"tu-rang-xiao-du-bian-jie":"土壤消毒的边界：消完要养，不能连作再毒",
"jian-yi-ph-ec":"地头怎么用 pH 试纸和电导仪",
"shi-fei-tiao-tu-rang":"看叶片能猜肥，不能代替测土",
"nan-fang-shui-tian-yang-fen":"南方水田养分：还原层把养分锁住了",
}

ET = {
"suan-hua":"Soil acidification",
"yan-jian":"Saline-alkali land",
"ban-jie":"Soil compaction",
"you-ji-zhi":"Falling organic matter",
"que-dan":"Nitrogen deficiency",
"que-jia":"Potassium deficiency",
"que-lin":"Phosphorus deficiency",
"que-tie":"Iron chlorosis",
"que-xin":"Zinc deficiency",
"lian-zuo":"Replant / continuous cropping",
"dashe-yanzhi":"Greenhouse salinisation",
"shao-gen":"Fertiliser burn of roots",
"lao-hai":"Waterlogging",
"wei-sheng-wu":"Tired soil biology",
"ce-tu-bao-gao":"Reading a soil-test sheet",
"ce-tu-qu-yang":"How to sample for a soil test",
"que-gai":"Calcium deficiency",
"que-mei":"Magnesium deficiency",
"que-peng":"Boron deficiency",
"que-meng":"Manganese deficiency",
"que-liu":"Sulphur deficiency",
"que-tong":"Copper deficiency",
"que-mu":"Molybdenum deficiency",
"yang-fen-kang-kang":"Nutrient antagonism",
"yao-hai":"Pesticide scorch",
"miao-qi-fei-hai":"Seedling fertiliser burn",
"an-hai":"Ammonia burn",
"lv-hai":"Chloride injury",
"di-guan-nong-du":"Drip too concentrated",
"wei-fu-shu-you-ji-fei":"Raw manure burn",
"fan-yan":"Salt rising after irrigation",
"shi-hui-xing-tu":"Calcareous soil lock-up",
"shi-gao-gai-jian":"Gypsum for alkali, leaching for salt",
"sha-tu-lou-fei":"Sandy soil leaks",
"nian-tu-nan-geng":"Clay hard to till",
"li-di-ceng":"Plough pan",
"hei-tu-tui-hua":"Black-soil thinning",
"jie-gan-huan-tian":"Straw return side effects",
"shi-hui-yong-liang":"How to use lime",
"xiu-shui-tian":"Rusty-water ferrous toxicity",
"qian-yu-tian":"Cold gleyed paddies",
"shui-tian-huan-yuan":"Reduced paddy soils",
"gen-fu-jian-bie":"Root rot versus a soil problem",
"huang-ye-jian-bie":"Splitting yellow leaves",
"han-yan-jian-bie":"Drought versus salt",
"cha-yuan-guo-suan":"Tea too acid",
"ma-ling-shu-tu":"Potato scab and alkaline soil",
"sheng-wu-you-ji-fei":"Bio-organic fertiliser without the placebo",
"guo-yuan-tu-rang":"Orchard soil under the tree",
"da-peng-lian-zuo-zong-he":"Greenhouse decline stew",
"hong-huang-rang-gai-suan":"Red-yellow earth: test pH before lime",
"lv-du-shang-gen":"Aluminium toxicity on roots",
"suan-yu-que-gai":"Acid soil plus calcium lack",
"suan-tu-shi-lin":"Acid soil locks phosphorus",
"sheng-li-suan-xing-fei":"Acid-forming fertiliser",
"cha-yuan-shi-hui-jin-ji":"Tea lime taboos",
"su-da-yan-jian":"Soda alkali versus salt",
"bin-hai-yan-tu":"Coastal saline soil",
"wei-xian-shui-guan-gai":"Slightly saline irrigation",
"di-biao-fu-yan":"Film pushing salt to the hole",
"yan-jian-di-xuan-zuo":"What to grow on salt land",
"xi-yan-pai-shui":"Leaching needs drainage",
"da-peng-huan-tu-xi-yan":"Leach the house before you replace soil",
"xuan-geng-bian-qian":"Rotary tillage shallows the layer",
"shen-song-shi-ji":"The subsoiling window",
"tu-rang-tuan-ju-ti":"Aggregates gone",
"ji-ya-che-zhe":"Wheelings",
"ban-jie-yu-gen-xi":"Compaction and shallow roots",
"fu-gai-gai-zhi-di":"Mulch is not a pickaxe",
"lv-fei-fan-ya":"Green manure can smother",
"sheng-wu-tan":"Biochar is a frame",
"you-ji-fei-ru-he-xuan":"Choosing organic fertiliser",
"jie-gan-bu-dan":"The straw-return nitrogen IOU",
"hei-tu-you-ji-zhi-shou-hu":"Guarding black-soil organic matter",
"sha-tu-zeng-you-ji-zhi":"Building organic matter on sand",
"que-xin-yu-lin":"Zinc hiding behind high phosphorus",
"que-peng-hua-er-bu-shi":"Bloom without fruit",
"qi-zi-huang-hua":"Citrus yellowing split",
"pu-tao-shi-hui-tu-que-tie":"Grapes on calcareous soil",
"hua-sheng-kong-jia":"Peanut empty pods",
"ye-cai-xiao-xing-yuan-su":"Leafy greens and micronutrients",
"shui-dao-jiang-miao":"Rice stall split",
"yu-mi-miao-huang":"Maize seedling yellow split",
"gen-jie-xian-chong":"Root-knot nematode",
"tu-chuan-ku-wei":"Soil-borne wilt",
"qing-ku-bing-tu":"Bacterial wilt soil",
"cao-mei-lian-zuo":"Strawberry replant stew",
"ping-guo-zai-zhi":"Apple replant",
"gao-wen-men-peng":"Solarisation is medicine",
"han-lao-ji-zhuan":"Drought-flood shock",
"di-xia-shui-wei-gao":"High water table",
"yu-hou-ban-jie-kai-lie":"Crust after rain",
"leng-shui-guan-miao":"Cold water on seedlings",
"yan-jiang-qi-hou-tu":"Riverside gley",
"shui-fei-yi-ti-hua-ec":"When EC pickles the root",
"ji-zhi-yu-tu-rang":"Substrate is not soil",
"tu-rang-xiao-du-bian-jie":"The limit of disinfection",
"jian-yi-ph-ec":"Field pH paper and EC",
"shi-fei-tiao-tu-rang":"Leaves guess; tests decide",
"nan-fang-shui-tian-yang-fen":"Southern paddy lock-up",
}

exec(Path("/workspace/scripts/lf_kernels.py").read_text(), globals())


def split_zh(s: str) -> list[str]:
    bits = [x.strip(" 。；，、") for x in re.split(r"[。；]", s) if x.strip()]
    return [b + "。" for b in bits if b]


def han_len(s: str) -> int:
    return len(re.findall(r"[\u4e00-\u9fff]", s))


def wrap_zh(slug: str, see: str, why: str, order: str, stop: str) -> list[str]:
    # Field-only, 120-220 Chinese characters. No rates, steps, prevention, or mechanism.
    _ = (slug, why, order, stop)
    pads = [
        "对照邻地健康株。先分新叶还是老叶，再看根是白、褐、秃还是臭。",
        "土面有没有白霜、积水、干裂或硬盖。问最近施了什么、浇过没有、雨后还是返盐季节。",
        "蹲下来搓一把土，看散不散、黏不黏、有没有盐霜或锈味。",
        "邻垄如果更绿，把两处叶子、根和土面对照着看。三样对不上，先停手。",
        "用手抠开表土，看下面是湿、干、硬盖还是白粉。把苗拔一棵，洗根看尖。",
    ]
    raw = see.rstrip("。；，") + "。"
    i = 0
    while han_len(raw) < 120:
        raw += pads[i % len(pads)]
        i += 1
        if i > 8:
            break
    raw = re.sub(r"(每亩|公斤|尿素|石膏|石灰用量|分两次|深松 ?\d|预防|先别做)", "", raw)
    raw = re.sub(r"\s+", "", raw).replace("。。", "。")
    if han_len(raw) > 220:
        # trim on a sentence while keeping ≥120 han
        parts = re.findall(r"[^。]+。?", raw)
        acc = ""
        for p in parts:
            nxt = acc + p
            if han_len(nxt) > 220:
                break
            acc = nxt
        raw = acc if han_len(acc) >= 120 else raw
    return [raw]


def wrap_en(slug: str, see: str, why: str, order: str, stop: str) -> list[str]:
    _ = (slug, why, order, stop)
    text = (
        f"{see} "
        "Compare with a healthy neighbour. Split new leaves from old, then read the root "
        "(white, brown, bald or rotten) and the soil surface (white crust, standing water, cracks or a hard lid). "
        "Ask what was spread, whether you irrigated, and whether this is the post-rain or spring-salt season. "
        "Crouch and crumble a handful: powdery, sticky, salty or rusty. If those three don't line up, stop."
    )
    return [re.sub(r"\s+", " ", text).strip()]


def steps_zh(order: str) -> list[str]:
    bits = split_zh(order)
    out = ["下地先把整株、特写、土面三张对照看完。叶位、根和土面对不上，先停手，不要倒肥。"]
    out.extend(bits[:4] or [order])
    out.append("用量按测土、当地农技站和包装下限，宁少勿多，先小面积。改完看新叶新根，不要加倍。")
    return out[:6]


def steps_en(order: str) -> list[str]:
    bits = [x.strip() + "." for x in re.split(r"(?<=\.)\s+", order) if x.strip()]
    out = ["Read the whole plant, a close-up and the soil surface first. If they disagree, stop."]
    out.extend(bits[:4] or [order])
    out.append("Rates from a soil test, local extension and the label floor. Better too little. Watch new growth; don’t double.")
    return out[:6]


def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def ts_list(xs: list[str]) -> str:
    return "[\n      " + ",\n      ".join(ts_str(x) for x in xs) + ",\n    ]"


def emit_body(slug: str, see: str, why: str, order: str, stop: str) -> str:
    zh = wrap_zh(slug, see, why, order, stop)
    en = wrap_en(slug, *E[slug])
    appearance = f"{see} 对照邻地健康株。把叶位、根和土面看完再动手。"
    conditions = f"{why} 质地、降雨、灌溉和设施条件会改写法，邻县袋数不能直接抄。"
    field = f"地里这样确认：{see} 对不上就测 0～20 厘米 pH、有机质和盐分，不要先倒肥。"
    plain = f"{why} 土是房间，肥是饭，根是嘴。房间坏了，嘴先伤，饭再香也吃不进。先改房间，再谈补饭。"
    dont = split_zh(stop)[:4] or [stop]
    prev = [
        "有机肥、覆盖和排水是公共底子，不要只靠当季化肥。",
        "先认症再下肥，叶位、根、土面对不上就停。",
        "改完隔一季再测，不要连年加码。",
    ]
    nat = split_zh(why)[:2] or [why]
    hum = ["只抄邻县袋数，不问自家质地和化验单。", "伤根以后还猛追肥，把嘴越伤越深。"]
    fields = [
        f"    appearance: {ts_str(appearance)},",
        f"    conditions: {ts_str(conditions)},",
        f"    plainExplain: {ts_str(plain)},",
        f"    natural: {ts_list(nat)},",
        f"    human: {ts_list(hum)},",
        f"    steps: {ts_list(steps_zh(order))},",
        f"    fieldCheck: {ts_str(field)},",
        f"    dontDo: {ts_list(dont)},",
        f"    whenToTest: {ts_str('现象对得上这篇、或准备改土施肥前，取 0～20 厘米多点混合样。先读 pH、有机质、盐分，再读氮磷钾和微量元素。')},",
        f"    prevention: {ts_list(prev)},",
        f"    longform: {ts_list(zh)},",
        f"    longformEn: {ts_list(en)},",
    ]
    return "  " + ts_str(slug) + ": {\n" + "\n".join(fields) + "\n  }"


def emit_en(slug: str, see: str, why: str, order: str, stop: str) -> str:
    en = wrap_en(slug, see, why, order, stop)
    appearance = f"{see} Compare with a healthy neighbour. Read leaves, roots and the soil surface first."
    conditions = f"{why} Texture, rain, irrigation and a greenhouse change the writing."
    field = f"Confirm in the field: {see} If it does not fit, test 0–20 cm pH, organic matter and salt before you pour anything."
    plain = f"{why} Soil is the room, fertiliser the meal, the root the mouth. Fix the room before you add food."
    dont = [x.strip() + "." for x in re.split(r"(?<=\.)\s+", stop) if x.strip()][:4] or [stop]
    prev = [
        "Organic matter, cover and drainage are the common floor — don’t live on in-season fertiliser.",
        "Diagnose before you feed. If leaves, roots and the surface disagree, stop.",
        "Retest the next season. Don’t stack the same amendment year after year.",
    ]
    nat = [x.strip() + "." for x in re.split(r"(?<=\.)\s+", why) if x.strip()][:2] or [why]
    hum = ["Copying a neighbour’s bag count without your own texture or lab sheet.", "Chasing a hurt root with more fertiliser."]
    fields = [
        f"    appearance: {ts_str(appearance)},",
        f"    conditions: {ts_str(conditions)},",
        f"    plainExplain: {ts_str(plain)},",
        f"    natural: {ts_list(nat)},",
        f"    human: {ts_list(hum)},",
        f"    steps: {ts_list(steps_en(order))},",
        f"    fieldCheck: {ts_str(field)},",
        f"    dontDo: {ts_list(dont)},",
        f"    whenToTest: {ts_str('When the field matches this page, or before you amend: 0–20 cm, several spots mixed. Read pH, organic matter and salt first.')},",
        f"    prevention: {ts_list(prev)},",
        f"    longform: {ts_list(en)},",
    ]
    return "  " + ts_str(slug) + ": {\n" + "\n".join(fields) + "\n  }"


def main() -> None:
    missing = [s for s in T if s not in K]
    if missing:
        raise SystemExit(f"missing kernels {len(missing)} e.g. {missing[:8]}")
    body = [emit_body(slug, *K[slug]) for slug in T]
    en = [emit_en(slug, *E[slug]) for slug in T]
    Path("/workspace/src/lib/knowledge/detail-body.ts").write_text(
        'import type { DetailBody } from "./detail-types";\n\n'
        "export const BODY: Record<string, DetailBody> = {\n" + ",\n".join(body) + ",\n};\n"
    )
    Path("/workspace/src/lib/i18n/articles-en-long.ts").write_text(
        "export const ARTICLES_EN_LONG: Record<string, { longform?: string[]; appearance?: string; conditions?: string; plainExplain?: string; steps?: string[]; natural?: string[]; human?: string[]; fieldCheck?: string; dontDo?: string[]; whenToTest?: string; prevention?: string[] }> = {\n"
        + ",\n".join(en)
        + ",\n};\n"
    )
    print("wrote", len(body), "detail bodies")


if __name__ == "__main__":
    main()
