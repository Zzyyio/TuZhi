import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-C1L_bUYK.mjs";
import { s as LanguageToggle, v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Button } from "./button-B33AwUZF.mjs";
import { t as Input } from "./input-B8MV3qDe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-wb7-O9TG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function phoneEmail(phone) {
	return `${phone}@phone.tuzhi.local`;
}
function mapAuthError(message, l) {
	const m = message.toLowerCase();
	if (m.includes("already") || m.includes("exist") || m.includes("已")) return l.hasUser;
	if (m.includes("invalid") || m.includes("password") || m.includes("not found") || m.includes("credential")) return l.badPw;
	return message || l.fail;
}
function Login() {
	const { lang, t } = useI18n();
	const l = t.login;
	const [tab, setTab] = (0, import_react.useState)("phone");
	const [mode, setMode] = (0, import_react.useState)("in");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const tabs = [
		{
			id: "phone",
			label: l.tabPhone
		},
		{
			id: "email",
			label: l.tabEmail
		},
		{
			id: "open",
			label: l.tabOpen
		}
	];
	function resetTab(id) {
		setTab(id);
		setError("");
		setPassword("");
		setConfirm("");
	}
	async function finish(em, pw, name) {
		if (mode === "up") {
			const up = await authClient.signUp.email({
				email: em,
				password: pw,
				name,
				callbackURL: "/me"
			});
			if (up.error) throw new Error(up.error.message || l.fail);
		} else {
			const inn = await authClient.signIn.email({
				email: em,
				password: pw,
				callbackURL: "/me"
			});
			if (inn.error) throw new Error(inn.error.message || l.fail);
		}
		window.location.href = "/me";
	}
	async function onPhone(e) {
		e.preventDefault();
		setError("");
		if (!/^1[3-9]\d{9}$/.test(phone)) {
			setError(l.badPhone);
			return;
		}
		if (password.length < 8) {
			setError(l.pwShort);
			return;
		}
		if (mode === "up" && password !== confirm) {
			setError(l.pwMismatch);
			return;
		}
		setBusy(true);
		try {
			await finish(phoneEmail(phone), password, lang === "en" ? `Farmer ${phone.slice(-4)}` : `农户${phone.slice(-4)}`);
		} catch (err) {
			setError(mapAuthError(err instanceof Error ? err.message : "", l));
		} finally {
			setBusy(false);
		}
	}
	async function onEmail(e) {
		e.preventDefault();
		setError("");
		const em = email.trim().toLowerCase();
		if (!em || !em.includes("@")) {
			setError(l.emailAddr);
			return;
		}
		if (password.length < 8) {
			setError(l.pwShort);
			return;
		}
		if (mode === "up" && password !== confirm) {
			setError(l.pwMismatch);
			return;
		}
		setBusy(true);
		try {
			await finish(em, password, lang === "en" ? "Farmer" : "农户");
		} catch (err) {
			setError(mapAuthError(err instanceof Error ? err.message : "", l));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-5 px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-5 top-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-4 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.svg",
						alt: "",
						width: 44,
						height: 44,
						className: "size-11 rounded-xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold",
						children: t.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: l.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base text-muted",
					children: l.lead
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-1 rounded-xl border border-line bg-surface p-1",
				children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => resetTab(item.id),
					className: tab === item.id ? "min-h-11 rounded-lg bg-forest text-sm font-medium text-forest-fg" : "min-h-11 rounded-lg text-sm text-muted",
					children: item.label
				}, item.id))
			}),
			tab === "phone" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (e) => void onPhone(e),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: l.phone
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "numeric",
							maxLength: 11,
							placeholder: l.phonePh,
							value: phone,
							autoComplete: "username",
							onChange: (e) => setPhone(e.target.value.replace(/\D/g, ""))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: l.password
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							placeholder: l.password,
							value: password,
							autoComplete: mode === "up" ? "new-password" : "current-password",
							onChange: (e) => setPassword(e.target.value)
						})]
					}),
					mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: l.confirmPw
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							placeholder: l.confirmPw,
							value: confirm,
							autoComplete: "new-password",
							onChange: (e) => setConfirm(e.target.value)
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: busy,
						children: mode === "up" ? l.phoneUp : l.phoneIn
					})
				]
			}) : null,
			tab === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (e) => void onEmail(e),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: l.email
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							placeholder: l.email,
							value: email,
							autoComplete: "email",
							onChange: (e) => setEmail(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: l.password
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							placeholder: l.password,
							value: password,
							autoComplete: mode === "up" ? "new-password" : "current-password",
							onChange: (e) => setPassword(e.target.value)
						})]
					}),
					mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: l.confirmPw
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							placeholder: l.confirmPw,
							value: confirm,
							autoComplete: "new-password",
							onChange: (e) => setConfirm(e.target.value)
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: busy,
						children: mode === "up" ? l.emailUp : l.emailIn
					})
				]
			}) : null,
			tab === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: l.googleLead
				}), GROK_PROVIDERS.length ? GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: p.idp === "google" ? "primary" : "secondary",
					size: "lg",
					className: "w-full",
					onClick: () => void signIn(p.providerId, { callbackURL: "/me" }),
					children: l.use(p.label)
				}, p.providerId)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-line bg-surface-2 px-4 py-3 text-muted",
					children: l.googleUnconfigured
				})]
			}) : null,
			tab !== "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-sm text-muted",
				onClick: () => {
					setMode((m) => m === "in" ? "up" : "in");
					setError("");
					setConfirm("");
				},
				children: mode === "in" ? l.noAccount : l.hasAccount
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [l.agree, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					className: "text-forest underline",
					children: l.privacy
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/diagnose",
				className: "text-center text-forest underline",
				children: l.skip
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-subtle",
				children: t.footer.maker
			})
		]
	});
}
//#endregion
export { Login as component };
