import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IcerikDetay from "@/components/IcerikDetay";
import { yayindakiTek, yayindakiler } from "@/lib/content";

export async function generateStaticParams() {
  const bolgeler = await yayindakiler("REGION");
  return bolgeler.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bolge = await yayindakiTek("REGION", slug);
  if (!bolge) return {};

  return {
    title: bolge.title,
    description: bolge.excerpt ?? undefined,
    alternates: { canonical: `/hizmet-bolgelerimiz/${bolge.slug}` },
    openGraph: {
      title: bolge.title,
      description: bolge.excerpt ?? undefined,
      type: "article",
      url: `/hizmet-bolgelerimiz/${bolge.slug}`,
      images: bolge.imageUrl ? [bolge.imageUrl] : undefined,
    },
  };
}

export default async function HizmetBolgesi({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bolge = await yayindakiTek("REGION", slug);
  if (!bolge) notFound();

  return (
    <IcerikDetay
      kayit={bolge}
      ustBaslik="Hizmet Bölgelerimiz"
      geriHref="/hizmet-bolgelerimiz"
      geriEtiket="Tüm bölgeler"
    />
  );
}
