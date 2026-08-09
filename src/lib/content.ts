import "server-only";
import { prisma } from "./db";
import { slugla, type IcerikTuru } from "./icerik-sabitleri";

// Etiketler ve saf yardımcılar `icerik-sabitleri.ts` içinde; buradan da
// yeniden dışa aktarılıyor ki sunucu tarafındaki dosyalar tek yerden alsın.
export * from "./icerik-sabitleri";

/** Aynı tür içinde çakışmayan bir slug döndürür (-2, -3 … ekleyerek). */
export async function benzersizSlug(
  type: IcerikTuru,
  istenen: string,
  hariçId?: string,
) {
  const kok = slugla(istenen) || "icerik";
  let aday = kok;
  let n = 2;

  for (;;) {
    const mevcut = await prisma.content.findFirst({
      where: { type, slug: aday, ...(hariçId ? { NOT: { id: hariçId } } : {}) },
      select: { id: true },
    });
    if (!mevcut) return aday;
    aday = `${kok}-${n++}`;
  }
}

/** Ön yüz listeleri — yalnızca yayındakiler. */
export function yayindakiler(type: IcerikTuru) {
  return prisma.content.findMany({
    where: { type, status: "PUBLISHED" },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export function yayindakiTek(type: IcerikTuru, slug: string) {
  return prisma.content.findFirst({
    where: { type, slug, status: "PUBLISHED" },
  });
}

/** Panel listesi — her durumdaki içerik. */
export function tumIcerik(type: IcerikTuru) {
  return prisma.content.findMany({
    where: { type },
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  });
}

export function icerikById(id: string) {
  return prisma.content.findUnique({ where: { id } });
}

/** Ön yüzdeki kayan şerit — yalnızca görünür olanlar. */
export function gorunurReferanslar() {
  return prisma.partner.findMany({
    where: { visible: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export function tumReferanslar() {
  return prisma.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export function referansById(id: string) {
  return prisma.partner.findUnique({ where: { id } });
}
