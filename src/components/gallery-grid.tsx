"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryCategory = { id: string; label: string; images: string[] };

export function GalleryGrid({ categories }: { categories: GalleryCategory[] }) {
  const tabs = useMemo(() => {
    // Only surface categories that actually have images — no empty tabs.
    const withImages = categories.filter((c) => c.images.length > 0);
    const all = { id: "all", label: "All", images: withImages.flatMap((c) => c.images) };
    // If everything is in one bucket, the "All" tab alone is enough.
    return withImages.length > 1 ? [all, ...withImages] : withImages;
  }, [categories]);

  const [active, setActive] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  // Fall back to the first available tab if the active id isn't present.
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];
  const images = activeTab?.images ?? [];

  const close = () => setOpen(null);
  const prev = () =>
    setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const next = () => setOpen((i) => (i === null ? i : (i + 1) % images.length));

  // Keyboard navigation for the lightbox.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  return (
    <>
      {/* Category tabs (only when there's more than one) */}
      {tabs.length > 1 && (
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActive(t.id);
              setOpen(null);
            }}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeTab?.id === t.id
                ? "bg-gold-gradient text-[#3d2600] shadow-[0_6px_16px_-8px_rgba(212,175,55,0.8)]"
                : "border border-line bg-white text-body hover:border-gold-400 hover:text-gold-700"
            )}
          >
            {t.label}
            <span className="ml-1.5 text-xs opacity-70">{t.images.length}</span>
          </button>
        ))}
      </div>
      )}

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-surface py-16 text-center">
          <ImageOff className="h-10 w-10 text-muted" />
          <p className="mt-3 font-head font-semibold text-ink">Photos coming soon</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            We&apos;re adding pictures for this section. Please check back shortly.
          </p>
        </div>
      ) : (
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {images.map((img, i) => (
            <button
              key={`${img}-${i}`}
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-soft ring-2 ring-transparent transition-all hover:ring-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              aria-label={`Open image ${i + 1}`}
            >
              <Image
                src={`/images/gallery/${img}`}
                alt={`Shree Agrasen Trust gallery image ${i + 1}`}
                width={600}
                height={450}
                sizes="(max-width:768px) 50vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
            </button>
          ))}
        </div>
      )}

      {open !== null && images[open] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-transform hover:rotate-90 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-[#3d2600] md:left-8"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-[#3d2600] md:right-8"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/images/gallery/${images[open]}`}
              alt={`Shree Agrasen Trust gallery image ${open + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
