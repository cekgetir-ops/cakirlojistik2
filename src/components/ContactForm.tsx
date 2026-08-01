"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { services } from "@/lib/services";

const field =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-ink focus:outline-none";

const labelCls = "block text-[13px] font-medium text-ink-soft";

function Field({
  id,
  label,
  children,
  hint,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {hint && <span className="ml-2 font-normal text-faint">{hint}</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // React 19 form action'ı: submit'i kendisi yakalar, FormData'yı hazır verir.
  // TODO: Buraya bir gönderim ucu (route handler / e-posta servisi) bağlanacak.
  // Şu an form yalnızca arayüz geri bildirimi veriyor — veri hiçbir yere gitmiyor.
  const handleSubmit = async () => {
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full min-h-80 flex-col items-start justify-center rounded-2xl border border-line bg-canvas-alt p-8 lg:p-12">
        <span className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong">
          <Check className="size-5 text-ink" strokeWidth={1.6} />
        </span>
        <h2 className="mt-6 text-heading font-semibold tracking-tight">
          Mesajınız alındı.
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          Aynı iş günü içinde size dönüş yapacağız. Acele bir durum varsa
          telefonla ulaşmanız daha hızlı olur.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-all hover:gap-2.5"
        >
          Yeni mesaj yaz
          <ArrowRight className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-canvas-alt p-8 lg:p-10">
      <h2 className="text-heading font-semibold tracking-tight">
        Teklif formu
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Aşağıdaki bilgiler fiyat verebilmemiz için yeterli. Formu doldurmak sizi
        bağlamaz.
      </p>

      <form action={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Ad soyad">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Adınız"
              className={field}
            />
          </Field>

          <Field id="phone" label="Telefon">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="05__ ___ __ __"
              className={field}
            />
          </Field>
        </div>

        <Field id="email" label="E-posta" hint="isteğe bağlı">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ornek@eposta.com"
            className={field}
          />
        </Field>

        <Field id="service" label="Hangi hizmet">
          <select id="service" name="service" defaultValue="" className={field}>
            <option value="" disabled>
              Seçiniz
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
            <option value="diger">Emin değilim / diğer</option>
          </select>
        </Field>

        <Field id="message" label="Detaylar">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Araç sayısı ve markası, alınacağı ve teslim edileceği adres, tahmini tarih…"
            className={`${field} resize-y`}
          />
        </Field>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-canvas transition-opacity hover:opacity-85 sm:w-auto"
        >
          Gönder
          <ArrowRight className="size-4" />
        </button>

        <p className="text-[13px] leading-relaxed text-faint">
          Bilgileriniz yalnızca teklif hazırlamak için kullanılır, üçüncü
          kişilerle paylaşılmaz.
        </p>
      </form>
    </div>
  );
}
