import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, FileImage, ScrollText } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { events, eventPosters } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events & Notices",
  description:
    "Latest events, programs and notices from Shree Agrasen Trust, Chinchwad–Pradhikaran.",
};

export default function EventsPage() {
  return (
    <>
      <PageBanner
        crumb="Events"
        title="Events & Notices"
        subtitle="Stay updated with our programs, camps, celebrations and community notices."
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/events/${e.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`/images/gallery/${e.image}`}
                    alt={e.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
                    <CalendarDays className="h-4 w-4" /> {formatDate(e.date)}
                  </span>
                  <h2
                    className={`mt-3 font-head text-lg font-bold text-ink ${e.lang === "mr" ? "font-deva" : ""}`}
                  >
                    {e.title}
                  </h2>
                  <p
                    className={`mt-2 flex-1 text-sm text-muted line-clamp-3 ${e.lang === "mr" ? "font-deva" : ""}`}
                  >
                    {e.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Invitation poster archive */}
      <Section muted id="invitations">
        <SectionHeading
          eyebrow="Archive"
          title="Event Invitations"
          subtitle="Invitation posters from our annual celebrations and community programs."
        />
        {eventPosters.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gold-500/40 bg-white py-16 text-center">
            <ScrollText className="h-10 w-10 text-gold-500" />
            <p className="mt-3 font-head font-semibold text-ink">Invitation archive coming soon</p>
            <p className="mt-1 max-w-md text-sm text-muted">
              Posters from past programs (Agrasen Jayanti Samaroh and more) will appear
              here as they are added.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventPosters.map((p) => (
              <Reveal key={p.image}>
                <a
                  href={`/images/events/${p.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-premium group block overflow-hidden rounded-3xl border border-line bg-white shadow-soft"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={`/images/events/${p.image}`}
                      alt={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <div>
                      <p className="font-head text-sm font-bold text-ink">{p.title}</p>
                      <p className="text-xs text-muted">{p.year}</p>
                    </div>
                    <FileImage className="h-5 w-5 shrink-0 text-gold-600" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
