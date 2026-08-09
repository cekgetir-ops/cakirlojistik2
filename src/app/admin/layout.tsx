import type { Metadata } from "next";
import Link from "next/link";
import { oturumVarMi } from "@/lib/auth";
import { cikisYap } from "./actions";

export const metadata: Metadata = {
  title: { default: "Yönetim Paneli", template: "%s | Yönetim" },
  robots: { index: false, follow: false },
};

const menu = [
  { href: "/admin", label: "Genel bakış" },
  { href: "/admin/icerik/blog", label: "Blog" },
  { href: "/admin/icerik/region", label: "Hizmet Bölgeleri" },
  { href: "/admin/referanslar", label: "Referanslar" },
  { href: "/admin/bakim", label: "Bakım modu" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Giriş sayfası da bu düzeni kullanıyor; oturum yoksa kabuk çizilmiyor.
  const girisli = await oturumVarMi();

  if (!girisli) return <>{children}</>;

  return (
    <div className="min-h-dvh bg-canvas-alt">
      <header className="border-b border-line bg-canvas">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-[15px] font-semibold tracking-tight">
              Yönetim
            </Link>
            <nav aria-label="Panel menüsü" className="hidden sm:block">
              <ul className="flex items-center gap-1">
                {menu.map((m) => (
                  <li key={m.href}>
                    <Link href={m.href} className="admin-nav-link">
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="admin-nav-link" target="_blank">
              Siteyi gör
            </Link>
            <form action={cikisYap}>
              <button type="submit" className="admin-nav-link">
                Çıkış
              </button>
            </form>
          </div>
        </div>

        {/* Dar ekranda menü ikinci satıra iniyor */}
        <nav aria-label="Panel menüsü" className="shell pb-3 sm:hidden">
          <ul className="flex flex-wrap items-center gap-1">
            {menu.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="admin-nav-link">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="shell py-10 lg:py-14">{children}</main>
    </div>
  );
}
