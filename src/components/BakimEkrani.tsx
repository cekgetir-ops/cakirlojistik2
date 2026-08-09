import { Mark } from "./Logo";
import { Phone } from "./icons";
import { contact, site } from "@/lib/site";

/**
 * Açılış ekranı.
 *
 * Site yayına hazırlanırken ziyaretçinin gördüğü sayfa. Amaç "kapalıyız"
 * demek değil, açılışın yaklaştığını hissettirmek; bu yüzden ekran
 * sürekli hareket hâlinde.
 *
 * Katmanlar:
 *   1. Arkada çok düşük yoğunlukta süzülen ışık alanları
 *   2. Sayfa açılışında satır satır yükselen giriş
 *   3. Güzergâh rayı: iki şehir ucu ve üzerinde karşılıklı giden ışıklar
 *   4. Sırayla işaretlenen hazırlık listesi
 *   5. Altta kayan hizmet şeridi
 *
 * Hepsi CSS ile dönüyor; JavaScript kapalıyken de çalışır. Yalnızca
 * transform ve opacity değiştiği için compositor üzerinde kalıyor.
 * Tipografi ve renk paleti sitenin geri kalanıyla birebir aynı.
 */

const hazirlik = [
  "Sefer takvimi kuruldu",
  "Otopark kayıtları aktarıldı",
  "Teklif formu bağlandı",
  "Son kontroller sürüyor",
];

const seritOgeleri = [
  "Çoklu araç taşıma",
  "Yol yardım",
  "Otopark",
  "Kurumsal filo",
  "Kaskolu taşıma",
  "Yazılı teslim tarihi",
];

const rakamlar = [
  { deger: "1997", etiket: "kuruluş yılı" },
  { deger: "2", etiket: "otopark tesisi" },
  { deger: "81", etiket: "il" },
];

export default function BakimEkrani({ mesaj }: { mesaj: string }) {
  return (
    <main className="acilis relative flex min-h-dvh flex-col overflow-hidden">
      {/* Arka plan: süzülen ışık alanları + nokta dokusu */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="acilis-isik acilis-isik--1" />
        <span className="acilis-isik acilis-isik--2" />
        <span className="acilis-isik acilis-isik--3" />
        <span className="dotted absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_20%,transparent_75%)]" />
      </div>

      <div className="shell relative flex flex-1 items-center py-20">
        <div className="grid w-full gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
          {/* Sol sütun */}
          <div>
            <span
              className="acilis-gir inline-flex size-11 items-center justify-center rounded-2xl border border-line bg-surface"
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <Mark className="size-6 text-ink" />
            </span>

            <p
              className="acilis-gir acilis-rozet mt-8"
              style={{ "--d": "80ms" } as React.CSSProperties}
            >
              <span aria-hidden="true" className="acilis-nokta" />
              Yakında açılıyoruz
            </p>

            <h1 className="mt-7 text-display font-semibold text-balance">
              <span
                className="acilis-gir block"
                style={{ "--d": "160ms" } as React.CSSProperties}
              >
                Yola çıkmaya
              </span>
              <span
                className="acilis-gir block"
                style={{ "--d": "260ms" } as React.CSSProperties}
              >
                az kaldı.
              </span>
            </h1>

            <p
              className="acilis-gir mt-7 max-w-lg text-lead text-muted"
              style={{ "--d": "380ms" } as React.CSSProperties}
            >
              {mesaj}
            </p>

            <div
              className="acilis-gir mt-10 flex flex-wrap items-center gap-3"
              style={{ "--d": "480ms" } as React.CSSProperties}
            >
              <a
                href={contact.phone.href}
                className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-canvas transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                <Phone className="size-4" />
                <span className="tabular">{contact.phone.label}</span>
              </a>
              <a
                href={contact.email.href}
                className="rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-canvas-alt"
              >
                Bize yazın
              </a>
            </div>

            <dl
              className="acilis-gir mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8"
              style={{ "--d": "580ms" } as React.CSSProperties}
            >
              {rakamlar.map((r) => (
                <div key={r.etiket}>
                  <dt className="sr-only">{r.etiket}</dt>
                  <dd>
                    <span className="tabular block text-heading font-semibold tracking-tight text-ink">
                      {r.deger}
                    </span>
                    <span className="mt-1.5 block text-sm text-muted">
                      {r.etiket}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sağ sütun: güzergâh rayı + hazırlık listesi */}
          <div
            className="acilis-gir acilis-panel"
            style={{ "--d": "320ms" } as React.CSSProperties}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-eyebrow uppercase tracking-[0.16em] text-faint">
                  IST
                </p>
                <p className="mt-1.5 text-lg font-semibold tracking-tight">
                  İstanbul
                </p>
              </div>
              <div className="text-right">
                <p className="text-eyebrow uppercase tracking-[0.16em] text-faint">
                  ANK
                </p>
                <p className="mt-1.5 text-lg font-semibold tracking-tight">
                  Ankara
                </p>
              </div>
            </div>

            {/* Ray: uçlarda nabız, üzerinde karşılıklı giden ışıklar */}
            <div className="acilis-ray mt-6" aria-hidden="true">
              <span className="acilis-uc acilis-uc--sol" />
              <span className="acilis-uc acilis-uc--sag" />
              <span className="acilis-arac acilis-arac--gidis" />
              <span className="acilis-arac acilis-arac--donus" />
            </div>

            {/* Hazırlık listesi: sırayla işaretleniyor */}
            <ul className="mt-10 grid gap-3.5" aria-hidden="true">
              {hazirlik.map((h, i) => (
                <li
                  key={h}
                  className="acilis-satir"
                  style={{ "--sira": i } as React.CSSProperties}
                >
                  <span className="acilis-kutu">
                    <svg viewBox="0 0 24 24" fill="none" className="size-3">
                      <path
                        d="m5 12.5 4.5 4.5L19 7.5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <p className="sr-only">
              Açılış hazırlıkları sürüyor. Telefon ve e posta ile
              ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Alt şerit: hizmetler kesintisiz kayıyor */}
      <div className="acilis-serit relative" aria-hidden="true">
        <div className="acilis-serit-ray">
          {[0, 1].map((kopya) => (
            <div key={kopya} className="acilis-serit-set">
              {seritOgeleri.map((s) => (
                <span key={s}>
                  {s}
                  <i className="acilis-serit-ayrac" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="shell relative pb-8 text-[13px] text-faint">
        {site.legalName} · {site.founded}&apos;den beri yoldayız
      </p>
    </main>
  );
}
