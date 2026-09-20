import type { Metadata, Viewport } from "next";
import { DM_Sans, Barlow_Condensed } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCall } from "@/components/layout/MobileStickyCall";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import {
  getMetadataTitle,
  getMetadataDescription,
  getSiteUrl,
  siteConfig,
} from "@/data/siteConfig";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: getMetadataTitle(),
  description: getMetadataDescription(),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: getMetadataTitle(),
    description: getMetadataDescription(),
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: siteConfig.seo.ogImageWidth,
        height: siteConfig.seo.ogImageHeight,
        alt: siteConfig.seo.ogImageAlt,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${barlowCondensed.variable} antialiased pb-16 md:pb-0`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GoogleAnalytics />
        <LocalBusinessSchema />
        <Header />
        {children}
        <Footer />
        <MobileStickyCall />
      </body>
    </html>
  );
}
