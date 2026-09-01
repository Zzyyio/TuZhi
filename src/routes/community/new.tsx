import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { VoiceButton } from "@/components/diagnose/VoiceButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { CROP_OPTIONS, PROBLEM_OPTIONS, REGION_OPTIONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";
import { labelOf } from "@/lib/i18n/lexicon";
import { createPost } from "@/lib/server/community";

export const Route = createFileRoute("/community/new")({
  head: () => ({ meta: [{ title: "我要提问｜土知 · Ask | Tuzhi" }] }),
  component: NewPost,
});

function NewPost() {
  const { user, isPending } = useCurrentUserState();
  const { lang, t } = useI18n();
  const c = t.community;
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [problem, setProblem] = useState("");
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (isPending) return <div className="h-32 animate-pulse rounded-xl bg-surface-2" />;
  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl">{c.needLogin}</h1>
        <p className="text-muted">{c.needLoginLead}</p>
        <Link to="/login" className="flex min-h-12 items-center justify-center rounded-lg border border-forest text-forest">
          {c.goLogin}
        </Link>
        <Link to="/diagnose" className="flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg">
          {c.goDiagnose}
        </Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await createPost({ data: { title, body, problem, crop, region } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error === "short" ? c.errShort : res.error === "blocked" ? c.errBlocked : c.errSave);
      return;
    }
    void nav({ to: "/community/$id", params: { id: String(res.id) } });
  }

  return (
    <form className="space-y-3" onSubmit={(e) => void submit(e)}>
      <h1 className="font-display text-3xl font-semibold">{c.newTitle}</h1>
      <Input placeholder={c.titlePh} value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea rows={6} placeholder={c.bodyPh} value={body} onChange={(e) => setBody(e.target.value)} required />
      <VoiceButton onText={(txt) => setBody((p) => (p ? `${p} ${txt}` : txt))} />
      <div className="grid gap-2 sm:grid-cols-3">
        <select className="min-h-12 rounded-lg border border-line bg-surface px-3" value={problem} onChange={(e) => setProblem(e.target.value)} aria-label={c.problem}>
          <option value="">{c.problem}</option>
          {PROBLEM_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {labelOf(p, lang)}
            </option>
          ))}
        </select>
        <select className="min-h-12 rounded-lg border border-line bg-surface px-3" value={crop} onChange={(e) => setCrop(e.target.value)} aria-label={c.crop}>
          <option value="">{c.crop}</option>
          {CROP_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {labelOf(p, lang)}
            </option>
          ))}
        </select>
        <select className="min-h-12 rounded-lg border border-line bg-surface px-3" value={region} onChange={(e) => setRegion(e.target.value)} aria-label={c.region}>
          <option value="">{c.region}</option>
          {REGION_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {labelOf(p, lang)}
            </option>
          ))}
        </select>
      </div>
      {err ? <p className="text-danger">{err}</p> : null}
      <Button type="submit" size="lg" disabled={busy}>
        {busy ? c.publishing : c.publish}
      </Button>
    </form>
  );
}
