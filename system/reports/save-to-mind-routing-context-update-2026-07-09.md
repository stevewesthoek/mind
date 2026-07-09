# Save-to-Mind Routing Context Update — Batch 8R

**Date:** 2026-07-09
**Task:** Batch 8R — Mind-side Save-to-Mind routing context update
**Status:** ✅ COMPLETE — Context updated to reflect active `inbox/new/` routing

## Starting State

**Mind:**
- Latest commit: `4da3e56 docs: prioritize Workbench stability strategy`
- Dirty status: M wiki/log.md, ?? Untitled.canvas, ?? wiki/organisations/prochat/pitch-decks/

**Brain Reference:**
- Latest commit: `31554fd0 docs: reconcile inbox routing workflow source`
- Workflow source: hardcoded `inbox/new/` routing in both resolve-inbox-path and prepare-capture nodes

## Current Routing State

**Active Save-to-Mind Target (2026-07-09 onwards):**
```
POST /webhook/mind-inbox -> n8n -> GitHub inbox/new/
```

**Folder Status:**

| Folder | File Count | Status |
|--------|-----------|--------|
| `capture/inbox/` | 19 (local clone) | Legacy/Historical — not moved, contains prior captures. Remote origin/main may have additional Batch 8P files. |
| `inbox/new/` | 1 (README.md only, local clone) | Active — receiving new captures. Remote origin/main includes Batch 8P webhook test capture. |
| `capture/failed/` | 3 (local clone) | Legacy/Historical — not moved, contains prior failures |
| `inbox/failed/` | 1 (README.md only) | Scaffolding only — not yet active for failure routing |

## Documentation Updates

### Files Updated:

1. **capture/README.md**
   - Updated header to reflect "Historical raw intake buffer"
   - Clarified that new captures now land in `inbox/new/`
   - Noted "active as of 2026-07-09"
   - Documented that `capture/inbox/` contains 19 files as of 2026-07-09 local clone (not moved)
   - Documented that `capture/failed/` contains 3 files as of 2026-07-09 local clone (not moved)
   - Updated automation rule to clarify active Save-to-Mind writes to `inbox/new/`, not `capture/inbox/`

2. **capture/inbox/README.md**
   - Updated header to emphasize "Legacy folder — Historical captures only"
   - Added section showing legacy producer (marked SWITCHED 2026-07-09)
   - Added section showing current active producer routing to `inbox/new/`
   - Stated 19 files as of 2026-07-09 local clone, with note about remote differences
   - Added Brain source-of-truth reference: commit `31554fd0`

3. **capture/failed/README.md**
   - Updated header to emphasize "Legacy folder — Historical failed captures only"
   - Stated 3 files as of 2026-07-09 local clone
   - Noted failure routing was not changed in Batch 8P
   - Clarified that `inbox/failed/` is scaffolding but not yet active

4. **inbox/README.md**
   - Updated to state "Save-to-Mind routing now targets `inbox/new/` as of Batch 8P"
   - Added active routing path documentation
   - Clarified that legacy paths remain in place (19 local + 3 local files, not moved, remote may differ)

5. **inbox/new/README.md**
   - Updated header to state "Active since Batch 8P (2026-07-09)"
   - Noted current file count: 1 (README.md only in local clone); remote includes Batch 8P test capture
   - Added active routing path: `POST /webhook/mind-inbox -> n8n -> GitHub inbox/new/`

6. **inbox/failed/README.md**
   - Updated header to state "Scaffolding folder — Not yet active"
   - Clarified that success routing switched to `inbox/new/` but failure routing did not
   - Noted 1 file (README.md only) in local clone
   - Stated that `capture/failed/` remains active with 3 historical files (local clone)

7. **system/folder-contract.md**
   - Updated status line to note "Save-to-Mind routing switched to `inbox/new/` (Batch 8P)"
   - Updated compatibility line to reference Batch 8R completion
   - Updated routing table: marked `capture/inbox/` → `inbox/new/` as SWITCHED (Batch 8P)
   - Updated routing table: noted `capture/failed/` → `inbox/failed/` remains legacy, future batch
   - Updated "Root write rule" section to reflect active `inbox/new/` target
   - Documented legacy `capture/inbox/` as historical reference (19 local files, remote may differ)
   - Documented active `capture/failed/` failure path (3 local files)
   - Documented future target `inbox/failed/` as not yet active

### Files NOT Modified:

- `.obsidian/app.json` — unchanged (still has `newFileFolderPath: capture/inbox`, will be updated in future Obsidian switch batch)
- wiki/log.md — not touched (unrelated dirty path preserved)
- Untitled.canvas — not touched (unrelated dirty path preserved)
- wiki/organisations/prochat/pitch-decks/ — not touched (unrelated dirty path preserved)
- Brain repo — read-only reference only, no changes
- Workflow JSON files — not touched (exist in Brain, not Mind)
- Any capture/inbox content files — not moved or modified
- Any capture/failed content files — not moved or modified

## Key Statements

✓ **Active routing:** `inbox/new/` (confirmed Batch 8P, 2026-07-09)
✓ **Legacy capture folder status:** `capture/inbox/` contains 19 files (local clone), not moved, historical reference. Remote origin/main may include additional Batch 8P files.
✓ **Legacy failure folder status:** `capture/failed/` contains 3 files (local clone), not moved, historical reference
✓ **Future failure target:** `inbox/failed/` exists as scaffolding (1 README.md file), not yet active, future batch
✓ **Obsidian integration:** `.obsidian/app.json` not changed in this batch (Batch 8R updates Mind context only)
✓ **Brain source-of-truth:** Reconciled at commit `31554fd0` in `brain` repo
✓ **No files moved:** All historical capture content remains in place
✓ **No webhook sent:** Routing switch was implemented in Batch 8P; this batch is context documentation only
✓ **No n8n trigger:** Mind batch only, no external workflow changes

## Compatibility Notes

- Existing Brain readers should be configured to read both legacy and target paths during the compatibility period
- Obsidian `newFileFolderPath` will be updated in a future controlled batch
- Future failure routing to `inbox/failed/` will be implemented in a separate batch
- No content migration will occur until explicitly approved in a future batch

## Validation Summary

✓ JSON docs parse successfully
✓ `capture/README.md` updated with active routing status
✓ `capture/inbox/README.md` updated with legacy marker and active routing reference
✓ `capture/failed/README.md` updated with legacy marker and file count
✓ `inbox/README.md` updated to reflect active `inbox/new/` routing
✓ `inbox/new/README.md` updated to reflect active status and file count
✓ `inbox/failed/README.md` updated to clarify scaffolding-only status
✓ `system/folder-contract.md` updated with Batch 8P completion status
✓ All updates document file counts as of 2026-07-09
✓ All updates explicitly state "no files moved"
✓ `.obsidian/app.json` verified unchanged
✓ Unrelated dirty files preserved

## Final Mind Status

- Latest commit: `4da3e56 docs: prioritize Workbench stability strategy` (will be committed after this batch)
- New dirty paths: None (only documentation updates)
- Preserved dirty paths: M wiki/log.md, ?? Untitled.canvas, ?? wiki/organisations/prochat/pitch-decks/

## Brain Reference

- Brain commit: `31554fd0 docs: reconcile inbox routing workflow source`
- Brain workflow source: operations/automations/n8n/workflows/mind-inbox.json (hardcoded inbox/new)
- Brain report: operations/reports/n8n-inbox-routing-source-reconciliation-2026-07-09.md
