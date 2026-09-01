//#region node_modules/.nitro/vite/services/ssr/assets/local-DhlOhQ-0.js
var HIST_KEY = "tuzhi.diagnoseHistory";
var FAV_KEY = "tuzhi.favorites";
function loadHistory() {
	try {
		return JSON.parse(localStorage.getItem(HIST_KEY) || "[]");
	} catch {
		return [];
	}
}
function saveHistory(item) {
	const list = [item, ...loadHistory().filter((h) => h.id !== item.id)].slice(0, 30);
	localStorage.setItem(HIST_KEY, JSON.stringify(list));
}
function loadFavs() {
	try {
		return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
	} catch {
		return [];
	}
}
function toggleFav(slug) {
	const cur = loadFavs();
	const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur];
	localStorage.setItem(FAV_KEY, JSON.stringify(next));
	return next;
}
//#endregion
export { toggleFav as i, loadHistory as n, saveHistory as r, loadFavs as t };
