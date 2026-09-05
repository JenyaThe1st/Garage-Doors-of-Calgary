export const footerServices = [
  "Door Installations and Repairs",
  "Window Installations and Repairs",
  "Garage Doors Installations",
  "Garage Doors Hardware Replacement",
  "Locks and hardware installation",
  "Patio door repairs",
  "Mesh screen replacement and repair",
  "Shower doors repair and installation",
] as const;

export type FooterService = (typeof footerServices)[number];
