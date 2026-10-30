import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingCart, Trash2, X, ArrowRight } from "lucide-react";
import { formatEGP, useCart } from "../../context/CartContext";

const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

export function CartButton({ className = "" }: { className?: string }) {
  const { count, setDrawerOpen } = useCart();
  return (
    <button aria-label={`Open cart (${count} items)`} onClick={() => setDrawerOpen(true)}
      className={`relative w-10 h-10 rounded-full grid place-items-center text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container-high)] transition-colors ${className}`}>
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold grid place-items-center bg-[var(--md-primary)] text-[var(--md-on-primary)]">{count}</span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { items, total, drawerOpen, setDrawerOpen, updateQuantity, removeItem, setCheckoutOpen } = useCart();
  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} />
          <motion.aside role="dialog" aria-label="Cart" className="fixed top-0 right-0 z-[95] h-full w-full sm:w-[420px] flex flex-col bg-[var(--md-surface-container-low)] border-l border-[var(--md-outline-variant)] shadow-2xl"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}>
            <header className="flex items-center justify-between px-5 py-4 border-b border-[var(--md-outline-variant)]">
              <h2 className="text-lg font-bold text-[var(--md-on-surface)]" style={jakarta}>Your subscriptions <span className="text-sm font-normal text-[var(--md-on-surface-variant)]">· سلة الاشتراكات</span></h2>
              <button aria-label="Close cart" onClick={() => setDrawerOpen(false)} className="w-9 h-9 rounded-full grid place-items-center text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container-high)]"><X size={18} /></button>
            </header>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 && (
                <div className="text-center py-16 text-[var(--md-on-surface-variant)]">
                  <ShoppingCart className="mx-auto mb-3 opacity-50" size={36} />
                  <p>Your cart is empty.</p>
                  <a href="#subscriptions" onClick={() => setDrawerOpen(false)} className="mt-3 inline-block text-sm font-semibold text-[var(--md-primary)] hover:underline">Browse subscriptions →</a>
                </div>
              )}
              {items.map((it) => (
                <div key={it.productId} className="rounded-2xl p-4 bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-[var(--md-on-surface)]">{it.name}</div>
                      <div className="text-xs text-[var(--md-on-surface-variant)]">{formatEGP(it.unitPrice)} / {it.unitLabel} / month</div>
                    </div>
                    <button aria-label={`Remove ${it.name}`} onClick={() => removeItem(it.productId)} className="text-[var(--md-on-surface-variant)] hover:text-red-400"><Trash2 size={16} /></button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-xl border border-[var(--md-outline-variant)]">
                        <button aria-label="Decrease" onClick={() => updateQuantity(it.productId, it.quantity - 1)} className="w-8 h-8 grid place-items-center text-[var(--md-on-surface)]"><Minus size={14} /></button>
                        <input aria-label={`${it.unitLabel} count`} type="number" min={1} value={it.quantity} onChange={(e) => updateQuantity(it.productId, Number(e.target.value))}
                          className="w-14 text-center bg-transparent text-sm text-[var(--md-on-surface)] outline-none [appearance:textfield]" />
                        <button aria-label="Increase" onClick={() => updateQuantity(it.productId, it.quantity + 1)} className="w-8 h-8 grid place-items-center text-[var(--md-on-surface)]"><Plus size={14} /></button>
                      </div>
                    <span className="font-bold text-[var(--md-on-surface)]">{formatEGP(it.lineTotal)}</span>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <footer className="p-5 border-t border-[var(--md-outline-variant)]">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-sm text-[var(--md-on-surface-variant)]">Monthly total · الإجمالي الشهري</span>
                  <span className="text-2xl font-extrabold text-[var(--md-on-surface)]" style={jakarta}>{formatEGP(total)}</span>
                </div>
                <button onClick={() => { setDrawerOpen(false); setCheckoutOpen(true); }} className="w-full py-3.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 bg-[var(--md-primary)] text-[var(--md-on-primary)]">
                  Checkout <ArrowRight size={16} />
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
