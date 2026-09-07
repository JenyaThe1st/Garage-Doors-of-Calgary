# Routes and Content

Owner: canonical page types and which layer writes their content.

---

## Canonical routes (Template v1)

| Route | Type | Purpose | Content owner |
| --- | --- | --- | --- |
| `/` | Page | Conversion homepage | Vertical copy + assets; Core section shells |
| `/services` | Page | Scroll overview of trade categories | Vertical categories + images; Core section layout |
| `/contact` | Page | Message + contact facts | Core form; Vertical heading/metadata; Config contact values |
| `/api/contact` | Route handler | POST intake | Core; Config email/phone |
| `#final-cta` | In-page | Final CTA section (not the Hero Request Service target) | Vertical copy; Core section |
| `#main-content` | Skip target | A11y | Core |
| `#services` | Homepage anchor | Still on `/` service grid | Vertical cards |

Not in v1 (do not invent on clone unless the vertical has approved pages):

- Per-service routes (`futureRoute` in `data/services.ts` is documentation only)
- Blog / FAQ routes
- Legal pages (add as Core later if required for all sites)

Present in Template v1:

- `app/sitemap.ts` — indexable paths from `getIndexablePaths()` (`/`, `/services`, `/contact`)
- `app/robots.ts` — allows `/`, disallows `/api/`, sitemap via `getSiteUrl()`
- Page `alternates.canonical` on `/`, `/services`, `/contact` resolved against `metadataBase`

---

## Homepage `/`

Order in `app/page.tsx`:

1. Hero
2. Services grid
3. Before/after (omit only if the vertical has no honest pairs)
4. Why Choose Us
5. Final CTA

| Block | Core | Vertical |
| --- | --- | --- |
| Hero | Layout, image pair, buttons | `data/home.ts` `homeHero`; Request Service href from `siteConfig.ctas.secondary` (`/contact`) |
| Services | Card grid + metrics phone bar | `data/services.ts` cards + `data/home.ts` `homeServices` |
| Before/after | Slider | `data/beforeAfter.ts` |
| Why Choose Us | Split layout | `data/whyChooseUs.ts` |
| Final CTA | Centered dark band + tel button | `data/home.ts` `homeFinalCta` |

---

## Services `/services`

Order in `app/services/page.tsx`:

1. Banner (`servicesBanner` in `data/serviceOverview.ts`)
2. Category sections (data-driven)
3. Final CTA (same Core component)

Mobile/tablet content order per category (must survive clone):

```text
Heading → Image → Description → Checklist
```

Desktop (`xl`): ~50/50; odd sections may put the image on the right (`imageOnRight`).

Do not implement tabs, accordions, or hidden service content.

---

## Contact `/contact`

Core: two `FooterPanel`s (info + form), UTM query passthrough into the form.

Vertical: page title/description; displayed business name.

Config: every value on `ContactInfoList`.

Form fields are Core and stay the same across trades: first name, last name, phone, address, email, message, honeypot.

---

## Metadata and structured data

| Surface | Writer |
| --- | --- |
| Root `metadata` | `getMetadataTitle` / `getMetadataDescription` return `siteConfig.seo` |
| `/services` `metadata` | `siteConfig.seo.pages.services` |
| `/contact` `metadata` | `siteConfig.seo.pages.contact` |
| Open Graph image | `siteConfig.seo.ogImage` (+ alt/dimensions) |
| Canonical / sitemap host | `getSiteUrl()` (`NEXT_PUBLIC_SITE_URL` or localhost) |
| JSON-LD | `LocalBusinessSchema` from `siteConfig` |

Clones rewrite `siteConfig.seo` and related data. Helpers stay.

---

## Service data ownership

Three catalogs on purpose. Do not merge them.

| Catalog | File | Surface | Shape |
| --- | --- | --- | --- |
| Homepage cards | `data/services.ts` | `/` grid | Image + title + blurb; optional unlinked `futureRoute` |
| Overview categories | `data/serviceOverview.ts` | `/services` | 2–n groups with checklist + panel tone |
| Footer labels | `data/footerServices.ts` | Footer | Short marketing names |

They must not contradict what the company sells. They are allowed to differ in count and wording. Drift is prevented by review in the runbook, not by a shared array.

---

## Content that must not be shared blindly

- Any sentence containing the previous trade noun
- `futureRoute` slugs
- Image alts
- Footer service list
- Why-us claims that are untrue for the new trade (e.g. “same-day” on a deck-build site)
