import Image from "next/image";
import { siteConfig, getPhoneHref, getAvailabilityLabel } from "@/data/siteConfig";
import { Button } from "@/components/ui/Button";
import { Metrics } from "@/components/home/Metrics";

export function Hero() {
  const availabilityLabel = getAvailabilityLabel();
  const availability =
    availabilityLabel.charAt(0).toUpperCase() + availabilityLabel.slice(1);

  return (
    <section className="relative min-h-[90vh] flex flex-col">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.png"
          alt={`Professional garage door service in ${siteConfig.location.city}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-8 pt-28 text-center sm:px-6 lg:px-8 lg:text-left">
        <div className="mx-auto max-w-2xl animate-fade-in-up lg:mx-0">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Garage Door Problems?
            <br />
            <span className="text-neutral-light">We&apos;ll Get It Moving Again.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
            Same-day garage door repair, installation and maintenance across{" "}
            {siteConfig.location.city} and surrounding areas. Residential &amp;
            commercial. {availability}.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center lg:items-start">
            <Button
              href={getPhoneHref()}
              variant="primary"
              className="!px-8 !py-4 !text-lg"
            >
              Call {siteConfig.phoneDisplay}
            </Button>
            <Button
              href={siteConfig.ctas.secondary.href}
              variant="secondary"
              className="!px-8 !py-4 !text-lg"
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
