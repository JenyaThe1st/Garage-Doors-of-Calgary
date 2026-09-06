import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { FooterPanel } from "@/components/layout/footer/FooterPanel";
import {
  ContactPanelIcon,
  MessagePanelIcon,
} from "@/components/layout/footer/FooterIcons";
import { ContactInfoList } from "@/components/shared/ContactInfoList";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.businessName}`,
  description: `Contact ${siteConfig.businessName} with a question or message. Call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`,
};

type ContactPageProps = {
  searchParams: Promise<{
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    gclid?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  return (
    <main id="main-content" className="bg-primary">
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contact {siteConfig.businessName}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-light">
            Have a question? Send us a message.
          </p>
        </header>

        <div className="mt-10 grid items-start gap-6 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)]">
          <FooterPanel
            title="Contact Information"
            icon={<ContactPanelIcon />}
          >
            <ContactInfoList />
          </FooterPanel>

          <FooterPanel title="Send Us a Message" icon={<MessagePanelIcon />}>
            <ContactForm
              tracking={{
                utmSource: params.utm_source,
                utmMedium: params.utm_medium,
                utmCampaign: params.utm_campaign,
                gclid: params.gclid,
              }}
            />
          </FooterPanel>
        </div>
      </section>
    </main>
  );
}
