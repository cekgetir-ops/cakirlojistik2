"use client";

import { useCallback } from "react";
import { Moon, Sun } from "./icons";

/** View Transitions API henüz her tarayıcıda tanımlı değil. */
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

/**
 * Tema anahtarı.
 *
 * İki ikon da her zaman DOM'a basılır, hangisinin görüneceğine CSS karar verir
 * (`dark:` varyantı). Böylece sunucu ve istemci çıktısı birebir aynı olur —
 * hydration uyuşmazlığı ve ilk karede yanıp sönme yaşanmaz.
 *
 * Geçiş her koşulda animasyonlu:
 *  - View Transitions destekleniyorsa tüm sayfa compositor üzerinde çapraz
 *    geçer — tek bir GPU katmanı, düzen hesabı yok, öge başına transition yok.
 *  - Desteklemeyen tarayıcıda `.theme-anim` sınıfıyla renk özelliklerine
 *    kısa süreli geçiş açılır. Bu bir kısıtlama değil, kapsamı genişletiyor:
 *    olmasa o tarayıcılarda geçiş büsbütün kaybolurdu.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = useCallback(() => {
    const root = document.documentElement;

    const apply = () => {
      const next = root.classList.toggle("dark") ? "dark" : "light";
      root.style.colorScheme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Gizli sekmede localStorage kapalı olabilir; tema yine de o oturum için değişir.
      }
    };

    const doc = document as DocumentWithViewTransition;
    if (typeof doc.startViewTransition === "function") {
      // Geçiş süresince sayfa (rota) animasyonunu bastır — tema zaten tüm
      // kökü çapraz geçiriyor, içerik ayrıca kaymamalı.
      root.classList.add("theme-switching");
      const transition = doc.startViewTransition(apply) as {
        finished?: Promise<void>;
      };
      const temizle = () => root.classList.remove("theme-switching");

      if (transition?.finished) {
        transition.finished.then(temizle, temizle);
      } else {
        window.setTimeout(temizle, 700);
      }
      return;
    }

    root.classList.add("theme-anim");
    apply();
    window.setTimeout(() => root.classList.remove("theme-anim"), 560);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Koyu ve açık tema arasında geçiş yap"
      className={`inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas-alt hover:text-ink ${className}`}
    >
      <Sun className="size-[18px] dark:hidden" />
      <Moon className="hidden size-[18px] dark:block" />
    </button>
  );
}
