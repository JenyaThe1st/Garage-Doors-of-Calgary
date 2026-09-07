# JDM Design System

Owner: shared visual and responsive rules. Core layer.

Do not invent a second palette or type system per trade. Verticals change **content and photography**, not tokens.

---

## Tokens

Defined in `app/globals.css` `@theme`:

| Token | Value | Role |
| --- | --- | --- |
| `--color-primary` | `#1f1f1f` | Dark surfaces, headings |
| `--color-secondary` | `#515151` | Body on light |
| `--color-accent` | `#73916c` | Checks / secondary accent |
| `--color-cta` | `#e3b429` | Gold CTA, logo kinship |
| `--color-neutral-light` | `#d1d1d1` | Muted text on dark |
| `--color-white` | `#ffffff` | Light surfaces |

Fonts (`app/layout.tsx`):

- Body: `DM Sans` → `--font-sans`
- Display / nav / form placeholders: `Barlow Condensed` → `--font-display`

Header / footer gradients are Core chrome (`app/globals.css`):

- Header: `linear-gradient(90deg, #353A3D 0%, #24282A 50%, #111314 100%)`
- Footer: `linear-gradient(180deg, #34393C 0%, #202426 45%, #090A0A 100%)`

---

## Geometry

Do not unify every radius. These differences are intentional.

| Surface | Treatment |
| --- | --- |
| Buttons | `rounded-md` |
| Homepage service cards, before/after, why-choose image | `rounded-lg` |
| Contact / footer panels | `1.125rem` + gold hairline (`footer-panel`) |
| Form fields | `0.625rem` |
| `/services` overview images | Square corners (full-bleed in panels) |
| Header / footer | No rounding |

Header rule: **fit the logo to the header; never grow the header to fit the logo.** Current display lockup (3:1 asset): 144×48 / 168×56 / 192×64. See [ASSETS.md](./ASSETS.md).

---

## Responsive breakpoints

Use the existing Tailwind defaults. Meaningful site breakpoints:

| Width | Role |
| --- | --- |
| ~360–429 | Narrow mobile. Nav shares row width; type steps down. |
| 390 / 430 | Mobile nav type steps |
| `sm` 640 | Larger mobile / small tablet |
| `md` 768 | Tablet; hero desktop image; 2-col metrics |
| `lg` 1024 | Desktop header (logo + inline nav + Call) |
| `xl` 1280 | `/services` 50/50 image+copy; desktop banner |

Canonical QA set: 360, 390, tablet portrait (~768), tablet landscape (~1024), 1440, 1920.

---

## Layout conventions

- Content width: `max-w-7xl` + `px-4 sm:px-6 lg:px-8`
- Fixed header. Offset page chrome with `--site-header-height` (defaults in `:root`, measured at runtime in `Header`)
- Scroll padding uses the same variable
- Mobile sticky call: `MobileStickyCall` + `body` `pb-16 md:pb-0`
- Homepage sections use `Section` (`py-16 md:py-24`)
- Why Choose Us: `bg-primary` (`#1f1f1f`)
- Final CTA: footer-family charcoal `#34393C` (not the same as Why Choose Us)
- `/services` panels use the same vertical padding; backgrounds come from category data
- In-page CTA target: `#final-cta`

---

## Motion and a11y

- `prefers-reduced-motion` disables `animate-fade-in-up` and shortens transitions
- Focus: gold outline (`:focus-visible`, CTA outline on buttons)
- Skip link: `.skip-link` → `#main-content`
- Decorative icons: `aria-hidden`
- Form errors: `aria-invalid` + `aria-describedby`
- Do not ship horizontal page overflow. Fix the overflowing element; do not clip `html`/`body`

---

## Vertical variation that is allowed

- Photography and alt text
- Panel background hex + `panelTone` (`light` \| `dark`) on `/services`
- CTA **wording** (not button geometry)
- Optional omission of before/after if the trade has no honest pairs

Vertical variation that is **not** allowed without a Core version bump:

- New color system
- New header height language
- New nav pattern (hamburger, mega-menu) unless all JDM sites adopt it
- Card-heavy restyle of `/services` (this vertical uses stacked sections, not tabs)
