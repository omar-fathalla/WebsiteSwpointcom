import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";

const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

/**
 * Shows the result when Paymob redirects back with ?payment=success|failed.
 * NOTE: this is display only. The real confirmation is the server-side
 * webhook (HMAC-verified) — see PAYMOB.md.
 */
export function PaymentResult() {
  const { clear, setCheckoutOpen } = useCart();
  const [status, setStatus] = useState<"success" | "failed" | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("payment");
    if (p === "success" || p === "failed") {
      setStatus(p);
      if (p === "success") clear();
    }
  }, [clear]);

  if (!status) return null;
  const ok = status === "success";
  const close = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("payment");
    window.history.replaceState({}, "", url.toString());
    setStatus(null);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm grid place-items-center p-4">
      <div role="alertdialog" className="w-full max-w-md rounded-3xl p-8 text-center bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)] shadow-2xl">
        {ok ? <CheckCircle2 size={56} className="mx-auto text-emerald-400" /> : <XCircle size={56} className="mx-auto text-red-400" />}
        <h2 className="mt-4 text-2xl font-extrabold text-[var(--md-on-surface)]" style={jakarta}>{ok ? "Payment successful" : "Payment failed"}</h2>
        <p className="mt-1 text-[var(--md-on-surface-variant)]" dir="rtl">{ok ? "تم الدفع بنجاح" : "لم تتم عملية الدفع"}</p>
        <p className="mt-3 text-sm text-[var(--md-on-surface-variant)]">
          {ok ? "Thank you! Our team will contact you within one business day to activate your subscription." : "No money was taken. You can try again or contact us for help."}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          {!ok && <button onClick={() => { close(); setCheckoutOpen(true); }} className="px-5 py-3 rounded-xl text-sm font-semibold bg-[var(--md-primary)] text-[var(--md-on-primary)]">Try again</button>}
          <button onClick={close} className="px-5 py-3 rounded-xl text-sm font-semibold bg-[var(--md-surface-container-high)] text-[var(--md-on-surface)] border border-[var(--md-outline-variant)]">Back to site</button>
        </div>
      </div>
    </div>
  );
}
