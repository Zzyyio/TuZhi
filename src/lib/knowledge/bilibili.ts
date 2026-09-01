export function extractBvid(url: string): string | null {
  const m = url.match(/BV[0-9A-Za-z]{6,}/);
  return m?.[0] ?? null;
}
