const businessName = "JDM Solution";
const phoneDisplay = "(587) 215-1911";
const phoneTel = "5872151911";
const email = "jdmsolutionscalgary@gmail.com";
const location = {
  city: "Calgary",
  province: "Alberta",
  country: "CA",
} as const;
const availabilityLabel = "Open 7 Days a Week";
const hoursLabel = "8am - 8pm";

export const siteConfig = {
  businessName,
  phoneDisplay,
  phoneTel,
  email,
  location,
  serviceAreas: {
    primary: "Calgary",
    surrounding: [
      "Okotoks",
      "Airdrie",
      "Chestermere",
      "Cochrane",
      "De Winton",
      "Springbank",
      "Bearspaw",
      "Heritage Pointe",
    ] as const,
    radius: "50 km",
  },
  availabilityLabel,
  hoursLabel,
  coverageLabel: "Calgary and the surrounding areas",
  availability: "7 days a week",
  hours: "8AM–8PM",
  experience: "10+ years",
  tagline: "Garage door repair, installation and maintenance",
  serviceLabel: "Garage Door Services",
  seo: {
    title: `Garage Door Repair & Installation ${location.city} | ${businessName}`,
    description: `Same-day garage door repair, installation and maintenance in ${location.city} and surrounding areas. Residential & commercial. Call ${phoneDisplay}. ${availabilityLabel}, ${hoursLabel}.`,
    ogImage: "/images/hero-background.png",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: `Garage door service in ${location.city}`,
    googleAnalyticsId: "G-GN2610B3ZE",
    pages: {
      services: {
        title: `Services | ${businessName}`,
        description: `Garage door maintenance, repair, and new installations in ${location.city}. Call ${phoneDisplay}.`,
      },
      contact: {
        title: `Contact | ${businessName}`,
        description: `Contact ${businessName} with a question or message. Call ${phoneDisplay} or email ${email}.`,
      },
    },
  },
  ctas: {
    primary: {
      label: "Call Now",
    },
    secondary: {
      label: "Request Service",
      href: "/contact",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    ""
  );
}

export function getPhoneHref() {
  return `tel:+1${siteConfig.phoneTel}`;
}

export function getMailtoHref() {
  return `mailto:${siteConfig.email}`;
}

export function getLocationLabel() {
  return `${siteConfig.location.city}, ${siteConfig.location.province}`;
}

export function getAvailabilityLabel() {
  return `${siteConfig.availabilityLabel} · ${siteConfig.hoursLabel}`;
}

export function getExperienceMetricValue() {
  return siteConfig.experience.replace(/\s+years?$/i, "");
}

export function getRadiusMetricValue() {
  return siteConfig.serviceAreas.radius.toUpperCase();
}

export function getMetadataTitle() {
  return siteConfig.seo.title;
}

export function getMetadataDescription() {
  return siteConfig.seo.description;
}

export type ContactInfoItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export function getContactInfoItems(): ContactInfoItem[] {
  return [
    {
      id: "phone",
      label: "Phone",
      value: siteConfig.phoneDisplay,
      href: getPhoneHref(),
    },
    {
      id: "email",
      label: "Email",
      value: siteConfig.email,
      href: getMailtoHref(),
    },
    {
      id: "availability",
      label: "Availability",
      value: siteConfig.availabilityLabel,
    },
    {
      id: "hours",
      label: "Business Hours",
      value: siteConfig.hoursLabel,
    },
    {
      id: "coverage",
      label: "Coverage",
      value: siteConfig.coverageLabel,
    },
  ];
}
