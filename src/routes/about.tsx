import { createFileRoute, Link } from "@tanstack/react-router";
import { APP_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: `关于｜${APP_NAME}` }, { name: "description", content: "土知是给农民和农技人员用的土壤科普工具。" }],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <article className="space-y-5 text-lg leading-relaxed">
      <h1 className="font-display text-3xl font-semibold">{a.title}</h1>
      <p>{a.p1}</p>
      <h2 className="font-display text-2xl">{a.do}</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>{a.d1}</li>
        <li>{a.d2}</li>
        <li>{a.d3}</li>
        <li>{a.d4}</li>
      </ul>
      <h2 className="font-display text-2xl">{a.dont}</h2>
      <p>{a.dontP}</p>
      <h2 className="font-display text-2xl">{a.how}</h2>
      <p>{a.howP}</p>
      <h2 className="font-display text-2xl">{a.maker}</h2>
      <p>{a.makerP}</p>
      <p className="flex flex-wrap gap-4">
        <Link to="/privacy" className="text-forest underline">
          {t.footer.privacy}
        </Link>
        <Link to="/contact" className="text-forest underline">
          {t.footer.contact}
        </Link>
        <Link to="/diagnose" className="text-forest underline">
          {t.nav.diagnose}
        </Link>
      </p>
    </article>
  );
}
