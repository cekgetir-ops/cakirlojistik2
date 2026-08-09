import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IcerikDetay from "@/components/IcerikDetay";
import { yayindakiTek, yayindakiler } from "@/lib/content";

export async function generateStaticParams() {
  const yazilar = await yayindakiler("BLOG");
  return yazilar.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const yazi = await yayindakiTek("BLOG", slug);
  if (!yazi) return {};

  return {
    title: yazi.title,
    description: yazi.excerpt ?? undefined,
    alternates: { canonical: `/blog/${yazi.slug}` },
    openGraph: {
      title: yazi.title,
      description: yazi.excerpt ?? undefined,
      type: "article",
      url: `/blog/${yazi.slug}`,
      images: yazi.imageUrl ? [yazi.imageUrl] : undefined,
    },
  };
}

export default async function BlogYazisi({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const yazi = await yayindakiTek("BLOG", slug);
  if (!yazi) notFound();

  return (
    <IcerikDetay
      kayit={yazi}
      ustBaslik="Blog"
      geriHref="/blog"
      geriEtiket="Tüm yazılar"
    />
  );
}
