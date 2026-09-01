import { useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/lang";
import type { ArticlePhoto } from "@/lib/knowledge/types";

export function PhotoGallery({ photos }: { photos: ArticlePhoto[] }) {
  const { t } = useI18n();
  const [open, setOpen] = useState<ArticlePhoto | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {photos.map((p) => (
          <button
            key={p.src + p.caption}
            type="button"
            onClick={() => setOpen(p)}
            className="overflow-hidden rounded-xl border border-line bg-surface text-left"
          >
            <img
              src={p.src}
              alt={p.alt}
              className="h-52 w-full bg-surface-2 object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />
            <span className="block px-3 py-2 text-sm text-muted">{p.caption}</span>
          </button>
        ))}
      </div>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-surface text-ink"
            aria-label={t.knowledge.close}
            onClick={() => setOpen(null)}
          >
            <X className="size-6" />
          </button>
          <img src={open.src} alt={open.alt} className="max-h-[90dvh] max-w-full rounded-lg object-contain" />
        </div>
      ) : null}
    </>
  );
}
