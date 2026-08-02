import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — İstanbul Ankara Çoklu Araç Taşıma`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "çoklu araç taşıma",
    "araç taşıma",
    "yol yardım",
    "otopark",
    "istanbul ankara araç taşıma",
    "çakır lojistik",
    "araç sevkiyat",
    "kaskolu araç taşıma",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — İstanbul Ankara Çoklu Araç Taşıma`,
    description: site.description,
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
};

/**
 * Sayfa boyanmadan önce çalışır:
 *
 * 1. `js` sınıfı — giriş animasyonlarının devreye girmesi için işaret. Bu script
 *    çalışmadıysa sınıf da eklenmez ve içerik animasyonsuz ama görünür kalır.
 * 2. Kayıtlı tema tercihi. React devreye girmeden uygulandığı için koyu temada
 *    ilk karede beyaz parlama olmaz. Varsayılan açık; koyu yalnızca seçildiyse.
 */
const bootScript = `
document.documentElement.classList.add('js');
try {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-canvas"
        >
          İçeriğe geç
        </a>
        <SmoothScroll />
        <Header />
        {/* Rota değişiminde içerik yumuşakça çapraz geçer; başlık ve alt bilgi
            sabit kalır ki gezinme sırasında çerçeve yerinde dursun. */}
        <ViewTransition name="sayfa">
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
      </body>
    </html>
  );
}
