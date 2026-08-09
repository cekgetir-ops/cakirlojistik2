"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { icerikKaydet } from "../../actions";
import { DURUM_ETIKET } from "@/lib/icerik-sabitleri";

type Kayit = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  imageUrl: string | null;
  imageAlt: string | null;
  status: string;
  order: number;
};

export default function IcerikFormu({
  tur,
  kayit,
  geriHref,
}: {
  tur: "BLOG" | "REGION";
  kayit?: Kayit;
  geriHref: string;
}) {
  const [hata, gonder, bekliyor] = useActionState(icerikKaydet, null);
  const [gorsel, setGorsel] = useState(kayit?.imageUrl ?? "");

  return (
    <form action={gonder} className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem] lg:gap-10">
      <input type="hidden" name="type" value={tur} />
      {kayit && <input type="hidden" name="id" value={kayit.id} />}

      {/* Ana alanlar */}
      <div className="grid gap-5">
        <div>
          <label htmlFor="title" className="admin-label">Başlık</label>
          <input
            id="title" name="title" required defaultValue={kayit?.title}
            className="admin-input" placeholder="Örn. Ankara araç taşıma"
          />
        </div>

        <div>
          <label htmlFor="slug" className="admin-label">
            URL adresi{" "}
            <span className="font-normal text-faint">
              (boş bırakılırsa başlıktan üretilir)
            </span>
          </label>
          <input
            id="slug" name="slug" defaultValue={kayit?.slug}
            className="admin-input" placeholder="ankara-arac-tasima"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="admin-label">
            Özet <span className="font-normal text-faint">(listede ve arama sonucunda görünür)</span>
          </label>
          <textarea
            id="excerpt" name="excerpt" rows={2} defaultValue={kayit?.excerpt ?? ""}
            className="admin-input resize-y"
          />
        </div>

        <div>
          <label htmlFor="body" className="admin-label">İçerik</label>
          <textarea
            id="body" name="body" rows={14} defaultValue={kayit?.body}
            className="admin-input resize-y font-mono text-[13px] leading-relaxed"
            placeholder="Paragrafları boş satırla ayırın."
          />
        </div>
      </div>

      {/* Yan sütun */}
      <aside className="grid content-start gap-5">
        <div>
          <label htmlFor="status" className="admin-label">Durum</label>
          <select
            id="status" name="status" defaultValue={kayit?.status ?? "DRAFT"}
            className="admin-input"
          >
            {(["PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((d) => (
              <option key={d} value={d}>{DURUM_ETIKET[d]}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="order" className="admin-label">
            Sıra <span className="font-normal text-faint">(küçük olan önce)</span>
          </label>
          <input
            id="order" name="order" type="number" defaultValue={kayit?.order ?? 0}
            className="admin-input tabular"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="admin-label">Görsel adresi</label>
          <input
            id="imageUrl" name="imageUrl" defaultValue={kayit?.imageUrl ?? ""}
            onChange={(e) => setGorsel(e.target.value)}
            className="admin-input" placeholder="/gorseller/ornek.jpg"
          />
          <p className="mt-1.5 text-[12px] leading-relaxed text-faint">
            Dosyayı <code>public/</code> içine koyup yolunu yazın ya da tam bir
            adres verin.
          </p>
        </div>

        <div>
          <label htmlFor="imageAlt" className="admin-label">Görsel açıklaması</label>
          <input
            id="imageAlt" name="imageAlt" defaultValue={kayit?.imageAlt ?? ""}
            className="admin-input"
          />
        </div>

        {gorsel && (
          // Yerel ve dış adresleri birlikte desteklemek için düz <img>;
          // next/image dış alan adları için ayrı yapılandırma isterdi.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={gorsel} alt="" aria-hidden="true"
            className="aspect-video w-full rounded-lg border border-line object-cover"
          />
        )}

        {hata && (
          <p role="alert" className="text-[13px] text-red-600">{hata}</p>
        )}

        <div className="flex gap-2">
          <button type="submit" disabled={bekliyor} className="admin-btn flex-1">
            {bekliyor ? "Kaydediliyor…" : "Kaydet"}
          </button>
          <Link href={geriHref} className="admin-btn-ghost">Vazgeç</Link>
        </div>
      </aside>
    </form>
  );
}
