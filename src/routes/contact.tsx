import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_NAME, CONTACT_EMAIL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: `联系｜${APP_NAME}` }, { name: "description", content: "反馈问题、纠错。紧急事故请找当地农技站。" }],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const mailto = `mailto:${CONTACT_EMAIL}`;

  function send(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(name.trim() ? `土知 / Tuzhi — ${name.trim()}` : "土知 / Tuzhi");
    const body = encodeURIComponent(msg.trim());
    window.location.href = `${mailto}?subject=${subject}&body=${body}`;
    toast.message(c.toast);
  }

  return (
    <article className="space-y-5">
      <h1 className="font-display text-3xl font-semibold">{c.title}</h1>
      <p className="text-lg leading-relaxed text-muted">{c.p1}</p>
      <p className="text-lg leading-relaxed">
        {c.email}
        {": "}
        <a href={mailto} className="text-forest underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="text-lg leading-relaxed">
        {c.p2a}
        <Link to="/community/new" className="mx-1 text-forest underline">
          {c.p2b}
        </Link>
        {c.p2c}
        <Link to="/about" className="mx-1 text-forest underline">
          {c.p2d}
        </Link>
        {c.p2e}
      </p>
      <form className="space-y-3" onSubmit={send}>
        <Input placeholder={c.name} value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea rows={5} placeholder={c.msg} value={msg} onChange={(e) => setMsg(e.target.value)} required />
        <Button type="submit" size="lg">
          {c.send}
        </Button>
      </form>
    </article>
  );
}
