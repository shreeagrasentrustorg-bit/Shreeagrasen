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

/**
 * Server-side Supabase client using the public anon key.
 * Works for RLS-governed public inserts (contact/booking forms) even when the
 * service-role key isn't configured/correct. Returns null if env missing.
 */
export function getSupabasePublic(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Insert a row resiliently: try the service-role client first (bypasses RLS);
 * if that's unavailable or fails (e.g. wrong/missing service key), fall back to
 * the anon client, which succeeds when a public INSERT policy exists.
 * Returns the last error message (or null on success).
 */
export async function insertResilient(
  table: string,
  row: Record<string, unknown>
): Promise<{ error: string | null }> {
  let lastError: string | null = null;

  const admin = getSupabaseAdmin();
  if (admin) {
    const { error } = await admin.from(table).insert(row);
    if (!error) return { error: null };
    lastError = error.message;
    console.error(`[insertResilient:${table}] admin insert failed:`, error.message);
  }

  const pub = getSupabasePublic();
  if (pub) {
    const { error } = await pub.from(table).insert(row);
    if (!error) return { error: null };
    lastError = error.message;
    console.error(`[insertResilient:${table}] anon insert failed:`, error.message);
  }

  if (!admin && !pub) lastError = "Supabase is not configured.";
  return { error: lastError };
}

export const BOOKING_BUCKET = "booking-documents";
