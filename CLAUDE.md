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
- `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `ABIT_NOTIFY_EMAIL` — needed for
  form notification + confirmation emails. `BREVO_SENDER_EMAIL` is the
  "From" on every outgoing email and must be verified as a sender in
  Brevo; `ABIT_NOTIFY_EMAIL` is just the delivery address for admin
  notifications and does NOT need Brevo verification — the two can (and
  during testing, do) point at different inboxes
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
    First admin is `abitcommunity1@gmail.com` with a 6-digit password
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
- M6 (Donations) — DONE. Switched from Givebutter to Zeffy per
  Shayne's instruction (2026-07-10) — both are hosted/embedded widgets
  with no payment code on our side, so this doesn't change the
  architecture, just which platform's embed goes on the Donate page.
  `/donate` (`components/DonateEmbed.tsx`) uses Zeffy's official v2
  inline-embed snippet: a `[data-zeffy-embed]` container their script
  (loaded via `next/script`) hydrates into the live donation form,
  with a fallback `<iframe>` that only activates if the script fails
  to load. Attribute names (`data-zeffy-embed`, `data-form-url`,
  `data-zeffy-embed-fallback`, `data-zeffy-embed-src`) must match
  Zeffy's script exactly — verified by fetching the live
  `zeffy-embed.js` from Zeffy and confirming those are the exact
  strings it queries for, not just trusting the pasted snippet.
  Non-standard iframe attrs (`allowpaymentrequest`, `allowtransparency`)
  and the bare `data-zeffy-embed` attribute needed a small
  `{...{ "attr-name": value }}` spread workaround since TypeScript's
  JSX types don't know about them. The header "Donate" button and
  every other Donate link across the site now lead to a working,
  live donation form instead of 404ing or a placeholder.
  Verified: tsc/eslint/build clean, rendered HTML byte-diffed against
  Zeffy's exact snippet, both Zeffy URLs (script + form) confirmed
  reachable (200). Could NOT get a live visual screenshot of the
  hydrated form in this sandbox — the headless browser can't be routed
  through the outbound proxy for external HTTPS the way curl can, a
  sandbox-only limitation. Worth a real click-through once deployed to
  confirm the checkout flow itself works end to end.
- M7 (Email + confirmations polish) — DONE. Every public form (mentor,
  enroll, volunteer, partner, contact, newsletter, event RSVP) now sends
  a branded submitter confirmation email in addition to the existing
  ABIT notification, both through `lib/email.ts` → Brevo's transactional
  email API, wrapped in a shared purple/gold template
  (`lib/emailTemplates.ts`). Notification emails also now set `replyTo`
  to the submitter's address so replying from the ABIT inbox goes
  straight to them, and the RSVP notification includes the event title
  (previously missing). Enrollment confirmation to the guardian includes
  the student's first name (explicit instruction from Shayne); the
  ABIT-facing notification stays fully generic — guardian name/email
  only — per the safeguarding rule. Newsletter signups now sync to a
  real Brevo contact list (`lib/email.ts`'s `syncNewsletterContact`,
  called fire-and-forget so a Brevo hiccup can't fail the signup) —
  auto-creates an "ABIT Website" folder and "ABIT Newsletter" list on
  first use via Brevo's Contacts API, so no manual Brevo setup is
  needed before this works. All of it is best-effort: still a no-op
  (with a console warning) if `BREVO_API_KEY`/`ABIT_NOTIFY_EMAIL`
  aren't set, exactly like the M4 notification behavior.
  Verified for real: local Postgres + Redis, plus a local mock Brevo
  server (`/v3/smtp/email`, `/v3/contacts/folders`, `/v3/contacts/lists`,
  `/v3/contacts`) that `lib/email.ts` was pointed at via a new
  `BREVO_API_BASE` env var (defaults to the real Brevo API; only
  overridden for this test). Posted real requests to all 7 endpoints
  and inspected every outbound payload the mock server received —
  confirmed correct subject/body/replyTo on both notification and
  confirmation emails per form, confirmed the newsletter flow creates
  the folder + list once and reuses them (via GET lookup) on a second
  signup, and confirmed the `BREVO_API_KEY`-unset path still no-ops
  cleanly (forms save fine, warnings logged, no crash) — matching
  today's actual Railway state, since Brevo isn't configured there yet.
- Bug fix (2026-07-24): a guardian testing Enroll-a-Student at a school
  reported the form "did nothing" — no confirmation, no email. Root
  cause: every one of the 7 public forms had a `<form>` with no
  `noValidate`, so the browser's native HTML5 constraint validation
  (required fields, checkbox `required`, number `min`/`max`, `type=email`
  format) ran BEFORE React's `onSubmit` handler and silently blocked
  submission on any violation — no network request, no custom error,
  just a small native browser tooltip that's easy to miss (especially
  on mobile Safari). This made the app's actual validation UI (zod +
  styled field errors, built in M4) effectively dead code for the most
  common case: a missing required field or unchecked consent box.
  Reproduced with Playwright (unchecked consent checkbox on Enroll,
  out-of-range student age) — confirmed zero network request and zero
  visible error in both cases, exactly matching the report. Fixed by
  adding `noValidate` to all 7 forms (mentor, enroll, volunteer,
  partner, contact, newsletter, RSVP) so every submission always goes
  through the JS handler and the existing custom validation UI, which
  was already correct and just needed to actually run.
  Verified for real: local Postgres + Redis + Playwright. Re-ran both
  repro cases post-fix — both now fire the request and show the
  correct styled field-specific error. Ran a full valid-submission
  pass across all 7 forms and confirmed a row landed in the right
  Postgres table for each one.
- Split the Brevo sender from the notify address (2026-07-24): added
  `BREVO_SENDER_EMAIL` as the "From" on every outgoing email — it must
  be verified as a sender in Brevo. `ABIT_NOTIFY_EMAIL` is now only the
  delivery address for admin notifications and does NOT need Brevo
  verification, so the two can point at different inboxes. This lets
  Shayne test the full email flow with a personal verified sender
  before Cierra has purchased a domain (and thus a proper
  `@abitcommunity...`-style sender address). Every form still sends
  both emails on submission: an admin notification to
  `ABIT_NOTIFY_EMAIL` and a submitter confirmation to whatever address
  they typed into the form — both now sent "from" `BREVO_SENDER_EMAIL`.
  Verified for real with a local mock Brevo server using two different
  addresses: confirmed the outgoing email's `sender.email` was the
  test sender address while the admin notification's `to` was the
  separate notify address and the submitter confirmation's `to` was
  the form submitter's own address.
- NEXT: M8 — Launch polish (SEO/meta, real images, privacy/terms review,
  domain, favicon, analytics).
