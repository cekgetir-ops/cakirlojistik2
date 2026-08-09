import { redirect } from "next/navigation";
import { oturumVarMi } from "@/lib/auth";
import { tumReferanslar } from "@/lib/content";
import ReferansSatiri from "./ReferansSatiri";
import ReferansFormu from "./ReferansFormu";

export default async function ReferansYonetimi() {
  if (!(await oturumVarMi())) redirect("/admin/giris");

  const kayitlar = await tumReferanslar();

  return (
    <>
      <h1 className="text-heading font-semibold tracking-tight">Referanslar</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Ana sayfadaki kayan şeridi bu liste besliyor. Logosu olmayan firmalar
        adıyla, nötr bir çerçeve içinde görünür.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          {kayitlar.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line-strong px-6 py-16 text-center">
              <p className="text-sm text-muted">
                Henüz referans eklenmemiş. Sağdaki formla ilkini ekleyin.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-canvas">
              {kayitlar.map((r) => (
                <ReferansSatiri key={r.id} referans={r} />
              ))}
            </ul>
          )}
        </div>

        <aside>
          <h2 className="text-[15px] font-semibold tracking-tight">Yeni referans</h2>
          <ReferansFormu />
        </aside>
      </div>
    </>
  );
}
