#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";
const out = [];
const fail = [];
function ok(name, detail = "") {
  out.push(`PASS  ${name}${detail ? " — " + detail : ""}`);
}
function bad(name, detail) {
  fail.push(name);
  out.push(`FAIL  ${name} — ${detail}`);
}

mkdirSync("/tmp/qa-shots", { recursive: true });

const consoleErrs = [];
const pageErrs = [];

const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: "zh-CN" });
const page = await context.newPage();
page.on("console", (msg) => {
  if (msg.type() === "error") {
    const t = msg.text();
    if (/Download the React DevTools|favicon|hydrat/i.test(t)) return;
    consoleErrs.push(t.slice(0, 240));
  }
});
page.on("pageerror", (err) => pageErrs.push(String(err).slice(0, 240)));

async function goto(path, wait = "networkidle") {
  const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(400);
  return res;
}

async function shot(name) {
  await page.screenshot({ path: `/tmp/qa-shots/${name}.png`, fullPage: false });
}

try {
  // --- Home ---
  let res = await goto("/");
  if (res && res.ok()) ok("home 200");
  else bad("home 200", String(res?.status()));
  const homeText = await page.locator("main").innerText();
  if (homeText.includes("看懂土地") || homeText.includes("拍照诊断")) ok("home zh copy");
  else bad("home zh copy", homeText.slice(0, 80));
  await page.waitForTimeout(1500);
  const homePosts = await page.locator('a[href^="/community/"]').count();
  if (homePosts >= 3) ok("home community posts", String(homePosts));
  else bad("home community posts", `only ${homePosts}`);
  await shot("home");

  // --- Knowledge list ---
  res = await goto("/knowledge");
  if (res && res.ok()) ok("knowledge 200");
  else bad("knowledge 200", String(res?.status()));
  const kText = await page.locator("main").innerText();
  if (kText.includes("共 100 篇")) ok("knowledge 100");
  else bad("knowledge 100", kText.match(/共 \d+ 篇/)?.[0] ?? "no count");
  const covers = await page.locator("main img").evaluateAll((imgs) =>
    imgs.map((i) => i.getAttribute("src")).filter(Boolean),
  );
  const articleCovers = covers.filter((s) => s.includes("/images/articles/"));
  const uniqueCovers = new Set(articleCovers);
  if (uniqueCovers.size >= 90) ok("knowledge cover uniqueness", `${uniqueCovers.size} unique of ${articleCovers.length}`);
  else bad("knowledge cover uniqueness", `${uniqueCovers.size} unique of ${articleCovers.length}`);
  const yjzShared = articleCovers.filter((s) => /\/you-ji-zhi\.jpg$/.test(s));
  if (yjzShared.length <= 1) ok("no shared you-ji-zhi fallback", String(yjzShared.length));
  else bad("shared you-ji-zhi", String(yjzShared.length));
  await shot("knowledge");

  // --- Knowledge detail ---
  res = await goto("/knowledge/suan-hua");
  const suan = await page.locator("main").innerText();
  const needed = ["这是什么问题", "把地里的事说细", "容易混淆", "田间照片", "背后的原因", "怎么处理", "用量区间", "先别做", "何时测土", "预防", "相关检测指标", "讲解视频", "相关文章"];
  const missing = needed.filter((n) => !suan.includes(n));
  if (missing.length === 0) ok("knowledge detail sections");
  else bad("knowledge detail sections", missing.join(","));
  const lf = suan.split("把地里的事说细")[1]?.split("容易混淆")[0] ?? "";
  const han = (lf.match(/[\u4e00-\u9fff]/g) || []).length;
  if (han >= 80 && han <= 400 && !/公斤|每亩/.test(lf)) ok("suan-hua longform field-only", `${han} han`);
  else bad("suan-hua longform", `${han} han ${lf.slice(0, 60)}`);
  const iframe = await page.locator("iframe").count();
  if (iframe >= 1) ok("knowledge bili iframe");
  else bad("knowledge bili iframe", "none");
  await shot("suan-hua");

  // --- Encyclopedia list ---
  res = await goto("/encyclopedia");
  const wiki = await page.locator("main").innerText();
  const terms = ["交换性镁", "有效铁", "有效锰", "有效硫", "有效铜", "有效钼", "孔隙度", "田间持水量", "潜育化", "连作障碍", "pH（酸碱度）", "有机质"];
  const missT = terms.filter((n) => !wiki.includes(n));
  const wikiLinks = await page.locator('a[href^="/encyclopedia/"]').count();
  if (missT.length === 0 && wikiLinks >= 32) ok("encyclopedia list 32", `${wikiLinks} links`);
  else bad("encyclopedia list", `missing ${missT.join(",")} links=${wikiLinks}`);
  if (wiki.includes("把地里的事说细") && wiki.length > 8000) bad("encyclopedia list still dumps long body", `len=${wiki.length}`);
  else ok("encyclopedia list is cards not longform");
  await shot("encyclopedia");

  // --- Encyclopedia details ---
  for (const id of ["mg", "fc", "replant", "ph"]) {
    await goto(`/encyclopedia/${id}`);
    const t = await page.locator("main").innerText();
    const miss = ["这是什么问题", "把地里的事说细", "用量区间", "先别做", "讲解视频"].filter((n) => !t.includes(n));
    const ifr = await page.locator("iframe").count();
    if (miss.length === 0 && ifr >= 1) ok(`encyclopedia/${id} GuidePage`, `iframe=${ifr}`);
    else bad(`encyclopedia/${id}`, `miss=${miss.join(",")} iframe=${ifr}`);
  }
  await shot("wiki-mg");

  // --- Community ---
  await goto("/community");
  await page.waitForSelector("text=农户", { timeout: 15000 }).catch(() => {});
  const comm = await page.locator("main").innerText();
  const farmers = [...comm.matchAll(/农户\d{4}/g)].map((m) => m[0]);
  const uniqF = new Set(farmers);
  if (uniqF.size >= 23) ok("community 23 farmers", `${uniqF.size}`);
  else bad("community 23 farmers", `${uniqF.size} ${[...uniqF].join(",")}`);
  if (/2026年[3-8]月/.test(comm) || /2026年/.test(comm)) ok("community 2026 dates");
  else bad("community dates", comm.match(/\d{4}年[^。]{0,12}/)?.[0] ?? "no date");
  if (comm.includes("还没有新帖")) bad("community empty state", "still empty");
  else ok("community not empty");
  await shot("community");

  const firstPost = page.locator('a[href^="/community/"]').filter({ hasText: "农户" }).first();
  if (await firstPost.count()) {
    await firstPost.click();
    await page.waitForTimeout(800);
    await page.waitForSelector("text=李泽宇", { timeout: 10000 }).catch(() => {});
    const det = await page.locator("main").innerText();
    const olivine = await page.locator('img[src="/images/olivine.jpg"]').count();
    if (det.includes("李泽宇") && olivine >= 1) ok("community detail Li Zeyu + olivine");
    else bad("community detail answer", `li=${det.includes("李泽宇")} olivine=${olivine}`);
    if (/农户\d{4}/.test(det) && /2026年/.test(det)) ok("community detail farmer+date");
    else bad("community detail farmer+date", det.slice(0, 120));
    await shot("community-detail");
  } else {
    bad("community click", "no post link");
  }

  // --- Contact ---
  await goto("/contact");
  const mail = page.locator('a[href="mailto:g17612121666@gmail.com"]');
  if ((await mail.count()) >= 1) ok("contact mailto");
  else bad("contact mailto", await page.locator("main").innerText().then((t) => t.slice(0, 120)));
  const ct = await page.locator("main").innerText();
  if (ct.includes("暂未开放") || ct.includes("后续若开通")) bad("contact leftover closed-inbox copy", ct.slice(0, 80));
  else ok("contact no closed-inbox copy");
  if (ct.includes("农技站")) ok("contact emergency extension");
  else bad("contact emergency", "no 农技站");
  await shot("contact");

  // --- About ---
  await goto("/about");
  const about = await page.locator("main").innerText();
  if (about.includes("李泽宇") && about.includes("Li Zeyu")) ok("about maker");
  else bad("about maker", about.slice(0, 80));

  // --- EN switch ---
  await goto("/knowledge/suan-hua");
  await page.getByRole("button", { name: /Switch to English|English/i }).click();
  await page.waitForTimeout(500);
  const enDetail = await page.locator("main").innerText();
  if (enDetail.includes("What you actually see in the field")) ok("EN sDetail");
  else bad("EN sDetail", enDetail.slice(0, 160));
  const nav = await page.getByRole("banner").innerText();
  if (nav.includes("Handbook") && nav.includes("Glossary") && nav.includes("Q&A")) ok("EN nav Handbook/Glossary/Q&A");
  else bad("EN nav", nav.replace(/\s+/g, " ").slice(0, 160));
  if (/知识库|土壤百科|把地里/.test(nav) && nav.includes("Handbook")) bad("EN nav mixed zh", nav);
  else ok("EN nav not mixed");
  await shot("en-suan-hua");

  await goto("/encyclopedia");
  const enWiki = await page.locator("main").innerText();
  if (enWiki.includes("Soil glossary") || enWiki.includes("Glossary") || enWiki.includes("Exchangeable Mg")) ok("EN encyclopedia");
  else bad("EN encyclopedia", enWiki.slice(0, 120));
  if (enWiki.includes("Exchangeable Mg") && enWiki.includes("Field capacity") || enWiki.includes("field capacity") || enWiki.includes("Porosity")) {
    ok("EN new terms");
  } else {
    // Field capacity may be the title
    const hasFc = /field capacity|Field capacity|porosity|Porosity|Replant/i.test(enWiki);
    if (hasFc) ok("EN new terms", "partial");
    else bad("EN new terms", enWiki.slice(0, 200));
  }

  await goto("/contact");
  const enC = await page.locator("main").innerText();
  if (/no public inbox|not yet open|暂未/i.test(enC)) bad("EN contact leftover", enC.slice(0, 120));
  else ok("EN contact");
  const enMail = await page.locator('a[href="mailto:g17612121666@gmail.com"]').count();
  if (enMail >= 1) ok("EN mailto");
  else bad("EN mailto", "missing");

  // Switch back to ZH for diagnose
  await page.getByRole("button", { name: /Switch to 中文|中文|Chinese/i }).click().catch(() => {});
  await page.evaluate(() => {
    try {
      localStorage.setItem("tuzhi-lang", JSON.stringify({ state: { lang: "zh" }, version: 0 }));
    } catch {}
  });

  // --- Diagnose 3 cases ---
  async function diagnose(q, expectAny, notOnly) {
    await page.goto(BASE + "/diagnose", { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(400);
    const box = page.locator("textarea").first();
    await box.fill("");
    await box.fill(q);
    await page.getByRole("button", { name: /开始诊断|Start diagnosis/ }).click();
    try {
      await page.waitForFunction(
        () => document.body.innerText.includes("对照结果") || document.body.innerText.includes("相关知识") || document.body.innerText.includes("这次没对照"),
        null,
        { timeout: 90000 },
      );
    } catch {
      const t = await page.locator("main").innerText();
      bad(`diagnose ${q.slice(0, 12)}`, t.replace(/\s+/g, " ").slice(0, 180));
      await shot(`diagnose-fail`);
      return;
    }
    const t = await page.locator("main").innerText();
    const hit = expectAny.some((k) => t.includes(k));
    const badOnly = notOnly && t.includes(notOnly) && !hit;
    if (hit && !badOnly) ok(`diagnose ${q.slice(0, 16)}`, expectAny.find((k) => t.includes(k)));
    else bad(`diagnose ${q.slice(0, 16)}`, t.replace(/\s+/g, " ").slice(0, 220));
    await page.waitForTimeout(1500);
  }

  await diagnose("玉米地土面发白，叶缘焦，上周刚施复合肥", ["盐碱", "返盐", "白霜", "盐害"], "缺氮");
  await diagnose("黄瓜新叶发黄叶脉还绿，老叶还好", ["缺铁", "铁", "黄化", "石灰性"], "缺氮");
  await diagnose("菜地地湿有明水，白天蔫晚上缓", ["涝", "积水", "憋气", "黑根"], "干旱");

  // --- Mobile overflow ---
  await page.setViewportSize({ width: 390, height: 844 });
  await goto("/knowledge");
  const overflowK = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  await goto("/encyclopedia/mg");
  const overflowW = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  await goto("/community");
  await page.waitForTimeout(800);
  const overflowC = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  if (!overflowK && !overflowW && !overflowC) ok("mobile no overflow");
  else bad("mobile overflow", `k=${overflowK} wiki=${overflowW} c=${overflowC}`);
  await shot("mobile-wiki");

  const realConsole = consoleErrs.filter((e) => !/Failed to load resource|net::ERR|bilibili|player.bilibili/i.test(e));
  if (realConsole.length === 0 && pageErrs.length === 0) ok("no console errors");
  else bad("console errors", [...realConsole, ...pageErrs].slice(0, 6).join(" | "));
} catch (err) {
  bad("script crashed", String(err).slice(0, 300));
} finally {
  await browser.close();
}

const report = out.join("\n") + `\n\n${fail.length} failed, ${out.filter((l) => l.startsWith("PASS")).length} passed\n`;
writeFileSync("/tmp/tuzhi-qa.txt", report);
console.log(report);
process.exit(fail.length ? 1 : 0);
