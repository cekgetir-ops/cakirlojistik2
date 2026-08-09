import Link from "next/link";
import { redirect } from "next/navigation";
import { oturumVarMi } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function PanelAnasayfa() {
  if (!(await oturumVarMi())) redirect("/admin/giris");

  const [blogSayilari, bolgeSayilari, referansSayisi, sonGuncellenen] =
    await Promise.all([
      prisma.content.groupBy({
        by: ["status"],
        where: { type: "BLOG" },
        _count: true,
      }),
      prisma.content.groupBy({
        by: ["status"],
        where: { type: "REGION" },
        _count: true,
      }),
      prisma.partner.count(),
      prisma.content.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: { id: true, title: true, type: true, status: true, updatedAt: true },
      }),
    ]);

  const say = (
    liste: { status: string; _count: number }[],
    durum: string,
  ) => liste.find((s) => s.status === durum)?._count ?? 0;

  const kartlar = [
    {
      baslik: "Blog",
      href: "/admin/icerik/blog",
      yayin: say(blogSayilari, "PUBLISHED"),
      taslak: say(blogSayilari, "DRAFT"),
      arsiv: say(blogSayilari, "ARCHIVED"),
    },
    {
      baslik: "Hizmet Bölgeleri",
      href: "/admin/icerik/region",
      yayin: say(bolgeSayilari, "PUBLISHED"),
      taslak: say(bolgeSayilari, "DRAFT"),
      arsiv: say(bolgeSayilari, "ARCHIVED"),
    },
  ];

  return (
    <>
      <h1 className="text-heading font-semibold tracking-tight">Genel bakış</h1>
      <p className="mt-2 text-sm text-muted">
        İçerikleri ve referansları buradan yönetiyorsunuz.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kartlar.map((k) => (
          <Link key={k.href} href={k.href} className="admin-card group">
            <p className="text-[15px] font-semibold tracking-tight">{k.baslik}</p>
            <dl className="mt-4 flex gap-5 text-[13px] text-muted">
              <div>
                <dt className="sr-only">Yayında</dt>
                <dd className="tabular text-lg font-semibold text-ink">{k.yayin}</dd>
                <dd>yayında</dd>
              </div>
              <div>
                <dt className="sr-only">Taslak</dt>
                <dd className="tabular text-lg font-semibold text-ink">{k.taslak}</dd>
                <dd>taslak</dd>
              </div>
              <div>
                <dt className="sr-only">Arşiv</dt>
                <dd className="tabular text-lg font-semibold text-ink">{k.arsiv}</dd>
                <dd>arşiv</dd>
              </div>
            </dl>
          </Link>
        ))}

        <Link href="/admin/referanslar" className="admin-card group">
          <p className="text-[15px] font-semibold tracking-tight">Referanslar</p>
          <dl className="mt-4 text-[13px] text-muted">
            <dt className="sr-only">Toplam</dt>
            <dd className="tabular text-lg font-semibold text-ink">{referansSayisi}</dd>
            <dd>kayıtlı firma</dd>
          </dl>
        </Link>
      </div>

      <h2 className="mt-12 text-[15px] font-semibold tracking-tight">
        Son güncellenenler
      </h2>
      {sonGuncellenen.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Henüz içerik eklenmemiş.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-canvas">
          {sonGuncellenen.map((i) => (
            <li key={i.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <Link
                href={`/admin/icerik/${i.type.toLowerCase()}/${i.id}`}
                className="truncate text-sm font-medium hover:text-accent"
              >
                {i.title}
              </Link>
              <span className="shrink-0 text-[12px] text-muted">
                {i.type === "BLOG" ? "Blog" : "Bölge"} ·{" "}
                {new Date(i.updatedAt).toLocaleDateString("tr-TR")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
