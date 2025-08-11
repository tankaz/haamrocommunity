
# Community Portal Pro (Next.js + Prisma + Postgres)

An extended foundation for a community web portal with **subscriptions (Stripe)**, **sponsored listings**, **coupons**, **ticketing (demo)**, **lead capture**, **moderation**, **cookie consent (opt‑in)**, **GA4 (consent‑gated)**, and **DSAR export/delete**.

## Quick start

```bash
npm i
# Start Postgres + Meilisearch
docker compose up -d
cp .env.example .env.local
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000 → Dashboard → **Create demo data**.

## Major features
- **Monetization**: Stripe subscription checkout endpoint (`/api/billing/create-checkout-session`) and sponsored placements (`/api/sponsor/schedule`).
- **Leads**: POST `/api/leads` with `listingId`, `name`, `email`, `message`.
- **Coupons**: POST `/api/coupons/redeem` with `code` (increments redemptions).
- **Events Ticketing (demo)**: POST `/api/checkout/ticket` (uses Stripe if configured; otherwise demo mode).
- **Moderation**: `/dashboard/moderation` with approve/reject to move `PENDING` → `PUBLISHED|REJECTED`.
- **Analytics**: `/dashboard/analytics` shows basic counts; GA4 loads only after **Accept analytics**.
- **Cookie Consent**: Banner stores consent (`localStorage.consent`). GA4 loaded only when `analytics=true` and `NEXT_PUBLIC_GA_ID` is set, with IP anonymization.
- **DSAR**: 
  - Export: `GET /api/dsar/export?email=user@example.com`
  - Delete: `POST /api/dsar/delete` with `{ email }`

> ⚠️ Secure these endpoints behind authentication/authorization before production.

## Environment
- `NEXT_PUBLIC_GA_ID` – GA4 measurement ID.
- `STRIPE_SECRET_KEY`, `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_WEBHOOK_SECRET` – enable Stripe checkout.

## Notes
- This code is **MVP/demo**. Before production: add auth (NextAuth), RBAC, input validation (Zod), rate limits, email notifications, file storage, and accessibility audits.
- Keep non‑essential tracking disabled until consent is provided.
```
