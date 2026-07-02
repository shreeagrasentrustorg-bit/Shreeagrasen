"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up animation that runs once when the element scrolls into view.
 * Parses a display string like "40+", "500+", "1981" or "1": the leading digits
 * are animated from 0, and any non-digit prefix/suffix (e.g. "+") is preserved.
 */
export function CountUp({
  value,
  duration = 1800,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);
  const done = useRef(false);

  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);

  useEffect(() => {
    if (!match) return; // no number to animate — leave the raw value
    const prefix = match[1];
    const target = Number(match[2].replace(/,/g, ""));
    const suffix = match[3];
    setDisplay(`${prefix}0${suffix}`);

    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const run = () => {
      if (done.current) return;
      done.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const current = Math.round(target * eased);
        setDisplay(`${prefix}${current.toLocaleString("en-IN")}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
