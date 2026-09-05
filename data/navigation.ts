export type NavItem = {
  label: string;
  href: string;
  /** Future route slug — not used in V1 UI navigation */
  futureRoute?: string;
};

export const navigation: NavItem[] = [
  { label: "Services", href: "#services", futureRoute: "/services" },
  { label: "About", href: "#why-choose-us", futureRoute: "/about" },
  { label: "Contact", href: "#contact-information", futureRoute: "/contact" },
];
