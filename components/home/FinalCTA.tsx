import { siteConfig, getPhoneHref } from "@/data/siteConfig";
import { homeFinalCta } from "@/data/home";
import { Button } from "@/components/ui/Button";

type FinalCTAProps = {
  headline?: string;
  headlineEmphasis?: string;
  body?: string;
  support?: string;
  ctaLabel?: string;
};

export function FinalCTA({
  headline = homeFinalCta.headline,
  headlineEmphasis = homeFinalCta.headlineEmphasis,
  body = homeFinalCta.body,
  support,
  ctaLabel,
}: FinalCTAProps) {
  return (
    <section
      id="final-cta"
      className="bg-[#34393C] py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {headline}
          {headlineEmphasis ? (
            <>
              <br />
              {headlineEmphasis}
            </>
          ) : null}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-light">
          {body}
        </p>
        {support ? (
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-neutral-light">
            {support}
          </p>
        ) : null}
        <div className="mt-10">
          <Button
            href={getPhoneHref()}
            variant="primary"
            className="!px-10 !py-4 !text-lg"
          >
            {ctaLabel ?? `Call ${siteConfig.phoneDisplay}`}
          </Button>
        </div>
      </div>
    </section>
  );
}
