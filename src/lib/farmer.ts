import type { Lang } from "@/lib/i18n/lang";
import { readLangFromStorage } from "@/lib/i18n/lang";

/** 登录后展示名：农户后四位，不要把演示邮箱摊开。 */
export function farmerLabel(displayName?: string | null, email?: string | null, lang?: Lang): string {
  const en = (lang ?? readLangFromStorage()) === "en";
  const em = email ?? "";
  const m = em.match(/^(\d{7,11})@phone\.tuzhi\.local$/i);
  if (m) return en ? `Farmer ${m[1].slice(-4)}` : `农户${m[1].slice(-4)}`;
  const n = (displayName ?? "").trim();
  if (n && n !== "Account" && !n.includes("@") && !n.toLowerCase().includes("phone.tuzhi")) {
    if (en && /^农户(\d{4})$/.test(n)) return `Farmer ${n.slice(-4)}`;
    if (en && /李泽宇|Li Zeyu/i.test(n)) return "Li Zeyu 李泽宇";
    return n;
  }
  return en ? "Farmer" : "农户";
}

export function formatPostDate(iso: string, lang: Lang): string {
  const day = iso.slice(0, 10);
  const m = day.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  const year = m[1];
  const month = Number(m[2]);
  const date = Number(m[3]);
  if (lang === "en") {
    const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${names[month - 1] ?? ""} ${date}, ${year}`;
  }
  return `${year}年${month}月${date}日`;
}

export function isLiZeyu(name: string, userId?: string): boolean {
  if (userId === "li-zeyu") return true;
  return /李泽宇|Li Zeyu/i.test(name);
}
