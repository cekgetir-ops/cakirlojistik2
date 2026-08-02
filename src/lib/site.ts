/**
 * Site geneli sabitler.
 *
 * İletişim bilgisi, menü ve kurumsal metinler tek yerde dursun diye burada.
 * İçerik güncellemesi gerektiğinde sayfaları açmadan sadece bu dosya değişir.
 */

export const site = {
  name: "Çakır Lojistik",
  legalName: "Çakır Lojistik",
  tagline: "Çoklu Araç Taşıma ve Otopark",
  description:
    "1997'den beri İstanbul–Ankara hattında çoklu araç taşıma, yol yardım ve otopark hizmeti. Kaskolu taşıma, zamanında teslim.",
  founded: 1997,
  founder: "Murat Çakır",
} as const;

export const nav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
] as const;

/**
 * Site genelinde tek iletişim kanalı kullanılıyor: firma sahibi Murat Çakır.
 * Başlık, alt bilgi, iletişim sayfası ve yasal sayfalar buradan besleniyor.
 */
export const contact = {
  person: "Murat Çakır",
  role: "Kurucu",
  phone: { label: "+90 (554) 699 10 93", href: "tel:+905546991093" },
  email: {
    label: "muratcakir061903@gmail.com",
    href: "mailto:muratcakir061903@gmail.com",
  },
} as const;

/** Adresi Google Haritalar aramasına çeviren yardımcı. */
function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Otopark tesisleri. Her tesisin kendi irtibat kişisi var; başlık ve alt bilgi
 * genel iletişimi (`contact`) kullanırken, iletişim sayfası tesis bazında
 * doğru kişiye yönlendiriyor.
 */
export const offices = [
  {
    id: "ankara",
    city: "Ankara",
    label: "Ankara Otopark",
    since: 2012,
    /** Ek ünlü/ünsüz uyumu yıla göre değiştiği için elle yazılıyor. */
    sinceLabel: "2012'den beri",
    street: "Bahçekapı, 2452 Sok, 06105",
    district: "Etimesgut / Ankara",
    /** Tarif için ek not; adresin altında küçük punto ile gösterilir. */
    landmark: "Protrans yanı",
    maps: mapsUrl("Bahçekapı 2452 Sokak 06105 Etimesgut Ankara"),
    person: "Murat Çakır",
    personRole: "Kurucu",
    phone: { label: "+90 (554) 699 10 93", href: "tel:+905546991093" },
    email: {
      label: "muratcakir061903@gmail.com",
      href: "mailto:muratcakir061903@gmail.com",
    },
  },
  {
    id: "istanbul",
    city: "İstanbul",
    label: "İstanbul Otopark",
    since: 2023,
    sinceLabel: "2023'ten beri",
    street: "Ferhatpaşa, Anadolu Cad. No:74, 34888",
    district: "Ataşehir / İstanbul",
    landmark: null,
    maps: mapsUrl("Ferhatpaşa Anadolu Caddesi No:74 34888 Ataşehir İstanbul"),
    person: "Şaban Çakır",
    personRole: "Tesis sorumlusu",
    phone: { label: "+90 (507) 860 71 19", href: "tel:+905078607119" },
    email: {
      label: "sabanncakirrr@gmail.com",
      href: "mailto:sabanncakirrr@gmail.com",
    },
  },
] as const;

export const hours = [
  { day: "Pazartesi – Cuma", time: "08:00 – 20:00" },
  { day: "Cumartesi", time: "09:00 – 18:00" },
  { day: "Pazar", time: "10:00 – 16:00" },
] as const;

export type Partner = {
  name: string;
  /** Firmanın kendi sitesi; logo bağlantılı gösterilir */
  href: string;
  /** `public/referanslar/` altındaki dosya yolu */
  logo: string | null;
  /**
   * Logonun kendi tonu — şerit tek renkli (grayscale) gösterdiği için
   * yalnızca ters çevirme gerekip gerekmediğini belirler:
   *   "dark"  → koyu renkli logo, açık zemin için tasarlanmış.
   *             Koyu temada ters çevrilir.
   *   "light" → açık/beyaz logo, koyu zemin için tasarlanmış.
   *             Açık temada ters çevrilir.
   * Değer her dosyanın ortalama parlaklığı ölçülerek belirlendi.
   */
  tone?: "dark" | "light";
};

/**
 * Kurumsal referanslar — kayan logo şeridini besler.
 *
 * LOGO DOSYALARI HENÜZ EKLENMEDİ. Her marka kendi logosunun telif sahibi
 * olduğu ve bu bölüm bir iş ilişkisi beyan ettiği için dosyalar firmalardan
 * (ya da marka kitlerinden) temin edilip buraya konmalı.
 *
 * Eklemek için:
 *   1. Şeffaf zeminli SVG'yi (yoksa 2x PNG) `public/referanslar/` içine koyun
 *   2. Aşağıda `logo` alanına yolunu yazın, ör. "/referanslar/arabam.svg"
 *   3. Logo koyu renkliyse açık varyantını da `logoDark` alanına ekleyin
 *
 * Logo verilmediği sürece firma adı nötr bir çerçeve içinde yazıyla görünür —
 * şeridin ritmi ve ölçüsü bozulmaz.
 */
export const partners: Partner[] = [
  // Arabam.com ve VavaCars logolarını şeffaf olarak alamadık; ikisi de
  // logoyu sayfa içine gömülü SVG sprite olarak servis ediyor ve
  // arabam'ın varyantında opak arka plan kutusu var. Dosyalar temin
  // edildiğinde `logo` alanına yolu yazmak yeterli.
  { name: "Arabam.com", href: "https://www.arabam.com", logo: null },
  {
    name: "Carvak",
    href: "https://www.carvak.com/tr",
    logo: "/referanslar/carvak.svg",
    tone: "dark",
  },
  { name: "VavaCars", href: "https://tr.vava.cars", logo: null },
  {
    name: "Elit Car Rental",
    href: "https://elitcarrental.com",
    logo: "/referanslar/elit.svg",
    tone: "dark",
  },
  {
    name: "En-Ka",
    href: "https://en-ka.com.tr",
    logo: "/referanslar/enka.svg",
    tone: "light",
  },
  {
    name: "Ankara Oto",
    href: "https://ankaraoto.com.tr",
    logo: "/referanslar/ankaraoto.png",
    tone: "light",
  },
  {
    name: "Çek Getir",
    href: "https://www.cekgetir.com",
    logo: "/referanslar/cekgetir.png",
    tone: "light",
  },
];
