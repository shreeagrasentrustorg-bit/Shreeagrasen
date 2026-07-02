import type { Metadata } from "next";
import Image from "next/image";
import { Landmark, Target, Users, HeartHandshake } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { site, founderTrustees, pastChairmen } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Trust",
  description:
    "History of Shree Agrasen Trust, Chinchwad–Pradhikaran — founded 1981, our founder trustees and the galaxy of past chairmen.",
};

const values = [
  { icon: Landmark, title: "Heritage", text: "Preserving the pride and traditions of the Agrawal community." },
  { icon: HeartHandshake, title: "Seva", text: "Selfless service through health, social and cultural work." },
  { icon: Users, title: "Unity", text: "Bringing families of the community together as one." },
  { icon: Target, title: "Progress", text: "Educational and social upliftment for a brighter future." },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        crumb="About"
        title="About Shree Agrasen Trust"
        subtitle="A community built on pride, respect and selfless service since 1981."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/images/about/item-02.jpg"
                alt="Shree Agrasen Bhawan, Chinchwad"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our Story" title="Formed on 12 October 1981" />
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-body">
                Shree Agrasen Trust, Chinchwad–Pradhikaran was formed on{" "}
                <strong className="text-ink">{site.founded}</strong> with the
                efforts of a group of devoted Agarwals who wanted to take our
                community to a different level of pride and respect.
              </p>
              <p className="mt-4 leading-relaxed text-body">
                To enlarge the activities of the Agarwal community in PCMC and to
                serve mankind in general, the trust was founded with the view of
                providing better religious, social, educational and cultural
                exchange among the people of the Agrawal community. Construction of
                the Agrawal Samaj Bhawan began on 12 October 1981.
              </p>
              <p className="mt-4 leading-relaxed text-body">
                Today, {site.venue} stands as a vibrant centre — a grand banquet
                hall, a hub for health services, and a home for cultural programs
                that unite our community.
              </p>
            </Reveal>

            {/* Trust video */}
            <Reveal delay={0.15}>
              <div className="mt-8 overflow-hidden rounded-3xl border border-gold-500/30 shadow-gold">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${site.youtubeId}`}
                    title="Shree Agrasen Bhawan"
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section muted>
        <SectionHeading center eyebrow="What Guides Us" title="Our values" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-line bg-white p-7 text-center shadow-soft">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold-50 text-gold-600">
                  <v.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-head text-lg font-bold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Founder trustees */}
      <Section>
        <SectionHeading
          eyebrow="With Gratitude"
          title="Founder Trustees"
          subtitle="The visionaries who laid the foundation of our community in 1981."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {founderTrustees.map((name, i) => (
            <Reveal key={name} delay={(i % 3) * 0.05}>
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-gradient text-sm font-bold text-[#3d2600]">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-ink">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Past chairmen */}
      <Section muted>
        <SectionHeading
          eyebrow="Legacy"
          title="Galaxy of Past Chairmen"
          subtitle="Leaders who steered the trust across the decades."
        />
        <Reveal>
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            {/* Desktop table */}
            <table className="hidden w-full text-left sm:table">
              <thead>
                <tr className="bg-gold-gradient text-xs uppercase tracking-wider text-[#3d2600]">
                  <th className="px-6 py-4 font-semibold">#</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Post</th>
                  <th className="px-6 py-4 font-semibold">Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pastChairmen.map((c, i) => (
                  <tr key={i} className="text-sm transition-colors hover:bg-gold-50">
                    <td className="px-6 py-4 font-semibold text-gold-700">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-ink">{c.name}</td>
                    <td className="px-6 py-4 text-muted">{c.post}</td>
                    <td className="px-6 py-4 text-muted">{c.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mobile cards */}
            <ul className="divide-y divide-line sm:hidden">
              {pastChairmen.map((c, i) => (
                <li key={i} className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gold-700">#{i + 1}</span>
                    <span className="text-xs text-muted">{c.year}</span>
                  </div>
                  <p className="mt-1 font-medium text-ink">{c.name}</p>
                  <p className="text-sm text-muted">{c.post}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
