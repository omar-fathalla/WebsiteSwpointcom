import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { tEnter, tExit } from "./motion";

/** Scrim at 0.32 (⚠️) + Esc to close + body scroll lock + initial focus. */
export function useModal(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onClose);
  cb.current = onClose;
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { cb.current(); return; }
      if (e.key !== "Tab" || !ref.current) return;
      const f = Array.from(ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),textarea,select,[tabindex]:not([tabindex="-1"])')).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1], a = document.activeElement;
      if (e.shiftKey && (a === first || a === ref.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
      else if (!ref.current.contains(a)) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", k);
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => ref.current?.focus(), 50);
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = o; clearTimeout(t); prev?.focus?.(); };
  }, [open]);
  return ref;
}

export function Scrim({ onClick, z = 90 }: { onClick: () => void; z?: number }) {
  return (
    <motion.div aria-hidden="true" className="fixed inset-0" style={{ zIndex: z, background: "var(--md-sys-color-scrim)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 0.32, transition: tEnter }} exit={{ opacity: 0, transition: tExit }} onClick={onClick} />
  );
}

interface DialogProps {
  open: boolean; onClose: () => void; label: string; children: ReactNode;
  /** basic: max 560px. wide: larger content dialog. Compact screens get full-screen. */
  size?: "basic" | "wide"; z?: number;
}

/** M3 dialog: surface-container-high, 28px radius, full-screen on compact. */
export function Dialog({ open, onClose, label, children, size = "basic", z = 100 }: DialogProps) {
  const ref = useModal(open, onClose);
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <>
          <Scrim onClick={onClose} z={z} />
          <div className="fixed inset-0 flex items-stretch md:items-center justify-center md:p-6 pointer-events-none" style={{ zIndex: z + 1 }}>
            <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={label}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: tEnter }}
              exit={{ opacity: 0, transition: tExit }}
              className={`pointer-events-auto outline-none w-full flex flex-col overflow-hidden md:rounded-[28px] md:max-h-[calc(100dvh-48px)] ${size === "wide" ? "md:max-w-[960px]" : "md:max-w-[560px] md:min-w-[280px]"}`}
              style={{ background: "var(--md-sys-color-surface-container-high)", color: "var(--md-sys-color-on-surface)", ["--md-field-bg" as string]: "var(--md-sys-color-surface-container-high)" }}>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
