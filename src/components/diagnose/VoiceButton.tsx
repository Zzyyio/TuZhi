import { Mic, Square } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/lang";

type Rec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((ev: { results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }> }) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

function makeRec(speechLang: string): Rec | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => Rec;
    webkitSpeechRecognition?: new () => Rec;
  };
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = speechLang;
  rec.continuous = false;
  rec.interimResults = false;
  return rec;
}

export function VoiceButton({ onText }: { onText: (t: string) => void }) {
  const { lang, t } = useI18n();
  const [state, setState] = useState<"idle" | "listen" | "fail">("idle");
  const [hint, setHint] = useState("");
  const recRef = useRef<Rec | null>(null);
  const speechLang = lang === "en" ? "en-US" : "zh-CN";

  function toggle() {
    if (state === "listen") {
      try {
        recRef.current?.stop();
      } catch {
        /* already stopped */
      }
      recRef.current = null;
      setState("idle");
      setHint("");
      return;
    }
    const rec = makeRec(speechLang);
    if (!rec) {
      setState("fail");
      setHint(t.voice.fail);
      return;
    }
    recRef.current = rec;
    rec.onresult = (ev) => {
      const text = Array.from(ev.results)
        .map((r) => r[0]?.transcript ?? "")
        .join("");
      if (text) onText(text.trim());
    };
    rec.onerror = (ev) => {
      setState("fail");
      const err = ev.error ?? "";
      if (err === "not-allowed" || err === "service-not-allowed" || err === "audio-capture") {
        setHint(t.voice.fail);
      } else {
        setHint(t.voice.unclear);
      }
      recRef.current = null;
    };
    rec.onend = () => {
      if (recRef.current === rec) recRef.current = null;
      setState((s) => (s === "listen" ? "idle" : s));
    };
    try {
      rec.start();
      setState("listen");
      setHint(t.voice.listen);
    } catch {
      recRef.current = null;
      setState("fail");
      setHint(t.voice.fail);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={state === "listen" ? "danger" : "secondary"}
        size="icon"
        onClick={toggle}
        aria-label={state === "listen" ? t.voice.stop : t.voice.start}
      >
        {state === "listen" ? <Square className="size-5" /> : <Mic className="size-5" />}
      </Button>
      {hint ? <span className="text-sm text-muted">{hint}</span> : null}
    </div>
  );
}
