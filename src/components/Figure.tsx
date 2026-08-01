import Image from "next/image";

/**
 * Görsel yuvası.
 *
 * `src` verilmediği sürece yerine ölçüsü yazılı nötr bir blok çizer — böylece
 * fotoğraflar hazır olmadan da sayfanın oranları ve ritmi doğru görünür.
 * Fotoğraf `public/` içine konup `src` geçildiğinde blok kendiliğinden
 * optimize edilmiş `next/image` çıktısına dönüşür; başka değişiklik gerekmez.
 */
export default function Figure({
  src,
  alt,
  ratio = "16 / 9",
  hint,
  priority = false,
  sizes = "100vw",
  className = "",
  rounded = "rounded-xl",
}: {
  src?: string;
  alt: string;
  /** CSS aspect-ratio değeri, ör. "4 / 5" */
  ratio?: string;
  /** Yer tutucuda görünen açıklama — hangi fotoğrafın geleceğini hatırlatır */
  hint?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`relative overflow-hidden bg-canvas-alt ${rounded} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="dotted absolute inset-0 flex flex-col items-center justify-center gap-1.5 border border-line px-6 text-center opacity-70">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-faint">
            Görsel alanı
          </span>
          {hint && (
            <span className="max-w-xs text-[13px] leading-relaxed text-muted">
              {hint}
            </span>
          )}
          <span className="tabular mt-1 text-[11px] text-faint">
            {ratio.replace(/\s/g, "")}
          </span>
        </div>
      )}
    </div>
  );
}
