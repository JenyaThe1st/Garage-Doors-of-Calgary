import { siteConfig } from "./siteConfig";

/**
 * `/services` stacked categories (2–n). Broader groups than homepage cards.
 * Banner assets belong here because they are the services-page chrome, not Core.
 */
export const servicesBanner = {
  heading: "Our Services",
  images: {
    mobile: {
      src: "/images/services/overview-banner-mobile.png",
      alt: "",
    },
    tablet: {
      src: "/images/services/overview-banner-tablet.png",
      alt: "",
    },
    desktop: {
      src: "/images/services/overview-banner-desktop.png",
      alt: "",
      width: 2172,
      height: 724,
    },
  },
} as const;

export type ServiceOverviewCategory = {
  id: string;
  title: string;
  description: string;
  items: readonly string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  panelBackground: string;
  panelTone: "light" | "dark";
};

export const serviceOverviewCategories: ServiceOverviewCategory[] = [
  {
    id: "maintenance",
    title: "Maintenance",
    description:
      "Preventive tune-ups to keep your door running quietly and extend its lifespan.",
    items: [
      "Safety inspection",
      "Hardware inspection",
      "Spring inspection",
      "Cable inspection",
      "Roller inspection",
      "Hinge inspection",
      "Track inspection and alignment",
      "Lubrication",
      "Balance check",
      "Opener and safety-reversal check",
      "Weather seal inspection",
    ],
    image: "/images/services/overview-maintenance.jpg",
    imageAlt: `Garage door maintenance service in ${siteConfig.location.city}`,
    imageWidth: 1200,
    imageHeight: 800,
    panelBackground: "#DAD9D9",
    panelTone: "light",
  },
  {
    id: "repair",
    title: "Repair",
    description:
      "Off-track doors, damaged panels, and urgent fixes handled same-day across Calgary.",
    items: [
      "Off-track doors and damaged panels",
      "Spring replacement",
      "Cable replacement",
      "Roller replacement",
      "Track repair and alignment",
      "Hinge and hardware replacement",
      "Opener troubleshooting and repair",
      "Sensor adjustment and replacement",
      "Panel repair and replacement",
      "Weather seal replacement",
      "Noisy or uneven door troubleshooting",
    ],
    image: "/images/services/overview-repair.jpg",
    imageAlt: `Garage door repair work on a residential property in ${siteConfig.location.city}`,
    imageWidth: 1200,
    imageHeight: 1600,
    panelBackground: "#B2B2B2",
    panelTone: "light",
  },
  {
    id: "new-installations",
    title: "New Installations",
    description:
      "New residential and commercial doors installed with clean, professional finishing.",
    items: [
      "New garage door installation",
      "Replacement door installation",
      "Residential garage doors",
      "Commercial garage doors",
      "Garage door opener installation",
      "Track and hardware installation",
      "Weather seal installation",
      "New-construction installation",
      "Existing-opening replacement",
    ],
    image: "/images/services/overview-installations.jpg",
    imageAlt: `New garage door installation on a ${siteConfig.location.city} home`,
    imageWidth: 1600,
    imageHeight: 1200,
    panelBackground: "#7C7C7C",
    panelTone: "dark",
  },
];
