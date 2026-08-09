import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { oturumVarMi } from "@/lib/auth";
import GirisFormu from "./GirisFormu";

export const metadata: Metadata = {
  title: "Panel Girişi",
  robots: { index: false, follow: false },
};

export default async function GirisSayfasi() {
  if (await oturumVarMi()) redirect("/admin");

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="eyebrow">Yönetim</p>
        <h1 className="mt-5 text-heading font-semibold tracking-tight">
          Panele giriş
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          İçerik yönetimi için parolanızı girin.
        </p>

        <GirisFormu />
      </div>
    </main>
  );
}
