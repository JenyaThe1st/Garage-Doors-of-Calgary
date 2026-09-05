import { getContactInfoItems, type ContactInfoItem } from "@/data/siteConfig";
import {
  PhoneContactIcon,
  EmailContactIcon,
  CalendarContactIcon,
  ClockContactIcon,
  CoverageContactIcon,
} from "@/components/ui/ContactIcons";
import { FooterPanel } from "@/components/layout/footer/FooterPanel";
import { ContactPanelIcon } from "@/components/layout/footer/FooterIcons";
import { cn } from "@/lib/cn";

const rowIconMap = {
  phone: PhoneContactIcon,
  email: EmailContactIcon,
  availability: CalendarContactIcon,
  hours: ClockContactIcon,
  coverage: CoverageContactIcon,
} as const;

function FooterContactRow({ item }: { item: ContactInfoItem }) {
  const RowIcon = rowIconMap[item.id as keyof typeof rowIconMap];

  return (
    <li className="flex items-start gap-3.5">
      {RowIcon && (
        <RowIcon className="footer-row-icon mt-0.5 h-4 w-4 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-light">
          {item.label}
        </p>
        {item.href ? (
          <a
            href={item.href}
            className={cn(
              "footer-contact-value mt-1 block text-sm font-medium text-white sm:text-base",
              item.id === "email" && "break-all"
            )}
          >
            {item.value}
          </a>
        ) : (
          <p className="footer-contact-value mt-1 text-sm font-medium text-white sm:text-base">
            {item.value}
          </p>
        )}
      </div>
    </li>
  );
}

export function FooterContactInfo() {
  const items = getContactInfoItems();

  return (
    <FooterPanel
      id="contact-information"
      title="Contact Information"
      icon={<ContactPanelIcon />}
      className="footer-panel--wide-tablet"
    >
      <ul className="footer-list gap-5">
        {items.map((item) => (
          <FooterContactRow key={item.id} item={item} />
        ))}
      </ul>
    </FooterPanel>
  );
}
