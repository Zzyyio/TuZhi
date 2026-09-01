import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PhotoSlot } from "@/components/diagnose/PhotoSlot";
import { VoiceButton } from "@/components/diagnose/VoiceButton";
import { DisclaimerBanner } from "@/components/layout/Disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { CROP_OPTIONS, FERT_OPTIONS, REGION_OPTIONS, STAGE_OPTIONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/lang";
import { labelOf } from "@/lib/i18n/lexicon";
import { localizeArticle } from "@/lib/i18n/localize";
import { getArticle } from "@/lib/knowledge/search";
import { saveHistory } from "@/lib/local";
import { diagnoseSoil, type ChatTurn, type DiagnosePayload, type DiagnoseResult } from "@/lib/server/diagnose";

export const Route = createFileRoute("/diagnose")({
  head: () => ({
    meta: [{ title: "拍照诊断｜土知" }, { name: "description", content: "先拍照，再说现象。对照知识库，并排除病害、药害。" }],
  }),
  component: DiagnosePage,
});

function LabField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="space-y-1">
      <span className="block text-sm text-muted">{label}</span>
      <Input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} />
    </label>
  );
}

function DiagnosePage() {
  const { user } = useCurrentUserState();
  const { lang, t } = useI18n();
  const d = t.diagnose;
  const [plant, setPlant] = useState<string | null>(null);
  const [closeup, setCloseup] = useState<string | null>(null);
  const [soil, setSoil] = useState<string | null>(null);
  const [lab, setLab] = useState<string | null>(null);
  const [showLab, setShowLab] = useState(false);
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [stage, setStage] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [fertNote, setFertNote] = useState("");
  const [text, setText] = useState("");
  const [ph, setPh] = useState("");
  const [ec, setEc] = useState("");
  const [om, setOm] = useState("");
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [warn, setWarn] = useState("");
  const [result, setResult] = useState<DiagnoseResult | null>(null);
  const [follow, setFollow] = useState("");
  const historyRef = useRef<ChatTurn[]>([]);
  const lastImages = useRef<string[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const qRef = useRef<HTMLTextAreaElement>(null);

  const slotUi = {
    cameraLabel: d.camera,
    albumLabel: d.album,
    shotPrefix: d.shot,
    avoidPrefix: d.avoid,
  };

  const mut = useMutation({
    mutationFn: (payload: DiagnosePayload) => diagnoseSoil({ data: payload }),
    onSuccess: (res, payload) => {
      if (!res.ok) {
        setWarn(res.error);
        return;
      }
      setResult(res.result);
      const nextHist: ChatTurn[] = [
        ...historyRef.current,
        { role: "user", text: payload.question },
        { role: "assistant", text: res.result.analysis },
      ];
      historyRef.current = nextHist.slice(-8);
      saveHistory({
        id: String(Date.now()),
        at: Date.now(),
        question: payload.question,
        category: res.result.category,
        summary: res.result.analysis.slice(0, 180) || res.result.diagnoses[0]?.summary || res.result.category,
      });
    },
    onError: () => setWarn(d.sendFail),
  });

  useEffect(() => {
    if (mut.isPending || result) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mut.isPending, result]);

  const filled = [plant, closeup, soil].filter(Boolean).length;
  const questionNow = () => (qRef.current?.value ?? text).trim();

  function basePayload(question: string): DiagnosePayload {
    const pics = lastImages.current.length ? lastImages.current : ([plant, closeup, soil, lab].filter(Boolean) as string[]);
    lastImages.current = pics;
    return {
      question,
      images: pics,
      crop: crop === "不确定" ? "" : crop,
      region: region === "不确定" ? "" : region,
      stage: stage === "不确定" ? "" : stage,
      fertilizer: [fertilizer === "不确定" ? "" : fertilizer, fertNote].filter(Boolean).join(" "),
      labText: lab ? (lang === "en" ? "Lab sheet photo attached" : "附化验单照片") : "",
      ph,
      ec,
      om,
      n,
      p,
      k,
      lang,
      history: historyRef.current,
    };
  }

  function send() {
    if (mut.isPending) return;
    const question = questionNow();
    if (filled < 1 && question.length < 8) {
      setWarn(d.needPhoto);
      return;
    }
    if (filled === 0) setWarn(d.noPhotoWarn);
    else if (filled < 3) setWarn(d.fewPhotoWarn);
    else setWarn("");
    historyRef.current = [];
    lastImages.current = [plant, closeup, soil, lab].filter(Boolean) as string[];
    mut.mutate(
      basePayload(question || (lang === "en" ? "Please look at the photos and tell me what is wrong with the soil and crop." : "请看照片，帮我判断土和庄稼出了什么问题。")),
    );
  }

  function sendFollow() {
    const q = follow.trim();
    if (!q || mut.isPending) return;
    setFollow("");
    setWarn("");
    mut.mutate(basePayload(q));
  }

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="font-display text-3xl font-semibold">{d.title}</h1>
        <p className="mt-2 text-lg text-muted">{d.lead}</p>
        <p className="mt-2 rounded-xl border border-line bg-surface-2 px-4 py-3 text-base text-muted">{t.fieldHint}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <PhotoSlot label={d.slotPlant} hint={d.hintPlant} avoid={d.avoidPlant} src={plant} onChange={setPlant} exampleSrc="/images/hero-field.jpg" {...slotUi} />
        <PhotoSlot label={d.slotLeaf} hint={d.hintLeaf} avoid={d.avoidLeaf} src={closeup} onChange={setCloseup} exampleSrc="/images/articles/que-dan.jpg" {...slotUi} />
        <PhotoSlot label={d.slotSoil} hint={d.hintSoil} avoid={d.avoidSoil} src={soil} onChange={setSoil} exampleSrc="/images/articles/yan-jian.jpg" {...slotUi} />
      </div>
      <button type="button" className="text-left text-base text-forest underline" onClick={() => setShowLab((v) => !v)}>
        {showLab ? d.labHide : d.labToggle}
      </button>
      {showLab ? (
        <div className="space-y-3 rounded-xl border border-line bg-surface p-3">
          <PhotoSlot label={d.labPhoto} hint={d.labHint} avoid={d.labAvoid} src={lab} onChange={setLab} {...slotUi} />
          <p className="text-base text-muted">{d.labFill}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <LabField label="pH" value={ph} onChange={setPh} />
            <LabField label="EC" value={ec} onChange={setEc} />
            <LabField label={lang === "en" ? "OM" : "有机质"} value={om} onChange={setOm} />
            <LabField label={lang === "en" ? "N" : "氮"} value={n} onChange={setN} />
            <LabField label={lang === "en" ? "P" : "磷"} value={p} onChange={setP} />
            <LabField label={lang === "en" ? "K" : "钾"} value={k} onChange={setK} />
          </div>
        </div>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-2">
        <select className="min-h-12 border border-line bg-surface px-3 text-base" value={crop} onChange={(e) => setCrop(e.target.value)}>
          <option value="">{d.crop}</option>
          <option value="不确定">{t.uncertain}</option>
          {CROP_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {labelOf(c, lang)}
            </option>
          ))}
        </select>
        <select className="min-h-12 border border-line bg-surface px-3 text-base" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">{d.region}</option>
          <option value="不确定">{t.uncertain}</option>
          {REGION_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {labelOf(c, lang)}
            </option>
          ))}
        </select>
        <select className="min-h-12 border border-line bg-surface px-3 text-base" value={stage} onChange={(e) => setStage(e.target.value)}>
          <option value="">{d.stage}</option>
          {STAGE_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {labelOf(c, lang)}
            </option>
          ))}
        </select>
        <select className="min-h-12 border border-line bg-surface px-3 text-base" value={fertilizer} onChange={(e) => setFertilizer(e.target.value)}>
          <option value="">{d.fert}</option>
          {FERT_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {labelOf(c, lang)}
            </option>
          ))}
        </select>
      </div>
      <Input placeholder={d.fertNote} value={fertNote} onChange={(e) => setFertNote(e.target.value)} />

      <Textarea
        ref={qRef}
        rows={4}
        placeholder={d.qPh}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
      />
      <VoiceButton onText={(v) => setText((prev) => (prev ? `${prev} ${v}` : v))} />
      {warn ? <p className="text-base text-clay">{warn}</p> : null}
      <Button type="button" size="lg" className="w-full text-xl" onClick={send} disabled={mut.isPending}>
        <Send className="size-5" />
        {mut.isPending ? d.sending : d.send}
      </Button>
      <DisclaimerBanner full />

      <div ref={resultRef} id="diagnose-result" className="scroll-mt-24">
        {mut.isPending ? <p className="rounded-xl border border-line bg-surface p-4 text-lg">{d.wait}</p> : null}
        {result ? (
          <div className="space-y-4 rounded-xl border border-line bg-surface p-4">
            <p className="bg-surface-2 px-3 py-2 text-lg font-medium">
              {d.result}
              {result.category}
            </p>
            {result.analysis ? (
              <div>
                <h2 className="font-display text-xl">{d.analysis}</h2>
                <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed">{result.analysis}</p>
              </div>
            ) : null}
            {result.seen.length ? (
              <div>
                <h3 className="text-lg font-medium">{d.seen}</h3>
                <ul className="mt-1 list-disc pl-5 text-base">
                  {result.seen.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {result.labNotes ? (
              <div>
                <h2 className="font-display text-xl">{d.lab}</h2>
                <p className="mt-1 text-base">{result.labNotes}</p>
              </div>
            ) : null}
            {result.diagnoses.length ? (
              <div>
                <h2 className="font-display text-xl">{d.causes}</h2>
                <ol className="mt-2 space-y-2">
                  {result.diagnoses.map((item) => {
                    const src = item.sourceSlug ? getArticle(item.sourceSlug) : undefined;
                    const loc = src ? localizeArticle(src, lang) : undefined;
                    return (
                      <li key={item.name} className="bg-surface-2 p-3">
                        <p className="text-lg font-medium">
                          {item.name}
                          <span className="ml-2 text-base font-normal text-muted">{item.probability}</span>
                        </p>
                        <p className="mt-1 text-base text-muted">{item.summary}</p>
                        {loc ? (
                          <Link to="/knowledge/$slug" params={{ slug: loc.slug }} className="mt-1 inline-block text-forest underline">
                            {d.source}
                            {loc.title}
                          </Link>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : null}
            {result.causes.length ? (
              <ul className="list-disc pl-5 text-base text-muted">
                {result.causes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            ) : null}
            {result.dont.length ? (
              <div>
                <h3 className="text-lg font-medium">{d.dont}</h3>
                <ul className="mt-1 list-disc pl-5 text-base">
                  {result.dont.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {result.next.length ? (
              <div>
                <h3 className="text-lg font-medium">{d.next}</h3>
                <ol className="mt-1 list-decimal space-y-1 pl-5 text-base">
                  {result.next.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ol>
              </div>
            ) : null}
            {result.relatedSlugs.length ? (
              <div>
                <h3 className="text-lg font-medium">{d.related}</h3>
                <ul className="mt-2 space-y-1">
                  {result.relatedSlugs.map((slug) => {
                    const a = getArticle(slug);
                    if (!a) return null;
                    const loc = localizeArticle(a, lang);
                    return (
                      <li key={slug}>
                        <Link to="/knowledge/$slug" params={{ slug }} className="text-lg text-forest underline">
                          {loc.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
            {result.needLabTest ? <p className="bg-surface-2 px-3 py-2 text-base">{d.testHint}</p> : null}
            {result.followUp ? <p className="text-base text-muted">{result.followUp}</p> : null}
            <p className="text-base font-medium text-clay">{result.disclaimer || t.disclaimer}</p>
            <div className="space-y-2 border-t border-line pt-3">
              <h3 className="text-lg font-medium">{d.followTitle}</h3>
              <Textarea rows={3} placeholder={d.followPh} value={follow} onChange={(e) => setFollow(e.target.value)} />
              <Button type="button" variant="secondary" onClick={sendFollow} disabled={mut.isPending || !follow.trim()}>
                {d.followSend}
              </Button>
            </div>
            {!user ? (
              <Link to="/login" className="flex min-h-12 items-center justify-center rounded-lg border border-forest text-forest">
                {d.saveLogin}
              </Link>
            ) : (
              <p className="text-sm text-muted">{d.saved}</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
