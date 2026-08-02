# Priority 1 — Mind Steward Package Disposition Decision

**Status:** human decision required
**Date:** 2026-08-02
**Scope:** resolve the mismatch between Priority 1 outcome #5 and Brain B1.5 evidence
**Boundary:** Mind documentation and decision preparation only; no Brain edit, package migration, retirement, or deletion authorized by this report

---

## Context

The Mind roadmap Priority 1 outcome #5 states:

> the legacy Mind Steward package is either migrated into Brain Core or retired

Brain task B1.5 (2026-07-14) resolved the Mind Steward package boundary with a third option: **retain as a separate local package** with clarified boundaries. The B1.5 report concluded that making Mind Steward a thin Brain Core adapter would import an unnecessary dependency surface and blur its fixture-safe report-only boundary.

The package currently:
- builds and tests successfully (24 fixtures, typecheck pass);
- has no imports to/from Brain Core (no circular dependency);
- provides: capture classification, dry-run report, preview presentation, wiki health check, maintenance-preview queue, CLI wrappers;
- is described as "Read-only mind-steward dry-run planner for Mind OS maintenance loops";
- version: 0.1.0;
- is verified by Brain final verification (2026-07-31).

The four legacy-path producers (BS0.10) are retired Python scripts — they are entirely separate from the Mind Steward TypeScript package.

---

## Decision required

Steve must choose one of three options to resolve the Priority 1 exit gate.

---

### Option A — Retain (update the roadmap outcome)

Accept B1.5's "retain with boundary" decision as a valid third disposition. Update the Priority 1 outcome from the binary "migrated into Brain Core or retired" to explicitly include "retained with documented boundary separation."

**Benefits:**
- Matches existing Brain evidence and engineering reality.
- No implementation work required in Brain.
- Preserves Mind Steward's fixture-safe report-only boundary.
- No risk of breaking current builds, tests, or verification flows.
- Priority 1 can close immediately after updating the outcome wording.

**Risks:**
- The roadmap's original intent may have been to eliminate the package as a simplification concern (Priority 7).
- Future confusion about whether "retained" means actively developed or just not deleted.

**Required Brain-owned evidence:** None (B1.5 already provides the boundary resolution).

**Effect on Priority 1:** Closes the exit gate. M1.6 becomes complete.

**Human approval required:** Yes — changing a roadmap outcome.

---

### Option B — Migrate into Brain Core

Direct Brain to migrate remaining Mind Steward responsibilities (classification, preview, wiki health, maintenance-preview, report, CLI) into Brain Core modules, then mark the package deprecated.

**Benefits:**
- Fully satisfies the original roadmap outcome as written.
- Reduces package count from 3 (brain-core, mind-context, mind-steward) to 2.
- Simplifies the dependency graph.

**Risks:**
- Contradicts the B1.5 engineering analysis that concluded migration is *higher* complexity.
- Introduces Brain Core dependency into currently independent local CLI work.
- Blurs the fixture-safe report-only boundary.
- Requires significant Brain implementation work (new Brain task).
- Risk of regressions in 24 existing Mind Steward test fixtures.
- Mind Steward's consumers (scheduler, runbooks, recovery procedures) must all be updated.

**Required Brain-owned evidence:**
- New Brain task to perform the migration.
- Behavior parity demonstrated for all 24 fixtures.
- Updated scheduler and recovery references.
- Brain Core typecheck and test suite must still pass.
- Deletion-readiness evidence for the Mind Steward package path.

**Effect on Priority 1:** Blocked until Brain migration task completes.

**Human approval required:** Yes — directing new Brain work.

---

### Option C — Retire the package

Direct Brain to retire Mind Steward: add retirement guards to its entrypoints (analogous to BS0.10 legacy producer retirement), mark it deprecated, and ensure no consumer depends on it.

**Benefits:**
- Satisfies the roadmap outcome as originally written.
- Reduces maintenance surface.
- Aligned with Priority 7 simplification goals.

**Risks:**
- Mind Steward currently provides active functionality (classification, preview, wiki health) that no other package offers.
- Retirement without migration means losing those capabilities.
- Brain final verification explicitly tests Mind Steward; retirement breaks that verification.
- Any scheduler, runbook, or recovery path referencing Mind Steward must be updated.
- BS0.19 does not yet have SAFE status for the Mind Steward package path.

**Required Brain-owned evidence:**
- Proof that all Mind Steward consumers have migrated or been retired.
- All 24 test fixtures must either migrate or be explicitly retired.
- Brain final verification must be updated to remove Mind Steward checks.
- Deletion-readiness evidence for the package path must reach SAFE status.
- Scheduler and recovery procedure updates.

**Effect on Priority 1:** Blocked until Brain retirement task completes.

**Human approval required:** Yes — directing package retirement and loss of active functionality.

---

## Recommendation context (not a selection)

B1.5 was authored by the Brain implementation process and explicitly concluded that retention is the lower-complexity outcome. The roadmap outcome was written before B1.5's analysis existed.

This report does not select an option. Steve's decision is required.
