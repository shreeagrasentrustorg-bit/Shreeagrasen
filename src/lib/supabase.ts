import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase admin client (service role).
 * Used ONLY in server route handlers (never expose the service key to the client).
 * Returns null if env vars are missing so the app still builds/runs without them.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const BOOKING_BUCKET = "booking-documents";
