import type { Metadata } from "next";
import { DM_Sans, Barlow_Condensed } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCall } from "@/components/layout/MobileStickyCall";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import {
  getMetadataTitle,
  getMetadataDescription,
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: getMetadataTitle(),
  description: getMetadataDescription(),
  openGraph: {
    title: getMetadataTitle(),
    description: getMetadataDescription(),
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/images/hero-background.png",
        width: 1200,
        height: 630,
        alt: `Garage door service in ${siteConfig.location.city}`,
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
        <LocalBusinessSchema />
        <Header />
        {children}
        <Footer />
        <MobileStickyCall />
      </body>
    </html>
  );
}
