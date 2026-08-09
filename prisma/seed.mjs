/**
 * Başlangıç verisi.
 *
 * Referans firmalar daha önce koda gömülüydü; panele taşınırken buraya
 * alındı. `npm run db:seed` ile çalışır ve mevcut kayıtları bozmaz —
 * aynı isim varsa atlar, böylece tekrar çalıştırmak güvenlidir.
 */
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  }),
});

const referanslar = [
  { name: "Arabam.com", href: "https://www.arabam.com", logo: null, tone: "dark", order: 1 },
  { name: "Carvak", href: "https://www.carvak.com/tr", logo: "/referanslar/carvak.svg", tone: "dark", order: 2 },
  { name: "VavaCars", href: "https://tr.vava.cars", logo: null, tone: "dark", order: 3 },
  { name: "Elit Car Rental", href: "https://elitcarrental.com", logo: "/referanslar/elit.svg", tone: "dark", order: 4 },
  { name: "En-Ka", href: "https://en-ka.com.tr", logo: "/referanslar/enka.svg", tone: "light", order: 5 },
  { name: "Ankara Oto", href: "https://ankaraoto.com.tr", logo: "/referanslar/ankaraoto.png", tone: "light", order: 6 },
  { name: "Çek Getir", href: "https://www.cekgetir.com", logo: "/referanslar/cekgetir.png", tone: "light", order: 7 },
];

for (const r of referanslar) {
  const varMi = await prisma.partner.findFirst({ where: { name: r.name } });
  if (varMi) {
    console.log(`atlandi (zaten var): ${r.name}`);
    continue;
  }
  await prisma.partner.create({ data: r });
  console.log(`eklendi: ${r.name}`);
}

await prisma.$disconnect();
