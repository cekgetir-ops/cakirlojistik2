import Link from "next/link";
import { Mark } from "./Logo";
import { MapPin } from "./icons";
import { services } from "@/lib/services";
import { contact, nav, offices, site } from "@/lib/site";

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("tel:") || href.startsWith("mailto:");
  const className =
    "text-sm text-muted transition-colors hover:text-ink";

  return (
    <li>
      {external ? (
        <a href={href} className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // Üst boşluğu sayfalar kendi son bölümlerinde veriyor; burada eklemek
    // iç sayfalarda çift boşluğa yol açıyordu.
    <footer className="border-t border-line bg-canvas-alt">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
          {/* Marka */}
          <div className="max-w-xs">
            <Mark className="size-8 text-ink" />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-5 flex flex-col items-start gap-2">
              <a
                href={contact.phone.href}
                className="tabular border-b border-line-strong pb-0.5 text-sm text-ink transition-colors hover:border-ink"
              >
                {contact.phone.label}
              </a>
              <a
                href={contact.email.href}
                className="border-b border-line-strong pb-0.5 text-sm break-all text-ink transition-colors hover:border-ink"
              >
                {contact.email.label}
              </a>
            </div>
          </div>

          <Column title="Kurumsal">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </Column>

          <Column title="Hizmetler">
            {services.map((item) => (
              <FooterLink key={item.id} href={`/hizmetler#${item.id}`}>
                {item.title}
              </FooterLink>
            ))}
          </Column>

          <Column title="Otoparklar">
            {offices.map((office) => (
              <li key={office.id} className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-faint" />
                <div className="text-sm leading-relaxed">
                  <span className="text-ink">{office.label}</span>
                  <br />
                  <span className="text-muted">
                    {office.street}
                    <br />
                    {office.district}
                  </span>
                  <br />
                  <a
                    href={office.phone.href}
                    className="tabular text-muted transition-colors hover:text-ink"
                  >
                    {office.phone.label}
                  </a>
                </div>
              </li>
            ))}
          </Column>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-faint">
            © {year} {site.legalName}. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <Link
              href="/gizlilik"
              className="text-[13px] text-faint transition-colors hover:text-ink"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/kullanim-kosullari"
              className="text-[13px] text-faint transition-colors hover:text-ink"
            >
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
