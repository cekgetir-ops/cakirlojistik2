import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Bölüm başlığı. Etiket + başlık solda, açıklama sağda duruyor —
 * her bölümde ortalanmış başlık yığını tekrarlanmasın diye.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-6 max-w-xl text-title font-semibold text-balance">
            {title}
          </h2>
        </div>
        {(description || aside) && (
          <div className="lg:pb-1.5">
            {description && (
              <p className="max-w-md text-base leading-relaxed text-muted">
                {description}
              </p>
            )}
            {aside && <div className="mt-6">{aside}</div>}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/** Alt sayfaların üst bloğu — başlık ve tanıtım cümlesi. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-line">
      <div className="shell py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-7 max-w-3xl text-title font-semibold text-balance">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
