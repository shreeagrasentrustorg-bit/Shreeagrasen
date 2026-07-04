import type { Metadata } from "next";
import {
  BadgeCheck,
  HeartPulse,
  PartyPopper,
  Users,
  Percent,
  ArrowRight,
} from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Become a member of Shree Agrasen Trust, Chinchwad–Pradhikaran and be part of our community — health, cultural and social benefits.",
};

const benefits = [
  { icon: HeartPulse, title: "Health benefits", text: "Free medicine and medical check-ups at discounted rates." },
  { icon: Percent, title: "Discounted hall booking", text: "Special member rates for booking Shree Agrasen Bhawan." },
  { icon: PartyPopper, title: "Cultural programs", text: "Priority participation in festivals and community events." },
  { icon: Users, title: "Community", text: "Connect with the wider Agrawal community of PCMC." },
];

export default function MembershipPage() {
  return (
    <>
      <PageBanner
        crumb="Membership"
        title="Become a Member"
        subtitle="Join the Shree Agrasen Trust family and enjoy the benefits of community, culture and care."
      />

      <Section>
        <SectionHeading
          center
          eyebrow="Why Join"
          title="Benefits of membership"
          subtitle="Membership supports the trust's work and unlocks benefits for you and your family."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="card-premium h-full rounded-3xl border border-line bg-white p-7 text-center shadow-soft">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold-50 text-gold-600">
                  <b.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-head text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 text-sm text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <BadgeCheck className="mx-auto h-14 w-14 text-accent-600" />
          <h2 className="mt-5 font-head text-2xl font-bold text-ink md:text-3xl">
            Ready to apply?
          </h2>
          <p className="mt-3 text-muted">
            Create a free account (or sign in), then fill the membership
            application form. You can track your application status any time from
            your account.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/register" size="lg">
              Create account <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/login" variant="outline" size="lg">
              Sign in
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs text-muted">
            New here? You&apos;ll be asked to create an account first.
          </p>
        </div>
      </Section>
    </>
  );
}
