#!/usr/bin/env python3
"""Emit detail-body.ts and articles-en-long.ts."""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, "/workspace/scripts")
from detail_lib import DATA
import detail_set1  # noqa: F401
import detail_e  # noqa: F401
import detail_rest  # noqa: F401

ROOT = Path("/workspace")


def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def ts_list(xs: list[str]) -> str:
    inner = ",\n      ".join(ts_str(x) for x in xs)
    return "[\n      " + inner + ",\n    ]"


def field_list(d, key, indent="    "):
    if key not in d or not d[key]:
        return ""
    return f"{indent}{key}: {ts_list(d[key])},\n"


def field_str(d, key, indent="    "):
    if key not in d or not d[key]:
        return ""
    return f"{indent}{key}: {ts_str(d[key])},\n"


def emit() -> None:
    chunks = []
    en_chunks = []
    for slug, d in DATA.items():
        body = (
            f"  {ts_str(slug)}: {{\n"
            + field_str(d, "look").replace("look:", "appearance:")
            + field_str(d, "when").replace("when:", "conditions:")
            + field_str(d, "plain").replace("plain:", "plainExplain:")
            + field_list(d, "nat").replace("nat:", "natural:")
            + field_list(d, "hum").replace("human:" if False else "hum:", "human:")
            + field_list(d, "steps")
            + field_str(d, "check").replace("check:", "fieldCheck:")
            + field_list(d, "dont").replace("dont:", "dontDo:")
            + field_str(d, "test").replace("test:", "whenToTest:")
            + field_list(d, "prev").replace("prev:", "prevention:")
            + f"    longform: {ts_list(d['longform'])},\n"
            + f"    longformEn: {ts_list(d['longformEn'])},\n"
            + "  }"
        )
        chunks.append(body)
        en = (
            f"  {ts_str(slug)}: {{\n"
            + field_str(d, "elook").replace("elook:", "appearance:")
            + field_str(d, "ewhen").replace("ewhen:", "conditions:")
            + field_str(d, "eplain").replace("eplain:", "plainExplain:")
            + field_list(d, "esteps").replace("esteps:", "steps:")
            + field_str(d, "echeck").replace("echeck:", "fieldCheck:")
            + field_list(d, "edont").replace("edont:", "dontDo:")
            + field_str(d, "etest").replace("etest:", "whenToTest:")
            + field_list(d, "eprev").replace("eprev:", "prevention:")
            + field_list(d, "enat").replace("enat:", "natural:")
            + field_list(d, "ehum").replace("ehum:", "human:")
            + f"    longform: {ts_list(d['longformEn'])},\n"
            + "  }"
        )
        en_chunks.append(en)

    (ROOT / "src/lib/knowledge/detail-body.ts").write_text(
        'import type { DetailBody } from "./detail-types";\n\n'
        "export const BODY: Record<string, DetailBody> = {\n"
        + ",\n".join(chunks)
        + ",\n};\n"
    )
    (ROOT / "src/lib/i18n/articles-en-long.ts").write_text(
        'import type { ArticleEn } from "./articles-en";\n\n'
        "export const ARTICLES_EN_LONG: Record<string, Partial<ArticleEn>> = {\n"
        + ",\n".join(en_chunks)
        + ",\n};\n"
    )
    print("wrote", len(DATA), "articles")


if __name__ == "__main__":
    emit()
