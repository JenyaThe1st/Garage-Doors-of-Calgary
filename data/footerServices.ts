export const footerServices = [
  "Garage Door Spring Replacement",
  "Garage Door Cable Replacement",
  "Garage Door Opener Installation & Repair",
  "Garage Door Roller Replacement",
  "Garage Door Track Repair & Alignment",
  "Garage Door Panel Replacement",
  "Garage Door Maintenance & Tune-Ups",
  "New Garage Door Installation",
] as const;

export type FooterService = (typeof footerServices)[number];
