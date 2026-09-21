import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/door-configurator"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
