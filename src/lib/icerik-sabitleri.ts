/**
 * İçerik türleri ve etiketleri — veritabanına dokunmayan saf sabitler.
 *
 * Panel formları istemci bileşeni olduğu için bu değerleri `content.ts`
 * üzerinden alamıyor: o dosya Prisma'yı içeri çekiyor ve istemci paketine
 * SQLite sürücüsü sızıyor. Ortak olan her şey burada duruyor.
 */

export type IcerikTuru = "BLOG" | "REGION";
export type Durum = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export const DURUM_ETIKET: Record<Durum, string> = {
  PUBLISHED: "Yayınlandı",
  DRAFT: "Taslak",
  ARCHIVED: "Arşivlendi",
};

export const TUR_ETIKET: Record<IcerikTuru, string> = {
  BLOG: "Blog",
  REGION: "Hizmet Bölgesi",
};

/** Tür başına ön yüz kökü — bağlantılar buradan üretiliyor. */
export const TUR_KOK: Record<IcerikTuru, string> = {
  BLOG: "/blog",
  REGION: "/hizmet-bolgelerimiz",
};

/** Paneldeki URL parçasını ("blog" / "region") model türüne çevirir. */
export function turCoz(param: string): IcerikTuru | null {
  const h: Record<string, IcerikTuru> = { blog: "BLOG", region: "REGION" };
  return h[param.toLowerCase()] ?? null;
}

/**
 * Başlıktan URL parçası üretir.
 * Türkçe harfler ASCII karşılığına çevriliyor — aksi hâlde adres
 * yüzde kodlamasıyla okunmaz hâle geliyor.
 */
export function slugla(metin: string) {
  const harita: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", I: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return metin
    .split("")
    .map((h) => harita[h] ?? h)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
