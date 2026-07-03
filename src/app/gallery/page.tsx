import type { Metadata } from "next";
import { PageBanner } from "@/components/page-banner";
import { Section } from "@/components/ui/section";
import { GalleryGrid, type GalleryCategory } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of Shree Agrasen Bhawan — the banquet hall, rooms, events, cultural programs, pharmacy and Maharaja Agrasen in Chinchwad, Pune.",
};

// Categories mirror the original site's gallery filter:
//   All Images | Hall | Our Pharmacy | Entrance | Agrasen Maharaji | Other Services
// The "All Images" tab is generated automatically by GalleryGrid from every
// category that has photos. Move each filename into the category it belongs to
// as photos are identified; empty categories are hidden until they have images.
const categories: GalleryCategory[] = [
  { id: "hall", label: "Hall", images: ["rooms.jpg"] },
  {
    id: "other",
    label: "Other Services",
    images: [
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
    ],
  },
  // Empty categories stay hidden until photos are added to them:
  { id: "pharmacy", label: "Our Pharmacy", images: [] },
  { id: "entrance", label: "Entrance", images: [] },
  { id: "maharaji", label: "Agrasen Maharaji", images: [] },
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
        <GalleryGrid categories={categories} />
      </Section>
    </>
  );
}
