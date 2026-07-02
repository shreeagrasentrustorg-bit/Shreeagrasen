import type { Metadata } from "next";
import { PageBanner } from "@/components/page-banner";
import { Section } from "@/components/ui/section";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of Shree Agrasen Bhawan — the banquet hall, rooms, events and cultural programs in Chinchwad, Pune.",
};

const images = [
  "featured.jpg",
  "gallery-item-01.jpg",
  "gallery-item-02.jpg",
  "gallery-item-03.jpg",
  "gallery-item-04.jpg",
  "gallery-item-05.jpg",
  "gallery-item-06.jpg",
  "gallery-item-07.jpg",
  "gallery-item-08.jpg",
  "gallery-item-10.jpg",
  "gallery-item-11.jpg",
  "gallery-item-12.jpg",
  "gallery-item-13.jpg",
  "gallery-item-14.jpg",
  "rooms.jpg",
];

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        crumb="Gallery"
        title="Our Gallery"
        subtitle="Moments from celebrations, programs and community life at Shree Agrasen Bhawan."
      />
      <Section>
        <GalleryGrid images={images} />
      </Section>
    </>
  );
}
