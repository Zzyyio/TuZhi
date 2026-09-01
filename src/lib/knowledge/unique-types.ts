import type { Article } from "./types";

export type UniquePatch = Partial<
  Pick<
    Article,
    | "subtitle"
    | "summary"
    | "fieldCheck"
    | "dontDo"
    | "whenToTest"
    | "prevention"
    | "phenomenon"
    | "causes"
    | "dosage"
    | "relatedSlugs"
  >
> & {
  uniqueAngle: string;
  steps?: string[];
  confuse?: Article["confuse"];
  indicators?: Article["indicators"];
};
