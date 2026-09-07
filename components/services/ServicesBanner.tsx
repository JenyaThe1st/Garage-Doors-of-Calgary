import Image from "next/image";
import { servicesBanner } from "@/data/serviceOverview";

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
        width={desktop.width}
        height={desktop.height}
        priority
        sizes="100vw"
        quality={85}
        className="hidden h-auto w-full xl:block"
      />
    </>
  );
}

export function ServicesBanner() {
  return (
    <section
      className="pt-[var(--site-header-height)]"
      aria-labelledby="services-heading"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[480px] md:max-w-[720px] xl:max-w-none xl:aspect-auto">
        <ServicesBannerBackground />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary/20 px-4">
          <h1
            id="services-heading"
            className="font-display text-[48px] font-bold leading-[48px] tracking-tight text-white drop-shadow-md md:text-[72px] md:leading-[72px] xl:text-6xl xl:leading-none"
          >
            {servicesBanner.heading}
          </h1>
        </div>
      </div>
    </section>
  );
}
