import { getPhoneHref } from "@/data/siteConfig";
import { whenToCall } from "@/data/serviceOverview";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { Button } from "@/components/ui/Button";

export function WhenToCall() {
  return (
    <Section id="when-to-call">
      <SectionHeader title={whenToCall.title} align="center" />
      <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
        {whenToCall.situations.map((situation) => (
          <li
            key={situation}
            className="flex items-start gap-3 rounded-lg border border-neutral-light/60 bg-white px-4 py-3"
          >
            <CheckIcon className="mt-0.5 shrink-0 text-accent" />
            <span className="text-base leading-relaxed text-primary">
              {situation}
            </span>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-secondary sm:text-lg">
        {whenToCall.note}
      </p>
      <div className="mt-8 text-center">
        <Button href={getPhoneHref()} variant="primary">
          {whenToCall.ctaLabel}
        </Button>
      </div>
    </Section>
  );
}
