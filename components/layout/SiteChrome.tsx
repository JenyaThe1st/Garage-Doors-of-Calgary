"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCall } from "@/components/layout/MobileStickyCall";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { CONFIGURATOR_PATH } from "@/data/doorConfigurator";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPrivateTool = pathname.startsWith(CONFIGURATOR_PATH);

  if (isPrivateTool) {
    return <>{children}</>;
  }

  return (
    <div className="pb-16 md:pb-0">
      <GoogleAnalytics />
      <LocalBusinessSchema />
      <Header />
      {children}
      <Footer />
      <MobileStickyCall />
    </div>
  );
}
