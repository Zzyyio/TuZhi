import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as videoMeta } from "./search-D6Ts0OEn.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { g as indicatorView, h as encyclopediaAnchor, v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Button } from "./button-B33AwUZF.mjs";
import { t as Badge } from "./badge-CVA73KLn.mjs";
import { t as labelOf } from "./lexicon-DKTqo0RI.mjs";
import { i as toggleFav, t as loadFavs } from "./local-DhlOhQ-0.mjs";
import { t as ArticleCard } from "./ArticleCard-DbI47fkY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GuidePage-D9QpKQRP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function extractBvid(url) {
	return url.match(/BV[0-9A-Za-z]{6,}/)?.[0] ?? null;
}
function BilibiliPlayer({ slug, url, title, captionNote }) {
	const { t } = useI18n();
	const k = t.knowledge;
	const meta = slug ? videoMeta(slug) : void 0;
	const bvid = meta?.bvid ?? extractBvid(url) ?? "BV13E421M7Ly";
	const videoTitle = meta?.title ?? title;
	const src = `https://player.bilibili.com/player.html?isOutside=true&bvid=${encodeURIComponent(bvid)}&p=1&high_quality=1&danmaku=0&as_wide=1&autoplay=0`;
	const page = `https://www.bilibili.com/video/${bvid}/`;
	const reference = Boolean(meta?.reference);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bili-wrap relative w-full overflow-hidden rounded-xl bg-ink",
				style: { paddingTop: "56.25%" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src,
					scrolling: "no",
					className: "absolute inset-0 size-full border-0",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
					allowFullScreen: true,
					referrerPolicy: "no-referrer-when-downgrade",
					title: videoTitle
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "video-caption text-sm text-muted",
				children: [
					"Bilibili · ",
					videoTitle,
					" · BV ",
					bvid,
					reference ? ` · ${k.biliRef}` : null,
					captionNote ? ` · ${captionNote}` : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: page,
				target: "_blank",
				rel: "noreferrer",
				className: "text-sm text-forest underline",
				children: k.biliOpen
			})
		]
	});
}
function PhotoGallery({ photos }) {
	const { t } = useI18n();
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
		children: photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen(p),
			className: "overflow-hidden rounded-xl border border-line bg-surface text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.src,
				alt: p.alt,
				className: "h-52 w-full bg-surface-2 object-cover",
				loading: "lazy",
				onError: (e) => {
					e.currentTarget.style.visibility = "hidden";
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block px-3 py-2 text-sm text-muted",
				children: p.caption
			})]
		}, p.src + p.caption))
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4",
		role: "dialog",
		"aria-modal": "true",
		onClick: () => setOpen(null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-surface text-ink",
			"aria-label": t.knowledge.close,
			onClick: () => setOpen(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: open.src,
			alt: open.alt,
			className: "max-h-[90dvh] max-w-full rounded-lg object-contain"
		})]
	}) : null] });
}
function Section({ n, title, id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id,
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-baseline gap-2 font-display text-2xl font-semibold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-forest",
				children: n
			}), title]
		}), children]
	});
}
function GuidePage({ article, rawSlug, videoTitle, related, backTo, backLabel }) {
	const { lang, t } = useI18n();
	const k = t.knowledge;
	const [favs, setFavs] = (0, import_react.useState)(() => loadFavs());
	const [howtoOnly, setHowtoOnly] = (0, import_react.useState)(false);
	const primary = article.problems[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: backTo,
							className: "text-forest",
							children: backLabel
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold leading-tight",
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted",
						children: article.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: primary }) : null, article.problems.slice(1).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "opacity-60",
							children: tag
						}, tag))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-line bg-surface-2 px-4 py-3 text-base leading-relaxed text-muted",
						children: t.fieldHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-forest underline",
							onClick: () => setHowtoOnly((v) => !v),
							children: howtoOnly ? k.full : k.howto
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							onClick: () => setFavs(toggleFav(rawSlug)),
							children: favs.includes(rawSlug) ? k.faved : k.fav
						})]
					})
				]
			}),
			!howtoOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					n: "1",
					title: k.s1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-2xl border border-line bg-surface p-4 text-base leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: k.look }), article.phenomenon.appearance] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: k.when }), article.phenomenon.conditions] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: k.crops }), article.phenomenon.commonCrops] }),
							article.fieldCheck ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: k.confirm }), article.fieldCheck] }) : null
						]
					})
				}),
				article.longform?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					n: "1b",
					title: k.sDetail,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4 rounded-2xl border border-line bg-surface p-4 text-base leading-relaxed",
						children: article.longform.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 24)))
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					n: "2",
					title: k.s2,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: article.confuse.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-line bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: k.like(c.lookalike)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted",
									children: c.difference
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-subtle",
									children: [k.photo, c.photoHint]
								})
							]
						}, c.lookalike))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					n: "3",
					title: k.s3,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoGallery, { photos: article.photos }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: k.photoNote
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					n: "4",
					title: k.s4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl bg-surface-2 p-4 leading-relaxed",
						children: article.causes.plainExplain
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 font-medium",
								children: k.natural
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc space-y-2 pl-5 text-muted",
								children: article.causes.natural.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 font-medium",
								children: k.human
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc space-y-2 pl-5 text-muted",
								children: article.causes.human.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
							})]
						})]
					})]
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				n: "5",
				title: k.s5,
				id: "how",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: article.solutions.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 rounded-2xl border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 shrink-0 place-items-center rounded-full bg-forest text-sm font-semibold text-forest-fg",
							children: i + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "leading-relaxed",
							children: s
						})]
					}, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				n: "6",
				title: k.s6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl border border-line",
					children: article.dosage.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-line bg-surface p-4 last:border-b-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: d.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg",
								children: d.range
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: d.note
							})
						]
					}, d.name))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: k.doseNote
				})]
			}),
			article.dontDo?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				n: "7",
				title: k.s7,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-2 rounded-2xl border border-line bg-surface p-4 pl-8",
					children: article.dontDo.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
				})
			}) : null,
			article.whenToTest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				n: "8",
				title: k.s8,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
					children: article.whenToTest
				})
			}) : null,
			!howtoOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: k.prevent
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "list-disc space-y-2 pl-5",
						children: article.prevention.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: k.indicators
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl border border-line",
						children: article.indicators.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-line bg-surface p-4 last:border-b-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/encyclopedia/$id",
										params: { id: encyclopediaAnchor(i.name) },
										className: "text-forest",
										children: indicatorView(i.name, lang)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: i.meaning
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: i.typical
								})
							]
						}, i.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: k.videos
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: article.solutions.videos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "overflow-hidden rounded-xl border border-line bg-surface p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BilibiliPlayer, {
								slug: rawSlug,
								url: v.url,
								title: v.title || videoTitle || article.title,
								topic: article.title,
								playLabel: k.play
							})
						}, v.url))
					})]
				})
			] }) : null,
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: k.related
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: related.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: k.updated(article.updatedAt, labelOf(article.reviewer, lang))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/diagnose",
				className: "flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg",
				children: k.ask
			})
		]
	});
}
//#endregion
export { GuidePage as t };
