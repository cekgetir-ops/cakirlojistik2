import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "quiet";

// Geçiş yalnızca transform/opacity/renk üzerinden; `all` yerine adı geçen
// özellikler yazılı ki tarayıcı gereksiz özellikleri izlemesin.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap " +
  "transition-[transform,opacity,box-shadow,border-color,background-color,gap] duration-300 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-0 active:duration-75";

const variants: Record<Variant, string> = {
  // Tek dolu buton tipi. Sayfada nadir kullanılır ki ağırlığını korusun.
  primary:
    "bg-ink text-canvas px-6 py-3 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lift",
  outline:
    "border border-line-strong text-ink px-6 py-3 hover:border-ink hover:bg-canvas-alt hover:-translate-y-0.5",
  // Ok işaretli metin bağlantısı; hover'da ok bir tık ilerler.
  quiet: "text-ink px-1 py-1 gap-1.5 hover:gap-2.5",
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
