import type { MetadataRoute } from "next";
import { events } from "@/lib/site";

const base = "https://shreeagrasentrust.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/committee",
    "/services",
    "/gallery",
    "/events",
    "/contact",
    "/donate",
    "/booking",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const eventRoutes = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...eventRoutes];
}
