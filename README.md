# ABIT Community Development Group — Website

Next.js site for ABIT Community Development Group, deployed on Railway.

## What's in this milestone (M0 — foundation)

- Next.js (App Router) + TypeScript + Tailwind
- Brand colors wired into Tailwind (`brand-purple`, `brand-gold`, `brand-teal`)
- Postgres connection helper (`lib/db.ts`)
- Redis connection helper (`lib/redis.ts`)
- Full database schema (`db/schema.sql`)
- A placeholder home page so you can confirm the deploy works

The real pages get built in the next milestones.

---

## Step-by-step: get it live on Railway

### 1. Push to GitHub
- Create a new **empty** repo on GitHub (no README).
- Put these files in it and push to the `main` branch.

### 2. Create the Railway project
- Railway → **New Project** → **Deploy from GitHub repo** → pick this repo.
- Railway auto-detects Next.js and starts building.

### 3. Add the database + cache
In the same Railway project:
- Click **+ New** → **Database** → **PostgreSQL**.
- Click **+ New** → **Database** → **Redis**.

Railway automatically injects `DATABASE_URL` and `REDIS_URL` into your app —
you do **not** type these in by hand.

### 4. Create the database tables
- Open the **Postgres** service → **Query** tab.
- Paste the entire contents of `db/schema.sql` and run it.

### 5. Done
- Open your app's Railway URL. You should see the purple
  "Milestone 0 — foundation deployed ✓" screen.
- Every future push to `main` auto-deploys.

---

## Run it locally (optional)

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Local dev needs a `.env.local` file (copy from `.env.example`) only if you
want to connect to a database locally. The placeholder home page works without one.
