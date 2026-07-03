-- ============================================================
-- 004: Extra booking-enquiry fields
-- Adds the customer-facing fields from the original booking form:
-- address, property type, member type, check-in/out dates, rooms required.
-- Run in Supabase Dashboard → SQL Editor.
-- ============================================================

alter table public.bookings add column if not exists address        text;
alter table public.bookings add column if not exists property_type  text;
alter table public.bookings add column if not exists member_type    text;
alter table public.bookings add column if not exists check_in        date;
alter table public.bookings add column if not exists check_out       date;
alter table public.bookings add column if not exists rooms_required  integer;
