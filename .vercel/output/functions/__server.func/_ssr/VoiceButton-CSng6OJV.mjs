import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as Mic, i as Square } from "../_libs/lucide-react.mjs";
import { v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Button } from "./button-B33AwUZF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VoiceButton-CSng6OJV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function makeRec(speechLang) {
	const w = window;
	const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
	if (!Ctor) return null;
	const rec = new Ctor();
	rec.lang = speechLang;
	rec.continuous = false;
	rec.interimResults = false;
	return rec;
}
function VoiceButton({ onText }) {
	const { lang, t } = useI18n();
	const [state, setState] = (0, import_react.useState)("idle");
	const [hint, setHint] = (0, import_react.useState)("");
	const recRef = (0, import_react.useRef)(null);
	const speechLang = lang === "en" ? "en-US" : "zh-CN";
	function toggle() {
		if (state === "listen") {
			try {
				recRef.current?.stop();
			} catch {}
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
			const text = Array.from(ev.results).map((r) => r[0]?.transcript ?? "").join("");
			if (text) onText(text.trim());
		};
		rec.onerror = (ev) => {
			setState("fail");
			const err = ev.error ?? "";
			if (err === "not-allowed" || err === "service-not-allowed" || err === "audio-capture") setHint(t.voice.fail);
			else setHint(t.voice.unclear);
			recRef.current = null;
		};
		rec.onend = () => {
			if (recRef.current === rec) recRef.current = null;
			setState((s) => s === "listen" ? "idle" : s);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: state === "listen" ? "danger" : "secondary",
			size: "icon",
			onClick: toggle,
			"aria-label": state === "listen" ? t.voice.stop : t.voice.start,
			children: state === "listen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" })
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted",
			children: hint
		}) : null]
	});
}
//#endregion
export { VoiceButton as t };
