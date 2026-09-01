import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PROBLEM_OPTIONS } from "@/lib/constants";
import { farmerLabel, formatPostDate } from "@/lib/farmer";
import { useI18n } from "@/lib/i18n/lang";
import { labelOf } from "@/lib/i18n/lexicon";
import { localizePost } from "@/lib/i18n/posts-en";
import { facetCounts } from "@/lib/knowledge/search";
import { listPosts } from "@/lib/server/community";

export const Route = createFileRoute("/community/")({
  validateSearch: (s: Record<string, unknown>): { problem?: string } => ({
    problem: typeof s.problem === "string" ? s.problem : undefined,
  }),
  head: () => ({
    meta: [{ title: "问答社区｜土知 · Q&A | Tuzhi" }, { name: "description", content: "把地里的问题发出来，互相帮。" }],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  const { lang, t } = useI18n();
  const c = t.community;
  const { problem } = Route.useSearch();
  const nav = Route.useNavigate();
  const counts = facetCounts();
  const [waited, setWaited] = useState(false);
  const q = useQuery({
    queryKey: ["posts", problem],
    queryFn: () => listPosts({ data: { problem: problem || undefined } }),
  });
  useEffect(() => {
    const timer = setTimeout(() => setWaited(true), 2000);
    return () => clearTimeout(timer);
  }, [problem]);
  const list = q.data ?? [];
  const showEmpty = (waited || q.isError || q.isSuccess) && list.length === 0;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-3xl font-semibold">{c.title}</h1>
        <p className="mt-1 text-muted">{c.lead}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => nav({ search: { problem: undefined } })}
          className={!problem ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2"}
        >
          {t.all}
        </button>
        {PROBLEM_OPTIONS.filter((p) => (counts.problems[p] ?? 0) > 0).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => nav({ search: { problem: p } })}
            className={problem === p ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2"}
          >
            {labelOf(p, lang)}
          </button>
        ))}
      </div>
      <Link to="/community/new" className="flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg text-forest-fg">
        {c.ask}
      </Link>
      <div className="space-y-3">
        {list.map((p) => {
          const loc = localizePost(p.title, p.body, lang);
          return (
            <Link key={p.id} to="/community/$id" params={{ id: String(p.id) }} className="block rounded-2xl border border-line bg-surface p-4">
              <p className="font-medium leading-snug">{loc.title}</p>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{loc.body}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-subtle">
                {p.problem_type ? <Badge>{labelOf(p.problem_type, lang)}</Badge> : null}
                {p.crop ? <Badge>{labelOf(p.crop, lang)}</Badge> : null}
                {p.region ? <Badge>{labelOf(p.region, lang)}</Badge> : null}
                <span>{farmerLabel(p.display_name, null, lang)}</span>
                <span>{formatPostDate(p.created_at, lang)}</span>
                <span>{p.answer_count > 0 ? c.answered(p.answer_count) : c.waiting}</span>
              </div>
            </Link>
          );
        })}
        {showEmpty ? (
          <p className="rounded-xl border border-line bg-surface p-6 text-muted">
            {c.empty}
            <span className="mt-3 flex gap-3">
              <Link to="/diagnose" className="text-forest underline">
                {t.nav.diagnose}
              </Link>
              <Link to="/knowledge" className="text-forest underline">
                {t.nav.knowledge}
              </Link>
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
