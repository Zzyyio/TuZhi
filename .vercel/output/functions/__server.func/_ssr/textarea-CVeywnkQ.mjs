import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as cn } from "./router-OKOTHu9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-CVeywnkQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = (0, import_react.forwardRef)(function Textarea({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		className: cn("min-h-28 w-full rounded-lg border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-subtle", className),
		...props
	});
});
//#endregion
export { Textarea as t };
