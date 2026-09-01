import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { ArticleCard } from "@/components/knowledge/ArticleCard";
import { Input } from "@/components/ui/input";
import { CROP_OPTIONS, PROBLEM_OPTIONS, REGION_OPTIONS, SEASON_OPTIONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";
import { labelOf } from "@/lib/i18n/lexicon";
import { facetCounts, filterArticles } from "@/lib/knowledge/search";

export type KnowledgeSearch = {
  q?: string;
  crop?: string;
  problem?: string;
  region?: string;
  season?: string;
};

export const Route = createFileRoute("/knowledge/")({
  validateSearch: (s: Record<string, unknown>): KnowledgeSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    crop: typeof s.crop === "string" ? s.crop : undefined,
    problem: typeof s.problem === "string" ? s.problem : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    season: typeof s.season === "string" ? s.season : undefined,
  }),
  head: () => ({
    meta: [{ title: "知识库｜土知 · Handbook | Tuzhi" }, { name: "description", content: "按作物、问题和地区查找土壤明白纸。" }],
  }),
  component: KnowledgePage,
});

function Chip({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-base text-forest-fg"
          : "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base text-ink"
      }
    >
      {children}
    </button>
  );
}

function KnowledgePage() {
  const { lang, t } = useI18n();
  const k = t.knowledge;
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const counts = facetCounts();
  const articles = filterArticles({ ...search, lang });

  function patch(partial: Partial<KnowledgeSearch>) {
    void navigate({ search: { ...search, ...partial } });
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold">{k.title}</h1>
        <p className="text-muted">{k.lead}</p>
        <Link to="/encyclopedia" className="inline-block text-forest">
          {k.toWiki}
        </Link>
      </header>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" />
        <Input value={search.q ?? ""} onChange={(e) => patch({ q: e.target.value })} placeholder={k.ph} className="pl-11" />
      </div>
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-muted">{k.byProblem}</h2>
        <div className="flex flex-wrap gap-2">
          <Chip active={!search.problem} onClick={() => patch({ problem: undefined })}>
            {t.all}
          </Chip>
          {PROBLEM_OPTIONS.filter((p) => (counts.problems[p] ?? 0) > 0).map((p) => (
            <Chip key={p} active={search.problem === p} onClick={() => patch({ problem: p })}>
              {labelOf(p, lang)} {counts.problems[p]}
            </Chip>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-muted">{k.byCrop}</h2>
        <div className="flex flex-wrap gap-2">
          <Chip active={!search.crop} onClick={() => patch({ crop: undefined })}>
            {t.all}
          </Chip>
          {CROP_OPTIONS.filter((p) => (counts.crops[p] ?? 0) > 0).map((p) => (
            <Chip key={p} active={search.crop === p} onClick={() => patch({ crop: p })}>
              {labelOf(p, lang)} {counts.crops[p]}
            </Chip>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-muted">{k.byRegion}</h2>
        <div className="flex flex-wrap gap-2">
          <Chip active={!search.region} onClick={() => patch({ region: undefined })}>
            {t.all}
          </Chip>
          {REGION_OPTIONS.filter((p) => (counts.regions[p] ?? 0) > 0).map((p) => (
            <Chip key={p} active={search.region === p} onClick={() => patch({ region: p })}>
              {labelOf(p, lang)} {counts.regions[p]}
            </Chip>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-muted">{k.bySeason}</h2>
        <div className="flex flex-wrap gap-2">
          <Chip active={!search.season} onClick={() => patch({ season: undefined })}>
            {t.all}
          </Chip>
          {SEASON_OPTIONS.map((p) => (
            <Chip key={p} active={search.season === p} onClick={() => patch({ season: p })}>
              {labelOf(p, lang)} {counts.seasons[p] ?? 0}
            </Chip>
          ))}
        </div>
      </section>
      <p className="text-sm text-muted">{k.count(articles.length)}</p>
      <div className="grid gap-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} selectedCrop={search.crop} />
        ))}
        {articles.length === 0 ? (
          <p className="rounded-xl border border-line bg-surface p-6 text-muted">
            {k.empty}
            <Link to="/diagnose" className="mt-3 flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg">
              {k.goDiagnose}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
