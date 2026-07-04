import type { Metadata } from "next";
import Image from "next/image";
import { Phone } from "lucide-react";
import { PageBanner } from "@/components/page-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { committee, panchCommittee } from "@/lib/site";

export const metadata: Metadata = {
  title: "Managing Committee",
  description:
    "The elected Managing Committee (2022–2025) and Panch Committee of Shree Agrasen Trust, Chinchwad–Pradhikaran.",
};

/** Initials for the avatar fallback, skipping honorifics (Shri / CA. / Dr.). */
function initials(name: string) {
  const words = name.replace(/^(Shri|Smt\.?|CA\.?|Dr\.?)\s+/i, "").split(/\s+/);
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export default function CommitteePage() {
  return (
    <>
      <PageBanner
        crumb="Committee"
        title="Our Managing Committee"
        subtitle="Dedicated members who lead and serve the community with integrity."
      />

      <Section>
        <SectionHeading
          eyebrow="2022 – 2025"
          title="Present Elected Committee"
          subtitle="Meet the office bearers and members guiding the trust today."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {committee.filter((m) => m.img).map((m, i) => (
            <Reveal key={`${m.name}-${i}`} delay={(i % 4) * 0.05}>
              <div className="card-premium group h-full overflow-hidden rounded-3xl border border-line bg-white shadow-soft ring-1 ring-transparent transition-all hover:ring-gold-400/60">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface2">
                  {m.img ? (
                    <>
                      <Image
                        src={`/images/committee/${m.img}`}
                        alt={m.name}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1280px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* golden sheen on hover */}
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d2600]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </>
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-gold-50 to-accent-600/10">
                      <span className="font-head text-4xl font-extrabold text-gold-gradient">
                        {initials(m.name)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-head text-base font-bold leading-snug text-ink transition-colors group-hover:text-gold-700">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-600">
                    {m.post}
                  </p>
                  {m.phone && (
                    <a
                      href={`tel:+91${m.phone}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-brand-700"
                    >
                      <Phone className="h-3.5 w-3.5" /> +91 {m.phone}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Guidance"
          title="Panch Committee Members"
          subtitle="Respected elders who provide wisdom and direction to the trust."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {panchCommittee.map((name, i) => (
            <Reveal key={name} delay={(i % 3) * 0.05}>
              <div className="card-premium flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-gradient text-sm font-bold text-[#3d2600] shadow-gold">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-ink">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
