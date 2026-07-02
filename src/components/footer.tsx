import Link from "next/link";
import { MapPin, Phone, Mail, Clock, HeartHandshake } from "lucide-react";
import {
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
} from "@/components/brand-icons";
import { nav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/brand-mark";
import { VisitorCounter } from "@/components/visitor-counter";

const socials = [
  { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: site.twitter, label: "Twitter / X", Icon: TwitterIcon },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-transparent bg-surface [border-image:linear-gradient(90deg,transparent,#d4af37,transparent)_1]">
      {/* Large watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-10 select-none font-head text-[16rem] font-extrabold leading-none text-gold-500/[0.05]"
      >
        अ
      </span>
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-11 w-11" />
            <span className="font-head text-lg font-bold text-ink">
              Shree Agrasen Trust
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Serving the Agrawal community of PCMC since {site.foundedYear}. A home
            for culture, service and togetherness at {site.venue}, Chinchwad, Pune.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-body transition-all hover:border-gold-500 hover:text-gold-700 hover:shadow-[0_0_16px_rgba(212,175,55,0.45)]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-head text-sm font-bold uppercase tracking-wider text-ink">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/booking" className="text-muted hover:text-brand-700">
                Hall Booking
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-muted hover:text-brand-700">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-head text-sm font-bold uppercase tracking-wider text-ink">
            Reach Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <span>{site.address.full}</span>
            </li>
            {site.phones.map((p) => (
              <li key={p} className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-600" />
                <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-brand-700">
                  {p}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand-600" />
              <a href={`mailto:${site.email}`} className="hover:text-brand-700">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <span>{site.hoursDetail}</span>
            </li>
          </ul>
        </div>

        {/* Donate CTA */}
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h3 className="font-head text-lg font-bold text-ink">Support the Trust</h3>
          <p className="mt-2 text-sm text-muted">
            Your contribution helps us serve the community through health, culture
            and social initiatives.
          </p>
          <ButtonLink href="/donate" className="mt-4 w-full">
            <HeartHandshake className="h-4 w-4" /> Donate Now
          </ButtonLink>
        </div>
      </div>

      {/* Maharaja Agrasen blessing */}
      <div className="relative border-t border-line">
        <p className="container-x py-4 text-center font-deva text-sm text-gold-700">
          ॥ जय श्री अग्रसेन महाराज ॥ — सर्वे भवन्तु सुखिनः
        </p>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.nameFull}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <VisitorCounter />
            <p>Established {site.founded}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
