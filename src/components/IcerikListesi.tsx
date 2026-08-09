import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

type Ogesi = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
};

/**
 * Blog ve hizmet bölgeleri aynı kart düzenini paylaşıyor.
 * Görsel varsa üstte, yoksa kart yalnızca tipografiyle duruyor —
 * yer tutucu kutu koymuyoruz, boşluk daha sakin.
 */
export default function IcerikListesi({
  ogeler,
  kok,
  bosMetin,
}: {
  ogeler: Ogesi[];
  kok: string;
  bosMetin: string;
}) {
  if (ogeler.length === 0) {
    return (
      <Reveal>
        <p className="max-w-md text-base leading-relaxed text-muted">{bosMetin}</p>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {ogeler.map((o, i) => (
        <Reveal key={o.id} delay={i * 70}>
          <article className="rule-mark group relative border-t border-line pt-6">
            {o.imageUrl && (
              <Link href={`${kok}/${o.slug}`} className="zoom-media mb-5 block overflow-hidden rounded-xl">
                {/* Dış adresler de desteklensin diye düz <img> */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={o.imageUrl}
                  alt={o.imageAlt ?? ""}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </Link>
            )}

            <h2 className="text-base font-semibold tracking-tight text-ink">
              <Link href={`${kok}/${o.slug}`} className="hover:text-accent">
                {o.title}
              </Link>
            </h2>

            {o.excerpt && (
              <p className="mt-3 text-sm leading-relaxed text-muted">{o.excerpt}</p>
            )}

            <Link
              href={`${kok}/${o.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-all group-hover:gap-2.5"
            >
              Devamını okuyun
              <ArrowRight className="size-4" />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
