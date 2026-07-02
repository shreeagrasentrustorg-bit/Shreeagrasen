"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, HeartHandshake } from "lucide-react";
import { nav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { AuthNav } from "@/components/auth/auth-nav";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-white/90 backdrop-blur-md shadow-soft"
          : "bg-white/70 backdrop-blur-sm"
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
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-gold-700" : "text-body hover:text-gold-700"
                )}
              >
                {item.label}
                {/* Golden underline — full when active, grows from center on hover */}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-gradient transition-transform duration-300 origin-center",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <AuthNav />
          </div>
          <ButtonLink
            href="/donate"
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
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

      {/* Mobile drawer — scrollable so nothing (e.g. Login) gets clipped on
          short screens. overflow-hidden only while collapsed, for the animation. */}
      <div
        className={cn(
          "lg:hidden border-t border-line bg-white transition-[max-height] duration-300 ease-in-out",
          open ? "max-h-[80vh] overflow-y-auto overscroll-contain" : "max-h-0 overflow-hidden"
        )}
      >
        <nav className="container-x flex flex-col py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-3 text-base font-medium text-body hover:bg-surface hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
          {/* Auth (Login / Dashboard / Logout) — kept directly under the links
              so it's reachable without hunting past the CTAs and phone number. */}
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
