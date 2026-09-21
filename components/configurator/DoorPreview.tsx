"use client";

import type { WindowStyle } from "@/data/doorConfigurator";
import { doorPalette } from "@/lib/doorPreviewColors";
import {
  getPanelRectangleColumns,
  getRowWindowName,
  isDoubleDoor,
  windowCellId,
} from "@/lib/doorConfigurator";

type DoorPreviewProps = {
  instanceId?: string;
  widthFt: number;
  heightFt: number;
  panelStyleId: "long" | "short";
  panelCount: number;
  colorHex: string;
  windowsEnabled: boolean;
  windowCells: readonly string[];
  windowStyle: WindowStyle;
  interactive?: boolean;
  onToggleCell?: (id: string) => void;
};

export function DoorPreview({
  instanceId = "preview",
  widthFt,
  heightFt,
  panelStyleId,
  panelCount,
  colorHex,
  windowsEnabled,
  windowCells,
  windowStyle,
  interactive = false,
  onToggleCell,
}: DoorPreviewProps) {
  const aspect = widthFt / heightFt;
  const doorW = 1000;
  const doorH = doorW / aspect;
  const padX = 70;
  const padTop = 56;
  const padBottom = 88;
  const viewW = doorW + padX * 2;
  const viewH = doorH + padTop + padBottom;
  const doorX = padX;
  const doorY = padTop;
  const palette = doorPalette(colorHex);
  const double = isDoubleDoor(widthFt);
  const rectangleCols = getPanelRectangleColumns(widthFt, panelStyleId);
  const uid = `${instanceId}-${widthFt}x${heightFt}-${panelStyleId}`;
  const canPlaceWindows = interactive && windowsEnabled && Boolean(onToggleCell);

  return (
    <div className="door-preview-stage relative overflow-hidden rounded-xl bg-[#d8d2c8] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #cfd6dc 0%, #d7d0c6 38%, #c3bbb0 72%, #9e968c 100%)",
        }}
      />
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="relative z-10 h-auto w-full"
        role={canPlaceWindows ? "group" : "img"}
        aria-label={`${widthFt} by ${heightFt} foot ${panelStyleId} panel garage door`}
      >
        <defs>
          <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d5cfc6" />
            <stop offset="100%" stopColor="#b9b1a6" />
          </linearGradient>
          <linearGradient id={`${uid}-apron`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8b3ac" />
            <stop offset="100%" stopColor="#8f8a83" />
          </linearGradient>
          <linearGradient id={`${uid}-door`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.highlight} />
            <stop offset="55%" stopColor={palette.base} />
            <stop offset="100%" stopColor={palette.shadow} />
          </linearGradient>
          <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={windowStyle.glassFrom} />
            <stop offset="100%" stopColor={windowStyle.glassTo} />
          </linearGradient>
          <linearGradient id={`${uid}-glass-sheen`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id={`${uid}-shadow`} x="-8%" y="-6%" width="116%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodOpacity="0.28" />
          </filter>
        </defs>

        <rect width={viewW} height={viewH} fill={`url(#${uid}-wall)`} />
        <rect
          x={0}
          y={doorY + doorH + 6}
          width={viewW}
          height={viewH - doorY - doorH}
          fill={`url(#${uid}-apron)`}
        />

        <rect
          x={doorX - 22}
          y={doorY - 22}
          width={doorW + 44}
          height={doorH + 36}
          rx={6}
          fill="#6f6a64"
        />
        <rect
          x={doorX - 14}
          y={doorY - 14}
          width={doorW + 28}
          height={doorH + 22}
          fill="#2c2a28"
        />

        <g filter={`url(#${uid}-shadow)`}>
          <rect
            x={doorX}
            y={doorY}
            width={doorW}
            height={doorH}
            fill={`url(#${uid}-door)`}
          />
        </g>

        {Array.from({ length: panelCount }, (_, row) => {
          const seam = 3;
          const panelH = (doorH - seam * (panelCount - 1)) / panelCount;
          const y = doorY + row * (panelH + seam);
          const cells = getPanelCellRects(
            doorX,
            y,
            doorW,
            panelH,
            rectangleCols,
            panelStyleId
          );

          return (
            <g key={row}>
              <rect
                x={doorX}
                y={y}
                width={doorW}
                height={panelH}
                fill={row % 2 === 0 ? palette.base : palette.mid}
                pointerEvents="none"
              />
              <rect
                x={doorX}
                y={y}
                width={doorW}
                height={4}
                fill={palette.highlight}
                opacity={0.7}
                pointerEvents="none"
              />
              <rect
                x={doorX}
                y={y + panelH - 4}
                width={doorW}
                height={4}
                fill={palette.groove}
                pointerEvents="none"
              />

              {cells.map((cell, col) => {
                const id = windowCellId(row, col);
                const isWindow = windowsEnabled && windowCells.includes(id);
                const rowName = getRowWindowName(row, panelCount);
                return (
                  <g key={id}>
                    {isWindow ? (
                      <WindowPane
                        x={cell.x}
                        y={cell.y}
                        width={cell.width}
                        height={cell.height}
                        palette={palette}
                        uid={uid}
                      />
                    ) : (
                      <RaisedPanel
                        x={cell.x}
                        y={cell.y}
                        width={cell.width}
                        height={cell.height}
                        palette={palette}
                      />
                    )}
                    {canPlaceWindows ? (
                      <rect
                        x={cell.x}
                        y={cell.y}
                        width={cell.width}
                        height={cell.height}
                        className="cursor-pointer fill-transparent hover:fill-cta/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cta"
                        role="button"
                        tabIndex={0}
                        aria-pressed={isWindow}
                        aria-label={`${isWindow ? "Remove" : "Add"} window on ${rowName}, section ${col + 1}`}
                        onClick={() => onToggleCell?.(id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onToggleCell?.(id);
                          }
                        }}
                      />
                    ) : null}
                  </g>
                );
              })}

              <g pointerEvents="none">
                <Hinges
                  x={doorX}
                  y={y}
                  width={doorW}
                  height={panelH}
                  double={double}
                  color={palette.hardware}
                />
              </g>
            </g>
          );
        })}

        <g pointerEvents="none">
          <Handles
            x={doorX}
            y={doorY}
            width={doorW}
            height={doorH}
            panelCount={panelCount}
            double={double}
            color={palette.hardware}
          />
          <rect
            x={doorX}
            y={doorY + doorH - 10}
            width={doorW}
            height={10}
            fill="#1a1a1a"
          />
          <rect
            x={doorX}
            y={doorY}
            width={doorW}
            height={doorH}
            fill="none"
            stroke={palette.frame}
            strokeWidth={6}
          />
        </g>
      </svg>
    </div>
  );
}

type Palette = ReturnType<typeof doorPalette>;

function getPanelCellRects(
  x: number,
  y: number,
  width: number,
  height: number,
  columns: number,
  styleId: "long" | "short"
) {
  const insetX = width * 0.028;
  const gap = width * (styleId === "short" ? 0.026 : 0.022);
  const insetY = Math.max(8, height * (styleId === "short" ? 0.15 : 0.13));
  const innerW = (width - insetX * 2 - gap * (columns - 1)) / columns;
  const innerH = height - insetY * 2;

  return Array.from({ length: columns }, (_, index) => ({
    x: x + insetX + index * (innerW + gap),
    y: y + insetY,
    width: innerW,
    height: innerH,
  }));
}

function RaisedPanel({
  x,
  y,
  width,
  height,
  palette,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  palette: Palette;
}) {
  const stamp = Math.max(4, Math.min(width, height) * 0.08);
  const face = stamp * 1.7;

  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={width} height={height} fill={palette.groove} />
      <polygon
        points={`${x},${y} ${x + width},${y} ${x + width - stamp},${y + stamp} ${x + stamp},${y + stamp}`}
        fill={palette.highlight}
        opacity={0.55}
      />
      <polygon
        points={`${x + width},${y} ${x + width},${y + height} ${x + width - stamp},${y + height - stamp} ${x + width - stamp},${y + stamp}`}
        fill={palette.shadow}
        opacity={0.55}
      />
      <polygon
        points={`${x},${y + height} ${x + width},${y + height} ${x + width - stamp},${y + height - stamp} ${x + stamp},${y + height - stamp}`}
        fill={palette.shadow}
        opacity={0.75}
      />
      <polygon
        points={`${x},${y} ${x},${y + height} ${x + stamp},${y + height - stamp} ${x + stamp},${y + stamp}`}
        fill={palette.highlight}
        opacity={0.35}
      />
      <rect
        x={x + face}
        y={y + face}
        width={Math.max(1, width - face * 2)}
        height={Math.max(1, height - face * 2)}
        fill={palette.base}
      />
    </g>
  );
}

function WindowPane({
  x,
  y,
  width,
  height,
  palette,
  uid,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  palette: Palette;
  uid: string;
}) {
  const frame = Math.max(5, Math.min(width, height) * 0.08);

  return (
    <g pointerEvents="none">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={palette.frame}
        stroke="#e3b429"
        strokeWidth={2}
      />
      <rect
        x={x + frame}
        y={y + frame}
        width={Math.max(1, width - frame * 2)}
        height={Math.max(1, height - frame * 2)}
        fill={`url(#${uid}-glass)`}
      />
      <rect
        x={x + frame}
        y={y + frame}
        width={Math.max(1, width - frame * 2)}
        height={Math.max(1, height - frame * 2)}
        fill={`url(#${uid}-glass-sheen)`}
      />
    </g>
  );
}

function Hinges({
  x,
  y,
  width,
  height,
  double,
  color,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  double: boolean;
  color: string;
}) {
  const hingeW = 16;
  const hingeH = Math.min(28, height * 0.38);
  const cy = y + height / 2 - hingeH / 2;
  const positions = double
    ? [x + 8, x + width / 2 - 26, x + width / 2 + 10, x + width - 24]
    : [x + 8, x + width - 24];

  return (
    <>
      {positions.map((px, index) => (
        <rect
          key={index}
          x={px}
          y={cy}
          width={hingeW}
          height={hingeH}
          rx={2}
          fill={color}
          opacity={0.85}
        />
      ))}
    </>
  );
}

function Handles({
  x,
  y,
  width,
  height,
  panelCount,
  double,
  color,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  panelCount: number;
  double: boolean;
  color: string;
}) {
  const panelH = height / panelCount;
  const handleY = y + panelH * (panelCount - 2) + panelH / 2;
  const xs = double ? [x + width * 0.25, x + width * 0.75] : [x + width / 2];

  return (
    <>
      {xs.map((cx, index) => (
        <g key={index}>
          <rect
            x={cx - 18}
            y={handleY - 7}
            width={36}
            height={14}
            rx={3}
            fill={color}
          />
          <rect
            x={cx - 10}
            y={handleY - 3}
            width={20}
            height={6}
            rx={2}
            fill="#1f1f1f"
            opacity={0.35}
          />
        </g>
      ))}
    </>
  );
}
