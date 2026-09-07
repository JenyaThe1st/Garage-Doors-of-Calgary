export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function getNavHash(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? "" : href.slice(hashIndex);
}

/** Real public pages only. Used by sitemap. Do not add `futureRoute` slugs. */
export function getIndexablePaths() {
  return primaryNavigation
    .map((item) => item.href)
    .filter((href) => href.startsWith("/") && !href.includes("#"));
}
