/**
 * Homepage service cards (`/` #services).
 * Presentation model: image + title + short description.
 * Intentionally separate from `serviceOverviewCategories` and `footerServices`.
 */
export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Optional framing for the 16/10 card. Defaults to object-cover. */
  imageClassName?: string;
  /** Future dedicated page slug — not linked in V1 UI */
  futureRoute?: string;
};

export const services: Service[] = [
  {
    id: "garage-door-repair",
    title: "Repair",
    description:
      "Off-track doors, damaged panels, and urgent fixes handled same-day across Calgary.",
    image: "/images/services/repair.jpg",
    imageAlt: "Garage door repair work on a residential property",
    futureRoute: "/garage-door-repair-calgary",
  },
  {
    id: "spring-replacement",
    title: "Spring Replacement",
    description:
      "Broken torsion or extension springs replaced safely with the right parts for your door.",
    image: "/images/services/spring.jpg",
    imageAlt: "Garage door torsion spring replacement",
    futureRoute: "/spring-replacement-calgary",
  },
  {
    id: "cable-repair",
    title: "Cable Repair",
    description:
      "Frayed or snapped cables repaired to restore smooth, balanced door operation.",
    image: "/images/services/cable.jpg",
    imageAlt: "Garage door cable repair detail",
    futureRoute: "/cable-repair-calgary",
  },
  {
    id: "door-installation",
    title: "Installation & Replacement",
    description:
      "New residential and commercial doors installed with clean, professional finishing.",
    image: "/images/services/installation.jpg",
    imageAlt: "New garage door installation on a Calgary home",
    futureRoute: "/garage-door-installation-calgary",
  },
  {
    id: "openers",
    title: "Openers",
    description:
      "Opener repair, replacement, and installation for reliable everyday access.",
    image: "/images/services/opener.jpg",
    imageAlt: "Garage door opener service",
    futureRoute: "/garage-door-opener-calgary",
  },
  {
    id: "rollers-tracks",
    title: "Rollers & Tracks",
    description:
      "Noisy, worn, or misaligned rollers and tracks adjusted or replaced as needed.",
    image: "/images/services/rollers-tracks.jpeg",
    imageAlt: "Garage door roller and hinge hardware",
    imageClassName: "object-contain object-center group-hover:scale-100",
    futureRoute: "/rollers-tracks-calgary",
  },
  {
    id: "sensors-controls",
    title: "Sensors & Controls",
    description:
      "Safety sensors, remotes, and control systems diagnosed and repaired properly.",
    image: "/images/services/sensors.jpg",
    imageAlt: "Garage door sensor and control repair",
    futureRoute: "/sensors-controls-calgary",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description:
      "Preventive tune-ups to keep your door running quietly and extend its lifespan.",
    image: "/images/services/maintenance.jpg",
    imageAlt: "Garage door maintenance service",
    futureRoute: "/garage-door-maintenance-calgary",
  },
  {
    id: "commercial",
    title: "Commercial Garage Doors",
    description:
      "Heavy-duty commercial doors serviced for businesses across the Calgary area.",
    image: "/images/services/commercial.jpg",
    imageAlt: "Commercial garage door service",
    futureRoute: "/commercial-garage-doors-calgary",
  },
];
