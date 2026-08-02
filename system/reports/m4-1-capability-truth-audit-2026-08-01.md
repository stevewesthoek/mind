# M4.1 — Capability Truth Audit

**Date:** 2026-08-01
**Task:** M4.1 — Remove duplicate runtime-status claims
**Status:** complete
**Operator:** Claude Opus (lower-tier execution)

## Summary

Audited all active `system/*.md` files for machine-status statements that duplicate Brain's live-status runbook authority. Replaced live-runtime-status detail with concise links to Brain's canonical status page. Retained Mind-owned policy, machine-contract definitions, future specifications, and historical evidence.

## Brain status-page authority

```text
/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md
```

Verified: file exists, last verified 2026-07-31, owned by Brain operations.

## Files changed

| File | Claims removed/reclassified |
|------|----------------------------|
| `system/mind-roadmap.md` | Removed "B2.1–B2.8 complete" and "fixture-only until separately activated" detail; removed "Codebase Memory remains disabled and Graphify remains frozen"; replaced with link to Brain status |
| `system/mind-strategy.md` | Removed "core and CLI are implemented (B2.1–B2.8 complete); thin adapters remain fixture-only until separately activated. Activation status is owned by Brain." — replaced with Brain status link |
| `system/brain-mind-bridge.md` | Removed "implemented and validated version `1.0`" with Brain task ID; removed "B2.1–B2.8 are complete…CLI and thin adapters are read-only…adapter boundary remains fixture-only" detail; removed "Context Gateway core, CLI, and fixture-only thin adapters are implemented" |
| `system/automation-roadmap.md` | Removed "Implemented:" list naming Brain-owned capabilities (Graphify renderer, graph wrapper, Brain-side preflight/dry-run/status-endpoint/Console visibility); removed "scheduling not enabled" and "disabled/fail-closed" detail |
| `system/automation-contract.md` | Removed "documented contract targets nightly classification" scheduler claim; removed "deployed and observed scheduler behavior remains unknown without Brain evidence" |
| `system/realtime-inbox-processing-spec.md` | Removed "Brain B1.0a verified the live success and failure targets on 2026-07-22" runtime verification claim |
| `system/graphify-strategy.md` | Removed "current contained profile is `graphify-contained-read-only`; execution is disabled/fail-closed pending an explicit contained runner" |
| `system/generated-output-policy.md` | Removed "Current legacy Graphify execution is disabled/fail-closed pending an explicit contained runner" |
| `system/folder-contract.md` | Removed "Brain B1.0a completed guarded live deployment and canonical readback on 2026-07-22" (two instances) |
| `system/graph-visualization-contract.md` | Removed "contained and disabled/fail-closed pending an explicit contained runner" |
| `system/graph-visualization-spec.md` | Removed "disabled/fail-closed pending the Brain-owned contained runner"; removed "while the Brain profile is disabled" (two instances) |
| `system/inbox-queue-throttle-spec.md` | Removed "Current implemented Brain preflights / Brain now supports two…" implementation claim |

## Classification of remaining matches

### `implemented|active|deployed|operational` — 136 remaining matches (down from 144)

All remaining matches classified as:

- **mind-policy:** "active" in the sense of "currently applicable Mind policy" (e.g., "active Mind docs use target paths", "active Obsidian board", "active legacy-path producer migration", "active meaning", "active agent instructions", "active project status", "active dashboard") — 61 matches
- **machine-contract:** schema field names (`state: { repository, deployed, observed, verified }`), detector type names (`completed-but-active`), status vocabulary definitions (`planned | implemented | tested | report-only | approval-gated | active | paused | retired`) — 34 matches
- **future-specification:** "before any scheduled or on-demand queue processing is considered active", "operational output root" as target path specification — 8 matches
- **historical-evidence:** completed-task status lines in `mind-implementation-plan.md` referencing dated Brain completion (retained as explicit evidence with dates) — 14 matches
- **architectural-description:** `repo-boundaries.md` describing Brain's role as "operational" and "machine-operational" (role descriptions, not runtime state) — 19 matches

### `enabled|disabled|fixture-only|live status|scheduler state|B[0-9]+\.[0-9]+.*complete` — 31 remaining matches (down from 43)

All remaining matches classified as:

- **machine-contract:** detector enabled/disabled configuration schema in `maintenance-brain-implementation-handoff.md` and `maintenance-report-contract.md` — 16 matches
- **future-specification:** "before on-arrival processing is enabled", "before synchronization is enabled" — 4 matches
- **mind-policy:** "live status is evidence-backed" (roadmap success criterion), "no content-changing automation has been enabled" (safety assertion) — 3 matches
- **historical-evidence:** "B2.1–B2.8 are complete" in M1.2 completion status (dated), write-pilot completion evidence — 3 matches
- **retained-with-link:** "implemented per Brain's live-status" (the replacement text itself), "does not claim…enabled" (negation/policy) — 5 matches

## Claims retained (mind-policy or machine-contract)

- `kanban.md` is sole current human task authority (mind-policy)
- Broad proposal application, production write activation, and continuous execution are not authorized (mind-policy)
- Meaningful time savings remain unproven (mind-policy)
- On-arrival processing is not authorized (mind-policy)
- Brain's live-status runbook is the only authority for machine capability state (mind-policy)
- Context Pack schema version `1.0` path (machine-contract — interoperability reference)
- Exchange type definitions, approval fields, receipt fields (machine-contract)
- Detector enabled/disabled configuration schema (machine-contract)
- Privacy scopes, authority labels, freshness states (machine-contract)

## Validation evidence

### Pre-change scan counts

```text
rg -n 'implemented|active|deployed|operational' system/*.md → 144 matches in 25 files
rg -n 'enabled|disabled|fixture-only|live status|scheduler state|B[0-9]+\.[0-9]+.*complete' system/*.md → 43 matches in 17 files
```

### Post-change scan counts

```text
rg -n 'implemented|active|deployed|operational' system/*.md → 136 matches in 24 files (net -8)
rg -n 'enabled|disabled|fixture-only|live status|scheduler state|B[0-9]+\.[0-9]+.*complete' system/*.md → 31 matches in 11 files (net -12)
```

### Structural checks

- Brain status-page path exists: PASS
- `system/README.md` points to Brain status authority: PASS (line 28)
- `home.md` points to Brain status authority: PASS (lines 33–36)
- `kanban.md` unchanged by this task: PASS (pre-existing modifications only)
- `tasks.md` unchanged by this task: PASS (pre-existing modifications only)
- Brain repository unchanged by this task: PASS (only pre-existing modifications present)
- No temporary files created: PASS
- No new files created except this report: PASS

## Security scan

Changed files contain:
- No credentials, tokens, API keys, or secrets
- No executable code
- No external URLs introduced (Brain status-page path is a local filesystem reference)
- No permission escalation or authority expansion

## Next task

M4.2 — Add a compact system-status link to `home.md` and `system/README.md`.

---

## Closure repair — 2026-08-01

Two residual files were identified after the initial pass: `home.md` and `system/README.md`. Both had been confirmed to contain the Brain status-page link but still held live-state claims.

### Residual claims removed or reclassified

**`home.md`:**

| Old text | Classification | Action |
|---|---|---|
| "Brain runs report-only Mind Steward and scheduler workflows. These workflows inspect, classify, and prepare status or review information without moving captures or changing durable Mind content automatically." | live-runtime-status (scheduler mode, workflow mode) | Removed |
| "Automatic capture moves, automatic durable knowledge writes, automatic task writes, and continuous processing are not enabled." | live-runtime-status (not enabled = negated current state) | Replaced with mind-policy: explicit authorization is required |

Replacement text asserts Mind policy (proposals require human approval; authorization is required before automatic operations are permitted) without describing whether any scheduler or workflow is currently running.

**`system/README.md`:**

| Old text | Classification | Action |
|---|---|---|
| "safe operator sequence for the current report-only Mind Steward preflights" | live-runtime-status ("current report-only" is a runtime mode claim) | Reclassified; reworded to describe safe operator purpose and redirect runtime mode to Brain status |

### Confirmation

- Both files still contain exactly one canonical Brain status-page path:
  `/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md`
- No live capability table was added to either file.
- Mind-owned policy retained intact:
  - captures belong in canonical intake paths (`inbox/new/`, `inbox/failed/`, `inbox/processed/`);
  - proposals do not authorize durable writes;
  - human approval is required for meaningful changes;
  - `kanban.md` remains sole human task authority;
  - proposal-review workflow and task authority instructions are unchanged.
- `system/mind-implementation-plan.md` updated with M4.1 completion status line.
- `kanban.md`, `tasks.md`, Brain, and Workbench Private: unchanged.
- No temporary files created.
- Security scan: no credentials, no executable code, no external URLs, no permission escalation.
