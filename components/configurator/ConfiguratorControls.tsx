import type { ReactNode } from "react";
import {
  doorColors,
  insulationOptions,
  INSULATION_PRICES,
  PANEL_PRICES,
  WINDOW_STYLE_PRICES,
} from "@/data/doorConfigurator";
import { formatPrice } from "@/lib/doorConfigurator";
import { cn } from "@/lib/cn";

function priceHint(amount: number) {
  return amount === 0 ? "Included" : `+${formatPrice(amount)}`;
}

export function ConfigSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ChoiceButton({
  selected,
  onSelect,
  children,
  className,
  ariaLabel,
}: {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onSelect}
      className={cn(
        "min-h-14 rounded-lg border-2 px-4 py-3 text-left transition-all duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
        selected
          ? "border-cta bg-cta/15 shadow-sm"
          : "border-black/10 bg-white hover:border-black/25",
        className
      )}
    >
      {children}
    </button>
  );
}

export function SizeGrid({
  options,
  selectedId,
  onSelect,
}: {
  options: readonly { id: string; label: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
      {options.map((option) => (
        <ChoiceButton
          key={option.id}
          selected={option.id === selectedId}
          onSelect={() => onSelect(option.id)}
        >
          <span className="block font-display text-lg font-bold text-primary sm:text-xl">
            {option.label}
          </span>
        </ChoiceButton>
      ))}
    </div>
  );
}

export function PanelStyleCards({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: "long" | "short") => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ChoiceButton selected={selectedId === "long"} onSelect={() => onSelect("long")}>
        <PanelSketch variant="long" />
        <span className="mt-2 block font-display text-lg font-bold text-primary">Long Panel</span>
        <span className="block text-sm text-secondary">Wide horizontal sections</span>
        <span className="mt-1 block text-xs text-secondary">
          {priceHint(PANEL_PRICES.long)}
        </span>
      </ChoiceButton>
      <ChoiceButton selected={selectedId === "short"} onSelect={() => onSelect("short")}>
        <PanelSketch variant="short" />
        <span className="mt-2 block font-display text-lg font-bold text-primary">Short Panel</span>
        <span className="block text-sm text-secondary">Classic raised squares</span>
        <span className="mt-1 block text-xs text-secondary">
          {priceHint(PANEL_PRICES.short)}
        </span>
      </ChoiceButton>
    </div>
  );
}

function PanelSketch({ variant }: { variant: "long" | "short" }) {
  const rows = 4;
  const cols = variant === "long" ? 2 : 4;
  return (
    <div
      aria-hidden
      className="grid aspect-[16/9] w-full gap-1 rounded-md bg-[#6B4423] p-1.5"
      style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: rows }, (_, row) => (
        <div
          key={row}
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: cols }, (_, col) => (
            <div
              key={col}
              className="rounded-[2px] bg-[#7d552e] ring-1 ring-black/20"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ColorGrid({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: (typeof doorColors)[number]["id"]) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {doorColors.map((color) => {
        const selected = color.id === selectedId;
        return (
          <button
            key={color.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(color.id)}
            className={cn(
              "flex min-h-16 flex-col items-center gap-2 rounded-lg border-2 p-2 transition-all duration-150",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
              selected ? "border-cta bg-cta/15" : "border-black/10 bg-white hover:border-black/25"
            )}
          >
            <span
              className="h-10 w-full rounded-md border border-black/15 shadow-inner"
              style={{ backgroundColor: color.hex }}
              aria-hidden
            />
            <span className="text-center text-xs font-medium text-primary sm:text-sm">
              {color.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function InsulationCards({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: (typeof insulationOptions)[number]["id"]) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {insulationOptions.map((option) => {
        const extra = INSULATION_PRICES[option.id];
        return (
          <ChoiceButton
            key={option.id}
            selected={option.id === selectedId}
            onSelect={() => onSelect(option.id)}
            className="px-2 text-center sm:px-4"
          >
            <span className="block font-display text-xl font-bold text-primary sm:text-2xl">
              {option.label}
            </span>
            <span className="mt-1 block text-xs text-secondary sm:text-sm">
              {priceHint(extra)}
            </span>
          </ChoiceButton>
        );
      })}
    </div>
  );
}

export function WindowToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ChoiceButton selected={!enabled} onSelect={() => onChange(false)}>
        <span className="block font-display text-lg font-bold text-primary">No Windows</span>
      </ChoiceButton>
      <ChoiceButton selected={enabled} onSelect={() => onChange(true)}>
        <span className="block font-display text-lg font-bold text-primary">Yes, Add Windows</span>
      </ChoiceButton>
    </div>
  );
}

export function WindowStyleCards({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: "clear" | "frosted" | "tinted") => void;
}) {
  const styles = [
    { id: "clear" as const, name: "Clear", from: "#d7e6f2", to: "#7f9eb8" },
    { id: "frosted" as const, name: "Frosted", from: "#f3f3f3", to: "#c8c8c8" },
    { id: "tinted" as const, name: "Tinted", from: "#6d5a48", to: "#2f241c" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {styles.map((style) => (
        <ChoiceButton
          key={style.id}
          selected={style.id === selectedId}
          onSelect={() => onSelect(style.id)}
          className="px-2 text-center sm:px-4"
        >
          <span
            aria-hidden
            className="mx-auto block h-12 w-full rounded-md border border-black/15"
            style={{
              background: `linear-gradient(135deg, ${style.from}, ${style.to})`,
            }}
          />
          <span className="mt-2 block font-display text-lg font-bold text-primary">
            {style.name}
          </span>
          <span className="block text-xs text-secondary">
            {priceHint(WINDOW_STYLE_PRICES[style.id])}
          </span>
        </ChoiceButton>
      ))}
    </div>
  );
}
