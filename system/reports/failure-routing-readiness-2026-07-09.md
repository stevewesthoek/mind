# Failure Routing Readiness — Batch 8Y

**Date:** 2026-07-09
**Task:** Batch 8Y — Inventory failure content, prepare for failure-routing switch
**Status:** ✅ COMPLETE — Failure path fallback retired in Brain; 3 files inventoried; plan documented

## Starting State

**Mind:**
- Latest commit: `b2fb445 docs: finalize success inbox single system`
- capture/failed folder count: 3 files (historical verification tests)
- inbox/failed folder count: 1 file (README.md only, scaffolding)

**Brain Reference:**
- Latest commit before Batch 8Y: `9c4f44ad refactor: retire legacy success inbox fallback`
- After Batch 8Y: Fallback for capture/failed retired from MIND_FAILED_INBOX_CANDIDATES

## Historical Content Inventory

### capture/failed Files (All Test Artifacts, Already Classified)

| Filename | Type | Status | Title | Classification |
|----------|------|--------|-------|-----------------|
| README.md | Documentation | Static | Capture Failed folder marker | Archive to history |
| 2026-05-16-mind-os-failure-buffer-verification.md | Test | Historical | Mind OS failure buffer verification | Archive to history (already classified as test) |
| 2026-05-16-mind-os-sanitized-workflow-verification.md | Test | Historical | Mind OS sanitized workflow verification | Archive to history (already classified as test) |

**Summary:**
- 2 verification test artifacts (2026-05-16)
- 1 infrastructure README
- All marked as failure-stage: mind-steward-classify
- All marked as status: needs-retry (but never retried, historical)
- All marked with confidence: 0, signal_quality: 0 (low quality, test status)

**Assessment:** All 3 files are historical verification tests from initial Mind OS deployment (2026-05-16). No active failures requiring processing. Safe to archive without loss.

## Failure Routing Status

### Current (Pre-Batch 8Y)

**n8n Save-to-Mind workflow failure handling:**
- Fails on classification error
- Routes failed captures to: capture/failed
- Status: **Still active** (not changed in this batch)

**Brain path resolution (Before Batch 8Y):**
- Check inbox/failed
- Fallback to capture/failed if not found
- Status: **Fallback retired** by Batch 8Y code patch

### After Batch 8Y (Code-side only; n8n not changed)

**n8n Save-to-Mind workflow failure handling:**
- Still routes to capture/failed (unchanged)
- Status: **Same as before** (n8n not patched)

**Brain path resolution (After Batch 8Y):**
- Check inbox/failed only
- No fallback to capture/failed
- Status: **Fallback retired** (code patched)

**Mismatch:** Brain code expects inbox/failed; n8n still writes to capture/failed. This is OK for now because:
1. No active failures are being generated
2. Brain is in read-safe mode (reports unavailable if inbox/failed missing)
3. capture/failed remains accessible for historical reference
4. Future n8n switch will unify the system

## Historical Content Handling Strategy

**Option A: Archive all 3 files immediately**
- Move README.md to history/capture-failed-historical/2026-07-09/README.capture-failed.md
- Move 2 test files to history/capture-failed-historical/2026-07-09/
- Result: capture/failed empty, all content preserved, no loss
- Risk: None (test artifacts only)

**Option B: Wait for n8n failure switch, migrate together**
- Leave files in capture/failed until n8n is updated to write to inbox/failed
- After n8n switch, inventory AND handle together with new failures
- Advantage: Single cleanup batch covers old + new
- Disadvantage: Delays closure of old system

**Recommendation:** **Option A - Archive immediately**
- Files are clearly test artifacts (confidence: 0, signal_quality: 0)
- No operational value
- No risk to archive now
- Unblocks capture/failed cleanup before n8n switch
- Keeps systems organized

## Proposed Timeline

**Batch 8Y (now):**
- ✓ Retire Brain fallback for capture/failed
- ✓ Inventory the 3 files
- ✓ Document archival plan
- ✗ Do NOT execute n8n failure switch yet

**Future batch (when team approves):**
- Archive the 3 capture/failed files to history/capture-failed-historical/2026-07-09/
- Patch n8n to write failures to inbox/failed instead of capture/failed
- Test failure workflow with safe payload
- Verify failures now land in inbox/failed
- Document completion

**Reason for delay:** System stability. Success path is now unified (Batch 8X). Verify success path stable before switching failure routing.

## Explicit Confirmations

✓ Brain failure fallback retired (MIND_FAILED_INBOX_CANDIDATES has only inbox/failed)
✓ capture/failed inventory complete (3 files, all test artifacts)
✓ No files moved/deleted/archived in Mind (Batch 8Y is inventory-only)
✓ capture/failed still has 3 files (unchanged)
✓ inbox/failed still has 1 file (unchanged)
✓ n8n failure routing NOT changed (still writes to capture/failed)
✓ Success path NOT changed (still uses inbox/new)
✓ No n8n/webhook/Dokploy action
✓ wiki/log.md not touched
✓ Untitled.canvas not touched
✓ wiki/organisations/prochat/pitch-decks/ not touched

## Recommendation for Next Batch

**Batch 8Z — Execute failure routing integration**

1. Archive 3 capture/failed files to history/capture-failed-historical/2026-07-09/
2. Update n8n Save-to-Mind workflow:
   - Change failure capture target: capture/failed → inbox/failed
   - Test with safe failure payload
3. Verify failures now land in inbox/failed
4. Update documentation
5. Document completion

**Or defer to later batch** if team prefers to keep failure routing as separate work.

## References

- Brain Batch 8Y: `failure-routing-switch-2026-07-09.md` report
- Mind success-path: Unified to inbox/new (Batch 8X)
- capture/failed inventory: 3 files, all historical tests
