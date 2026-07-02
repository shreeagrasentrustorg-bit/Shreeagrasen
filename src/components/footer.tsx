import Link from "next/link";
import { MapPin, Phone, Mail, HeartHandshake } from "lucide-react";
import { FacebookIcon, YoutubeIcon } from "@/components/brand-icons";
import { nav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500 font-head text-lg font-extrabold text-white">
              अ
            </span>
            <span className="font-head text-lg font-bold text-ink">
              Shree Agrasen Trust
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Serving the Agrawal community of PCMC since {site.foundedYear}. A home
            for culture, service and togetherness at {site.venue}, Chinchwad, Pune.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-body transition-colors hover:bg-brand-500 hover:text-white"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-body transition-colors hover:bg-brand-500 hover:text-white"
            >
              <YoutubeIcon className="h-5 w-5" />
            </a>
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

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.nameFull}. All rights reserved.
          </p>
          <p>Established {site.founded}.</p>
        </div>
      </div>
    </footer>
  );
}
