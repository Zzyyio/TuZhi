import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { a as getArticle, l as wikiToArticle } from "./_ssr/search-D6Ts0OEn.mjs";
import { i as Route$3, v as useI18n } from "./_ssr/router-OKOTHu9b.mjs";
import { t as GuidePage } from "./_ssr/GuidePage-D9QpKQRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BQox3CS_.js
var import_jsx_runtime = require_jsx_runtime();
function WikiDetail() {
	const { id } = Route$3.useParams();
	const { lang, t } = useI18n();
	const article = wikiToArticle(id, lang === "en" ? "en" : "zh");
	if (!article) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: t.wiki.missing
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/encyclopedia",
			className: "text-forest",
			children: t.wiki.back
		})]
	});
	const related = article.relatedSlugs.map(getArticle).filter((a) => Boolean(a));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePage, {
		article,
		rawSlug: article.slug,
		related,
		backTo: "/encyclopedia",
		backLabel: t.wiki.title
	});
}
//#endregion
export { WikiDetail as component };
