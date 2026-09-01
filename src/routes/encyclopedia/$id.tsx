import { createFileRoute, Link } from "@tanstack/react-router";
import { GuidePage } from "@/components/knowledge/GuidePage";
import { APP_NAME } from "@/lib/constants";
import { getTerm, wikiToArticle } from "@/lib/encyclopedia";
import { useI18n } from "@/lib/i18n/lang";
import { getArticle } from "@/lib/knowledge/search";

export const Route = createFileRoute("/encyclopedia/$id")({
  head: ({ params }) => {
    const term = getTerm(params.id);
    return {
      meta: [
        { title: term ? `${term.name}｜土知 · Glossary | Tuzhi` : `百科｜${APP_NAME}` },
        { name: "description", content: term?.plain ?? "" },
      ],
    };
  },
  component: WikiDetail,
});

function WikiDetail() {
  const { id } = Route.useParams();
  const { lang, t } = useI18n();
  const article = wikiToArticle(id, lang === "en" ? "en" : "zh");
  if (!article) {
    return (
      <div className="space-y-3 py-10">
        <h1 className="font-display text-2xl">{t.wiki.missing}</h1>
        <Link to="/encyclopedia" className="text-forest">
          {t.wiki.back}
        </Link>
      </div>
    );
  }
  const related = article.relatedSlugs.map(getArticle).filter((a): a is NonNullable<typeof a> => Boolean(a));
  return (
    <GuidePage
      article={article}
      rawSlug={article.slug}
      related={related}
      backTo="/encyclopedia"
      backLabel={t.wiki.title}
    />
  );
}
