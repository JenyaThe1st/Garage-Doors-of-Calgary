import { footerServices } from "@/data/footerServices";
import { FooterPanel } from "@/components/layout/footer/FooterPanel";
import {
  ServicesIcon,
  ChevronRightIcon,
} from "@/components/layout/footer/FooterIcons";

export function FooterOurServices() {
  return (
    <FooterPanel title="Our Services" icon={<ServicesIcon />}>
      <ul className="footer-list">
        {footerServices.map((service) => (
          <li key={service}>
            <ChevronRightIcon className="footer-row-icon" />
            <span>{service}</span>
          </li>
        ))}
      </ul>
    </FooterPanel>
  );
}
