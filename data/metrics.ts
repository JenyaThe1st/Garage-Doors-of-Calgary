import {
  getExperienceMetricValue,
  getRadiusMetricValue,
  siteConfig,
} from "./siteConfig";

export type Metric = {
  value: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: getExperienceMetricValue(), label: "Years Experience" },
  { value: siteConfig.hoursLabel, label: "7 Days a Week" },
  { value: "Same-Day", label: "Service" },
  { value: getRadiusMetricValue(), label: "Service Area" },
];
