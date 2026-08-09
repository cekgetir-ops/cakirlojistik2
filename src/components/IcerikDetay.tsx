import Link from "next/link";
import Button from "./Button";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

type Kayit = {
  title: string;
  excerpt: string | null;
  body: string;
  imageUrl: string | null;
  imageAlt: string | null;
  updatedAt: Date;
};

/**
 * Tek içerik görünümü. Gövde düz metin olarak giriliyor; boş satırla
 * ayrılan bloklar paragrafa çevriliyor. Zengin metin editörü yerine bu
 * yeterli — sayfanın tipografisi zaten dar bir ölçüde tutuluyor.
 */
export default function IcerikDetay({
  kayit,
  ustBaslik,
  geriHref,
  geriEtiket,
}: {
  kayit: Kayit;
  ustBaslik: string;
  geriHref: string;
  geriEtiket: string;
}) {
  const paragraflar = kayit.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-16 lg:py-24">
          <Reveal enter>
            <Link href={geriHref} className="text-[13px] text-muted hover:text-ink">
              ← {geriEtiket}
            </Link>
            <p className="eyebrow mt-6">{ustBaslik}</p>
            <h1 className="mt-6 max-w-3xl text-title font-semibold text-balance">
              {kayit.title}
            </h1>
            {kayit.excerpt && (
              <p className="mt-6 max-w-xl text-lead text-muted">{kayit.excerpt}</p>
            )}
            <p className="mt-8 text-[13px] text-faint">
              Güncelleme:{" "}
              <time dateTime={kayit.updatedAt.toISOString()} className="tabular">
                {kayit.updatedAt.toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          </Reveal>
        </div>
      </section>

      <article className="shell py-16 lg:py-24">
        {kayit.imageUrl && (
          <Reveal enter delay={120}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={kayit.imageUrl}
              alt={kayit.imageAlt ?? ""}
              className="mb-14 aspect-[21/9] w-full rounded-2xl object-cover"
            />
          </Reveal>
        )}

        <Reveal enter delay={kayit.imageUrl ? 200 : 120}>
          <div className="max-w-2xl">
            {paragraflar.length > 0 ? (
              paragraflar.map((p, i) => (
                <p
                  key={i}
                  className="mb-6 text-base leading-relaxed text-ink-soft last:mb-0"
                >
                  {p}
                </p>
              ))
            ) : (
              <p className="text-base leading-relaxed text-muted">
                Bu içeriğin metni henüz eklenmemiş.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal className="mt-16 border-t border-line pt-10">
          <p className="max-w-md text-base leading-relaxed text-muted">
            Aracınızı taşıtmak ya da fiyat almak için doğrudan ulaşabilirsiniz.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href="/iletisim">Teklif alın</Button>
            <Button href={geriHref} variant="quiet">
              {geriEtiket}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </article>
    </>
  );
}
