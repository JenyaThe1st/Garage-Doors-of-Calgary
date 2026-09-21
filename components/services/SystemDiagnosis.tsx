import { systemDiagnosis } from "@/data/serviceOverview";
import { Button } from "@/components/ui/Button";

export function SystemDiagnosis() {
  return (
    <section
      id="system-diagnosis"
      className="bg-primary py-16 md:py-20"
      aria-labelledby="system-diagnosis-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="system-diagnosis-heading"
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {systemDiagnosis.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-light sm:text-lg">
          {systemDiagnosis.body}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-neutral-light sm:text-lg">
          {systemDiagnosis.support}
        </p>
        <div className="mt-8">
          <Button href={systemDiagnosis.ctaHref} variant="primary">
            {systemDiagnosis.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
