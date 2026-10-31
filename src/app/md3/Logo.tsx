import type { ReactNode } from "react";
/** Brand mark: primary container tile, no gradients. */
export function Logo({ sub }: { sub?: string }) {
  return (
    <span className="flex items-center gap-3 min-w-0">
      <span className="grid place-items-center shrink-0 w-10 h-10 rounded-[12px] bg-primary text-on-primary text-label-large" style={{ fontWeight: 700 }}>SP</span>
      <span className="flex flex-col min-w-0">
        <span className="text-title-large truncate text-on-surface">Switch Point</span>
        {sub && <span className="text-body-small text-on-surface-variant truncate">{sub}</span>}
      </span>
    </span>
  );
}

/** Section header: label (title-small, primary) + headline + supporting body. */
export function SectionHeader({ label, icon, title, body, center = false, as: H = "h2" }: {
  label?: string; icon?: ReactNode; title: ReactNode; body?: ReactNode; center?: boolean; as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={`flex flex-col gap-3 max-w-3xl ${center ? "mx-auto text-center items-center" : ""}`}>
      {label && <span className="inline-flex items-center gap-2 text-title-small text-primary [&_svg]:w-[18px] [&_svg]:h-[18px]">{icon}{label}</span>}
      <H className="text-headline-large md:text-display-small text-on-surface">{title}</H>
      {body && <p className="text-body-large text-on-surface-variant">{body}</p>}
    </div>
  );
}
