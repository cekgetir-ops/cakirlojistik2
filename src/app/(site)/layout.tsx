import { ViewTransition } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import BakimEkrani from "@/components/BakimEkrani";
import { bakimMesaji, bakimModuAcikMi } from "@/lib/ayarlar";
import { oturumVarMi } from "@/lib/auth";

/**
 * Ziyaretçi kabuğu.
 *
 * Başlık, alt bilgi, yumuşak kaydırma ve sayfa geçişi yalnızca burada.
 * Yönetim paneli bu grubun dışında olduğu için kendi sade düzenini
 * kullanıyor ve site menüsünü almıyor.
 *
 * Bakım modu buradan geçiyor: açıkken ziyaretçiye bakım ekranı çiziliyor,
 * panele girmiş yönetici siteyi normal görmeye devam ediyor — değişikliği
 * yayına almadan kontrol edebilsin diye.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bakimda, yonetici] = await Promise.all([
    bakimModuAcikMi(),
    oturumVarMi(),
  ]);

  if (bakimda && !yonetici) {
    return <BakimEkrani mesaj={await bakimMesaji()} />;
  }

  return (
    <>
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
    </>
  );
}
