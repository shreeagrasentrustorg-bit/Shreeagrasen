import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { events } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event not found" };
  return { title: event.title, description: event.excerpt };
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const deva = event.lang === "mr" ? "font-deva" : "";

  return (
    <>
      <PageBanner crumb="Events" title="Event Details" />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to events
          </Link>

          <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600">
            <CalendarDays className="h-4 w-4" /> {formatDate(event.date)}
          </span>
          <h1 className={`mt-3 text-3xl font-bold text-ink md:text-4xl ${deva}`}>
            {event.title}
          </h1>

          <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl shadow-card">
            <Image
              src={`/images/gallery/${event.image}`}
              alt={event.title}
              fill
              sizes="(max-width:768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <p className={`mt-8 text-lg leading-relaxed text-body ${deva}`}>
            {event.body}
          </p>

          <div className="mt-10 rounded-3xl bg-surface p-6 text-center">
            <p className="text-body">Want to be part of our next event?</p>
            <ButtonLink href="/contact" className="mt-4">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
