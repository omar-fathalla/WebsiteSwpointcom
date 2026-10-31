import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { tEnter, tExit } from "./motion";

interface Snack { id: number; message: string; action?: { label: string; onClick: () => void } }
const Ctx = createContext<(message: string, action?: Snack["action"]) => void>(() => {});

/** M3 snackbar: inverse-surface, 4px radius, level3, one at a time. */
export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snack, setSnack] = useState<Snack | null>(null);
  const timer = useRef<number>();
  const show = useCallback((message: string, action?: Snack["action"]) => {
    window.clearTimeout(timer.current);
    setSnack({ id: Date.now(), message, action });
    timer.current = window.setTimeout(() => setSnack(null), 5000);
  }, []);
  return (
    <Ctx.Provider value={show}>
      {children}
      <div aria-live="polite" className="fixed z-[120] bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 flex justify-center pointer-events-none">
        <AnimatePresence>
          {snack && (
            <motion.div key={snack.id} role="status"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: tEnter }} exit={{ opacity: 0, transition: tExit }}
              className="pointer-events-auto flex items-center gap-2 min-h-12 w-full md:w-auto md:min-w-[344px] max-w-[672px] pl-4 pr-2 py-1 text-body-medium shadow-elevation-3"
              style={{ borderRadius: 4, background: "var(--md-sys-color-inverse-surface)", color: "var(--md-sys-color-inverse-on-surface)" }}>
              <span className="flex-1 py-2.5">{snack.message}</span>
              {snack.action && (
                <button className="md-btn md-btn-text" style={{ color: "var(--md-sys-color-inverse-primary)" }}
                  onClick={() => { snack.action!.onClick(); setSnack(null); }}>{snack.action.label}</button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
export const useSnackbar = () => useContext(Ctx);
