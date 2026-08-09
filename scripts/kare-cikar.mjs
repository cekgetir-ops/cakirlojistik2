/**
 * Bir veya birden çok videoyu tek bir scroll kare dizisine böler.
 *
 * Kullanım:
 *   node scripts/kare-cikar.mjs <toplam-kare> <video1> [video2 ...]
 *
 * Örnek (dört sahne, sahne başına 75 kare):
 *   node scripts/kare-cikar.mjs 300 sahne1.mp4 sahne2.mp4 sahne3.mp4 sahne4.mp4
 *
 * Çıktı: public/images/truck-sequence/frame_001.webp … frame_NNN.webp
 * Kareler videoların sırasına göre kesintisiz numaralanır; sahne
 * geçişleri dizide kesme olarak görünür ve bileşendeki sahne
 * aralıklarıyla birebir örtüşür.
 *
 * Toplam kare sayısı bileşendeki KARE_SAYISI ile aynı olmalı
 * (src/components/sections/StoryTelling.tsx).
 *
 * WebP seçildi: aynı görsel kalitede JPEG'in yaklaşık yarısı kadar yer
 * tutuyor, 300 karelik bir dizide bu fark doğrudan indirme boyutuna
 * yansıyor.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ffmpeg from "ffmpeg-static";

const toplamKare = Number(process.argv[2]);
const kaynaklar = process.argv.slice(3);

if (!Number.isFinite(toplamKare) || kaynaklar.length === 0) {
  console.error("Kullanım: node scripts/kare-cikar.mjs <toplam-kare> <video...>");
  process.exit(1);
}

const hedef = join("public", "images", "truck-sequence");
const gecici = join("public", "images", "_gecici");
mkdirSync(hedef, { recursive: true });
mkdirSync(gecici, { recursive: true });

/** `ffmpeg -i` bilgiyi stderr'e yazıp sıfır dışı kodla çıkar. */
function sureOku(yol) {
  let cikti = "";
  try {
    cikti = execFileSync(ffmpeg, ["-i", yol, "-hide_banner"], {
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8",
    });
  } catch (e) {
    cikti = String(e.stderr ?? "");
  }
  const m = cikti.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return m ? Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) : 0;
}

/* --- Eski kareleri temizle ------------------------------------------ */
readdirSync(hedef)
  .filter((d) => d.startsWith("frame_"))
  .forEach((d) => rmSync(join(hedef, d)));

/* --- Sahne başına kare payı ----------------------------------------- */
const pay = Math.floor(toplamKare / kaynaklar.length);
const paylar = kaynaklar.map((_, i) =>
  i === kaynaklar.length - 1 ? toplamKare - pay * (kaynaklar.length - 1) : pay,
);

let sayac = 0;

for (const [i, kaynak] of kaynaklar.entries()) {
  const istenen = paylar[i];
  console.log(`\n[${i + 1}/${kaynaklar.length}] ${istenen} kare · ${kaynak.slice(0, 60)}`);

  /* Kaynağı yerelleştir */
  let videoYolu = kaynak;
  if (/^https?:\/\//.test(kaynak)) {
    const yanit = await fetch(kaynak);
    if (!yanit.ok) throw new Error(`indirilemedi (${yanit.status}): ${kaynak}`);
    videoYolu = join(gecici, `kaynak_${i}.mp4`);
    writeFileSync(videoYolu, Buffer.from(await yanit.arrayBuffer()));
  }

  const sure = sureOku(videoYolu);
  const fps = sure > 0 ? istenen / sure : 24;

  /* Sahneyi geçici klasöre çıkar, sonra sıralı numaraya taşı */
  const sahneKlasoru = join(gecici, `sahne_${i}`);
  rmSync(sahneKlasoru, { recursive: true, force: true });
  mkdirSync(sahneKlasoru, { recursive: true });

  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i", videoYolu,
      // Önce 16:9'a ortadan kırp, sonra ölçekle.
      //
      // Kling başlangıç görseli verildiğinde onun en boy oranını
      // kullanıyor; referans kare olduğu için kaynak da kare geliyor.
      // Tuval zaten ortadan kırparak (cover) çiziyordu, yani fazla
      // pikseller indirilip atılıyordu. Kırpmayı buraya almak görüntüyü
      // değiştirmiyor ama dosya boyutunu belirgin düşürüyor.
      //
      // 1440 genişlik: tuval en geniş yaygın masaüstünde bile bundan
      // küçük kalıyor, büyütme olmuyor. Kalite 72, tek karede gözle
      // ayırt edilebilir bozulma yapmıyor.
      "-vf",
      `fps=${fps.toFixed(4)},crop=iw:ih*9/16,scale=1440:-2:flags=lanczos`,
      "-frames:v", String(istenen),
      "-c:v", "libwebp",
      "-quality", "72",
      "-compression_level", "6",
      join(sahneKlasoru, "k_%04d.webp"),
    ],
    { stdio: ["ignore", "ignore", "ignore"] },
  );

  const uretilen = readdirSync(sahneKlasoru).filter((d) => d.endsWith(".webp")).sort();
  uretilen.forEach((d) => {
    sayac++;
    renameSync(
      join(sahneKlasoru, d),
      join(hedef, `frame_${String(sayac).padStart(3, "0")}.webp`),
    );
  });
  console.log(`  → ${uretilen.length} kare (${sure.toFixed(2)} sn kaynak)`);
}

/* --- Temizlik ve özet ------------------------------------------------ */
rmSync(gecici, { recursive: true, force: true });

const kareler = readdirSync(hedef).filter((d) => d.endsWith(".webp"));
const toplamBayt = kareler.reduce((t, d) => t + statSync(join(hedef, d)).size, 0);

console.log(
  `\n${kareler.length} kare · toplam ${(toplamBayt / 1024 / 1024).toFixed(1)} MB` +
    ` · kare başı ~${Math.round(toplamBayt / kareler.length / 1024)} KB`,
);
if (kareler.length !== toplamKare) {
  console.warn(
    `UYARI: ${toplamKare} bekleniyordu, ${kareler.length} üretildi. ` +
      `StoryTelling.tsx içindeki KARE_SAYISI değerini eşitleyin.`,
  );
}
