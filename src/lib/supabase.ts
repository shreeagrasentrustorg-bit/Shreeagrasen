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
  try {
    return createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (e) {
    console.error("[getSupabaseAdmin] createClient failed:", e);
    return null;
  }
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
export const MEMBER_BUCKET = "member-documents";

/**
 * Upload a file to a private Storage bucket and return a long-lived signed URL.
 *
 * Uses the Storage REST API directly (service-role key) instead of the
 * supabase-js client. This is intentional: supabase-js constructs a realtime
 * client on init, which throws on runtimes without a native WebSocket
 * (e.g. Node ≤20 in local dev). Storage is pure REST, so calling it directly
 * makes uploads work everywhere and lets us surface the real error.
 *
 * @returns `{ url }` (signed, clickable) on success, or `{ error }` on failure.
 */
export async function uploadDocument(
  bucket: string,
  path: string,
  bytes: Buffer,
  contentType: string,
  signedUrlTtlSeconds = 60 * 60 * 24 * 365 // 1 year
): Promise<{ url?: string; path?: string; error?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return { error: "Storage is not configured (missing service-role key)." };

  const headers = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` };

  // 1) Upload the object.
  const upRes = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": contentType, "x-upsert": "false" },
    body: new Uint8Array(bytes),
  });
  if (!upRes.ok) {
    const detail = await upRes.text().catch(() => "");
    return { error: `Upload failed (${upRes.status}): ${detail}` };
  }

  // 2) Create a signed URL so the file is clickable while the bucket stays private.
  const signRes = await fetch(`${url}/storage/v1/object/sign/${bucket}/${path}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ expiresIn: signedUrlTtlSeconds }),
  });
  if (!signRes.ok) {
    // File uploaded fine; just couldn't sign. Return the path so it's not lost.
    return { path };
  }
  const signed = (await signRes.json()) as { signedURL?: string };
  const signedUrl = signed.signedURL ? `${url}/storage/v1${signed.signedURL}` : undefined;
  return { url: signedUrl, path };
}
