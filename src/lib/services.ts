import { Building, Carrier, ParkingSign, Wrench } from "@/components/icons";

/**
 * Hizmet tanımları. Hem ana sayfadaki özet hem hizmetler sayfasındaki
 * ayrıntılı liste bu tek kaynaktan besleniyor.
 */
export const services = [
  {
    id: "coklu-arac-tasima",
    icon: Carrier,
    title: "Çoklu Araç Taşıma",
    summary:
      "İstanbul Ankara hattında karşılıklı seferlerle çoklu araç taşıma. Araçlarınız kaskolu olarak yüklenir, planlanan günde teslim edilir.",
    features: [
      "İstanbul ve Ankara arası karşılıklı sefer",
      "Kasko kapsamında taşıma",
      "Tek seferde birden fazla araç",
      "Yazılı teslim tutanağı",
    ],
    figureHint:
      "Yüklü araç taşıyıcı: yolda ya da yükleme anında. Önerilen: 1600×1200 px",
  },
  {
    id: "yol-yardim",
    icon: Wrench,
    title: "Yol Yardım",
    summary:
      "Yolda kalan aracınız için çekici ve kurtarma desteği. Aracınızı bulunduğu noktadan alıp belirlediğiniz adrese ulaştırıyoruz.",
    features: [
      "Çekici ve kurtarma desteği",
      "Arıza ve kaza sonrası taşıma",
      "Şehir içi ve şehirler arası",
      "Taşıma boyunca sigorta kapsamı",
    ],
    figureHint:
      "Yol yardım: çekiciye yüklenen araç ya da saha ekibi. Önerilen: 1600×1200 px",
  },
  {
    id: "otopark",
    icon: ParkingSign,
    title: "Otopark Hizmeti",
    summary:
      "Ankara Etimesgut ve İstanbul Ataşehir'deki kendi tesislerimizde kısa ve uzun süreli araç park hizmeti.",
    features: [
      "İki şehirde kendi tesisimiz",
      "Kısa ve uzun süreli park",
      "Filo araçları için toplu park",
      "Transfer öncesi ve sonrası bekletme",
    ],
    figureHint:
      "Otopark sahası: sıralanmış araçlar ya da tesis girişi. Önerilen: 1600×1200 px",
  },
  {
    id: "kurumsal",
    icon: Building,
    title: "Kurumsal Çözüm Ortaklığı",
    summary:
      "Ankara, İstanbul ve Türkiye'nin diğer şehirlerindeki kurumsal müşterilerimize düzenli taşıma ve filo çözümleri sunuyoruz.",
    features: [
      "Çerçeve anlaşma ve hacim fiyatı",
      "Düzenli sefer planlaması",
      "Dönemsel faturalama ve mutabakat",
      "Tek muhatap üzerinden yürütme",
    ],
    figureHint:
      "Kurumsal: filo araçlarının sıralı hâli ya da operasyon görseli. Önerilen: 1600×1200 px",
  },
] as const;

export const process = [
  {
    step: "01",
    title: "İletişim",
    description:
      "Telefon ya da form üzerinden ulaşın; araç sayısı, güzergâh ve tarih yeterli.",
  },
  {
    step: "02",
    title: "Planlama",
    description:
      "Uygun sefer ve fiyatı aynı gün paylaşıyoruz. Onaylarsanız takvime alınıyor.",
  },
  {
    step: "03",
    title: "Taşıma",
    description:
      "Araç teslim alınırken tutanak tutulur, taşıma kasko kapsamında yapılır.",
  },
  {
    step: "04",
    title: "Teslim",
    description:
      "Belirlenen adreste teslim, karşılıklı kontrol ve imzalı teslim belgesi.",
  },
] as const;
