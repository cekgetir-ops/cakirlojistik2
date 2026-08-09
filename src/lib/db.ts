import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Tek Prisma istemcisi.
 *
 * Geliştirmede Next her kayıtta modülleri yeniden yüklüyor; istemci
 * globalde tutulmazsa her yenilemede yeni bağlantı havuzu açılıp
 * bağlantılar tükeniyor.
 *
 * Prisma 7 bağlantıyı driver adapter üzerinden kuruyor. Postgres'e
 * geçerken bu dosyada adapter'ı değiştirmek yeterli:
 *   import { PrismaPg } from "@prisma/adapter-pg";
 *   new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
 */
const olustur = () => {
  const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url }),
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof olustur>;
};

export const prisma = globalForPrisma.prisma ?? olustur();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
