# Assets

Owner: responsive asset rules, naming, and dimensions.

Photography is Vertical Content. The **slots** (which files the Core shells expect) are Core. A clone keeps the slot names unless the runbook explicitly renames them.

---

## 1. Ownership

| Slot | Layer | On clone |
| --- | --- | --- |
| `/images/jdm-header-logo.png` | Core (brand) | Keep unless brand lockup changes |
| Hero desktop / mobile | Vertical (`data/home.ts` `homeHero.images`) | Replace files; keep paths if possible |
| `/services` banner trio | Vertical (`data/serviceOverview.ts` `servicesBanner`) | Replace files; keep paths |
| Homepage service card images | Vertical | Replace; count may change |
| Overview category photos | Vertical | Replace; count may change |
| Why Choose Us photo | Vertical (`data/whyChooseUs.ts`) | Replace |
| Before/after pairs | Vertical (`data/beforeAfter.ts`) | Replace or omit the module |
| Open Graph image | Vertical (`siteConfig.seo.ogImage`) | Replace; currently reuses hero desktop |

Do not ship leftover garage photography under a new trade’s domain.

---

## 2. Directory layout

```text
public/images/
├── jdm-header-logo.png
├── hero-background.png
├── hero-background-mobile.png
├── why-choose-us.jpg
├── services/
│   ├── overview-banner-mobile.png
│   ├── overview-banner-tablet.png
│   ├── overview-banner-desktop.png
│   ├── overview-{category}.jpg
│   └── {card}.jpg
└── before-after/
    └── {pair}-before.jpg / {pair}-after.jpg
```

**Naming rules**

- Slot filenames stay **trade-agnostic** (`hero-background.png`, `overview-repair.jpg`).
- Do not encode the previous trade in a new file (`garage-hero.png` on a windows site is contamination).
- Card filenames may be service nouns (`spring.jpg` is fine on Garage Door; a Windows clone uses `fogged-glass.jpg`, not `spring.jpg`).
- Prefer `.png` for UI chrome and banners; `.jpg` for photography.
- No spaces. Lowercase kebab-case.

---

## 3. Required slots (Template v1)

These paths are referenced by Core-shaped components or data today. A new vertical must supply a real file for every slot it still uses.

### Brand

| Path | Intrinsic (this reference) | Display | Notes |
| --- | --- | --- | --- |
| `/images/jdm-header-logo.png` | 2172×724 (3:1) | 144×48 / 168×56 / 192×64 | Header must **not** grow to fit the logo. `unoptimized` in Header/Footer. |

### Hero (`data/home.ts` → `Hero.tsx`)

| Path | Breakpoint | Role |
| --- | --- | --- |
| `/images/hero-background-mobile.png` | `< md` | `fill` + `object-contain`; this reference is 941×1672 (portrait) |
| `/images/hero-background.png` | `≥ md` | `fill` + `object-contain`; also used as OG image |

Images use `fill` + `object-contain object-center` on a `bg-primary` layer so more of the source composition is visible. Do not stretch. Subject must survive left-side dark gradient (`from-primary/90`). Keep a quiet left third for headline contrast.

### Services banner (`data/serviceOverview.ts` → `ServicesBanner.tsx`)

| Path | Breakpoint | Intrinsic (this reference) | Frame |
| --- | --- | --- | --- |
| `overview-banner-mobile.png` | `< md` | 1024×1536 (2:3) | Square crop container `aspect-square` max 480 |
| `overview-banner-tablet.png` | `md`–`xl` | 1774×887 (2:1) | Square crop container max 720 |
| `overview-banner-desktop.png` | `≥ xl` | 2172×724 (3:1) | Intrinsic width/height; `h-auto w-full` |

Mobile/tablet frames crop. Compose the subject toward the center. Desktop is letterboxed by the 3:1 asset.

### Overview category photos (`data/serviceOverview.ts`)

| Field | This reference |
| --- | --- |
| Typical size | 1200×800 (3:2) |
| `sizes` | `100vw` below `xl`, `50vw` at `xl` |
| Crop | Full-bleed in panel; square corners |

One image per `overviewCategories[]` entry. Count is 2–n, not fixed at 3.

### Homepage cards (`data/services.ts`)

| Rule | Value |
| --- | --- |
| Path pattern | `/images/services/{id-or-noun}.jpg` |
| `sizes` | `100vw` / `50vw` / `33vw` |
| Count | Free (this reference: 9) |

### Why Choose Us

| Path | `sizes` |
| --- | --- |
| `/images/why-choose-us.jpg` | `100vw` below `lg`, `50vw` at `lg` |

### Before/after (optional module)

| Path | This reference |
| --- | --- |
| `/images/before-after/{pair}-before.jpg` | Three pairs: door, hinge, install |
| `/images/before-after/{pair}-after.jpg` | Same |

Omit the section only if the vertical has no honest pairs. Do not reuse garage door photos on another trade.

### Open Graph

| Surface | Current |
| --- | --- |
| `siteConfig.seo.ogImage` | `/images/hero-background.png`, 1200×630 |

Prefer a dedicated 1200×630 crop before a second public launch. Until then, the hero desktop file must still read correctly as a social preview.

---

## 4. Responsive rules

- Provide **real** alternate files for hero (2) and services banner (3). CSS-only scaling of one landscape photo is not sufficient for the banner’s square mobile frame.
- `next/image` `sizes` must stay accurate if card/grid breakpoints change.
- Quality default in Core shells: `85`.
- Alt text is Vertical Content. Decorative banner overlay may use empty `alt` (current services banner); the `h1` carries the name.

---

## 5. Clone checklist

1. Replace every Vertical path above with trade-correct photography.
2. Keep Core logo unless brand changes.
3. Update `imageAlt` / `imageWidth` / `imageHeight` in data files to match new files.
4. Delete unused previous-trade files so they cannot be referenced by leftover data.
5. Search the repo for previous filenames (`door-before`, `spring.jpg`, `garage`, etc.).
6. Confirm 360 / 768 / 1280 / 1440 that heroes and banners do not clip critical subject matter.

Failure: any previous-trade image still referenced, or a required slot missing at build time.
