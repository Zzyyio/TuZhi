import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as getArticle } from "./search-D6Ts0OEn.mjs";
import { c as useCurrentUserState, l as farmerLabel, v as useI18n } from "./router-OKOTHu9b.mjs";
import { n as loadHistory, t as loadFavs } from "./local-DhlOhQ-0.mjs";
import { t as localizeArticle } from "./localize-CqUXPaCK.mjs";
import { n as localizePost } from "./posts-en-8gKEZY3C.mjs";
import { a as myPosts } from "./community-C8f2tROE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-sfqEjlMp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MePage() {
	const { user, isPending } = useCurrentUserState();
	const { lang, t } = useI18n();
	const m = t.me;
	const [favs] = (0, import_react.useState)(() => loadFavs());
	const history = (0, import_react.useMemo)(() => loadHistory(), []);
	const posts = useQuery({
		queryKey: ["me-posts"],
		queryFn: () => myPosts(),
		enabled: Boolean(user)
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl bg-surface-2" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "rounded-2xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: m.title
					}),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-lg",
						children: farmerLabel(user.displayName, user.primaryEmail, lang)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: m.guest
					}),
					!user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "mt-3 flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg",
						children: m.loginSync
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: m.history
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: m.historyNote
					}),
					history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: m.noHistory
					}) : null,
					history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-surface p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: h.kind || h.category || t.nav.diagnose
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: h.question
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: h.summary
							})
						]
					}, h.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: m.favs
					}),
					favs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: m.noFavs
					}) : null,
					favs.map((slug) => {
						const a = getArticle(slug);
						if (!a) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/knowledge/$slug",
							params: { slug },
							className: "block rounded-xl border border-line bg-surface p-3",
							children: localizeArticle(a, lang).title
						}, slug);
					})
				]
			}),
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: m.myPosts
					}),
					(posts.data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/community/$id",
						params: { id: String(p.id) },
						className: "block rounded-xl border border-line bg-surface p-3",
						children: localizePost(p.title, "", lang).title
					}, p.id)),
					(posts.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: m.noPosts
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/community/new",
						className: "block text-forest underline",
						children: m.goAsk
					})
				]
			}) : null
		]
	});
}
//#endregion
export { MePage as component };
