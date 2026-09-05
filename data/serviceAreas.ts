import { siteConfig } from "./siteConfig";

export type ServiceAreaLocation = {
  name: string;
  isPrimary: boolean;
};

export function getServiceAreaLocations(): ServiceAreaLocation[] {
  const { primary, surrounding } = siteConfig.serviceAreas;
  return [
    { name: primary, isPrimary: true },
    ...surrounding.map((name) => ({ name, isPrimary: false })),
  ];
}

export function getSurroundingServiceAreas(): ServiceAreaLocation[] {
  return getServiceAreaLocations().filter((area) => !area.isPrimary);
}

export function getServiceAreaRadiusLabel() {
  const { primary, radius } = siteConfig.serviceAreas;
  return `Approximately ${radius} around ${primary}`;
}
