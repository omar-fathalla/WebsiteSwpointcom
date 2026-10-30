import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lock, X, Loader2, AlertTriangle } from "lucide-react";
import { formatEGP, useCart } from "../../context/CartContext";
import { createPaymobCheckout, isPaymentConfigured, redirectToPayment, type BillingInfo } from "../../services/payment";

const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const FIELDS: { key: keyof BillingInfo; label: string; ar: string; type: string; auto: string }[] = [
  { key: "name", label: "Full name", ar: "الاسم", type: "text", auto: "name" },
  { key: "company", label: "Company", ar: "الشركة", type: "text", auto: "organization" },
  { key: "email", label: "Email", ar: "البريد الإلكتروني", type: "email", auto: "email" },
  { key: "phone", label: "Phone", ar: "رقم الموبايل", type: "tel", auto: "tel" },
];

export function CheckoutModal() {
  const { items, total, checkoutOpen, setCheckoutOpen } = useCart();
  const [billing, setBilling] = useState<BillingInfo>({ name: "", company: "", email: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^\+?[0-9\s-]{10,15}$/.test(billing.phone)) return setError("Please enter a valid phone number.");
    setBusy(true);
    try {
      const base = `${window.location.origin}${window.location.pathname}`;
      const url = await createPaymobCheckout({
        items: items.map(({ productId, name, quantity, unitPrice, lineTotal }) => ({ productId, name, quantity, unitPrice, lineTotal })),
        total, currency: "EGP", billing,
        successUrl: `${base}?payment=success`,
        failureUrl: `${base}?payment=failed`,
      });
      redirectToPayment(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed to start.");
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <motion.div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="min-h-full flex items-center justify-center p-4">
            <motion.div role="dialog" aria-label="Checkout" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)] shadow-2xl">
              <button aria-label="Close checkout" onClick={() => setCheckoutOpen(false)} className="absolute top-4 right-4 w-9 h-9 rounded-full grid place-items-center text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container-high)]"><X size={18} /></button>
              <div className="grid md:grid-cols-[1.2fr_1fr]">
                <form onSubmit={submit} className="p-6 sm:p-8">
                  <h2 className="text-2xl font-extrabold text-[var(--md-on-surface)]" style={jakarta}>Checkout</h2>
                  <p className="text-sm text-[var(--md-on-surface-variant)] mb-6">Billing details · بيانات الفاتورة</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {FIELDS.map((f) => (
                      <label key={f.key} className="block">
                        <span className="flex justify-between text-xs font-semibold text-[var(--md-on-surface-variant)] mb-1.5"><span>{f.label}</span><span dir="rtl">{f.ar}</span></span>
                        <input required type={f.type} autoComplete={f.auto} dir="auto" value={billing[f.key]}
                          onChange={(e) => setBilling({ ...billing, [f.key]: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] text-[var(--md-on-surface)] outline-none focus:border-[var(--md-primary)]" />
                      </label>
                    ))}
                  </div>
                  {error && (
                    <div className="mt-5 flex items-start gap-2 text-sm rounded-xl p-3 bg-red-500/10 border border-red-500/30 text-red-300"><AlertTriangle size={16} className="shrink-0 mt-0.5" />{error}</div>
                  )}
                  {!isPaymentConfigured() && !error && (
                    <p className="mt-5 text-xs text-amber-300/80">Test mode: payment backend not connected yet.</p>
                  )}
                  <button type="submit" disabled={busy || items.length === 0}
                    className="mt-6 w-full py-3.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 bg-[var(--md-primary)] text-[var(--md-on-primary)] disabled:opacity-60">
                    {busy ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />} Pay {formatEGP(total)} with Paymob
                  </button>
                  <p className="mt-3 text-[11px] text-center text-[var(--md-outline)]">Cards, wallets and installments processed securely by Paymob. Billed monthly.</p>
                </form>
                <aside className="p-6 sm:p-8 bg-[var(--md-surface-container)] md:rounded-r-3xl rounded-b-3xl md:rounded-bl-none border-t md:border-t-0 md:border-l border-[var(--md-outline-variant)]">
                  <h3 className="font-bold text-[var(--md-on-surface)] mb-4" style={jakarta}>Order summary · ملخص الطلب</h3>
                  <ul className="space-y-3">
                    {items.map((it) => (
                      <li key={it.productId} className="flex justify-between gap-3 text-sm">
                        <div>
                          <div className="text-[var(--md-on-surface)] font-medium">{it.name}</div>
                          <div className="text-xs text-[var(--md-on-surface-variant)]">{`${it.quantity} ${it.unitLabel}${it.quantity > 1 ? "s" : ""} × ${formatEGP(it.unitPrice)}`}</div>
                        </div>
                        <span className="text-[var(--md-on-surface)] font-semibold whitespace-nowrap">{formatEGP(it.lineTotal)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-[var(--md-outline-variant)] flex justify-between items-baseline">
                    <span className="text-sm text-[var(--md-on-surface-variant)]">Total / month</span>
                    <span className="text-2xl font-extrabold text-[var(--md-on-surface)]" style={jakarta}>{formatEGP(total)}</span>
                  </div>
                </aside>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
