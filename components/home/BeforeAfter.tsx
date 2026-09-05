import { beforeAfterPairs } from "@/data/beforeAfter";
import { Section, SectionHeader } from "@/components/ui/Section";
import { BeforeAfterGallery } from "@/components/home/BeforeAfterSlider";

export function BeforeAfter() {
  return (
    <Section id="before-after" className="bg-neutral-light/20">
      <SectionHeader
        title="Real Jobs. Real Results."
        subtitle="See the difference professional garage door service makes."
        align="center"
      />
      <BeforeAfterGallery pairs={beforeAfterPairs} />
    </Section>
  );
}
