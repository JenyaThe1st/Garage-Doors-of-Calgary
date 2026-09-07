import { getAvailabilityLabel, siteConfig } from "./siteConfig";

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const homeHero = {
  headline: "Garage Door Problems?",
  headlineEmphasis: "We'll Get It Moving Again.",
  body: `Same-day garage door repair, installation and maintenance across ${siteConfig.location.city} and surrounding areas. Residential & commercial.`,
  hours: sentenceCase(getAvailabilityLabel()),
  images: {
    mobile: "/images/hero-background-mobile.png",
    desktop: "/images/hero-background.png",
    alt: `Professional garage door service in ${siteConfig.location.city}`,
  },
} as const;

export const homeServices = {
  title: "Our Services",
  subtitle:
    "Precision is built into every service we provide. From repairs and adjustments to complete installations, we focus on accurate workmanship, dependable operation, and the security of your home.",
  ctaLabel: "Need Help Today? Same-Day Service",
} as const;

export const homeFinalCta = {
  headline: "Garage Door Giving You Trouble?",
  headlineEmphasis: "Call Today.",
  body: `Same-day garage door service across ${siteConfig.location.city} and surrounding areas, ${getAvailabilityLabel()}.`,
} as const;
