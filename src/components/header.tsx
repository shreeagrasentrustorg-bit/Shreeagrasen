"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, HeartHandshake, ChevronDown, Clock } from "lucide-react";
import { nav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { AuthNav } from "@/components/auth/auth-nav";
import { BrandMark } from "@/components/brand-mark";
import {
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
} from "@/components/brand-icons";
import { cn } from "@/lib/utils";

const socials = [
  { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: site.twitter, label: "Twitter / X", Icon: TwitterIcon },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
].filter((s) => s.href);

export function Header() {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar (desktop) */}
      <div className="hidden bg-maroon text-white/85 lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-300"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400" /> {site.phones[0]}
            </a>
            <span className="flex items-center gap-1.5 text-white/70">
              <Clock className="h-3.5 w-3.5 text-gold-400" /> {site.hoursDetail}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="transition-colors hover:text-gold-300">
              General Enquiry
            </Link>
            <Link href="/membership" className="transition-colors hover:text-gold-300">
              Apply for Membership
            </Link>
            <Link href="/booking" className="transition-colors hover:text-gold-300">
              Booking Enquiry
            </Link>
            {socials.length > 0 && (
              <span className="flex items-center gap-2 border-l border-white/15 pl-4">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white/70 transition-colors hover:text-gold-300"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-line bg-white/90 backdrop-blur-md shadow-soft"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3" aria-label={site.name}>
            <BrandMark className="h-11 w-11 shadow-[0_6px_16px_-6px_rgba(246,147,35,0.8)]" priority />
            <span className="leading-tight">
              <span className="block font-head text-base font-bold text-ink md:text-lg">
                Shree Agrasen Trust
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-wide text-muted">
                Chinchwad–Pradhikaran
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active ? "text-gold-700" : "text-body hover:text-gold-700"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold-gradient transition-transform duration-300 origin-center",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="min-w-52 rounded-2xl border border-line bg-white p-2 shadow-card">
                        {item.children.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-gold-50 hover:text-gold-700"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <AuthNav />
            </div>
            <ButtonLink href="/donate" variant="outline" size="sm" className="hidden sm:inline-flex">
              <HeartHandshake className="h-4 w-4" /> Donate
            </ButtonLink>
            <ButtonLink href="/booking" size="sm" className="hidden md:inline-flex">
              Book Hall
            </ButtonLink>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-surface2 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden border-t border-line bg-white transition-[max-height] duration-300 ease-in-out",
          open ? "max-h-[85vh] overflow-y-auto overscroll-contain" : "max-h-0 overflow-hidden"
        )}
      >
        <nav className="container-x flex flex-col py-4">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className="flex-1 rounded-xl px-3 py-3 text-base font-medium text-body hover:bg-surface hover:text-gold-700"
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={submenu === item.label}
                    onClick={() =>
                      setSubmenu((s) => (s === item.label ? null : item.label))
                    }
                    className="grid h-10 w-10 place-items-center rounded-xl text-body hover:bg-surface"
                  >
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        submenu === item.label && "rotate-180"
                      )}
                    />
                  </button>
                </div>
                {submenu === item.label && (
                  <div className="ml-3 border-l border-line pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface hover:text-gold-700"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-body hover:bg-surface hover:text-gold-700"
              >
                {item.label}
              </Link>
            )
          )}

          <div className="mt-3">
            <AuthNav mobile />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <ButtonLink href="/donate" variant="outline" size="md">
              <HeartHandshake className="h-4 w-4" /> Donate
            </ButtonLink>
            <ButtonLink href="/booking" size="md">
              Book Hall
            </ButtonLink>
          </div>
          <a
            href={`tel:${site.phones[0].replace(/\s/g, "")}`}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-surface px-3 py-3 text-sm font-semibold text-ink"
          >
            <Phone className="h-4 w-4 text-brand-600" /> {site.phones[0]}
          </a>
        </nav>
      </div>
    </header>
  );
}
