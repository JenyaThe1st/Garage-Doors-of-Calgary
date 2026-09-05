import Image from "next/image";
import { whyChooseUsItems } from "@/data/whyChooseUs";
import { siteConfig } from "@/data/siteConfig";
import { Section, SectionHeader } from "@/components/ui/Section";

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us" dark>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            title="Why Choose Us"
            subtitle="Every customer has a different situation. We understand the problem first, then recommend the right solution."
            light
          />
          <ul className="space-y-6">
            {whyChooseUsItems.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-light">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-lg lg:aspect-[3/4]">
          <Image
            src="/images/why-choose-us.jpg"
            alt={`Quality garage door installation in ${siteConfig.location.city}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
        </div>
      </div>
    </Section>
  );
}
