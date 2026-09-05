import { cn } from "@/lib/cn";
import { LocationIcon } from "@/components/ui/LocationIcon";
import type { ServiceAreaLocation } from "@/data/serviceAreas";

type ServiceAreaListProps = {
  locations: ServiceAreaLocation[];
  variant?: "light" | "dark";
  columns?: "also-serving" | "footer";
  showPrimaryBadge?: boolean;
};

export function ServiceAreaList({
  locations,
  variant = "light",
  columns = "also-serving",
  showPrimaryBadge = false,
}: ServiceAreaListProps) {
  const isLight = variant === "light";

  const gridClass =
    columns === "also-serving"
      ? "grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-5"
      : "space-y-3";

  return (
    <ul className={gridClass}>
      {locations.map((location) => (
        <li
          key={location.name}
          className={cn(
            "flex items-start gap-2.5 text-sm leading-snug",
            isLight ? "text-secondary" : "text-white/90"
          )}
        >
          <LocationIcon
            className={cn(
              "mt-0.5",
              isLight ? "text-accent" : "text-accent/90"
            )}
          />
          <span
            className={cn(
              location.isPrimary && isLight && "font-semibold text-primary",
              location.isPrimary && !isLight && "font-semibold text-white"
            )}
          >
            {location.name}
            {showPrimaryBadge && location.isPrimary && (
              <span
                className={cn(
                  "ml-1.5 text-xs font-normal uppercase tracking-wide",
                  isLight ? "text-secondary" : "text-neutral-light"
                )}
              >
                (Primary)
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
