import { NextResponse } from "next/server";
import { insertResilient } from "@/lib/supabase";
import { sendContactEmails } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot
    if (body.company) return NextResponse.json({ ok: true });

    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const email = (body.email || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const { error } = await insertResilient("contact_messages", {
      name, phone, email: email || null, subject: subject || null, message,
    });
    if (error && error !== "Supabase is not configured.") {
      return NextResponse.json(
        { error: "Could not send your message. Please try again or call us.", detail: error },
        { status: 500 }
      );
    }

    try {
      await sendContactEmails({ name, phone, email, subject, message });
    } catch (e) {
      console.error("Contact email failed:", e);
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
