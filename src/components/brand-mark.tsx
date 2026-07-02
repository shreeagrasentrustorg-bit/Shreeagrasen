import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Site logo mark — the Maharaja Agrasen emblem in a circular frame.
 * Pass size via className (e.g. "h-11 w-11"). Uses `fill`, so the wrapper is
 * relatively positioned with a white backdrop so the emblem reads on any header.
 */
export function BrandMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-brand-500/20",
        className
      )}
    >
      <Image
        src="/images/logo/logo.jpg"
        alt={site.name}
        fill
        sizes="48px"
        className="object-cover"
        priority={priority}
      />
    </span>
  );
}
