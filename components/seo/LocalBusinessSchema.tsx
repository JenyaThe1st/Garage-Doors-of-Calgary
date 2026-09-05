import { siteConfig } from "@/data/siteConfig";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.businessName,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    areaServed: [
      siteConfig.serviceAreas.primary,
      ...siteConfig.serviceAreas.surrounding,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.province,
      addressCountry: siteConfig.location.country,
    },
    url: "/",
    description: siteConfig.tagline,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
