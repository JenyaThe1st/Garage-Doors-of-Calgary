import Script from "next/script";
import { siteConfig } from "@/data/siteConfig";

export function GoogleAnalytics() {
  const gtmId = siteConfig.seo.googleTagManagerId;

  return (
    <>
      <Script id="gtm-datalayer" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
      <Script
        id="gtm"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
