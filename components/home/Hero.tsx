import Image from "next/image";
import { siteConfig, getPhoneHref } from "@/data/siteConfig";
import { homeHero } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Metrics } from "@/components/home/Metrics";

const heroCtaClassName =
  "box-border h-14 w-full min-w-0 px-6 py-0 text-lg sm:w-72";

function HeroBackground() {
  return (
    <>
      <Image
        src={homeHero.images.mobile}
        alt={homeHero.images.alt}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-contain object-center md:hidden"
      />
      <Image
        src={homeHero.images.desktop}
        alt={homeHero.images.alt}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="hidden object-contain object-center md:block"
      />
    </>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col">
      <div className="absolute inset-0 bg-primary">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-8 pt-[calc(var(--site-header-height)+1.5rem)] text-center sm:px-6 lg:px-8 lg:text-left">
        <div className="mx-auto max-w-2xl animate-fade-in-up lg:mx-0">
          <h1 className="max-w-full font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {homeHero.headline}{" "}
            <span className="mt-1 block text-neutral-light">
              {homeHero.headlineEmphasis}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {homeHero.body}
          </p>
          <p className="mt-2 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {homeHero.hours}
          </p>
          <div className="mt-8 flex w-full max-w-xl flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center lg:items-start">
            <Button
              href={getPhoneHref()}
              variant="primary"
              className={`${heroCtaClassName} order-2 sm:order-1`}
            >
              Call {siteConfig.phoneDisplay}
            </Button>
            <Button
              href={siteConfig.ctas.secondary.href}
              variant="secondary"
              className={`${heroCtaClassName} order-1 sm:order-2`}
            >
              {siteConfig.ctas.secondary.label}
            </Button>
          </div>
        </div>
      </div>

      <Metrics />
    </section>
  );
}
