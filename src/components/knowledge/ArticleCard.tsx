import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/lang";
import { localizeArticle } from "@/lib/i18n/localize";
import type { Article } from "@/lib/knowledge/types";

export function articleCover(article: Article, _selectedCrop?: string) {
  return article.photos[0]?.src ?? "";
}

export function ArticleCard({
  article,
}: {
  article: Article;
  selectedCrop?: string;
}) {
  const { lang } = useI18n();
  const loc = localizeArticle(article, lang);
  const cover = articleCover(article);
  return (
    <Link
      to="/knowledge/$slug"
      params={{ slug: article.slug }}
      className="flex overflow-hidden rounded-2xl border border-line bg-surface"
    >
      {cover ? (
        <img
          src={cover}
          alt=""
          className="h-28 w-28 shrink-0 bg-surface-2 object-cover sm:h-32 sm:w-36"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
      ) : (
        <span className="h-28 w-28 shrink-0 bg-surface-2 sm:h-32 sm:w-36" />
      )}
      <span className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-3">
        <span className="font-display text-lg font-semibold leading-snug text-ink">{loc.title}</span>
        <span className="line-clamp-2 text-sm text-muted">{loc.summary}</span>
        <span className="flex flex-wrap gap-1">
          {loc.problems.slice(0, 1).map((p) => (
            <Badge key={p}>{p}</Badge>
          ))}
        </span>
      </span>
    </Link>
  );
}
