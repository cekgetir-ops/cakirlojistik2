import path from "node:path";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 yapılandırması.
 *
 * Bağlantı adresi Prisma 7'den itibaren şema dosyasında değil burada
 * duruyor. Migrate komutları bu dosyayı okuyor; uygulamanın çalışma
 * zamanındaki bağlantısı `src/lib/db.ts` içindeki adapter üzerinden.
 */
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  },
});
