import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  dark?: boolean;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        dark ? "bg-primary text-white" : "bg-white text-primary",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14 max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
          light ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-neutral-light" : "text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
