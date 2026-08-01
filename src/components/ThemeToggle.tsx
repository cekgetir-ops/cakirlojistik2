"use client";

import { useCallback } from "react";
import { Moon, Sun } from "./icons";

/**
 * Tema anahtarı.
 *
 * İki ikon da her zaman DOM'a basılır, hangisinin görüneceğine CSS karar verir
 * (`dark:` varyantı). Böylece sunucu ve istemci çıktısı birebir aynı olur —
 * hydration uyuşmazlığı ve ilk karede yanıp sönme yaşanmaz.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark") ? "dark" : "light";
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Gizli sekmede localStorage kapalı olabilir; tema yine de o oturum için değişir.
    }
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
