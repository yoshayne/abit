-- ABIT Community Development Group — database schema
-- Run this once against your Railway Postgres database.
-- (Railway dashboard → Postgres service → "Query" tab → paste + run,
--  or connect with psql using the connection string.)

-- Admin users (dashboard login)
CREATE TABLE IF NOT EXISTS admins (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Become a Mentor
CREATE TABLE IF NOT EXISTS mentor_applications (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  city          TEXT,
  occupation    TEXT,
  interest      TEXT,
  availability  TEXT,
  message       TEXT,
  resume_url    TEXT,
  consent       BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enroll a Student (collects a minor's info — keep minimal, guardian consent required)
CREATE TABLE IF NOT EXISTS student_enrollments (
  id             SERIAL PRIMARY KEY,
  student_name   TEXT NOT NULL,
  student_age    INTEGER,
  grade          TEXT,
  school         TEXT,
  guardian_name  TEXT NOT NULL,
  guardian_phone TEXT,
  guardian_email TEXT NOT NULL,
  city           TEXT,
  programs       TEXT,
  notes          TEXT,
  consent        BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Volunteer signup
CREATE TABLE IF NOT EXISTS volunteers (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  interests    TEXT,
  availability TEXT,
  commitment   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Partner with ABIT
CREATE TABLE IF NOT EXISTS partner_inquiries (
  id           SERIAL PRIMARY KEY,
  org          TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  partner_type TEXT,
  message      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact form
CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         SERIAL PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  first_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  location    TEXT,
  starts_at   TIMESTAMPTZ,
  ends_at     TIMESTAMPTZ,
  image_url   TEXT,
  capacity    INTEGER,
  published   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Event registrations / RSVPs
CREATE TABLE IF NOT EXISTS event_registrations (
  id         SERIAL PRIMARY KEY,
  event_id   INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  party_size INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- News / blog posts
CREATE TABLE IF NOT EXISTS news_posts (
  id              SERIAL PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT,
  body            TEXT,
  cover_image_url TEXT,
  author          TEXT,
  published       BOOLEAN NOT NULL DEFAULT false,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
