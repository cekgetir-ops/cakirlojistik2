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

  // Panel açıkken arka planın kaymasını engelle.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled || open
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
        }`}
    >
      <div className="shell flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1">
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
                    className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${active
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

        <div className="flex items-center gap-1.5">
          <a
            href={contact.phone.href}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-[13.5px] font-medium text-muted transition-colors hover:text-ink xl:inline-flex"
          >
            <Phone className="size-4" />
            <span className="tabular">{contact.phone.label}</span>
          </a>

          <ThemeToggle />

          <Link
            href="/iletisim"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-canvas transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Teklif alın
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobil-menu"
            className="inline-flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-canvas-alt lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobil panel */}
      <div
        id="mobil-menu"
        hidden={!open}
        className="border-t border-line bg-canvas lg:hidden"
      >
        {/* Panel içindeki her bağlantı menüyü kapatır — tıklamayı burada
            tek noktada yakalıyoruz ki her linke ayrı işleyici eklemeyelim. */}
        <nav
          aria-label="Mobil menü"
          className="shell py-4"
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
    </header>
  );
}
