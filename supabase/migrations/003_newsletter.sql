-- ============================================================
-- Migration 003 — newsletter subscribers
-- Run this ONCE in Supabase → SQL Editor.
--
-- Public (anon) may INSERT their email so the footer signup works even without
-- the service-role key. No SELECT policy → nobody can read the list with the
-- anon key; admin reads use the service role.
-- ============================================================

create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "public insert newsletter" on public.newsletter_subscribers;
create policy "public insert newsletter"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);
