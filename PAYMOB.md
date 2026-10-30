# Paymob integration (frontend ready, backend TODO)

The website cart and checkout are ready. The frontend **never** holds Paymob secret keys.
It calls our own backend, which talks to Paymob.

## Frontend config
```
# .env.local (Vercel → Project → Environment Variables)
VITE_PAYMENT_API_URL=https://api.sw-point.com/payments/paymob/checkout
```
Only this public URL is used in the browser (`src/app/services/payment.ts → createPaymobCheckout`).
If it is missing, checkout shows "Payment is not configured yet".

## Endpoint 1: create checkout. `POST {VITE_PAYMENT_API_URL}`
Request body sent by the site:
```json
{
  "items": [{ "productId": "tashil", "name": "Tashil", "quantity": 10, "unitPrice": 83.33, "lineTotal": 833.3 }],
  "total": 833.3,
  "currency": "EGP",
  "billing": { "name": "", "company": "", "email": "", "phone": "" },
  "successUrl": "https://www.sw-point.com/?payment=success",
  "failureUrl": "https://www.sw-point.com/?payment=failed"
}
```
The server must:
1. **Recalculate prices on the server** from its own price list (Tashil 83.33/employee, Gift 1,000/branch,
   Data Sharing 5,000 flat), and never trust `unitPrice`/`total` from the browser.
2. Save a pending order in the DB.
3. Call the Paymob **Intention API**: `POST https://accept.paymob.com/v1/intention/`
   with header `Authorization: Token <PAYMOB_SECRET_KEY>` (server env only) and a body containing
   `amount` (piasters = EGP × 100, integer), `currency: "EGP"`, `payment_methods: [<integration ids>]`,
   `items`, `billing_data` (first_name, last_name, email, phone_number…), `special_reference` (our order id),
   `notification_url` (the webhook below) and `redirection_url`.
4. Return one of:
```json
{ "redirectUrl": "https://accept.paymob.com/unifiedcheckout/?publicKey=...&clientSecret=..." }
// or
{ "clientSecret": "...", "publicKey": "egy_pk_live_..." }
```
The public key is safe to expose; the secret key and HMAC secret are not.

## Endpoint 2: webhook. `POST /payments/paymob/webhook` (the `notification_url`)
- Verify the **HMAC** (SHA-512 using `PAYMOB_HMAC_SECRET` over Paymob's documented ordered fields).
  Reject the request if it doesn't match.
- If `success === true` and the amount matches the order, mark the order paid and activate the subscription.
- This webhook is the only source of truth. The `?payment=success` page on the site is display only.

## Redirect back
Paymob's `redirection_url` should send the user to `successUrl` or `failureUrl`.
The site reads `?payment=success|failed` and shows the result dialog (`PaymentResult.tsx`).

## Recurring billing (TODO)
These are monthly plans. For automatic renewal, use Paymob subscriptions/card tokens server-side,
or send a monthly payment link. That's not implemented yet.
