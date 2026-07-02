"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function GalleryGrid({ images }: { images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = () => setOpen(null);
  const prev = () =>
    setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const next = () =>
    setOpen((i) => (i === null ? i : (i + 1) % images.length));

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setOpen(i)}
            className="group relative block w-full overflow-hidden rounded-2xl shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
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

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-8"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-8"
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
