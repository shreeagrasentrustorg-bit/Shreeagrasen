import { NextResponse } from "next/server";
import { insertResilient, uploadDocument, BOOKING_BUCKET } from "@/lib/supabase";
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
    const address = get("address");
    const property_type = get("property_type");
    const member_type = get("member_type");
    const check_in = get("check_in");
    const check_out = get("check_out");
    const rooms_required = get("rooms_required");

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

    let documentUrl: string | undefined;
    // What we store in the `document_path` column: prefer the clickable signed
    // URL, fall back to the storage path if signing failed.
    let documentRef: string | undefined;

    // Optional document upload → private Storage bucket.
    const file = form.get("document");
    if (file && file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE) {
        return NextResponse.json({ error: "File too large (max 5 MB)." }, { status: 400 });
      }
      if (!ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: "Only PDF, JPG or PNG allowed." }, { status: 400 });
      }
      const ext = file.name.split(".").pop() || "bin";
      const safe = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24);
      const path = `${new Date().getFullYear()}/${Date.now()}-${safe}.${ext}`;
      const bytes = Buffer.from(await file.arrayBuffer());
      const result = await uploadDocument(BOOKING_BUCKET, path, bytes, file.type);
      if (result.error) {
        // Surface the failure to the user instead of silently dropping the file.
        console.error("Booking document upload failed:", result.error);
        return NextResponse.json(
          { error: "We couldn't upload your document. Please try again or call us." },
          { status: 500 }
        );
      }
      documentUrl = result.url;
      documentRef = result.url || result.path;
    }

    // Persist booking (service role, else anon+RLS policy).
    const { error } = await insertResilient("bookings", {
      name, phone, email, event_type, venue,
      event_date, alt_date: alt_date || null,
      guests: guests ? Number(guests) : null,
      message: message || null,
      address: address || null,
      property_type: property_type || null,
      member_type: member_type || null,
      check_in: check_in || null,
      check_out: check_out || null,
      rooms_required: rooms_required ? Number(rooms_required) : null,
      document_path: documentRef || null,
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
        address, property_type, member_type, check_in, check_out, rooms_required,
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
