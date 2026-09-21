import Image from "next/image";
import { siteConfig, getPhoneHref } from "@/data/siteConfig";
import { servicesBanner } from "@/data/serviceOverview";
import { Button } from "@/components/ui/Button";

function ServicesBannerBackground() {
  const { mobile, tablet, desktop } = servicesBanner.images;

  return (
    <>
      <Image
        src={mobile.src}
        alt={mobile.alt}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover object-center md:hidden"
      />
      <Image
        src={tablet.src}
        alt={tablet.alt}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="hidden object-cover object-center md:block xl:hidden"
      />
      <Image
        src={desktop.src}
        alt={desktop.alt}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="hidden object-cover object-center xl:block"
      />
    </>
  );
}

export function ServicesBanner() {
  return (
    <section
      className="relative overflow-hidden pt-[var(--site-header-height)]"
      aria-labelledby="services-heading"
    >
      <div className="absolute inset-0 bg-primary">
        <ServicesBannerBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl text-center lg:text-left">
          <h1
            id="services-heading"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            {servicesBanner.heading}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {servicesBanner.body}
          </p>
          <div className="mt-8">
            <Button
              href={getPhoneHref()}
              variant="primary"
              className="!px-8 !py-3.5 !text-base"
            >
              {siteConfig.ctas.primary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
