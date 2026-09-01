import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { useI18n } from "@/lib/i18n/lang";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const { t } = useI18n();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-ink">
      <span className="text-danger" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-xl font-semibold">{t.err.title}</h1>
      <p className="max-w-md text-base break-words text-muted">{error.message || t.err.back}</p>
      <Link to="/" className="text-forest underline">
        {t.err.back}
      </Link>
    </main>
  );
}

export function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="space-y-4 py-10">
      <h1 className="font-display text-2xl font-semibold">{t.err.notFound}</h1>
      <p className="text-muted">{t.err.notFoundLead}</p>
      <div className="flex flex-wrap gap-4">
        <Link to="/" className="text-forest underline">
          {t.err.back}
        </Link>
        <Link to="/knowledge" className="text-forest underline">
          {t.err.toKnowledge}
        </Link>
        <Link to="/diagnose" className="text-forest underline">
          {t.err.toDiagnose}
        </Link>
      </div>
    </div>
  );
}
