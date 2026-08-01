"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Görünür alana girince içeriği bir kez yumuşakça yukarı taşır.
 * Animasyon CSS'te (`.reveal` / `.is-visible`), burada sadece tetikleme var.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** Sıralı ögelerde kademeli giriş için milisaniye */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hareket azaltma tercihi varsa animasyonu hiç kurma, doğrudan göster.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

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
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
