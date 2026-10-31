import { useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, ShoppingCart, Trash2, X, ArrowRight } from "lucide-react";
import { formatEGP, useCart } from "../../context/CartContext";
import { Scrim, useModal } from "../../md3/Dialog";
import { tEnter, tExit } from "../../md3/motion";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, setDrawerOpen } = useCart();
  return (
    <button aria-label={`Open cart (${count} items)`} onClick={() => setDrawerOpen(true)} className={`md-icon-btn ${className}`}>
      <ShoppingCart />
      {count > 0 && <span className="md-badge absolute top-1 right-1">{count}</span>}
    </button>
  );
}

/** M3 modal side sheet (right): surface-container-low, 16px leading corners, scrim. */
export function CartDrawer() {
  const { items, total, drawerOpen, setDrawerOpen, updateQuantity, removeItem, setCheckoutOpen } = useCart();
  const close = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);
  const ref = useModal(drawerOpen, close);
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <Scrim onClick={close} z={90} />
          <motion.aside ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Cart"
            className="fixed top-0 right-0 z-[95] h-full w-full md:w-[400px] flex flex-col outline-none md:rounded-l-[16px]"
            style={{ background: "var(--md-sys-color-surface-container-low)", ["--md-field-bg" as string]: "var(--md-sys-color-surface-container-low)" }}
            initial={reduced ? { opacity: 0 } : { x: "100%" }} animate={{ x: 0, opacity: 1, transition: tEnter }} exit={reduced ? { opacity: 0, transition: tExit } : { x: "100%", transition: tExit }}>
            <header className="flex items-center justify-between gap-2 pl-6 pr-3 pt-3 pb-2 min-h-16">
              <h2 className="text-title-large text-on-surface-variant">Your subscriptions <span className="text-body-medium">· سلة الاشتراكات</span></h2>
              <button aria-label="Close cart" onClick={close} className="md-icon-btn"><X /></button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3">
              {items.length === 0 && (
                <div className="text-center py-16 text-on-surface-variant flex flex-col items-center gap-3">
                  <ShoppingCart size={40} />
                  <p className="text-body-large">Your cart is empty.</p>
                  <a href="#subscriptions" onClick={close} className="md-btn md-btn-text trailing-icon">Browse subscriptions <ArrowRight /></a>
                </div>
              )}
              {items.map((it) => (
                <div key={it.productId} className="md-card md-card-outlined p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-title-medium text-on-surface">{it.name}</div>
                      <div className="text-body-small text-on-surface-variant">{formatEGP(it.unitPrice)} / {it.unitLabel} / month</div>
                    </div>
                    <button aria-label={`Remove ${it.name}`} onClick={() => removeItem(it.productId)} className="md-icon-btn -mt-1 -mr-2"><Trash2 /></button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full border border-outline">
                      <button aria-label="Decrease" onClick={() => updateQuantity(it.productId, it.quantity - 1)} className="md-icon-btn"><Minus /></button>
                      <input aria-label={`${it.unitLabel} count`} type="number" min={1} value={it.quantity} onChange={(e) => updateQuantity(it.productId, Number(e.target.value))}
                        className="w-14 h-10 text-center bg-transparent text-title-medium text-on-surface outline-none" />
                      <button aria-label="Increase" onClick={() => updateQuantity(it.productId, it.quantity + 1)} className="md-icon-btn"><Plus /></button>
                    </div>
                    <span className="text-title-medium text-on-surface">{formatEGP(it.lineTotal)}</span>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <footer className="px-6 pt-4 pb-6">
                <hr className="md-divider mb-4" />
                <div className="flex justify-between items-baseline gap-2 flex-wrap mb-4">
                  <span className="text-body-medium text-on-surface-variant">Monthly total · الإجمالي الشهري</span>
                  <span className="text-headline-small text-on-surface">{formatEGP(total)}</span>
                </div>
                <button onClick={() => { setDrawerOpen(false); setCheckoutOpen(true); }} className="w-full md-btn md-btn-filled trailing-icon">
                  Checkout <ArrowRight />
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
