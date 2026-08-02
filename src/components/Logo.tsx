import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Marka işareti: iki durak ve aralarındaki hat — A noktasından B noktasına
 * transfer fikrinin en yalın hali. Wordmark taşıyıcı, işaret ona eşlik ediyor.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <rect
        x="0.6"
        y="0.6"
        width="26.8"
        height="26.8"
        rx="7.4"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1.2"
      />
      <circle cx="9" cy="18.5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="19" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10.9 16.8 17.1 11.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — ana sayfa`}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <Mark className="size-7 shrink-0 text-ink" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-ink">
          {site.name}
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-faint">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
