import Image from "next/image";
import Reveal from "./Reveal";
import { partners } from "@/lib/site";

/**
 * Kurumsal referanslar — kesintisiz kayan logo şeridi.
 *
 * Liste iki kez basılıyor: şerit tam yarısı kadar kaydığında başa döner ve
 * ikinci kopya o anda görünen alanı doldurduğu için sıçrama fark edilmez.
 * Kayma animasyonu CSS'te (`.marquee`), burada yalnızca içerik var.
 * İkinci kopya ekran okuyucudan gizleniyor ki liste iki kez okunmasın.
 */
function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
    >
      {partners.map((partner, i) => (
        <li
          key={`${partner.name}-${i}`}
          className="flex h-16 w-44 shrink-0 items-center justify-center px-6 sm:w-52"
        >
          {partner.logo ? (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={48}
              className="max-h-10 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            // Logo gelene kadar: nötr çerçeve içinde firma adı
            <span className="flex h-10 w-full items-center justify-center rounded-md border border-dashed border-line-strong text-[12px] text-faint">
              {partner.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  if (partners.length === 0) return null;

  return (
    // Zemin bilerek canvas: bir sonraki bölüm canvas-alt olduğunda ikisi tek
    // gri blok gibi kaynaşmasın; ayrıca logolar beyaz zeminde daha temiz durur.
    <section
      className="border-y border-line bg-canvas py-14 lg:py-16"
      aria-labelledby="referanslar-baslik"
    >
      <Reveal>
        <div className="shell">
          <p id="referanslar-baslik" className="eyebrow">
            Referanslarımız
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
            Ankara, İstanbul ve Türkiye&apos;nin diğer şehirlerindeki kurumsal
            müşterilerimize çözüm ortağı olarak hizmet veriyoruz.
          </p>
        </div>

        <div className="marquee mt-10">
          <div className="marquee-track">
            <Row />
            <Row duplicate />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
