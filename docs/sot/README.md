# JDM Web Source of Truth

This folder is the canonical Source of Truth for cloning the **JDM Reference Implementation — Garage Door Vertical** into future trade websites.

Template identity: **JDM Web Template v1** (sealed; see [ARCHITECTURE.md](./ARCHITECTURE.md#template-versioning)).

```text
origin: JDM Web Template v1
vertical: garage-door
```

Do not add competing SoTs. If a topic already has an owner below, update that file.

| Document | Owns |
| --- | --- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Layers, boundaries, shared-vs-vertical matrix, coupling audit, versioning |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Visual tokens, geometry, responsive rules, accessibility |
| [VERTICAL_SCHEMA.md](./VERTICAL_SCHEMA.md) | Contract every trade must satisfy before instantiation |
| [ROUTES_AND_CONTENT.md](./ROUTES_AND_CONTENT.md) | Canonical page types and who writes their content |
| [ASSETS.md](./ASSETS.md) | Image naming, dimensions, responsive slots |
| [REPLICATION_RUNBOOK.md](./REPLICATION_RUNBOOK.md) | Deterministic clone process and launch validation |

This is documentation only. It is not a CMS, theme engine, or multi-tenant platform.
