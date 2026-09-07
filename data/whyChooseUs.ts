import { siteConfig } from "./siteConfig";

export type WhyChooseItem = {
  title: string;
  description: string;
};

export const whyChooseUsSection = {
  title: "Why Choose Us",
  subtitle:
    "Every customer has a different situation. We understand the problem first, then recommend the right solution.",
  image: "/images/why-choose-us.jpg",
  imageAlt: `Quality garage door installation in ${siteConfig.location.city}`,
} as const;

export const whyChooseUsItems: WhyChooseItem[] = [
  {
    title: "We diagnose first",
    description:
      "Every customer has a different situation. We understand the problem before recommending the right solution — not the most expensive one.",
  },
  {
    title: `${siteConfig.experience} of experience`,
    description:
      "Residential and commercial garage doors serviced across Calgary with practical, proven workmanship.",
  },
  {
    title: "Same-day availability",
    description:
      "When your garage door stops working, you need help now — not next week. We prioritize urgent calls.",
  },
  {
    title: "7 days a week",
    description: `Garage door problems don't wait for weekdays. We're available ${siteConfig.availabilityLabel}, ${siteConfig.hoursLabel}.`,
  },
  {
    title: "Residential & commercial",
    description:
      "From single-family homes to business properties, we handle the full range of garage door work.",
  },
  {
    title: "Confidence in our work",
    description:
      "We stand behind the service we provide and focus on solutions that make sense for your door and your budget.",
  },
];
