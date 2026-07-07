# Root Live Files Migration Decision Precheck — 2026-07-07

**Task:** Task O — Batch 3B root `live/*.md` decision/precheck  
**Status:** decision/precheck only  
**Boundary:** no root `live/*.md` files were moved or edited in this batch.

## Files inspected

- `live/projects.md`
- `live/business.md`
- `live/decisions.md`
- `live/dashboard.md`
- `live/tasks.md`
- `live/video.md`
- `live/workflows.md`
- `system/reports/active-projects-migration-precheck-2026-07-07.md`

## Current decision summary

| Current path | Recommended target | Move readiness | Decision |
|--------------|--------------------|----------------|----------|
| `live/projects.md` | `projects/index.md` or merge into `projects/README.md` | Needs human decision | It is a compact project summary and rules page. Do not overwrite `projects/README.md` automatically. |
| `live/business.md` | `organizations/`, `knowledge/business.md`, or `system/reports/business-overview.md` | Needs human decision | It is a sparse business operating surface, not clearly one organization, project, or knowledge note. |
| `live/decisions.md` | `knowledge/decisions.md` | Likely safe later | Current committed decisions can probably move to durable knowledge after link/path review. |
| `live/dashboard.md` | `system/reports/dashboard.md` | Likely safe later | Brain Console is primary; this is a Markdown fallback/report surface, not durable project truth. |
| `live/tasks.md` | keep for now; later `system/reports/task-summary.md` or `inbox/processed/task-summary.md` | Hold | Batch 2B confirmed it is a report/summary surface and not the task source of truth. |
| `live/video.md` | `projects/video-orchestrator.md`, `repos/video-orchestrator.md`, or `knowledge/video-orchestrator.md` | Needs human decision | Large operating note with Brain repo, ProChat OS, and AWS boundaries. Needs owner/domain decision before moving. |
| `live/workflows.md` | `knowledge/workflows.md` or `system/workflows.md` | Needs human decision | Contains workflow overview plus stale target-path language for Save-to-Mind that should be corrected only in an approved move/update batch. |

## Files likely safe to move later

### `live/decisions.md` → `knowledge/decisions.md`

Rationale:

- contains accepted operating decisions;
- the target is already used in Brain compatibility planning;
- decision records are durable knowledge rather than project-only state.

Required later validation:

- search and update active links to `live/decisions.md`;
- confirm no project-specific decision needs splitting first;
- preserve all accepted decision text exactly unless explicitly approved.

### `live/dashboard.md` → `system/reports/dashboard.md`

Rationale:

- identifies Brain Console as primary and this page as Markdown fallback;
- describes runtime/report boundaries;
- belongs closer to system reports than projects or durable knowledge.

Required later validation:

- update active dashboard links;
- confirm Brain Console/plugin docs still point to the correct fallback;
- do not convert it into runtime truth.

## Files that need Steve decisions first

### `live/projects.md`

Open decision:

- Should it become `projects/index.md`?
- Should its concise rules merge into `projects/README.md`?
- Or should it remain as a temporary current-project report surface until all project migrations are complete?

Recommendation: create `projects/index.md` later, not a README merge, unless Steve wants `projects/README.md` to become both contract and active index.

### `live/business.md`

Open decision:

- Is this an organization overview?
- Is it durable business knowledge?
- Is it a system/report dashboard surface?

Recommendation: hold until organization migration planning decides how ProChat, Arkware, Yeshua Academy, clients, and business strategy should be represented under `organizations/` and `knowledge/`.

### `live/video.md`

Open decision:

- Is Video Orchestrator an active project under `projects/`?
- Is it repo memory under `repos/`?
- Is it durable operating knowledge under `knowledge/`?
- Or should it split into project note, repo note, and durable knowledge later?

Recommendation: hold. This file is large and cross-domain; moving it without classification risks hiding product/repo/runtime boundaries.

### `live/workflows.md`

Open decision:

- Should workflows be durable knowledge or system operating documentation?
- Should the Save-to-Mind target-path language be corrected during the move?

Recommendation: hold until Save-to-Mind path migration is ready, because the file still names `capture/inbox/` as the target internal folder.

## Files to hold for now

| Path | Hold reason |
|------|-------------|
| `live/tasks.md` | Report/summary surface tied to task migration. |
| `live/business.md` | Ambiguous target. |
| `live/video.md` | Cross-domain project/repo/knowledge decision needed. |
| `live/workflows.md` | Destination and Save-to-Mind wording decision needed. |
| `live/projects.md` | Needs index-vs-README decision. |

## Recommended next batch

Proceed with **Batch 3C — move safe root live files only** after approval:

```text
live/decisions.md -> knowledge/decisions.md
live/dashboard.md -> system/reports/dashboard.md
```

Do not move `live/tasks.md`, `live/business.md`, `live/video.md`, `live/workflows.md`, or `live/projects.md` until their decisions are resolved.

## Boundaries preserved in this precheck

- no root `live/*.md` files moved;
- no root `live/*.md` files edited;
- `wiki/log.md` untouched;
- `wiki/organisations/prochat/pitch-decks/` untouched;
- Save-to-Mind unchanged;
- continuous processing disabled.



## Batch 3C completion — 2026-07-07

The two likely-safe root live files were moved:

```text
live/decisions.md -> knowledge/decisions.md
live/dashboard.md -> system/reports/dashboard.md
```

Updates made:

- `knowledge/decisions.md` title changed from `Live Decisions` to `Decisions`;
- `system/reports/dashboard.md` links were updated for the new `system/reports/` location;
- held files remained unmoved: `live/projects.md`, `live/business.md`, `live/tasks.md`, `live/video.md`, and `live/workflows.md`.

Boundaries preserved:

- `wiki/log.md` untouched;
- `wiki/organisations/prochat/pitch-decks/` untouched;
- Save-to-Mind unchanged;
- continuous processing disabled.



## Batch 3D remaining live files decision request — 2026-07-07

Decision request note:

```text
system/reports/remaining-live-files-decision-request-2026-07-07.md
```

Outcome:

- no remaining root `live/*.md` file was safe to move automatically;
- `live/projects.md`, `live/business.md`, `live/tasks.md`, `live/video.md`, and `live/workflows.md` remain in place;
- exact Steve choices are documented in the decision request note;
- recommended next migration batch is Batch 4 — Organizations migration planning/precheck.
