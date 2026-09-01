import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, n as useQuery } from "./_libs/react+tanstack__react-query.mjs";
import { a as Route$6, c as useCurrentUserState, d as isLiZeyu, l as farmerLabel, u as formatPostDate, v as useI18n } from "./_ssr/router-OKOTHu9b.mjs";
import { t as Button } from "./_ssr/button-B33AwUZF.mjs";
import { t as Badge } from "./_ssr/badge-CVA73KLn.mjs";
import { t as labelOf } from "./_ssr/lexicon-DKTqo0RI.mjs";
import { t as VoiceButton } from "./_ssr/VoiceButton-CSng6OJV.mjs";
import { t as Textarea } from "./_ssr/textarea-CVeywnkQ.mjs";
import { n as localizePost, t as localizeAnswer } from "./_ssr/posts-en-8gKEZY3C.mjs";
import { r as getPost, t as createAnswer } from "./_ssr/community-C8f2tROE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-Cn-uZUSX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PostPage() {
	const { id } = Route$6.useParams();
	const { user } = useCurrentUserState();
	const { lang, t } = useI18n();
	const c = t.community;
	const q = useQuery({
		queryKey: ["post", id],
		queryFn: () => getPost({ data: { id } })
	});
	const [body, setBody] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: c.loading
	});
	if (q.isError || !q.data?.post) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-muted",
		children: [c.gone, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/community",
			className: "ml-2 text-forest underline",
			children: c.back
		})]
	});
	const { post, answers } = q.data;
	const loc = localizePost(post.title, post.body, lang);
	async function reply(e) {
		e.preventDefault();
		if (!user) return;
		setBusy(true);
		const res = await createAnswer({ data: {
			postId: post.id,
			body
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error === "short" ? c.errReply : res.error === "blocked" ? c.errBlocked : c.gone);
			return;
		}
		setBody("");
		q.refetch();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/community",
				className: "text-forest",
				children: c.back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: loc.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					post.problem_type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: labelOf(post.problem_type, lang) }) : null,
					post.crop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: labelOf(post.crop, lang) }) : null,
					post.region ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: labelOf(post.region, lang) }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: farmerLabel(post.display_name, null, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-subtle",
						children: formatPostDate(post.created_at, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-subtle",
						children: answers.length > 0 ? c.answered(answers.length) : c.waiting
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-lg leading-relaxed",
				children: loc.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: c.answers
					}),
					answers.map((a) => {
						const mine = isLiZeyu(a.display_name, a.user_id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/olivine.jpg",
									alt: "",
									className: "size-10 rounded-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-10 place-items-center rounded-full bg-surface-2 text-sm text-muted",
									children: farmerLabel(a.display_name, null, lang).slice(-2)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: farmerLabel(a.display_name, null, lang)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-subtle",
									children: formatPostDate(a.created_at, lang)
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 whitespace-pre-wrap leading-relaxed",
								children: localizeAnswer(post.title, a.body, lang)
							})]
						}, a.id);
					}),
					answers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: c.noAnswers
					}) : null
				]
			}),
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-2",
				onSubmit: (e) => void reply(e),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 4,
						placeholder: c.replyPh,
						value: body,
						onChange: (e) => setBody(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, { onText: (txt) => setBody((p) => p ? `${p} ${txt}` : txt) }),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-danger",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: c.reply
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "text-forest underline",
					children: c.loginToReply
				}), c.diagnoseFree]
			})
		]
	});
}
//#endregion
export { PostPage as component };
