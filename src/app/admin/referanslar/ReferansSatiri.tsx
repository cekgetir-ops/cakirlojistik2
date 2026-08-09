"use client";

import { useState, useTransition } from "react";
import { referansGorunurlukDegistir, referansSil } from "../actions";
import ReferansFormu from "./ReferansFormu";

type Referans = {
  id: string;
  name: string;
  href: string;
  logo: string | null;
  tone: string;
  visible: boolean;
  order: number;
};

export default function ReferansSatiri({ referans }: { referans: Referans }) {
  const [duzenle, setDuzenle] = useState(false);
  const [bekliyor, basla] = useTransition();

  return (
    <li className="px-4 py-3.5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {referans.logo ? (
          // Yerel ve dış adres birlikte desteklensin diye düz <img>.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={referans.logo} alt=""
            className="h-6 w-16 shrink-0 object-contain opacity-70"
          />
        ) : (
          <span className="grid h-6 w-16 shrink-0 place-items-center rounded border border-dashed border-line-strong text-[10px] text-faint">
            logo yok
          </span>
        )}

        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {referans.name}
        </span>

        <span className="hidden text-[12px] text-faint sm:block">
          {referans.tone === "light" ? "açık logo" : "koyu logo"} · sıra{" "}
          <span className="tabular">{referans.order}</span>
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={bekliyor}
            onClick={() =>
              basla(() =>
                referansGorunurlukDegistir(referans.id, !referans.visible),
              )
            }
            className={`admin-mini-btn ${referans.visible ? "" : "opacity-60"}`}
          >
            {referans.visible ? "Görünür" : "Gizli"}
          </button>

          <button
            type="button"
            onClick={() => setDuzenle((v) => !v)}
            className="admin-mini-btn"
          >
            {duzenle ? "Kapat" : "Düzenle"}
          </button>

          <button
            type="button"
            disabled={bekliyor}
            onClick={() => {
              if (!confirm(`"${referans.name}" silinecek. Emin misiniz?`)) return;
              basla(() => referansSil(referans.id));
            }}
            className="admin-mini-btn admin-mini-btn--tehlike"
          >
            Sil
          </button>
        </div>
      </div>

      {duzenle && (
        <div className="mt-4 border-t border-line pt-4">
          <ReferansFormu referans={referans} onKapat={() => setDuzenle(false)} />
        </div>
      )}
    </li>
  );
}
