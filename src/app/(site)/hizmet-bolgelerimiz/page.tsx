import type { Metadata } from "next";
import IcerikListesi from "@/components/IcerikListesi";
import { PageHeader } from "@/components/Section";
import { yayindakiler } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hizmet Bölgelerimiz",
  description:
    "Şehirler arası araç taşıma hizmeti verdiğimiz iller ve güzergâhlar. Tüm Türkiye'ye hizmet verilmektedir.",
  alternates: { canonical: "/hizmet-bolgelerimiz" },
};

export default async function HizmetBolgeleri() {
  const bolgeler = await yayindakiler("REGION");

  return (
    <>
      <PageHeader
        eyebrow="Hizmet Bölgelerimiz"
        title="Tüm Türkiye'ye hizmet veriyoruz."
        description="İstanbul Ankara hattı düzenli seferlerle işliyor; diğer illere talep üzerine planlama yapıyoruz."
      />

      <section className="shell py-20 lg:py-28">
        <IcerikListesi
          ogeler={bolgeler}
          kok="/hizmet-bolgelerimiz"
          bosMetin="Bölge sayfaları hazırlanıyor. Güzergâhınızı yazın, aynı gün dönüş yapalım."
        />
      </section>
    </>
  );
}
