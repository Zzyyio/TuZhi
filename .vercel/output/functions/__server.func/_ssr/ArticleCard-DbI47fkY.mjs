import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Badge } from "./badge-CVA73KLn.mjs";
import { t as localizeArticle } from "./localize-CqUXPaCK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ArticleCard-DbI47fkY.js
var import_jsx_runtime = require_jsx_runtime();
function articleCover(article, _selectedCrop) {
	return article.photos[0]?.src ?? "";
}
function ArticleCard({ article }) {
	const { lang } = useI18n();
	const loc = localizeArticle(article, lang);
	const cover = articleCover(article);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/knowledge/$slug",
		params: { slug: article.slug },
		className: "flex overflow-hidden rounded-2xl border border-line bg-surface",
		children: [cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: cover,
			alt: "",
			className: "h-28 w-28 shrink-0 bg-surface-2 object-cover sm:h-32 sm:w-36",
			loading: "lazy",
			onError: (e) => {
				e.currentTarget.style.visibility = "hidden";
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-28 w-28 shrink-0 bg-surface-2 sm:h-32 sm:w-36" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 flex-1 flex-col justify-center gap-2 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg font-semibold leading-snug text-ink",
					children: loc.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "line-clamp-2 text-sm text-muted",
					children: loc.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex flex-wrap gap-1",
					children: loc.problems.slice(0, 1).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: p }, p))
				})
			]
		})]
	});
}
//#endregion
export { ArticleCard as t };
