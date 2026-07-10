# ABIT Community Development Group — Website Build Plan

**Prepared for:** Shayne Johnson
**Client:** ABIT Community Development Group (Founder: Cierra Jenkins, Columbia SC)
**Deploy flow:** Claude Code → GitHub → Railway (auto-deploy on push to `main`)
**Goal:** Recreate the uploaded homepage mockup exactly, then extend into a full multi-page nonprofit site with working forms, admin dashboard, and online donations.

---

## 0. Decisions to confirm before we build

These change the code, so let's lock them first:

1. **Framework — recommended: Next.js (App Router).**
   Best fit for a polished, image-heavy marketing site + forms + admin + Stripe, and Railway supports it natively. Your alternative (Hono + `@hono/node-server`, your usual stack) also works but means hand-rolling more of the page/routing layer. My recommendation is Next.js for this one.

2. **Donations — Stripe vs. a nonprofit platform (Donorbox / Givebutter).**
   Stripe = full control, lives inside the site, you already know it. Donorbox/Givebutter = automatic tax-deductible receipts and recurring giving out of the box, but it's a hosted widget. Recommendation: **Stripe** (one-time + monthly recurring), and we generate simple email receipts ourselves.

3. **Images of the girls.**
   I can't generate images in this chat. Three real options: (a) **licensed stock** photos of diverse teen girls, (b) **real photos** of actual ABIT participants (best for credibility — needs signed photo releases, especially for minors), or (c) AI-generated in your own image tool. Recommendation: real program photos where possible, stock as filler. Tell me which and I'll build the image slots to match.

4. **Content management for News & Events.**
   Recommended: build a small **admin dashboard** so you/Cierra can post events and news without touching code. (Uses your existing reusable auth module.)

---

## 1. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Pages, forms, admin, API all in one |
| Styling | Tailwind CSS | Matches the mockup's card/rounded look fast |
| Hosting | Railway | GitHub auto-deploy |
| Database | Railway Postgres | All form submissions + content |
| Cache/queue | Railway Redis | Form rate-limiting (spam), caching published content |
| File storage | Railway storage bucket | News/event images, mentor resume uploads |
| Payments | Zeffy (hosted) | Recurring giving + tax receipts handled by Zeffy; embedded on Donate page (switched from Givebutter — see CLAUDE.md Status) |
| Email | Brevo (you already have it) | Form notifications, confirmations, newsletter |
| Auth (admin) | Your reusable module (bcryptjs + jose + zod) | Protects the admin dashboard |

---

## 2. Design system (pulled from the mockup + logo)

- **Colors:** deep purple (primary), gold/amber (accent), teal (secondary), white background, dark purple footer.
- **Type:** serif display headers with a script/italic accent word (e.g. "*Thrive*", "*Succeed*"), clean sans-serif body.
- **Components:** rounded cards, circular icon badges, gradient purple hero, stat band, gold CTA underlines.
- When we build the UI I'll pull the `frontend-design` skill and match the mockup pixel-for-pixel.

---

## 3. Site map — pages

| # | Page | Purpose |
|---|---|---|
| 1 | **Home** | The mockup: hero, who we are, the challenge, how we help, stats, featured program, founder, get-involved, footer |
| 2 | **About Us** | Mission, Cierra's founder story, the bumble-bee 4 stages (Achieve/Believe/Inspire/Teach), team/board |
| 3 | **Programs** | Life Skills, Leadership, Career & Entrepreneurship, Community Engagement + featured Girlfriends Leadership Academy |
| 4 | **Get Involved** | Become a Mentor, Volunteer, Partner with ABIT |
| 5 | **Events** | Event list + individual event pages + RSVP |
| 6 | **News** | Blog/updates list + article pages |
| 7 | **Contact** | Contact form + phone/email/location |
| 8 | **Donate** | Donation page (Stripe) |
| 9 | **Enroll a Student** | Enrollment form (from hero CTA) |
| — | Privacy Policy / Terms | Footer links (needed for forms + payments) |
| — | Thank-you pages | After each form/donation submits |
| — | **Admin** (`/admin`) | Login + dashboard (not public) |

---

## 4. Forms — every one, with fields

**1. Mentor Application** (Become a Mentor)
Name, email, phone, city, confirm 18+, occupation/employer, area of interest (Life Skills / Leadership / Career & Entrepreneurship / Community Engagement), availability, why you want to mentor, optional resume upload, background-check consent checkbox.

**2. Student Enrollment** *(collects minor data — handle carefully)*
Student name, age/grade, school, parent/guardian name, guardian phone + email, city/zip, program(s) of interest, how they heard about ABIT, notes/accommodations, **parent/guardian consent checkbox** (required).

**3. Volunteer Signup**
Name, email, phone, interests, availability, one-time vs. ongoing.

**4. Partner Inquiry**
Organization, contact name, email, phone, partner type (school / business / church / sponsor), message.

**5. Contact**
Name, email, subject, message.

**6. Newsletter Subscribe**
Email (+ optional first name). Footer + inline.

**7. Event RSVP / Registration**
Name, email, phone, party size, tied to a specific event.

**8. Donation** (Stripe)
Preset amounts + custom, one-time vs. monthly, donor name, email, optional dedication, "cover the processing fee" checkbox.

> **Safeguarding note:** the enrollment form collects a minor's personal info. Keep fields to the minimum needed, require guardian consent, store securely in Postgres (not in email bodies), and restrict admin access. We'll add this to the Privacy Policy.

---

## 5. Data model (Postgres tables)

- `admins` — id, email, password_hash, role, created_at
- `mentor_applications` — id, name, email, phone, city, occupation, interest, availability, message, resume_url, consent, created_at
- `student_enrollments` — id, student_name, student_age, grade, school, guardian_name, guardian_phone, guardian_email, city, programs, notes, consent, created_at
- `volunteers` — id, name, email, phone, interests, availability, commitment, created_at
- `partner_inquiries` — id, org, contact_name, email, phone, partner_type, message, created_at
- `contact_messages` — id, name, email, subject, message, created_at
- `newsletter_subscribers` — id, email, first_name, created_at
- `events` — id, title, slug, description, location, starts_at, ends_at, image_url, capacity, published, created_at
- `event_registrations` — id, event_id, name, email, phone, party_size, created_at
- `news_posts` — id, title, slug, excerpt, body, cover_image_url, author, published, published_at, created_at

*(No `donations` table — Zeffy tracks donations on their platform.)*

---

## 6. Admin dashboard (`/admin`)

- Login using your reusable auth module (email + password).
- View + search each submission type (mentors, enrollments, volunteers, partners, contacts, newsletter).
- Create / edit / publish **Events** and **News** (with image upload to the storage bucket).
- View donations.
- CSV export per table.

---

## 7. Integrations

- **Zeffy:** embedded donation widget on the Donate page (and a "Donate" button in the header). Recurring giving, donor management, and tax receipts handled by Zeffy — no payment code on our side. (Switched from Givebutter before M6.)
- **Brevo:** transactional emails (form confirmations to submitter + notification to ABIT inbox) and newsletter list sync.
- **Railway storage bucket:** resume uploads, event images, news cover images. S3-compatible (Tigris), accessed via AWS S3 SDK with a custom endpoint. Env vars (set on the ABIT service): `BUCKET_ENDPOINT_URL`, `BUCKET_NAME`, `BUCKET_REGION`, `BUCKET_ACCESS_KEY_ID`, `BUCKET_SECRET_ACCESS_KEY`.
- **Redis:** rate-limit public form posts (spam protection), cache published events/news.

---

## 8. Milestones (build order for Claude Code)

- **M0 — Scaffolding:** Next.js + Tailwind repo, GitHub, Railway project, Postgres + Redis + bucket connected, env vars, base schema.
- **M1 — Layout + design system:** colors/fonts, header nav, footer, reusable buttons/cards. Match mockup.
- **M2 — Home page:** all mockup sections, fully responsive.
- **M3 — About + Programs pages.**
- **M4 — Public forms + Postgres:** mentor, enrollment, volunteer, partner, contact, newsletter + thank-you pages + Brevo notifications.
- **M5 — Events + News + Admin CMS:** admin login, submission views, create/edit events & news, image uploads, CSV export.
- **M6 — Donations:** embed Zeffy campaign on the Donate page + wire the header "Donate" button.
- **M7 — Email + confirmations polish:** submitter confirmations, ABIT notifications, newsletter sync.
- **M8 — Launch polish:** SEO/meta, real images, privacy/terms, domain, favicon, analytics.

---

## 9. Open items to gather from Cierra

- Real logo file (final version once you two settle it).
- Final mission statement (you have a good draft ready).
- Photos + signed releases (esp. for minors).
- Zeffy account set up + campaign/form created (gives us the embed code / form URL).
- Domain name for launch.
- The email inbox that should receive form notifications.
