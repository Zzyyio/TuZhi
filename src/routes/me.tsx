import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { farmerLabel } from "@/lib/farmer";
import { useI18n } from "@/lib/i18n/lang";
import { localizeArticle } from "@/lib/i18n/localize";
import { localizePost } from "@/lib/i18n/posts-en";
import { getArticle } from "@/lib/knowledge/search";
import { loadFavs, loadHistory } from "@/lib/local";
import { myPosts } from "@/lib/server/community";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "我的｜土知 · Me | Tuzhi" }] }),
  component: MePage,
});

function MePage() {
  const { user, isPending } = useCurrentUserState();
  const { lang, t } = useI18n();
  const m = t.me;
  const [favs] = useState(() => loadFavs());
  const history = useMemo(() => loadHistory(), []);
  const posts = useQuery({ queryKey: ["me-posts"], queryFn: () => myPosts(), enabled: Boolean(user) });

  if (isPending) return <div className="h-32 animate-pulse rounded-xl bg-surface-2" />;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-line bg-surface p-4">
        <h1 className="font-display text-3xl font-semibold">{m.title}</h1>
        {user ? (
          <p className="mt-2 text-lg">{farmerLabel(user.displayName, user.primaryEmail, lang)}</p>
        ) : (
          <p className="mt-2 text-muted">{m.guest}</p>
        )}
        {!user ? (
          <Link to="/login" className="mt-3 flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg">
            {m.loginSync}
          </Link>
        ) : null}
      </header>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-semibold">{m.history}</h2>
        <p className="text-sm text-muted">{m.historyNote}</p>
        {history.length === 0 ? <p className="text-muted">{m.noHistory}</p> : null}
        {history.map((h) => (
          <div key={h.id} className="rounded-xl border border-line bg-surface p-3">
            <p className="font-medium">{h.kind || h.category || t.nav.diagnose}</p>
            <p className="text-sm text-muted">{h.question}</p>
            <p className="mt-1 text-sm">{h.summary}</p>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-semibold">{m.favs}</h2>
        {favs.length === 0 ? <p className="text-muted">{m.noFavs}</p> : null}
        {favs.map((slug) => {
          const a = getArticle(slug);
          if (!a) return null;
          return (
            <Link key={slug} to="/knowledge/$slug" params={{ slug }} className="block rounded-xl border border-line bg-surface p-3">
              {localizeArticle(a, lang).title}
            </Link>
          );
        })}
      </section>

      {user ? (
        <section className="space-y-2">
          <h2 className="font-display text-xl font-semibold">{m.myPosts}</h2>
          {(posts.data ?? []).map((p) => (
            <Link key={p.id} to="/community/$id" params={{ id: String(p.id) }} className="block rounded-xl border border-line bg-surface p-3">
              {localizePost(p.title, "", lang).title}
            </Link>
          ))}
          {(posts.data ?? []).length === 0 ? <p className="text-muted">{m.noPosts}</p> : null}
          <Link to="/community/new" className="block text-forest underline">
            {m.goAsk}
          </Link>
        </section>
      ) : null}
    </div>
  );
}
