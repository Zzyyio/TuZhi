import { SET_A } from "./set-a";
import { SET_C } from "./set-c";
import { SET_D } from "./set-d";
import { SET_E } from "./set-e";
import { SET_F } from "./set-f";
import { SET_REST } from "./set-rest";
import { applyUnique } from "./apply-unique";
import { applyDetail } from "./detail";
import type { Article } from "./types";

export const ARTICLES: Article[] = [...SET_A, ...SET_REST, ...SET_C, ...SET_D, ...SET_E, ...SET_F]
  .map(applyUnique)
  .map(applyDetail);

export function assertHundred(): number {
  return ARTICLES.length;
}
