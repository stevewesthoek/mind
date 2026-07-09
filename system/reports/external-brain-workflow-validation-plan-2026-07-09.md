# External Brain Workflow Validation Plan — 2026-07-09

**Task:** Task O — Batch 8D external Brain workflow validation planning  
**Status:** cross-repo plan completed; no routing switched, no content moved  
**Starting Mind commit:** `5acccbe docs: validate Brain inbox readers`  
**Brain commit:** `50d46df8 docs: plan Mind inbox workflow validation`  
**Brain report:** `/Users/Office/Repos/stevewesthoek/brain/operations/reports/mind-inbox-external-workflow-validation-plan-2026-07-09.md`

## Brain repo findings summary

The Brain repo already has substantial dual-path support, but three components need changes before the inbox routing switch.

### What already works

- **`mind-paths.ts`** — defines both target and legacy paths with full compatibility groups (`MIND_INBOX_NEW_CANDIDATES`, `MIND_FAILED_INBOX_CANDIDATES`).
- **`mind-steward-inbox-queue.ts`** — already tries `inbox/new/` first, falls back to `capture/inbox/`.
- **`execution-plans.ts`** — allows reading from both `inbox/new/` and `capture/inbox/`.
- **Mind Steward CLI** — configurable via `--mind-root` or `MIND_STEWARD_MIND_ROOT` env var.
- **Tests** — cover both `inbox/new/` and `capture/inbox/` paths.

### What must change

1. **`tools/scripts/mind-steward-inbox-dry-run-report.sh`** (line 37) — hardcodes `INBOX_DIR="$MIND_ROOT/capture/inbox"`. Must try `inbox/new/` first with fallback.

2. **`tools/scripts/mind-compile-loop.sh`** (line 26) — hardcodes `INBOX_DIR="${MIND_DIR}/capture/inbox"`. Must try `inbox/new/` first with fallback.

3. **`operations/automations/n8n/workflows/mind-inbox-fixed.json`** — hardcodes `capture/inbox/` and `capture/failed/` in JavaScript code nodes. Must use env-var-driven path prefixes like `$env.MIND_INBOX_PATH`.

### What is the actual Save-to-Mind write mechanism

The n8n workflow `mind-inbox-fixed.json`:
- Receives a webhook POST at the public endpoint `/webhook/mind-inbox`
- Uses Gemini API to classify the capture
- Constructs a GitHub API URL with the file path `capture/inbox/<date>-<slug>.md`
- Writes the file directly to the Mind repo via `https://api.github.com/repos/stevewesthoek/mind/contents/...`
- Uses `$env.GITHUB_MIND_PAT` for authentication

This is the only write path for Save-to-Mind. To switch to `inbox/new/`, the n8n workflow JavaScript must be updated.

## Path support matrix (from Brain inspection)

| Component | capture/inbox | inbox/new | capture/failed | inbox/failed | Can switch? |
|-----------|---------------|-----------|----------------|---------------|-------------|
| `mind-paths.ts` | legacy-fallback | target ✅ | legacy-fallback | target ✅ | Via env switch |
| `mind-steward-inbox-queue.ts` | ❌ fallback | ✅ primary | — | — | Already target-first |
| `execution-plans.ts` | ✅ allowed | ✅ allowed | ✅ allowed | ✅ allowed | Already dual |
| `mind-steward-inbox-dry-run-report.sh` | ✅ hardcoded | ❌ missing | — | — | Needs update |
| `mind-compile-loop.sh` | ✅ hardcoded | ❌ missing | — | — | Needs update |
| n8n workflow | ✅ writes here | ❌ not supported | ✅ writes here | ❌ not supported | Needs update |
| Mind Steward CLI | ✅ reads | ✅ reads | ✅ reads | ✅ reads | Already configurable |
| Mind tests | ✅ tested | ✅ tested | ✅ tested | ✅ tested | Already dual |

## Recommendation for Batch 8E

Proceed with **Batch 8E — Brain shell script and n8n path update**, which should:

1. Update `mind-steward-inbox-dry-run-report.sh` to try `inbox/new/` first
2. Update `mind-compile-loop.sh` to try `inbox/new/` first
3. Update n8n workflow to use env-var-driven path prefixes
4. Validate shell script changes read-only
5. Do NOT trigger n8n workflow yet

After Batch 8E, Batch 8F — controlled n8n write test requires:
- Active n8n instance
- `GITHUB_MIND_PAT` and `GEMINI_API_KEY` env vars
- Permission to write one test capture to `inbox/new/`
- Permission to write one test failed-capture to `inbox/failed/`

## Boundaries preserved

- No Mind capture content moved.
- No Mind `.obsidian/app.json` changed.
- No Mind routing switched.
- No Brain implementation code was changed.
- No n8n workflow triggered.
- No network commands run.
- `wiki/log.md`, `Untitled.canvas`, `wiki/organisations/prochat/pitch-decks/` untouched.
