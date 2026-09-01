import { createFileRoute } from "@tanstack/react-router";
import { TERMS } from "@/lib/encyclopedia";
import { ARTICLES } from "@/lib/knowledge/articles";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "/",
          "/diagnose",
          "/knowledge",
          "/encyclopedia",
          "/community",
          "/about",
          "/contact",
          "/privacy",
          ...ARTICLES.map((a) => `/knowledge/${a.slug}`),
          ...TERMS.map((term) => `/encyclopedia/${term.id}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
