import Image from "next/image";
import { services } from "@/data/services";
import { siteConfig, getPhoneHref } from "@/data/siteConfig";
import { Section, SectionHeader } from "@/components/ui/Section";
import { MetricsBar } from "@/components/home/MetricsBar";

const servicesCtaMetric = [
  {
    value: siteConfig.phoneDisplay,
    label: "Need Help Today? Same-Day Service",
    href: getPhoneHref(),
  },
];

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeader
        title="Our Services"
        subtitle={`Full garage door service for ${siteConfig.location.city} homes and businesses — repair, installation, openers, and maintenance.`}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="group overflow-hidden rounded-lg border border-neutral-light/60 bg-white transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold text-primary">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <MetricsBar
        items={servicesCtaMetric}
        columns={1}
        className="mt-10 overflow-hidden rounded-lg"
      />
    </Section>
  );
}
