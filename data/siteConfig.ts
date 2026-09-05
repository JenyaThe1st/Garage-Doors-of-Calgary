export const siteConfig = {
  businessName: "JDM Solution",
  phoneDisplay: "(587) 215-1911",
  phoneTel: "5872151911",
  email: "jdmsolutionscalgary@gmail.com",
  location: {
    city: "Calgary",
    province: "Alberta",
    country: "CA",
  },
  serviceAreas: {
    primary: "Calgary",
    surrounding: ["Airdrie", "Chestermere", "Cochrane", "Okotoks"] as const,
    radius: "50 km",
  },
  availabilityLabel: "Open 7 Days a Week",
  hoursLabel: "8am - 8pm",
  coverageLabel: "Calgary and the surrounding areas",
  availability: "7 days a week",
  hours: "8AM–8PM",
  experience: "6+ years",
  tagline: "Garage door repair, installation and maintenance",
  serviceLabel: "Garage Door Services",
  ctas: {
    primary: {
      label: "Call Now",
      href: "tel:+15872151911",
    },
    secondary: {
      label: "Request Service",
      href: "#final-cta",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

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

export function getMetadataTitle() {
  return `Garage Door Repair & Installation ${siteConfig.location.city} | ${siteConfig.businessName}`;
}

export function getMetadataDescription() {
  return `Same-day garage door repair, installation and maintenance in ${siteConfig.location.city} and surrounding areas. Residential & commercial. Call ${siteConfig.phoneDisplay}. ${siteConfig.availabilityLabel}, ${siteConfig.hoursLabel}.`;
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
