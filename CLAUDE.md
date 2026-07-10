# CLAUDE.md — ABIT Community Development Group Website

Project rules for Claude Code. Read this before making changes.
Full page/form/milestone spec lives in `ABIT_WEBSITE_BUILD_PLAN.md`.

## What this is
Marketing + programs website for ABIT Community Development Group, a nonprofit
empowering girls from underserved communities (Columbia, SC. Founder: Cierra Jenkins).
Recreate the homepage mockup exactly, then extend to a full multi-page site with
forms, an admin dashboard, and Zeffy donations.

## Stack (LOCKED — do not change without asking Shayne)
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS
- Postgres via `pg` — connection helper in `lib/db.ts`, use the `query()` helper
- Redis via `ioredis` — helper in `lib/redis.ts` (form rate-limiting, caching)
- File storage: Railway bucket (Tigris, S3-compatible) via the AWS S3 SDK
- Donations: Zeffy (embedded widget — no payment code on our side; switched
  from Givebutter before M6, see Status)
- Email: Brevo (form notifications + newsletter)
- Admin auth: bcryptjs + jose + zod (Shayne's reusable module)

Upgraded from Next 14.2.35 → 16.2.10 (+ React 18 → 19) before M4 to close out
two unpatched security advisories (1 high DoS, 1 moderate XSS via postcss)
that had no 14.x fix available. Used the official `@next/codemod` upgrade
tool; `npm audit` is clean (0 vulnerabilities). Don't downgrade without
checking whether the 14.x line has since been patched.

Next 16 route handlers, `cookies()`, `headers()`, and dynamic route `params`
are async now (return Promises) — matters starting M4 (API routes) and M5
(admin auth). Build new code against that from the start.

Next 16.2 also renamed the `middleware.ts` convention to `proxy.ts` (same
API, function renamed `middleware` → `proxy`). We're on `proxy.ts` — don't
recreate a `middleware.ts` file, Next will error if both exist.

## Brand
Tailwind tokens are already defined: `brand-purple` (#4B1E71), `brand-gold`
(#E5A823), `brand-teal` (#158A8C). Match the uploaded mockup: serif display
headers with a script/italic accent word, rounded cards, circular icon badges,
gradient purple hero, gold CTA underlines. Pull the frontend-design skill when
building UI.

## File structure
- `app/(site)/` — public marketing pages (has its own layout with
  Header/Footer). `app/admin/` — admin pages, NOT under the Header/Footer
  layout (own chrome in `app/admin/(dashboard)/layout.tsx`; `/admin/login`
  has no shared chrome). Route groups are the only reason for this split —
  Next's root layout always wraps every route, so this was the only way to
  give admin its own look.
- `components/` — reusable UI (header, footer, cards, buttons, forms,
  `components/admin/` for admin-only pieces)
- `lib/` — db.ts, redis.ts, auth.ts (bcryptjs + jose), session.ts
  (Server Component session helper), storage.ts (S3/Tigris uploads),
  validation.ts (all zod schemas), adminTables.ts + adminQuery.ts (the
  config-driven admin list views)
- `proxy.ts` — guards `/admin/*` and `/api/admin/*` (session cookie check)
- `db/schema.sql` — the database schema. Add any NEW tables here.

## Environment variables (already set on Railway)
- `DATABASE_URL`, `REDIS_URL` — auto-provided by Railway plugins
- `DATABASE_SSL` — only "true" if using the public Postgres URL
- Bucket: `BUCKET_ENDPOINT_URL`, `BUCKET_NAME`, `BUCKET_REGION`,
  `BUCKET_ACCESS_KEY_ID`, `BUCKET_SECRET_ACCESS_KEY` — set on Railway, but
  never live-tested (no credentials in the build sandbox) — verify the
  public URL format in `lib/storage.ts` matches your bucket's actual setup
- `BREVO_API_KEY`, `ABIT_NOTIFY_EMAIL` — needed for form notification emails
- `ADMIN_JWT_SECRET` — needed for `/admin` to work at all; signs session
  cookies, generate with `openssl rand -base64 32`

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
- M1 (design system) — DONE. Fonts (Playfair Display / Dancing Script / Inter),
  header nav (sticky, mobile menu), footer (link columns, contact, newsletter
  signup UI), and reusable Button/TextLink/Card/IconBadge/Container components.
  Logo asset in `public/logo.png`.
- M2 (home page) — DONE. All mockup sections built and responsive: Hero,
  Who We Are, The Challenge, How We Help, Stats band, Featured Program +
  Founder, Get Involved. Image slots use licensed Pexels stock (manually
  vetted for appropriateness — this is a minors-serving nonprofit) as
  placeholders; swap for real ABIT photos at M8 (launch polish).
- M3 (About + Programs pages) — DONE. About: mission statement (draft
  copy, pending Cierra's final wording), founder story, the ABIT
  framework (Achieve/Believe/Inspire/Teach), and a team section (only
  Cierra listed — no other board/team names or photos exist yet, so
  it says "coming soon" rather than inventing people). Programs: the
  four pillars in detail plus a dedicated Girlfriends Leadership
  Academy section. New `PageHero` component for interior-page banners.
- M4 (public forms + Postgres) — DONE. All 6 forms live: mentor
  (`/get-involved#mentor`), enrollment (`/enroll`), volunteer
  (`/get-involved#volunteer`), partner (`/get-involved#partner`),
  contact (`/contact`), newsletter (footer, inline success state).
  Each POSTs to an `/api/*` route: zod validation, Redis-backed rate
  limiting (5/hour/IP, fails open if Redis is down), Postgres insert,
  best-effort Brevo notification email to `ABIT_NOTIFY_EMAIL` (needs
  `BREVO_API_KEY` + `ABIT_NOTIFY_EMAIL` set on Railway — not set yet,
  so notifications currently no-op; forms still save fine without
  them). Shared `/thank-you?type=` page. Added `/privacy` — required
  before the enrollment form could go live per the safeguarding rule
  below; draft copy, not lawyer-reviewed. Enrollment notification
  emails deliberately omit the student's name/age/school/notes — only
  guardian name + email, per the safeguarding rule. "Host an event"
  (linked from the footer) temporarily reuses the contact form until
  Events ships at M5. Mentor resume upload is NOT wired yet — needs
  the Railway storage bucket (`lib/storage.ts`), planned for M5
  alongside the other bucket work; the field was left out of the form
  rather than faking it.
  Verified for real: stood up local Postgres 16 + Redis, ran the
  schema, and exercised every endpoint end-to-end (curl + a real
  headless-browser submission) — validation errors, successful
  inserts, rate-limit 429s, and the thank-you redirect all confirmed
  against live services, not just typecheck/build.
- M5 (Events + News + Admin CMS) — DONE.
  - Admin auth: session-cookie login at `/admin/login`, built fresh with
    bcryptjs + jose (no existing "reusable module" was ever provided).
    First admin is `abitcommunity@gmail.com` with a 6-digit password
    (explicit instruction — see security note below), seeded by hand via
    SQL, not a signup flow. Login is rate-limited 10 attempts/15min/IP.
  - Admin dashboard (`/admin`) shows live counts per submission type,
    linking into `/admin/[section]` — one dynamic page (config in
    `lib/adminTables.ts`) drives all 6 submission list views (mentors,
    enrollments, volunteers, partners, contacts, newsletter) with
    server-side search and CSV export, instead of 6 near-duplicate pages.
  - Events (`/admin/events`, public `/events` + `/events/[slug]` with
    RSVP) and News (`/admin/news`, public `/news` + `/news/[slug]`) full
    CRUD, sharing the `ImageUpload` component for cover photos.
  - Storage: `lib/storage.ts` uploads to the Railway Tigris bucket via
    AWS S3 SDK — code-reviewed and typechecked only, NOT live-tested
    (no real bucket credentials in the build sandbox, same situation as
    Brevo). Verify the public URL construction once BUCKET_* is set.
  - Security note: the admin password is a 6-digit PIN by explicit
    instruction, not my recommendation — small keyspace if the rate
    limit above is ever bypassed. Worth strengthening once there's more
    than one admin or this holds more sensitive data long-term.
  - Verified for real throughout: local Postgres + Redis, full
    login/logout/session flow, every submission list + search + CSV
    export against real leftover M4 data, full Events and News CRUD
    through a real headless browser (create → publish → appears on
    public site → RSVP/detail page works → delete cascades correctly),
    auth boundary tested on every protected route (`/admin/*` and
    `/api/admin/*` both reject unauthenticated requests).
- NEXT: M6 — Donations. Switched from Givebutter to Zeffy per Shayne's
  instruction (2026-07-10) — both are hosted/embedded widgets with no
  payment code on our side, so this doesn't change the architecture,
  just which platform's embed goes on the Donate page. Needs a Zeffy
  account + campaign/form created first to get the embed code.
