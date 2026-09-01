import { i as createServerFn } from "./ssr.mjs";
import { p as createSsrRpc } from "./router-OKOTHu9b.mjs";
import { t as authMiddleware } from "./middleware-DmNbtfCK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-C8f2tROE.js
function numId(raw) {
	const n = typeof raw === "number" ? raw : Number(raw);
	return Number.isFinite(n) ? n : 0;
}
var listPosts = createServerFn({ method: "POST" }).validator((input) => {
	return { problem: (input && typeof input === "object" && "problem" in input && typeof input.problem === "string" ? input.problem.trim() : "") || void 0 };
}).handler(createSsrRpc("07e1d96efd90f45310cc9d4bb39f141181b635cac4540aa37391da0053b5cedc"));
var getPost = createServerFn({ method: "POST" }).validator((input) => ({ id: numId(input.id) })).handler(createSsrRpc("c674c7a9925a1b0fbef7c4ddb975f1161f4c38b06495243ad7a7efe1d38c5e51"));
var createPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("ed90876a489713663539ec087b09a60ce97f07b68d4a60499d2b3badc88ef9eb"));
var createAnswer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	postId: numId(input.postId),
	body: input.body
})).handler(createSsrRpc("fc8a7b7211a232b5f7055b6a78471052543ea608ad61b52714a5a5f0411dc83e"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ecc85b8dcc36673da9b41dcf3c12e55663b3a4f73bb75f963c98d12f1a60b33a"));
var myPosts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e49c5f4c744bd1307d642704000125d94cbca0f19fa03048b9032db1381eb0f4"));
//#endregion
export { myPosts as a, listPosts as i, createPost as n, getPost as r, createAnswer as t };
