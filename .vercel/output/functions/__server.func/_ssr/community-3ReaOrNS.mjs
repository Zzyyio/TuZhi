import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { c as PROBLEM_OPTIONS } from "./constants-DTRks9S4.mjs";
import { r as facetCounts } from "./search-D6Ts0OEn.mjs";
import { l as farmerLabel, o as Route$7, u as formatPostDate, v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Badge } from "./badge-CVA73KLn.mjs";
import { t as labelOf } from "./lexicon-DKTqo0RI.mjs";
import { n as localizePost } from "./posts-en-8gKEZY3C.mjs";
import { i as listPosts } from "./community-C8f2tROE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-3ReaOrNS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommunityPage() {
	const { lang, t } = useI18n();
	const c = t.community;
	const { problem } = Route$7.useSearch();
	const nav = Route$7.useNavigate();
	const counts = facetCounts();
	const [waited, setWaited] = (0, import_react.useState)(false);
	const q = useQuery({
		queryKey: ["posts", problem],
		queryFn: () => listPosts({ data: { problem: problem || void 0 } })
	});
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setWaited(true), 2e3);
		return () => clearTimeout(timer);
	}, [problem]);
	const list = q.data ?? [];
	const showEmpty = (waited || q.isError || q.isSuccess) && list.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: c.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: c.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => nav({ search: { problem: void 0 } }),
					className: !problem ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2",
					children: t.all
				}), PROBLEM_OPTIONS.filter((p) => (counts.problems[p] ?? 0) > 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => nav({ search: { problem: p } }),
					className: problem === p ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2",
					children: labelOf(p, lang)
				}, p))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/community/new",
				className: "flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg text-forest-fg",
				children: c.ask
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [list.map((p) => {
					const loc = localizePost(p.title, p.body, lang);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/community/$id",
						params: { id: String(p.id) },
						className: "block rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium leading-snug",
								children: loc.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-2 text-sm text-muted",
								children: loc.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-2 text-sm text-subtle",
								children: [
									p.problem_type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: labelOf(p.problem_type, lang) }) : null,
									p.crop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: labelOf(p.crop, lang) }) : null,
									p.region ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: labelOf(p.region, lang) }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: farmerLabel(p.display_name, null, lang) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPostDate(p.created_at, lang) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.answer_count > 0 ? c.answered(p.answer_count) : c.waiting })
								]
							})
						]
					}, p.id);
				}), showEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl border border-line bg-surface p-6 text-muted",
					children: [c.empty, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-3 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/diagnose",
							className: "text-forest underline",
							children: t.nav.diagnose
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/knowledge",
							className: "text-forest underline",
							children: t.nav.knowledge
						})]
					})]
				}) : null]
			})
		]
	});
}
//#endregion
export { CommunityPage as component };
