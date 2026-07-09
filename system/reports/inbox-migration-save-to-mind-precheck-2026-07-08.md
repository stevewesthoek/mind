# Inbox Migration and Save-to-Mind Switch Precheck — 2026-07-08

**Task:** Task O — Batch 8 inbox migration and Save-to-Mind switch precheck  
**Status:** precheck only  
**Boundary:** no capture or inbox content moved; Save-to-Mind not switched.

## Current state verified

Latest completed commit before this precheck:

```text
e5790f7 docs: finalize resources migration
```

Starting dirty status contained only known unrelated paths:

```text
 M wiki/log.md
?? Untitled.canvas
?? wiki/organisations/prochat/pitch-decks/
```

These paths were not touched or staged. `sources/.DS_Store` was also not touched.

## Capture and inbox inventory

### Legacy capture tree

`capture/` exists and currently contains:

| Path | Status | Classification |
|------|--------|----------------|
| `capture/README.md` | exists | legacy capture lifecycle documentation |
| `capture/inbox/` | exists; 19 Markdown files | new/unreviewed successful captures and verification captures |
| `capture/failed/` | exists; 3 Markdown files | failed/recoverable capture evidence |
| `capture/daily/` | exists; 1 README | daily capture grouping; target needs human decision |
| `capture/.DS_Store` | exists | local generated/app metadata; do not migrate as content |

Recursive count for `capture/`:

| Metric | Count |
|--------|-------|
| Directories | 3 |
| Files | 25 |
| Markdown files | 24 |
| `.DS_Store` files | 1 |
| Zero-byte files | 1 |

### New inbox target tree

`inbox/` exists and currently contains README-only target folders:

```text
inbox/README.md
inbox/new/README.md
inbox/raw/README.md
inbox/processed/README.md
inbox/failed/README.md
```

Recursive count for `inbox/`:

| Metric | Count |
|--------|-------|
| Directories | 4 |
| Files | 5 |
| Markdown files | 5 |

No capture content was moved into these target folders during this precheck.

## Current routing references

Search terms checked:

```text
Save-to-Mind
capture/inbox
capture/failed
inbox/new
inbox/failed
continuous processing
```

Findings:

- `capture/inbox` remains referenced in `.obsidian/app.json`, `capture/README.md`, `capture/inbox/README.md`, and active agent context files.
- `capture/failed` remains referenced in legacy capture docs and active agent context files.
- No active `inbox/new` or `inbox/failed` routing references were found by repository-wide term search.
- No exact `continuous processing` term was found by repository-wide term search.
- `.obsidian/app.json` currently sets:

```json
{
  "newFileFolderPath": "capture/inbox",
  "attachmentFolderPath": "sources/files"
}
```

The Obsidian attachment folder still points at legacy `sources/files`, even though Batch 7 moved approved source/resource scaffolding to `resources/files/`. Do not change this in Batch 8 precheck; review it with the actual routing switch.

## Active context status

Checked active files:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
system/folder-contract.md
```

Current active routing remains legacy by design:

```text
capture/inbox/
capture/failed/
```

`system/agent-context/AGENTS.md` explicitly says Save-to-Mind targets `capture/inbox/` and not to change this path yet.

`system/folder-contract.md` maps:

```text
capture/inbox/  -> inbox/new/
capture/failed/ -> inbox/failed/
capture/ raw/original material -> inbox/raw/ or resources/
```

The contract says Save-to-Mind and failure routing remain legacy until explicitly switched and validated.

## Content classification

| Content | Classification | Proposed future target | Decision |
|---------|----------------|------------------------|----------|
| `capture/inbox/*.md` | new/unreviewed captures and verification captures | `inbox/new/` | move only after Brain readers and Save-to-Mind switch validation |
| `capture/failed/*.md` | failed captures needing retry/review | `inbox/failed/` | move only after failure routing validation |
| `capture/daily/README.md` | daily capture grouping placeholder | `inbox/processed/daily/` or `history/capture-daily/` | human decision required |
| `capture/README.md` | legacy capture lifecycle documentation | merge into `inbox/README.md` or archive as migration note | decide during move batch |
| `capture/.DS_Store` | local generated metadata | none | do not migrate; cleanup separately only if approved |
| `inbox/**/README.md` | new target lifecycle documentation | keep | target structure already prepared |

## Required validations before any future move or switch

Before moving capture content or switching Save-to-Mind:

1. Verify Brain readers can read `inbox/new/` and preserve existing capture semantics.
2. Verify Save-to-Mind can write a controlled test capture to `inbox/new/`.
3. Verify failure routing writes failed captures to `inbox/failed/`.
4. Verify existing `capture/inbox/` and `capture/failed/` content is not lost.
5. Decide whether `capture/daily/` belongs in `inbox/processed/daily/`, `history/capture-daily/`, or another target.
6. Decide whether `capture/README.md` is merged into `inbox/README.md` or retained as a historical migration note.
7. Review `.obsidian/app.json` together with the switch, including `newFileFolderPath` and stale `attachmentFolderPath`.
8. Confirm active context and folder contract agree after any routing switch.
9. Keep Save-to-Mind and continuous processing unchanged until the controlled switch batch.

## Recommendation

Proceed next with **Batch 8A — Brain reader and routing compatibility precheck** before any content move.

Batch 8A should verify the actual code/config paths for Brain readers, Save-to-Mind, failure routing, and Obsidian settings. It should decide whether the first move should be:

```text
capture/inbox/ -> inbox/new/
capture/failed/ -> inbox/failed/
```

or whether docs/config must be updated first.

Do not combine a bulk content move with the Save-to-Mind switch unless the controlled write/read validation is already available.

## Batch 8B — Documentation compatibility update (2026-07-09)

**Completed:** Batch 8B updated documentation and active compatibility context to make the upcoming inbox migration explicit while keeping legacy routing active.

Documentation changes applied:

| File | Change |
|------|--------|
| `capture/README.md` | added future target notes (`inbox/new/`, `inbox/failed/`) to each folder entry |
| `capture/inbox/README.md` | added compatibility note pointing to `inbox/new/`; explicitly says no switch yet |
| `capture/failed/README.md` | added compatibility note pointing to `inbox/failed/`; explicitly says no switch yet |
| `inbox/README.md` | added explicit statement: no captures moved, Save-to-Mind still writes to legacy |
| `inbox/raw/README.md` | added compatibility note about legacy raw material in `capture/` |
| `inbox/processed/README.md` | added compatibility note about legacy daily material in `capture/daily/` |
| `system/agent-context/00-memory-map.md` | added Inbox Migration Compatibility table with legacy/future mapping |
| `system/agent-context/00-current-context.md` | added inbox/ folder entries to folder structure; updated writing defaults |
| `system/agent-context/AGENTS.md` | added Inbox Migration Compatibility section; updated routing table with future targets |
| `system/folder-contract.md` | added Batch 8B documentation compatibility status |
| `system/reports/brain-reader-routing-compatibility-precheck-2026-07-08.md` | added Batch 8B notes |
| `system/reports/top-level-folder-migration-batch-plan-2026-07-07.md` | updated Batch 8 status with Batch 8B documentation compatibility |

No routing was switched. No capture content was moved. Save-to-Mind remains unchanged. `.obsidian/app.json` unchanged. Continuous processing disabled. Unrelated dirty paths untouched.

## Boundaries preserved in this precheck

- No capture content moved.
- No inbox content moved.
- Save-to-Mind not switched.
- Continuous processing not enabled.
- `wiki/log.md` untouched.
- `Untitled.canvas` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- `sources/.DS_Store` untouched.
- Only this precheck report and the roadmap should be staged for Batch 8 precheck.
