import { SENSITIVE_WORDS } from "@/lib/constants";

export function blockedReason(text: string): string | null {
  const t = text.replace(/\s+/g, "");
  for (const w of SENSITIVE_WORDS) {
    if (t.includes(w)) return "内容含有不允许的信息，请修改后再发。";
  }
  return null;
}
