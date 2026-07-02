import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ExternalLink, Sparkles } from "lucide-react";
import {
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
} from "@/components/brand-icons";
import { PageBanner } from "@/components/page-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/contact-form";
import { site, culturalPrograms } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shree Agrasen Trust — address, phone, email and location map for Shree Agrasen Bhawan, Chinchwad, Pune.",
};

export default function ContactPage() {
  const info = [
    { icon: MapPin, title: "Address", lines: [site.address.full] },
    { icon: Phone, title: "Phone", lines: site.phones },
    { icon: Mail, title: "Email", lines: [site.email] },
    { icon: Clock, title: "Working hours", lines: [site.hoursDetail] },
  ];

  const socials = [
    { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.youtube, label: "YouTube", Icon: YoutubeIcon },
    { href: site.twitter, label: "Twitter / X", Icon: TwitterIcon },
    { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  ].filter((s) => s.href);

  return (
    <>
      <PageBanner
        crumb="Contact"
        title="Get in touch"
        subtitle="We'd love to hear from you — for bookings, membership, events or any enquiry."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <div>
            <SectionHeading eyebrow="Contact Info" title="Reach Shree Agrasen Bhawan" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {info.map((item) => (
                <div key={item.title} className="card-premium group rounded-2xl border border-line bg-white p-5 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-50 text-gold-600 transition-transform group-hover:scale-110">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-head text-sm font-bold text-ink">{item.title}</h3>
                  {item.lines.map((l) => (
                    <p key={l} className="mt-1 text-sm text-muted">{l}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Cultural & community programs */}
            <div className="mt-6 rounded-2xl border border-gold-500/30 bg-gold-50/60 p-5 shadow-soft">
              <h3 className="flex items-center gap-2 font-head text-sm font-bold text-ink">
                <Sparkles className="h-4 w-4 text-gold-600" /> Regular Cultural Programs
              </h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {culturalPrograms.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-body">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-body transition-all hover:border-gold-500 hover:text-gold-700 hover:shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-line shadow-card">
              <iframe
                src={site.mapsEmbed}
                title="Shree Agrasen Trust location map"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
            >
              <ExternalLink className="h-4 w-4" /> Open in Google Maps
            </a>
          </div>

          {/* Form */}
          <div>
            <SectionHeading eyebrow="Enquiry" title="Send us a message" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
