import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { i as createServerFn } from "./ssr.mjs";
import { f as STAGE_OPTIONS, l as REGION_OPTIONS, o as CROP_OPTIONS, s as FERT_OPTIONS } from "./constants-DTRks9S4.mjs";
import { a as getArticle } from "./search-D6Ts0OEn.mjs";
import { a as Send, p as Camera, t as X, u as ImagePlus } from "../_libs/lucide-react.mjs";
import { c as useCurrentUserState, f as cn, p as createSsrRpc, v as useI18n } from "./router-OKOTHu9b.mjs";
import { t as Button } from "./button-B33AwUZF.mjs";
import { t as labelOf } from "./lexicon-DKTqo0RI.mjs";
import { r as saveHistory } from "./local-DhlOhQ-0.mjs";
import { t as localizeArticle } from "./localize-CqUXPaCK.mjs";
import { t as VoiceButton } from "./VoiceButton-CSng6OJV.mjs";
import { t as Textarea } from "./textarea-CVeywnkQ.mjs";
import { t as Input } from "./input-B8MV3qDe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnose-DRu68AA6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function canvasToBlobUrl(canvas, maxBytes = 4e5) {
	const qualities = [
		.7,
		.58,
		.46,
		.34
	];
	return new Promise((resolve, reject) => {
		const tryQ = (i) => {
			const q = qualities[i] ?? .28;
			canvas.toBlob((blob) => {
				if (!blob) {
					reject(/* @__PURE__ */ new Error("无法压缩图片"));
					return;
				}
				if (blob.size <= maxBytes || i >= qualities.length) {
					const reader = new FileReader();
					reader.onload = () => resolve(String(reader.result));
					reader.onerror = () => reject(/* @__PURE__ */ new Error("读图失败"));
					reader.readAsDataURL(blob);
					return;
				}
				tryQ(i + 1);
			}, "image/jpeg", q);
		};
		tryQ(0);
	});
}
function draw(source, width, height, maxEdge) {
	const scale = Math.min(1, maxEdge / Math.max(width, height));
	const w = Math.max(1, Math.round(width * scale));
	const h = Math.max(1, Math.round(height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("无法处理图片");
	ctx.drawImage(source, 0, 0, w, h);
	return canvas;
}
async function compressImageFile(file, maxEdge = 1600) {
	try {
		const bitmap = await createImageBitmap(file);
		const canvas = draw(bitmap, bitmap.width, bitmap.height, maxEdge);
		bitmap.close();
		return canvasToBlobUrl(canvas);
	} catch {
		const url = URL.createObjectURL(file);
		try {
			const img = await new Promise((resolve, reject) => {
				const el = new Image();
				el.onload = () => resolve(el);
				el.onerror = () => reject(/* @__PURE__ */ new Error("图片读不出来"));
				el.src = url;
			});
			return canvasToBlobUrl(draw(img, img.naturalWidth, img.naturalHeight, maxEdge));
		} finally {
			URL.revokeObjectURL(url);
		}
	}
}
function looksLikeImage(file) {
	if (!file.type || file.type.startsWith("image/")) return true;
	return /\.(jpe?g|png|webp|gif|heic|heif|bmp)$/i.test(file.name);
}
async function fileToDataUrl(file) {
	if (!looksLikeImage(file)) return null;
	try {
		return await compressImageFile(file);
	} catch {
		return null;
	}
}
function PhotoSlot({ label, hint, avoid, src, onChange, exampleSrc, cameraLabel = "拍照", albumLabel = "相册", shotPrefix = "拍成这样：", avoidPrefix = "别拍成那样：" }) {
	const album = (0, import_react.useRef)(null);
	const camera = (0, import_react.useRef)(null);
	async function pick(files) {
		const f = files?.[0];
		if (!f) return;
		const url = await fileToDataUrl(f);
		if (url) onChange(url);
		if (album.current) album.current.value = "";
		if (camera.current) camera.current.value = "";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: album,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => void pick(e.target.files)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: camera,
				type: "file",
				accept: "image/*",
				capture: "environment",
				className: "hidden",
				onChange: (e) => void pick(e.target.files)
			}),
			src ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "relative block w-full overflow-hidden rounded-xl border border-line",
				onClick: () => onChange(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: label,
					className: "h-40 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-surface text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-clay bg-surface text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg font-medium",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => camera.current?.click(),
						className: "inline-flex min-h-10 items-center gap-1 rounded-lg bg-forest px-3 text-sm text-forest-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), cameraLabel]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => album.current?.click(),
						className: "inline-flex min-h-10 items-center gap-1 rounded-lg border border-line bg-surface px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), albumLabel]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [exampleSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: exampleSrc,
					alt: "",
					className: "h-12 w-12 shrink-0 rounded-md object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [shotPrefix, hint]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-subtle",
				children: [avoidPrefix, avoid]
			})
		]
	});
}
function DisclaimerBanner({ full = false, className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("rounded-lg border border-line bg-surface-2 px-4 py-3 text-base leading-relaxed text-muted", className),
		role: "note",
		children: full ? t.disclaimer : t.disclaimerShort
	});
}
var diagnoseSoil = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("a29cfa2c77164a6d97b20c71f1e3255dc6e98cfdee831aafc853a32032476348"));
function LabField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			inputMode: "decimal",
			value,
			onChange: (e) => onChange(e.target.value),
			"aria-label": label
		})]
	});
}
function DiagnosePage() {
	const { user } = useCurrentUserState();
	const { lang, t } = useI18n();
	const d = t.diagnose;
	const [plant, setPlant] = (0, import_react.useState)(null);
	const [closeup, setCloseup] = (0, import_react.useState)(null);
	const [soil, setSoil] = (0, import_react.useState)(null);
	const [lab, setLab] = (0, import_react.useState)(null);
	const [showLab, setShowLab] = (0, import_react.useState)(false);
	const [crop, setCrop] = (0, import_react.useState)("");
	const [region, setRegion] = (0, import_react.useState)("");
	const [stage, setStage] = (0, import_react.useState)("");
	const [fertilizer, setFertilizer] = (0, import_react.useState)("");
	const [fertNote, setFertNote] = (0, import_react.useState)("");
	const [text, setText] = (0, import_react.useState)("");
	const [ph, setPh] = (0, import_react.useState)("");
	const [ec, setEc] = (0, import_react.useState)("");
	const [om, setOm] = (0, import_react.useState)("");
	const [n, setN] = (0, import_react.useState)("");
	const [p, setP] = (0, import_react.useState)("");
	const [k, setK] = (0, import_react.useState)("");
	const [warn, setWarn] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [follow, setFollow] = (0, import_react.useState)("");
	const historyRef = (0, import_react.useRef)([]);
	const lastImages = (0, import_react.useRef)([]);
	const resultRef = (0, import_react.useRef)(null);
	const qRef = (0, import_react.useRef)(null);
	const slotUi = {
		cameraLabel: d.camera,
		albumLabel: d.album,
		shotPrefix: d.shot,
		avoidPrefix: d.avoid
	};
	const mut = useMutation({
		mutationFn: (payload) => diagnoseSoil({ data: payload }),
		onSuccess: (res, payload) => {
			if (!res.ok) {
				setWarn(res.error);
				return;
			}
			setResult(res.result);
			const nextHist = [
				...historyRef.current,
				{
					role: "user",
					text: payload.question
				},
				{
					role: "assistant",
					text: res.result.analysis
				}
			];
			historyRef.current = nextHist.slice(-8);
			saveHistory({
				id: String(Date.now()),
				at: Date.now(),
				question: payload.question,
				category: res.result.category,
				summary: res.result.analysis.slice(0, 180) || res.result.diagnoses[0]?.summary || res.result.category
			});
		},
		onError: () => setWarn(d.sendFail)
	});
	(0, import_react.useEffect)(() => {
		if (mut.isPending || result) resultRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}, [mut.isPending, result]);
	const filled = [
		plant,
		closeup,
		soil
	].filter(Boolean).length;
	const questionNow = () => (qRef.current?.value ?? text).trim();
	function basePayload(question) {
		const pics = lastImages.current.length ? lastImages.current : [
			plant,
			closeup,
			soil,
			lab
		].filter(Boolean);
		lastImages.current = pics;
		return {
			question,
			images: pics,
			crop: crop === "不确定" ? "" : crop,
			region: region === "不确定" ? "" : region,
			stage: stage === "不确定" ? "" : stage,
			fertilizer: [fertilizer === "不确定" ? "" : fertilizer, fertNote].filter(Boolean).join(" "),
			labText: lab ? lang === "en" ? "Lab sheet photo attached" : "附化验单照片" : "",
			ph,
			ec,
			om,
			n,
			p,
			k,
			lang,
			history: historyRef.current
		};
	}
	function send() {
		if (mut.isPending) return;
		const question = questionNow();
		if (filled < 1 && question.length < 8) {
			setWarn(d.needPhoto);
			return;
		}
		if (filled === 0) setWarn(d.noPhotoWarn);
		else if (filled < 3) setWarn(d.fewPhotoWarn);
		else setWarn("");
		historyRef.current = [];
		lastImages.current = [
			plant,
			closeup,
			soil,
			lab
		].filter(Boolean);
		mut.mutate(basePayload(question || (lang === "en" ? "Please look at the photos and tell me what is wrong with the soil and crop." : "请看照片，帮我判断土和庄稼出了什么问题。")));
	}
	function sendFollow() {
		const q = follow.trim();
		if (!q || mut.isPending) return;
		setFollow("");
		setWarn("");
		mut.mutate(basePayload(q));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: d.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-lg text-muted",
					children: d.lead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 rounded-xl border border-line bg-surface-2 px-4 py-3 text-base text-muted",
					children: t.fieldHint
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
						label: d.slotPlant,
						hint: d.hintPlant,
						avoid: d.avoidPlant,
						src: plant,
						onChange: setPlant,
						exampleSrc: "/images/hero-field.jpg",
						...slotUi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
						label: d.slotLeaf,
						hint: d.hintLeaf,
						avoid: d.avoidLeaf,
						src: closeup,
						onChange: setCloseup,
						exampleSrc: "/images/articles/que-dan.jpg",
						...slotUi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
						label: d.slotSoil,
						hint: d.hintSoil,
						avoid: d.avoidSoil,
						src: soil,
						onChange: setSoil,
						exampleSrc: "/images/articles/yan-jian.jpg",
						...slotUi
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-left text-base text-forest underline",
				onClick: () => setShowLab((v) => !v),
				children: showLab ? d.labHide : d.labToggle
			}),
			showLab ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-xl border border-line bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
						label: d.labPhoto,
						hint: d.labHint,
						avoid: d.labAvoid,
						src: lab,
						onChange: setLab,
						...slotUi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base text-muted",
						children: d.labFill
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabField, {
								label: "pH",
								value: ph,
								onChange: setPh
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabField, {
								label: "EC",
								value: ec,
								onChange: setEc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabField, {
								label: lang === "en" ? "OM" : "有机质",
								value: om,
								onChange: setOm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabField, {
								label: lang === "en" ? "N" : "氮",
								value: n,
								onChange: setN
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabField, {
								label: lang === "en" ? "P" : "磷",
								value: p,
								onChange: setP
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabField, {
								label: lang === "en" ? "K" : "钾",
								value: k,
								onChange: setK
							})
						]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "min-h-12 border border-line bg-surface px-3 text-base",
						value: crop,
						onChange: (e) => setCrop(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: d.crop
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "不确定",
								children: t.uncertain
							}),
							CROP_OPTIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: labelOf(c, lang)
							}, c))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "min-h-12 border border-line bg-surface px-3 text-base",
						value: region,
						onChange: (e) => setRegion(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: d.region
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "不确定",
								children: t.uncertain
							}),
							REGION_OPTIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: labelOf(c, lang)
							}, c))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "min-h-12 border border-line bg-surface px-3 text-base",
						value: stage,
						onChange: (e) => setStage(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: d.stage
						}), STAGE_OPTIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: labelOf(c, lang)
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "min-h-12 border border-line bg-surface px-3 text-base",
						value: fertilizer,
						onChange: (e) => setFertilizer(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: d.fert
						}), FERT_OPTIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: labelOf(c, lang)
						}, c))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: d.fertNote,
				value: fertNote,
				onChange: (e) => setFertNote(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				ref: qRef,
				rows: 4,
				placeholder: d.qPh,
				value: text,
				onChange: (e) => setText(e.target.value),
				onInput: (e) => setText(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, { onText: (v) => setText((prev) => prev ? `${prev} ${v}` : v) }),
			warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base text-clay",
				children: warn
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "lg",
				className: "w-full text-xl",
				onClick: send,
				disabled: mut.isPending,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5" }), mut.isPending ? d.sending : d.send]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclaimerBanner, { full: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: resultRef,
				id: "diagnose-result",
				className: "scroll-mt-24",
				children: [mut.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-line bg-surface p-4 text-lg",
					children: d.wait
				}) : null, result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "bg-surface-2 px-3 py-2 text-lg font-medium",
							children: [d.result, result.category]
						}),
						result.analysis ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: d.analysis
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 whitespace-pre-wrap text-base leading-relaxed",
							children: result.analysis
						})] }) : null,
						result.seen.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-medium",
							children: d.seen
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 list-disc pl-5 text-base",
							children: result.seen.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
						})] }) : null,
						result.labNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: d.lab
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-base",
							children: result.labNotes
						})] }) : null,
						result.diagnoses.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: d.causes
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-2 space-y-2",
							children: result.diagnoses.map((item) => {
								const src = item.sourceSlug ? getArticle(item.sourceSlug) : void 0;
								const loc = src ? localizeArticle(src, lang) : void 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "bg-surface-2 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-lg font-medium",
											children: [item.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2 text-base font-normal text-muted",
												children: item.probability
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-base text-muted",
											children: item.summary
										}),
										loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/knowledge/$slug",
											params: { slug: loc.slug },
											className: "mt-1 inline-block text-forest underline",
											children: [d.source, loc.title]
										}) : null
									]
								}, item.name);
							})
						})] }) : null,
						result.causes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "list-disc pl-5 text-base text-muted",
							children: result.causes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
						}) : null,
						result.dont.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-medium",
							children: d.dont
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 list-disc pl-5 text-base",
							children: result.dont.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
						})] }) : null,
						result.next.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-medium",
							children: d.next
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-1 list-decimal space-y-1 pl-5 text-base",
							children: result.next.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
						})] }) : null,
						result.relatedSlugs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-medium",
							children: d.related
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1",
							children: result.relatedSlugs.map((slug) => {
								const a = getArticle(slug);
								if (!a) return null;
								const loc = localizeArticle(a, lang);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/knowledge/$slug",
									params: { slug },
									className: "text-lg text-forest underline",
									children: loc.title
								}) }, slug);
							})
						})] }) : null,
						result.needLabTest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "bg-surface-2 px-3 py-2 text-base",
							children: d.testHint
						}) : null,
						result.followUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base text-muted",
							children: result.followUp
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-medium text-clay",
							children: result.disclaimer || t.disclaimer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 border-t border-line pt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-medium",
									children: d.followTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 3,
									placeholder: d.followPh,
									value: follow,
									onChange: (e) => setFollow(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									onClick: sendFollow,
									disabled: mut.isPending || !follow.trim(),
									children: d.followSend
								})
							]
						}),
						!user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "flex min-h-12 items-center justify-center rounded-lg border border-forest text-forest",
							children: d.saveLogin
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: d.saved
						})
					]
				}) : null]
			})
		]
	});
}
//#endregion
export { DiagnosePage as component };
