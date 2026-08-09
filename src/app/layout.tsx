import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Göreli canonical/OG adreslerinin mutlak hâle gelmesi için taban adres.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Kaskolu Araç Nakliyesi`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "şehirler arası araç taşıma",
    "çoklu araç taşıma",
    "araç nakliyesi",
    "oto taşıma",
    "yol yardım",
    "otopark",
    "istanbul ankara araç taşıma",
    "kaskolu araç taşıma",
    "araç sevkiyat",
  ],
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | Kaskolu Araç Nakliyesi`,
    description: site.description,
    url: site.url,
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Kaskolu Araç Nakliyesi`,
    description: site.description,
  },
  robots: { index: true, follow: true },
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
      {/* Ziyaretçi kabuğu (başlık, alt bilgi, yumuşak kaydırma) `(site)`
          düzeninde; yönetim paneli o kabuğu almasın diye kök burada boş. */}
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
