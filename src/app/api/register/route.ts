import { NextResponse } from "next/server";
import { adminCreateUser } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password, full_name } = await req.json();
    const mail = String(email || "").trim().toLowerCase();
    const pass = String(password || "");
    const name = String(full_name || "").trim();

    if (!mail || !pass) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(mail)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (pass.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    // Creates an already-confirmed user (no verification email).
    const { error } = await adminCreateUser(mail, pass, name);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected server error. Please try again." }, { status: 500 });
  }
}
