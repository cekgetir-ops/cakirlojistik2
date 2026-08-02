import type { SVGProps } from "react";

/**
 * İnce çizgili ikon seti. Hepsi 24×24 grid, 1.5 stroke, currentColor.
 * Dolu/renkli ikon yok — çizgi ağırlığı tipografiyle aynı tonda kalsın diye.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Icon>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Icon>
  );
}

export function Check(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </Icon>
  );
}

export function Menu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 8h17M3.5 16h17" />
    </Icon>
  );
}

export function Close(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

export function Sun(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2.5 12h2M19.5 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </Icon>
  );
}

export function Moon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </Icon>
  );
}

export function Phone(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </Icon>
  );
}

export function Mail(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Icon>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </Icon>
  );
}

export function Clock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" />
    </Icon>
  );
}

export function Shield(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2.75 4.5 5.75v5.5c0 4.6 3.1 8.6 7.5 10 4.4-1.4 7.5-5.4 7.5-10v-5.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Icon>
  );
}

/** Tekil araç */
export function Car(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 13.5h18M5.5 13.5l1.8-5a2 2 0 0 1 1.9-1.3h5.6a2 2 0 0 1 1.9 1.3l1.8 5" />
      <path d="M3 13.5V18a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-1.2M21 13.5V18a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1.2" />
      <path d="M6.5 16.3h11" />
      <circle cx="7.25" cy="16.3" r=".1" />
    </Icon>
  );
}

/** Şehirler arası — iki nokta ve aralarındaki rota */
export function Route(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="5.5" cy="6" r="2.5" />
      <circle cx="18.5" cy="18" r="2.5" />
      <path d="M8 6h5.5a3.5 3.5 0 0 1 0 7h-3a3.5 3.5 0 0 0 0 7H16" />
    </Icon>
  );
}

/** Kurumsal */
export function Building(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 20.5h17M5.5 20.5V4.5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16M14.5 9.5h3a1 1 0 0 1 1 1v10" />
      <path d="M8.5 7.5h3M8.5 11.5h3M8.5 15.5h3" />
    </Icon>
  );
}

/** Katmanlı / çoklu */
export function Layers(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </Icon>
  );
}

/** Ekip / müşteri */
export function Users(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.75 19.5a6.25 6.25 0 0 1 12.5 0M16 5.1a3.25 3.25 0 0 1 0 5.8M17.5 14.2a6.25 6.25 0 0 1 3.75 5.3" />
    </Icon>
  );
}

/** Şeffaf fiyatlandırma */
export function Tag(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 11.2V4.5a1 1 0 0 1 1-1h6.7a1 1 0 0 1 .7.3l8 8a1 1 0 0 1 0 1.4l-6.7 6.7a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1-.3-.7Z" />
      <circle cx="8" cy="8" r="1.4" />
    </Icon>
  );
}

/** Süreklilik / düzenli sefer */
export function Repeat(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 8.5h13a4 4 0 0 1 4 4v.5M6.5 5.5l-3 3 3 3" />
      <path d="M20.5 15.5h-13a4 4 0 0 1-4-4V11M17.5 18.5l3-3-3-3" />
    </Icon>
  );
}

/** Çoklu araç taşıma — iki katlı taşıyıcı */
export function Carrier(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 11h12.5M2.5 11V5.5a1 1 0 0 1 1-1H14a1 1 0 0 1 1 1V11" />
      <path d="M2.5 18.5h19M15 11h2.6a2 2 0 0 1 1.7 1l2.2 3.6v2.9" />
      <circle cx="7" cy="18.5" r="1.9" />
      <circle cx="17.5" cy="18.5" r="1.9" />
      <path d="M5.5 7.5h6" />
    </Icon>
  );
}

/** Yol yardım */
export function Wrench(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.4 3.4a5.5 5.5 0 0 0-6.6 7l-5 5a2 2 0 0 0 2.8 2.8l5-5a5.5 5.5 0 0 0 7-6.6l-3 3-2.2-2.2 3-3Z" />
    </Icon>
  );
}

/** Otopark tesisi */
export function ParkingSign(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="3.5" />
      <path d="M9.75 16.5V7.5h3.1a2.9 2.9 0 0 1 0 5.8H9.75" />
    </Icon>
  );
}

/** Anlık takip */
export function Radar(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M6 18a8.5 8.5 0 0 1 0-12M18 6a8.5 8.5 0 0 1 0 12" />
    </Icon>
  );
}
