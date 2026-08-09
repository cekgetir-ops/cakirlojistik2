import "server-only";
import { prisma } from "./db";

/**
 * Site geneli ayarlar.
 *
 * Anahtar/değer olarak tutuluyor; yeni bir ayar eklemek için migration
 * gerekmiyor. Şu an yalnızca bakım modu var.
 */

export const BAKIM_ANAHTARI = "bakim_modu";
export const BAKIM_MESAJ_ANAHTARI = "bakim_mesaji";

export const BAKIM_VARSAYILAN_MESAJ =
  "Sitede birkaç iyileştirme yapıyoruz. Sefer planlama ve teklif tarafını elden geçiriyoruz, işimiz kısa sürede biter. Bu sırada aracınız yolda beklemesin: telefon hattımız her zamanki gibi açık.";

async function ayarOku(anahtar: string) {
  const kayit = await prisma.ayar.findUnique({ where: { key: anahtar } });
  return kayit?.value ?? null;
}

async function ayarYaz(anahtar: string, deger: string) {
  await prisma.ayar.upsert({
    where: { key: anahtar },
    update: { value: deger },
    create: { key: anahtar, value: deger },
  });
}

export async function bakimModuAcikMi() {
  return (await ayarOku(BAKIM_ANAHTARI)) === "1";
}

export async function bakimMesaji() {
  return (await ayarOku(BAKIM_MESAJ_ANAHTARI)) || BAKIM_VARSAYILAN_MESAJ;
}

export async function bakimModuAyarla(acik: boolean) {
  await ayarYaz(BAKIM_ANAHTARI, acik ? "1" : "0");
}

export async function bakimMesajiAyarla(mesaj: string) {
  await ayarYaz(BAKIM_MESAJ_ANAHTARI, mesaj.trim());
}
