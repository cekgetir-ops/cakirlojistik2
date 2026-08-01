import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";
import { PageHeader } from "@/components/Section";
import { ArrowUpRight, MapPin } from "@/components/icons";
import { hours, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Çakır Lojistik iletişim bilgileri, Ankara (Etimesgut) ve İstanbul (Ataşehir) otopark adresleri ve teklif formu.",
};

export default function IletisimPage() {
  return (
    <>
      <PageHeader
        eyebrow="İletişim"
        title="Güzergâhı söyleyin, gerisini konuşalım."
        description="Teklif için araç sayısı, alınacağı ve teslim edileceği adres ile tahmini tarih yeterli. Formu doldurmak sizi bağlamaz."
      />

      <section className="shell py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="space-y-12">
              {/* Otopark tesisleri — her tesisin kendi irtibat kişisiyle */}
              <div>
                <p className="eyebrow">Otoparklarımız</p>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                  Hangi şehirden yazıyorsanız o tesisin sorumlusuna doğrudan
                  ulaşabilirsiniz. En hızlı dönüş telefonla olur.
                </p>
                <div className="mt-8 space-y-8">
                  {offices.map((office) => (
                    <div key={office.id} className="border-t border-line pt-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="text-base font-semibold tracking-tight text-ink">
                          {office.label}
                        </h2>
                        <span className="tabular text-sm text-faint">
                          {office.sinceLabel}
                        </span>
                      </div>

                      <div className="mt-3 flex gap-3">
                        <MapPin
                          className="mt-0.5 size-4 shrink-0 text-faint"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-muted">
                          {office.street}
                          <br />
                          {office.district}
                          {office.landmark && (
                            <>
                              <br />
                              <span className="text-faint">
                                ({office.landmark})
                              </span>
                            </>
                          )}
                          <br />
                          <a
                            href={office.maps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 inline-flex items-center gap-1 text-ink transition-colors hover:text-muted"
                          >
                            Haritada aç
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        </p>
                      </div>

                      {/* Tesis irtibatı */}
                      <div className="mt-4 space-y-2 border-l border-line pl-4">
                        <p className="text-sm font-medium text-ink">
                          {office.person}
                          <span className="ml-2 font-normal text-faint">
                            {office.personRole}
                          </span>
                        </p>
                        <a
                          href={office.phone.href}
                          className="tabular block text-sm text-ink transition-colors hover:text-muted"
                        >
                          {office.phone.label}
                        </a>
                        <a
                          href={office.email.href}
                          className="block text-sm break-all text-muted transition-colors hover:text-ink"
                        >
                          {office.email.label}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Çalışma saatleri */}
              <div>
                <h2 className="text-base font-semibold tracking-tight text-ink">
                  Çalışma saatleri
                </h2>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {hours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between py-3.5"
                    >
                      <dt className="text-sm text-muted">{item.day}</dt>
                      <dd className="tabular text-sm font-medium text-ink">
                        {item.time}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-faint">
                  Devam eden taşımalar için telefon hattımız her zaman açıktır.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Konum görselleri */}
      <section className="shell pb-24 lg:pb-32">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {offices.map((office) => (
              <div key={office.id}>
                <Figure
                  ratio="3 / 2"
                  alt={`${office.label} — ${office.district}`}
                  hint={`${office.city} otoparkının giriş fotoğrafı ya da konum haritası ekran görüntüsü. Önerilen: 1400×933 px`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  rounded="rounded-2xl"
                />
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="text-base font-semibold tracking-tight text-ink">
                    {office.label}
                  </h2>
                  <span className="text-sm text-muted">{office.district}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
