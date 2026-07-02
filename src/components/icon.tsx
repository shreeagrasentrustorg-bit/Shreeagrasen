import {
  Building2,
  HeartPulse,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Building2,
  HeartPulse,
  PartyPopper,
};

export function DynIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Building2;
  return <Cmp className={className} />;
}
