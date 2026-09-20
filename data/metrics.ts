import {
  getExperienceMetricValue,
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
  { value: "250+", label: "Happy Customers" },
];
