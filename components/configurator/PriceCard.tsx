import { formatPrice, type PriceBreakdown } from "@/lib/doorConfigurator";
import { cn } from "@/lib/cn";

type PriceCardProps = {
  heading?: string;
  headingId?: string;
  breakdown: PriceBreakdown;
  details: { label: string; value: string }[];
  className?: string;
};

export function PriceCard({
  heading = "Your Door",
  headingId = "your-door-price-heading",
  breakdown,
  details,
  className,
}: PriceCardProps) {
  const base = breakdown.lines.find((line) => line.id === "base");

  return (
    <section
      className={cn(
        "rounded-xl border border-black/8 bg-white p-5 shadow-sm sm:p-6",
        className
      )}
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="font-display text-2xl font-bold tracking-tight text-primary"
      >
        {heading}
      </h2>

      {base ? (
        <p className="mt-4 text-base text-primary">
          <span className="text-secondary">Base Door: </span>
          <span className="font-semibold">{formatPrice(base.amount)}</span>
        </p>
      ) : null}

      <dl className="mt-4 space-y-1.5 text-sm sm:text-base">
        {details.map((item) => (
          <div key={item.label} className="flex justify-between gap-4">
            <dt className="text-secondary">{item.label}</dt>
            <dd className="font-medium text-primary">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-end justify-between gap-4 border-t border-black/8 pt-4">
        <p className="font-display text-lg font-bold uppercase tracking-wide text-primary">
          Total
        </p>
        <p className="font-display text-3xl font-bold text-primary">
          {formatPrice(breakdown.total)}
        </p>
      </div>
    </section>
  );
}
