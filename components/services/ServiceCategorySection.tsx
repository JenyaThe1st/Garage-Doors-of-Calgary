import type { ServiceOverviewCategory } from "@/data/serviceOverview";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { ServiceCategoryImage } from "@/components/services/ServiceCategoryImage";
import { cn } from "@/lib/cn";

type ServiceCategorySectionProps = {
  category: ServiceOverviewCategory;
  imageOnRight?: boolean;
  showTopDivider?: boolean;
};

export function ServiceCategorySection({
  category,
  imageOnRight = false,
  showTopDivider = false,
}: ServiceCategorySectionProps) {
  const headingId = `${category.id}-heading`;
  const isDark = category.panelTone === "dark";

  return (
    <section
      id={category.id}
      aria-labelledby={headingId}
      className={cn(
        "py-16 md:py-24",
        showTopDivider && "border-t border-black/20"
      )}
      style={{ backgroundColor: category.panelBackground }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid items-center gap-6 [grid-template-areas:'heading'_'image'_'body'] xl:grid-cols-2 xl:gap-x-16 xl:gap-y-0",
            imageOnRight
              ? "xl:[grid-template-areas:'heading_image'_'body_image']"
              : "xl:[grid-template-areas:'image_heading'_'image_body']"
          )}
        >
          <h2
            id={headingId}
            className={cn(
              "[grid-area:heading] font-display text-3xl font-bold tracking-tight sm:text-4xl",
              isDark ? "text-white" : "text-primary"
            )}
          >
            {category.title}
          </h2>

          <div className="[grid-area:image] min-w-0">
            <ServiceCategoryImage
              src={category.image}
              alt={category.imageAlt}
              width={category.imageWidth}
              height={category.imageHeight}
            />
          </div>

          <div className="[grid-area:body] min-w-0">
            <p
              className={cn(
                "max-w-xl text-lg leading-relaxed xl:mt-4",
                isDark ? "text-white/85" : "text-secondary"
              )}
            >
              {category.description}
            </p>
            <ul className="mt-8 space-y-1">
              {category.items.map((item) => (
                <li key={item}>
                  <div
                    className={cn(
                      "group flex items-start gap-3 rounded-md px-2 py-2 -mx-2 transition-colors duration-200",
                      isDark ? "hover:bg-white/10" : "hover:bg-primary/5"
                    )}
                  >
                    <CheckIcon
                      className={cn(
                        "mt-0.5 shrink-0 transition-colors duration-200",
                        isDark
                          ? "text-cta group-hover:text-white"
                          : "text-accent group-hover:text-cta"
                      )}
                    />
                    <span
                      className={cn(
                        "text-base leading-relaxed transition-colors duration-200",
                        isDark
                          ? "text-white group-hover:text-cta"
                          : "text-primary group-hover:text-accent"
                      )}
                    >
                      {item}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
