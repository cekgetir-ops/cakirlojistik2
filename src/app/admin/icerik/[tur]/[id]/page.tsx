import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { oturumVarMi } from "@/lib/auth";
import { TUR_ETIKET, icerikById, turCoz } from "@/lib/content";
import IcerikFormu from "../IcerikFormu";

export default async function IcerikDuzenle({
  params,
}: {
  params: Promise<{ tur: string; id: string }>;
}) {
  if (!(await oturumVarMi())) redirect("/admin/giris");

  const { tur: turParam, id } = await params;
  const tur = turCoz(turParam);
  if (!tur) notFound();

  const kayit = await icerikById(id);
  if (!kayit || kayit.type !== tur) notFound();

  const geri = `/admin/icerik/${turParam}`;

  return (
    <>
      <Link href={geri} className="text-[13px] text-muted hover:text-ink">
        ← {TUR_ETIKET[tur]}
      </Link>
      <h1 className="mt-3 truncate text-heading font-semibold tracking-tight">
        {kayit.title}
      </h1>

      <IcerikFormu tur={tur} kayit={kayit} geriHref={geri} />
    </>
  );
}
