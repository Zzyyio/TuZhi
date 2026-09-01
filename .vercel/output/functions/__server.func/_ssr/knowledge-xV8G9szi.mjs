import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as PROBLEM_OPTIONS, l as REGION_OPTIONS, o as CROP_OPTIONS, u as SEASON_OPTIONS } from "./constants-DTRks9S4.mjs";
import { i as filterArticles, r as facetCounts } from "./search-D6Ts0OEn.mjs";
import { o as Search } from "../_libs/lucide-react.mjs";
import { r as Route$2, v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as labelOf } from "./lexicon-DKTqo0RI.mjs";
import { t as ArticleCard } from "./ArticleCard-DbI47fkY.mjs";
import { t as Input } from "./input-B8MV3qDe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-xV8G9szi.js
var import_jsx_runtime = require_jsx_runtime();
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: active ? "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-base text-forest-fg" : "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base text-ink",
		children
	});
}
function KnowledgePage() {
	const { lang, t } = useI18n();
	const k = t.knowledge;
	const search = Route$2.useSearch();
	const navigate = Route$2.useNavigate();
	const counts = facetCounts();
	const articles = filterArticles({
		...search,
		lang
	});
	function patch(partial) {
		navigate({ search: {
			...search,
			...partial
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: k.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: k.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/encyclopedia",
						className: "inline-block text-forest",
						children: k.toWiki
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: search.q ?? "",
					onChange: (e) => patch({ q: e.target.value }),
					placeholder: k.ph,
					className: "pl-11"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted",
					children: k.byProblem
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !search.problem,
						onClick: () => patch({ problem: void 0 }),
						children: t.all
					}), PROBLEM_OPTIONS.filter((p) => (counts.problems[p] ?? 0) > 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: search.problem === p,
						onClick: () => patch({ problem: p }),
						children: [
							labelOf(p, lang),
							" ",
							counts.problems[p]
						]
					}, p))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted",
					children: k.byCrop
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !search.crop,
						onClick: () => patch({ crop: void 0 }),
						children: t.all
					}), CROP_OPTIONS.filter((p) => (counts.crops[p] ?? 0) > 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: search.crop === p,
						onClick: () => patch({ crop: p }),
						children: [
							labelOf(p, lang),
							" ",
							counts.crops[p]
						]
					}, p))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted",
					children: k.byRegion
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !search.region,
						onClick: () => patch({ region: void 0 }),
						children: t.all
					}), REGION_OPTIONS.filter((p) => (counts.regions[p] ?? 0) > 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: search.region === p,
						onClick: () => patch({ region: p }),
						children: [
							labelOf(p, lang),
							" ",
							counts.regions[p]
						]
					}, p))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted",
					children: k.bySeason
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !search.season,
						onClick: () => patch({ season: void 0 }),
						children: t.all
					}), SEASON_OPTIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: search.season === p,
						onClick: () => patch({ season: p }),
						children: [
							labelOf(p, lang),
							" ",
							counts.seasons[p] ?? 0
						]
					}, p))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: k.count(articles.length)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
					article: a,
					selectedCrop: search.crop
				}, a.slug)), articles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl border border-line bg-surface p-6 text-muted",
					children: [k.empty, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/diagnose",
						className: "mt-3 flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg",
						children: k.goDiagnose
					})]
				}) : null]
			})
		]
	});
}
//#endregion
export { KnowledgePage as component };
