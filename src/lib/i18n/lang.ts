import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ui } from "./messages";

export type Lang = "zh" | "en";

type LangState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

export const useLang = create<LangState>()(
  persist(
    (set, get) => ({
      lang: "zh",
      setLang: (lang) => set({ lang }),
      toggle: () => set({ lang: get().lang === "zh" ? "en" : "zh" }),
    }),
    { name: "tuzhi-lang" },
  ),
);

export function readLangFromStorage(): Lang {
  if (typeof window === "undefined") return "zh";
  try {
    const raw = localStorage.getItem("tuzhi-lang");
    if (!raw) return "zh";
    const parsed = JSON.parse(raw) as { state?: { lang?: string }; lang?: string };
    const v = parsed.state?.lang ?? parsed.lang;
    return v === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

export function useI18n() {
  const lang = useLang((s) => s.lang);
  const toggle = useLang((s) => s.toggle);
  const setLang = useLang((s) => s.setLang);
  return { lang, t: ui[lang], toggle, setLang };
}
