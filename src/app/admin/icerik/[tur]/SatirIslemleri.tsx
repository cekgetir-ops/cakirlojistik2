"use client";

import Link from "next/link";
import { useTransition } from "react";
import { icerikDurumDegistir, icerikSil } from "../../actions";
import { DURUM_ETIKET, type Durum } from "@/lib/icerik-sabitleri";

/**
 * Liste satırındaki hızlı işlemler: durum değiştirme, önizleme, silme.
 * Silme geri alınamadığı için onay isteniyor.
 */
export default function SatirIslemleri({
  id,
  durum,
  onizlemeHref,
}: {
  id: string;
  durum: Durum;
  onizlemeHref: string | null;
}) {
  const [bekliyor, basla] = useTransition();

  return (
    <div className="flex items-center gap-1.5">
      <select
        aria-label="Durum"
        value={durum}
        disabled={bekliyor}
        onChange={(e) =>
          basla(() => icerikDurumDegistir(id, e.target.value as Durum))
        }
        className="admin-mini-select"
      >
        {(["PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((d) => (
          <option key={d} value={d}>
            {DURUM_ETIKET[d]}
          </option>
        ))}
      </select>

      {onizlemeHref && (
        <Link href={onizlemeHref} target="_blank" className="admin-mini-btn">
          Gör
        </Link>
      )}

      <button
        type="button"
        disabled={bekliyor}
        onClick={() => {
          if (!confirm("Bu içerik kalıcı olarak silinecek. Emin misiniz?")) return;
          basla(() => icerikSil(id));
        }}
        className="admin-mini-btn admin-mini-btn--tehlike"
      >
        Sil
      </button>
    </div>
  );
}
