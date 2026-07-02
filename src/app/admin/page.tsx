import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  CalendarCheck,
  MessageSquare,
  UserPlus,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section } from "@/components/ui/section";
import { StatusSelect } from "@/components/admin/status-select";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getCurrentUser, isAdminEmail } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { updateBookingStatus, updateMembershipStatus } from "./actions";

export const metadata: Metadata = { title: "Admin Dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

async function signedUrl(bucket: string, ref: string | null) {
  if (!ref) return null;
  // New rows store a ready-to-use signed URL; use it directly.
  if (/^https?:\/\//.test(ref)) return ref;
  // Older rows store just the storage path → sign it on the fly.
  const admin = getSupabaseAdmin();
  if (!admin) return null;
  const { data } = await admin.storage.from(bucket).createSignedUrl(ref, 60 * 30);
  return data?.signedUrl ?? null;
}

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!isAdminEmail(user?.email)) redirect("/login?next=/admin");

  const admin = getSupabaseAdmin();

  if (!admin) {
    return (
      <>
        <PageBanner crumb="Admin" title="Admin Dashboard" />
        <Section>
          <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-soft">
            <p className="text-body">
              Supabase is not configured yet. Add the env vars to view bookings,
              enquiries and membership applications.
            </p>
          </div>
        </Section>
      </>
    );
  }

  const [{ data: bookings }, { data: messages }, { data: members }] = await Promise.all([
    admin.from("bookings").select("*").order("created_at", { ascending: false }),
    admin.from("contact_messages").select("*").order("created_at", { ascending: false }),
    admin.from("membership_applications").select("*").order("created_at", { ascending: false }),
  ]);

  const bookingDocs = await Promise.all(
    (bookings ?? []).map((b) => signedUrl("booking-documents", b.document_path))
  );
  const memberDocs = await Promise.all(
    (members ?? []).map((m) => signedUrl("member-documents", m.document_path))
  );

  const stats = [
    { icon: CalendarCheck, label: "Bookings", value: bookings?.length ?? 0 },
    { icon: MessageSquare, label: "Enquiries", value: messages?.length ?? 0 },
    { icon: UserPlus, label: "Membership apps", value: members?.length ?? 0 },
  ];

  const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted";
  const td = "px-4 py-3 text-sm text-body align-top";

  return (
    <>
      <PageBanner
        crumb="Admin"
        title="Admin Dashboard"
        subtitle={`Signed in as ${user?.email}`}
      />
      <Section>
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <s.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-head text-2xl font-extrabold text-ink">{s.value}</p>
                <p className="text-sm text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bookings */}
        <h2 className="mt-12 flex items-center gap-2 font-head text-xl font-bold text-ink">
          <CalendarCheck className="h-5 w-5 text-brand-600" /> Hall Bookings
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
          <table className="w-full min-w-[900px]">
            <thead className="bg-surface2">
              <tr>
                {["Date", "Name", "Contact", "Event", "Venue", "Event date", "Guests", "Doc", "Status"].map((h) => (
                  <th key={h} className={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {(bookings ?? []).length === 0 && (
                <tr><td className={td} colSpan={9}>No bookings yet.</td></tr>
              )}
              {(bookings ?? []).map((b, i) => (
                <tr key={b.id}>
                  <td className={td}>{formatDate(b.created_at)}</td>
                  <td className={td}><span className="font-medium text-ink">{b.name}</span></td>
                  <td className={td}>{b.phone}<br /><span className="text-muted">{b.email}</span></td>
                  <td className={td}>{b.event_type}</td>
                  <td className={td}>{b.venue}</td>
                  <td className={td}>{b.event_date}{b.alt_date ? <><br /><span className="text-muted">alt: {b.alt_date}</span></> : null}</td>
                  <td className={td}>{b.guests ?? "—"}</td>
                  <td className={td}>
                    {bookingDocs[i] ? (
                      <a href={bookingDocs[i]!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-700">
                        <FileText className="h-4 w-4" /> View
                      </a>
                    ) : "—"}
                  </td>
                  <td className={td}>
                    <StatusSelect id={b.id} current={b.status} options={["new", "confirmed", "cancelled"]} action={updateBookingStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Membership */}
        <h2 className="mt-12 flex items-center gap-2 font-head text-xl font-bold text-ink">
          <UserPlus className="h-5 w-5 text-brand-600" /> Membership Applications
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
          <table className="w-full min-w-[900px]">
            <thead className="bg-surface2">
              <tr>
                {["Date", "Name", "Contact", "Gotra", "Occupation", "Address", "Doc", "Status"].map((h) => (
                  <th key={h} className={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {(members ?? []).length === 0 && (
                <tr><td className={td} colSpan={8}>No applications yet.</td></tr>
              )}
              {(members ?? []).map((m, i) => (
                <tr key={m.id}>
                  <td className={td}>{formatDate(m.created_at)}</td>
                  <td className={td}><span className="font-medium text-ink">{m.full_name}</span>{m.father_name ? <><br /><span className="text-muted">s/o {m.father_name}</span></> : null}</td>
                  <td className={td}>{m.phone}<br /><span className="text-muted">{m.email}</span></td>
                  <td className={td}>{m.gotra ?? "—"}</td>
                  <td className={td}>{m.occupation ?? "—"}</td>
                  <td className={`${td} max-w-[220px]`}>{m.address ?? "—"}</td>
                  <td className={td}>
                    {memberDocs[i] ? (
                      <a href={memberDocs[i]!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-700">
                        <FileText className="h-4 w-4" /> View
                      </a>
                    ) : "—"}
                  </td>
                  <td className={td}>
                    <StatusSelect id={m.id} current={m.status} options={["pending", "approved", "rejected"]} action={updateMembershipStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enquiries */}
        <h2 className="mt-12 flex items-center gap-2 font-head text-xl font-bold text-ink">
          <MessageSquare className="h-5 w-5 text-brand-600" /> Contact Enquiries
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
          <table className="w-full min-w-[700px]">
            <thead className="bg-surface2">
              <tr>
                {["Date", "Name", "Contact", "Subject", "Message"].map((h) => (
                  <th key={h} className={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {(messages ?? []).length === 0 && (
                <tr><td className={td} colSpan={5}>No enquiries yet.</td></tr>
              )}
              {(messages ?? []).map((c) => (
                <tr key={c.id}>
                  <td className={td}>{formatDate(c.created_at)}</td>
                  <td className={td}><span className="font-medium text-ink">{c.name}</span></td>
                  <td className={td}>{c.phone}<br /><span className="text-muted">{c.email}</span></td>
                  <td className={td}>{c.subject ?? "—"}</td>
                  <td className={`${td} max-w-[320px]`}>{c.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-xs text-muted">
          <ShieldCheck className="h-4 w-4 text-accent-600" /> Documents open via secure links that expire in 30 minutes.
        </p>
      </Section>
    </>
  );
}
