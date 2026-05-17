# Mind OS Implementation Plan

**Date:** 2026-05-16
**Status:** ready for execution planning
**Roadmap:** `MIND-OS-ROADMAP.md`

## Objective

Migrate this Obsidian vault from the current numbered PARA structure into a clean unnumbered Mind OS structure maintained by the model router and connected to Brain Core.

## Execution Status

This document records the planning snapshot only. No folder moves, n8n workflow changes, or router implementation changes have been performed yet.

## Confirmed Choices

- Use clean folder names, not numeric prefixes.
- Use Obsidian manual sorting/custom-sort plugin for visual folder order.
- Keep Save-to-Mind as the permanent capture doorway.
- Keep the public webhook `/mind-inbox` stable.
- Move new Save-to-Mind captures from `01-inbox/` to `capture/inbox/` after the new structure exists.
- Keep old folders during migration; archive later after validation.
- Let the model router compile old content into `live/`, `wiki/`, and `sources/` before moving legacy folders.

## 11-Step Migration Plan

### 1. Document the new mind architecture in brain

Brain owns machine-level architecture and model-router implementation docs.

Status: planned in `brain/docs/system/`.

### 2. Create matching migration plan in mind

Create:

```text
MIND-OS-ROADMAP.md
MIND-OS-IMPLEMENTATION-PLAN.md
```

These are human-facing Obsidian docs for the migration.

### 3. Update Save-to-Mind docs to target `capture/inbox/`

This happens first in brain documentation, then in the live n8n workflow after the folder structure exists.

Target:

```text
capture/inbox/
```

Failure target:

```text
capture/failed/
```

### 4. Create new folders beside old folders

Create:

```text
router/
capture/inbox/
capture/daily/
capture/failed/
live/
wiki/
sources/
archive/
```

Do not delete or move old numbered folders yet.

### 5. Create router contract files

Create:

```text
router/current.md
router/map.md
router/rules.md
router/taxonomy.md
router/maintenance.md
router/model-router.md
```

Purpose:

- `current.md` — short-term context
- `map.md` — where the model router should search
- `rules.md` — write rules and safety boundaries
- `taxonomy.md` — allowed note types, domains, tags
- `maintenance.md` — loop definitions, size limits, drift checks
- `model-router.md` — human-readable router contract

### 6. Build model-router project in brain

The implementation belongs in `brain/projects/model-router/`.

This vault only stores the router contract and knowledge.

### 7. Update n8n Save-to-Mind target path

After the new folders exist, update n8n to write new captures to:

```text
capture/inbox/
```

Keep endpoint:

```text
/webhook/mind-inbox
```

Test with a real capture before moving further.

### 8. Add capture failure buffer

Gemini or classification failures should write raw recoverable notes to:

```text
capture/failed/
```

The model router should retry or report failures.

### 9. Build daily maintenance loops in the Office nightly scheduler

The scheduler lives in brain and should eventually run:

```text
mind-compile-loop
mind-memory-loop
mind-hygiene-loop
mind-drift-error-loop
```

Expected effects:

- compile captures and sources into wiki
- refresh short-term context
- dedupe and prune tasks/captures
- detect folder drift, schema issues, stale files, broken links, and failed captures

### 10. Compile old PARA content into the new structure

The model router should compile old content into clean pages:

```text
02-strategy/ -> wiki/organisations.md + live/decisions.md
03-projects/ -> live/projects.md
04-tasks/ -> live/tasks.md
05-areas/ -> wiki/*.md
06-resources/ -> sources/ and wiki/
08-archive/ -> archive/
```

Old content remains available as legacy reference until validated.

### 11. Archive old numbered folders after validation

Only after the new system is working:

```text
01-inbox/ -> archive/old/legacy-01-inbox/
02-strategy/ -> archive/old/legacy-02-strategy/
03-projects/ -> archive/old/legacy-03-projects/
04-tasks/ -> archive/old/legacy-04-tasks/
05-areas/ -> archive/old/legacy-05-areas/
06-resources/ -> archive/old/legacy-06-resources/
07-templates/ -> archive/old/legacy-07-templates/
08-archive/ -> merge into archive/old/
```

## Initial Folder Order in Obsidian

Use manual sorting plugin to display:

```text
router
capture
live
wiki
sources
archive
```

Root files stay at the top through bookmarks or the Obsidian dashboard:

```text
HOME.md
TODAY.md
```

## Router Maintenance Loops

### Compile loop

Inputs:

```text
capture/inbox/
sources/
```

Outputs:

```text
wiki/
sources/index.md
live/decisions.md when something becomes committed
live/tasks.md when action is needed
```

### Memory loop

Maintains:

```text
router/current.md
TODAY.md
wiki/index.md
```

Purpose: keep short-term memory fresh and long-term memory compact.

### Hygiene loop

Checks:

```text
duplicate tasks
stale captures
oversized files
orphan notes
broken links
unprocessed sources
old inbox items
```

### Drift/error loop

Checks:

```text
expected folders exist
frontmatter schema is valid
Save-to-Mind target path is correct
failed captures are not stuck
Brain Core is reachable
scheduler latest-run is fresh
```

## File Size Rules

The router should prevent slow, bloated files:

```text
router/current.md      max 150 lines
TODAY.md               max 200 lines
live/tasks.md          max 300 lines
live/projects.md       max 250 lines
wiki/*.md              target max 500 lines
capture/inbox/         no files older than 7 days
capture/failed/        no files older than 3 days without retry/review
```

## Safe Migration Rules

- Do not move/delete old numbered folders until the new structure is validated.
- Do not break Save-to-Mind.
- Do not rewrite `KANBAN.md` during this migration unless explicitly planned.
- Do not store secrets in mind.
- Do not duplicate machine runtime state in mind; Brain Core remains machine truth.
- Prefer generated summaries and indexes over many tiny notes.

## Validation Checklist

Before live migration:

- [ ] New folders exist.
- [ ] Router contract files exist.
- [ ] Save-to-Mind still works with old path.
- [ ] Model-router dry run can inspect old structure.
- [ ] Obsidian manual sorting works.

After live migration:

- [ ] New Save-to-Mind capture lands in `capture/inbox/`.
- [ ] Failed capture lands in `capture/failed/`.
- [ ] Router processes a capture into `wiki/` or `live/`.
- [ ] `HOME.md` points to the new surfaces.
- [ ] Scheduler loop reports are visible through Brain Core or linked reports.

## Definition of Done

The migration is complete when:

- Daily use starts from `HOME.md` and `TODAY.md`.
- New captures land in `capture/inbox/`.
- The model router maintains `router/`, `live/`, `wiki/`, and `sources/`.
- Old numbered folders are archived or legacy-only.
- The user no longer needs to think about where notes go.
- The vault gets cleaner, faster, and more useful over time.


## Next Conversation Handoff Prompt — 2026-05-17

Use this prompt to continue the Brain + Mind roadmap in a new conversation:

```text
Please continue from the Brain and Mind handoffs. First read, in brain: docs/system/brain-mind-roadmap-handoff-2026-05-17.md, docs/system/brain-mind-roadmap-agent-handoff-2026-05-17.md, operations/specs/brain-core-first-action-feature-flag.md, operations/runbooks/brain-core-approval-gates.md, and operations/runbooks/brain-core-first-action-incident-response.md. Then read, in mind: MIND-OS-HANDOFF-2026-05-17-CONTINUATION.md, MIND-OS-ROADMAP.md, and MIND-OS-IMPLEMENTATION-PLAN.md. Verify git status in both repos. Treat the latest Brain pushed commit as d2b5ae96 and the latest known Mind pushed commit as 6def53a. Do not stage unrelated Claude plan cleanup, Firecrawl logs, or Mind .obsidian plugin/config state unless explicitly reviewed. Continue the roadmap from the documented state, preserving the safety boundaries: no broad shell runner, no model-router writes to Mind, no runtime logs/secrets in Mind, and no plugin install into Mind without approval. Validate before committing and push only reviewed, tested changes.
```

Current Mind caution: do not stage `.obsidian/community-plugins.json` or `.obsidian/plugins/**` without explicit path-by-path review.