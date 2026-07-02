-- ============================================================
-- Migration 002 — site counters (visitor counter)
-- Run this ONCE in Supabase → SQL Editor.
--
-- A tiny key/count table plus an atomic increment function. The website
-- increments 'visitors' from a server route using the SERVICE ROLE key
-- (bypasses RLS), so no public policies are needed.
-- ============================================================

create table if not exists public.site_counters (
  key   text primary key,
  count bigint not null default 0
);

insert into public.site_counters (key, count)
values ('visitors', 0)
on conflict (key) do nothing;

-- Atomic increment — returns the new value.
create or replace function public.increment_counter(counter_key text)
returns bigint
language sql
as $$
  insert into public.site_counters (key, count)
  values (counter_key, 1)
  on conflict (key) do update set count = public.site_counters.count + 1
  returning count;
$$;

-- RLS on: no public policies. Server reads/increments via the service role.
alter table public.site_counters enable row level security;
