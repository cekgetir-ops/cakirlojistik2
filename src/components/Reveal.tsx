"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Görünür alana girince içeriği bir kez yumuşakça yukarı taşır.
 * Animasyon CSS'te (`.reveal` / `.is-visible`), burada sadece tetikleme var.
 *
 * `enter` verildiğinde observer hiç kurulmaz; içerik sayfa yüklenir yüklenmez
 * CSS animasyonuyla girer. Katlamanın üstündeki bloklar için bu daha doğru:
 * kesişmeyi beklemek hydrate anında görünür bir sıçramaya yol açıyor.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  enter = false,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Sıralı ögelerde kademeli giriş için milisaniye */
  delay?: number;
  className?: string;
  /** Kesişmeyi bekleme — sayfa yüklenince gir */
  enter?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Giriş modunda tetikleyiciye gerek yok, animasyon CSS'te başlıyor.
    if (enter) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Kesişiyorsa göster. Ayrıca element viewport'un yukarısında kalmışsa
        // da göster: sayfa hydrate olmadan hızlıca aşağı kaydırıldığında
        // observer kurulduğu anda o bölüm çoktan geride kalmış olur ve bir daha
        // hiç kesişmez — bu kontrol olmazsa içerik kalıcı olarak görünmez kalır.
        const passed = entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && !passed) return;
        el.classList.add("is-visible");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enter]);

  // Giriş modunda gecikme animation-delay'e, observer modunda transition-delay'e gider.
  const style: CSSProperties | undefined = delay
    ? enter
      ? ({ "--enter-delay": `${delay}ms` } as CSSProperties)
      : { transitionDelay: `${delay}ms` }
    : undefined;

  return (
    <Tag
      ref={ref}
      className={`reveal${enter ? " reveal-enter" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
