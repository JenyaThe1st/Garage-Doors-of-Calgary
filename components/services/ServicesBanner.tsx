import { getImageProps } from "next/image";

function ServicesBannerBackground() {
  const alt = "";

  const {
    props: { srcSet: mobileSrcSet, ...mobile },
  } = getImageProps({
    alt,
    src: "/images/services/overview-banner-mobile.png",
    width: 1024,
    height: 1536,
    sizes: "100vw",
    quality: 85,
    priority: true,
  });

  const {
    props: { srcSet: tabletSrcSet, ...tablet },
  } = getImageProps({
    alt,
    src: "/images/services/overview-banner-tablet.png",
    width: 1774,
    height: 887,
    sizes: "100vw",
    quality: 85,
    priority: true,
  });

  const {
    props: { srcSet: desktopSrcSet, ...desktop },
  } = getImageProps({
    alt,
    src: "/images/services/overview-banner-desktop.png",
    width: 2172,
    height: 724,
    sizes: "100vw",
    quality: 85,
    priority: true,
  });

  return (
    <>
      <picture className="absolute inset-0 md:hidden">
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        <img
          {...mobile}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </picture>

      <picture className="absolute inset-0 hidden md:block xl:hidden">
        <source
          media="(min-width: 768px) and (max-width: 1279px)"
          srcSet={tabletSrcSet}
        />
        <img
          {...tablet}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </picture>

      <picture className="hidden xl:block">
        <source media="(min-width: 1280px)" srcSet={desktopSrcSet} />
        <img {...desktop} alt={alt} className="block h-auto w-full" />
      </picture>
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
            Our Services
          </h1>
        </div>
      </div>
    </section>
  );
}
