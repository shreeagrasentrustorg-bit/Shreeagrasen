import { NextResponse } from "next/server";
import { rpcRest, selectAllRest } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CounterRow = { key: string; count: number };

// GET → current visitor count (no increment).
export async function GET() {
  const rows = await selectAllRest<CounterRow>("site_counters", "key");
  const v = rows.find((r) => r.key === "visitors");
  return NextResponse.json({ count: v?.count ?? null });
}

// POST → increment and return the new count.
export async function POST() {
  const count = await rpcRest<number>("increment_counter", {
    counter_key: "visitors",
  });
  return NextResponse.json({ count: count ?? null });
}
