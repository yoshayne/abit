# CLAUDE.md — ABIT Community Development Group Website

Project rules for Claude Code. Read this before making changes.
Full page/form/milestone spec lives in `ABIT_WEBSITE_BUILD_PLAN.md`.

## What this is
Marketing + programs website for ABIT Community Development Group, a nonprofit
empowering girls from underserved communities (Columbia, SC. Founder: Cierra Jenkins).
Recreate the homepage mockup exactly, then extend to a full multi-page site with
forms, an admin dashboard, and Givebutter donations.

## Stack (LOCKED — do not change without asking Shayne)
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Postgres via `pg` — connection helper in `lib/db.ts`, use the `query()` helper
- Redis via `ioredis` — helper in `lib/redis.ts` (form rate-limiting, caching)
- File storage: Railway bucket (Tigris, S3-compatible) via the AWS S3 SDK
- Donations: Givebutter (embedded widget — no payment code on our side)
- Email: Brevo (form notifications + newsletter)
- Admin auth: bcryptjs + jose + zod (Shayne's reusable module)

Do NOT upgrade Next.js to v16 (breaking). We're pinned to the latest 14.2.x.

## Brand
Tailwind tokens are already defined: `brand-purple` (#4B1E71), `brand-gold`
(#E5A823), `brand-teal` (#158A8C). Match the uploaded mockup: serif display
headers with a script/italic accent word, rounded cards, circular icon badges,
gradient purple hero, gold CTA underlines. Pull the frontend-design skill when
building UI.

## File structure
- `app/` — pages (App Router)
- `components/` — reusable UI (header, footer, cards, buttons, forms)
- `lib/` — db.ts, redis.ts, and later storage.ts / auth helpers
- `db/schema.sql` — the database schema. Add any NEW tables here.

## Environment variables (already set on Railway)
- `DATABASE_URL`, `REDIS_URL` — auto-provided by Railway plugins
- `DATABASE_SSL` — only "true" if using the public Postgres URL
- Bucket: `BUCKET_ENDPOINT_URL`, `BUCKET_NAME`, `BUCKET_REGION`,
  `BUCKET_ACCESS_KEY_ID`, `BUCKET_SECRET_ACCESS_KEY`
- Added later: `BREVO_API_KEY`, `ABIT_NOTIFY_EMAIL`, `ADMIN_JWT_SECRET`

## Deploy
Push to `main` → Railway auto-deploys. No pull requests.

## Working style (important — Shayne is a non-coder)
- Build ONE milestone at a time, in order (see the build plan).
- Provide COMPLETE, ready-to-paste files — not fragments.
- Discuss the approach before building anything non-trivial.
- Flag risky/expensive/irreversible decisions in plain language BEFORE doing them.

## Safeguarding
The Enroll-a-Student form collects a MINOR's personal info. Keep fields minimal,
require guardian consent, and store submissions in Postgres (never email raw
minor data around). Reflect this in the Privacy Policy.

## Status
- M0 (foundation) — DONE. Scaffolding builds and deploys.
- NEXT: M1 — header nav, footer, and design system matched to the mockup.
