import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { TERMS, termView } from "@/lib/encyclopedia";
import { useI18n } from "@/lib/i18n/lang";

export const Route = createFileRoute("/encyclopedia/")({
  head: () => ({
    meta: [{ title: "土壤百科｜土知 · Glossary | Tuzhi" }, { name: "description", content: "把报告上的词翻译成人话。pH、EC、有机质、交换性铝…" }],
  }),
  component: Encyclopedia,
});

function Encyclopedia() {
  const { lang, t } = useI18n();
  const w = t.wiki;
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const nq = q.trim();
  const list = useMemo(() => {
    if (!nq) return TERMS;
    const qLow = nq.toLowerCase();
    return TERMS.filter(
      (term) =>
        term.name.toLowerCase().includes(qLow) ||
        term.nameEn.toLowerCase().includes(qLow) ||
        term.plain.includes(nq) ||
        term.plainEn.toLowerCase().includes(qLow) ||
        term.detail.includes(nq) ||
        term.detailEn.toLowerCase().includes(qLow) ||
        (term.aka ?? "").toLowerCase().includes(qLow) ||
        (term.akaEn ?? "").toLowerCase().includes(qLow) ||
        term.id.includes(qLow),
    );
  }, [nq]);
  const groups = useMemo(() => {
    const map = new Map<string, typeof TERMS>();
    for (const term of list) {
      const arr = map.get(term.group) ?? [];
      arr.push(term);
      map.set(term.group, arr);
    }
    return [...map.entries()];
  }, [list]);

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!id) return;
    if (TERMS.some((term) => term.id === id)) {
      void navigate({ to: "/encyclopedia/$id", params: { id } });
    }
  }, [navigate]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold">{w.title}</h1>
        <p className="mt-2 text-muted">{w.lead}</p>
      </header>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={w.ph} />
      {groups.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface p-6 text-muted">
          {w.empty}
          <span className="mt-3 flex flex-wrap gap-4">
            <Link to="/knowledge" className="text-forest underline">
              {t.nav.knowledge}
            </Link>
            <Link to="/diagnose" className="text-forest underline">
              {t.nav.diagnose}
            </Link>
          </span>
        </p>
      ) : (
        groups.map(([group, terms]) => (
          <section key={group} className="space-y-3">
            <h2 className="font-display text-xl font-semibold">{w.groups[group] ?? group}</h2>
            {terms.map((term) => {
              const v = termView(term, lang);
              return (
                <Link
                  key={term.id}
                  to="/encyclopedia/$id"
                  params={{ id: term.id }}
                  className="block scroll-mt-24 rounded-2xl border border-line bg-surface p-4"
                >
                  <h3 className="text-lg font-medium">{v.name}</h3>
                  {v.aka ? (
                    <p className="text-sm text-subtle">
                      {w.aka}
                      {v.aka}
                    </p>
                  ) : null}
                  <p className="mt-2 text-lg leading-relaxed">{v.plain}</p>
                </Link>
              );
            })}
          </section>
        ))
      )}
    </div>
  );
}
