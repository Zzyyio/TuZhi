import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { c as PROBLEM_OPTIONS } from "./constants-DTRks9S4.mjs";
import { r as facetCounts, t as ARTICLES } from "./search-D6Ts0OEn.mjs";
import { f as ChevronRight, o as Search, p as Camera } from "../_libs/lucide-react.mjs";
import { l as farmerLabel, u as formatPostDate, v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Button } from "./button-B33AwUZF.mjs";
import { t as labelOf } from "./lexicon-DKTqo0RI.mjs";
import { t as ArticleCard } from "./ArticleCard-DbI47fkY.mjs";
import { n as localizePost } from "./posts-en-8gKEZY3C.mjs";
import { i as listPosts } from "./community-C8f2tROE.mjs";
import { t as Input } from "./input-B8MV3qDe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DpAOWrah.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { lang, t } = useI18n();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [waited, setWaited] = (0, import_react.useState)(false);
	const hot = ARTICLES.filter((a) => a.hot).slice(0, 4);
	const counts = facetCounts();
	const posts = useQuery({
		queryKey: ["home-posts"],
		queryFn: () => listPosts({ data: {} })
	});
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setWaited(true), 2e3);
		return () => clearTimeout(timer);
	}, []);
	const postList = posts.data ?? [];
	const showEmpty = (waited || posts.isError || posts.isSuccess) && postList.length === 0;
	function goSearch(term) {
		navigate({
			to: "/knowledge",
			search: {
				q: term,
				crop: void 0,
				problem: void 0,
				region: void 0,
				season: void 0
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-2xl border border-line bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero-field.jpg",
					alt: t.home.heroAlt,
					className: "h-48 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold",
							children: t.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-lg leading-relaxed text-muted",
							children: t.home.lead
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "w-full text-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/diagnose",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-6" }), t.home.diagnose]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							goSearch(q);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: t.home.searchPh,
								className: "pl-11",
								"aria-label": t.home.searchAria
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							children: t.search
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: t.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => goSearch(ex),
							className: "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base",
							children: ex
						}, ex))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl font-semibold",
				children: t.home.problems
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PROBLEM_OPTIONS.filter((p) => (counts.problems[p] ?? 0) > 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/knowledge",
					search: { problem: p },
					className: "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base text-ink",
					children: [
						labelOf(p, lang),
						" ",
						counts.problems[p]
					]
				}, p))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: t.home.hot
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/knowledge",
						className: "flex items-center text-sm text-forest",
						children: [
							t.home.more,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: hot.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: t.home.posts
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/community",
						className: "flex items-center text-sm text-forest",
						children: [
							t.home.toCommunity,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [postList.slice(0, 3).map((p) => {
						const loc = localizePost(p.title, p.body, lang);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/community/$id",
							params: { id: String(p.id) },
							className: "block rounded-2xl border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium leading-snug",
								children: loc.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									farmerLabel(p.display_name, null, lang),
									" · ",
									formatPostDate(p.created_at, lang),
									" · ",
									p.answer_count > 0 ? t.home.answered(p.answer_count) : t.home.waiting
								]
							})]
						}, p.id);
					}), showEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-line bg-surface p-4 text-muted",
						children: t.home.noPosts
					}) : null]
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
