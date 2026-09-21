import { howGarageDoorWorks } from "@/data/serviceOverview";
import { Section, SectionHeader } from "@/components/ui/Section";

export function HowGarageDoorWorks() {
  return (
    <Section id="how-it-works" className="bg-neutral-light/20">
      <SectionHeader
        title={howGarageDoorWorks.title}
        subtitle={howGarageDoorWorks.intro}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {howGarageDoorWorks.cards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col rounded-lg border border-neutral-light/60 bg-white p-5 shadow-sm"
          >
            <h3 className="font-display text-lg font-bold text-primary">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {card.description}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              <span className="font-semibold text-primary">
                Why professional repair?
              </span>{" "}
              {card.why}
            </p>
            <a
              href="#repair"
              className="mt-4 inline-flex text-sm font-semibold text-accent transition-colors hover:text-cta"
            >
              {card.ctaLabel}
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}
