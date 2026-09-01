import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as PROBLEM_OPTIONS, l as REGION_OPTIONS, o as CROP_OPTIONS } from "./constants-DTRks9S4.mjs";
import { c as useCurrentUserState, v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Button } from "./button-B33AwUZF.mjs";
import { t as labelOf } from "./lexicon-DKTqo0RI.mjs";
import { t as VoiceButton } from "./VoiceButton-CSng6OJV.mjs";
import { t as Textarea } from "./textarea-CVeywnkQ.mjs";
import { n as createPost } from "./community-C8f2tROE.mjs";
import { t as Input } from "./input-B8MV3qDe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-CTjEE2RD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewPost() {
	const { user, isPending } = useCurrentUserState();
	const { lang, t } = useI18n();
	const c = t.community;
	const nav = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [problem, setProblem] = (0, import_react.useState)("");
	const [crop, setCrop] = (0, import_react.useState)("");
	const [region, setRegion] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl bg-surface-2" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: c.needLogin
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: c.needLoginLead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "flex min-h-12 items-center justify-center rounded-lg border border-forest text-forest",
				children: c.goLogin
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/diagnose",
				className: "flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg",
				children: c.goDiagnose
			})
		]
	});
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		setErr("");
		const res = await createPost({ data: {
			title,
			body,
			problem,
			crop,
			region
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error === "short" ? c.errShort : res.error === "blocked" ? c.errBlocked : c.errSave);
			return;
		}
		nav({
			to: "/community/$id",
			params: { id: String(res.id) }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3",
		onSubmit: (e) => void submit(e),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: c.newTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: c.titlePh,
				value: title,
				onChange: (e) => setTitle(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				rows: 6,
				placeholder: c.bodyPh,
				value: body,
				onChange: (e) => setBody(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, { onText: (txt) => setBody((p) => p ? `${p} ${txt}` : txt) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "min-h-12 rounded-lg border border-line bg-surface px-3",
						value: problem,
						onChange: (e) => setProblem(e.target.value),
						"aria-label": c.problem,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: c.problem
						}), PROBLEM_OPTIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: labelOf(p, lang)
						}, p))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "min-h-12 rounded-lg border border-line bg-surface px-3",
						value: crop,
						onChange: (e) => setCrop(e.target.value),
						"aria-label": c.crop,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: c.crop
						}), CROP_OPTIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: labelOf(p, lang)
						}, p))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "min-h-12 rounded-lg border border-line bg-surface px-3",
						value: region,
						onChange: (e) => setRegion(e.target.value),
						"aria-label": c.region,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: c.region
						}), REGION_OPTIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: labelOf(p, lang)
						}, p))]
					})
				]
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-danger",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "lg",
				disabled: busy,
				children: busy ? c.publishing : c.publish
			})
		]
	});
}
//#endregion
export { NewPost as component };
