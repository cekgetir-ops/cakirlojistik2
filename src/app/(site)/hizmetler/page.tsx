import type { Metadata } from "next";
import Button from "@/components/Button";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";
import { PageHeader, SectionHeader } from "@/components/Section";
import { Check } from "@/components/icons";
import { process, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Çoklu araç taşıma, yol yardım, otopark ve kurumsal çözüm ortaklığı. İstanbul Ankara hattında kaskolu taşıma.",
};

export default function HizmetlerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hizmetler"
        title="İhtiyacın büyüklüğü değişir, işin standardı değişmez."
        description="Dört hizmet başlığı altında topladık; hepsinde aynı kasko kapsamı, aynı kadro ve aynı teslim disiplini geçerli."
      />

      {/* Hizmetler — sırayla, görsel dönüşümlü olarak yer değiştiriyor */}
      <div className="shell">
        {services.map((service, i) => {
          const flipped = i % 2 === 1;
          return (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-28 border-b border-line py-20 last:border-b-0 lg:py-28"
            >
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={flipped ? "lg:order-2" : undefined}>
                  <service.icon className="size-7 text-ink" strokeWidth={1.4} />
                  <h2 className="mt-6 text-heading font-semibold tracking-tight text-balance">
                    {service.title}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                    {service.summary}
                  </p>

                  <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-ink-soft"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-ink"
                          strokeWidth={1.6}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Button href="/iletisim" variant="outline">
                      Bu hizmet için teklif alın
                    </Button>
                  </div>
                </Reveal>

                <Reveal
                  delay={100}
                  className={flipped ? "lg:order-1" : undefined}
                >
                  <Figure
                    ratio="4 / 3"
                    alt={service.title}
                    hint={service.figureHint}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    rounded="rounded-2xl"
                  />
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Süreç */}
      <section className="border-t border-line bg-canvas-alt">
        <div className="shell py-20 lg:py-28">
          <SectionHeader
            eyebrow="Süreç"
            title="Nasıl çalışıyoruz?"
            description="Hangi hizmeti seçerseniz seçin izlenen yol aynı. Her adımda kiminle konuşacağınızı biliyorsunuz."
          />

          <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <Reveal key={item.step} as="li" delay={i * 70}>
                <div className="border-t border-line-strong pt-6">
                  <span className="tabular text-sm font-medium text-faint">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Kapanış */}
      <section className="shell py-24 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-title font-semibold text-balance">
              Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Durumu anlatın, size uygun olanı birlikte belirleyelim. Yönlendirme
              için ücret almıyoruz.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/iletisim">İletişime geçin</Button>
              <Button href="/hakkimizda" variant="outline">
                Hakkımızda
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
