import type { Metadata } from "next";
import Link from "next/link";
import { Clock, CheckCircle2, XCircle, FileText } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section } from "@/components/ui/section";
import { MembershipForm } from "@/components/membership-form";
import { ButtonLink } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "My Account", robots: { index: false } };

const statusMap: Record<string, { icon: typeof Clock; cls: string; label: string; note: string }> = {
  pending: { icon: Clock, cls: "text-warning bg-warning/10", label: "Pending review", note: "Your application has been received and is under review by the committee." },
  approved: { icon: CheckCircle2, cls: "text-success bg-success/10", label: "Approved", note: "Congratulations! Your membership has been approved. Welcome to the family." },
  rejected: { icon: XCircle, cls: "text-danger bg-danger/10", label: "Not approved", note: "Please contact the office for more details about your application." },
};

export default async function MemberPage() {
  const supabase = await createClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (!user) {
    return (
      <>
        <PageBanner crumb="Account" title="My Account" />
        <Section>
          <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-10 text-center shadow-soft">
            <p className="text-body">Please sign in to access your account.</p>
            <ButtonLink href="/login" className="mt-6">Sign in</ButtonLink>
          </div>
        </Section>
      </>
    );
  }

  const { data: apps } = await supabase!
    .from("membership_applications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  const app = apps?.[0];
  const status = app ? statusMap[app.status] ?? statusMap.pending : null;
  const StatusIcon = status?.icon ?? Clock;

  return (
    <>
      <PageBanner
        crumb="Account"
        title={`Namaste, ${user.user_metadata?.full_name || "Member"}`}
        subtitle={app ? "Here is your membership application status." : "Complete your membership application below."}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          {app && status ? (
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-6">
                <div>
                  <p className="text-sm text-muted">Application submitted</p>
                  <p className="font-head text-lg font-bold text-ink">
                    {formatDate(app.created_at)}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.cls}`}>
                  <StatusIcon className="h-4 w-4" /> {status.label}
                </span>
              </div>
              <div className="p-6">
                <p className="text-body">{status.note}</p>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Full name", app.full_name],
                    ["Phone", app.phone],
                    ["Email", app.email],
                    ["Gotra", app.gotra],
                    ["Occupation", app.occupation],
                    ["Family members", app.family_count],
                  ].map(([k, v]) =>
                    v ? (
                      <div key={k as string}>
                        <dt className="text-xs uppercase tracking-wide text-muted">{k}</dt>
                        <dd className="mt-0.5 font-medium text-ink">{v as string}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
                {app.document_path && (
                  <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
                    <FileText className="h-4 w-4 text-brand-600" /> ID document uploaded
                  </p>
                )}
              </div>
              <div className="border-t border-line bg-surface p-6 text-sm text-muted">
                Need to update your details? Please{" "}
                <Link href="/contact" className="font-semibold text-brand-700">contact the office</Link>.
              </div>
            </div>
          ) : (
            <MembershipForm defaultEmail={user.email ?? undefined} />
          )}
        </div>
      </Section>
    </>
  );
}
