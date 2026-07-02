-- ============================================================
-- Shree Agrasen Trust — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor (once).
-- ============================================================

-- 1) Bookings table -----------------------------------------
create table if not exists public.bookings (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  phone        text not null,
  email        text not null,
  event_type   text not null,
  venue        text not null,
  event_date   date not null,
  alt_date     date,
  guests       integer,
  message      text,
  document_path text,
  status       text not null default 'new'   -- new | confirmed | cancelled
);

-- 2) Contact messages table ---------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  phone      text not null,
  email      text,
  subject    text,
  message    text not null
);

-- 3) Row Level Security -------------------------------------
-- RLS is ON. We allow ONLY inserts from the public (anon) role so the
-- website's booking/contact forms work reliably (even if the service-role
-- key isn't configured). No SELECT/UPDATE/DELETE policies exist, so the
-- anon key can never read this data — admin reads use the service role.
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "public insert bookings" on public.bookings;
create policy "public insert bookings"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

drop policy if exists "public insert contact" on public.contact_messages;
create policy "public insert contact"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

-- 4) Storage bucket for uploaded documents (Aadhaar/PAN etc.)
-- Private bucket — files are only accessed via signed URLs from the server.
insert into storage.buckets (id, name, public)
values ('booking-documents', 'booking-documents', false)
on conflict (id) do nothing;

-- No public storage policies are added → bucket stays private.
-- The service role (server) can upload and create signed URLs.

-- 5) Membership applications ---------------------------------
create table if not exists public.membership_applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  user_id       uuid references auth.users(id) on delete set null,
  full_name     text not null,
  father_name   text,
  phone         text not null,
  email         text not null,
  gotra         text,
  occupation    text,
  address       text,
  dob           date,
  family_count  integer,
  document_path text,
  status        text not null default 'pending'  -- pending | approved | rejected
);

alter table public.membership_applications enable row level security;

-- A logged-in member may create their own application…
drop policy if exists "member insert own application" on public.membership_applications;
create policy "member insert own application"
  on public.membership_applications for insert
  to authenticated
  with check (auth.uid() = user_id);

-- …and read their own application(s). (Admin reads use the service role.)
drop policy if exists "member read own application" on public.membership_applications;
create policy "member read own application"
  on public.membership_applications for select
  to authenticated
  using (auth.uid() = user_id);

-- 6) Private bucket for member ID documents ------------------
insert into storage.buckets (id, name, public)
values ('member-documents', 'member-documents', false)
on conflict (id) do nothing;

-- ============================================================
-- ADMIN ACCESS
-- Admins are identified by email via the ADMIN_EMAILS env var on the server.
-- Admin dashboard reads all rows using the SERVICE ROLE key (bypasses RLS).
-- To create an admin: Supabase Dashboard → Authentication → Add user,
-- then add that email to ADMIN_EMAILS in your environment variables.
-- ============================================================
