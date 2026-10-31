import { useState, type FormEvent } from "react";
import { Dialog } from "../../md3/Dialog";
import { Lock, X, Loader2, AlertTriangle } from "lucide-react";
import { formatEGP, useCart } from "../../context/CartContext";
import { createPaymobCheckout, isPaymentConfigured, redirectToPayment, type BillingInfo } from "../../services/payment";

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

  const close = () => setCheckoutOpen(false);

  return (
    <Dialog open={checkoutOpen} onClose={close} label="Checkout" size="wide">
      <div className="flex items-center gap-2 pl-6 pr-3 pt-4 md:hidden">
        <button aria-label="Close checkout" onClick={close} className="md-icon-btn -ml-3"><X /></button>
        <h2 className="text-title-large text-on-surface">Checkout</h2>
      </div>
      <div className="overflow-y-auto grid md:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="p-6 md:p-8 relative">
          <h2 className="hidden md:block text-headline-small text-on-surface">Checkout</h2>
          <p className="text-body-medium text-on-surface-variant mt-1 mb-6">Billing details · بيانات الفاتورة</p>
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-5">
            {FIELDS.map((f) => (
              <div key={f.key} className="md-field">
                <input id={`bill-${f.key}`} required type={f.type} autoComplete={f.auto} dir="auto" value={billing[f.key]}
                  onChange={(e) => setBilling({ ...billing, [f.key]: e.target.value })} />
                <label htmlFor={`bill-${f.key}`}>{f.label} · <span dir="rtl">{f.ar}</span></label>
              </div>
            ))}
          </div>
          {error && (
            <div role="alert" className="mt-5 flex items-start gap-2 text-body-medium rounded-[12px] p-3 bg-error-container text-on-error-container"><AlertTriangle size={20} className="shrink-0" />{error}</div>
          )}
          {!isPaymentConfigured() && !error && (
            <p className="mt-5 text-body-small text-tertiary">Test mode: payment backend not connected yet.</p>
          )}
          <button type="submit" disabled={busy || items.length === 0} className="mt-6 w-full md-btn md-btn-filled has-icon">
            {busy ? <Loader2 className="animate-spin" /> : <Lock />} Pay {formatEGP(total)} with Paymob
          </button>
          <p className="mt-3 text-body-small text-center text-on-surface-variant">Cards, wallets and installments processed securely by Paymob. Billed monthly.</p>
        </form>
        <aside className="p-6 md:p-8 bg-surface-container-highest relative">
          <button aria-label="Close checkout" onClick={close} className="md-icon-btn hidden md:inline-flex absolute top-3 right-3"><X /></button>
          <h3 className="text-title-medium text-on-surface mb-4 md:pr-10">Order summary · ملخص الطلب</h3>
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.productId} className="flex justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-body-large text-on-surface">{it.name}</div>
                  <div className="text-body-small text-on-surface-variant">{`${it.quantity} ${it.unitLabel}${it.quantity > 1 ? "s" : ""} × ${formatEGP(it.unitPrice)}`}</div>
                </div>
                <span className="text-title-small text-on-surface whitespace-nowrap">{formatEGP(it.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <hr className="md-divider mt-5" />
          <div className="pt-4 flex justify-between items-baseline gap-2 flex-wrap">
            <span className="text-body-medium text-on-surface-variant">Total / month</span>
            <span className="text-headline-small text-on-surface">{formatEGP(total)}</span>
          </div>
        </aside>
      </div>
    </Dialog>
  );
}
