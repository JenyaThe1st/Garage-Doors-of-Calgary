/**
 * Footer short-name list. Marketing labels, not the homepage card catalog
 * and not the `/services` overview categories. Keep consistent with what
 * the company actually sells; do not auto-derive from the other lists.
 */
export const footerServices = [
  "Spring Replacement",
  "Cable Replacement",
  "Opener Installation & Repair",
  "Roller Replacement",
  "Track Repair & Alignment",
  "Panel Replacement",
  "Maintenance & Tune-Ups",
  "New Installation",
] as const;

export type FooterService = (typeof footerServices)[number];
