/** Mix two hex colors. Amount 0 = a, 1 = b. */
export function mixHex(a: string, b: string, amount: number): string {
  const left = hexToRgb(a);
  const right = hexToRgb(b);
  const t = Math.min(1, Math.max(0, amount));
  return rgbToHex({
    r: Math.round(left.r + (right.r - left.r) * t),
    g: Math.round(left.g + (right.g - left.g) * t),
    b: Math.round(left.b + (right.b - left.b) * t),
  });
}

export function doorPalette(hex: string) {
  return {
    base: hex,
    highlight: mixHex(hex, "#ffffff", 0.22),
    mid: mixHex(hex, "#000000", 0.12),
    shadow: mixHex(hex, "#000000", 0.28),
    groove: mixHex(hex, "#000000", 0.4),
    inset: mixHex(hex, "#000000", 0.18),
    frame: mixHex(hex, "#000000", 0.45),
    hardware: mixHex(hex, "#d8c27a", 0.35),
  };
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}
