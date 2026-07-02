"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Golden circular scroll-to-top button that fades in past the first viewport. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-gold-gradient text-[#3d2600] shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:animate-pulse-gold ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
