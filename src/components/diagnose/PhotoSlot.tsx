import { Camera, ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import { fileToDataUrl } from "@/lib/image";

export function PhotoSlot({
  label,
  hint,
  avoid,
  src,
  onChange,
  exampleSrc,
  cameraLabel = "拍照",
  albumLabel = "相册",
  shotPrefix = "拍成这样：",
  avoidPrefix = "别拍成那样：",
}: {
  label: string;
  hint: string;
  avoid: string;
  src: string | null;
  onChange: (src: string | null) => void;
  exampleSrc?: string;
  cameraLabel?: string;
  albumLabel?: string;
  shotPrefix?: string;
  avoidPrefix?: string;
}) {
  const album = useRef<HTMLInputElement>(null);
  const camera = useRef<HTMLInputElement>(null);
  async function pick(files: FileList | null) {
    const f = files?.[0];
    if (!f) return;
    const url = await fileToDataUrl(f);
    if (url) onChange(url);
    if (album.current) album.current.value = "";
    if (camera.current) camera.current.value = "";
  }
  return (
    <div className="space-y-2">
      <input ref={album} type="file" accept="image/*" className="hidden" onChange={(e) => void pick(e.target.files)} />
      <input
        ref={camera}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => void pick(e.target.files)}
      />
      {src ? (
        <button type="button" className="relative block w-full overflow-hidden rounded-xl border border-line" onClick={() => onChange(null)}>
          <img src={src} alt={label} className="h-40 w-full object-cover" />
          <span className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-surface text-ink">
            <X className="size-4" />
          </span>
        </button>
      ) : (
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-clay bg-surface text-center">
          <span className="text-lg font-medium">{label}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => camera.current?.click()} className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-forest px-3 text-sm text-forest-fg">
              <Camera className="size-4" />
              {cameraLabel}
            </button>
            <button type="button" onClick={() => album.current?.click()} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-line bg-surface px-3 text-sm">
              <ImagePlus className="size-4" />
              {albumLabel}
            </button>
          </div>
        </div>
      )}
      <div className="flex items-start gap-2">
        {exampleSrc ? <img src={exampleSrc} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover" /> : null}
        <p className="text-sm text-muted">{shotPrefix}{hint}</p>
      </div>
      <p className="text-sm text-subtle">{avoidPrefix}{avoid}</p>
    </div>
  );
}
