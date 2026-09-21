import { siteConfig } from "./siteConfig";

/**
 * `/services` stacked categories (2–n). Broader groups than homepage cards.
 * Banner assets belong here because they are the services-page chrome, not Core.
 */
export const servicesBanner = {
  heading: "Garage Door Services in Calgary",
  body: "From broken springs and cables to complete garage door installations, we diagnose the problem, explain your options, and get your door working properly.",
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

export const servicesOverviewHeading = "Our Services";

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
      "Garage door problems can start with one small component. We diagnose the cause and repair the system properly — from broken springs and cables to off-track doors and opener problems.",
    items: [
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
      "Off-track doors",
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
      "Professional garage door installation for new construction, replacements, residential properties, and commercial applications.",
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

export type GarageDoorComponentCard = {
  id: string;
  title: string;
  description: string;
  why: string;
  ctaLabel: string;
};

export const howGarageDoorWorks = {
  title: "How Your Garage Door Works",
  intro:
    "Your garage door is made up of several components that work together every time the door opens and closes. When one part wears out or fails, it can affect the entire system. Understanding what each component does can help you recognize problems before they become bigger repairs.",
  cards: [
    {
      id: "springs",
      title: "Garage Door Springs",
      description:
        "Springs counterbalance the weight of your garage door and make it easier to open and close.",
      why: "Springs are under high tension and require the correct tools, spring size, and adjustment for safe installation.",
      ctaLabel: "Spring Repair",
    },
    {
      id: "cables",
      title: "Garage Door Cables",
      description:
        "Cables work with the springs and drums to lift the door evenly.",
      why: "Cables are part of the lifting system and must be properly installed and adjusted to keep the door balanced.",
      ctaLabel: "Cable Repair",
    },
    {
      id: "rollers-tracks",
      title: "Rollers & Tracks",
      description:
        "Rollers move inside the tracks and allow the door to open and close smoothly.",
      why: "Proper repair requires checking the rollers, tracks, alignment, and surrounding components.",
      ctaLabel: "Roller & Track Repair",
    },
    {
      id: "hinges",
      title: "Garage Door Hinges",
      description:
        "Hinges connect the door panels and let the door flex as it travels.",
      why: "Worn hinges can strain rollers, cables, and the opener if they are not replaced and aligned correctly.",
      ctaLabel: "Hinge Repair",
    },
    {
      id: "opener",
      title: "Garage Door Opener",
      description:
        "The opener automatically raises and lowers your garage door.",
      why: "Proper diagnosis helps identify whether the problem is with the opener or another part of the door.",
      ctaLabel: "Opener Repair",
    },
    {
      id: "sensors",
      title: "Safety Sensors",
      description:
        "Sensors stop the door from closing if something is in the path.",
      why: "Sensor issues need correct alignment and testing so the door stays safe and reliable.",
      ctaLabel: "Sensor Repair",
    },
    {
      id: "panels",
      title: "Garage Door Panels",
      description:
        "Panels form the door itself and take daily wear, weather, and impact.",
      why: "Panel repair or replacement should keep the door balanced and aligned with the rest of the system.",
      ctaLabel: "Panel Repair",
    },
    {
      id: "bottom-seal",
      title: "Bottom Seal",
      description:
        "The weather seal along the bottom keeps out drafts, water, and debris.",
      why: "A worn seal can also point to alignment issues that should be checked with the rest of the door.",
      ctaLabel: "Seal Replacement",
    },
  ] as const satisfies readonly GarageDoorComponentCard[],
} as const;

export const systemDiagnosis = {
  title: "One Problem Can Affect the Whole Door",
  body: "Garage door components work together. A broken cable, noisy roller, or struggling opener may be a symptom of a larger problem.",
  support: "We inspect the system, find the cause, and explain what needs to be repaired.",
  ctaLabel: "Book a Repair",
  ctaHref: "/contact",
} as const;

export const whenToCall = {
  title: "When Should You Call a Garage Door Technician?",
  situations: [
    "Garage door won't open or close",
    "Broken or stretched spring",
    "Cable has snapped or come off",
    "Door is crooked or off the tracks",
    "Door is making unusual noises",
    "Opener isn't working properly",
  ] as const,
  note: "If something doesn't sound or feel right, don't keep forcing the door. A small problem can become a much larger repair.",
  ctaLabel: "Call for Garage Door Repair",
} as const;

export const servicesFinalCta = {
  headline: "Garage Door Giving You Trouble?",
  body: "Don't guess what's wrong. We'll inspect your garage door, identify the problem, and explain the repair.",
  support: `Same-day garage door service across ${siteConfig.location.city} and surrounding areas.`,
  ctaLabel: "Call Now",
} as const;
