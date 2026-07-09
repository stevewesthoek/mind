# Success Inbox Single System Finalization — Batch 8X

**Date:** 2026-07-09
**Task:** Batch 8X — Finalize success inbox to single system (Obsidian + cleanup)
**Status:** ✅ COMPLETE — Obsidian now points to inbox/new; legacy capture/inbox retired

## Starting State

**Mind:**
- Latest commit: `c2d418b docs: clean legacy capture inbox`
- Obsidian config: "newFileFolderPath": "capture/inbox"
- capture/inbox folder: 0 files (empty after Batch 8W)
- inbox/new folder: 12 files (active)

**Brain Reference:**
- Latest commit: `547ab784 docs: record legacy capture inbox cleanup`
- Before patch: fallback to capture/inbox if inbox/new missing
- After patch: inbox/new only, no fallback

## Configuration Changes

### Obsidian App Config: .obsidian/app.json

**Change:** newFileFolderPath

**Before:**
```json
{
  "newFileLocation": "folder",
  "newFileFolderPath": "capture/inbox",
  "attachmentFolderPath": "sources/files",
  ...
}
```

**After:**
```json
{
  "newFileLocation": "folder",
  "newFileFolderPath": "inbox/new",
  "attachmentFolderPath": "sources/files",
  ...
}
```

**Impact:** All new files created in Obsidian will now land in inbox/new instead of capture/inbox.

## System Integration Status

### Success Intake Flow (Batch 8X)

| Component | Source | Target | Status |
|-----------|--------|--------|--------|
| Save-to-Mind webhook | n8n | inbox/new | Active (Batch 8P) |
| Obsidian new-file path | Obsidian | inbox/new | Active (Batch 8X) |
| Brain path resolution | Brain | inbox/new | Active (Batch 8X) |
| Shell scripts | Tools | inbox/new | Active (Batch 8X) |

**Result:** Single unified success intake system to inbox/new.

### Legacy/Disabled

| Component | Previous Target | Current Status |
|-----------|-----------------|----------------|
| capture/inbox fallback | Brain queue | Retired (Batch 8X) |
| capture/inbox default | Shell scripts | Retired (Batch 8X) |
| capture/inbox Obsidian path | Obsidian | Retired (Batch 8X) |

**Result:** No active writes to capture/inbox from any system.

## Folder Status After Batch 8X

| Folder | File Count | Status | Purpose |
|--------|-----------|--------|---------|
| inbox/new | 12 | **Active success intake** | All new captures (Obsidian, webhook, manual) |
| capture/inbox | 0 | Empty, historical only | Legacy reference; no new content |
| history/capture-inbox-historical/2026-07-09 | 9 | Historical archive | Verified test artifacts, historical evidence |
| history/capture-inbox-quarantine/2026-07-09 | 9 | Quarantine archive | Batch 8G/8P test artifacts (preserved, not deleted) |
| history/capture-inbox-review-required/2026-07-09 | 1 | Review pending | Unclassified file from Batch 8V inventory |
| capture/failed | 3 | Unchanged | Legacy failure path (not switched in this batch) |
| inbox/failed | 1 | Unchanged | Future target for failure routing (not switched) |

## Explicit Confirmations

✓ Obsidian now points to inbox/new
✓ All intake systems target inbox/new only
✓ capture/inbox fallback retired from Brain code
✓ capture/inbox fallback retired from shell scripts
✓ No fallback logic remains; missing inbox/new returns unavailable
✓ No files moved
✓ No files deleted
✓ No files archived
✓ capture/failed unchanged (3 files)
✓ inbox/failed unchanged (1 file)
✓ No failure routing switched (separate batch)
✓ No n8n/webhook/Dokploy action
✓ wiki/log.md not touched
✓ Untitled.canvas not touched
✓ wiki/organisations/prochat/pitch-decks/ not touched

## Success Path Completion

**Single-system success intake achieved:**
- All capture sources → inbox/new only
- No permanent dual system
- capture/inbox empty and historical only
- Obsidian, Save-to-Mind, and Brain readers all aligned to inbox/new
- Legacy fallback retired from all active code paths

## References

- Mind Batch 8W: `c2d418b docs: clean legacy capture inbox` (cleaned and migrated all capture/inbox files)
- Brain Batch 8X: Retires fallback in mind-paths.ts and shell scripts
- Save-to-Mind Routing: Batch 8P switched to inbox/new (still active, unchanged)
- Obsidian Config Change: .obsidian/app.json newFileFolderPath
