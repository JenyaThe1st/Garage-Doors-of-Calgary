"use client";

import { useEffect, useState } from "react";
import { siteConfig, getPhoneHref } from "@/data/siteConfig";
import { navigation } from "@/data/navigation";
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

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-primary shadow-lg"
          : "bg-gradient-to-b from-primary/70 to-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="font-display text-xl font-bold tracking-wide text-white sm:text-2xl"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            closeMenu();
          }}
        >
          {siteConfig.businessName}
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-cta"
            >
              {item.label}
            </a>
          ))}
          <Button
            href={getPhoneHref()}
            variant="primary"
            className="!px-5 !py-2.5 !text-sm"
          >
            <PhoneIcon className="h-4 w-4" />
            {siteConfig.ctas.primary.label}
          </Button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={getPhoneHref()}
            className="inline-flex items-center gap-1.5 rounded-md bg-cta px-3 py-2 text-sm font-semibold text-primary"
            aria-label={`Call ${siteConfig.phoneDisplay}`}
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">{siteConfig.ctas.primary.label}</span>
          </a>
          <button
            type="button"
            className="rounded-md p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-white/10 bg-primary lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="border-b border-white/10 py-4 text-base font-medium text-white transition-colors hover:text-cta"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              href={getPhoneHref()}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-cta px-6 py-3.5 text-base font-semibold text-primary"
              onClick={closeMenu}
            >
              <PhoneIcon className="h-5 w-5" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
