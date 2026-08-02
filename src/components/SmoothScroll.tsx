"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Sayfa genelinde yumuşak kaydırma.
 *
 * Tekerlek ve dokunmatik girdiyi Lenis'in rAF döngüsüne bağlar; keskin,
 * basamaklı kaydırma yerine sürekli bir ivmelenme/yavaşlama eğrisi verir.
 * Gerçek scroll konumu değiştiği için sticky başlık, `position: sticky`
 * bloklar ve IntersectionObserver'lar olduğu gibi çalışmaya devam eder.
 *
 * İşletim sistemi veya tarayıcı ayarlarından bağımsız olarak her koşulda
 * çalışır. Tek istisna mobil menü: panel açıkken arkadaki sayfa kaymasın
 * diye kaydırma geçici olarak durdurulur (menü kapanınca geri açılır).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // Sabit süreli animasyon yerine lerp: her karede hedefe doğru mesafenin
      // %12'si kapatılır. Sabit süre, art arda gelen tekerlek darbelerinde
      // animasyonu baştan başlatıp gecikmiş hissi veriyordu; lerp hedefi
      // sürekli kovaladığı için hem daha hızlı hem daha tepkisel oturuyor.
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.8,
    });

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    /* Sayfa içi çapa bağlantıları -------------------------------------- */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();
      // Sticky başlığın altında kalmasın — globals.css'teki scroll-padding
      // karşılığı, Lenis kendi hesabını yaptığı için burada tekrarlanıyor.
      lenis.scrollTo(target, {
        offset: -96,
        onComplete: () => {
          // Çapa hedefine odağı taşı; "İçeriğe geç" bağlantısının klavye
          // kullanıcısı için anlamı buna bağlı. preventDefault odağı
          // götürdüğü için elle geri veriyoruz.
          if (!target.hasAttribute("tabindex")) {
            target.setAttribute("tabindex", "-1");
          }
          target.focus({ preventScroll: true });
        },
      });
    };
    document.addEventListener("click", onClick);

    /* Mobil menü açıkken sayfayı dondur --------------------------------- */
    // Header, panel açıkken body'ye overflow:hidden yazıyor. Lenis sanal
    // kaydırmayı sürdürdüğü için bunu ayrıca duyurmamız gerekiyor.
    const syncLock = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    syncLock();

    return () => {
      document.removeEventListener("click", onClick);
      lockObserver.disconnect();
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
