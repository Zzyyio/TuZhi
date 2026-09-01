import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n/lang";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-10 border-t border-line pb-28 pt-6 text-base text-muted md:pb-8">
      <p className="font-display text-lg text-ink">
        {t.name} · {t.tagline}
      </p>
      <p className="mt-1 text-sm">{t.footer.maker}</p>
      <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        <Link to="/about" className="text-forest underline">
          {t.footer.about}
        </Link>
        <Link to="/knowledge" className="text-forest underline">
          {t.footer.knowledge}
        </Link>
        <Link to="/encyclopedia" className="text-forest underline">
          {t.footer.wiki}
        </Link>
        <Link to="/community" className="text-forest underline">
          {t.footer.community}
        </Link>
        <Link to="/privacy" className="text-forest underline">
          {t.footer.privacy}
        </Link>
        <Link to="/contact" className="text-forest underline">
          {t.footer.contact}
        </Link>
      </nav>
      <p className="mt-3 leading-relaxed">{t.disclaimer}</p>
    </footer>
  );
}
