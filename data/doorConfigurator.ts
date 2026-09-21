/**
 * Private garage-door configurator catalog.
 *
 * PLACEHOLDER PRICING — replace the numbers in the PRICE tables below
 * with real quote prices. Do not scatter prices in UI components.
 *
 * All amounts are CAD dollars (not cents).
 */

export const CONFIGURATOR_PATH = "/door-configurator";

/* -------------------------------------------------------------------------- */
/* PLACEHOLDER PRICE TABLES — edit these when real prices are ready            */
/* -------------------------------------------------------------------------- */

export const SIZE_PRICES = {
  "8x7": 2195,
  "8x8": 2395,
  "9x7": 2395,
  "9x8": 2595,
  "10x7": 2695,
  "10x8": 2895,
  "16x7": 3495,
  "16x8": 3795,
  "18x7": 3995,
  "18x8": 4295,
} as const;

export const PANEL_PRICES = {
  long: 0,
  short: 150,
} as const;

export const COLOR_PRICES = {
  white: 0,
  almond: 0,
  sandstone: 0,
  beige: 0,
  brown: 0,
  "dark-brown": 125,
  black: 125,
  charcoal: 75,
  gray: 0,
  "dark-gray": 75,
  green: 125,
  red: 125,
} as const;

export const INSULATION_PRICES = {
  r12: 0,
  r16: 350,
  r18: 550,
} as const;

export const WINDOW_PRICES = {
  none: 0,
  add: 420,
} as const;

export const WINDOW_STYLE_PRICES = {
  clear: 0,
  frosted: 80,
  tinted: 120,
} as const;

/** Windows across the selected panel, by door width in feet. */
export const WINDOW_COUNTS_BY_WIDTH = {
  8: 2,
  9: 2,
  10: 3,
  16: 4,
  18: 4,
} as const;

/**
 * Raised rectangles across each horizontal door section, by width and style.
 * Matches the job photos: 12.jpeg (short) and 29.jpeg (long).
 *
 * 8'/9' short → 4 across (16 total on a 4-row 7' door)
 * 8'/9' long  → 2 across (8 total on a 4-row 7' door)
 * 16' long    → 4 across (16 total on a 4-row 7' door)
 */
export const PANEL_RECTANGLES_BY_WIDTH = {
  short: {
    8: 4,
    9: 4,
    10: 4,
    16: 8,
    18: 8,
  },
  long: {
    8: 2,
    9: 2,
    10: 2,
    16: 4,
    18: 4,
  },
} as const;

/**
 * Horizontal door sections (rows). Both styles use the same row count —
 * short vs long changes rectangle width, not how many sections the door has.
 */
export const PANEL_COUNTS = {
  long: { 7: 4, 8: 5 },
  short: { 7: 4, 8: 5 },
} as const;

/* -------------------------------------------------------------------------- */
/* Catalog                                                                     */
/* -------------------------------------------------------------------------- */

export type DoorSize = {
  id: keyof typeof SIZE_PRICES;
  label: string;
  widthFt: number;
  heightFt: number;
};

export type PanelStyle = {
  id: keyof typeof PANEL_PRICES;
  name: string;
  shortName: string;
  description: string;
};

export type DoorColor = {
  id: keyof typeof COLOR_PRICES;
  name: string;
  hex: string;
};

export type InsulationOption = {
  id: keyof typeof INSULATION_PRICES;
  label: string;
  rValue: number;
};

export type WindowStyle = {
  id: keyof typeof WINDOW_STYLE_PRICES;
  name: string;
  /** Glass fill used by the procedural preview. */
  glassFrom: string;
  glassTo: string;
  tint: number;
};

export const doorSizes: readonly DoorSize[] = [
  { id: "8x7", label: "8' × 7'", widthFt: 8, heightFt: 7 },
  { id: "8x8", label: "8' × 8'", widthFt: 8, heightFt: 8 },
  { id: "9x7", label: "9' × 7'", widthFt: 9, heightFt: 7 },
  { id: "9x8", label: "9' × 8'", widthFt: 9, heightFt: 8 },
  { id: "10x7", label: "10' × 7'", widthFt: 10, heightFt: 7 },
  { id: "10x8", label: "10' × 8'", widthFt: 10, heightFt: 8 },
  { id: "16x7", label: "16' × 7'", widthFt: 16, heightFt: 7 },
  { id: "16x8", label: "16' × 8'", widthFt: 16, heightFt: 8 },
  { id: "18x7", label: "18' × 7'", widthFt: 18, heightFt: 7 },
  { id: "18x8", label: "18' × 8'", widthFt: 18, heightFt: 8 },
];

export const panelStyles: readonly PanelStyle[] = [
  {
    id: "long",
    name: "Long Panel",
    shortName: "Long",
    description: "Wide horizontal sections",
  },
  {
    id: "short",
    name: "Short Panel",
    shortName: "Short",
    description: "Classic raised squares",
  },
];

export const doorColors: readonly DoorColor[] = [
  { id: "white", name: "White", hex: "#F4F1EA" },
  { id: "almond", name: "Almond", hex: "#E4D2B6" },
  { id: "sandstone", name: "Sandstone", hex: "#D2C0A4" },
  { id: "beige", name: "Beige", hex: "#C4B18C" },
  { id: "brown", name: "Brown", hex: "#6B4423" },
  { id: "dark-brown", name: "Dark Brown", hex: "#3B2418" },
  { id: "black", name: "Black", hex: "#1C1C1C" },
  { id: "charcoal", name: "Charcoal", hex: "#3A3A3A" },
  { id: "gray", name: "Gray", hex: "#8D8D8D" },
  { id: "dark-gray", name: "Dark Gray", hex: "#4E4E4E" },
  { id: "green", name: "Green", hex: "#3C5340" },
  { id: "red", name: "Red", hex: "#8B2E2E" },
];

export const insulationOptions: readonly InsulationOption[] = [
  { id: "r12", label: "R-12", rValue: 12 },
  { id: "r16", label: "R-16", rValue: 16 },
  { id: "r18", label: "R-18", rValue: 18 },
];

export const windowStyles: readonly WindowStyle[] = [
  {
    id: "clear",
    name: "Clear",
    glassFrom: "#d7e6f2",
    glassTo: "#7f9eb8",
    tint: 0.22,
  },
  {
    id: "frosted",
    name: "Frosted",
    glassFrom: "#f3f3f3",
    glassTo: "#c8c8c8",
    tint: 0.55,
  },
  {
    id: "tinted",
    name: "Tinted",
    glassFrom: "#6d5a48",
    glassTo: "#2f241c",
    tint: 0.7,
  },
];

/**
 * Default showroom example:
 * 16' × 7' · Long · Brown · R-16 · 4 clear windows on the top panel
 */
export const defaultConfiguration = {
  sizeId: "16x7",
  panelStyleId: "long",
  colorId: "brown",
  insulationId: "r16",
  windowsEnabled: true,
  /** Top-row rectangles on a 16' long-panel door: 0-0 … 0-3 */
  windowCells: ["0-0", "0-1", "0-2", "0-3"],
  windowStyleId: "clear",
} as const;

export type WindowCellId = `${number}-${number}`;

export type ConfiguratorState = {
  sizeId: DoorSize["id"];
  panelStyleId: PanelStyle["id"];
  colorId: DoorColor["id"];
  insulationId: InsulationOption["id"];
  windowsEnabled: boolean;
  windowCells: readonly string[];
  windowStyleId: WindowStyle["id"];
};

/**
 * Preview is procedural (layered SVG) so later assets can replace layers
 * without exploding into one image per combination.
 */
export const previewConfig = {
  mode: "procedural" as const,
  /**
   * Future layered-image slots — unused until product photos are provided.
   * Example: panel base, color overlay, window overlay per style.
   */
  layers: {
    panelBase: null,
    colorOverlay: null,
    windowOverlay: null,
  },
};
