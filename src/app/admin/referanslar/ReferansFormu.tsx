"use client";

import { useActionState } from "react";
import { referansKaydet } from "../actions";

type Referans = {
  id: string;
  name: string;
  href: string;
  logo: string | null;
  tone: string;
  visible: boolean;
  order: number;
};

export default function ReferansFormu({
  referans,
  onKapat,
}: {
  referans?: Referans;
  onKapat?: () => void;
}) {
  const [hata, gonder, bekliyor] = useActionState(referansKaydet, null);

  return (
    <form action={gonder} className="mt-4 grid gap-4">
      {referans && <input type="hidden" name="id" value={referans.id} />}

      <div>
        <label htmlFor={`name-${referans?.id ?? "yeni"}`} className="admin-label">
          Firma adı
        </label>
        <input
          id={`name-${referans?.id ?? "yeni"}`}
          name="name" required defaultValue={referans?.name}
          className="admin-input"
        />
      </div>

      <div>
        <label htmlFor={`href-${referans?.id ?? "yeni"}`} className="admin-label">
          Web adresi
        </label>
        <input
          id={`href-${referans?.id ?? "yeni"}`}
          name="href" type="url" defaultValue={referans?.href}
          className="admin-input" placeholder="https://ornek.com"
        />
      </div>

      <div>
        <label htmlFor={`logo-${referans?.id ?? "yeni"}`} className="admin-label">
          Logo yolu
        </label>
        <input
          id={`logo-${referans?.id ?? "yeni"}`}
          name="logo" defaultValue={referans?.logo ?? ""}
          className="admin-input" placeholder="/referanslar/firma.svg"
        />
        <p className="mt-1.5 text-[12px] leading-relaxed text-faint">
          Şeffaf zeminli dosyayı <code>public/referanslar/</code> içine koyun.
        </p>
      </div>

      <div>
        <label htmlFor={`tone-${referans?.id ?? "yeni"}`} className="admin-label">
          Logo tonu
        </label>
        <select
          id={`tone-${referans?.id ?? "yeni"}`}
          name="tone" defaultValue={referans?.tone ?? "dark"}
          className="admin-input"
        >
          <option value="dark">Koyu renkli logo</option>
          <option value="light">Açık / beyaz logo</option>
        </select>
        <p className="mt-1.5 text-[12px] leading-relaxed text-faint">
          Şerit logoları tek renk gösteriyor; bu seçim yalnızca hangi temada
          ters çevrileceğini belirler.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label htmlFor={`order-${referans?.id ?? "yeni"}`} className="admin-label">
            Sıra
          </label>
          <input
            id={`order-${referans?.id ?? "yeni"}`}
            name="order" type="number" defaultValue={referans?.order ?? 0}
            className="admin-input tabular"
          />
        </div>
        <label className="flex items-end gap-2 pb-3 text-sm">
          <input
            type="checkbox" name="visible"
            defaultChecked={referans?.visible ?? true}
            className="size-4 accent-[var(--accent)]"
          />
          Görünür
        </label>
      </div>

      {hata && <p role="alert" className="text-[13px] text-red-600">{hata}</p>}

      <div className="flex gap-2">
        <button type="submit" disabled={bekliyor} className="admin-btn flex-1">
          {bekliyor ? "Kaydediliyor…" : referans ? "Güncelle" : "Ekle"}
        </button>
        {onKapat && (
          <button type="button" onClick={onKapat} className="admin-btn-ghost">
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}
