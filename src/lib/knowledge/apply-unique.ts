import { UNIQUE } from "./unique";
import type { Article } from "./types";

export function applyUnique(a: Article): Article {
  const u = UNIQUE[a.slug];
  if (!u) return a;
  return {
    ...a,
    subtitle: u.subtitle ?? a.subtitle,
    summary: u.summary ?? a.summary,
    fieldCheck: u.fieldCheck ?? a.fieldCheck,
    dontDo: u.dontDo ?? a.dontDo,
    whenToTest: u.whenToTest ?? a.whenToTest,
    prevention: u.prevention ?? a.prevention,
    phenomenon: u.phenomenon ?? a.phenomenon,
    confuse: u.confuse ?? a.confuse,
    causes: u.causes ?? a.causes,
    dosage: u.dosage ?? a.dosage,
    relatedSlugs: u.relatedSlugs ?? a.relatedSlugs,
    solutions: u.steps ? { ...a.solutions, steps: u.steps } : a.solutions,
    indicators: u.indicators ?? a.indicators,
  };
}
