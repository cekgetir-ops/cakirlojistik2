import type { ReactNode } from "react";

/**
 * Uzun metin blokları (yasal sayfalar, bilgilendirme) için okuma düzeni.
 * Satır uzunluğu 68 karakter civarında tutuluyor.
 */
export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="max-w-2xl text-base leading-relaxed text-muted
        [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4
        [&_h2]:mt-14 [&_h2]:text-heading [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink
        [&_h3]:mt-10 [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:text-ink
        [&_li]:mt-2 [&_li]:pl-1
        [&_p]:mt-5
        [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-5
        [&_strong]:font-medium [&_strong]:text-ink"
    >
      {children}
    </div>
  );
}
