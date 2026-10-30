/**
 * Payment service layer (Paymob-ready).
 *
 * The frontend NEVER talks to Paymob with a secret key. It sends the order to
 * our own backend (VITE_PAYMENT_API_URL), which creates a Paymob Intention
 * using the secret key stored server-side and returns where to send the user.
 * See PAYMOB.md for the expected server contract.
 */
import type { CartItem } from "../context/CartContext";

export interface BillingInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface CheckoutOrder {
  items: Pick<CartItem, "productId" | "name" | "quantity" | "unitPrice" | "lineTotal">[];
  /** Monthly total in EGP */
  total: number;
  currency: "EGP";
  billing: BillingInfo;
  /** Where Paymob should send the customer back to */
  successUrl: string;
  failureUrl: string;
}

export interface CheckoutResponse {
  /** Paymob unified checkout URL (preferred) */
  redirectUrl?: string;
  /** Alternatively, build the unified-checkout URL from these */
  clientSecret?: string;
  publicKey?: string;
  /** Legacy iframe flow */
  iframeUrl?: string;
  orderId?: string;
}

export class PaymentError extends Error {}

const API_URL = import.meta.env.VITE_PAYMENT_API_URL as string | undefined;

export function isPaymentConfigured() {
  return Boolean(API_URL);
}

/** Creates a checkout session via our backend and returns the URL to redirect to. */
export async function createPaymobCheckout(order: CheckoutOrder): Promise<string> {
  // TODO(paymob): set VITE_PAYMENT_API_URL to the backend endpoint described in PAYMOB.md.
  if (!API_URL) throw new PaymentError("Payment is not configured yet (VITE_PAYMENT_API_URL is missing).");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new PaymentError(`Payment server error (${res.status}).`);
  const data = (await res.json()) as CheckoutResponse;

  if (data.redirectUrl) return data.redirectUrl;
  if (data.iframeUrl) return data.iframeUrl;
  if (data.clientSecret && data.publicKey) {
    return `https://accept.paymob.com/unifiedcheckout/?publicKey=${encodeURIComponent(data.publicKey)}&clientSecret=${encodeURIComponent(data.clientSecret)}`;
  }
  throw new PaymentError("Payment server returned no redirect URL.");
}

/** Sends the browser to Paymob. */
export function redirectToPayment(url: string) {
  window.location.assign(url);
}
