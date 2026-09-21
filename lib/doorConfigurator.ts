import {
  COLOR_PRICES,
  INSULATION_PRICES,
  PANEL_COUNTS,
  PANEL_PRICES,
  PANEL_RECTANGLES_BY_WIDTH,
  SIZE_PRICES,
  WINDOW_PRICES,
  WINDOW_STYLE_PRICES,
  defaultConfiguration,
  doorColors,
  doorSizes,
  insulationOptions,
  panelStyles,
  windowStyles,
  type ConfiguratorState,
  type DoorColor,
  type DoorSize,
  type InsulationOption,
  type PanelStyle,
  type WindowStyle,
} from "@/data/doorConfigurator";

export type { ConfiguratorState };

export type WindowLocation = {
  id: string;
  name: string;
  panelIndex: number;
};

export type PriceLine = {
  id: string;
  label: string;
  amount: number;
};

export type PriceBreakdown = {
  lines: PriceLine[];
  total: number;
};

function isSizeId(value: string): value is DoorSize["id"] {
  return value in SIZE_PRICES;
}

function isPanelId(value: string): value is PanelStyle["id"] {
  return value in PANEL_PRICES;
}

function isColorId(value: string): value is DoorColor["id"] {
  return value in COLOR_PRICES;
}

function isInsulationId(value: string): value is InsulationOption["id"] {
  return value in INSULATION_PRICES;
}

function isWindowStyleId(value: string): value is WindowStyle["id"] {
  return value in WINDOW_STYLE_PRICES;
}

export function getDoorSize(id: string): DoorSize {
  return doorSizes.find((size) => size.id === id) ?? doorSizes[6];
}

export function getPanelStyle(id: string): PanelStyle {
  return panelStyles.find((style) => style.id === id) ?? panelStyles[0];
}

export function getDoorColor(id: string): DoorColor {
  return doorColors.find((color) => color.id === id) ?? doorColors[4];
}

export function getInsulation(id: string): InsulationOption {
  return insulationOptions.find((option) => option.id === id) ?? insulationOptions[1];
}

export function getWindowStyle(id: string): WindowStyle {
  return windowStyles.find((style) => style.id === id) ?? windowStyles[0];
}

export function getPanelCount(heightFt: number, panelStyleId: PanelStyle["id"]): number {
  const table = PANEL_COUNTS[panelStyleId];
  const key = heightFt <= 7 ? 7 : 8;
  return table[key];
}

export function getWindowLocations(panelCount: number): WindowLocation[] {
  return Array.from({ length: panelCount }, (_, panelIndex) => {
    let name = `Panel ${panelIndex + 1}`;
    if (panelIndex === 0) name = "Top Panel";
    else if (panelIndex === panelCount - 1) name = "Bottom Panel";
    else if (panelIndex === 1) name = "Second Panel";
    else if (panelIndex === 2) name = "Third Panel";
    else if (panelIndex === 3) name = "Fourth Panel";
    else if (panelIndex === 4) name = "Fifth Panel";

    return {
      id: `panel-${panelIndex}`,
      name,
      panelIndex,
    };
  });
}

export function windowCellId(row: number, col: number): string {
  return `${row}-${col}`;
}

export function parseWindowCellId(id: string): { row: number; col: number } | null {
  const [rowText, colText] = id.split("-");
  const row = Number(rowText);
  const col = Number(colText);
  if (!Number.isInteger(row) || !Number.isInteger(col) || row < 0 || col < 0) {
    return null;
  }
  return { row, col };
}

export function getRowWindowName(row: number, rowCount: number): string {
  const locations = getWindowLocations(rowCount);
  return locations[row]?.name.toLowerCase() ?? `panel ${row + 1}`;
}

export function describeWindowPlacement(
  cells: readonly string[],
  rowCount: number
): string {
  const rows = [
    ...new Set(
      cells
        .map(parseWindowCellId)
        .filter((cell): cell is { row: number; col: number } => cell !== null)
        .map((cell) => cell.row)
    ),
  ].sort((a, b) => a - b);

  if (rows.length === 0) return "None selected";
  if (rows.length === 1) {
    return `Selected visually on the ${getRowWindowName(rows[0], rowCount)}`;
  }
  return "Selected visually on the door";
}

export function getDefaultWindowCells(
  widthFt: number,
  heightFt: number,
  panelStyleId: PanelStyle["id"]
): string[] {
  const cols = getPanelRectangleColumns(widthFt, panelStyleId);
  return Array.from({ length: cols }, (_, col) => windowCellId(0, col));
}

export function clampWindowCells(
  cells: readonly string[],
  widthFt: number,
  heightFt: number,
  panelStyleId: PanelStyle["id"]
): string[] {
  const rows = getPanelCount(heightFt, panelStyleId);
  const cols = getPanelRectangleColumns(widthFt, panelStyleId);
  const seen = new Set<string>();

  for (const id of cells) {
    const cell = parseWindowCellId(id);
    if (!cell || cell.row >= rows || cell.col >= cols) continue;
    seen.add(windowCellId(cell.row, cell.col));
  }

  return [...seen];
}

export function toggleWindowCell(cells: readonly string[], id: string): string[] {
  return cells.includes(id) ? cells.filter((cell) => cell !== id) : [...cells, id];
}

export function getPanelRectangleColumns(
  widthFt: number,
  panelStyleId: PanelStyle["id"]
): number {
  const table = PANEL_RECTANGLES_BY_WIDTH[panelStyleId];
  const exact = table[widthFt as keyof typeof table];
  if (exact) return exact;
  if (widthFt >= 16) return panelStyleId === "short" ? 8 : 4;
  return panelStyleId === "short" ? 4 : 2;
}

export function isDoubleDoor(widthFt: number): boolean {
  return widthFt >= 16;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculatePrice(state: ConfiguratorState): PriceBreakdown {
  const size = getDoorSize(state.sizeId);
  const panel = getPanelStyle(state.panelStyleId);
  const color = getDoorColor(state.colorId);
  const insulation = getInsulation(state.insulationId);
  const windowStyle = getWindowStyle(state.windowStyleId);

  const lines: PriceLine[] = [
    {
      id: "base",
      label: `Base Door (${size.label})`,
      amount: SIZE_PRICES[size.id],
    },
    {
      id: "panel",
      label: `Panel — ${panel.shortName}`,
      amount: PANEL_PRICES[panel.id],
    },
    {
      id: "color",
      label: `Color — ${color.name}`,
      amount: COLOR_PRICES[color.id],
    },
    {
      id: "insulation",
      label: `Insulation — ${insulation.label}`,
      amount: INSULATION_PRICES[insulation.id],
    },
  ];

  if (state.windowsEnabled) {
    const count = state.windowCells.length;

    lines.push({
      id: "windows",
      label: `Windows — ${count} ${windowStyle.name}`,
      amount: WINDOW_PRICES.add,
    });
    lines.push({
      id: "window-style",
      label: `${windowStyle.name} glass`,
      amount: WINDOW_STYLE_PRICES[windowStyle.id],
    });
  } else {
    lines.push({
      id: "windows",
      label: "Windows — None",
      amount: WINDOW_PRICES.none,
    });
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return { lines, total };
}

export function getSelectionSummary(state: ConfiguratorState) {
  const size = getDoorSize(state.sizeId);
  const panel = getPanelStyle(state.panelStyleId);
  const color = getDoorColor(state.colorId);
  const insulation = getInsulation(state.insulationId);
  const windowStyle = getWindowStyle(state.windowStyleId);
  const rowCount = getPanelCount(size.heightFt, panel.id);
  const windowCount = state.windowCells.length;
  const locationLabel = describeWindowPlacement(state.windowCells, rowCount);

  const windowLine = state.windowsEnabled
    ? `${windowCount} ${windowStyle.name} Window${windowCount === 1 ? "" : "s"}`
    : "No Windows";

  return {
    size,
    panel,
    color,
    insulation,
    windowStyle,
    windowCount,
    locationLabel,
    windowLine,
    lines: [
      size.label,
      `${panel.shortName} Panels`,
      color.name,
      insulation.label,
      windowLine,
    ],
    details: [
      { label: "Size", value: size.label },
      { label: "Panel", value: panel.shortName },
      { label: "Color", value: color.name },
      { label: "Insulation", value: insulation.label },
      { label: "Windows", value: state.windowsEnabled ? "Yes" : "No" },
      ...(state.windowsEnabled
        ? [
            { label: "Window Style", value: windowStyle.name },
            { label: "Window Count", value: String(windowCount) },
            { label: "Location", value: locationLabel },
          ]
        : []),
    ],
  };
}

export function clampConfiguration(state: ConfiguratorState): ConfiguratorState {
  const size = getDoorSize(state.sizeId);
  const panel = getPanelStyle(state.panelStyleId);

  return {
    ...state,
    sizeId: size.id,
    panelStyleId: panel.id,
    colorId: getDoorColor(state.colorId).id,
    insulationId: getInsulation(state.insulationId).id,
    windowCells: clampWindowCells(
      state.windowCells,
      size.widthFt,
      size.heightFt,
      panel.id
    ),
    windowStyleId: getWindowStyle(state.windowStyleId).id,
  };
}

export function createDefaultConfiguration(): ConfiguratorState {
  return clampConfiguration({ ...defaultConfiguration });
}

export function serializeConfiguration(state: ConfiguratorState): string {
  const params = new URLSearchParams({
    s: state.sizeId,
    p: state.panelStyleId,
    c: state.colorId,
    i: state.insulationId,
    w: state.windowsEnabled ? "1" : "0",
    wc: state.windowCells.join(","),
    ws: state.windowStyleId,
  });
  return params.toString();
}

export function parseConfiguration(search: string): ConfiguratorState {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const sizeId = params.get("s") ?? "";
  const panelStyleId = params.get("p") ?? "";
  const colorId = params.get("c") ?? "";
  const insulationId = params.get("i") ?? "";
  const windowStyleId = params.get("ws") ?? "";

  const resolvedSizeId = isSizeId(sizeId) ? sizeId : defaultConfiguration.sizeId;
  const resolvedPanelId = isPanelId(panelStyleId)
    ? panelStyleId
    : defaultConfiguration.panelStyleId;
  const size = getDoorSize(resolvedSizeId);
  const panel = getPanelStyle(resolvedPanelId);

  return clampConfiguration({
    sizeId: resolvedSizeId,
    panelStyleId: resolvedPanelId,
    colorId: isColorId(colorId) ? colorId : defaultConfiguration.colorId,
    insulationId: isInsulationId(insulationId)
      ? insulationId
      : defaultConfiguration.insulationId,
    windowsEnabled: params.has("w")
      ? params.get("w") === "1"
      : defaultConfiguration.windowsEnabled,
    windowCells: parseWindowCellsParam(
      params.get("wc"),
      params.get("wl"),
      size.widthFt,
      size.heightFt,
      panel.id
    ),
    windowStyleId: isWindowStyleId(windowStyleId)
      ? windowStyleId
      : defaultConfiguration.windowStyleId,
  });
}

function parseWindowCellsParam(
  cellsParam: string | null,
  legacyLocation: string | null,
  widthFt: number,
  heightFt: number,
  panelStyleId: PanelStyle["id"]
): string[] {
  if (cellsParam) {
    return cellsParam.split(",").map((id) => id.trim()).filter(Boolean);
  }

  if (legacyLocation?.startsWith("panel-")) {
    const row = Number(legacyLocation.slice(6));
    const cols = getPanelRectangleColumns(widthFt, panelStyleId);
    if (Number.isInteger(row) && row >= 0) {
      return Array.from({ length: cols }, (_, col) => windowCellId(row, col));
    }
  }

  return [...defaultConfiguration.windowCells];
}

export function formatQuoteText(state: ConfiguratorState, shareUrl?: string): string {
  const summary = getSelectionSummary(state);
  const price = calculatePrice(state);
  const lines = [
    "Garage Door Configuration",
    "",
    `Size: ${summary.size.label}`,
    `Panel: ${summary.panel.name}`,
    `Color: ${summary.color.name}`,
    `Insulation: ${summary.insulation.label}`,
    `Windows: ${summary.windowLine}`,
    "",
    `TOTAL: ${formatPrice(price.total)}`,
  ];

  if (shareUrl) {
    lines.push("", shareUrl);
  }

  return lines.join("\n");
}
