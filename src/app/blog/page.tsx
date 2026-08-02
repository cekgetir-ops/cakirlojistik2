import type { Metadata } from "next";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { PageHeader } from "@/components/Section";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Araç taşıma, yol yardım ve otopark üzerine notlar. İlk yazılar hazırlanıyor.",
};

/**
 * Blog — yer tutucu.
 *
 * Menüde sekme var ama içerik henüz yok. Boş bir rota 404 döndüreceği için
 * sitenin kendi başlık düzeniyle nötr bir sayfa bırakıldı. İlk yazı geldiğinde
 * bu dosya liste görünümüyle değiştirilecek.
 */
export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Yakında."
        description="Araç taşıma, yol yardım ve otopark üzerine sahadan notlar hazırlıyoruz. İlk yazılar yayına girdiğinde burada olacak."
      />

      <section className="shell py-20 lg:py-28">
        <Reveal>
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-muted">
              Bu arada aklınıza takılan bir şey varsa doğrudan sorabilirsiniz —
              taşıma süreci, güzergâh ya da fiyatlandırma fark etmez.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/iletisim">Bize yazın</Button>
              <Button href="/hizmetler" variant="quiet">
                Hizmetleri inceleyin
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
