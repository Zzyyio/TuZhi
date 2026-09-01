#!/usr/bin/env python3
"""Build detail-body.ts + articles-en-long.ts from longform.tsv and optional extras."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path("/workspace")
TSV = Path("/workspace/scripts/longform.tsv")


def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def ts_list(xs: list[str]) -> str:
    return "[\n      " + ",\n      ".join(ts_str(x) for x in xs) + ",\n    ]"


def main() -> None:
    rows = {}
    for line in TSV.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) < 9:
            raise SystemExit(f"bad row {parts[0]!r} fields={len(parts)}")
        slug, z1, z2, z3, z4, e1, e2, e3, e4 = [p.strip() for p in parts[:9]]
        rows[slug] = {"zh": [z1, z2, z3, z4], "en": [e1, e2, e3, e4]}

    extras_path = Path("/workspace/scripts/detail_extras.json")
    extras = json.loads(extras_path.read_text()) if extras_path.exists() else {}

    body_chunks = []
    en_chunks = []
    for slug, r in rows.items():
        extra = extras.get(slug, {})
        fields = [f"    longform: {ts_list(r['zh'])},", f"    longformEn: {ts_list(r['en'])},"]
        mapping = {
            "appearance": "appearance",
            "conditions": "conditions",
            "plainExplain": "plainExplain",
            "steps": "steps",
            "natural": "natural",
            "human": "human",
            "fieldCheck": "fieldCheck",
            "dontDo": "dontDo",
            "whenToTest": "whenToTest",
            "prevention": "prevention",
        }
        for k, outk in mapping.items():
            if k in extra:
                v = extra[k]
                fields.insert(0, f"    {outk}: {ts_list(v) if isinstance(v, list) else ts_str(v)},")
        body_chunks.append("  " + ts_str(slug) + ": {\n" + "\n".join(fields) + "\n  }")
        en_fields = [f"    longform: {ts_list(r['en'])},"]
        en_map = {
            "elook": "appearance",
            "ewhen": "conditions",
            "eplain": "plainExplain",
            "esteps": "steps",
            "enat": "natural",
            "ehum": "human",
            "echeck": "fieldCheck",
            "edont": "dontDo",
            "etest": "whenToTest",
            "eprev": "prevention",
        }
        for k, outk in en_map.items():
            if k in extra:
                v = extra[k]
                en_fields.insert(0, f"    {outk}: {ts_list(v) if isinstance(v, list) else ts_str(v)},")
        en_chunks.append("  " + ts_str(slug) + ": {\n" + "\n".join(en_fields) + "\n  }")

    (ROOT / "src/lib/knowledge/detail-body.ts").write_text(
        'import type { DetailBody } from "./detail-types";\n\n'
        "export const BODY: Record<string, DetailBody> = {\n" + ",\n".join(body_chunks) + ",\n};\n"
    )
    (ROOT / "src/lib/i18n/articles-en-long.ts").write_text(
        "export const ARTICLES_EN_LONG: Record<string, { longform?: string[]; appearance?: string; conditions?: string; plainExplain?: string; steps?: string[]; natural?: string[]; human?: string[]; fieldCheck?: string; dontDo?: string[]; whenToTest?: string; prevention?: string[] }> = {\n"
        + ",\n".join(en_chunks)
        + ",\n};\n"
    )
    print("wrote", len(rows), "longforms")


if __name__ == "__main__":
    main()
