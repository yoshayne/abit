# ABIT Community Development Group — Website

Next.js site for ABIT Community Development Group, deployed on Railway.
Full spec and milestone status live in `ABIT_WEBSITE_BUILD_PLAN.md` and
`CLAUDE.md`.

## What's live (through M4)

- Full marketing site: Home, About, Programs, Get Involved, Contact
- Six public forms (mentor, enroll a student, volunteer, partner, contact,
  newsletter), each saving to Postgres with Redis-backed rate limiting and
  a best-effort email notification via Brevo
- Privacy Policy (`/privacy`)

Not yet built: Events, News, Admin dashboard (M5), Donate/Givebutter (M6).

---

## Local setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The site renders fine with no environment
variables set — you only need them to exercise the parts that talk to
Postgres, Redis, or Brevo:

- Copy `.env.example` to `.env.local` and fill in `DATABASE_URL` /
  `REDIS_URL` to test forms against a real local database. Run
  `db/schema.sql` against that database first.
- Fill in `BREVO_API_KEY` / `ABIT_NOTIFY_EMAIL` to test the notification
  emails forms send on submit. Without these, forms still save to Postgres
  fine — they just skip sending the email (logged as a warning).

## Deploying

Push to `main` — Railway auto-deploys. No pull requests.

Railway provides `DATABASE_URL` and `REDIS_URL` automatically once the
Postgres and Redis plugins are added to the project; you don't set those by
hand. `BREVO_API_KEY` and `ABIT_NOTIFY_EMAIL` need to be set manually in the
Railway service's environment variables for form notification emails to go
out — see `.env.example` for details.

If you haven't already run `db/schema.sql` against the Railway Postgres
database, open the Postgres service → **Query** tab, paste the whole file,
and run it. It's all `CREATE TABLE IF NOT EXISTS`, so it's safe to re-run.
