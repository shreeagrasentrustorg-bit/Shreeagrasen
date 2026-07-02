import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const MAX_FILE = 5 * 1024 * 1024;
const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];
const BUCKET = "member-documents";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Membership is not configured yet." },
        { status: 503 }
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }

    const form = await req.formData();
    const get = (k: string) => (form.get(k)?.toString() || "").trim();

    const full_name = get("full_name");
    const phone = get("phone");
    const email = get("email");
    if (!full_name || !phone || !email) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }

    const admin = getSupabaseAdmin();

    // Optional ID document → private member-documents bucket (service role).
    let documentPath: string | undefined;
    const file = form.get("document");
    if (file && file instanceof File && file.size > 0 && admin) {
      if (file.size > MAX_FILE) {
        return NextResponse.json({ error: "File too large (max 5 MB)." }, { status: 400 });
      }
      if (!ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: "Only PDF, JPG or PNG allowed." }, { status: 400 });
      }
      const ext = file.name.split(".").pop() || "bin";
      documentPath = `${user.id}/${Date.now()}.${ext}`;
      const bytes = Buffer.from(await file.arrayBuffer());
      const { error: upErr } = await admin.storage
        .from(BUCKET)
        .upload(documentPath, bytes, { contentType: file.type, upsert: false });
      if (upErr) {
        console.error("Member doc upload failed:", upErr.message);
        documentPath = undefined;
      }
    }

    const row = {
      user_id: user.id,
      full_name,
      father_name: get("father_name") || null,
      phone,
      email,
      gotra: get("gotra") || null,
      occupation: get("occupation") || null,
      address: get("address") || null,
      dob: get("dob") || null,
      family_count: get("family_count") ? Number(get("family_count")) : null,
      document_path: documentPath || null,
      status: "pending",
    };

    // Insert via the authenticated session (RLS policy: member inserts own row).
    // Fall back to service role if available.
    let insertErr = (await supabase.from("membership_applications").insert(row)).error;
    if (insertErr && admin) {
      insertErr = (await admin.from("membership_applications").insert(row)).error;
    }
    if (insertErr) {
      console.error("Membership insert failed:", insertErr.message);
      return NextResponse.json(
        { error: "Could not submit. Please try again.", detail: insertErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
