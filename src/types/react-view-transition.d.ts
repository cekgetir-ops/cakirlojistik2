import type { ReactNode } from "react";

/**
 * `<ViewTransition>` React'in deneysel sürümünde bulunuyor ve Next,
 * `experimental.viewTransition` açıkken `react` içe aktarımlarını kendi
 * bundle ettiği deneysel kopyaya yönlendiriyor (bkz. next.config.ts).
 * Çalışma zamanında export mevcut; yüklü olan kararlı `@types/react` bunu
 * bilmediği için tip tarafını burada bildiriyoruz.
 *
 * React kararlı sürümde bu bileşeni yayımladığında bu dosya silinebilir.
 */
declare module "react" {
  interface ViewTransitionProps {
    children?: ReactNode;
    /** Paylaşılan öge eşlemesi ve CSS sözde öge adı için */
    name?: string;
    default?: string;
    enter?: string;
    exit?: string;
    update?: string;
    share?: string;
  }

  export const ViewTransition: (props: ViewTransitionProps) => ReactNode;
}
