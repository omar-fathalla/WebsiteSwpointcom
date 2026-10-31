import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Dialog } from "../../md3/Dialog";


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

  const ok = status === "success";
  const close = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("payment");
    window.history.replaceState({}, "", url.toString());
    setStatus(null);
  };

  return (
    <Dialog open={!!status} onClose={close} label={ok ? "Payment successful" : "Payment failed"} z={110}>
      <div role="alertdialog" aria-live="assertive" className="p-6 md:p-6 flex flex-col items-center text-center my-auto">
        {ok ? <CheckCircle2 size={24} className="text-primary" /> : <XCircle size={24} className="text-error" />}
        <h2 className="mt-4 text-headline-small text-on-surface">{ok ? "Payment successful" : "Payment failed"}</h2>
        <p className="mt-1 text-body-large text-on-surface-variant" dir="rtl">{ok ? "تم الدفع بنجاح" : "لم تتم عملية الدفع"}</p>
        <p className="mt-4 text-body-medium text-on-surface-variant">
          {ok ? "Thank you! Our team will contact you within one business day to activate your subscription." : "No money was taken. You can try again or contact us for help."}
        </p>
        <div className="mt-6 self-stretch flex justify-end gap-2">
          <button onClick={close} className="md-btn md-btn-text">Back to site</button>
          {!ok && <button onClick={() => { close(); setCheckoutOpen(true); }} className="md-btn md-btn-filled">Try again</button>}
        </div>
      </div>
    </Dialog>
  );
}
