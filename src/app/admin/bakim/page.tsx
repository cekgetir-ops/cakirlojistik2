import { redirect } from "next/navigation";
import { oturumVarMi } from "@/lib/auth";
import { bakimMesaji, bakimModuAcikMi } from "@/lib/ayarlar";
import BakimKontrol from "./BakimKontrol";

export default async function BakimAyarlari() {
  if (!(await oturumVarMi())) redirect("/admin/giris");

  const [acik, mesaj] = await Promise.all([bakimModuAcikMi(), bakimMesaji()]);

  return (
    <>
      <h1 className="text-heading font-semibold tracking-tight">Bakım modu</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Açıkken ziyaretçiler bakım ekranını görür. Panele girmiş olduğunuz için
        siz siteyi normal görmeye devam edersiniz. Değişiklikleri yayına almadan
        kontrol edebilirsiniz.
      </p>

      <BakimKontrol acik={acik} mesaj={mesaj} />
    </>
  );
}
