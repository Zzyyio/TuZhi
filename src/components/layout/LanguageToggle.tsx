import { useEffect } from "react";
import { useI18n } from "@/lib/i18n/lang";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, t, toggle } = useI18n();
  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex min-h-10 min-w-12 items-center justify-center rounded-lg border border-line px-3 text-sm font-medium text-ink hover:bg-surface-2 ${className}`}
      aria-label={t.langSwitchAria}
    >
      {lang === "zh" ? "EN" : "中文"}
    </button>
  );
}

/** Keep <html lang> in sync after a toggle. */
export function LangSync() {
  const { lang } = useI18n();
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);
  return null;
}
