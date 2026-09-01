import { createFileRoute } from "@tanstack/react-router";
import { APP_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: `隐私与免责｜${APP_NAME}` }, { name: "description", content: "隐私与免责" }],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useI18n();
  const p = t.privacy;
  return (
    <article className="space-y-4 text-lg leading-relaxed">
      <h1 className="font-display text-3xl font-semibold">{p.title}</h1>
      <p>{t.disclaimer}</p>
      <p>{p.p2}</p>
      <p>{p.p3}</p>
      <p>{p.p4}</p>
    </article>
  );
}
