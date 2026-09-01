#!/usr/bin/env python3
import json, urllib.parse, urllib.request, time, sys

QUERIES = [
  "土壤有机质 提升",
  "施肥烧根 肥害",
  "苗期肥害 烧籽",
  "大棚氨气害 尿素",
  "忌氯作物 氯害 马铃薯",
  "农作物药害 症状",
  "农田积水 涝害 根发黑",
  "花生空荚 缺钙",
  "柑橘黄化 黄龙病 鉴别",
  "葡萄 缺铁黄化 石灰性",
  "土壤铝毒 根尖",
  "锈水田 亚铁毒",
  "水田还原障碍 黑根",
  "土壤微生物 菌群失衡",
  "马铃薯疮痂病 土壤偏碱",
  "潜育化水稻土 沿江",
  "石灰性土壤 缺铁黄化",
  "生理酸性肥料 尿素 酸化",
  "茶园 能不能施石灰",
  "花而不实 缺硼",
  "根结线虫 根瘤",
  "青枯病 土壤",
  "苹果再植障碍",
  "冷水灌苗 水稻 僵苗",
  "如何看懂测土化验单",
  "土壤 pH试纸",
  "沙土地 漏肥漏水",
  "黏土地 难耕 干裂",
  "绿肥翻压 憋苗",
  "生物炭 土壤改良 用量",
  "有机肥怎么选 腐熟",
  "秸秆还田 补氮",
  "高磷 抑制锌",
  "叶菜 微量元素 叶面肥",
  "水稻僵苗 原因",
  "玉米苗黄 缺锌",
  "旱涝急转 伤根",
  "地下水位高 渍害",
  "雨后土壤开裂 板结",
  "水肥一体化 EC 烧根",
  "基质栽培 和土壤施肥",
  "土壤消毒 之后养土",
  "看叶子施肥 测土",
  "南方水稻土 还原层",
  "咸水灌溉 盐碱地",
  "地膜 返盐 膜边白霜",
  "洗盐 排水 排碱沟",
  "大棚盐渍化 换土",
  "年年旋耕 耕层变浅",
  "农机碾压 车辙",
  "作物缺镁 老叶脉间黄",
  "作物缺硼 花而不实",
  "作物缺锰 新叶褐斑",
  "作物缺硫 新叶也黄",
  "作物缺铜 穗不实",
  "作物缺钼 豆科",
  "黄叶鉴别 缺素 药害",
  "萎蔫 干旱 盐害 区分",
]

def search(q: str):
    url = "https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=" + urllib.parse.quote(q) + "&page=1&pagesize=10"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://search.bilibili.com/",
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            data = json.load(r)
    except Exception as e:
        return {"q": q, "error": str(e)}
    result = (data.get("data") or {}).get("result") or []
    out = []
    for it in result[:8]:
        title = str(it.get("title", "")).replace('<em class="keyword">', "").replace("</em>", "")
        out.append({"bvid": it.get("bvid"), "duration": it.get("duration"), "title": title, "typeid": it.get("typeid")})
    return {"q": q, "code": data.get("code"), "hits": out}

all_out = []
for q in QUERIES:
    all_out.append(search(q))
    time.sleep(0.35)
    print("done", q, file=sys.stderr)

print(json.dumps(all_out, ensure_ascii=False, indent=2))
