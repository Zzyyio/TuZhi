import { createFileRoute, Link } from "@tanstack/react-router";
import { GuidePage } from "@/components/knowledge/GuidePage";
import { APP_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";
import { localizeArticle } from "@/lib/i18n/localize";
import { getArticle, relatedArticles } from "@/lib/knowledge/search";

export const Route = createFileRoute("/knowledge/$slug")({
  head: ({ params }) => {
    const article = getArticle(params.slug);
    return {
      meta: [
        { title: article ? `${article.title}｜${APP_NAME}` : `知识｜${APP_NAME}` },
        { name: "description", content: article?.phenomenon.appearance.slice(0, 80) ?? "" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { lang, t } = useI18n();
  const k = t.knowledge;
  const raw = getArticle(slug);
  if (!raw) {
    return (
      <div className="space-y-3 py-10">
        <h1 className="font-display text-2xl">{k.missing}</h1>
        <Link to="/knowledge" className="text-forest">
          {k.back}
        </Link>
      </div>
    );
  }
  const article = localizeArticle(raw, lang);
  return (
    <GuidePage
      article={article}
      rawSlug={raw.slug}
      related={relatedArticles(raw)}
      backTo="/knowledge"
      backLabel={k.title}
    />
  );
}
