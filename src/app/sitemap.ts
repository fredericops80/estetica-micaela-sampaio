import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = clinic.siteUrl;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1, alternates: { languages: { "pt-PT": `${base}/`, en: `${base}/en` } } },
    { url: `${base}/en`, lastModified: now, priority: 0.9 },
    { url: `${base}/club`, lastModified: now, priority: 0.8, alternates: { languages: { "pt-PT": `${base}/club`, en: `${base}/en/club` } } },
    { url: `${base}/en/club`, lastModified: now, priority: 0.7 },
  ];
}
