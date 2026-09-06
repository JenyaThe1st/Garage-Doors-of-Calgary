"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, getPhoneHref } from "@/data/siteConfig";
import { primaryNavigation, getNavHash, type NavItem } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BrandMark({
  onNavigateHome,
}: {
  onNavigateHome: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href="/"
      aria-label={siteConfig.businessName}
      className="inline-flex shrink-0 items-center"
      onClick={onNavigateHome}
    >
      <img
        src="/images/jdm-header-logo.png"
        alt={siteConfig.businessName}
        width={2172}
        height={724}
        className="h-12 w-auto object-contain object-left sm:h-14 lg:h-16"
      />
    </Link>
  );
}

const navLinkBase =
  "text-white transition-[color,opacity] duration-150 ease-out hover:text-cta focus-visible:text-cta";

function DesktopNavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <a
      href={item.href}
      className={cn(
        navLinkBase,
        "inline-flex items-center px-3.5 py-2 text-[0.9375rem] font-medium uppercase tracking-[0.12em]"
      )}
      onClick={(event) => onNavigate(event, item.href)}
    >
      {item.label}
    </a>
  );
}

function NavSeparator({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("select-none text-white/50", className)}
    >
      |
    </span>
  );
}

function MobileNavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <a
      href={item.href}
      className={cn(
        navLinkBase,
        "flex min-h-14 min-w-0 items-center justify-center whitespace-nowrap px-2.5 text-center font-display text-[0.91rem] font-semibold uppercase tracking-[0.08em] min-[360px]:text-[0.975rem] min-[360px]:tracking-[0.1em] min-[390px]:text-[1.1375rem]"
      )}
      onClick={(event) => onNavigate(event, item.href)}
    >
      {item.label}
    </a>
  );
}

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.offsetHeight}px`
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const currentHash = window.location.hash;
    if (!currentHash) return;
    const target = document.getElementById(currentHash.slice(1));
    if (!target) return;
    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const onNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "/" && pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const nextHash = getNavHash(href);
    if (!nextHash || pathname !== "/") return;

    const target = document.getElementById(nextHash.slice(1));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", nextHash);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || pathname !== "/"
          ? "bg-primary shadow-lg"
          : "bg-primary shadow-lg lg:bg-transparent lg:bg-gradient-to-b lg:from-primary/70 lg:to-transparent lg:shadow-none"
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center px-4 py-3 sm:px-6 lg:justify-between lg:px-8 lg:py-3">
          <BrandMark
            onNavigateHome={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />

          <nav
            className="hidden items-center lg:flex"
            aria-label="Main navigation"
          >
            {primaryNavigation.map((item, index) => (
              <div key={item.href} className="flex items-center">
                {index > 0 && <NavSeparator className="mx-2" />}
                <DesktopNavLink item={item} onNavigate={onNavigate} />
              </div>
            ))}
            <Button
              href={getPhoneHref()}
              variant="primary"
              className="ml-6 !px-[1.625rem] !py-[0.8125rem] !text-sm"
            >
              <PhoneIcon className="h-4 w-4" />
              {siteConfig.ctas.primary.label}
            </Button>
          </nav>
        </div>

        <div
          className="h-px bg-white/50 lg:hidden"
          role="presentation"
        />

        <nav
          className="flex w-full min-w-0 items-center justify-center px-3 lg:hidden"
          aria-label="Primary navigation"
        >
          {primaryNavigation.map((item, index) => (
            <div key={item.href} className="flex min-w-0 items-center">
              {index > 0 && <NavSeparator className="mx-2.5 shrink-0 sm:mx-3" />}
              <MobileNavLink item={item} onNavigate={onNavigate} />
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
