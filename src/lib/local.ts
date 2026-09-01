const HIST_KEY = "tuzhi.diagnoseHistory";
const FAV_KEY = "tuzhi.favorites";

export type LocalDiagnose = {
  id: string;
  at: number;
  question: string;
  kind?: string;
  category?: string;
  summary?: string;
};

export function loadHistory(): LocalDiagnose[] {
  try {
    return JSON.parse(localStorage.getItem(HIST_KEY) || "[]") as LocalDiagnose[];
  } catch {
    return [];
  }
}

export function saveHistory(item: LocalDiagnose) {
  const list = [item, ...loadHistory().filter((h) => h.id !== item.id)].slice(0, 30);
  localStorage.setItem(HIST_KEY, JSON.stringify(list));
}

export function loadFavs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || "[]") as string[];
  } catch {
    return [];
  }
}

export function toggleFav(slug: string): string[] {
  const cur = loadFavs();
  const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur];
  localStorage.setItem(FAV_KEY, JSON.stringify(next));
  return next;
}
