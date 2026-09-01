import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as termView, m as TERMS, v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Input } from "./input-B8MV3qDe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/encyclopedia-DkoBLfdu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Encyclopedia() {
	const { lang, t } = useI18n();
	const w = t.wiki;
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const nq = q.trim();
	const list = (0, import_react.useMemo)(() => {
		if (!nq) return TERMS;
		const qLow = nq.toLowerCase();
		return TERMS.filter((term) => term.name.toLowerCase().includes(qLow) || term.nameEn.toLowerCase().includes(qLow) || term.plain.includes(nq) || term.plainEn.toLowerCase().includes(qLow) || term.detail.includes(nq) || term.detailEn.toLowerCase().includes(qLow) || (term.aka ?? "").toLowerCase().includes(qLow) || (term.akaEn ?? "").toLowerCase().includes(qLow) || term.id.includes(qLow));
	}, [nq]);
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const term of list) {
			const arr = map.get(term.group) ?? [];
			arr.push(term);
			map.set(term.group, arr);
		}
		return [...map.entries()];
	}, [list]);
	(0, import_react.useEffect)(() => {
		const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
		if (!id) return;
		if (TERMS.some((term) => term.id === id)) navigate({
			to: "/encyclopedia/$id",
			params: { id }
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: w.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: w.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: w.ph
			}),
			groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-xl border border-line bg-surface p-6 text-muted",
				children: [w.empty, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-3 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/knowledge",
						className: "text-forest underline",
						children: t.nav.knowledge
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/diagnose",
						className: "text-forest underline",
						children: t.nav.diagnose
					})]
				})]
			}) : groups.map(([group, terms]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: w.groups[group] ?? group
				}), terms.map((term) => {
					const v = termView(term, lang);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/encyclopedia/$id",
						params: { id: term.id },
						className: "block scroll-mt-24 rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-medium",
								children: v.name
							}),
							v.aka ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-subtle",
								children: [w.aka, v.aka]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-lg leading-relaxed",
								children: v.plain
							})
						]
					}, term.id);
				})]
			}, group))
		]
	});
}
//#endregion
export { Encyclopedia as component };
