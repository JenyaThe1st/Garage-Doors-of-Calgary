import { siteConfig } from "./siteConfig";

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
      "Preventive tune-ups",
      "Quiet, reliable operation",
      "Longer door lifespan",
    ],
    image: "/images/services/overview-maintenance.jpg",
    imageAlt: `Garage door maintenance service in ${siteConfig.location.city}`,
    imageWidth: 1200,
    imageHeight: 800,
    panelBackground: "#E1E1E1",
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
      "Cable repair",
      "Rollers and tracks",
      "Sensors and controls",
      "Opener repair",
    ],
    image: "/images/services/overview-repair.jpg",
    imageAlt: `Garage door repair work on a residential property in ${siteConfig.location.city}`,
    imageWidth: 1200,
    imageHeight: 1600,
    panelBackground: "#CCCCCC",
    panelTone: "light",
  },
  {
    id: "new-installations",
    title: "New Installations",
    description:
      "New residential and commercial doors installed with clean, professional finishing.",
    items: [
      "Residential garage doors",
      "Commercial garage doors",
      "Door replacement",
      "Opener installation",
    ],
    image: "/images/services/overview-installations.jpg",
    imageAlt: `New garage door installation on a ${siteConfig.location.city} home`,
    imageWidth: 1600,
    imageHeight: 1200,
    panelBackground: "#BEBEBE",
    panelTone: "light",
  },
];
