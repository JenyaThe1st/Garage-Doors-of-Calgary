# Vertical Schema

Owner: the contract for defining a trade. No Garage Door values are required fields.

A vertical is **not** a runtime config object today. It is the information that must exist before anyone clones the reference app. When the second site is prepared, this contract should be filled as a checklist (and later a single `data/vertical.ts` module) — not as a CMS.

---

## 1. Required tree

```text
Brand
└── JDM Solutions                    # Core brand; same lockup unless brand policy changes

Vertical
├── identity
│   ├── name                         # Customer-facing trade name, e.g. "Windows"
│   ├── slug                         # url-safe, e.g. "windows"
│   ├── legalName                    # If different from siteConfig.businessName
│   └── domain                       # https host, no path
├── contact
│   ├── phoneDisplay
│   ├── phoneTel                     # digits only, used to build tel:+1
│   ├── email
│   └── hours / availability labels
├── serviceArea
│   ├── primary
│   ├── surrounding[]
│   ├── radiusLabel                  # e.g. "50 km"
│   └── coverageSentence
├── services
│   ├── homepageCards[]              # grid on /
│   ├── overviewCategories[]         # stacked sections on /services (2–n)
│   └── footerList[]                 # short names in footer
├── seo
│   ├── title
│   ├── description
│   ├── ogImage
│   └── schema                       # LocalBusiness + optional specialty / offers
├── cta
│   ├── primaryLabel                 # usually Call Now
│   ├── primaryHref                  # tel:
│   ├── secondaryLabel
│   └── secondaryHref                # /#final-cta or /contact
├── navigation                       # default Home / Services / Contact
├── copy                             # hero, why-us, final CTA, page intros
└── assets                           # see ASSETS.md
```

Brand is Core. Everything under Vertical is configuration + content.

---

## 2. Field contract

### identity

| Field | Type | Rules |
| --- | --- | --- |
| `name` | string | Trade noun customers use. Not the legal company name. |
| `slug` | kebab-case | Unique across JDM sites. Used in package name, repo name, template stamp. |
| `domain` | absolute origin | Sets `NEXT_PUBLIC_SITE_URL` / `metadataBase`. |
| `businessName` | string | Defaults to JDM legal name already in the reference (`JDM Solution` in this repo). |

### contact

Must be explicit even if identical to Garage Door. Silent inheritance is how the wrong phone ships.

| Field | Maps today |
| --- | --- |
| `phoneDisplay`, `phoneTel`, `email` | `data/siteConfig.ts` |
| `availabilityLabel`, `hoursLabel` | `siteConfig` + contact info list |
| `experience` | `siteConfig.experience` (metrics + why-us title derive from this) |

### serviceArea

| Field | Maps today |
| --- | --- |
| `primary`, `surrounding[]`, `radius` | `siteConfig.serviceAreas` + `data/serviceAreas.ts`; metrics radius derives from `radius` |
| `coverageLabel` | Contact “Coverage” row |

Do not assume Calgary. A future vertical may share the same list; it still must be **written down**.

### services

Three lists on purpose. They serve different UX surfaces and may differ in length and wording.

**homepageCards[]**

```text
id, title, description, image, imageAlt, futureRoute?
```

Matches `data/services.ts`. Count is free (this reference uses 9). `futureRoute` is optional and must not be linked until that page exists.

**overviewCategories[]**

```text
id, title, description, items[], image, imageAlt, imageWidth, imageHeight, panelBackground, panelTone
```

Matches `data/serviceOverview.ts`. Count is **2–n**, not fixed at 3. Panel tones exist so light/dark text works; hex values are vertical design, not Core tokens.

`servicesBanner` (heading + mobile/tablet/desktop paths) also lives in this file. It is the `/services` page chrome, not a fourth service catalog.

**footerList[]**

Short strings only (`data/footerServices.ts`). Not required to equal either list above, but must not contradict them.

### seo

| Field | Rules |
| --- | --- |
| `title` | `siteConfig.seo.title`. Must include trade + primary city + brand. |
| `description` | `siteConfig.seo.description`. Include phone and hours if the reference pattern is kept. |
| `pages.services` / `pages.contact` | `siteConfig.seo.pages.*` — page titles/descriptions. |
| `ogImage` | `siteConfig.seo.ogImage` (+ width/height/alt). |
| `schema.@type` | Default `LocalBusiness`. Specialize later (`Locksmith`, etc.) only with accurate Schema.org types. |
| `schema.areaServed` | From serviceArea. |
| `schema.hasOfferCatalog` | Optional; recommended before launch if services are stable. |

### cta

Primary is almost always `tel:`. Secondary is in-page or `/contact`. Labels may change (“Book a measure”, “Request a quote”) without changing Button geometry.

### navigation

Default:

```text
Home -> /
Services -> /services
Contact -> /contact
```

Add an item only if the trade has a real page. Do not add dead `futureRoute` links.

### copy

Required blocks:

- Hero headline, supporting sentence, image alts — `data/home.ts`
- Homepage services intro — `data/home.ts`
- Why Choose Us items (reasons must be true for that trade) — `data/whyChooseUs.ts`
- Final CTA headline + sentence — `data/home.ts`
- `/services` intro is `servicesBanner.heading` plus per-category copy
- `/contact` heading pattern: `Contact {businessName}`

### assets

See [ASSETS.md](./ASSETS.md). A vertical is not instantiable until required slots exist as real files.

---

## 3. Stress tests (other trades)

The schema is valid only if Windows, Locks, and Decks can be expressed **without** pretending they are garage doors.

### Windows — install, replace, repair

| Surface | Example fill |
| --- | --- |
| `homepageCards` | Fogged-glass replacement, frame repair, new vinyl install, hardware, sealing — **any count** |
| `overviewCategories` | Repair / Replacement / New Installation (or Repair / Install only) |
| `items[]` | “Failed IGU”, “Sill rot”, “Egress windows” — not springs/cables |
| before/after | Optional; useful for replacements |
| CTA | “Request a window quote” is a valid secondary label |

No Core change required if copy and images live in data. The three-category fade on `/services` still works with two or four categories (last panel has no fade-to).

### Locks — install, replace, hardware, repair

| Surface | Example fill |
| --- | --- |
| `homepageCards` | Rekey, deadbolt install, smart lock, commercial hardware, panic bars |
| `overviewCategories` | Residential / Commercial / Repair — **or** Locks / Hardware / Access |
| Schema | May later use a more specific type; still valid as `LocalBusiness` |
| before/after | Often omit; not a Core requirement |
| Hero | Problem-led (“Locked out?”) is still the same Hero **shell** |

Locks do not have “panels and tracks”. The overview `items[]` list is unstructured strings — that is enough. Do not add a parts taxonomy to Core for this.

### Decks — new build, repair, maintenance

| Surface | Example fill |
| --- | --- |
| `homepageCards` | New builds, refinishing, structural repair, railing, stairs |
| `overviewCategories` | New Construction / Repair / Maintenance |
| `serviceArea` | Same cities or a tighter list — still the same fields |
| CTA | “Book a site visit” |
| Assets | Lifestyle/job-site photos; same slots, different files |

Decks are seasonal and project-based. Hours and “same-day” metrics must be **honest** in `metrics` / why-us. The schema allows that because those fields are vertical, not Core claims.

If a trade cannot fill `overviewCategories` with at least two truthful groups, do not fake a third “Miscellaneous” category. Use two.

---

## 4. Instantiation gate

A vertical may be cloned only when all of the following exist as written decisions (spreadsheet, PR description, or future `data/vertical.ts`):

1. identity.slug + identity.domain
2. contact (even if identical to another JDM site)
3. serviceArea
4. all three service lists
5. seo.title + seo.description
6. hero + final CTA copy
7. required assets present on disk
8. contamination scan terms (old trade name, old domain, old phone if different)

Missing any item is a **failure condition** in the runbook, not something to invent during implementation.
