"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CONFIGURATOR_PATH,
  doorSizes,
} from "@/data/doorConfigurator";
import {
  calculatePrice,
  clampConfiguration,
  createDefaultConfiguration,
  formatPrice,
  formatQuoteText,
  getDoorColor,
  getDoorSize,
  getPanelCount,
  getPanelStyle,
  getSelectionSummary,
  getWindowStyle,
  parseConfiguration,
  serializeConfiguration,
  toggleWindowCell,
  type ConfiguratorState,
} from "@/lib/doorConfigurator";
import { ConfiguratorHeader } from "./ConfiguratorHeader";
import { DoorPreview } from "./DoorPreview";
import { PriceCard } from "./PriceCard";
import {
  ColorGrid,
  ConfigSection,
  InsulationCards,
  PanelStyleCards,
  SizeGrid,
  WindowStyleCards,
  WindowToggle,
} from "./ConfiguratorControls";

export function ConfiguratorApp() {
  const [state, setState] = useState<ConfiguratorState>(createDefaultConfiguration);
  const [urlReady, setUrlReady] = useState(false);
  const [status, setStatus] = useState("");

  const size = getDoorSize(state.sizeId);
  const panel = getPanelStyle(state.panelStyleId);
  const color = getDoorColor(state.colorId);
  const windowStyle = getWindowStyle(state.windowStyleId);
  const panelCount = getPanelCount(size.heightFt, panel.id);
  const price = useMemo(() => calculatePrice(state), [state]);
  const summary = useMemo(() => getSelectionSummary(state), [state]);

  useEffect(() => {
    const params = window.location.search;
    if (params.length > 1) {
      setState(parseConfiguration(params));
    }
    setUrlReady(true);
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    const next = `?${serializeConfiguration(state)}`;
    if (window.location.search === next) return;
    window.history.replaceState(null, "", `${CONFIGURATOR_PATH}${next}`);
  }, [state, urlReady]);

  function update(partial: Partial<ConfiguratorState>) {
    setState((current) => clampConfiguration({ ...current, ...partial }));
  }

  async function copyQuote() {
    const url = `${window.location.origin}${CONFIGURATOR_PATH}?${serializeConfiguration(state)}`;
    const text = formatQuoteText(state, url);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Configuration copied.");
    } catch {
      setStatus("Could not copy. Select and copy the quote manually.");
    }
  }

  function reset() {
    setState(createDefaultConfiguration());
    setStatus("Configuration reset.");
  }

  const controls = (
    <div className="space-y-8">
      <ConfigSection id="door-size" title="1. Door Size">
        <SizeGrid
          options={doorSizes}
          selectedId={state.sizeId}
          onSelect={(id) => update({ sizeId: id as ConfiguratorState["sizeId"] })}
        />
      </ConfigSection>

      <ConfigSection id="panel-style" title="2. Panel Style">
        <PanelStyleCards
          selectedId={state.panelStyleId}
          onSelect={(id) => update({ panelStyleId: id })}
        />
      </ConfigSection>

      <ConfigSection id="door-color" title="3. Door Color">
        <ColorGrid
          selectedId={state.colorId}
          onSelect={(id) => update({ colorId: id })}
        />
      </ConfigSection>

      <ConfigSection id="insulation" title="4. Insulation">
        <InsulationCards
          selectedId={state.insulationId}
          onSelect={(id) => update({ insulationId: id })}
        />
      </ConfigSection>

      <ConfigSection id="windows" title="5. Windows">
        <WindowToggle
          enabled={state.windowsEnabled}
          onChange={(windowsEnabled) => update({ windowsEnabled })}
        />
      </ConfigSection>

      {state.windowsEnabled ? (
        <div className="space-y-8 animate-fade-in-up">
          <ConfigSection id="window-style" title="6. Window Style">
            <WindowStyleCards
              selectedId={state.windowStyleId}
              onSelect={(id) => update({ windowStyleId: id })}
            />
          </ConfigSection>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="min-h-12 rounded-md border-2 border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-black/30"
        >
          Reset Configuration
        </button>
        <button
          type="button"
          onClick={copyQuote}
          className="min-h-12 rounded-md bg-cta px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition-all hover:brightness-105"
        >
          Save Configuration
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      {status ? <p className="text-sm text-secondary">{status}</p> : null}
    </div>
  );

  function renderPreview(instanceId: string) {
    return (
      <section
        aria-labelledby={`${instanceId}-preview-heading`}
        className="space-y-4"
      >
        <div className="flex items-end justify-between gap-3">
          <h2
            id={`${instanceId}-preview-heading`}
            className="font-display text-2xl font-bold tracking-tight text-primary"
          >
            Your Door
          </h2>
          <p className="text-sm text-secondary">{size.label}</p>
        </div>
        {state.windowsEnabled ? (
          <p className="text-sm font-medium text-secondary">
            Click the panels where you want your windows.
          </p>
        ) : null}
        <DoorPreview
          instanceId={instanceId}
          widthFt={size.widthFt}
          heightFt={size.heightFt}
          panelStyleId={panel.id}
          panelCount={panelCount}
          colorHex={color.hex}
          windowsEnabled={state.windowsEnabled}
          windowCells={state.windowCells}
          windowStyle={windowStyle}
          interactive={state.windowsEnabled}
          onToggleCell={(id) =>
            update({ windowCells: toggleWindowCell(state.windowCells, id) })
          }
        />
      </section>
    );
  }

  return (
    <div className="min-h-dvh bg-[#f4f1ea] pb-24 lg:pb-0">
      <ConfiguratorHeader />

      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:items-start xl:grid-cols-[minmax(0,1fr)_minmax(26rem,34rem)]">
          <div>{controls}</div>

          <div className="hidden space-y-4 lg:sticky lg:top-6 lg:block">
            {renderPreview("desktop")}
            <PriceCard
              heading="Your Selection"
              headingId="your-selection-heading"
              breakdown={price}
              details={summary.details}
            />
          </div>
        </div>

        <div className="mt-8 space-y-4 lg:hidden">
          <PriceCard breakdown={price} details={summary.details} />
          {renderPreview("mobile")}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-secondary">
              Your Selection
            </p>
            <p className="truncate text-sm text-primary">
              {size.label} · {panel.shortName} · {color.name} · {summary.windowLine}
            </p>
          </div>
          <p className="shrink-0 font-display text-2xl font-bold text-primary">
            {formatPrice(price.total)}
          </p>
        </div>
      </div>
    </div>
  );
}
