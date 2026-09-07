import type { MetadataRoute } from "next";
import { getIndexablePaths } from "@/data/navigation";
import { getSiteUrl } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return getIndexablePaths().map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}
