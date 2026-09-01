import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Camera, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/knowledge/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROBLEM_OPTIONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";
import { labelOf } from "@/lib/i18n/lexicon";
import { farmerLabel, formatPostDate } from "@/lib/farmer";
import { localizePost } from "@/lib/i18n/posts-en";
import { ARTICLES } from "@/lib/knowledge/articles";
import { facetCounts } from "@/lib/knowledge/search";
import { listPosts } from "@/lib/server/community";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "土知 · 看懂土地，种好地" }, { name: "description", content: "面向中国农民的土壤科普：拍照诊断、知识库与问答。" }],
  }),
  component: Home,
});

function Home() {
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [waited, setWaited] = useState(false);
  const hot = ARTICLES.filter((a) => a.hot).slice(0, 4);
  const counts = facetCounts();
  const posts = useQuery({ queryKey: ["home-posts"], queryFn: () => listPosts({ data: {} }) });
  useEffect(() => {
    const timer = setTimeout(() => setWaited(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  const postList = posts.data ?? [];
  const showEmpty = (waited || posts.isError || posts.isSuccess) && postList.length === 0;

  function goSearch(term: string) {
    void navigate({
      to: "/knowledge",
      search: { q: term, crop: undefined, problem: undefined, region: undefined, season: undefined },
    });
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-line bg-surface">
        <img src="/images/hero-field.jpg" alt={t.home.heroAlt} className="h-48 w-full object-cover" />
        <div className="space-y-3 p-5">
          <p className="text-sm text-muted">{t.name}</p>
          <h1 className="font-display text-3xl font-semibold">{t.tagline}</h1>
          <p className="max-w-md text-lg leading-relaxed text-muted">{t.home.lead}</p>
        </div>
      </section>

      <section className="space-y-3">
        <Button asChild size="lg" className="w-full text-xl">
          <Link to="/diagnose">
            <Camera className="size-6" />
            {t.home.diagnose}
          </Link>
        </Button>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            goSearch(q);
          }}
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.home.searchPh} className="pl-11" aria-label={t.home.searchAria} />
          </div>
          <Button type="submit" variant="secondary">
            {t.search}
          </Button>
        </form>
        <div className="flex flex-wrap gap-2">
          {t.examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => goSearch(ex)}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base"
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl font-semibold">{t.home.problems}</h2>
        <div className="flex flex-wrap gap-2">
          {PROBLEM_OPTIONS.filter((p) => (counts.problems[p] ?? 0) > 0).map((p) => (
            <Link
              key={p}
              to="/knowledge"
              search={{ problem: p }}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base text-ink"
            >
              {labelOf(p, lang)} {counts.problems[p]}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold">{t.home.hot}</h2>
          <Link to="/knowledge" className="flex items-center text-sm text-forest">
            {t.home.more} <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-3">
          {hot.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold">{t.home.posts}</h2>
          <Link to="/community" className="flex items-center text-sm text-forest">
            {t.home.toCommunity} <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="space-y-2">
          {postList.slice(0, 3).map((p) => {
            const loc = localizePost(p.title, p.body, lang);
            return (
            <Link key={p.id} to="/community/$id" params={{ id: String(p.id) }} className="block rounded-2xl border border-line bg-surface p-4">
              <p className="font-medium leading-snug">{loc.title}</p>
              <p className="mt-1 text-sm text-muted">
                {farmerLabel(p.display_name, null, lang)} · {formatPostDate(p.created_at, lang)} · {p.answer_count > 0 ? t.home.answered(p.answer_count) : t.home.waiting}
              </p>
            </Link>
            );
          })}
          {showEmpty ? <p className="rounded-xl border border-line bg-surface p-4 text-muted">{t.home.noPosts}</p> : null}
        </div>
      </section>
    </div>
  );
}
