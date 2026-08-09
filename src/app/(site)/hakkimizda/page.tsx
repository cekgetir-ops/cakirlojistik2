import type { Metadata } from "next";
import Button from "@/components/Button";
import Figure from "@/components/Figure";
import Partners from "@/components/Partners";
import Reveal from "@/components/Reveal";
import { PageHeader, SectionHeader } from "@/components/Section";
import { Clock, Mail, Repeat, Shield, Tag, Users } from "@/components/icons";
import { contact, offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Şirket 1997 yılında Murat Çakır tarafından kuruldu. İstanbul Ankara hattında çoklu araç taşıma, yol yardım ve otopark hizmeti veriyoruz.",
};

const values = [
  {
    icon: Shield,
    title: "Kaskolu taşıma",
    description:
      "Her araç kasko kapsamında taşınır. Teslim alırken ve ederken tutanak tutulur, karşılıklı imzalanır.",
  },
  {
    icon: Clock,
    title: "Zamana saygı",
    description:
      "Teslim tarihini baştan yazıyoruz. Gecikme ihtimali doğarsa siz sormadan biz haber veriyoruz.",
  },
  {
    icon: Users,
    title: "Deneyimli kadro",
    description:
      "Yükleme, bağlama ve teslim süreçlerinin tamamı bu işi yıllardır yapan kendi ekibimizce yürütülür.",
  },
  {
    icon: Mail,
    title: "Tek muhatap",
    description:
      "Süreç boyunca aynı kişiyle konuşuyorsunuz. Her aramada durumu baştan anlatmak zorunda kalmıyorsunuz.",
  },
  {
    icon: Repeat,
    title: "Karşılıklı sefer",
    description:
      "İstanbul Ankara hattı iki yönlü işliyor. Tek araç için sefer dolmasını beklemiyorsunuz.",
  },
  {
    icon: Tag,
    title: "Şeffaf fiyat",
    description:
      "Verilen fiyat teslimde değişmiyor. Sonradan eklenen kalem ya da açıklanmamış masraf yok.",
  },
];

const milestones = [
  {
    year: "1997",
    text: `${site.founder} tarafından kuruluş; İstanbul Ankara hattında çoklu araç taşıma`,
  },
  { year: "2012", text: "Ankara Etimesgut'ta kendi otopark tesisimizin açılışı" },
  { year: "2023", text: "İstanbul Ataşehir'de ikinci otopark tesisinin açılışı" },
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hakkımızda"
        title="1997'den beri aynı hattı sürüyoruz."
        description="İstanbul Ankara hattında çoklu araç taşıma, yol yardım ve otopark hizmeti veren bir aile şirketi."
      />

      {/* Hikâye */}
      <section className="shell py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Hikâyemiz</p>
            <h2 className="mt-6 text-title font-semibold text-balance">
              Bir hatla başladı, disiplinle büyüdü.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
              <p>
                {site.name}, {site.founded} yılında {site.founder} tarafından
                kuruldu. İstanbul Ankara hattında çoklu araç taşıma hizmetiyle
                başlayan faaliyetlerimiz, yıllar içinde yol yardım ve otopark
                hizmetlerini de kapsayacak biçimde genişledi.
              </p>
              <p>
                Deneyimli kadromuzla araçlarınızı kaskolu olarak, tam zamanında
                ve güvenli biçimde taşıyoruz. Yükleme, bağlama ve teslim
                süreçlerinin tamamı kendi ekibimiz tarafından yürütülür; işin
                hiçbir aşaması dışarıya devredilmez.
              </p>
              <p>
                Ankara, İstanbul ve Türkiye&apos;nin diğer şehirlerindeki
                kurumsal müşterilerimize çözüm ortağı olarak hizmet veriyoruz.
                Birlikte çalıştığımız firmaları aşağıdaki referanslar
                bölümünden görebilirsiniz.
              </p>
              <p>
                Dürüst ve kaliteli hizmeti ilke edindik. Kurumsal filolara da,
                hayatında bir kez araç taşıtacak kişiye de aynı süreci
                uyguluyoruz. Farklı olan tek şey hacim.
              </p>
            </div>

            {/* Kurucu imzası */}
            <div className="mt-10 border-t border-line pt-6">
              <p className="text-[15px] leading-relaxed text-ink-soft">
                Bizi tercih ettiğiniz için teşekkür ederiz.
              </p>
              <p className="mt-4 text-[15px] font-semibold tracking-tight text-ink">
                {site.founder}
              </p>
              <p className="text-sm text-faint">Kurucu, {site.name}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Figure
              ratio="4 / 5"
              alt={`${site.founder}, ${site.name} kurucusu`}
              hint="Kurumsal portre: kurucunun sahadaki hâli ya da ekip fotoğrafı. Bu sayfada insan görmek güven veriyor. Önerilen: 1200×1500 px"
              sizes="(min-width: 1024px) 50vw, 100vw"
              rounded="rounded-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* Kilometre taşları */}
      <section className="border-y border-line bg-canvas-alt">
        <div className="shell py-20 lg:py-28">
          <SectionHeader
            eyebrow="Yol haritası"
            title="Nereden nereye"
            description="Hızlı büyümedik. Her adımı taşıyabileceğimizden emin olduktan sonra attık."
          />

          <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((item, i) => (
              <Reveal key={item.year} as="li" delay={i * 70}>
                <div className="border-t border-line-strong pt-6">
                  <span className="tabular text-heading font-semibold tracking-tight text-ink">
                    {item.year}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Değerler */}
      <section className="shell py-20 lg:py-28">
        <SectionHeader
          eyebrow="Değerlerimiz"
          title="Söylemesi kolay, uygulaması alışkanlık isteyen altı madde."
          description="Bunlar duvara asılmış sloganlar değil; işe alırken ve sefer planlarken baktığımız ölçüler."
        />

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={(i % 3) * 70}>
              <div className="border-t border-line pt-6">
                <value.icon className="size-6 text-ink" strokeWidth={1.4} />
                <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Kurumsal referanslar */}
      <Partners />

      {/* Tesisler */}
      <section className="shell py-20 lg:py-28">
        <SectionHeader
          eyebrow="Tesislerimiz"
          title="İki şehirde kendi otoparkımız var."
          description="Araçları bekletebildiğimiz için sefer planını kendi takvimimize göre kurabiliyoruz."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {offices.map((office, i) => (
            <Reveal key={office.id} delay={i * 90}>
              <div className="border-t border-line pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-heading font-semibold tracking-tight text-ink">
                    {office.label}
                  </h3>
                  <span className="tabular text-sm text-faint">
                    {office.sinceLabel}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {office.street}
                  <br />
                  {office.district}
                  {office.landmark && (
                    <>
                      <br />
                      <span className="text-faint">({office.landmark})</span>
                    </>
                  )}
                </p>
                <p className="mt-4 text-sm text-muted">
                  <span className="text-ink">{office.person}</span>
                  {" · "}
                  <a
                    href={office.phone.href}
                    className="tabular transition-colors hover:text-ink"
                  >
                    {office.phone.label}
                  </a>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="shell pb-20 lg:pb-28">
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            <div className="bg-canvas p-8 lg:p-12">
              <p className="eyebrow">Misyonumuz</p>
              <p className="mt-6 text-lead leading-relaxed text-ink-soft">
                Araç sahibinin aracını teslim ettikten sonra o araç aklına
                gelmesin. Süreci, sormaya gerek kalmayacak kadar öngörülebilir
                hâle getirmek.
              </p>
            </div>
            <div className="bg-canvas p-8 lg:p-12">
              <p className="eyebrow">Vizyonumuz</p>
              <p className="mt-6 text-lead leading-relaxed text-ink-soft">
                İstanbul Ankara hattındaki işleyişimizi Türkiye genelinde
                tekrarlanabilir bir standarda dönüştürmek; büyürken hizmet
                kalitesini bölmemek.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Kapanış */}
      <section className="shell pb-24 lg:pb-32">
        <Reveal>
          <div className="rounded-3xl border border-line bg-canvas-alt px-8 py-16 text-center lg:px-16">
            <h2 className="mx-auto max-w-2xl text-title font-semibold text-balance">
              Tanışalım mı?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted">
              Bir sorunuz varsa telefonun ucundayız. Teklif almak için bağlayıcı
              bir taahhüt gerekmiyor.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/iletisim">İletişime geçin</Button>
              <Button href={contact.phone.href} variant="outline" external>
                <span className="tabular">{contact.phone.label}</span>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
