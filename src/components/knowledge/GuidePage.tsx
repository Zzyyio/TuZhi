import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArticleCard } from "@/components/knowledge/ArticleCard";
import { BilibiliPlayer } from "@/components/knowledge/BilibiliPlayer";
import { PhotoGallery } from "@/components/knowledge/PhotoGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { encyclopediaAnchor, indicatorView } from "@/lib/encyclopedia";
import { useI18n } from "@/lib/i18n/lang";
import { labelOf } from "@/lib/i18n/lexicon";
import type { Article } from "@/lib/knowledge/types";
import { loadFavs, toggleFav } from "@/lib/local";

function Section({ n, title, id, children }: { n: string; title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="flex items-baseline gap-2 font-display text-2xl font-semibold">
        <span className="text-forest">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function GuidePage({
  article,
  rawSlug,
  videoTitle,
  related,
  backTo,
  backLabel,
}: {
  article: Article;
  rawSlug: string;
  videoTitle?: string;
  related: Article[];
  backTo: "/knowledge" | "/encyclopedia";
  backLabel: string;
}) {
  const { lang, t } = useI18n();
  const k = t.knowledge;
  const [favs, setFavs] = useState(() => loadFavs());
  const [howtoOnly, setHowtoOnly] = useState(false);
  const primary = article.problems[0];

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-muted">
          <Link to={backTo} className="text-forest">
            {backLabel}
          </Link>
        </p>
        <h1 className="font-display text-3xl font-semibold leading-tight">{article.title}</h1>
        <p className="text-lg text-muted">{article.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {primary ? <Badge>{primary}</Badge> : null}
          {article.problems.slice(1).map((tag) => (
            <Badge key={tag} className="opacity-60">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-base leading-relaxed text-muted">{t.fieldHint}</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="text-forest underline" onClick={() => setHowtoOnly((v) => !v)}>
            {howtoOnly ? k.full : k.howto}
          </button>
          <Button type="button" variant="secondary" size="sm" onClick={() => setFavs(toggleFav(rawSlug))}>
            {favs.includes(rawSlug) ? k.faved : k.fav}
          </Button>
        </div>
      </header>

      {!howtoOnly ? (
        <>
          <Section n="1" title={k.s1}>
            <div className="space-y-3 rounded-2xl border border-line bg-surface p-4 text-base leading-relaxed">
              <p>
                <strong>{k.look}</strong>
                {article.phenomenon.appearance}
              </p>
              <p>
                <strong>{k.when}</strong>
                {article.phenomenon.conditions}
              </p>
              <p>
                <strong>{k.crops}</strong>
                {article.phenomenon.commonCrops}
              </p>
              {article.fieldCheck ? (
                <p>
                  <strong>{k.confirm}</strong>
                  {article.fieldCheck}
                </p>
              ) : null}
            </div>
          </Section>

          {article.longform?.length ? (
            <Section n="1b" title={k.sDetail}>
              <div className="space-y-4 rounded-2xl border border-line bg-surface p-4 text-base leading-relaxed">
                {article.longform.map((p, i) => (
                  <p key={`lf-${i}`}>{p}</p>
                ))}
              </div>
            </Section>
          ) : null}

          <Section n="2" title={k.s2}>
            <ul className="space-y-3">
              {article.confuse.map((c, i) => (
                <li key={`${c.lookalike}-${i}`} className="rounded-xl border border-line bg-surface p-4">
                  <p className="font-medium">{k.like(c.lookalike)}</p>
                  <p className="mt-1 text-muted">{c.difference}</p>
                  <p className="mt-1 text-sm text-subtle">
                    {k.photo}
                    {c.photoHint}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section n="3" title={k.s3}>
            <PhotoGallery photos={article.photos} />
            <p className="text-sm text-subtle">{k.photoNote}</p>
          </Section>

          <Section n="4" title={k.s4}>
            <p className="rounded-2xl bg-surface-2 p-4 leading-relaxed">{article.causes.plainExplain}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface p-4">
                <h3 className="mb-2 font-medium">{k.natural}</h3>
                <ul className="list-disc space-y-2 pl-5 text-muted">
                  {article.causes.natural.map((x, i) => (
                    <li key={`n-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-4">
                <h3 className="mb-2 font-medium">{k.human}</h3>
                <ul className="list-disc space-y-2 pl-5 text-muted">
                  {article.causes.human.map((x, i) => (
                    <li key={`h-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </>
      ) : null}

      <Section n="5" title={k.s5} id="how">
        <ol className="space-y-3">
          {article.solutions.steps.map((s, i) => (
            <li key={`step-${i}`} className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest text-sm font-semibold text-forest-fg">
                {i + 1}
              </span>
              <span className="leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section n="6" title={k.s6}>
        <div className="overflow-hidden rounded-2xl border border-line">
          {article.dosage.map((d, i) => (
            <div key={`${d.name}-${i}`} className="border-b border-line bg-surface p-4 last:border-b-0">
              <p className="font-medium">{d.name}</p>
              <p className="text-lg">{d.range}</p>
              <p className="mt-1 text-sm text-muted">{d.note}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted">{k.doseNote}</p>
      </Section>

      {article.dontDo?.length ? (
        <Section n="7" title={k.s7}>
          <ul className="list-disc space-y-2 rounded-2xl border border-line bg-surface p-4 pl-8">
            {article.dontDo.map((x, i) => (
              <li key={`dont-${i}`}>{x}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {article.whenToTest ? (
        <Section n="8" title={k.s8}>
          <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{article.whenToTest}</p>
        </Section>
      ) : null}

      {!howtoOnly ? (
        <>
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">{k.prevent}</h2>
            <ul className="list-disc space-y-2 pl-5">
              {article.prevention.map((x, i) => (
                <li key={`prev-${i}`}>{x}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">{k.indicators}</h2>
            <div className="overflow-hidden rounded-2xl border border-line">
              {article.indicators.map((i, idx) => (
                <div key={`${i.name}-${idx}`} className="border-b border-line bg-surface p-4 last:border-b-0">
                  <p className="font-medium">
                    <Link to="/encyclopedia/$id" params={{ id: encyclopediaAnchor(i.name) }} className="text-forest">
                      {indicatorView(i.name, lang)}
                    </Link>
                  </p>
                  <p className="text-sm text-muted">{i.meaning}</p>
                  <p className="mt-1 text-sm">{i.typical}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">{k.videos}</h2>
            <ul className="space-y-3">
              {article.solutions.videos.map((v) => (
                <li key={v.url} className="overflow-hidden rounded-xl border border-line bg-surface p-3">
                  <BilibiliPlayer slug={rawSlug} url={v.url} title={v.title || videoTitle || article.title} topic={article.title} playLabel={k.play} />
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}

      {related.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">{k.related}</h2>
          <div className="grid gap-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="text-sm text-muted">{k.updated(article.updatedAt, labelOf(article.reviewer, lang))}</p>
      <Link to="/diagnose" className="flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg">
        {k.ask}
      </Link>
    </article>
  );
}
