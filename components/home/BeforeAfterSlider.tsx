"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { BeforeAfterPair } from "@/data/beforeAfter";
import { cn } from "@/lib/cn";

type BeforeAfterSliderProps = {
  pair: BeforeAfterPair;
};

export function BeforeAfterSlider({ pair }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full">
      <h3 className="mb-4 font-display text-lg font-bold text-primary sm:text-xl">
        {pair.title}
      </h3>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-lg bg-primary/5"
      >
        <Image
          src={pair.after.src}
          alt={pair.after.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          className="object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={pair.before.src}
            alt={pair.before.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />

        <div
          className="absolute top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg"
          style={{ left: `${position}%` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="slider"
          aria-label={`Compare before and after: ${pair.title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
          }}
        >
          <svg
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>

        <span className="absolute left-3 top-3 rounded bg-primary/80 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded bg-primary/80 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          After
        </span>
      </div>

      <label className="sr-only" htmlFor={`slider-${pair.id}`}>
        Adjust before and after comparison for {pair.title}
      </label>
      <input
        id={`slider-${pair.id}`}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="mt-3 w-full accent-accent md:hidden"
        aria-label={`Adjust comparison slider for ${pair.title}`}
      />
    </div>
  );
}

type BeforeAfterProps = {
  pairs: BeforeAfterPair[];
};

export function BeforeAfterGallery({ pairs }: BeforeAfterProps) {
  return (
    <div
      className={cn(
        "grid gap-10",
        pairs.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : "max-w-2xl"
      )}
    >
      {pairs.map((pair) => (
        <BeforeAfterSlider key={pair.id} pair={pair} />
      ))}
    </div>
  );
}
