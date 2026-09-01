import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { f as cn } from "./router-OKOTHu9b.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-B33AwUZF.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-transform duration-150 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none", {
	variants: {
		variant: {
			primary: "bg-forest text-forest-fg hover:bg-forest-dark",
			secondary: "bg-surface text-ink border border-line hover:bg-surface-2",
			ghost: "bg-transparent text-ink hover:bg-surface-2",
			danger: "bg-danger text-forest-fg",
			wechat: "bg-wechat text-wechat-fg hover:opacity-90"
		},
		size: {
			lg: "min-h-14 rounded-xl px-6 text-xl",
			md: "min-h-12 rounded-lg px-5 text-base",
			sm: "min-h-10 rounded-md px-4 text-sm",
			icon: "size-12 rounded-lg"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
