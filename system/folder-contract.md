# Mind Folder Contract

This document records the current top-level Mind structure and root cleanliness rules.

**Last verified:** 2026-06-18

## Root purpose

The Mind root is the orientation layer. It should stay small, stable, and human-readable.

Allowed root files:

- `home.md` — primary user manual and navigation entry point.
- `kanban.md` — current daily task board and task source of truth.
- `.gitignore` — Git ignore rules.
- `.graphifyignore` — Graphify exclusion rules.
- `.DS_Store` — local macOS metadata when present; not meaningful knowledge.

Generated captures, transcripts, reports, research drafts, and automation dumps should not be written to the repository root.

## Current top-level folders

Verified filesystem scan (2026-06-18):

### Highly sensitive — do not rename without a full dependency audit

| Folder | Purpose | Why sensitive |
|--------|---------|---------------|
| `capture/` | Save-to-Mind inbox, failed captures, and capture groupings | Brain Core, Mind Steward, Save-to-Mind, and AI Model Selector all reference `capture/inbox/` and `capture/failed/` by exact path |
| `capture/inbox/` | Unprocessed incoming captures | Brain Core inbox queue reads this path; queue state path is hardcoded relative to mindRoot |
| `capture/failed/` | Failed capture routing target | Brain bridge contract and queue policy reference this path |
| `system/` | Mind operating documentation, contracts, reports, and future automation notes | Contains canonical chain (`infinite-brain-philosophy.md` → `mind-strategy.md` → `mind-roadmap.md` → `mind-implementation-plan.md`); referenced by Brain Core adapters and maintenance reports |
| `router/` | Mind Steward and AI handoff/startup contracts | AI session startup protocol reads `router/AGENTS.md`, `router/00-start-here.md`, `router/00-current-context.md`, `router/00-memory-map.md` by exact path |
| `home.md` | Primary human user manual and navigation entry point | Referenced by `live/dashboard.md` and system documentation; canonical first-read entrypoint |
| `kanban.md` | Current task source of truth | Protected by task-kanban-contract; must not be renamed until lossless task-sync migration is validated |
| `wiki/log.md` | Pending proposals and maintenance review surface | Referenced in maintenance bridge contract and automation-roadmap as the proposal inbox |

### Stable semantic roots — rename only with link and config migration

| Folder | Purpose | Rename cost |
|--------|---------|-------------|
| `live/` | Active current-state information: projects, decisions, dashboards | `home.md` and `live/dashboard.md` cross-reference; Obsidian links use this path |
| `wiki/` | Durable compiled knowledge distilled from captures and sources | `home.md`, Obsidian links, and Brain bridge contract reference this root |
| `sources/` | Raw evidence, research, files, books, papers, and source material | Brain approved write flows reference `sources/` prefix by exact path; renaming breaks write gating |
| `archive/` | Legacy, completed, superseded, or historical material | Brain approved supersede/archive write flow targets `archive/` prefix; renaming breaks write gating |

### Generated output — do not rename without updating Graphify config

| Folder | Purpose | Automation dependency |
|--------|---------|----------------------|
| `graphify-out/` | Generated Graphify graph output | **Actual folder name on disk.** `system/graph-visualization-contract.md` references `.graphify-out/` (with leading dot), but the actual filesystem folder is `graphify-out/` without the dot. Brain Core and Graphify refresh commands should use the actual path. Do not rename without auditing all Graphify config references. |

**Note on `.graphify-out/` vs `graphify-out/`:** The graph-visualization contract was written when the output folder had a leading dot. The current filesystem has `graphify-out/` (no dot). Before any Graphify refresh, verify which name Graphify is configured to write to. The contract should be updated to match the actual filesystem once the correct name is confirmed.

### Reserved but inactive

| Folder | Purpose | Status |
|--------|---------|--------|
| `tasks/` | Reserved for future structured task records | Currently inactive; contains only a README. Do not make active until lossless task-sync migration is validated per task-kanban-contract and task-sync-spec. |
| `tools/` | Mind-local scripts and utilities | Active; contains `export-kanban-tasks.mjs` and related tools. Automation does not currently depend on this path by name, but renaming would break tool invocations. |

## Root write rule

Unknown or unclassified incoming material must go to:

```text
capture/inbox/
```

If processing fails, it should go to:

```text
capture/failed/
```

If material is distilled into durable knowledge, it should be linked or moved into the documented destination while preserving source references when useful.

## README rule

Every important top-level folder should have either:

1. a `README.md`; or
2. a clearly named index file that serves the same purpose.

Empty folders should either be removed later or given a README that explains what will populate them.

## Safety rule

Do not move, rename, or delete folders until dependencies are checked for:

- Save-to-Mind;
- Mind Steward;
- Brain Core or scheduler references;
- AI Model Selector references;
- Graphify refresh commands;
- Obsidian links and plugin assumptions;
- video/transcript capture paths;
- Kanban/task references.
