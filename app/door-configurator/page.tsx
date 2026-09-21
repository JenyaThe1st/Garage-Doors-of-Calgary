import type { Metadata } from "next";
import { ConfiguratorApp } from "@/components/configurator/ConfiguratorApp";

export const metadata: Metadata = {
  title: "Garage Door Configurator",
  description: "Private garage door configurator.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: undefined,
  },
};

export default function DoorConfiguratorPage() {
  return <ConfiguratorApp />;
}
