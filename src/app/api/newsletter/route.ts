import { NextResponse } from "next/server";
import { insertResilient } from "@/lib/supabase";
import { sendNewsletterWelcome } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email: raw } = await req.json().catch(() => ({ email: "" }));
    const email = String(raw || "").trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const { error } = await insertResilient("newsletter_subscribers", { email });

    // Duplicate email → already subscribed, treat as success.
    if (error && /duplicate|unique/i.test(error)) {
      return NextResponse.json({ ok: true, already: true });
    }
    if (error === "Supabase is not configured.") {
      return NextResponse.json(
        { ok: true, note: "Received (backend not configured yet)." },
        { status: 200 }
      );
    }
    if (error) {
      return NextResponse.json(
        { error: "Could not subscribe. Please try again." },
        { status: 500 }
      );
    }

    // Confirmation email (non-fatal if Resend isn't configured).
    try {
      await sendNewsletterWelcome(email);
    } catch (e) {
      console.error("Newsletter email failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
