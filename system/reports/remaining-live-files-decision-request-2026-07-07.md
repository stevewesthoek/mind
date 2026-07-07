# Remaining Live Files Decision Request — 2026-07-07

**Task:** Task O — Batch 3D remaining root `live/*.md` decision resolution  
**Status:** decision request only  
**Boundary:** no remaining root `live/*.md` file was moved or edited in this batch.

## Files inspected

- `live/projects.md`
- `live/business.md`
- `live/tasks.md`
- `live/video.md`
- `live/workflows.md`
- `system/reports/root-live-files-migration-decision-precheck-2026-07-07.md`

## Decision

No remaining root `live/*.md` file is safe to move automatically in Batch 3D.

Reasons:

- each remaining file either has an ambiguous target, depends on another migration, or contains wording that should not be silently changed;
- `live/tasks.md` is explicitly tied to task migration and must not move until task source handling is approved;
- `live/workflows.md` still contains Save-to-Mind path wording and should not be moved while Save-to-Mind remains legacy;
- `live/video.md` is large and cross-domain, combining project, repo, system, AWS, and durable workflow content;
- `live/business.md` needs an organization-vs-knowledge-vs-report decision;
- `live/projects.md` needs an index-vs-README decision.

## Exact choices needed from Steve

### 1. `live/projects.md`

Choose one:

A. Move to `projects/index.md` as the active project index.  
B. Merge concise rules into `projects/README.md` and retire the live file.  
C. Keep it temporarily until all project migration batches finish.

Recommendation: **A — move to `projects/index.md`** in a later batch, preserving `projects/README.md` as the folder contract.

### 2. `live/business.md`

Choose one:

A. Move to `organizations/business.md` as a broad business operating overview.  
B. Move to `knowledge/business.md` as durable business knowledge.  
C. Move to `system/reports/business-overview.md` as a dashboard/report surface.  
D. Hold until organization migration decides how ProChat, Arkware, Yeshua Academy, clients, and business strategy should be represented.

Recommendation: **D — hold** until organization migration planning, because this file points to current work and durable business knowledge but is not itself clearly one organization.

### 3. `live/tasks.md`

Choose one:

A. Keep in `live/` until `kanban.md`/`tasks.md` source-of-truth migration is approved.  
B. Move to `system/reports/task-summary.md` as a task summary/report surface.  
C. Move to `inbox/processed/task-summary.md` as a review/proposal surface.

Recommendation: **A — keep in `live/` for now** until task migration is approved.

### 4. `live/video.md`

Choose one:

A. Move the whole note to `projects/video-orchestrator.md`.  
B. Move the whole note to `repos/video-orchestrator.md`.  
C. Move the whole note to `knowledge/video-orchestrator.md`.  
D. Split later into project note, repo note, and durable workflow/architecture knowledge.

Recommendation: **D — split later**. The file contains project status, Brain repo implementation references, AWS execution details, metadata contracts, safety rules, and durable workflow design.

### 5. `live/workflows.md`

Choose one:

A. Move to `knowledge/workflows.md` and update stale Save-to-Mind wording in the same batch.  
B. Move to `system/workflows.md` as operating documentation and update stale Save-to-Mind wording in the same batch.  
C. Hold until Save-to-Mind target migration from `capture/inbox/` to `inbox/new/` is ready.

Recommendation: **C — hold** until Save-to-Mind path migration is ready.

## Recommended next migration batch

Proceed next with **Batch 4 — Organizations migration planning/precheck**, not more root `live/` moves.

The remaining `live/` files should stay as compatibility/current-state surfaces until Steve makes the decisions above.

## Boundaries preserved

- no remaining root `live/*.md` files moved;
- no remaining root `live/*.md` files edited;
- `wiki/log.md` untouched;
- `wiki/organisations/prochat/pitch-decks/` untouched;
- Save-to-Mind unchanged;
- continuous processing disabled.
