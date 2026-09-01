function canvasToBlobUrl(canvas: HTMLCanvasElement, maxBytes = 400_000): Promise<string> {
  const qualities = [0.7, 0.58, 0.46, 0.34];
  return new Promise((resolve, reject) => {
    const tryQ = (i: number) => {
      const q = qualities[i] ?? 0.28;
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("无法压缩图片"));
            return;
          }
          if (blob.size <= maxBytes || i >= qualities.length) {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(new Error("读图失败"));
            reader.readAsDataURL(blob);
            return;
          }
          tryQ(i + 1);
        },
        "image/jpeg",
        q,
      );
    };
    tryQ(0);
  });
}

function draw(source: CanvasImageSource, width: number, height: number, maxEdge: number) {
  const scale = Math.min(1, maxEdge / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("无法处理图片");
  ctx.drawImage(source, 0, 0, w, h);
  return canvas;
}

export async function compressImageFile(file: File, maxEdge = 1600): Promise<string> {
  try {
    const bitmap = await createImageBitmap(file);
    const canvas = draw(bitmap, bitmap.width, bitmap.height, maxEdge);
    bitmap.close();
    return canvasToBlobUrl(canvas);
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("图片读不出来"));
        el.src = url;
      });
      return canvasToBlobUrl(draw(img, img.naturalWidth, img.naturalHeight, maxEdge));
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

function looksLikeImage(file: File) {
  if (!file.type || file.type.startsWith("image/")) return true;
  return /\.(jpe?g|png|webp|gif|heic|heif|bmp)$/i.test(file.name);
}

export async function fileToDataUrl(file: File): Promise<string | null> {
  if (!looksLikeImage(file)) return null;
  try {
    return await compressImageFile(file);
  } catch {
    return null;
  }
}
