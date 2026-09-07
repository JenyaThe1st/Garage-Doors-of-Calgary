import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { serviceOverviewCategories } from "@/data/serviceOverview";
import { ServicesBanner } from "@/components/services/ServicesBanner";
import { ServiceCategorySection } from "@/components/services/ServiceCategorySection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: siteConfig.seo.pages.services.title,
  description: siteConfig.seo.pages.services.description,
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <ServicesBanner />

      <div className="service-overview-panels">
        {serviceOverviewCategories.map((category, index) => (
          <ServiceCategorySection
            key={category.id}
            category={category}
            imageOnRight={index % 2 === 1}
            fadeTo={serviceOverviewCategories[index + 1]?.panelBackground}
          />
        ))}
      </div>

      <FinalCTA />
    </main>
  );
}
