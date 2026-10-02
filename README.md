# Velour

One-page website for Velour, a premium soft-serve brand, built with Next.js and Tailwind on the Velour design system (tokens, Lora, logos and cups live in `src/app/globals.css` and `public/`).

## Run

```bash
npm install
npm run dev
```

## Checkout

The cart drawer posts to `/api/checkout`, which creates a Stripe Checkout session. Prices come from `src/lib/catalog.ts` on the server. Set:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SITE_URL=https://your-domain   # optional
```

Without a key the checkout button shows "Online checkout is not configured yet."

## Before launch

- Replace the placeholder reviews and FAQ answers in `src/components/content-sections.tsx`.
- Replace the address, hours and email in the Visit section (`src/components/footer-sections.tsx`).
- Newsletter: set `NEWSLETTER_WEBHOOK_URL` to forward sign-ups (otherwise the form reports it is unavailable).
