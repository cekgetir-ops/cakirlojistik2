# Çakır Lojistik — Kurumsal Web Sitesi

1997'den beri İstanbul–Ankara hattında çoklu araç taşıma, yol yardım ve otopark hizmeti veren Çakır Lojistik'in kurumsal web sitesi.

## Teknoloji

| Teknoloji | Açıklama |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router, Turbopack) | React tabanlı framework |
| [TypeScript](https://www.typescriptlang.org/) | Tip güvenli JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first stil sistemi |
| [Vercel](https://vercel.com/) | Hosting ve CI/CD |

## Proje yapısı

```
cakirlojistik/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (Header + Footer)
│   │   ├── page.tsx                # Ana sayfa
│   │   ├── globals.css             # Tasarım sistemi (renk token'ları, tema)
│   │   ├── hizmetler/page.tsx
│   │   ├── hakkimizda/page.tsx
│   │   ├── iletisim/page.tsx
│   │   ├── gizlilik/page.tsx
│   │   └── kullanim-kosullari/page.tsx
│   ├── components/                 # Header, Footer, Hero, ContactForm, Partners, ...
│   └── lib/
│       ├── site.ts                 # Marka, iletişim, otopark bilgileri — tek kaynak
│       └── services.ts             # Hizmet tanımları
├── public/
├── package.json
└── next.config.ts
```

## Geliştirme

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresini açın.

```bash
npm run build   # production derleme
npm run start   # production sunucusu
npm run lint    # ESLint
```

## İçerik güncelleme

Marka adı, iletişim bilgileri, otopark adresleri ve çalışma saatleri [`src/lib/site.ts`](src/lib/site.ts) içinde tek yerde toplanmıştır. Hizmet tanımları [`src/lib/services.ts`](src/lib/services.ts) içindedir. Kurumsal referans logoları için `partners` listesine bakın.

Fotoğraf eklemek için: dosyayı `public/` içine koyup ilgili `Figure` bileşenine `src` verin — görsel yer tutucular otomatik olarak gerçek fotoğrafa döner.

## Tasarım

Açık tema varsayılan, koyu temaya geçiş header'daki düğmeden yapılır (tercih `localStorage`'da saklanır). Renk token'ları ve tema tanımları `src/app/globals.css` içindedir.

## Deploy (Vercel)

1. Bu repoyu GitHub'a pushlayın
2. [Vercel](https://vercel.com)'de "New Project" → GitHub reposunu seçin
3. Framework Next.js olarak otomatik algılanır, ayar gerekmez
4. "Deploy"
