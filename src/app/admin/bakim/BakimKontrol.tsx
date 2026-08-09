"use client";

import Link from "next/link";
import { useActionState, useState, useTransition } from "react";
import { bakimMesajiKaydet, bakimModuDegistir } from "../actions";

/**
 * Bakım modu anahtarı ve ziyaretçiye gösterilecek mesaj.
 *
 * Siteyi kapatmak geri alınabilir ama dışarıdan görünür bir işlem;
 * bu yüzden açarken onay isteniyor, kapatırken istenmiyor.
 */
export default function BakimKontrol({
  acik,
  mesaj,
}: {
  acik: boolean;
  mesaj: string;
}) {
  const [bekliyor, basla] = useTransition();
  const [durum, gonder, kaydediliyor] = useActionState(bakimMesajiKaydet, null);
  const [taslak, setTaslak] = useState(mesaj);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
      <div>
        {/* Durum kartı */}
        <div
          className={`rounded-xl border p-5 ${
            acik
              ? "border-amber-300 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30"
              : "border-line bg-canvas"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`size-2.5 rounded-full ${
                  acik ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />
              <div>
                <p className="text-[15px] font-semibold tracking-tight">
                  {acik ? "Site bakımda" : "Site yayında"}
                </p>
                <p className="mt-0.5 text-[13px] text-muted">
                  {acik
                    ? "Ziyaretçiler bakım ekranını görüyor."
                    : "Ziyaretçiler siteyi normal görüyor."}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={bekliyor}
              onClick={() => {
                if (
                  !acik &&
                  !confirm(
                    "Site bakım moduna alınacak ve ziyaretçiler bakım ekranını görecek. Devam edilsin mi?",
                  )
                )
                  return;
                basla(() => bakimModuDegistir(!acik));
              }}
              className={acik ? "admin-btn-ghost" : "admin-btn"}
            >
              {bekliyor
                ? "Uygulanıyor…"
                : acik
                  ? "Bakımı kapat"
                  : "Bakıma al"}
            </button>
          </div>
        </div>

        {/* Mesaj */}
        <form action={gonder} className="mt-8">
          <label htmlFor="mesaj" className="admin-label">
            Ziyaretçiye gösterilecek mesaj
          </label>
          <textarea
            id="mesaj"
            name="mesaj"
            rows={4}
            value={taslak}
            onChange={(e) => setTaslak(e.target.value)}
            className="admin-input resize-y"
          />
          <p className="mt-1.5 text-[12px] text-faint">
            Telefon ve e-posta adresi ekrana kendiliğinden ekleniyor; burada
            tekrarlamaya gerek yok.
          </p>

          {durum && (
            <p
              role="status"
              className={`mt-3 text-[13px] ${
                durum === "Mesaj kaydedildi." ? "text-accent" : "text-red-600"
              }`}
            >
              {durum}
            </p>
          )}

          <button
            type="submit"
            disabled={kaydediliyor}
            className="admin-btn mt-4"
          >
            {kaydediliyor ? "Kaydediliyor…" : "Mesajı kaydet"}
          </button>
        </form>
      </div>

      <aside className="grid content-start gap-4">
        <div className="rounded-xl border border-line bg-canvas p-5">
          <p className="text-[13px] font-semibold tracking-tight">
            Bakım ekranını görmek için
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            Panele girmiş olduğunuz sürece siteyi normal görürsünüz. Ekranı
            ziyaretçi gözüyle görmek için gizli sekmede açın ya da çıkış yapın.
          </p>
          <Link
            href="/"
            target="_blank"
            className="admin-mini-btn mt-4 inline-flex"
          >
            Siteyi yeni sekmede aç
          </Link>
        </div>
      </aside>
    </div>
  );
}
