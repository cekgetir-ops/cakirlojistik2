import type Lenis from "lenis";

/**
 * Çalışan Lenis örneğini paylaşan küçük kayıt.
 *
 * ScrollTrigger'ın kaydırma konumunu Lenis'ten alması gerekiyor. İkisi
 * ayrı ayrı dinlerse ScrollTrigger tarayıcının anlık scroll değerini,
 * Lenis ise kendi yumuşatılmış hedefini kullanıyor; aradaki fark
 * kare atlamalarına ve titremeye yol açıyor.
 *
 * SmoothScroll örneği kurunca buraya yazıyor, ihtiyacı olan bileşenler
 * `lenisAbone` ile bekliyor. Örnek zaten hazırsa geri çağrı hemen
 * çalışıyor; bileşenlerin mount sırası önemli olmasın diye.
 */
type Geri = (lenis: Lenis) => void;

let mevcut: Lenis | null = null;
const bekleyenler = new Set<Geri>();

export function lenisKaydet(lenis: Lenis | null) {
  mevcut = lenis;
  if (lenis) bekleyenler.forEach((g) => g(lenis));
}

/** Örnek hazır olduğunda çağrılır. Aboneliği bırakan fonksiyon döner. */
export function lenisAbone(geri: Geri) {
  if (mevcut) geri(mevcut);
  bekleyenler.add(geri);
  return () => bekleyenler.delete(geri);
}
