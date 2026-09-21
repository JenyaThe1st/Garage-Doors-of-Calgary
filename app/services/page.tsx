import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import {
  serviceOverviewCategories,
  servicesOverviewHeading,
  servicesFinalCta,
} from "@/data/serviceOverview";
import { ServicesBanner } from "@/components/services/ServicesBanner";
import { ServiceCategorySection } from "@/components/services/ServiceCategorySection";
import { HowGarageDoorWorks } from "@/components/services/HowGarageDoorWorks";
import { SystemDiagnosis } from "@/components/services/SystemDiagnosis";
import { WhenToCall } from "@/components/services/WhenToCall";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: siteConfig.seo.pages.services.title,
  description: siteConfig.seo.pages.services.description,
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const firstPanel = serviceOverviewCategories[0];

  return (
    <main id="main-content">
      <ServicesBanner />

      <div className="service-overview-panels">
        <div
          className="service-overview-panel pb-2 pt-16 md:pb-4 md:pt-24"
          style={{ backgroundColor: firstPanel.panelBackground }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
              {servicesOverviewHeading}
            </h2>
          </div>
        </div>

        {serviceOverviewCategories.map((category, index) => (
          <ServiceCategorySection
            key={category.id}
            category={category}
            imageOnRight={index % 2 === 1}
            fadeTo={
              serviceOverviewCategories[index + 1]?.panelBackground ?? "#f4f4f4"
            }
            compactTop={index === 0}
          />
        ))}
      </div>

      <HowGarageDoorWorks />
      <SystemDiagnosis />
      <WhenToCall />
      <FinalCTA
        headline={servicesFinalCta.headline}
        headlineEmphasis=""
        body={servicesFinalCta.body}
        support={servicesFinalCta.support}
        ctaLabel={servicesFinalCta.ctaLabel}
      />
    </main>
  );
}
