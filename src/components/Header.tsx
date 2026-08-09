"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Close, Menu, Phone } from "./icons";
import { contact, nav } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Sayfa başındayken başlık zeminsiz durur, kaydırınca ayrışır.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Panel açıkken arka plan kaymasın.
   *
   * Burada bilerek `overflow: hidden` KULLANILMIYOR. Body'ye verilen
   * overflow, html `visible` olduğunda viewport'a yayılıyor; sayfa
   * kaydırılamaz hâle gelince `position: sticky` dayanacağı kaydırma
   * kapsayıcısını kaybediyor ve başlık akıştaki statik yerine —
   * yani belgenin tepesine — düşüyor. Aşağı kaydırılmış bir sayfada
   * bu, başlığın ve içindeki menünün ekrandan tamamen kaybolması
   * demek oluyordu.
   *
   * Onun yerine <html> üzerine bir işaret bırakılıyor; SmoothScroll
   * bunu görüp Lenis'i durduruyor. Lenis tekerlek ve dokunma
   * girdisini zaten yutuyor, düzen hiç bozulmuyor.
   */
  useEffect(() => {
    const kok = document.documentElement;
    if (open) kok.dataset.menuAcik = "1";
    else delete kok.dataset.menuAcik;

    return () => {
      delete document.documentElement.dataset.menuAcik;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    // Dış kabuk her zaman saydam ve SABİT yükseklikte. Yükseklik değişseydi
    // sticky başlık akışta yer kapladığı için sayfa içeriği kaydırma
    // sırasında zıplardı. Görsel değişimin tamamı içteki adada.
    <header className="sticky top-0 z-50">
      <div className="shell flex h-18 items-center">
        {/* Marka adı uzadı ve menü altı ögeye çıktı; masaüstü menüsü artık
            lg yerine xl'de açılıyor, altında mobil panel kullanılıyor. */}
        <div className={`nav-ada ${scrolled || open ? "is-stuck" : ""}`}>
          <Logo />

        <nav aria-label="Ana menü" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors ${active
                        ? "text-ink"
                        : "text-muted hover:text-ink"
                      }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3.5 -bottom-px h-px bg-ink" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          {/* Telefon en son eklenen bilgi; ancak menüden sonra yer kalırsa
              görünüyor (2xl). Altında mobil panelde ve alt bilgide var. */}
          <a
            href={contact.phone.href}
            className="ada-telefon hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] font-medium text-muted transition-colors hover:text-ink 2xl:inline-flex"
          >
            <Phone className="size-4" />
            <span className="tabular">{contact.phone.label}</span>
          </a>

          <ThemeToggle />

          <Link
            href="/iletisim"
            className="hidden whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-canvas transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Teklif alın
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobil-menu"
            className="inline-flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-canvas-alt xl:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobil panel — adanın içinde duruyor ki genişliği onunla hizalansın
            ve ada daraldığında altında asılı kalmasın. Akıştan çıkarıldığı
            için açılıp kapanması belge yüksekliğini değiştirmiyor.
            `data-lenis-prevent` Lenis'in bu alandaki kaydırmayı yutmasını,
            `overscroll-contain` da kaydırmanın arkadaki sayfaya
            zincirlenmesini engelliyor. */}
        <div
          id="mobil-menu"
          hidden={!open}
          data-lenis-prevent
          className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-canvas/95 px-5 shadow-lift backdrop-blur-xl xl:hidden"
        >
          {/* Panel içindeki her bağlantı menüyü kapatır — tıklamayı burada
              tek noktada yakalıyoruz ki her linke ayrı işleyici eklemeyelim. */}
          <nav
            aria-label="Mobil menü"
            className="py-4"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <ul className="flex flex-col">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-line py-4 text-lg tracking-tight transition-colors ${active ? "text-ink" : "text-muted"
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col gap-3 pb-2">
            <Link
              href="/iletisim"
              className="rounded-full bg-ink px-6 py-3.5 text-center text-sm font-medium text-canvas"
            >
              Teklif alın
            </Link>
            <a
              href={contact.phone.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink"
            >
              <Phone className="size-4" />
              <span className="tabular">{contact.phone.label}</span>
            </a>
          </div>
          </nav>
        </div>
      </div>
    </div>
    </header>
  );
}
