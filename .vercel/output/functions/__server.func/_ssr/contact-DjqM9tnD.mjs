import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as CONTACT_EMAIL } from "./constants-DTRks9S4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Button } from "./button-B33AwUZF.mjs";
import { t as Textarea } from "./textarea-CVeywnkQ.mjs";
import { t as Input } from "./input-B8MV3qDe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DjqM9tnD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const { t } = useI18n();
	const c = t.contact;
	const [name, setName] = (0, import_react.useState)("");
	const [msg, setMsg] = (0, import_react.useState)("");
	const mailto = `mailto:${CONTACT_EMAIL}`;
	function send(e) {
		e.preventDefault();
		const subject = encodeURIComponent(name.trim() ? `土知 / Tuzhi — ${name.trim()}` : "土知 / Tuzhi");
		const body = encodeURIComponent(msg.trim());
		window.location.href = `${mailto}?subject=${subject}&body=${body}`;
		toast.message(c.toast);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: c.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg leading-relaxed text-muted",
				children: c.p1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-lg leading-relaxed",
				children: [
					c.email,
					": ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: mailto,
						className: "text-forest underline",
						children: CONTACT_EMAIL
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-lg leading-relaxed",
				children: [
					c.p2a,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/community/new",
						className: "mx-1 text-forest underline",
						children: c.p2b
					}),
					c.p2c,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "mx-1 text-forest underline",
						children: c.p2d
					}),
					c.p2e
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: send,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: c.name,
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 5,
						placeholder: c.msg,
						value: msg,
						onChange: (e) => setMsg(e.target.value),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						children: c.send
					})
				]
			})
		]
	});
}
//#endregion
export { Contact as component };
