import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "accent" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-gold-gradient text-[#3d2600] shadow-[0_10px_26px_-10px_rgba(212,175,55,0.75)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_0_22px_rgba(212,175,55,0.55)]",
  accent:
    "bg-accent-600 text-white shadow-[0_8px_20px_-8px_rgba(15,118,110,0.6)] hover:bg-accent-700 hover:-translate-y-0.5",
  outline:
    "border border-gold-500/60 text-gold-700 hover:bg-gold-50 hover:border-gold-500",
  ghost: "text-ink hover:bg-surface2",
  white:
    "bg-white text-ink shadow-card hover:-translate-y-0.5 hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  ...props
}: CommonProps & {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />
    );
  }
  return <Link href={href} className={cls} {...props} />;
}
