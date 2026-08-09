import Image from "next/image";
import Reveal from "./Reveal";
import { gorunurReferanslar } from "@/lib/content";

type Referans = Awaited<ReturnType<typeof gorunurReferanslar>>[number];

/**
 * Kurumsal referanslar — kesintisiz kayan logo şeridi.
 *
 * Liste iki kez basılıyor: şerit tam yarısı kadar kaydığında başa döner ve
 * ikinci kopya o anda görünen alanı doldurduğu için sıçrama fark edilmez.
 * Kayma animasyonu CSS'te (`.marquee`), burada yalnızca içerik var.
 * İkinci kopya ekran okuyucudan gizleniyor ki liste iki kez okunmasın.
 */
function Row({
  partners,
  duplicate = false,
}: {
  partners: Referans[];
  duplicate?: boolean;
}) {
  /**
   * Şerit tam yarısı kadar kayıp başa döndüğü için bir "set" en az ekran
   * genişliği kadar olmalı; aksi halde dönüş anında sağda boşluk görünür.
   * Az sayıda firmada tek geçiş yetmediği için set iki kez basılıyor.
   */
  const setItems = [...partners, ...partners];

  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
    >
      {setItems.map((partner, i) => (
        <li
          key={`${partner.id}-${i}`}
          // Set içindeki ikinci kopya da ekran okuyucudan gizli: liste
          // görsel olarak tekrarlanıyor ama sesli olarak bir kez okunuyor.
          aria-hidden={i >= partners.length || undefined}
          className="flex h-16 w-44 shrink-0 items-center justify-center px-6 sm:w-52"
        >
          {partner.logo ? (
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              // Şerit kayarken tıklama hedefi kaçar; imleç üstündeyken
              // animasyon zaten duruyor (.marquee:hover), o yüzden sorun değil.
              className="logo-link flex items-center justify-center"
              tabIndex={duplicate ? -1 : undefined}
            >
              {/* Şerit logoları tek renkli gösteriyor; `logo-tone-*` sınıfı
                  yalnızca hangi temada ters çevrileceğini belirliyor.
                  İmleç üstündeyken logo kendi renklerine dönüyor. */}
              {/* Sabit kutu + object-contain: logolar farklı en/boy
                  oranlarında geliyor, hepsi aynı optik ağırlıkta dursun.
                  Ölçü sabit olduğu için görsel yüklenmeden önce de yer
                  kaplıyor — `w-auto` ile kutu 0 genişlikte kalıyor ve
                  lazy loading hiç tetiklenmiyordu. */}
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={48}
                unoptimized
                // Şerit sürekli kaydığı için lazy yükleme uygun değil:
                // ikinci kopya görünür alanın dışında duruyor ve kesişme
                // hiç oluşmayabiliyor — o zaman şeridin yarısı boş kayıyor.
                loading="eager"
                className={`logo-mark h-10 w-32 object-contain ${
                  partner.tone === "light" ? "logo-tone-light" : "logo-tone-dark"
                }`}
              />
            </a>
          ) : (
            // Logo gelene kadar: nötr çerçeve içinde firma adı
            <span className="flex h-10 w-full items-center justify-center rounded-md border border-dashed border-line-strong px-2 text-center text-[12px] leading-tight text-faint">
              {partner.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function Partners() {
  // Liste artık panelden yönetiliyor; kayıt yoksa bölüm hiç çizilmiyor.
  const partners = await gorunurReferanslar();
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
            <Row partners={partners} />
            <Row partners={partners} duplicate />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
