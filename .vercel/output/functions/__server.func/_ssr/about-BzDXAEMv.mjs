import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useI18n } from "./router-OKOTHu9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BzDXAEMv.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const { t } = useI18n();
	const a = t.about;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-5 text-lg leading-relaxed",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: a.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a.p1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: a.do
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-2 pl-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: a.d1 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: a.d2 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: a.d3 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: a.d4 })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: a.dont
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a.dontP }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: a.how
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a.howP }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: a.maker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a.makerP }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex flex-wrap gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "text-forest underline",
						children: t.footer.privacy
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "text-forest underline",
						children: t.footer.contact
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/diagnose",
						className: "text-forest underline",
						children: t.nav.diagnose
					})
				]
			})
		]
	});
}
//#endregion
export { About as component };
