import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useI18n } from "./router-OKOTHu9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-NQWq0jHw.js
var import_jsx_runtime = require_jsx_runtime();
function Privacy() {
	const { t } = useI18n();
	const p = t.privacy;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4 text-lg leading-relaxed",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: p.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.disclaimer }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.p2 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.p3 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.p4 })
		]
	});
}
//#endregion
export { Privacy as component };
