import { getServiceAreaLocations, getServiceAreaRadiusLabel } from "@/data/serviceAreas";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ServiceAreaList } from "@/components/shared/ServiceAreaList";

export function AlsoServing() {
  const locations = getServiceAreaLocations();

  return (
    <Section id="also-serving" className="bg-neutral-light/10">
      <SectionHeader
        title="Also Serving"
        subtitle={getServiceAreaRadiusLabel()}
      />
      <ServiceAreaList
        locations={locations}
        variant="light"
        columns="also-serving"
        showPrimaryBadge
      />
    </Section>
  );
}
