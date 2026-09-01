import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createFileRoute, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { i as createServerFn, n as __exportAll, o as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { n as APP_TAGLINE, t as APP_NAME } from "./constants-DTRks9S4.mjs";
import { a as getArticle, t as ARTICLES } from "./search-D6Ts0OEn.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { n as auth } from "./server-C1L_bUYK.mjs";
import { d as House, l as MessagesSquare, m as BookOpen, n as UserRound, r as TriangleAlert, s as ScanLine } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lang-BSnRWoqu.js
var ui = {
	zh: {
		name: "土知",
		tagline: "看懂土地，种好地",
		desc: "面向农民的土壤科普：拍照诊断、知识库与问答。",
		nav: {
			home: "首页",
			diagnose: "诊断",
			knowledge: "知识",
			community: "问答",
			me: "我的",
			wiki: "百科",
			login: "登录"
		},
		footer: {
			about: "关于",
			knowledge: "知识库",
			wiki: "百科",
			community: "问答",
			privacy: "隐私与免责",
			contact: "联系",
			maker: "制作人：李泽宇 Li Zeyu"
		},
		disclaimer: "诊断结果仅供学习参考，不能替代专业农技指导。严重问题请咨询当地农技站或进行土壤检测。",
		disclaimerShort: "内容仅供学习参考，具体施肥用药请结合当地农技站意见和土壤检测。",
		fieldHint: "到地里先看三样：叶位（新叶还是老叶）、根（白、褐还是臭）、土面（白霜、积水还是干裂）。三样对不上，不要急着下肥。",
		all: "全部",
		uncertain: "不确定",
		search: "搜索",
		home: {
			heroAlt: "耕过的土地",
			lead: "土发白、发酸、板结、苗黄？先拍三张：整株、特写、土面。弄清原因再下肥。",
			diagnose: "拍照诊断",
			searchPh: "搜：土发白、苗黄、土发酸、板结",
			searchAria: "搜索土壤问题",
			problems: "常见问题",
			hot: "热门问题",
			more: "全部",
			posts: "社区热帖",
			toCommunity: "去问答",
			answered: (n) => `已有 ${n} 答`,
			waiting: "待回答",
			noPosts: "还没有新帖。先去拍照诊断，或看看知识库。"
		},
		examples: [
			"土发白",
			"苗黄",
			"土发酸",
			"板结"
		],
		diagnose: {
			title: "拍照诊断",
			lead: "先拍照再说现象。对照知识库，并尽量把病害、药害分开。",
			slotPlant: "整株或整块地",
			hintPlant: "把整棵或一整垄拍进画面",
			avoidPlant: "只拍天或鞋尖",
			slotLeaf: "叶子或根特写",
			hintLeaf: "对焦点在叶片或根尖",
			avoidLeaf: "模糊、逆光一片黑",
			slotSoil: "土面",
			hintSoil: "白霜、结皮、积水要拍清楚",
			avoidSoil: "拍成远处风景",
			shot: "拍成这样：",
			avoid: "别拍成那样：",
			camera: "拍照",
			album: "相册",
			labToggle: "可选：上传化验单 / 手填数字",
			labHide: "收起化验单",
			labPhoto: "化验单照片",
			labHint: "拍清楚 pH、EC、有机质那几行",
			labAvoid: "反光看不清",
			labFill: "我来填报告数字（比只靠认字稳）：",
			crop: "作物",
			region: "地区",
			stage: "生育期",
			fert: "最近施肥",
			fertNote: "施肥补充一句（可选）",
			qPh: "例如：玉米底下叶子先黄，土有点白，河北，上周刚施了复合肥",
			needPhoto: "三个拍照槽至少填 1 张，或写清楚现象。",
			noPhotoWarn: "没照片结果会不准。建议补拍整株、特写、土面。先按文字给你看。",
			fewPhotoWarn: "建议补拍，结果会准一些。先按现有照片给你看。",
			sending: "正在看照片，大约十到二十秒…",
			send: "开始诊断",
			wait: "正在看照片和化验数字，大约十到二十秒。结果会出现在这里。",
			sendFail: "这次没发出去。照片再小一点，或先写几句文字再发。",
			result: "对照结果：",
			analysis: "照片里看到的",
			seen: "依据",
			causes: "可能原因",
			lab: "化验单里看到的",
			dont: "先不要做的事",
			next: "建议下一步",
			related: "相关知识",
			testHint: "拿不准就测土，别只靠看叶子猛下肥。",
			saveLogin: "登录后保存这次诊断",
			saved: "这次诊断已记在这台设备的「我的」里。",
			followPh: "继续问：比如「石灰能撒吗」「和缺氮怎么分」",
			followSend: "继续问",
			followTitle: "接着问",
			aiBusy: "这次没对照上。请再试一次，或先去知识库。",
			aiOff: "这次对照暂时不可用。可以先去知识库，或稍后再试。",
			empty: "请拍至少一张照片，或写几句现象。",
			source: "对照："
		},
		knowledge: {
			title: "知识库",
			lead: "按作物、问题和地区查找。每篇都有容易混淆、用量区间和审校。",
			toWiki: "去看土壤百科名词解释",
			ph: "土发白、苗黄、土发酸、板结",
			byProblem: "问题类型",
			byCrop: "作物",
			byRegion: "地区",
			bySeason: "季节",
			count: (n) => `共 ${n} 篇`,
			empty: "没有找到。换个筛选，或直接去拍照诊断。",
			goDiagnose: "去拍照诊断",
			missing: "没有这篇文章",
			back: "返回知识库",
			howto: "只看办法",
			full: "看全文",
			fav: "收藏到本机",
			faved: "已收藏",
			s1: "这是什么问题",
			look: "看起来怎样：",
			when: "什么时候容易发生：",
			crops: "常见作物：",
			confirm: "地里怎么确认：",
			sDetail: "把地里的事说细",
			s2: "容易混淆",
			like: (x) => `和「${x}」像`,
			photo: "看哪张照片：",
			s3: "田间照片",
			photoNote: "点击照片可放大。照片为示意图，请以自家地里实际为准。",
			s4: "背后的原因",
			natural: "自然因素",
			human: "人为因素",
			s5: "怎么处理",
			s6: "用量区间",
			doseNote: "以上都是区间。按测土、按当地农技站和包装说明，宁少勿多。",
			s7: "先别做",
			s8: "何时测土",
			prevent: "预防",
			indicators: "相关检测指标",
			videos: "讲解视频",
			related: "相关文章",
			updated: (d, r) => `更新时间 ${d} · 审校 ${r} · 内容仅供学习参考`,
			ask: "拿不准？拍照问一问",
			close: "关闭",
			play: "在本页播放",
			biliOpen: "新窗口打开同 BV",
			biliRef: "参考视频，细节以本文文字为准"
		},
		wiki: {
			title: "土壤百科",
			lead: "把报告上的词翻译成人话。看不懂 pH、EC、有机质、交换性铝，先查这里。",
			ph: "搜名词，如 pH、有机质、交换性铝、盐碱",
			empty: "没有这个词。可以去知识库看看，或直接拍照诊断。",
			aka: "也叫：",
			back: "返回百科",
			missing: "没有这个词条",
			groups: {
				基础: "基础",
				养分: "养分",
				障碍: "障碍",
				检测: "检测"
			}
		},
		community: {
			title: "问答社区",
			lead: "把地里的问题发出来，互相帮。说清作物、地区和你看见的样子。",
			ask: "我要提问",
			empty: "还没有新帖。先去拍照诊断，或看看知识库。",
			answered: (n) => `已有 ${n} 答`,
			waiting: "待回答",
			needLogin: "发帖需要登录",
			needLoginLead: "提问会记在你的账号下，方便以后回来看回答。拍照诊断不用登录。",
			goLogin: "去登录",
			goDiagnose: "先去拍照诊断（不用登录）",
			newTitle: "我要提问",
			titlePh: "标题：地里发生了什么",
			bodyPh: "把作物、地区、最近施肥和你看到的样子写清楚",
			problem: "问题类型",
			crop: "作物",
			region: "地区",
			publish: "发布",
			publishing: "正在发…",
			loading: "加载帖子…",
			gone: "帖子不在了。",
			back: "返回问答",
			answers: "回答",
			noAnswers: "还没有人答。你可以说说自家怎么处理的。",
			replyPh: "写下你的看法，尽量具体",
			reply: "提交回答",
			loginToReply: "登录后才能回答",
			diagnoseFree: "。诊断不用登录。",
			errShort: "标题和内容再写具体一点。",
			errBlocked: "内容含有不允许的信息，请修改后再发。",
			errSave: "发帖没记下，请再试一次。",
			errReply: "回答再写具体一点。"
		},
		me: {
			title: "我的",
			guest: "还没登录。诊断和收藏先记在这台设备上。",
			loginSync: "登录后同步到云端",
			history: "诊断历史",
			historyNote: "这台设备上的诊断，登录暂未同步到云。",
			noHistory: "还没有诊断。去拍一张吧。",
			favs: "收藏的文章",
			noFavs: "知识文里可以点收藏，记在本机。",
			myPosts: "我的提问",
			noPosts: "还没有提问。",
			goAsk: "去提问"
		},
		login: {
			title: "登录土知",
			lead: "登录后可保存诊断、提问和收藏。不登录也能拍照诊断。",
			phone: "手机号",
			phonePh: "11 位手机号",
			password: "密码",
			confirmPw: "确认密码",
			email: "邮箱",
			emailIn: "邮箱登录",
			emailUp: "邮箱注册",
			phoneIn: "手机号登录",
			phoneUp: "手机号注册",
			noAccount: "没有账号？注册",
			hasAccount: "已有账号？登录",
			agree: "登录即表示同意",
			privacy: "《隐私与免责》",
			skip: "不登录，先去拍照诊断",
			badPhone: "请填写 11 位手机号",
			fail: "登录失败",
			use: (p) => `使用 ${p} 登录`,
			tabPhone: "手机",
			tabEmail: "邮箱",
			tabOpen: "Google / X",
			googleLead: "用 Google 或 X 账号登录，一次即可。",
			pwShort: "密码至少 8 位",
			emailAddr: "请填写邮箱",
			pwMismatch: "两次密码不一致",
			hasUser: "这个账号已注册，请直接登录",
			badPw: "账号或密码不对",
			googleUnconfigured: "开放登录暂不可用",
			signin: "登录"
		},
		about: {
			title: "关于土知",
			p1: "土知是给农民和农技人员用的土壤科普工具。口号是「看懂土地，种好地」。",
			do: "做什么",
			d1: "拍照对照常见土壤问题，并尽量把病害、药害分开。",
			d2: "知识库按现象—容易混淆—原因—办法—用量写明白纸。",
			d3: "百科把化验单上的词翻译成人话。",
			d4: "问答社区互相帮，把地里看见的说清楚。",
			dont: "不做什么",
			dontP: "不替代农技站，不替代实验室。不给农药商品名当处方。紧急田间事故请立刻找当地农技站。",
			how: "内容怎么写",
			howP: "每篇都有现象、容易混淆、用量区间、更新时间和审校字段。用量是范围，必须按测土和当地，宁少勿多。",
			maker: "制作人",
			makerP: "土知由李泽宇（Li Zeyu）制作。"
		},
		contact: {
			title: "联系土知",
			p1: "紧急田间事故请立刻找当地农技站或测土实验室，不要等邮件。",
			p2a: "纠错、建议、合作可以发邮件，也可以到",
			p2b: "问答发帖",
			p2c: "。制作人见",
			p2d: "关于页",
			p2e: "。",
			email: "公共邮箱",
			name: "怎么称呼（可选）",
			msg: "想说的话。紧急事故请找农技站。",
			send: "用邮箱写一封",
			toast: "正在打开邮件。紧急田间事故请立刻找当地农技站，不要等回复。"
		},
		privacy: {
			title: "隐私与免责",
			p2: "诊断照片只用于本次对照，服务端只记录是否带图和简短文字，便于改进知识库，不对外展示人脸或地块位置。",
			p3: "登录可用手机号加密码、邮箱加密码、Google 或 X。诊断照片不对外展示。",
			p4: "请勿上传与田间问题无关的他人隐私照片。"
		},
		err: {
			title: "页面出了点问题",
			back: "回首页",
			notFound: "没有这个页面",
			notFoundLead: "你打开的地址不存在，或者文章已经换了位置。",
			toKnowledge: "去知识库",
			toDiagnose: "去拍照诊断"
		},
		voice: {
			start: "语音输入",
			stop: "停止",
			fail: "这台设备不能语音，请打字。",
			unclear: "没听清。靠近说，或改成打字。",
			listen: "正在听…说完会写进框里。"
		},
		langSwitch: "English",
		langSwitchAria: "Switch to English"
	},
	en: {
		name: "Tuzhi",
		tagline: "Read the soil. Grow it right.",
		desc: "Soil literacy for farmers: photo diagnosis, a field handbook, and Q&A.",
		nav: {
			home: "Home",
			diagnose: "Diagnose",
			knowledge: "Handbook",
			community: "Q&A",
			me: "Me",
			wiki: "Glossary",
			login: "Sign in"
		},
		footer: {
			about: "About",
			knowledge: "Handbook",
			wiki: "Glossary",
			community: "Q&A",
			privacy: "Privacy",
			contact: "Contact",
			maker: "Made by Li Zeyu 李泽宇"
		},
		disclaimer: "Diagnosis is for learning only. It does not replace a local agronomist or a lab test. For serious damage, call your extension station.",
		disclaimerShort: "For learning only. Fertiliser and pesticide decisions need a local agronomist and a soil test.",
		fieldHint: "In the field, check three things first: which leaves (new or old), the roots (white, brown, or rotten), and the soil surface (white crust, standing water, or cracked dry). If those three don’t line up, don’t dump fertiliser yet.",
		all: "All",
		uncertain: "Not sure",
		search: "Search",
		home: {
			heroAlt: "A tilled field",
			lead: "White crust, acid soil, hard clods, yellow leaves? Take three photos: whole plant, close-up, soil surface. Name the cause before you fertilise.",
			diagnose: "Photo diagnosis",
			searchPh: "Search: white crust, yellow leaves, acid soil, hard soil",
			searchAria: "Search soil problems",
			problems: "Common problems",
			hot: "Popular guides",
			more: "All",
			posts: "From the community",
			toCommunity: "Q&A",
			answered: (n) => `${n} answer${n === 1 ? "" : "s"}`,
			waiting: "Waiting",
			noPosts: "No posts yet. Try a photo diagnosis, or open the handbook."
		},
		examples: [
			"white crust",
			"yellow leaves",
			"acid soil",
			"hard soil"
		],
		diagnose: {
			title: "Photo diagnosis",
			lead: "Take photos first, then describe what you see. We check the handbook and try to separate soil trouble from disease or spray injury.",
			slotPlant: "Whole plant or plot",
			hintPlant: "Fit the whole plant or a full row in the frame",
			avoidPlant: "Sky only, or just your shoes",
			slotLeaf: "Leaf or root close-up",
			hintLeaf: "Focus on the blade or root tip",
			avoidLeaf: "Blurry, or a black backlight",
			slotSoil: "Soil surface",
			hintSoil: "Show white crust, a hard cap, or standing water clearly",
			avoidSoil: "A distant landscape",
			shot: "Shoot it like this: ",
			avoid: "Don’t shoot it like this: ",
			camera: "Camera",
			album: "Album",
			labToggle: "Optional: lab sheet photo / type the numbers",
			labHide: "Hide lab sheet",
			labPhoto: "Lab report photo",
			labHint: "Make pH, EC and organic matter readable",
			labAvoid: "Glare you can’t read",
			labFill: "Type the numbers (more reliable than OCR):",
			crop: "Crop",
			region: "Region",
			stage: "Growth stage",
			fert: "Recent fertiliser",
			fertNote: "One extra line about fertiliser (optional)",
			qPh: "e.g. Lower maize leaves yellowed first, soil a bit white, North China, compound fertiliser last week",
			needPhoto: "Add at least one photo, or write a clear description.",
			noPhotoWarn: "No photo means a weaker read. Add whole plant, close-up and soil surface if you can.",
			fewPhotoWarn: "More photos will help. We’ll read what you have.",
			sending: "Looking at the photos, about 10–20 seconds…",
			send: "Start diagnosis",
			wait: "Reading the photos and numbers. The result will appear here.",
			sendFail: "That didn’t send. Shrink the photos a bit, or type a few lines and try again.",
			result: "Read: ",
			analysis: "What the photos show",
			seen: "Evidence",
			causes: "Likely causes",
			lab: "From the lab sheet",
			dont: "Don’t do this yet",
			next: "Next steps",
			related: "Related guides",
			testHint: "If it’s unclear, test the soil. Don’t dump fertiliser from leaf colour alone.",
			saveLogin: "Sign in to keep this diagnosis",
			saved: "Saved on this device under Me.",
			followPh: "Ask a follow-up, e.g. “can I spread lime?” or “how is this different from N deficiency?”",
			followSend: "Ask",
			followTitle: "Ask a follow-up",
			aiBusy: "That read didn’t come back. Try again, or open the handbook.",
			aiOff: "This read isn’t available right now. Use the handbook for now.",
			empty: "Take at least one photo, or write a few lines about what you see.",
			source: "Guide: "
		},
		knowledge: {
			title: "Handbook",
			lead: "Filter by crop, problem and region. Each guide covers lookalikes, a rate range, and a review date.",
			toWiki: "Open the glossary for lab-sheet words",
			ph: "white crust, yellow leaves, acid soil, hard soil",
			byProblem: "Problem",
			byCrop: "Crop",
			byRegion: "Region",
			bySeason: "Season",
			count: (n) => `${n} guide${n === 1 ? "" : "s"}`,
			empty: "Nothing matched. Change the filters, or go to photo diagnosis.",
			goDiagnose: "Photo diagnosis",
			missing: "This guide isn’t here",
			back: "Back to handbook",
			howto: "Fix only",
			full: "Full guide",
			fav: "Save on this device",
			faved: "Saved",
			s1: "What is this",
			look: "How it looks: ",
			when: "When it shows up: ",
			crops: "Common crops: ",
			confirm: "How to confirm in the field: ",
			sDetail: "What you actually see in the field",
			s2: "Easy to mix up",
			like: (x) => `Looks like “${x}”`,
			photo: "Which photo to check: ",
			s3: "Field photos",
			photoNote: "Tap to enlarge. These are diagrams — judge by your own field.",
			s4: "Why it happens",
			natural: "Natural causes",
			human: "What people did",
			s5: "What to do",
			s6: "Rate range",
			doseNote: "These are ranges. Follow a soil test, local advice and the label. Better too little than too much.",
			s7: "Don’t do this first",
			s8: "When to test",
			prevent: "Prevention",
			indicators: "Lab numbers that matter",
			videos: "Video",
			related: "Related guides",
			updated: (d, r) => `Updated ${d} · Reviewed by ${r} · For learning only`,
			ask: "Not sure? Ask with a photo",
			close: "Close",
			play: "Play here",
			biliOpen: "Open the same BV in a new window",
			biliRef: "Reference clip — trust this page’s text for the details"
		},
		wiki: {
			title: "Soil glossary",
			lead: "Plain language for words on a lab sheet: pH, EC, organic matter, exchangeable aluminium…",
			ph: "Search a term, e.g. pH, organic matter, exchangeable Al, salinity",
			empty: "No such term. Try the handbook, or a photo diagnosis.",
			aka: "Also called: ",
			back: "Back to glossary",
			missing: "This term isn’t here",
			groups: {
				基础: "Basics",
				养分: "Nutrients",
				障碍: "Constraints",
				检测: "Testing"
			}
		},
		community: {
			title: "Q&A",
			lead: "Post what you see in the field. Write the crop, the region, and what you saw.",
			ask: "Ask a question",
			empty: "No posts yet. Try a photo diagnosis, or open the handbook.",
			answered: (n) => `${n} answer${n === 1 ? "" : "s"}`,
			waiting: "Waiting",
			needLogin: "Sign in to post",
			needLoginLead: "Questions sit on your account so you can come back for answers. Photo diagnosis does not need an account.",
			goLogin: "Sign in",
			goDiagnose: "Photo diagnosis first (no sign-in)",
			newTitle: "Ask a question",
			titlePh: "Title: what happened in the field",
			bodyPh: "Crop, region, recent fertiliser, and what you see",
			problem: "Problem",
			crop: "Crop",
			region: "Region",
			publish: "Post",
			publishing: "Posting…",
			loading: "Loading…",
			gone: "This post is gone.",
			back: "Back to Q&A",
			answers: "Answers",
			noAnswers: "No answers yet. Say what you did on your own field.",
			replyPh: "Write what you think — be specific",
			reply: "Post answer",
			loginToReply: "Sign in to answer",
			diagnoseFree: " Diagnosis does not need an account.",
			errShort: "Make the title and body more specific.",
			errBlocked: "That text isn’t allowed. Please edit it.",
			errSave: "The post didn’t save. Try again.",
			errReply: "Write a more specific answer."
		},
		me: {
			title: "Me",
			guest: "Not signed in. Diagnoses and saves stay on this device.",
			loginSync: "Sign in to sync",
			history: "Diagnosis history",
			historyNote: "On this device. Sign-in does not upload them yet.",
			noHistory: "No diagnoses yet. Take a photo.",
			favs: "Saved guides",
			noFavs: "Tap save on a handbook page. It stays on this device.",
			myPosts: "My questions",
			noPosts: "No questions yet.",
			goAsk: "Ask"
		},
		login: {
			title: "Sign in to Tuzhi",
			lead: "Sign in to keep diagnoses, questions and saves. Photo diagnosis works without an account.",
			phone: "Mobile number",
			phonePh: "11-digit mainland number",
			password: "Password",
			confirmPw: "Confirm password",
			email: "Email",
			emailIn: "Email sign-in",
			emailUp: "Email sign-up",
			phoneIn: "Mobile sign-in",
			phoneUp: "Mobile sign-up",
			noAccount: "No account? Sign up",
			hasAccount: "Have an account? Sign in",
			agree: "By signing in you agree to the ",
			privacy: "Privacy notice",
			skip: "Skip sign-in, go to photo diagnosis",
			badPhone: "Enter an 11-digit mobile number",
			fail: "Sign-in failed",
			use: (p) => `Continue with ${p}`,
			tabPhone: "Mobile",
			tabEmail: "Email",
			tabOpen: "Google / X",
			googleLead: "Sign in with Google or X in one step.",
			pwShort: "Password must be at least 8 characters",
			emailAddr: "Enter an email address",
			pwMismatch: "The two passwords do not match",
			hasUser: "That account already exists. Sign in instead.",
			badPw: "Wrong account or password",
			googleUnconfigured: "Open sign-in is not available",
			signin: "Sign in"
		},
		about: {
			title: "About Tuzhi",
			p1: "Tuzhi is a soil-literacy tool for farmers and extension workers. The line is “Read the soil. Grow it right.”",
			do: "What it does",
			d1: "Reads field photos against common soil problems, and tries to separate soil trouble from disease or spray injury.",
			d2: "Handbook pages: what it looks like, lookalikes, why, what to do, rate ranges.",
			d3: "A glossary that turns lab-sheet words into plain speech.",
			d4: "A Q&A board for farmers to help each other with what they see in the field.",
			dont: "What it does not do",
			dontP: "It does not replace an extension station or a lab. It does not prescribe pesticide brand names. For an emergency in the field, call local extension now.",
			how: "How the pages are written",
			howP: "Every guide has symptoms, lookalikes, a rate range, an update date and a reviewer. Rates are ranges — follow a soil test and local advice. Better too little than too much.",
			maker: "Maker",
			makerP: "Tuzhi is made by Li Zeyu 李泽宇."
		},
		contact: {
			title: "Contact Tuzhi",
			p1: "For a field emergency, call local extension or a soil lab now. Don’t wait on email.",
			p2a: "Corrections, ideas and partnership notes can go to the public inbox, or to ",
			p2b: "a Q&A post",
			p2c: ". The maker is on the ",
			p2d: "about page",
			p2e: ".",
			email: "Public inbox",
			name: "What to call you (optional)",
			msg: "What you want to say. Emergencies: call extension.",
			send: "Write an email",
			toast: "Opening your mail app. For a field emergency call local extension — don’t wait on a reply."
		},
		privacy: {
			title: "Privacy and disclaimer",
			p2: "Diagnosis photos are used for this read only. The server stores whether a photo was sent and a short text, to improve the handbook. Faces and field locations are not shown publicly.",
			p3: "You can sign in with a mobile number and password, an email and password, Google or X. Diagnosis photos are not shown publicly.",
			p4: "Don’t upload other people’s private photos that have nothing to do with a field problem."
		},
		err: {
			title: "This page hit a snag",
			back: "Home",
			notFound: "No such page",
			notFoundLead: "That address doesn’t exist, or the guide moved.",
			toKnowledge: "Handbook",
			toDiagnose: "Photo diagnosis"
		},
		voice: {
			start: "Voice input",
			stop: "Stop",
			fail: "This device can’t do voice. Please type.",
			unclear: "Didn’t catch that. Get closer, or type.",
			listen: "Listening… it will drop into the box when you finish."
		},
		langSwitch: "中文",
		langSwitchAria: "切换到中文"
	}
};
var useLang = create()(persist((set, get) => ({
	lang: "zh",
	setLang: (lang) => set({ lang }),
	toggle: () => set({ lang: get().lang === "zh" ? "en" : "zh" })
}), { name: "tuzhi-lang" }));
function readLangFromStorage() {
	if (typeof window === "undefined") return "zh";
	try {
		const raw = localStorage.getItem("tuzhi-lang");
		if (!raw) return "zh";
		const parsed = JSON.parse(raw);
		return (parsed.state?.lang ?? parsed.lang) === "en" ? "en" : "zh";
	} catch {
		return "zh";
	}
}
function useI18n() {
	const lang = useLang((s) => s.lang);
	const toggle = useLang((s) => s.toggle);
	const setLang = useLang((s) => s.setLang);
	return {
		lang,
		t: ui[lang],
		toggle,
		setLang
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/encyclopedia-CmbaL_hS.js
var TERMS = [
	{
		id: "ph",
		name: "pH（酸碱度）",
		nameEn: "pH",
		aka: "酸碱度",
		akaEn: "acidity / alkalinity",
		group: "基础",
		plain: "土是酸还是碱。数字 7 是中性，小于 7 偏酸，大于 7 偏碱。",
		plainEn: "How acid or alkaline the soil is. 7 is neutral, below 7 is acid, above 7 is alkaline.",
		detail: "大多数粮食和蔬菜喜欢 6.0～7.5。低于 5.5 容易铝害、缺磷缺钙；高于 8.0 容易缺铁缺锌。茶叶等耐酸作物例外。改酸常用石灰，改碱更复杂，必须测土。",
		detailEn: "Most grain and vegetables like 6.0–7.5. Below 5.5, aluminium and locked P/Ca show up; above 8.0, iron and zinc lock. Tea is an exception. Lime for acid; alkali is a different job — test first."
	},
	{
		id: "om",
		name: "有机质",
		nameEn: "Organic matter",
		group: "基础",
		plain: "土里的“肉”，腐烂的秸秆、粪肥变成的家底。",
		plainEn: "The soil’s “meat”: rotted straw and manure that hold water and feed biology.",
		detail: "能保水保肥、改善团粒、养活微生物。提升靠还田和有机肥，是慢功夫。",
		detailEn: "Holds water and nutrients, builds crumbs, feeds microbes. Straw and manure — slow work."
	},
	{
		id: "cec",
		name: "CEC（阳离子交换量）",
		nameEn: "CEC",
		group: "基础",
		plain: "土能抓住养分的本事，像吸铁石磁力强弱。",
		plainEn: "How strongly the soil can hold nutrients — like magnet strength.",
		detail: "黏土和有机质高的土 CEC 高；沙土低，要少量多次施肥。",
		detailEn: "Clay and high-OM soils hold more. Sand is low: little-and-often fertiliser."
	},
	{
		id: "texture",
		name: "质地",
		nameEn: "Texture",
		group: "基础",
		plain: "沙、壤、黏。摸上去是散沙还是面筋。",
		plainEn: "Sand, loam or clay. Gritty, silky or sticky.",
		detail: "沙土漏肥漏水，黏土难耕易裂。质地改不掉，只能用有机质和耕作来改善。",
		detailEn: "Sand leaks; clay is hard to till and cracks. You cannot change texture; you manage structure with organic matter."
	},
	{
		id: "aggregate",
		name: "团粒结构",
		nameEn: "Aggregation",
		group: "基础",
		plain: "好土能搓成团又易散，里面有孔隙。",
		plainEn: "Good soil forms a crumb that holds and breaks, with pores inside.",
		detail: "团粒靠有机质和根系、微生物。板结就是团粒散了又黏死。",
		detailEn: "Crumbs come from organic matter, roots and microbes. Compaction is crumbs smashed then smeared."
	},
	{
		id: "n",
		name: "氮（N）",
		nameEn: "Nitrogen (N)",
		aka: "碱解氮",
		akaEn: "available N",
		group: "养分",
		plain: "长叶子的养分。缺了老叶先黄；多了旺长贪青。",
		plainEn: "Builds leaves. Too little: old leaves yellow first. Too much: lush, lodging.",
		detail: "碱解氮大致表示当季能用的氮。氮跑得快，要分次施。",
		detailEn: "Alkaline-hydrolysable N is a rough in-season pool. N runs. Split it."
	},
	{
		id: "alkn",
		name: "碱解氮",
		nameEn: "Available N",
		group: "养分",
		plain: "化验单上“现在能用的氮”大概有多少。",
		plainEn: "A rough “N the crop can use this season” on the sheet.",
		detail: "不是土里全部的氮。过低容易脱肥黄叶，过高容易旺长倒伏。按作物和当地标准读，不要跨省死套。",
		detailEn: "Not total N. Too low, yellowing; too high, lodging. Use local ranges."
	},
	{
		id: "p",
		name: "磷（P）",
		nameEn: "Phosphorus (P)",
		aka: "有效磷",
		akaEn: "available P",
		group: "养分",
		plain: "管生根和开花。缺了苗发紫发僵。",
		plainEn: "Roots and flowering. Deficiency: purple, stunted seedlings.",
		detail: "有效磷是庄稼能用的磷。酸土或钙质土容易把磷钉死。集中施在根附近更有效。",
		detailEn: "Available P is what the root can eat. Acid or calcareous soils pin it. Band it by the root."
	},
	{
		id: "avp",
		name: "有效磷",
		nameEn: "Available P",
		group: "养分",
		plain: "报告上写的、根能吃到的那部分磷。",
		plainEn: "The P column the root can actually use.",
		detail: "全磷高但有效磷低，常见于过酸或石灰性土。先改 pH 和集中施肥，不要只猛撒磷肥。",
		detailEn: "High total P with low available P is common on acid or lime soils. Fix pH and band — don’t only dump more powder."
	},
	{
		id: "k",
		name: "钾（K）",
		nameEn: "Potassium (K)",
		aka: "速效钾",
		akaEn: "available K",
		group: "养分",
		plain: "管水分、抗倒和品质。缺了叶边焦。",
		plainEn: "Water use, lodging, quality. Deficiency: scorched margins.",
		detail: "高产田带走钾很多。秸秆还田能还钾。忌氯作物宜用硫酸钾。",
		detailEn: "High-yield fields export a lot. Straw returns K. Cl-sensitive crops prefer sulfate of potash."
	},
	{
		id: "avk",
		name: "速效钾",
		nameEn: "Available K",
		group: "养分",
		plain: "当季能用的钾。",
		plainEn: "K the crop can use this season.",
		detail: "沙土、高产田、拿走秸秆的地容易低。叶缘焦不一定只是缺钾，盐害也会焦边。",
		detailEn: "Sand, high yield, straw removed — often low. Margin scorch is also salt."
	},
	{
		id: "ca",
		name: "交换性钙",
		nameEn: "Exchangeable Ca",
		group: "养分",
		plain: "砌墙的砖，几乎不在植株里搬家。",
		plainEn: "The brick in cell walls. It barely moves inside the plant.",
		detail: "缺钙常见顶芽和脐腐。土里有钙也会因为干旱、盐、铵态氮而吃不到。",
		detailEn: "Tip burn and blossom-end rot. Soil can have Ca while drought, salt or ammonium starve the tip."
	},
	{
		id: "al",
		name: "交换性铝",
		nameEn: "Exchangeable Al",
		aka: "铝毒 活性铝",
		akaEn: "aluminium toxicity",
		group: "养分",
		plain: "土太酸时溶出来咬根的铝。报告上这项高，根尖就发褐发僵。",
		plainEn: "Aluminium that dissolves when the soil is too acid and bites root tips.",
		detail: "pH 低于大约 5.5，铝离子变活跃，伤根尖、锁磷。改酸（石灰、有机质）是治本，不是再追氮。茶叶耐酸，也不是越酸越好。",
		detailEn: "Below about pH 5.5, Al is active: brown tips, locked P. Lime and organic matter are the job, not more N. Tea likes acid — not ever-more-acid."
	},
	{
		id: "zn",
		name: "有效锌",
		nameEn: "Available Zn",
		group: "养分",
		plain: "用量小，缺了玉米花白苗、果树小叶。",
		plainEn: "A little nutrient. Deficiency: maize white-bud, little-leaf on fruit trees.",
		detail: "高 pH、高磷会抑制锌。叶面救急，土施按测土，不要年年猛倒。",
		detailEn: "High pH and high P lock zinc. Foliar as a rescue; soil Zn by the test, not every year by habit."
	},
	{
		id: "b",
		name: "有效硼",
		nameEn: "Available B",
		group: "养分",
		plain: "管开花受精。缺了花而不实、空心。",
		plainEn: "Flowering and set. Deficiency: flowers without fruit, hollow stems.",
		detail: "缺和毒只隔一层窗户纸。按测土下限，分两次，先小面积。",
		detailEn: "Deficiency and toxicity are close. Follow the test, split, trial a patch."
	},
	{
		id: "ec",
		name: "EC（电导率）",
		nameEn: "EC",
		aka: "盐分",
		akaEn: "salinity",
		group: "检测",
		plain: "量土里有多咸。数字高，根喝水费劲。",
		plainEn: "How salty the soil water is. High numbers make it hard for roots to drink.",
		detail: "大棚和盐碱地必看。苗期更敏感。降低靠洗盐、控肥、滴灌薄肥。",
		detailEn: "Must-read in greenhouses and salt country. Seedlings are more sensitive. Lower it by leaching, less fertiliser, dilute drip."
	},
	{
		id: "salt",
		name: "全盐",
		nameEn: "Total soluble salt",
		group: "检测",
		plain: "土里可溶盐一共有多少。",
		plainEn: "How much soluble salt is in the soil.",
		detail: "和 EC 一起看盐害。盐害和碱害不是一回事。",
		detailEn: "Read with EC. Salt injury and alkali injury are not the same job."
	},
	{
		id: "bulk",
		name: "容重",
		nameEn: "Bulk density",
		group: "检测",
		plain: "同样体积的土有多重，用来判断土紧不紧。",
		plainEn: "How heavy a given volume of soil is — a compaction clue.",
		detail: "耕层过大说明板结。深松和有机质可以改善。",
		detailEn: "High in the tilled layer means compaction. Subsoiling and organic matter help."
	},
	{
		id: "test",
		name: "测土配方",
		nameEn: "Test-based fertiliser",
		group: "检测",
		plain: "先化验土，再决定施什么肥、施多少。",
		plainEn: "Test first, then decide what and how much to spread.",
		detail: "取样要多点混合耕作层。看报告时重点看 pH、有机质、盐分和氮磷钾。",
		detailEn: "Mix many cores of the tilled layer. On the sheet, read pH, OM, salt, then NPK."
	},
	{
		id: "saline",
		name: "盐碱",
		nameEn: "Saline-alkali",
		group: "障碍",
		plain: "盐是咸，碱是涩。都能让苗出不来、叶焦边。",
		plainEn: "Salt is salty; alkali is soapy. Both stop emergence and scorch margins.",
		detail: "盐害看全盐或 EC，碱害看 pH 和钠。治理原则是排水洗盐、减少蒸发、增加有机质。",
		detailEn: "Salt: EC. Alkali: pH and sodium. Drain, leach, cut evaporation, add organic matter."
	},
	{
		id: "acid",
		name: "酸化",
		nameEn: "Acidification",
		group: "障碍",
		plain: "土越种越酸，根被铝伤害。",
		plainEn: "The soil gets more acid over years; aluminium hurts roots.",
		detail: "用石灰改酸必须定量。茶叶等耐酸作物目标不是中性。",
		detailEn: "Lime is a dose. Tea’s target is not neutrality."
	},
	{
		id: "compaction",
		name: "板结 / 犁底层",
		nameEn: "Compaction / plough pan",
		group: "障碍",
		plain: "旋耕层下面压出的硬盖，根过不去。",
		plainEn: "A hard lid under the rotary-till layer. Roots turn sideways.",
		detail: "隔年深松比年年深翻更稳妥。同时要靠有机质把团粒养回来。",
		detailEn: "Subsoil every other year rather than every trip. Organic matter has to rebuild crumbs."
	},
	{
		id: "mg",
		name: "交换性镁",
		nameEn: "Exchangeable Mg",
		aka: "有效镁",
		akaEn: "available Mg",
		group: "养分",
		plain: "叶绿素里的镁。缺了老叶脉间黄，叶脉还绿。",
		plainEn: "Magnesium in chlorophyll. Deficiency: old leaves yellow between still-green veins.",
		detail: "钾太高会把镁挤掉。先看叶位：老叶黄是镁，新叶黄才像铁。按测土补，不要当缺铁喷。",
		detailEn: "High K crowds Mg out. Old-leaf striping is Mg; new-leaf yellow is more like iron. Test, don’t spray it as iron."
	},
	{
		id: "fe",
		name: "有效铁",
		nameEn: "Available Fe",
		aka: "缺铁黄化",
		akaEn: "iron chlorosis",
		group: "养分",
		plain: "新叶黄、叶脉还绿。土里有铁，高 pH 时根吃不到。",
		plainEn: "New leaves yellow, veins still green. The soil has iron; high pH locks it.",
		detail: "石灰性土、葡萄、柑橘常见。叶面螯合铁救急。不要一黄就冲尿素。",
		detailEn: "Common on calcareous soils, grapes and citrus. Chelated foliar iron is a rescue. Don’t chase it with urea."
	},
	{
		id: "mn",
		name: "有效锰",
		nameEn: "Available Mn",
		group: "养分",
		plain: "新叶脉间黄，常带褐斑。小麦上更显。",
		plainEn: "New leaves yellow between veins, often with brown specks. Wheat shows it clearly.",
		detail: "过酸过碱都会乱。先看 pH，不要和铁锌混成一瓶猛喷。",
		detailEn: "Too acid or too alkaline both scramble it. Read pH; don’t tank-mix a micronutrient blast."
	},
	{
		id: "s",
		name: "有效硫",
		nameEn: "Available S",
		group: "养分",
		plain: "整株偏黄，新叶也黄。和缺氮只黄老叶相反。",
		plainEn: "The whole plant pales, including new leaves — unlike nitrogen, which yellows old leaves first.",
		detail: "沙土、长期只施尿素更容易缺。尿素本身不含硫。",
		detailEn: "Sand and years of urea-only show it. Urea itself has no sulphur."
	},
	{
		id: "cu",
		name: "有效铜",
		nameEn: "Available Cu",
		group: "养分",
		plain: "叶尖发白卷曲，穗不实。新叶先出事。",
		plainEn: "Leaf tips bleach and curl; ears set poorly. New leaves go first.",
		detail: "缺和毒窗口都不宽。没有化验不要土里猛倒。",
		detailEn: "Deficiency and toxicity are both close. Don’t dump copper without a test."
	},
	{
		id: "mo",
		name: "有效钼",
		nameEn: "Available Mo",
		group: "养分",
		plain: "豆科叶畸形发黄，固氮差。过酸土容易被锁。",
		plainEn: "Legume leaves distort and yellow; nodulation fails. Acid soil locks it.",
		detail: "先改 pH。钼是微量，加倍会出事。不要豆叶黄了就猛氮。",
		detailEn: "Fix pH first. Molybdenum is a trace — doubling hurts. Don’t pour N on yellow beans first."
	},
	{
		id: "porosity",
		name: "孔隙度",
		nameEn: "Porosity",
		group: "基础",
		plain: "土里空气和水走的路。孔隙少，根闷、雨后积水。",
		plainEn: "The roads air and water take. Few pores: roots smother, water ponds.",
		detail: "团粒多则孔隙多。压实和湿耕把路封上。改它靠结构，不靠当季氮。",
		detailEn: "Crumbs make pores. Compaction and wet tillage close the road. Structure, not in-season N."
	},
	{
		id: "fc",
		name: "田间持水量",
		nameEn: "Field capacity",
		group: "基础",
		plain: "排干重力水之后土还能握住的水。过了这条线就是涝。",
		plainEn: "Water the soil still holds after gravity drains. Past that line is waterlog.",
		detail: "沙土握得少，黏土握得多但未必能给根。浇水浇过线，根就闷。",
		detailEn: "Sand holds little; clay holds much but may not give it. Irrigating past the mark smothers roots."
	},
	{
		id: "gley",
		name: "潜育化",
		nameEn: "Gleying",
		aka: "冷浸田 青灰土",
		akaEn: "gleyed / cold-soaked paddy",
		group: "障碍",
		plain: "长期渍水，土发青灰、有锈斑，摸着冷。",
		plainEn: "Long waterlogging: blue-grey soil, rust mottles, cold to the touch.",
		detail: "一场雨是涝害；潜育化是房间长期是湿的。先排水，再谈肥。",
		detailEn: "One rain is a flood; gleying is a room that stays wet. Drain first, then talk fertiliser."
	},
	{
		id: "replant",
		name: "连作障碍",
		nameEn: "Replant trouble",
		aka: "重茬",
		akaEn: "continuous cropping",
		group: "障碍",
		plain: "同一茬越种越差，点片死棵，邻地轮作的却好。",
		plainEn: "The same crop gets worse; patch death while a rotated neighbour is fine.",
		detail: "病菌、线虫、盐和偏肥熬在一口锅里。先看根，菌剂代替不了换科轮作。",
		detailEn: "Pathogens, nematodes, salt and lopsided fertiliser in one pot. Read the root. A microbe bag is not a rotation."
	}
];
function termView(t, lang) {
	if (lang !== "en") return {
		name: t.name,
		aka: t.aka,
		plain: t.plain,
		detail: t.detail,
		group: t.group
	};
	return {
		name: t.nameEn,
		aka: t.akaEn,
		plain: t.plainEn,
		detail: t.detailEn,
		group: t.group
	};
}
/** 文章「相关检测指标」跳到百科对应词条。 */
function encyclopediaAnchor(name) {
	const n = name.toLowerCase().replace(/\s+/g, "");
	for (const [re, id] of [
		[/交换性铝|铝毒|活性铝|铝离子|aluminium|aluminum/, "al"],
		[/交换性镁|有效镁|magnesium/, "mg"],
		[/有效铁|缺铁|available fe|iron chlor/, "fe"],
		[/有效锰|缺锰|manganese/, "mn"],
		[/有效硫|缺硫|sulfur|sulphur/, "s"],
		[/有效铜|缺铜|\bcopper\b/, "cu"],
		[/有效钼|缺钼|molybdenum/, "mo"],
		[/孔隙/, "porosity"],
		[/田间持水|持水量|field capacity/, "fc"],
		[/潜育|gley/, "gley"],
		[/连作障碍|再植|replant|continuous cropping/, "replant"],
		[/ph|酸碱/, "ph"],
		[/有机质|organic/, "om"],
		[/cec|阳离子交换/, "cec"],
		[/质地|texture/, "texture"],
		[/团粒|aggregat/, "aggregate"],
		[/碱解氮|available n/, "alkn"],
		[/有效磷|available p/, "avp"],
		[/速效钾|available k/, "avk"],
		[/(^|\/|\s)氮|氮（|硝态氮|^n$/, "n"],
		[/(^|\/|\s)磷|磷（|^p$/, "p"],
		[/(^|\/|\s)钾|钾（|^k$/, "k"],
		[/交换性钙|^钙|钙（|calcium/, "ca"],
		[/锌|zinc/, "zn"],
		[/硼|boron/, "b"],
		[/\bec\b|电导/, "ec"],
		[/全盐|盐分|soluble salt/, "salt"],
		[/容重|bulk/, "bulk"],
		[/测土配方|化验单|soil test/, "test"],
		[/盐碱|saline/, "saline"],
		[/酸化|acid/, "acid"],
		[/板结|犁底|compact|plough pan/, "compaction"]
	]) if (re.test(n) || re.test(name)) return id;
	return "ph";
}
function indicatorView(name, lang) {
	if (lang !== "en") return name;
	return TERMS.find((x) => x.id === encyclopediaAnchor(name))?.nameEn ?? name;
}
function getTerm(id) {
	return TERMS.find((x) => x.id === id);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-OKOTHu9b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-semibold",
				children: t.err.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-base break-words text-muted",
				children: error.message || t.err.back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-forest underline",
				children: t.err.back
			})
		]
	});
}
function NotFoundComponent() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: t.err.notFound
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: t.err.notFoundLead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-forest underline",
						children: t.err.back
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/knowledge",
						className: "text-forest underline",
						children: t.err.toKnowledge
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/diagnose",
						className: "text-forest underline",
						children: t.err.toDiagnose
					})
				]
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** 登录后展示名：农户后四位，不要把演示邮箱摊开。 */
function farmerLabel(displayName, email, lang) {
	const en = (lang ?? readLangFromStorage()) === "en";
	const m = (email ?? "").match(/^(\d{7,11})@phone\.tuzhi\.local$/i);
	if (m) return en ? `Farmer ${m[1].slice(-4)}` : `农户${m[1].slice(-4)}`;
	const n = (displayName ?? "").trim();
	if (n && n !== "Account" && !n.includes("@") && !n.toLowerCase().includes("phone.tuzhi")) {
		if (en && /^农户(\d{4})$/.test(n)) return `Farmer ${n.slice(-4)}`;
		if (en && /李泽宇|Li Zeyu/i.test(n)) return "Li Zeyu 李泽宇";
		return n;
	}
	return en ? "Farmer" : "农户";
}
function formatPostDate(iso, lang) {
	const m = iso.slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!m) return "";
	const year = m[1];
	const month = Number(m[2]);
	const date = Number(m[3]);
	if (lang === "en") return `${[
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	][month - 1] ?? ""} ${date}, ${year}`;
	return `${year}年${month}月${date}日`;
}
function isLiZeyu(name, userId) {
	if (userId === "li-zeyu") return true;
	return /李泽宇|Li Zeyu/i.test(name);
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (!user) return null;
	const label = farmerLabel(user.displayName, user.primaryEmail);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-forest/15 text-sm font-medium text-forest",
				children: label.charAt(0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "正在退出…" : "退出"
			})
		]
	});
}
function AuthChip() {
	const { isPending } = useCurrentUserState();
	const { t } = useI18n();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-10 shrink-0 animate-pulse rounded-lg bg-surface-2" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "inline-flex min-h-10 items-center rounded-lg bg-forest px-4 text-sm font-medium text-forest-fg",
		children: t.nav.login
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) })] });
}
function LanguageToggle({ className = "" }) {
	const { lang, t, toggle } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		className: `inline-flex min-h-10 min-w-12 items-center justify-center rounded-lg border border-line px-3 text-sm font-medium text-ink hover:bg-surface-2 ${className}`,
		"aria-label": t.langSwitchAria,
		children: lang === "zh" ? "EN" : "中文"
	});
}
/** Keep <html lang> in sync after a toggle. */
function LangSync() {
	const { lang } = useI18n();
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
	}, [lang]);
	return null;
}
function SiteFooter() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-10 border-t border-line pb-28 pt-6 text-base text-muted md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-lg text-ink",
				children: [
					t.name,
					" · ",
					t.tagline
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: t.footer.maker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-3 flex flex-wrap gap-x-4 gap-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "text-forest underline",
						children: t.footer.about
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/knowledge",
						className: "text-forest underline",
						children: t.footer.knowledge
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/encyclopedia",
						className: "text-forest underline",
						children: t.footer.wiki
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/community",
						className: "text-forest underline",
						children: t.footer.community
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "text-forest underline",
						children: t.footer.privacy
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "text-forest underline",
						children: t.footer.contact
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-relaxed",
				children: t.disclaimer
			})
		]
	});
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { t } = useI18n();
	const nav = [
		{
			to: "/",
			label: t.nav.home,
			icon: House
		},
		{
			to: "/diagnose",
			label: t.nav.diagnose,
			icon: ScanLine
		},
		{
			to: "/knowledge",
			label: t.nav.knowledge,
			icon: BookOpen
		},
		{
			to: "/community",
			label: t.nav.community,
			icon: MessagesSquare
		},
		{
			to: "/me",
			label: t.nav.me,
			icon: UserRound
		}
	];
	if (pathname === "/login") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logo.svg",
								alt: "",
								width: 44,
								height: 44,
								className: "size-11 rounded-xl"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl font-semibold",
									children: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm text-muted",
									children: t.tagline
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-1 md:flex",
							children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("rounded-lg px-3 py-2 text-sm font-medium", pathname === item.to || item.to !== "/" && pathname.startsWith(item.to) ? "bg-forest text-forest-fg" : "text-muted hover:bg-surface-2 hover:text-ink"),
								children: item.label
							}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/encyclopedia",
								className: cn("rounded-lg px-3 py-2 text-sm font-medium", pathname.startsWith("/encyclopedia") ? "bg-forest text-forest-fg" : "text-muted hover:bg-surface-2"),
								children: t.nav.wiki
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthChip, {})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-5xl px-4 pb-28 pt-4 md:pb-10",
				children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
				"aria-label": t.nav.home,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto grid max-w-lg grid-cols-5",
					children: nav.map((item) => {
						const active = pathname === item.to || item.to !== "/" && pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium", active ? "text-forest" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-6",
								strokeWidth: active ? 2.4 : 1.8
							}), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var styles_default = "/assets/styles-oStdhiLJ.css";
var queryClient = new QueryClient({ defaultOptions: { queries: {
	staleTime: 2e4,
	retry: 1
} } });
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$16 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${APP_NAME} · ${APP_TAGLINE}` },
			{
				name: "description",
				content: "面向中国农民的土壤科普：拍照诊断、知识库与问答。"
			},
			{
				name: "robots",
				content: "index,follow"
			},
			{
				name: "theme-color",
				content: "#1F6B4A"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-CN",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
				client: queryClient,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSync, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						position: "top-center",
						richColors: true
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$13 = () => import("./routes-DpAOWrah.mjs");
var Route$15 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "土知 · 看懂土地，种好地" }, {
		name: "description",
		content: "面向中国农民的土壤科普：拍照诊断、知识库与问答。"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./about-BzDXAEMv.mjs");
var Route$14 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: `关于｜${APP_NAME}` }, {
		name: "description",
		content: "土知是给农民和农技人员用的土壤科普工具。"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./contact-DjqM9tnD.mjs");
var Route$13 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: `联系｜${APP_NAME}` }, {
		name: "description",
		content: "反馈问题、纠错。紧急事故请找当地农技站。"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./diagnose-DRu68AA6.mjs");
var Route$12 = createFileRoute("/diagnose")({
	head: () => ({ meta: [{ title: "拍照诊断｜土知" }, {
		name: "description",
		content: "先拍照，再说现象。对照知识库，并排除病害、药害。"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./login-wb7-O9TG.mjs");
var Route$11 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: `登录｜${APP_NAME}` }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./me-sfqEjlMp.mjs");
var Route$10 = createFileRoute("/me")({
	head: () => ({ meta: [{ title: "我的｜土知 · Me | Tuzhi" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./privacy-NQWq0jHw.mjs");
var Route$9 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: `隐私与免责｜${APP_NAME}` }, {
		name: "description",
		content: "隐私与免责"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var Route$8 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
	const origin = new URL(request.url).origin;
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
		"/",
		"/diagnose",
		"/knowledge",
		"/encyclopedia",
		"/community",
		"/about",
		"/contact",
		"/privacy",
		...ARTICLES.map((a) => `/knowledge/${a.slug}`),
		...TERMS.map((term) => `/encyclopedia/${term.id}`)
	].map((p) => `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
	return new Response(body, { headers: {
		"content-type": "application/xml; charset=utf-8",
		"cache-control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$6 = () => import("./community-3ReaOrNS.mjs");
var Route$7 = createFileRoute("/community/")({
	validateSearch: (s) => ({ problem: typeof s.problem === "string" ? s.problem : void 0 }),
	head: () => ({ meta: [{ title: "问答社区｜土知 · Q&A | Tuzhi" }, {
		name: "description",
		content: "把地里的问题发出来，互相帮。"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_id-Cn-uZUSX.mjs");
var Route$6 = createFileRoute("/community/$id")({
	head: () => ({ meta: [{ title: "问答详情｜土知 · Q&A | Tuzhi" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./new-CTjEE2RD.mjs");
var Route$5 = createFileRoute("/community/new")({
	head: () => ({ meta: [{ title: "我要提问｜土知 · Ask | Tuzhi" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./encyclopedia-DkoBLfdu.mjs");
var Route$4 = createFileRoute("/encyclopedia/")({
	head: () => ({ meta: [{ title: "土壤百科｜土知 · Glossary | Tuzhi" }, {
		name: "description",
		content: "把报告上的词翻译成人话。pH、EC、有机质、交换性铝…"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_id-BQox3CS_.mjs");
var Route$3 = createFileRoute("/encyclopedia/$id")({
	head: ({ params }) => {
		const term = getTerm(params.id);
		return { meta: [{ title: term ? `${term.name}｜土知 · Glossary | Tuzhi` : `百科｜${APP_NAME}` }, {
			name: "description",
			content: term?.plain ?? ""
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./knowledge-xV8G9szi.mjs");
var Route$2 = createFileRoute("/knowledge/")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : void 0,
		crop: typeof s.crop === "string" ? s.crop : void 0,
		problem: typeof s.problem === "string" ? s.problem : void 0,
		region: typeof s.region === "string" ? s.region : void 0,
		season: typeof s.season === "string" ? s.season : void 0
	}),
	head: () => ({ meta: [{ title: "知识库｜土知 · Handbook | Tuzhi" }, {
		name: "description",
		content: "按作物、问题和地区查找土壤明白纸。"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-DtjUT04i.mjs");
var Route$1 = createFileRoute("/knowledge/$slug")({
	head: ({ params }) => {
		const article = getArticle(params.slug);
		return { meta: [{ title: article ? `${article.title}｜${APP_NAME}` : `知识｜${APP_NAME}` }, {
			name: "description",
			content: article?.phenomenon.appearance.slice(0, 80) ?? ""
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var AboutRoute = Route$14.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$16
});
var ContactRoute = Route$13.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$16
});
var DiagnoseRoute = Route$12.update({
	id: "/diagnose",
	path: "/diagnose",
	getParentRoute: () => Route$16
});
var LoginRoute = Route$11.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$16
});
var MeRoute = Route$10.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => Route$16
});
var PrivacyRoute = Route$9.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$16
});
var SitemapDotxmlRoute = Route$8.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$16
});
var CommunityIndexRoute = Route$7.update({
	id: "/community/",
	path: "/community/",
	getParentRoute: () => Route$16
});
var CommunityIdRoute = Route$6.update({
	id: "/community/$id",
	path: "/community/$id",
	getParentRoute: () => Route$16
});
var CommunityNewRoute = Route$5.update({
	id: "/community/new",
	path: "/community/new",
	getParentRoute: () => Route$16
});
Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => EncyclopediaRoute
});
Route$3.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => EncyclopediaRoute
});
var KnowledgeIndexRoute = Route$2.update({
	id: "/knowledge/",
	path: "/knowledge/",
	getParentRoute: () => Route$16
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	DiagnoseRoute,
	LoginRoute,
	MeRoute,
	PrivacyRoute,
	SitemapDotxmlRoute,
	CommunityIdRoute,
	CommunityNewRoute,
	KnowledgeSlugRoute: Route$1.update({
		id: "/knowledge/$slug",
		path: "/knowledge/$slug",
		getParentRoute: () => Route$16
	}),
	CommunityIndexRoute,
	KnowledgeIndexRoute,
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$16
	})
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFoundComponent
	});
}
//#endregion
export { termView as _, Route$6 as a, useCurrentUserState as c, isLiZeyu as d, cn as f, indicatorView as g, encyclopediaAnchor as h, Route$3 as i, farmerLabel as l, TERMS as m, Route$1 as n, Route$7 as o, createSsrRpc as p, Route$2 as r, LanguageToggle as s, router_exports as t, formatPostDate as u, useI18n as v };
