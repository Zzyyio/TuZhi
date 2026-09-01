import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { APP_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: `登录｜${APP_NAME}` }] }),
  component: Login,
});

type Tab = "phone" | "email" | "open";
type Mode = "in" | "up";

function phoneEmail(phone: string) {
  return `${phone}@phone.tuzhi.local`;
}

function mapAuthError(message: string, l: ReturnType<typeof useI18n>["t"]["login"]): string {
  const m = message.toLowerCase();
  if (m.includes("already") || m.includes("exist") || m.includes("已")) return l.hasUser;
  if (m.includes("invalid") || m.includes("password") || m.includes("not found") || m.includes("credential")) return l.badPw;
  return message || l.fail;
}

function Login() {
  const { lang, t } = useI18n();
  const l = t.login;
  const [tab, setTab] = useState<Tab>("phone");
  const [mode, setMode] = useState<Mode>("in");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const tabs: { id: Tab; label: string }[] = [
    { id: "phone", label: l.tabPhone },
    { id: "email", label: l.tabEmail },
    { id: "open", label: l.tabOpen },
  ];

  function resetTab(id: Tab) {
    setTab(id);
    setError("");
    setPassword("");
    setConfirm("");
  }

  async function finish(em: string, pw: string, name: string) {
    if (mode === "up") {
      const up = await authClient.signUp.email({ email: em, password: pw, name, callbackURL: "/me" });
      if (up.error) throw new Error(up.error.message || l.fail);
    } else {
      const inn = await authClient.signIn.email({ email: em, password: pw, callbackURL: "/me" });
      if (inn.error) throw new Error(inn.error.message || l.fail);
    }
    window.location.href = "/me";
  }

  async function onPhone(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError(l.badPhone);
      return;
    }
    if (password.length < 8) {
      setError(l.pwShort);
      return;
    }
    if (mode === "up" && password !== confirm) {
      setError(l.pwMismatch);
      return;
    }
    setBusy(true);
    try {
      await finish(phoneEmail(phone), password, lang === "en" ? `Farmer ${phone.slice(-4)}` : `农户${phone.slice(-4)}`);
    } catch (err) {
      setError(mapAuthError(err instanceof Error ? err.message : "", l));
    } finally {
      setBusy(false);
    }
  }

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const em = email.trim().toLowerCase();
    if (!em || !em.includes("@")) {
      setError(l.emailAddr);
      return;
    }
    if (password.length < 8) {
      setError(l.pwShort);
      return;
    }
    if (mode === "up" && password !== confirm) {
      setError(l.pwMismatch);
      return;
    }
    setBusy(true);
    try {
      await finish(em, password, lang === "en" ? "Farmer" : "农户");
    } catch (err) {
      setError(mapAuthError(err instanceof Error ? err.message : "", l));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-5 px-5 py-10">
      <div className="absolute right-5 top-5">
        <LanguageToggle />
      </div>
      <div>
        <Link to="/" className="mb-4 flex items-center gap-3">
          <img src="/logo.svg" alt="" width={44} height={44} className="size-11 rounded-xl" />
          <span className="font-display text-xl font-semibold">{t.name}</span>
        </Link>
        <h1 className="font-display text-3xl font-semibold">{l.title}</h1>
        <p className="mt-2 text-base text-muted">{l.lead}</p>
      </div>

      <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-surface p-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => resetTab(item.id)}
            className={
              tab === item.id
                ? "min-h-11 rounded-lg bg-forest text-sm font-medium text-forest-fg"
                : "min-h-11 rounded-lg text-sm text-muted"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "phone" ? (
        <form className="space-y-3" onSubmit={(e) => void onPhone(e)}>
          <label className="space-y-1">
            <span className="text-sm text-muted">{l.phone}</span>
            <Input
              inputMode="numeric"
              maxLength={11}
              placeholder={l.phonePh}
              value={phone}
              autoComplete="username"
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-muted">{l.password}</span>
            <Input
              type="password"
              placeholder={l.password}
              value={password}
              autoComplete={mode === "up" ? "new-password" : "current-password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {mode === "up" ? (
            <label className="space-y-1">
              <span className="text-sm text-muted">{l.confirmPw}</span>
              <Input
                type="password"
                placeholder={l.confirmPw}
                value={confirm}
                autoComplete="new-password"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </label>
          ) : null}
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {mode === "up" ? l.phoneUp : l.phoneIn}
          </Button>
        </form>
      ) : null}

      {tab === "email" ? (
        <form className="space-y-3" onSubmit={(e) => void onEmail(e)}>
          <label className="space-y-1">
            <span className="text-sm text-muted">{l.email}</span>
            <Input
              type="email"
              placeholder={l.email}
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-muted">{l.password}</span>
            <Input
              type="password"
              placeholder={l.password}
              value={password}
              autoComplete={mode === "up" ? "new-password" : "current-password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {mode === "up" ? (
            <label className="space-y-1">
              <span className="text-sm text-muted">{l.confirmPw}</span>
              <Input
                type="password"
                placeholder={l.confirmPw}
                value={confirm}
                autoComplete="new-password"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </label>
          ) : null}
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {mode === "up" ? l.emailUp : l.emailIn}
          </Button>
        </form>
      ) : null}

      {tab === "open" ? (
        <div className="space-y-3">
          <p className="text-muted">{l.googleLead}</p>
          {authEnabled && GROK_PROVIDERS.length ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant={p.idp === "google" ? "primary" : "secondary"}
                size="lg"
                className="w-full"
                onClick={() => void signIn(p.providerId, { callbackURL: "/me" })}
              >
                {l.use(p.label)}
              </Button>
            ))
          ) : (
            <p className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-muted">{l.googleUnconfigured}</p>
          )}
        </div>
      ) : null}

      {tab !== "open" ? (
        <button
          type="button"
          className="text-sm text-muted"
          onClick={() => {
            setMode((m) => (m === "in" ? "up" : "in"));
            setError("");
            setConfirm("");
          }}
        >
          {mode === "in" ? l.noAccount : l.hasAccount}
        </button>
      ) : null}

      {error ? <p className="text-base text-danger">{error}</p> : null}

      <p className="text-sm text-muted">
        {l.agree}
        <Link to="/privacy" className="text-forest underline">
          {l.privacy}
        </Link>
      </p>
      <Link to="/diagnose" className="text-center text-forest underline">
        {l.skip}
      </Link>
      <p className="text-center text-sm text-subtle">{t.footer.maker}</p>
    </main>
  );
}
