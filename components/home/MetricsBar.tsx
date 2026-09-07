import { cn } from "@/lib/cn";

export type MetricItem = {
  value: string;
  label: string;
  href?: string;
};

type MetricsBarProps = {
  items: MetricItem[];
  className?: string;
  columns?: 1 | 2 | 4;
};

export function MetricsBar({
  items,
  className,
  columns = 4,
}: MetricsBarProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    4: "grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div
      className={cn(
        "border border-neutral-light/40 bg-primary/95 backdrop-blur-sm",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-7xl gap-px bg-white/10",
          gridCols
        )}
      >
        {items.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              "group min-w-0 bg-primary px-2 py-8 text-center transition-colors duration-300 hover:bg-primary/80 sm:px-6 sm:py-10",
              columns === 4 &&
                index < items.length - 1 &&
                "lg:border-r lg:border-white/10"
            )}
          >
            {metric.href ? (
              <a
                href={metric.href}
                className="block font-display text-2xl font-bold tracking-tight text-cta transition-transform duration-300 group-hover:scale-105 sm:text-4xl"
              >
                {metric.value}
              </a>
            ) : (
              <p className="font-display text-2xl font-bold tracking-tight text-cta transition-transform duration-300 group-hover:scale-105 sm:text-4xl">
                {metric.value}
              </p>
            )}
            <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-wider text-neutral-light sm:text-base">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
