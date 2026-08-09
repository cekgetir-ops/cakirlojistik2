"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { oturumAc, oturumKapat, oturumVarMi, parolaDogruMu } from "@/lib/auth";
import {
  benzersizSlug,
  TUR_KOK,
  type Durum,
  type IcerikTuru,
} from "@/lib/content";
import { bakimMesajiAyarla, bakimModuAyarla } from "@/lib/ayarlar";

/** Her yazma işleminden önce oturum kontrolü — istemciye güvenilmez. */
async function korumaliyiz() {
  if (!(await oturumVarMi())) redirect("/admin/giris");
}

/** Değişen içeriğin göründüğü tüm yolları tazeler. */
function tazele(type: IcerikTuru, slug?: string) {
  revalidatePath("/admin");
  revalidatePath(TUR_KOK[type]);
  if (slug) revalidatePath(`${TUR_KOK[type]}/${slug}`);
}

/* ------------------------------------------------------------------ */
/* Oturum                                                              */
/* ------------------------------------------------------------------ */

export async function girisYap(_onceki: string | null, form: FormData) {
  const parola = String(form.get("parola") ?? "");
  if (!parolaDogruMu(parola)) return "Parola hatalı.";
  await oturumAc();
  redirect("/admin");
}

export async function cikisYap() {
  await oturumKapat();
  redirect("/admin/giris");
}

/* ------------------------------------------------------------------ */
/* İçerik (blog + hizmet bölgeleri)                                    */
/* ------------------------------------------------------------------ */

function formdanIcerik(form: FormData) {
  return {
    title: String(form.get("title") ?? "").trim(),
    excerpt: String(form.get("excerpt") ?? "").trim() || null,
    body: String(form.get("body") ?? ""),
    imageUrl: String(form.get("imageUrl") ?? "").trim() || null,
    imageAlt: String(form.get("imageAlt") ?? "").trim() || null,
    status: (String(form.get("status") ?? "DRAFT") as Durum),
    order: Number(form.get("order") ?? 0) || 0,
  };
}

export async function icerikKaydet(_onceki: string | null, form: FormData) {
  await korumaliyiz();

  const id = String(form.get("id") ?? "") || null;
  const type = String(form.get("type") ?? "BLOG") as IcerikTuru;
  const veri = formdanIcerik(form);

  if (!veri.title) return "Başlık zorunlu.";

  // Slug boş bırakılırsa başlıktan üretiliyor; her hâlükârda benzersizleştiriliyor.
  const istenenSlug = String(form.get("slug") ?? "").trim() || veri.title;
  const slug = await benzersizSlug(type, istenenSlug, id ?? undefined);

  if (id) {
    const eski = await prisma.content.findUnique({ where: { id }, select: { slug: true } });
    await prisma.content.update({ where: { id }, data: { ...veri, slug } });
    if (eski && eski.slug !== slug) tazele(type, eski.slug);
  } else {
    await prisma.content.create({ data: { ...veri, slug, type } });
  }

  tazele(type, slug);
  redirect(`/admin/icerik/${type.toLowerCase()}`);
}

export async function icerikDurumDegistir(id: string, status: Durum) {
  await korumaliyiz();
  const kayit = await prisma.content.update({
    where: { id },
    data: { status },
    select: { type: true, slug: true },
  });
  tazele(kayit.type as IcerikTuru, kayit.slug);
}

export async function icerikSil(id: string) {
  await korumaliyiz();
  const kayit = await prisma.content.delete({
    where: { id },
    select: { type: true, slug: true },
  });
  tazele(kayit.type as IcerikTuru, kayit.slug);
}

/* ------------------------------------------------------------------ */
/* Referanslar                                                         */
/* ------------------------------------------------------------------ */

export async function referansKaydet(_onceki: string | null, form: FormData) {
  await korumaliyiz();

  const id = String(form.get("id") ?? "") || null;
  const veri = {
    name: String(form.get("name") ?? "").trim(),
    href: String(form.get("href") ?? "").trim(),
    logo: String(form.get("logo") ?? "").trim() || null,
    tone: String(form.get("tone") ?? "dark"),
    visible: form.get("visible") === "on",
    order: Number(form.get("order") ?? 0) || 0,
  };

  if (!veri.name) return "Firma adı zorunlu.";

  if (id) await prisma.partner.update({ where: { id }, data: veri });
  else await prisma.partner.create({ data: veri });

  revalidatePath("/");
  revalidatePath("/admin/referanslar");
  redirect("/admin/referanslar");
}

export async function referansGorunurlukDegistir(id: string, visible: boolean) {
  await korumaliyiz();
  await prisma.partner.update({ where: { id }, data: { visible } });
  revalidatePath("/");
  revalidatePath("/admin/referanslar");
}

export async function referansSil(id: string) {
  await korumaliyiz();
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/referanslar");
}

/* ------------------------------------------------------------------ */
/* Bakım modu                                                          */
/* ------------------------------------------------------------------ */

export async function bakimModuDegistir(acik: boolean) {
  await korumaliyiz();
  await bakimModuAyarla(acik);
  // Bakım kabuğu (site) düzeninde karar veriliyor; tüm ziyaretçi
  // sayfalarının yeniden üretilmesi gerekiyor.
  revalidatePath("/", "layout");
  revalidatePath("/admin/bakim");
}

export async function bakimMesajiKaydet(_onceki: string | null, form: FormData) {
  await korumaliyiz();

  const mesaj = String(form.get("mesaj") ?? "").trim();
  if (mesaj.length < 10) return "Mesaj en az 10 karakter olmalı.";

  await bakimMesajiAyarla(mesaj);
  revalidatePath("/", "layout");
  revalidatePath("/admin/bakim");
  return "Mesaj kaydedildi.";
}
