import Link from "next/link";
import { siteConfig, getLocationLabel } from "@/data/siteConfig";

export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-bottom mt-10 pt-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-wide text-white"
        >
          {siteConfig.businessName}
        </Link>
        <p className="text-sm text-neutral-light">
          &copy; {currentYear} {siteConfig.businessName} &middot;{" "}
          {siteConfig.serviceLabel} &middot; {getLocationLabel()}
        </p>
      </div>
    </div>
  );
}
