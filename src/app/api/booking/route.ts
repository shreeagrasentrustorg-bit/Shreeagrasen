import { NextResponse } from "next/server";
import { getSupabaseAdmin, insertResilient, BOOKING_BUCKET } from "@/lib/supabase";
import { sendBookingEmails } from "@/lib/email";

export const runtime = "nodejs";

const MAX_FILE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot: silently accept bots without doing anything
    if (form.get("company")) return NextResponse.json({ ok: true });

    const get = (k: string) => (form.get(k)?.toString() || "").trim();
    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    let event_type = get("event_type");
    const event_type_other = get("event_type_other");
    const venue = get("venue");
    const event_date = get("event_date");
    const alt_date = get("alt_date");
    const guests = get("guests");
    const message = get("message");

    // "Other" → use the custom text the user typed
    if (event_type === "Other" && event_type_other) event_type = event_type_other;

    if (!name || !phone || !email || !event_type || !venue || !event_date) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    let documentUrl: string | undefined;
    let documentPath: string | undefined;

    // Optional document upload → private Storage bucket (needs service role).
    const file = form.get("document");
    if (file && file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE) {
        return NextResponse.json({ error: "File too large (max 5 MB)." }, { status: 400 });
      }
      if (!ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: "Only PDF, JPG or PNG allowed." }, { status: 400 });
      }
      if (admin) {
        const ext = file.name.split(".").pop() || "bin";
        const safe = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24);
        documentPath = `${new Date().getFullYear()}/${Date.now()}-${safe}.${ext}`;
        const bytes = Buffer.from(await file.arrayBuffer());
        const { error: upErr } = await admin.storage
          .from(BOOKING_BUCKET)
          .upload(documentPath, bytes, { contentType: file.type, upsert: false });
        if (upErr) {
          console.error("Storage upload failed:", upErr.message);
          documentPath = undefined; // don't store a path we couldn't upload
        } else {
          const { data: signed } = await admin.storage
            .from(BOOKING_BUCKET)
            .createSignedUrl(documentPath, 60 * 60 * 24 * 30);
          documentUrl = signed?.signedUrl;
        }
      }
    }

    // Persist booking (service role, else anon+RLS policy).
    const { error } = await insertResilient("bookings", {
      name, phone, email, event_type, venue,
      event_date, alt_date: alt_date || null,
      guests: guests ? Number(guests) : null,
      message: message || null,
      document_path: documentPath || null,
      status: "new",
    });

    if (error === "Supabase is not configured.") {
      return NextResponse.json(
        { ok: true, note: "Received (backend not configured yet)." },
        { status: 200 }
      );
    }
    if (error) {
      return NextResponse.json(
        { error: "Could not save your request. Please try again or call us.", detail: error },
        { status: 500 }
      );
    }

    // Emails (owner + booker). Non-fatal if not configured.
    try {
      await sendBookingEmails({
        name, phone, email, event_type, venue, event_date,
        alt_date, guests, message, documentUrl,
      });
    } catch (e) {
      console.error("Email send failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}
