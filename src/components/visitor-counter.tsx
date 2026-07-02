"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

/**
 * Visitor counter. Increments once per browser session (sessionStorage guard),
 * otherwise just reads the current total, then rolls the digits up to it.
 * Renders nothing until a real count is available (counter not configured → hidden).
 */
export function VisitorCounter() {
  const [target, setTarget] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let active = true;
    const counted = sessionStorage.getItem("sat_visited");
    const method = counted ? "GET" : "POST";
    fetch("/api/visitors", { method })
      .then((r) => r.json())
      .then((d: { count: number | null }) => {
        if (!active || typeof d.count !== "number") return;
        sessionStorage.setItem("sat_visited", "1");
        setTarget(d.count);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (target === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    const from = 0;
    const dur = 1600;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target]);

  if (target === null) return null;

  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted">
      <Eye className="h-4 w-4 text-gold-600" />
      <span>
        Visitors:{" "}
        <span className="font-head font-bold text-gold-700 tabular-nums">
          {display.toLocaleString("en-IN")}
        </span>
      </span>
    </span>
  );
}
