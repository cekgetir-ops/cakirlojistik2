import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { oturumVarMi } from "@/lib/auth";
import {
  DURUM_ETIKET,
  TUR_ETIKET,
  TUR_KOK,
  tumIcerik,
  turCoz,
  type Durum,
} from "@/lib/content";
import SatirIslemleri from "./SatirIslemleri";

export default async function IcerikListesi({
  params,
}: {
  params: Promise<{ tur: string }>;
}) {
  if (!(await oturumVarMi())) redirect("/admin/giris");

  const { tur: turParam } = await params;
  const tur = turCoz(turParam);
  if (!tur) notFound();

  const kayitlar = await tumIcerik(tur);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-heading font-semibold tracking-tight">
            {TUR_ETIKET[tur]}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {kayitlar.length} kayıt · ön yüzde{" "}
            <code className="text-[12px]">{TUR_KOK[tur]}</code> altında görünür
          </p>
        </div>
        <Link href={`/admin/icerik/${turParam}/yeni`} className="admin-btn">
          Yeni ekle
        </Link>
      </div>

      {kayitlar.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="text-sm text-muted">
            Henüz kayıt yok. İlk içeriği eklediğinizde burada listelenecek.
          </p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-xl border border-line bg-canvas">
          {kayitlar.map((k) => (
            <li key={k.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5">
              <span className={`admin-rozet admin-rozet--${k.status.toLowerCase()}`}>
                {DURUM_ETIKET[k.status as Durum]}
              </span>

              <Link
                href={`/admin/icerik/${turParam}/${k.id}`}
                className="min-w-0 flex-1 truncate text-sm font-medium hover:text-accent"
              >
                {k.title}
              </Link>

              <code className="hidden truncate text-[12px] text-faint sm:block">
                /{k.slug}
              </code>

              <SatirIslemleri
                id={k.id}
                durum={k.status as Durum}
                onizlemeHref={
                  k.status === "PUBLISHED" ? `${TUR_KOK[tur]}/${k.slug}` : null
                }
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
