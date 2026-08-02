import Button from "@/components/Button";
import Figure from "@/components/Figure";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Reveal from "@/components/Reveal";
import { SectionHeader } from "@/components/Section";
import { ArrowRight, Check, Clock, Repeat, Shield, Users } from "@/components/icons";
import { process, services } from "@/lib/services";
import { site } from "@/lib/site";

const routeFacts = [
  { label: "Mesafe", value: "450 km" },
  { label: "Ortalama süre", value: "5 saat" },
  { label: "Taşıma", value: "Kaskolu" },
];

const assurances = [
  {
    icon: Shield,
    title: "Kaskolu taşıma",
    description:
      "Her araç, yüklendiği andan teslim edildiği ana kadar kasko kapsamında taşınır.",
  },
  {
    icon: Clock,
    title: "Tam zamanında teslim",
    description:
      "Teslim tarihi baştan yazılı olarak verilir ve o tarih esas alınır.",
  },
  {
    icon: Users,
    title: "Deneyimli kadro",
    description:
      "Yükleme, bağlama ve teslim; hepsi bu işi yıllardır yapan kendi ekibimizce yürütülür.",
  },
  {
    icon: Repeat,
    title: "Karşılıklı düzenli sefer",
    description:
      "İstanbul–Ankara hattı iki yönlü işler. Tek araç için sefer dolmasını beklemezsiniz.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Hizmetler */}
      <section className="shell mt-32 lg:mt-40">
        <SectionHeader
          eyebrow="Hizmetler"
          title="Taşıma, yol yardım ve otopark; tek çatı altında."
          description="Tek bir araç da olsa, kurumsal bir filo da olsa süreç aynı özenle yürütülüyor."
          aside={
            <Button href="/hizmetler" variant="quiet">
              Tüm hizmetler
              <ArrowRight className="size-4" />
            </Button>
          }
        />

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 70}>
              <article className="group rule-lift relative border-t border-line pt-6">
                <service.icon className="size-6 text-ink" strokeWidth={1.4} />
                <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.summary}
                </p>
                <a
                  href={`/hizmetler#${service.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-all group-hover:gap-2.5"
                >
                  Detaylar
                  <ArrowRight className="size-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Kurumsal referanslar */}
      <div className="mt-32 lg:mt-40">
        <Partners />
      </div>

      {/* Hat — İstanbul ile Ankara arasındaki operasyonun kendisi */}
      <section className="border-b border-line bg-canvas-alt">
        <div className="shell py-20 lg:py-28">
          <SectionHeader
            eyebrow="Güzergâh"
            title="İstanbul ve Ankara arasında, karşılıklı."
            description="İki şehirde de kendi otopark tesisimiz var. Bu yüzden araçları bekletebiliyor, sefer planını kendi takvimimize göre kurabiliyoruz."
          />

          <Reveal delay={120}>
            {/* `route-card`: imleç kartın üzerine geldiğinde hat canlanır —
                koşucu nokta iki şehir arasında gidip gelir, çizgi üzerinde
                ince bir parlama akar. Detay yalnızca odaklanınca çalışır. */}
            <div className="route-card mt-16 rounded-2xl border border-line bg-surface p-8 lg:p-12">
              {/* Hat çizgisi: iki uç durak ve arasındaki mesafe */}
              <div className="flex items-center gap-4 lg:gap-8">
                <div className="route-city route-city--ist shrink-0">
                  <span className="route-code tabular text-[11px] font-medium uppercase tracking-[0.16em] text-faint">
                    IST
                  </span>
                  <p className="route-name mt-1.5 text-heading font-semibold tracking-tight">
                    İstanbul
                  </p>
                </div>

                <div className="route-rail relative flex-1" aria-hidden="true">
                  <div className="route-line relative h-px w-full overflow-hidden bg-line-strong">
                    <span className="route-sheen absolute inset-y-0 left-0 w-1/3" />
                  </div>
                  <span className="route-stop absolute left-0 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-surface" />
                  <span className="route-stop absolute right-0 top-1/2 size-2.5 translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-surface" />
                  {/* Sarmalayıcı hattın tam genişliği kadar; yüzdelik taşıma
                      kendi genişliğine göre hesaplandığı için nokta uçtan uca
                      yalnızca transform ile gidiyor — düzen hesabı yok. */}
                  <span className="route-runner absolute inset-x-0 top-1/2 block -translate-y-1/2">
                    <span className="route-dot absolute left-0 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
                  </span>
                </div>

                <div className="route-city route-city--ank shrink-0 text-right">
                  <span className="route-code tabular text-[11px] font-medium uppercase tracking-[0.16em] text-faint">
                    ANK
                  </span>
                  <p className="route-name mt-1.5 text-heading font-semibold tracking-tight">
                    Ankara
                  </p>
                </div>
              </div>

              <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
                {routeFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between sm:block"
                  >
                    <dt className="text-sm text-muted">{fact.label}</dt>
                    <dd className="tabular text-lg font-semibold tracking-tight text-ink sm:mt-1.5">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Güvence + görsel */}
      <section className="shell mt-32 lg:mt-40">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Neden {site.name}</p>
            <h2 className="mt-6 text-title font-semibold text-balance">
              Aracınızı teslim ettiğiniz an, endişeniz bizde kalır.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              1997&apos;den bu yana aynı hattı sürüyoruz. Bu sürede öğrendiğimiz
              tek şey var: müşteriyi rahatlatan hız değil, ne olacağını önceden
              bilmek.
            </p>

            <ul className="mt-12 space-y-10">
              {assurances.map((item) => (
                <li key={item.title} className="flex gap-5">
                  <item.icon
                    className="mt-0.5 size-5 shrink-0 text-ink"
                    strokeWidth={1.4}
                  />
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
            <Figure
              ratio="4 / 5"
              alt="Çakır Lojistik ekibi araç yüklerken"
              hint="Dikey portre: ekipten biri aracı taşıyıcıya yüklerken ya da bağlarken. İnsan yüzü olan kareler daha çok güven verir. Önerilen: 1200×1500 px"
              sizes="(min-width: 1024px) 50vw, 100vw"
              rounded="rounded-2xl"
              className="zoom-media"
            />
          </Reveal>
        </div>
      </section>

      {/* Süreç */}
      <section className="shell mt-32 lg:mt-40">
        <SectionHeader
          eyebrow="Süreç"
          title="Dört adım, sürpriz yok."
          description="İlk aramadan teslim belgesine kadar izlediğimiz yol her taşımada aynı."
        />

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item, i) => (
            <Reveal key={item.step} as="li" delay={i * 70}>
              <div className="rule-mark relative border-t border-line pt-6">
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
      </section>

      {/* Kapanış çağrısı */}
      <section className="shell mt-32 pb-24 lg:mt-40 lg:pb-32">
        <Reveal>
          <div className="rounded-3xl border border-line bg-canvas-alt px-8 py-16 lg:px-16 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="text-title font-semibold text-balance">
                Güzergâhı ve tarihi söyleyin, fiyatı aynı gün iletelim.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
                Teklif için araç sayısı, alınacağı ve teslim edileceği adres ile
                tahmini tarih yeterli. Bağlayıcı değil.
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  "Ücretsiz fiyat teklifi",
                  "Aynı gün dönüş",
                  "Yazılı teslim tarihi",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-ink-soft"
                  >
                    <Check className="size-4 shrink-0 text-ink" strokeWidth={1.6} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href="/iletisim">Teklif alın</Button>
                <Button href="/hakkimizda" variant="outline">
                  Bizi tanıyın
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
