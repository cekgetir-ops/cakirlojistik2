"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisAbone } from "@/lib/lenis-kayit";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Yapılandırma                                                        */
/* ------------------------------------------------------------------ */

const KARE_SAYISI = 300;
const KARE_YOLU = (n: number) =>
  `/images/truck-sequence/frame_${String(n).padStart(3, "0")}.webp`;

/**
 * Dört sahne, dört kamera hareketi.
 *
 * `bas` ve `bit` bölümün kaydırma ilerlemesindeki (0 ile 1) aralık;
 * kare dizisi bu aralıklarla birebir örtüşecek şekilde üretildi.
 * Metinler kendi aralıklarının içinde girip çıkıyor, böylece her sahne
 * kendi cümlesiyle eşleşiyor.
 */
const sahneler = [
  {
    bas: 0,
    bit: 0.25,
    baslik: "Dev kapasite, kusursuz operasyon.",
    metin:
      "Tek çekicide iki kat, sekiz araç. Yükleme sırası, bağlama düzeni ve teslim planı daha yola çıkmadan belli.",
    yon: "sol" as const,
  },
  {
    bas: 0.25,
    bit: 0.5,
    baslik: "Sıfır risk, özel spanzet sistemi.",
    metin:
      "Her araç tekerlekten sabitleniyor, gövdeye kayış temas etmiyor. Taşıma boyunca kasko kapsamı kesintisiz.",
    yon: "sag" as const,
  },
  {
    bas: 0.5,
    bit: 0.75,
    baslik: "Filonuz tek seferde yola çıkar.",
    metin:
      "Hidrolik rampa ve ayarlanabilir üst kat sayesinde sedan, SUV ve ticari araç aynı seferde taşınır.",
    yon: "sol" as const,
  },
  {
    bas: 0.75,
    bit: 1,
    baslik: "İstanbul Ankara hattında kesintisiz lojistik.",
    metin:
      "İki uçta da kendi otoparkımız var. Araç bekletilebiliyor, sefer planı bizim takvimimize göre kuruluyor.",
    yon: "sag" as const,
  },
];

/* ------------------------------------------------------------------ */

export default function StoryTelling() {
  const bolumRef = useRef<HTMLElement>(null);
  const tuvalRef = useRef<HTMLCanvasElement>(null);
  const sahneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ilerlemeRef = useRef<HTMLSpanElement>(null);
  const kapanisRef = useRef<HTMLDivElement>(null);

  const [yukleme, setYukleme] = useState(0);
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    const bolum = bolumRef.current;
    const tuval = tuvalRef.current;
    if (!bolum || !tuval) return;

    const ctx = tuval.getContext("2d", { alpha: false });
    if (!ctx) return;

    let iptal = false;
    const kareler: HTMLImageElement[] = [];
    let kullanilabilir = 0;
    let ilerleme = 0;

    /* --- Tuval ölçüsü ------------------------------------------------ */
    const olcekle = () => {
      const oran = Math.min(window.devicePixelRatio || 1, 2);
      const r = tuval.getBoundingClientRect();
      tuval.width = Math.round(r.width * oran);
      tuval.height = Math.round(r.height * oran);
      ctx.setTransform(oran, 0, 0, oran, 0, 0);
      ciz();
    };

    /* --- Çizim: object-fit cover karşılığı --------------------------- */
    const ciz = () => {
      const r = tuval.getBoundingClientRect();
      if (!r.width || !r.height || kullanilabilir === 0) return;

      const i = Math.min(
        kullanilabilir - 1,
        Math.max(0, Math.round(ilerleme * (kullanilabilir - 1))),
      );
      const g = kareler[i];
      if (!g?.complete || !g.naturalWidth) return;

      const oranTuval = r.width / r.height;
      const oranGorsel = g.naturalWidth / g.naturalHeight;
      let sg = g.naturalWidth;
      let sy = g.naturalHeight;
      let sx = 0;
      let sy0 = 0;
      if (oranGorsel > oranTuval) {
        sg = g.naturalHeight * oranTuval;
        sx = (g.naturalWidth - sg) / 2;
      } else {
        sy = g.naturalWidth / oranTuval;
        sy0 = (g.naturalHeight - sy) / 2;
      }
      ctx.drawImage(g, sx, sy0, sg, sy, 0, 0, r.width, r.height);
    };

    /* --- Ön yükleme ---------------------------------------------------
       Kareler scroll sırasında geç gelirse dizide boşluk oluşuyor ve
       görüntü zıplıyor; bu yüzden hepsi baştan indiriliyor.

       İndirme sırayla değil, sınırlı sayıda eşzamanlı istekle yapılıyor:
       300 isteği aynı anda açmak tarayıcının bağlantı havuzunu tıkayıp
       ilk karenin gelmesini de geciktiriyor.                           */
    const onYukle = async () => {
      const ilkVarMi = await new Promise<boolean>((coz) => {
        const g = new Image();
        g.onload = () => coz(true);
        g.onerror = () => coz(false);
        g.src = KARE_YOLU(1);
      });
      if (!ilkVarMi || iptal) {
        if (!iptal) setHazir(true); // dizi yoksa bölüm sessizce boş kalır
        return;
      }

      let tamamlanan = 0;
      const kuyruk = Array.from({ length: KARE_SAYISI }, (_, i) => i);
      const ES_ZAMANLI = 8;

      const isci = async () => {
        for (;;) {
          const i = kuyruk.shift();
          if (i === undefined || iptal) return;
          await new Promise<void>((coz) => {
            const g = new Image();
            g.decoding = "async";
            const bitir = () => {
              tamamlanan++;
              if (!iptal) setYukleme(tamamlanan / KARE_SAYISI);
              coz();
            };
            g.onload = () => {
              kareler[i] = g;
              if (i === 0) {
                kullanilabilir = 1;
                ciz();
              }
              bitir();
            };
            g.onerror = bitir;
            g.src = KARE_YOLU(i + 1);
          });
        }
      };

      await Promise.all(Array.from({ length: ES_ZAMANLI }, isci));
      if (iptal) return;

      let ardisik = 0;
      while (ardisik < KARE_SAYISI && kareler[ardisik]) ardisik++;
      kullanilabilir = ardisik;
      setHazir(true);
      ciz();
      ScrollTrigger.refresh();
    };

    void onYukle();

    /* --- Pin + scrub --------------------------------------------------
       Bölüm ekranda sabitlenirken dört ekran boyu kaydırma tüketiyor;
       her sahneye bir ekran düşüyor.

       Tümü `gsap.context` içinde kuruluyor: temizlikte `revert()` hem
       tetikleyicileri kapatıyor hem de GSAP'ın yazdığı satır içi
       stilleri geri alıyor. Yalnızca `kill()` çağrıldığında stiller
       son değerinde kalıyor ve geliştirmede efekt iki kez çalıştığı
       için bir sahne eski `opacity: 1` değerinde takılıp bir sonrakiyle
       aynı anda görünüyordu.                                           */
    const ctxGsap = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bolum,
        start: "top top",
        end: "+=400%",
        pin: true,
        pinSpacing: true,
        scrub: 0.7,
        onUpdate: (kendi) => {
          ilerleme = kendi.progress;
          ciz();
          if (ilerlemeRef.current) {
            ilerlemeRef.current.style.transform = `scaleX(${kendi.progress})`;
          }
        },
      },
    });

    // Çizelge süresi 1'e sabitleniyor; sahne aralıkları doğrudan
    // ilerleme değeri olarak yazılabilsin diye.
    tl.to({}, { duration: 1 }, 0);

    /* --- Metin girişleri ---------------------------------------------
       Her sahne kendi aralığında kenardan içeri süzülüp, aralık
       dolmadan biraz önce geri çekiliyor. Aynı çizelgeye bağlı
       oldukları için görüntüyle senkron kalıyorlar.                    */
    sahneRefs.current.forEach((el, i) => {
      if (!el) return;
      const s = sahneler[i];
      const yon = s.yon === "sol" ? -1 : 1;
      const sure = s.bit - s.bas;

      tl.fromTo(
        el,
        { opacity: 0, x: 56 * yon, y: 26 },
        { opacity: 1, x: 0, y: 0, ease: "power2.out", duration: sure * 0.34 },
        s.bas + sure * 0.06,
      ).to(
        el,
        { opacity: 0, y: -22, ease: "power2.in", duration: sure * 0.22 },
        s.bas + sure * 0.74,
      );
    });

    /* --- Kapanış perdesi ----------------------------------------------
       Bölümün son diliminde sayfa zemini renginde bir perde açılıyor.
       Böylece dizi bittiğinde tuval siyah bir blok olarak kalmıyor,
       görüntü sayfanın zeminine karışarak bitiyor ve bir sonraki bölüme
       kesme olmadan devam ediyor.                                       */
    if (kapanisRef.current) {
      tl.fromTo(
        kapanisRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power1.in", duration: 0.14 },
        0.86,
      );
    }
    }, bolum);

    /* --- Lenis ile senkron -------------------------------------------- */
    const aboneligiBirak = lenisAbone((lenis) => {
      lenis.on("scroll", ScrollTrigger.update);
    });

    olcekle();
    window.addEventListener("resize", olcekle);

    return () => {
      iptal = true;
      window.removeEventListener("resize", olcekle);
      aboneligiBirak();
      // revert(): tetikleyicileri kapatır ve GSAP'ın yazdığı satır içi
      // stilleri geri alır, böylece kart eski opaklığında takılı kalmaz.
      ctxGsap.revert();
    };
  }, []);

  const yuzde = Math.round(yukleme * 100);

  return (
    <section
      ref={bolumRef}
      aria-label="Taşıma sürecinin görsel anlatımı"
      className="relative h-dvh overflow-hidden bg-canvas"
    >
      <canvas ref={tuvalRef} className="absolute inset-0 size-full" aria-hidden="true" />

      {/* Kenar geçişleri.
          Görüntü sayfa zemininden keskin bir kutu gibi ayrılmasın diye
          üstte ve altta zemin renginden şeffafa inen bir bant var. Alt
          bant daha uzun: bölüm aşağı doğru sayfaya karışarak bitiyor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-canvas via-canvas/60 to-transparent lg:h-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-canvas via-canvas/70 to-transparent lg:h-64"
      />

      {/* Kapanış perdesi: son dilimde açılıp görüntüyü sayfa zeminine
          bağlıyor. Opaklığı zaman çizelgesi sürüyor. */}
      <div
        ref={kapanisRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-canvas opacity-0"
      />

      {/* Sahne metinleri: hepsi üst üste duruyor, sırayla görünüyorlar */}
      <div className="pointer-events-none absolute inset-0">
        <div className="shell relative flex h-full items-center">
          {sahneler.map((s, i) => (
            <div
              key={s.baslik}
              ref={(el) => {
                sahneRefs.current[i] = el;
              }}
              className={`absolute w-[min(27rem,86vw)] ${
                s.yon === "sol" ? "left-6 lg:left-10" : "right-6 lg:right-10"
              }`}
            >
              <div className="cam-kart p-6 lg:p-7">
                <p className="eyebrow">
                  {String(i + 1).padStart(2, "0")} / 04
                </p>
                <h2 className="mt-5 text-heading font-semibold text-balance text-ink">
                  {s.baslik}
                </h2>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {s.metin}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* İlerleme çubuğu: bölümün neresinde olunduğunu gösteriyor */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
        <span
          ref={ilerlemeRef}
          className="block h-full origin-left scale-x-0 bg-accent"
        />
      </div>

      {/* Kare dizisi inerken ince bir gösterge */}
      {!hazir && yuzde > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="tabular text-[13px] text-muted">%{yuzde}</p>
        </div>
      )}
    </section>
  );
}
