import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Wind, Droplets, Sparkles, BedDouble } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { DynIcon } from "@/components/icon";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Hall & room booking, community health services and cultural programs at Shree Agrasen Bhawan, Chinchwad, Pune.",
};

const hallImages = ["tab-item-01.jpg", "tab-item-02.jpg", "tab-item-03.jpg", "tab-item-04.jpg"];
const hallAmenities = [
  { icon: Wind, label: "A/C & sound-proof" },
  { icon: Sparkles, label: "Beautifully decorated" },
  { icon: Droplets, label: "Water supply facility" },
  { icon: BedDouble, label: "Guest rooms available" },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        crumb="Services"
        title="Services for members & public"
        subtitle="Celebrations, compassionate care and culture — all under one roof."
      />

      {/* Overview cards */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <a
                href={`#${s.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <DynIcon name={s.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-head text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Hall booking */}
      <Section muted id="hall-booking">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {hallImages.map((img, i) => (
                <div
                  key={img}
                  className={`relative overflow-hidden rounded-2xl shadow-card ${i % 2 ? "mt-6" : ""} aspect-[4/3]`}
                >
                  <Image src={`/images/services/${img}`} alt="Banquet hall" fill sizes="25vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="The Venue" title="Hall & Room Booking" />
            <p className="mt-6 leading-relaxed text-body">
              Shree Agrasen Bhawan offers a grand, air-conditioned and sound-proof
              banquet hall (approx. <strong className="text-ink">130 × 29 ft</strong>),
              beautifully decorated for weddings, receptions, engagements, religious
              functions and community events — with guest rooms available.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {hallAmenities.map((a) => (
                <div key={a.label} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft">
                  <a.icon className="h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-sm font-medium text-ink">{a.label}</span>
                </div>
              ))}
            </div>
            <ButtonLink href="/booking" size="lg" className="mt-8">
              Enquire & Book <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Health services */}
      <Section id="health-services">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeading eyebrow="Compassionate Care" title="Health Services" />
            <p className="mt-6 leading-relaxed text-body">
              Agrasen Trust is committed to the well-being of the community. Through
              free medicine, blood-donation initiatives and medical check-ups at
              discounted rates for trust members, we make a real difference in the
              lives of many.
            </p>
            <ul className="mt-6 space-y-3">
              {services[1].features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-body">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
              <Image src="/images/services/tab-item-05.jpg" alt="Community health camp" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Cultural programs */}
      <Section muted id="cultural-programs">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
              <Image src="/images/gallery/gallery-item-08.jpg" alt="Cultural program" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Togetherness" title="Cultural Programs" />
            <p className="mt-6 leading-relaxed text-body">
              Festivals, cultural gatherings and community programs keep the
              traditions and unity of the Agrawal community alive. From religious
              celebrations to youth and family events, there is always something
              that brings us together.
            </p>
            <ul className="mt-6 space-y-3">
              {services[2].features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-body">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-600" />
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink href="/events" variant="outline" className="mt-8">
              See our events <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
