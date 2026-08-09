import Button from "./Button";
import Figure from "./Figure";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

/**
 * Yalnızca doğrulanabilir bilgiler. Tahmini transfer sayısı veya memnuniyet
 * oranı gibi ölçülmemiş iddialar bilerek yok — firma gerçek rakamları
 * paylaştığında buraya eklenecek.
 */
const proof = [
  { value: "1997", label: "kuruluş yılı" },
  { value: "2", label: "otopark tesisi · Ankara ve İstanbul" },
  { value: "Kaskolu", label: "her araç sigorta kapsamında taşınır" },
  { value: "Çoklu", label: "tek seferde birden fazla araç" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 lg:pt-24">
      <div className="shell">
        <Reveal enter className="max-w-4xl">
          <p className="eyebrow">1997&apos;den beri İstanbul Ankara hattındayız</p>

          <h1 className="mt-7 text-display font-semibold text-balance">
            Araçlarınız
            <br />
            doğru ellerde.
          </h1>

          <p className="mt-7 max-w-xl text-lead text-muted">
            Çoklu araç taşıma, yol yardım ve otopark hizmetleri. Deneyimli
            kadromuzla araçlarınızı kaskolu olarak, tam zamanında taşıyoruz.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/iletisim">Teklif alın</Button>
            <Button href="/hizmetler" variant="quiet" className="ml-2">
              Hizmetleri inceleyin
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal enter delay={140} className="shell mt-16 lg:mt-20">
        <Figure
          ratio="21 / 9"
          alt="Yüklü araç taşıyıcı yola çıkarken"
          hint="Öne çıkan fotoğraf: yüklü araç taşıyıcı ya da otopark sahası. Geniş kadraj, yatay. Önerilen: 2400×1030 px"
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          rounded="rounded-2xl"
          className="zoom-media"
        />
      </Reveal>

      {/* Kanıt şeridi — görselin hemen altında, iddiayı rakamla bağlıyor */}
      <Reveal enter delay={260} className="shell mt-14 lg:mt-16">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="tabular block text-heading font-semibold tracking-tight text-ink">
                  {item.value}
                </span>
                <span className="mt-2 block max-w-40 text-sm leading-snug text-muted">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
