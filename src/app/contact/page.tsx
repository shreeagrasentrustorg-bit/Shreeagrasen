import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FacebookIcon, YoutubeIcon } from "@/components/brand-icons";
import { PageBanner } from "@/components/page-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

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
    { icon: Clock, title: "Hours", lines: [site.hours] },
  ];

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
                <div key={item.title} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-head text-sm font-bold text-ink">{item.title}</h3>
                  {item.lines.map((l) => (
                    <p key={l} className="mt-1 text-sm text-muted">{l}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-body transition-colors hover:bg-brand-500 hover:text-white"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-body transition-colors hover:bg-brand-500 hover:text-white"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
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
