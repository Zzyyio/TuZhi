import { extractBvid } from "@/lib/knowledge/bilibili";
import { videoMeta } from "@/lib/knowledge/videos";
import { useI18n } from "@/lib/i18n/lang";

export function BilibiliPlayer({
  slug,
  url,
  title,
  captionNote,
}: {
  slug?: string;
  url: string;
  title: string;
  topic?: string;
  playLabel: string;
  captionNote?: string;
}) {
  const { t } = useI18n();
  const k = t.knowledge;
  const meta = slug ? videoMeta(slug) : undefined;
  const bvid = meta?.bvid ?? extractBvid(url) ?? "BV13E421M7Ly";
  const videoTitle = meta?.title ?? title;
  const src = `https://player.bilibili.com/player.html?isOutside=true&bvid=${encodeURIComponent(bvid)}&p=1&high_quality=1&danmaku=0&as_wide=1&autoplay=0`;
  const page = `https://www.bilibili.com/video/${bvid}/`;
  const reference = Boolean(meta?.reference);

  return (
    <div className="space-y-2">
      <div className="bili-wrap relative w-full overflow-hidden rounded-xl bg-ink" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={src}
          scrolling="no"
          className="absolute inset-0 size-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title={videoTitle}
        />
      </div>
      <p className="video-caption text-sm text-muted">
        Bilibili · {videoTitle} · BV {bvid}
        {reference ? ` · ${k.biliRef}` : null}
        {captionNote ? ` · ${captionNote}` : null}
      </p>
      <a href={page} target="_blank" rel="noreferrer" className="text-sm text-forest underline">
        {k.biliOpen}
      </a>
    </div>
  );
}
