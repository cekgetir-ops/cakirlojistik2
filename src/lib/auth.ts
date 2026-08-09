import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Panel girişi.
 *
 * Tek yöneticili bir site için kullanıcı tablosu fazladan yük olurdu:
 * parola ortam değişkeninde duruyor, giriş başarılı olunca HMAC ile
 * imzalanmış bir oturum çerezi yazılıyor. Çerez httpOnly ve imzalı
 * olduğu için içeriği okunamaz ve tarayıcıda üretilemez.
 *
 * Parolayı `.env` içindeki ADMIN_PASSWORD ile, imza anahtarını
 * AUTH_SECRET ile veriyorsunuz. İkisi de yayına almadan önce
 * mutlaka değiştirilmeli.
 */
const COOKIE = "sat_oturum";
const SURE_SN = 60 * 60 * 12; // 12 saat

function secret() {
  return process.env.AUTH_SECRET ?? "gelistirme-anahtari-degistirin";
}

function imzala(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Sabit süreli karşılaştırma — parola uzunluğu zamanlamadan sızmasın. */
function esitMi(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function parolaDogruMu(girilen: string) {
  const beklenen = process.env.ADMIN_PASSWORD;
  if (!beklenen) return false;
  return esitMi(girilen, beklenen);
}

export async function oturumAc() {
  const bitis = Date.now() + SURE_SN * 1000;
  const payload = String(bitis);
  const deger = `${payload}.${imzala(payload)}`;

  const jar = await cookies();
  jar.set(COOKIE, deger, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SURE_SN,
  });
}

export async function oturumKapat() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function oturumVarMi() {
  const jar = await cookies();
  const deger = jar.get(COOKIE)?.value;
  if (!deger) return false;

  const [payload, imza] = deger.split(".");
  if (!payload || !imza) return false;
  if (!esitMi(imza, imzala(payload))) return false;

  const bitis = Number(payload);
  return Number.isFinite(bitis) && bitis > Date.now();
}
