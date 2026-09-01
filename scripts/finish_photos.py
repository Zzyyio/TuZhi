#!/usr/bin/env python3
"""Copy curated real photos, fetch named Wikimedia files, enforce unique hashes."""
from __future__ import annotations

import hashlib
import json
import shutil
import time
import urllib.error
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image

UA = "TuzhiSoilLiteracy/1.0 (educational; contact g17612121666@gmail.com)"
ART = Path("/workspace/public/images/articles")
WIKI = Path("/workspace/public/images/wiki")
IMG = Path("/workspace/public/images")
SEARCHED = Path("/workspace/artifacts/searched_images")
ART.mkdir(parents=True, exist_ok=True)
WIKI.mkdir(parents=True, exist_ok=True)

# id in artifacts/searched_images -> dest under public/images
COPY = {
    # FAIL / junk replacements for articles
    "5Jknc": "articles/lian-zuo.jpg",              # wilted tomatoes
    "Z3bkH": "articles/shao-gen.jpg",              # fertilizer-burn roots
    "GfIRk": "articles/que-peng.jpg",              # hollow-stem broccoli
    "Dkhab": "articles/que-liu.jpg",               # canola S split field
    "xw91Q": "articles/miao-qi-fei-hai.jpg",       # starter-fertilizer root damage
    "xjC9o": "articles/an-hai.jpg",                # burned seed / ammonia burn
    "lVU34": "articles/tu-chuan-ku-wei.jpg",       # wilt tomato
    "5QdCG": "articles/qing-ku-bing-tu.jpg",       # wilt tomato 2
    "oVvQ1": "articles/shi-gao-gai-jian.jpg",      # gypsum in hands
    "3OidC": "articles/wei-sheng-wu.jpg",          # earthworms compost
    "iUJnU": "articles/tu-chuan-ku-wei-2.jpg",     # fusarium yellow leaves
    "JqNxo": "articles/qing-ku-bing-tu-2.jpg",     # wilted tomato field
    "p702X": "articles/tu-rang-xiao-du-bian-jie.jpg",  # soil steaming
    "CnoV8": "articles/fu-gai-gai-zhi-di.jpg",     # straw mulch
    "OpuiE": "articles/fu-gai-gai-zhi-di-2.jpg",   # beet straw mulch
    "Tz30Q": "articles/guo-yuan-tu-rang.jpg",      # apple orchard ground
    "NSOAm": "articles/ping-guo-zai-zhi.jpg",      # young apple tree soil
    "20B6I": "articles/shi-gao-gai-jian-2.jpg",    # gypsum piles in field
    "wGHqO": "articles/jian-yi-ph-ec.jpg",         # soil sampling
    "BbBHT": "articles/jian-yi-ph-ec-2.jpg",       # soil into bag
    "dm7U1": "articles/shi-hui-yong-liang.jpg",    # lime spreading Devon
    "ZCGru": "articles/tu-rang-tuan-ju-ti.jpg",    # handful crumb soil
    "GkwyE": "wiki/n.jpg",                         # N-def corn
    "D5tQU": "wiki/n-2.jpg",                       # N-def corn close
    "1i4wu": "wiki/cu.jpg",                        # copper wheat
    "aDEZW": "articles/gen-jie-xian-chong-2.jpg",  # root-knot galls
    "jMWoD": "articles/gen-jie-xian-chong.jpg",    # nematode compare
    "dadbF": "articles/que-meng-2.jpg",            # Mn soy
    "TTiuP": "wiki/mn.jpg",                        # Mn soy yellow
    "ZojXn": "wiki/al.jpg",                        # acid roots (also article lv-du — we'll copy unique later)
}

# Extra Wikimedia Commons files (unique, real field photos)
WIKI_FILES = {
    "wiki/aggregate.jpg": "Granular soil structure.jpg",
    "wiki/al.jpg": "Aluminium toxocity maize roots 2017 01 05 6274.jpg",
    "wiki/ec.jpg": "Electrical conductivity meter.jpg",
    "wiki/saline.jpg": "Saline-sodic soil.jpg",
    "wiki/compaction.jpg": "Soil compaction from agricultural machinery.jpg",
    "wiki/s.jpg": "Sulfur deficiency in corn.jpg",
    "wiki/cu.jpg": "Failure of grain formation due to copper deficiency in wheat.jpg",
    "wiki/p.jpg": "Phosphorus deficiency in maize.jpg",
    "wiki/zn.jpg": "Split stem of zinc-deficient maize.jpg",
    "wiki/b.jpg": "Boron deficiency in cauliflower.jpg",
    "wiki/acid.jpg": "Zea mays acid soil 2017 01 05 6259b.jpg",
    "wiki/salt.jpg": "Salt crust on soil.jpg",
    "wiki/test.jpg": "Soil sampling (NRCS).jpg",
    "wiki/fc.jpg": "Soil moisture.jpg",
    "wiki/gley.jpg": "Gleysol.jpg",
    "wiki/replant.jpg": "Tomato wilt.jpg",
    "wiki/ph.jpg": "Soil pH test.jpg",
    "articles/dashe-yanzhi-2.jpg": "Greenhouse tomatoes.jpg",
    "articles/an-hai-2.jpg": "Fertilizer burn on leaves.jpg",
    "articles/que-liu-2.jpg": "Sulfur deficient canola.jpg",
    "articles/lian-zuo-2.jpg": "Continuous cropping tomato greenhouse.jpg",
    "articles/shao-gen-2.jpg": "Root burn from fertilizer.jpg",
    "articles/qian-yu-tian-2.jpg": "Paddy field soil profile.jpg",
    "articles/gao-wen-men-peng-2.jpg": "Solarization of soil.jpg",
    "articles/yu-hou-ban-jie-kai-lie-2.jpg": "Crusted soil after rain.jpg",
    "articles/hua-sheng-kong-jia-2.jpg": "Groundnut empty pods.jpg",
    "articles/ping-guo-zai-zhi-2.jpg": "Apple orchard rows.jpg",
    "articles/guo-yuan-tu-rang-2.jpg": "Orchard floor mulch.jpg",
    "articles/ji-zhi-yu-tu-rang.jpg": "Coconut coir growing medium.jpg",
    "articles/ji-zhi-yu-tu-rang-2.jpg": "Tomato in grow bag.jpg",
    "articles/yang-fen-kang-kang.jpg": "Maize phosphorus toxicity.jpg",
    "articles/gen-fu-jian-bie.jpg": "Healthy vs diseased plant roots.jpg",
    "articles/han-yan-jian-bie.jpg": "Drought stressed maize.jpg",
    "articles/suan-tu-shi-lin.jpg": "Rock phosphate fertilizer.jpg",
    "articles/di-biao-fu-yan.jpg": "Plastic mulch tomato field.jpg",
    "articles/yan-jian-di-xuan-zuo.jpg": "Salt tolerant rice.jpg",
    "articles/cao-mei-lian-zuo.jpg": "Strawberry field rows.jpg",
    "articles/cao-mei-lian-zuo-2.jpg": "Strawberry plants in soil.jpg",
    "articles/hei-tu-you-ji-zhi-shou-hu.jpg": "Chernozem soil profile.jpg",
    "articles/shi-fei-tiao-tu-rang.jpg": "Farmer reading soil test.jpg",
}


def md5_bytes(b: bytes) -> str:
    return hashlib.md5(b).hexdigest()


def to_jpeg(raw: bytes) -> bytes:
    im = Image.open(BytesIO(raw))
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    elif im.mode == "L":
        im = im.convert("RGB")
    buf = BytesIO()
    im.save(buf, format="JPEG", quality=88, optimize=True)
    return buf.getvalue()


def save_jpeg(dest: Path, raw: bytes) -> bool:
    try:
        data = to_jpeg(raw)
    except Exception as e:
        print("  decode fail", dest.name, e)
        return False
    if len(data) < 4000:
        print("  too small", dest.name, len(data))
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    print("SAVE", dest.relative_to(IMG), len(data))
    return True


def copy_searched(src_id: str, rel: str) -> bool:
    src = SEARCHED / f"{src_id}.jpg"
    if not src.exists():
        # try other extensions
        hits = list(SEARCHED.glob(f"{src_id}.*"))
        if not hits:
            print("MISSING searched", src_id)
            return False
        src = hits[0]
    dest = IMG / rel
    return save_jpeg(dest, src.read_bytes())


def wiki_url(title: str) -> str | None:
    q = urllib.parse.urlencode({
        "action": "query",
        "titles": f"File:{title}" if not title.startswith("File:") else title,
        "prop": "imageinfo",
        "iiprop": "url|size|mime",
        "iiurlwidth": 1600,
        "format": "json",
    })
    req = urllib.request.Request(
        f"https://commons.wikimedia.org/w/api.php?{q}",
        headers={"User-Agent": UA},
    )
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            data = json.loads(r.read().decode())
    except Exception as e:
        print("  api fail", title, e)
        return None
    pages = data.get("query", {}).get("pages", {})
    for p in pages.values():
        info = (p.get("imageinfo") or [None])[0]
        if not info:
            continue
        return info.get("thumburl") or info.get("url")
    return None


def fetch(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read()
    except Exception as e:
        print("  get fail", url[:80], e)
        return None


def fetch_wiki(rel: str, title: str) -> bool:
    dest = IMG / rel
    url = wiki_url(title)
    if not url:
        print("NOURL", title)
        return False
    raw = fetch(url)
    if not raw:
        return False
    return save_jpeg(dest, raw)


def search_commons(query: str) -> str | None:
    q = urllib.parse.urlencode({
        "action": "query",
        "list": "search",
        "srsearch": query,
        "srnamespace": 6,
        "srlimit": 8,
        "format": "json",
    })
    req = urllib.request.Request(
        f"https://commons.wikimedia.org/w/api.php?{q}",
        headers={"User-Agent": UA},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode())
    except Exception as e:
        print("  search fail", query, e)
        return None
    skip = ("diagram", "map", "svg", "icon", "logo", "chart", "djvu", "pdf",
            "mars", "nasa earth", "flag", "coat of", "illustration")
    for hit in data.get("query", {}).get("search", []):
        title = hit.get("title", "")
        low = title.lower()
        if any(s in low for s in skip):
            continue
        return title.replace("File:", "")
    return None


def ov_search(query: str) -> bytes | None:
    q = urllib.parse.urlencode({
        "q": query,
        "license_type": "commercial,modification",
        "category": "photograph",
        "page_size": 12,
        "mature": "false",
    })
    req = urllib.request.Request(
        f"https://api.openverse.org/v1/images/?{q}",
        headers={"User-Agent": UA},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode())
    except Exception as e:
        print("  ov fail", query, e)
        return None
    skip = ("alamy", "dreamstime", "shutterstock", "istock", "getty", "adobe")
    for item in data.get("results", []):
        url = item.get("url") or ""
        title = (item.get("title") or "").lower()
        if any(s in url.lower() or s in title for s in skip):
            continue
        if any(s in title for s in ("illustration", "vector", "clipart", "diagram", "ai generated")):
            continue
        raw = fetch(url)
        if raw and len(raw) > 8000:
            print("  OV", item.get("title", "")[:70])
            return raw
    return None


def hashes_of(folder: Path, primaries: bool) -> dict[str, list[str]]:
    m: dict[str, list[str]] = {}
    for p in sorted(folder.glob("*.jpg")):
        if primaries and p.name.endswith("-2.jpg"):
            continue
        h = md5_bytes(p.read_bytes())
        m.setdefault(h, []).append(p.stem)
    return m


def article_slugs() -> list[str]:
    text = Path("/workspace/src/lib/knowledge/covers.ts").read_text()
    slugs = []
    for line in text.splitlines():
        line = line.strip()
        if line.startswith('"') and '": pair(' in line or (line.startswith('"') and '": [' in line):
            slugs.append(line.split('"')[1])
    return slugs


def wiki_ids() -> list[str]:
    text = Path("/workspace/src/lib/encyclopedia.ts").read_text()
    ids = []
    for line in text.splitlines():
        if '{ id: "' in line:
            ids.append(line.split('{ id: "')[1].split('"')[0])
    return ids


def used_hashes() -> set[str]:
    s = set()
    for folder in (ART, WIKI, IMG):
        for p in folder.glob("*.jpg"):
            if p.parent == IMG and p.name not in ("olivine.jpg", "hero-field.jpg", "healthy-soil.jpg", "soil-profile.jpg"):
                continue
            s.add(md5_bytes(p.read_bytes()))
    return s


def main() -> None:
    print("=== copy curated ===")
    for sid, rel in COPY.items():
        copy_searched(sid, rel)

    print("=== wikimedia named ===")
    for rel, title in WIKI_FILES.items():
        dest = IMG / rel
        # still try if missing or if we want a better photo
        ok = fetch_wiki(rel, title)
        if not ok:
            q = title.replace(".jpg", "").replace(".JPG", "").replace("_", " ")
            found = search_commons(q)
            if found:
                print("  fallback search", found)
                fetch_wiki(rel, found)
        time.sleep(0.35)

    slugs = article_slugs()
    wids = wiki_ids()
    print("slugs", len(slugs), "wiki", len(wids))

    # fill missing article primaries / secondaries and wiki primaries
    queries = {
        "lian-zuo": "wilted tomato plants greenhouse continuous cropping",
        "shao-gen": "fertilizer burn plant roots",
        "wei-sheng-wu": "earthworms in compost soil",
        "que-peng": "hollow stem broccoli boron",
        "shi-gao-gai-jian": "gypsum powder agriculture field",
        "tu-chuan-ku-wei": "fusarium wilt tomato yellow leaves",
        "qing-ku-bing-tu": "bacterial wilt tomato collapsed plant",
        "ji-zhi-yu-tu-rang": "soilless substrate coconut coir grow bag",
        "tu-rang-xiao-du-bian-jie": "soil solarization plastic greenhouse",
        "jian-yi-ph-ec": "handheld soil pH meter field",
        "que-liu": "sulphur deficiency oilseed rape",
        "an-hai": "ammonia leaf burn greenhouse tomato",
        "guo-yuan-tu-rang": "fruit orchard soil under trees",
        "fu-gai-gai-zhi-di": "straw mulch vegetable rows",
        "dashe-yanzhi": "greenhouse white salt soil surface",
        "ping-guo-zai-zhi": "apple orchard replant young tree",
        "gao-wen-men-peng": "soil solarization plastic mulch greenhouse",
        "qian-yu-tian": "gleyed paddy soil profile grey",
        "hua-sheng-kong-jia": "peanut empty pods harvest",
        "gen-fu-jian-bie": "healthy white roots vs brown roots",
        "han-yan-jian-bie": "drought maize wilt vs saline",
        "suan-tu-shi-lin": "phosphate fertilizer granules field",
        "di-biao-fu-yan": "plastic mulch salt accumulation",
        "yan-jian-di-xuan-zuo": "canola growing on saline soil",
        "cao-mei-lian-zuo": "strawberry field soil rows",
        "hei-tu-you-ji-zhi-shou-hu": "chernozem black soil profile",
        "shi-fei-tiao-tu-rang": "farmer soil test report field",
        "yang-fen-kang-kang": "nutrient antagonism maize yellow",
        "yu-hou-ban-jie-kai-lie": "crusted soil after rain seedlings",
        "aggregate": "soil crumbs in hand granular structure",
        "n": "nitrogen deficiency maize lower leaves yellow",
        "al": "aluminium toxicity maize roots acid soil",
        "ec": "soil electrical conductivity meter",
        "saline": "white salt crust agricultural soil",
        "compaction": "compacted soil tractor ruts field",
        "s": "sulfur deficiency yellow canola",
        "cu": "copper deficiency wheat leaf tip",
        "p": "phosphorus deficiency purple maize",
        "zn": "zinc deficiency maize white bud",
        "b": "boron deficiency hollow stem cauliflower",
        "acid": "acid soil maize stunted yellow",
        "salt": "saline soil white crust farmland",
        "test": "soil sampling probe field farmer",
        "ph": "soil pH test in field",
        "fc": "moist soil at field capacity",
        "gley": "gley soil profile grey mottles",
        "replant": "tomato wilt greenhouse continuous",
        "mn": "manganese deficiency soybean leaves",
        "fe": "iron chlorosis grape new leaves",
        "mg": "magnesium deficiency maize interveinal",
        "mo": "molybdenum deficiency wheat",
        "porosity": "porous soil structure aeration",
    }

    print("=== fill missing ===")
    for slug in slugs:
        for suffix in ("", "-2"):
            dest = ART / f"{slug}{suffix}.jpg"
            if dest.exists() and dest.stat().st_size > 8000:
                continue
            q = queries.get(slug, slug.replace("-", " ") + " soil farm photograph")
            print("NEED", dest.name, q)
            title = search_commons(q)
            ok = False
            if title:
                ok = fetch_wiki(f"articles/{dest.name}", title)
            if not ok:
                raw = ov_search(q)
                if raw:
                    ok = save_jpeg(dest, raw)
            time.sleep(0.3)

    for wid in wids:
        dest = WIKI / f"{wid}.jpg"
        if dest.exists() and dest.stat().st_size > 8000:
            continue
        q = queries.get(wid, wid + " soil farm")
        print("NEED wiki", wid, q)
        title = search_commons(q)
        ok = False
        if title:
            ok = fetch_wiki(f"wiki/{wid}.jpg", title)
        if not ok:
            raw = ov_search(q)
            if raw:
                ok = save_jpeg(dest, raw)
        time.sleep(0.3)
        dest2 = WIKI / f"{wid}-2.jpg"
        if not dest2.exists() or dest2.stat().st_size < 8000:
            q2 = q + " closeup field"
            title2 = search_commons(q2)
            if title2:
                fetch_wiki(f"wiki/{wid}-2.jpg", title2)
            else:
                raw = ov_search(q2)
                if raw:
                    save_jpeg(dest2, raw)
            time.sleep(0.3)

    # uniqueness of article primaries
    print("=== uniqueness ===")
    slugs = article_slugs()
    art_h: dict[str, list[str]] = {}
    missing = []
    for s in slugs:
        p = ART / f"{s}.jpg"
        if not p.exists():
            missing.append(s)
            continue
        h = md5_bytes(p.read_bytes())
        art_h.setdefault(h, []).append(s)
    dups = {h: v for h, v in art_h.items() if len(v) > 1}
    print(f"UNIQUE {len(art_h) - len(dups)} of {len(slugs)} missing {missing} dups {dups}")

    wiki_h: dict[str, list[str]] = {}
    wmiss = []
    for s in wids:
        p = WIKI / f"{s}.jpg"
        if not p.exists():
            wmiss.append(s)
            continue
        h = md5_bytes(p.read_bytes())
        wiki_h.setdefault(h, []).append(s)
    wdups = {h: v for h, v in wiki_h.items() if len(v) > 1}
    print(f"WIKI UNIQUE {len(wiki_h) - len(wdups)} of {len(wids)} missing {wmiss} dups {wdups}")
    print("olivine", (IMG / "olivine.jpg").exists(), (IMG / "olivine.jpg").stat().st_size if (IMG / "olivine.jpg").exists() else 0)


if __name__ == "__main__":
    main()
