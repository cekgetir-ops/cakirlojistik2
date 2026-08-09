import type { Metadata } from "next";
import IcerikListesi from "@/components/IcerikListesi";
import { PageHeader } from "@/components/Section";
import { yayindakiler } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Şehirler arası araç taşıma, yol yardım ve otopark üzerine sahadan notlar.",
  alternates: { canonical: "/blog" },
};

export default async function BlogSayfasi() {
  const yazilar = await yayindakiler("BLOG");

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Sahadan notlar."
        description="Araç taşıma, yol yardım ve otopark üzerine deneyimlerimizi paylaşıyoruz."
      />

      <section className="shell py-20 lg:py-28">
        <IcerikListesi
          ogeler={yazilar}
          kok="/blog"
          bosMetin="İlk yazılar hazırlanıyor. Bu arada aklınıza takılan bir şey varsa doğrudan sorabilirsiniz."
        />
      </section>
    </>
  );
}
