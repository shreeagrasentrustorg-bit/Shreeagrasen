"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getCurrentUser, isAdminEmail } from "@/lib/auth";

async function assertAdmin() {
  const user = await getCurrentUser();
  if (!isAdminEmail(user?.email)) throw new Error("Not authorized");
}

export async function updateBookingStatus(id: string, status: string) {
  await assertAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) return;
  await admin.from("bookings").update({ status }).eq("id", id);
  revalidatePath("/admin");
}

export async function updateMembershipStatus(id: string, status: string) {
  await assertAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) return;
  await admin.from("membership_applications").update({ status }).eq("id", id);
  revalidatePath("/admin");
}
