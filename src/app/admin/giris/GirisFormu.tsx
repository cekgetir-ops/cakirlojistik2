"use client";

import { useActionState } from "react";
import { girisYap } from "../actions";

export default function GirisFormu() {
  const [hata, gonder, bekliyor] = useActionState(girisYap, null);

  return (
    <form action={gonder} className="mt-8">
      <label htmlFor="parola" className="admin-label">
        Parola
      </label>
      <input
        id="parola"
        name="parola"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        aria-describedby={hata ? "giris-hata" : undefined}
        className="admin-input"
      />

      {hata && (
        <p id="giris-hata" role="alert" className="mt-2 text-[13px] text-red-600">
          {hata}
        </p>
      )}

      <button type="submit" disabled={bekliyor} className="admin-btn mt-5 w-full">
        {bekliyor ? "Kontrol ediliyor…" : "Giriş yap"}
      </button>
    </form>
  );
}
