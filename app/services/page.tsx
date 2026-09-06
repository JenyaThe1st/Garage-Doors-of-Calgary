import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { serviceOverviewCategories } from "@/data/serviceOverview";
import { ServicesBanner } from "@/components/services/ServicesBanner";
import { ServiceCategorySection } from "@/components/services/ServiceCategorySection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: `Services | ${siteConfig.businessName}`,
  description: `Garage door maintenance, repair, and new installations in ${siteConfig.location.city}. Call ${siteConfig.phoneDisplay}.`,
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <ServicesBanner />

      {serviceOverviewCategories.map((category, index) => (
        <ServiceCategorySection
          key={category.id}
          category={category}
          imageOnRight={index % 2 === 1}
          showTopDivider={index > 0}
        />
      ))}

      <FinalCTA />
    </main>
  );
}
