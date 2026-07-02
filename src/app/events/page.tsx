import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { events } from "@/lib/site";
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
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600">
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
    </>
  );
}
