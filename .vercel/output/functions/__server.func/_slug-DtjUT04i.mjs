import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { a as getArticle, o as relatedArticles } from "./_ssr/search-D6Ts0OEn.mjs";
import { n as Route$1, v as useI18n } from "./_ssr/router-OKOTHu9b.mjs";
import { t as localizeArticle } from "./_ssr/localize-CqUXPaCK.mjs";
import { t as GuidePage } from "./_ssr/GuidePage-D9QpKQRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DtjUT04i.js
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const { slug } = Route$1.useParams();
	const { lang, t } = useI18n();
	const k = t.knowledge;
	const raw = getArticle(slug);
	if (!raw) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: k.missing
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/knowledge",
			className: "text-forest",
			children: k.back
		})]
	});
	const article = localizeArticle(raw, lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePage, {
		article,
		rawSlug: raw.slug,
		related: relatedArticles(raw),
		backTo: "/knowledge",
		backLabel: k.title
	});
}
//#endregion
export { ArticlePage as component };
