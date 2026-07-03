import type { Metadata } from "next";
import { Wind, Sparkles, Droplets, BedDouble, ShieldCheck, Clock } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section } from "@/components/ui/section";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book the Hall",
  description:
    "Enquire and book the A/C banquet hall and rooms at Shree Agrasen Bhawan, Chinchwad, Pune for weddings, functions and community events.",
};

const perks = [
  { icon: Wind, label: "A/C, sound-proof hall" },
  { icon: Sparkles, label: "Beautifully decorated" },
  { icon: Droplets, label: "Water supply facility" },
  { icon: BedDouble, label: "Guest rooms available" },
  { icon: ShieldCheck, label: "Hygienic & maintained" },
  { icon: Clock, label: "Quick confirmation" },
];

export default function BookingPage() {
  return (
    <>
      <PageBanner
        crumb="Booking"
        title="Book Shree Agrasen Bhawan"
        subtitle="Reserve our grand A/C banquet hall for your special occasion. Fill the form and our team will confirm availability."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Info column */}
          <div>
            <h2 className="font-head text-2xl font-bold text-ink">
              Why book with us
            </h2>
            <p className="mt-3 text-muted">
              A spacious, elegant venue (approx. 130 × 29 ft) trusted by the
              community for weddings, receptions, engagements and functions.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {perks.map((p) => (
                <li key={p.label} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold-400/60 hover:shadow-gold">
                  <p.icon className="h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-sm font-medium text-ink">{p.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl bg-surface p-6">
              <h3 className="font-head font-bold text-ink">How it works</h3>
              <ol className="mt-4 space-y-4">
                {[
                  "Submit your booking enquiry with your event details.",
                  "You and our team both receive an email confirmation of the request.",
                  "Our office contacts you to confirm availability & finalise.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-body">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Form column */}
          <div>
            <BookingForm />
          </div>
        </div>
      </Section>
    </>
  );
}
