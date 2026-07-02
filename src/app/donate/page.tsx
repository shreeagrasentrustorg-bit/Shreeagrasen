import type { Metadata } from "next";
import { Landmark, Copy, HeartHandshake, HeartPulse, Users, GraduationCap } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Shree Agrasen Trust — bank account details for donations towards health, cultural and social initiatives.",
};

const impact = [
  { icon: HeartPulse, title: "Health", text: "Free medicine, blood-donation drives and medical camps." },
  { icon: Users, title: "Community", text: "Cultural programs and social gatherings that unite us." },
  { icon: GraduationCap, title: "Upliftment", text: "Educational and social support for those in need." },
];

export default function DonatePage() {
  const bankRows = [
    { label: "Bank Name", value: site.bank.name },
    { label: "Branch", value: site.bank.branch },
    { label: "Account Name", value: site.bank.account },
    { label: "Account No.", value: site.bank.accountNo },
    { label: "IFSC Code", value: site.bank.ifsc },
  ];

  return (
    <>
      <PageBanner
        crumb="Donate"
        title="Support the Trust"
        subtitle="Your generosity powers seva — health, culture and community for all."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bank details */}
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <div className="flex items-center gap-3 bg-brand-500 px-6 py-5 text-white">
                <Landmark className="h-6 w-6" />
                <h2 className="font-head text-lg font-bold text-white">
                  Bank Account Details
                </h2>
              </div>
              <dl className="divide-y divide-line">
                {bankRows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-4 px-6 py-4">
                    <dt className="text-sm text-muted">{r.label}</dt>
                    <dd className="text-right text-sm font-semibold text-ink">{r.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2 bg-surface px-6 py-4 text-xs text-muted">
                <Copy className="h-4 w-4" />
                Please share your name & purpose while transferring so we can
                acknowledge your contribution.
              </div>
            </div>

            {/* UPI placeholder */}
            <div className="mt-6 flex items-center gap-5 rounded-3xl border border-line bg-white p-6 shadow-soft">
              <div className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl border-2 border-dashed border-line bg-surface text-center text-[11px] font-medium text-muted">
                UPI QR
                <br />
                (add here)
              </div>
              <div>
                <h3 className="font-head font-bold text-ink">Donate via UPI</h3>
                <p className="mt-1 text-sm text-muted">
                  Scan the QR to contribute instantly. Ask the office for the
                  trust&apos;s UPI ID / QR code to place here.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Impact */}
          <div>
            <SectionHeading eyebrow="Your Impact" title="Where your donation goes" />
            <div className="mt-8 space-y-4">
              {impact.map((it, i) => (
                <Reveal key={it.title} delay={i * 0.06}>
                  <div className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-600/10 text-accent-700">
                      <it.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-head font-bold text-ink">{it.title}</h3>
                      <p className="mt-1 text-sm text-muted">{it.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-3xl bg-ink p-6 text-white">
              <HeartHandshake className="h-10 w-10 shrink-0 text-brand-400" />
              <p className="text-sm text-white/80">
                Every contribution, big or small, helps us continue serving the
                community. Thank you for your kindness and support.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
