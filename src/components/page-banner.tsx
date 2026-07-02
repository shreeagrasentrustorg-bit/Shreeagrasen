import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageBanner({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface hero-glow">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.16) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Golden ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.20) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative py-14 md:py-20">
        <nav className="flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-gold-700">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-gold-700">{crumb}</span>
        </nav>
        <h1 className="mt-4 text-4xl font-bold text-ink md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
