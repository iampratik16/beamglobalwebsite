import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { serviceSlugs } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { legalDocs } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = "2026-06-15";

  const staticRoutes = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/services", priority: 0.9, freq: "monthly" as const },
    { path: "/about", priority: 0.7, freq: "monthly" as const },
    { path: "/insights", priority: 0.7, freq: "weekly" as const },
    { path: "/blog", priority: 0.7, freq: "weekly" as const },
    { path: "/careers", priority: 0.6, freq: "monthly" as const },
    { path: "/contact", priority: 0.6, freq: "monthly" as const },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  for (const slug of serviceSlugs) {
    entries.push({
      url: `${base}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const post of blogPosts) {
    entries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  for (const slug of Object.keys(legalDocs)) {
    entries.push({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    });
  }

  return entries;
}
