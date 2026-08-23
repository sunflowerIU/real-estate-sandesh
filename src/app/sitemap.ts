import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getProperties } from "@/lib/properties";
export default function sitemap(): MetadataRoute.Sitemap {
  const listings = getProperties().map((property) => ({ url: `${siteConfig.url}/properties/${property.slug}`, lastModified: new Date(property.postedAt), changeFrequency: "weekly" as const, priority: 0.8 }));
  return [{ url: siteConfig.url, lastModified: new Date(), changeFrequency: "daily", priority: 1 }, ...listings];
}
