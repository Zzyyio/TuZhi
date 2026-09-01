import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { VoiceButton } from "@/components/diagnose/VoiceButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { farmerLabel, formatPostDate, isLiZeyu } from "@/lib/farmer";
import { useI18n } from "@/lib/i18n/lang";
import { labelOf } from "@/lib/i18n/lexicon";
import { localizeAnswer, localizePost } from "@/lib/i18n/posts-en";
import { createAnswer, getPost } from "@/lib/server/community";

export const Route = createFileRoute("/community/$id")({
  head: () => ({ meta: [{ title: "问答详情｜土知 · Q&A | Tuzhi" }] }),
  component: PostPage,
});

function PostPage() {
  const { id } = Route.useParams();
  const { user } = useCurrentUserState();
  const { lang, t } = useI18n();
  const c = t.community;
  const q = useQuery({ queryKey: ["post", id], queryFn: () => getPost({ data: { id } }) });
  const [body, setBody] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (q.isLoading) return <p className="text-muted">{c.loading}</p>;
  if (q.isError || !q.data?.post) {
    return (
      <p className="text-muted">
        {c.gone}
        <Link to="/community" className="ml-2 text-forest underline">
          {c.back}
        </Link>
      </p>
    );
  }
  const { post, answers } = q.data;
  const loc = localizePost(post.title, post.body, lang);

  async function reply(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const res = await createAnswer({ data: { postId: post.id, body } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error === "short" ? c.errReply : res.error === "blocked" ? c.errBlocked : c.gone);
      return;
    }
    setBody("");
    void q.refetch();
  }

  return (
    <article className="space-y-5">
      <Link to="/community" className="text-forest">
        {c.back}
      </Link>
      <h1 className="font-display text-3xl font-semibold">{loc.title}</h1>
      <div className="flex flex-wrap gap-2">
        {post.problem_type ? <Badge>{labelOf(post.problem_type, lang)}</Badge> : null}
        {post.crop ? <Badge>{labelOf(post.crop, lang)}</Badge> : null}
        {post.region ? <Badge>{labelOf(post.region, lang)}</Badge> : null}
        <span className="text-sm text-muted">{farmerLabel(post.display_name, null, lang)}</span>
        <span className="text-sm text-subtle">{formatPostDate(post.created_at, lang)}</span>
        <span className="text-sm text-subtle">{answers.length > 0 ? c.answered(answers.length) : c.waiting}</span>
      </div>
      <p className="whitespace-pre-wrap text-lg leading-relaxed">{loc.body}</p>
      <section className="space-y-3">
        <h2 className="font-display text-xl">{c.answers}</h2>
        {answers.map((a) => {
          const mine = isLiZeyu(a.display_name, a.user_id);
          return (
            <div key={a.id} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center gap-3">
                {mine ? (
                  <img src="/images/olivine.jpg" alt="" className="size-10 rounded-full object-cover" />
                ) : (
                  <span className="grid size-10 place-items-center rounded-full bg-surface-2 text-sm text-muted">
                    {farmerLabel(a.display_name, null, lang).slice(-2)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-medium">{farmerLabel(a.display_name, null, lang)}</p>
                  <p className="text-sm text-subtle">{formatPostDate(a.created_at, lang)}</p>
                </div>
              </div>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed">{localizeAnswer(post.title, a.body, lang)}</p>
            </div>
          );
        })}
        {answers.length === 0 ? <p className="text-muted">{c.noAnswers}</p> : null}
      </section>
      {user ? (
        <form className="space-y-2" onSubmit={(e) => void reply(e)}>
          <Textarea rows={4} placeholder={c.replyPh} value={body} onChange={(e) => setBody(e.target.value)} />
          <VoiceButton onText={(txt) => setBody((p) => (p ? `${p} ${txt}` : txt))} />
          {err ? <p className="text-danger">{err}</p> : null}
          <Button type="submit" disabled={busy}>
            {c.reply}
          </Button>
        </form>
      ) : (
        <p className="text-muted">
          <Link to="/login" className="text-forest underline">
            {c.loginToReply}
          </Link>
          {c.diagnoseFree}
        </p>
      )}
    </article>
  );
}
