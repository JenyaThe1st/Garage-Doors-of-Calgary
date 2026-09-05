import { FooterOurServices } from "@/components/layout/footer/FooterOurServices";
import { FooterContactInfo } from "@/components/layout/footer/FooterContactInfo";
import { FooterServiceAreas } from "@/components/layout/footer/FooterServiceAreas";
import { FooterBottom } from "@/components/layout/footer/FooterBottom";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="footer-panels">
          <FooterOurServices />
          <FooterContactInfo />
          <FooterServiceAreas />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
