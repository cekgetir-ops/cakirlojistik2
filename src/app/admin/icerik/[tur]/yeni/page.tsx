import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { oturumVarMi } from "@/lib/auth";
import { TUR_ETIKET, turCoz } from "@/lib/content";
import IcerikFormu from "../IcerikFormu";

export default async function YeniIcerik({
  params,
}: {
  params: Promise<{ tur: string }>;
}) {
  if (!(await oturumVarMi())) redirect("/admin/giris");

  const { tur: turParam } = await params;
  const tur = turCoz(turParam);
  if (!tur) notFound();

  const geri = `/admin/icerik/${turParam}`;

  return (
    <>
      <Link href={geri} className="text-[13px] text-muted hover:text-ink">
        ← {TUR_ETIKET[tur]}
      </Link>
      <h1 className="mt-3 text-heading font-semibold tracking-tight">
        Yeni {TUR_ETIKET[tur].toLowerCase()}
      </h1>

      <IcerikFormu tur={tur} geriHref={geri} />
    </>
  );
}
