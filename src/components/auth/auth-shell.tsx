import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <section className="hero-glow flex min-h-[80vh] items-center justify-center bg-surface px-4 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mx-auto mb-6 flex w-fit items-center gap-2">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500 font-head text-lg font-extrabold text-white">
            अ
          </span>
          <span className="font-head text-lg font-bold text-ink">
            Shree Agrasen Trust
          </span>
        </Link>
        <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
          <h1 className="font-head text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
      </div>
    </section>
  );
}

export const authField =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";
export const authLabel = "mb-1.5 block text-sm font-medium text-ink";
