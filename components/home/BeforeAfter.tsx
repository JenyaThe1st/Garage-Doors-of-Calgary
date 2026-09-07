import { beforeAfterPairs, beforeAfterSection } from "@/data/beforeAfter";
import { Section, SectionHeader } from "@/components/ui/Section";
import { BeforeAfterGallery } from "@/components/home/BeforeAfterSlider";

export function BeforeAfter() {
  return (
    <Section id="before-after" className="bg-neutral-light/20">
      <SectionHeader
        title={beforeAfterSection.title}
        subtitle={beforeAfterSection.subtitle}
        align="center"
      />
      <BeforeAfterGallery pairs={beforeAfterPairs} />
    </Section>
  );
}
