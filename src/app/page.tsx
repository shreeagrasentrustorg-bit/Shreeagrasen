import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  HeartPulse,
  CalendarDays,
  HeartHandshake,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { DynIcon } from "@/components/icon";
import {
  site,
  services,
  stats,
  events,
  galleryImages,
  committee,
} from "@/lib/site";
import { formatDate } from "@/lib/utils";

const quickActions = [
  { icon: Building2, title: "Book the Hall", desc: "A/C banquet hall & rooms", href: "/booking" },
  { icon: HeartPulse, title: "Health Services", desc: "Free medicine & camps", href: "/services#health-services" },
  { icon: CalendarDays, title: "Events & Notices", desc: "Programs & updates", href: "/events" },
  { icon: HeartHandshake, title: "Donate", desc: "Support the trust", href: "/donate" },
];

export default function Home() {
  const chairman = committee[0];
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-surface hero-glow">
        <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Since {site.foundedYear} · Chinchwad, Pune</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-ink md:text-6xl">
                Serving the{" "}
                <span className="text-gradient">Agrawal community</span> of PCMC
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
                {site.venue} is a home for culture, service and togetherness —
                offering a grand banquet hall, community health services and
                cultural programs for our people since {site.founded}.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/booking" size="lg">
                  Book the Hall <ArrowRight className="h-5 w-5" />
                </ButtonLink>
                <ButtonLink href="/about" variant="outline" size="lg">
                  About the Trust
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-head text-2xl font-extrabold text-brand-600 md:text-3xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-xs font-medium text-muted">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift md:aspect-square">
              <Image
                src="/images/gallery/featured.jpg"
                alt="Shree Agrasen Bhawan — banquet hall and community venue in Chinchwad, Pune"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-white p-4 shadow-card sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-600/10 text-accent-600">
                  <HeartPulse className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-head text-sm font-bold text-ink">
                    Community Health
                  </p>
                  <p className="text-xs text-muted">Free medicine &amp; camps</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== QUICK ACTIONS ============== */}
      <div className="container-x relative z-10 -mt-10 hidden md:block">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickActions.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <Link
                href={a.href}
                className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <a.icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-head font-bold text-ink">
                    {a.title}
                  </span>
                  <span className="block text-sm text-muted">{a.desc}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-card">
                <Image src="/images/about/item-01.jpg" alt="Trust activity" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative mt-8 aspect-square overflow-hidden rounded-2xl shadow-card">
                <Image src="/images/gallery/gallery-item-02.jpg" alt="Community event" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Our Story"
              title="A legacy of pride, service and unity"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-body">
                Shree Agrasen Trust, Chinchwad–Pradhikaran was formed on{" "}
                <strong className="text-ink">{site.founded}</strong> with the
                efforts of a group of devoted Agarwals who wanted to take our
                community to a different level of pride and respect.
              </p>
              <p className="mt-4 leading-relaxed text-body">
                Built to enable better religious, social, educational and
                cultural exchange, {site.venue} today stands as a vibrant centre
                for the entire Agrawal community of PCMC.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Founded by 11 devoted trustees",
                  "40+ years of service",
                  "Grand A/C banquet hall",
                  "Health & cultural programs",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-body">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/about" variant="outline" className="mt-8">
                Read our full history <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ================= SERVICES ================= */}
      <Section muted>
        <SectionHeading
          center
          eyebrow="What We Offer"
          title="Services for our community"
          subtitle="From celebrations to compassionate care, the trust serves members and the wider public alike."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <DynIcon name={s.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-head text-xl font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {s.short}
                </p>
                <Link
                  href={`/services#${s.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-all hover:gap-2.5"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================= EVENTS ================= */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Latest" title="Events & notices" />
          <ButtonLink href="/events" variant="ghost" size="sm">
            View all <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {events.slice(0, 3).map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.08}>
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
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {formatDate(e.date)}
                  </span>
                  <h3
                    className={`mt-2 font-head text-lg font-bold text-ink ${e.lang === "mr" ? "font-deva" : ""}`}
                  >
                    {e.title}
                  </h3>
                  <p
                    className={`mt-2 flex-1 text-sm text-muted line-clamp-3 ${e.lang === "mr" ? "font-deva" : ""}`}
                  >
                    {e.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================= GALLERY ================= */}
      <Section muted>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Moments" title="From our gallery" />
          <ButtonLink href="/gallery" variant="ghost" size="sm">
            Full gallery <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {galleryImages.slice(0, 6).map((img, i) => (
            <Reveal key={img} delay={i * 0.04}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={`/images/gallery/${img}`}
                  alt="Shree Agrasen Trust event"
                  fill
                  sizes="(max-width:640px) 50vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================= COMMITTEE HIGHLIGHT ================= */}
      <Section>
        <div className="grid items-center gap-10 rounded-[2rem] bg-ink px-8 py-12 text-white md:grid-cols-2 md:px-14">
          <div>
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="mt-4 font-head text-3xl font-bold text-white md:text-4xl">
              Guided by a devoted committee
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Our elected committee (2022–2025) and Panch committee work
              tirelessly to serve the community with dedication and integrity.
            </p>
            <ButtonLink href="/committee" variant="white" className="mt-8">
              Meet the committee <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="flex items-center gap-5 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={`/images/committee/${chairman.img}`}
                alt={chairman.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <Quote className="h-6 w-6 text-brand-400" />
              <p className="mt-2 font-head text-lg font-bold text-white">
                {chairman.name}
              </p>
              <p className="text-sm text-brand-300">{chairman.post}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= DONATE BAND ================= */}
      <section className="relative overflow-hidden bg-brand-500">
        <div className="container-x relative flex flex-col items-center gap-6 py-14 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-head text-2xl font-bold text-white md:text-3xl">
              Be a part of the seva
            </h2>
            <p className="mt-2 max-w-xl text-white/90">
              Your generous contribution powers our health, cultural and social
              initiatives for the community.
            </p>
          </div>
          <ButtonLink href="/donate" variant="white" size="lg">
            <HeartHandshake className="h-5 w-5" /> Donate Now
          </ButtonLink>
        </div>
      </section>

      {/* ================= CONTACT STRIP ================= */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Visit Us" title="Reach Shree Agrasen Bhawan" />
            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Address</p>
                  <p className="text-sm text-muted">{site.address.full}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <p className="text-sm text-muted">{site.phones.join(" · ")}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <p className="text-sm text-muted">{site.email}</p>
                </div>
              </li>
            </ul>
            <ButtonLink href="/contact" className="mt-8">
              Contact us <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line shadow-card">
            <iframe
              src={site.mapsEmbed}
              title="Shree Agrasen Trust location map"
              className="h-full min-h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Section>
    </>
  );
}
