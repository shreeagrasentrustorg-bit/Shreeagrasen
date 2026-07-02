-- ============================================================
-- Migration 001 — allow public form submissions (bookings & contact)
-- Run this ONCE in Supabase → SQL Editor if you set up the DB before
-- these policies existed. Safe to run multiple times.
--
-- Why: the booking/contact forms insert from the website. This lets the
-- public (anon) role INSERT only. There are still NO select/update/delete
-- policies, so nobody can read the data with the anon key — admin reads use
-- the service-role key. This makes the forms work even if the service-role
-- key on the server is missing or misconfigured.
-- ============================================================

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
