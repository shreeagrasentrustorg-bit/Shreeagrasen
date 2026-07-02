import { NextResponse } from "next/server";
import { getCurrentUser, isAdminEmail } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({
    email: user?.email ?? null,
    isAdmin: isAdminEmail(user?.email),
  });
}
