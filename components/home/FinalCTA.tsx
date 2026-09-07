import { siteConfig, getPhoneHref } from "@/data/siteConfig";
import { homeFinalCta } from "@/data/home";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="bg-[#34393C] py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {homeFinalCta.headline}
          <br />
          {homeFinalCta.headlineEmphasis}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-light">
          {homeFinalCta.body}
        </p>
        <div className="mt-10">
          <Button
            href={getPhoneHref()}
            variant="primary"
            className="!px-10 !py-4 !text-lg"
          >
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  );
}
