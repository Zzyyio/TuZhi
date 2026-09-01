import type { Article } from "./types";
import { BODY } from "./detail-body";

export function applyDetail(a: Article): Article {
  const d = BODY[a.slug];
  if (!d) return a;
  return {
    ...a,
    phenomenon: {
      appearance: d.appearance ?? a.phenomenon.appearance,
      conditions: d.conditions ?? a.phenomenon.conditions,
      commonCrops: d.commonCrops ?? a.phenomenon.commonCrops,
    },
    causes: {
      natural: d.natural ?? a.causes.natural,
      human: d.human ?? a.causes.human,
      plainExplain: d.plainExplain ?? a.causes.plainExplain,
    },
    solutions: d.steps?.length ? { ...a.solutions, steps: d.steps } : a.solutions,
    fieldCheck: d.fieldCheck ?? a.fieldCheck,
    dontDo: d.dontDo ?? a.dontDo,
    whenToTest: d.whenToTest ?? a.whenToTest,
    prevention: d.prevention ?? a.prevention,
    longform: d.longform ?? a.longform,
  };
}
