# Active Projects Migration Precheck — 2026-07-07

**Task:** Task O — Batch 3 active projects migration planning/precheck  
**Status:** planning/precheck only  
**Boundary:** no `live/` project or current-state files were moved or edited in this batch.

## Files inspected

- `live/projects/`
- `live/projects.md`
- `live/business.md`
- `live/decisions.md`
- `live/dashboard.md`
- `live/tasks.md`
- `live/video.md`
- `live/workflows.md`
- `projects/README.md`
- `system/reports/top-level-folder-migration-batch-plan-2026-07-07.md`

## Inventory summary

`live/projects/` contains two active project groups with eight Markdown files:

```text
live/projects/prochat-qa-memory/
live/projects/tiny-word-play/
```

Current-state files inspected at `live/` root:

```text
live/projects.md
live/business.md
live/decisions.md
live/dashboard.md
live/tasks.md
live/video.md
live/workflows.md
```

## Classification table

| Current path | Proposed target | Classification | Safe later move? | Notes |
|--------------|-----------------|----------------|------------------|-------|
| `live/projects/prochat-qa-memory/` | `projects/prochat-qa-memory/` | Active product/project documentation | Likely yes | Project group with demo, product spec, strategy plan, and implementation plan. Move as one exact folder batch after link search. |
| `live/projects/tiny-word-play/` | `projects/tiny-word-play/` | Active product/project documentation | Likely yes | Project group with validation, summary, strategy, and live reference. Move as one exact folder batch after link search. |
| `live/projects.md` | `projects/index.md` or merge into `projects/README.md` | Compact active project index | Human decision | It summarizes active projects and rules; could become an index or be merged into README. Do not overwrite `projects/README.md` automatically. |
| `live/business.md` | `organizations/`, `knowledge/business.md`, or `system/reports/business-overview.md` | Business operating surface | Human decision | Points to current business work and durable business knowledge; may be an organization overview, knowledge note, or report surface. |
| `live/decisions.md` | `knowledge/decisions.md` | Current committed decisions | Likely yes, after link review | Contains current accepted decisions. Do not split by project until decision type is reviewed. |
| `live/dashboard.md` | `system/reports/dashboard.md` or `inbox/processed/dashboard.md` | Markdown fallback dashboard/report surface | Human decision | Brain Console is primary. This is probably a system/report fallback, not a project. |
| `live/tasks.md` | keep for now; later `system/reports/task-summary.md` or `inbox/processed/task-summary.md` | Task report/summary surface | No immediate move | Batch 2B decided it remains report/summary and not source of truth. |
| `live/video.md` | `projects/video-orchestrator.md`, `repos/video-orchestrator.md`, or `knowledge/video-orchestrator.md` | Large Video Orchestrator operating note | Human decision | Contains current workflow strategy and execution boundaries. It references Brain implementation and ProChat OS/AWS ownership. Needs Steve/Brain-side classification before moving. |
| `live/workflows.md` | `knowledge/workflows.md` or `system/workflows.md` | Workflow overview and Save-to-Mind path note | Human decision | Contains workflow families and current Save-to-Mind internal target text. Should not be moved without updating target-path language. |

## Recommended Batch 3A — move active project folders only

Start with only the two `live/projects/` subfolders:

| From | To |
|------|----|
| `live/projects/prochat-qa-memory/` | `projects/prochat-qa-memory/` |
| `live/projects/tiny-word-play/` | `projects/tiny-word-play/` |

Why this is the safest first move:

- both are clearly project groups;
- `projects/README.md` already defines the target location;
- Brain compatibility already supports `projects/` as a target project prefix;
- the move avoids ambiguous root `live/*.md` files;
- it does not touch tasks, Save-to-Mind, `wiki/log.md`, Graphify, or organizations.

Validation for Batch 3A:

1. search for references to `live/projects/prochat-qa-memory` and `live/projects/tiny-word-play`;
2. move each folder with exact paths;
3. update active links in docs or index files only;
4. verify no project files were edited beyond path/link updates;
5. stage only moved project folders and related docs;
6. keep `live/projects.md` until it can be converted or merged safely.

## Files needing human decision before movement

- `live/projects.md` — decide whether it becomes `projects/index.md`, merges into `projects/README.md`, or stays as a report surface until project migration completes.
- `live/business.md` — decide whether it is an organization surface, durable business knowledge, or system/report overview.
- `live/dashboard.md` — decide whether it becomes a system report, dashboard fallback, or obsolete after Brain Console validation.
- `live/video.md` — decide whether the note belongs under a project, repo, organization/product area, or durable knowledge.
- `live/workflows.md` — decide whether this belongs under `knowledge/`, `system/`, or a report/operations surface; update stale target-path language when moved.
- `live/tasks.md` — keep as report/summary until task migration decision is complete.

## Paths to hold legacy for now

| Path | Reason |
|------|--------|
| `live/projects.md` | Compact index needs merge/index decision. |
| `live/business.md` | Ambiguous target. |
| `live/dashboard.md` | Markdown fallback dashboard; Brain Console dependency. |
| `live/tasks.md` | Task report/summary surface; Batch 2B says do not migrate with source-of-truth task files. |
| `live/video.md` | Large current operating note needing classification. |
| `live/workflows.md` | Needs destination and Save-to-Mind wording review. |

## Recommendation

Proceed next with **Batch 3A — Active project folder move** for only:

```text
live/projects/prochat-qa-memory/ -> projects/prochat-qa-memory/
live/projects/tiny-word-play/ -> projects/tiny-word-play/
```

Do not move root `live/*.md` files until the human-decision items above are resolved.



## Batch 3A completion — 2026-07-07

The two clear active project folders were moved to the target `projects/` root:

```text
live/projects/prochat-qa-memory/ -> projects/prochat-qa-memory/
live/projects/tiny-word-play/ -> projects/tiny-word-play/
```

Validation evidence:

- eight project files are present under `projects/`;
- the legacy source project folders no longer exist;
- root `live/*.md` files were not moved;
- one stale self-location field was updated in `projects/prochat-qa-memory/STRATEGY-PLAN.md`;
- `wiki/log.md` was not touched;
- unrelated `wiki/organisations/prochat/pitch-decks/` was not touched;
- Save-to-Mind remains unchanged;
- continuous processing remains disabled.

Remaining Batch 3 decisions are still limited to root `live/*.md` files.
