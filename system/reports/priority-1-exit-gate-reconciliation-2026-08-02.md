# Priority 1 Exit-Gate Reconciliation — 2026-08-02

**Status:** BLOCKED — one gate unresolved
**Scope:** Priority 1 canonical coherence exit-gate evaluation
**Boundary:** Mind documentation and evidence only; no Brain edit, deletion, or automation activation
**Evidence base:** Brain live-status runbook (2026-08-01), B1.5 package-boundary report (2026-07-14), BS0.10 legacy-producer migration (2026-07-31), BS0.19 deletion-readiness evaluation (2026-08-01), MS0.5 compatibility-authoritative exceptions (2026-07-14), M1.3–M1.4 closure (2026-07-31), documentation consistency audit (2026-07-31), post-consolidation operational readiness (2026-08-02)

---

## Gate matrix

| # | Outcome | Status | Evidence | Unresolved |
|---|---|---|---|---|
| 1 | One Brain-owned machine-readable Mind path contract | PASS | Brain `operations/specs/infinite-brain-path-registry.json`; validated by `node tools/mind-canonical-path-registry.mjs validate` (pass 2026-07-17) | — |
| 2 | Active Mind documentation uses canonical target paths | PASS | M1.3 closure (2026-07-31); `rg` scan shows no unexplained active old-path reference (see audit below) | — |
| 3 | Claude and Codex entrypoints route through `system/agent-context/` | PASS | Root `CLAUDE.md` and `AGENTS.md` (created 2026-08-02, commit `f8ddb3b`); B1.6 confirmed Brain-side instruction paths (2026-07-30) | — |
| 4 | Existing Gemini, Cursor, Kiro, and IDE instruction surfaces route through `system/agent-context/` | NOT APPLICABLE | No `.cursorrules`, `.gemini/`, `.kiro/`, or IDE agent config exists in this repository. Brain B1.6 governs external instruction files in Brain's `operations/system-configs/`. | — |
| 5 | Legacy Mind Steward package is migrated, retired, or explicitly dispositioned | **BLOCKED** | Brain B1.5 (2026-07-14) chose "retain with boundary clarification" — a third option not covered by the roadmap's binary outcome. Package builds and tests successfully (verified 2026-07-31). It is neither migrated into Brain Core nor retired. | Human decision required — see `system/reports/priority-1-mind-steward-disposition-decision-2026-08-02.md` |
| 6 | Dry-run is the default for classification | PASS | Mind Steward `package.json` description: "Read-only mind-steward dry-run planner"; no `--mode=apply` default; BS0.10 retirement guards exit before any functional code | — |
| 7 | Raw sources are not rewritten except through exact approved metadata policy | PASS | M5.1–M5.3 and B5.4 pilot is synthetic/fixture-only; no production writes authorized; philosophy and strategy enforce this boundary | — |
| 8 | Relevant path-contract tests and validations pass | PASS | `node tools/mind-canonical-path-registry.mjs validate` → pass (2026-07-17); `npm --prefix projects/mind-steward run ci` → pass (2026-07-31); `node tools/validate-deletion-readiness.mjs` → 0 SAFE, 2 PARTIAL, 17 BLOCKED (expected) | — |
| 9 | No active old-path reference remains unless explicitly historical or compatibility-only | PASS | Audit below shows all matches are classified as historical, compatibility-only, compatibility-authoritative (MS0.5), fixture, migration-plan evidence, or false positive. Zero active defects found. | — |

**Summary:** 7 PASS, 1 NOT APPLICABLE, 1 BLOCKED. Priority 1 exit gate is not satisfied.

---

## Active old-path audit

### Methodology

Scanned all tracked Markdown files excluding: `history/**`, `archive/**`, `system/reports/**`, `.obsidian/plugins/**`, `graphify-out/**`, `.graphify-out/**`, and `system/evals/**` (test fixtures and snapshots).

### Search commands executed

| # | Command | Pattern | Total matches |
|---|---|---|---|
| 1 | `rg -n 'capture/inbox' --type md -g '!history/**' -g '!archive/**' -g '!system/reports/**' -g '!.obsidian/**' -g '!graphify-out/**' -g '!.graphify-out/**' .` | Legacy success-intake path | 593 (mostly internal references within capture/README, inbox/new/README, folder-contract compatibility table, migration plan) |
| 2 | `rg -n 'capture/failed' --type md` (same exclusions) | Legacy failure path | 18 |
| 3 | `rg -n 'router/' --type md` (same exclusions) | Legacy agent-context root | 16 |
| 4 | `rg -n 'wiki/organisations/' --type md` (same exclusions, also excluding system/evals/) | Legacy organization path | 62 |
| 5 | `rg -n 'live/' --type md` (same exclusions) | Legacy live cockpit | 89 |
| 6 | `rg -n '(01-inbox|03-projects|04-tasks|05-areas|06-knowledge|07-faith|08-archive)/' --type md` (same exclusions) | Numbered legacy roots | 8 |

### Classification of matches

#### Pattern 1 — `capture/inbox`

| Classification | Count | Examples |
|---|---|---|
| Compatibility documentation (folder-contract, README statements of retired status) | ~10 | `system/folder-contract.md:68`, `capture/README.md:15`, `inbox/new/README.md:9` |
| Migration-plan evidence | ~5 | `system/top-level-folder-redesign-migration-plan.md:66,156,196` |
| Verification command in implementation plan | 1 | `system/mind-implementation-plan.md:174` |
| Historical content within capture folder READMEs | ~5 | `capture/README.md:22,27` |
| Historical routing test artifact in inbox/new | 1 | `inbox/new/20260709-...-batch-8p-routing-test-final.md:25` |
| Active agent-context retirement labels | ~3 | `system/agent-context/maintenance.md:15`, `map.md:22`, `router-README.md:24,35,49` |
| False positive (high count from rg -c aggregation across all wiki/ files with internal self-references) | bulk | References within files that themselves document the retired path |
| **Active defects** | **0** | — |

#### Pattern 2 — `capture/failed`

All 18 matches are classified as: historical test artifacts (2), retirement/compatibility documentation (13), verification commands (1), migration-plan evidence (2). Zero active defects.

#### Pattern 3 — `router/`

All 16 matches are classified as: compatibility documentation in folder-contract (1), README noting historical origin (2), migration-plan evidence (7), compatibility/history labels in agent-context (4), safety-rule reference (1), verification command (1). Zero active defects.

#### Pattern 4 — `wiki/organisations/`

| Classification | Count | Location |
|---|---|---|
| **Compatibility-authoritative exception (MS0.5)** — files within `wiki/organisations/prochat/brand/` and `wiki/organisations/prochat/youtube/` referencing sibling files | ~45 | Self-references within active ProChat brand documents |
| Compatibility documentation (folder-contract, home.md migration table) | 3 | `system/folder-contract.md:74`, `home.md:87` |
| Migration-plan evidence | 5 | `system/top-level-folder-redesign-migration-plan.md` lines |
| Active system docs referencing ProChat brand source (legitimate — MS0.5 exception covers these paths) | 9 | `system/repo-boundaries.md:153,155`, `system/maintenance-brain-implementation-handoff.md:57,416`, `system/runbooks/maintenance-report-pilot-runbook.md` multiple |
| **Active defects** | **0** | MS0.5 explicitly grants scoped authoritative read for `wiki/organisations/prochat/brand/`, `playbooks/`, and `youtube/`. No replacement is asserted. |

#### Pattern 5 — `live/`

| Classification | Count |
|---|---|
| Files within `live/` itself (README, business, workflows) documenting their own role | 5 |
| Compatibility references in task-sync-spec, task-kanban-contract, automation-contract | 7 |
| Migration-plan evidence | 7 |
| home.md compatibility table row | 1 |
| projects/README.md compatibility note | 1 |
| tasks/README.md listing legacy surfaces | 1 |
| **Active defects** | **0** — all references describe `live/tasks.md` as a derived summary, not authority; `kanban.md` is the stated sole authority everywhere |

#### Pattern 6 — Numbered legacy roots

All 8 matches are: wiki/organisations/README.md listing legacy internal structure (6), faith/resources/dance-of-life/PROJECT.md referencing a target path that was canonical at the time of that project (2). Zero active defects — these describe internal document structure, not active routing.

### Audit result

**Total active defects found: 0**

No minimal path corrections were required. All legacy-path references in active files are explicitly classified as historical, compatibility-only, compatibility-authoritative (MS0.5 exception), migration-plan evidence, or internal self-references within retained compatibility content.

---

## Agent-entrypoint inventory

| Surface | Exists | Routes to `system/agent-context/` | Contradictions | Full-vault load |
|---|---|---|---|---|
| Root `CLAUDE.md` | yes | yes — requires startup order starting from `system/agent-context/AGENTS.md` | none | prohibited ("Do not load the whole vault") |
| Root `AGENTS.md` | yes | yes — cites `00-start-here.md`, `00-current-context.md`, `00-memory-map.md` | none | prohibited ("Do not scan or load the entire vault") |
| `system/agent-context/AGENTS.md` | yes | canonical source | none | prohibited |
| `system/agent-context/CLAUDE.md` | yes | references `system/agent-context/` files | none | prohibited |
| `.cursorrules` | no | N/A | N/A | N/A |
| `.gemini/` | no | N/A | N/A | N/A |
| `.kiro/` | no | N/A | N/A | N/A |
| `codex.md` / `CODEX.md` | no | N/A | N/A | N/A |

**Result:** All existing agent instruction surfaces route through `system/agent-context/`. No surface independently duplicates or contradicts canonical instructions. No surface infers runtime deployment from repository configuration.

---

## Brain producer and package reconciliation

### Facts (kept separate)

1. **BS0.10** (2026-07-31): Four legacy-path producers retired with exit guards. These are scripts (`clickup-importer.py`, `mind-kanban-syncer.py`, `mind-project-decomposer.py`, `mind-auto-router.py`) that wrote to numbered legacy roots. Producer retirement is complete.

2. **BS0.19** (2026-08-01): Deletion-readiness evaluation of 19 non-canonical path entries. Result: 0 SAFE, 2 PARTIAL, 17 BLOCKED. No deletion authorized.

3. **`projects/mind-steward`** (current state): Active Brain-owned package. Version 0.1.0. Builds and tests successfully (verified 2026-07-31 final Brain verification). Contains classifier, preview, maintenance-preview, wiki-health, report, CLI presentation, snapshot, and contract modules.

4. **B1.5** (2026-07-14): Explicitly resolved the Mind Steward package boundary. Decision: **retain** Mind Steward as a separate local package. Rationale: making it a thin Brain Core adapter would import an unnecessary dependency surface and blur its fixture-safe report-only boundary. The two packages have no circular dependency.

5. **Producer retirement ≠ package retirement.** BS0.10 retired four external Python scripts that wrote to legacy numbered roots. Mind Steward is a TypeScript package providing local classification, dry-run reporting, and CLI presentation. These are completely separate concerns.

### Mind Steward current classification

Based on Brain evidence (B1.5 report + current package.json + live-status runbook verification):

**Active Brain-owned package with explicitly resolved boundary.**

It is not:
- deprecated;
- migrated into Brain Core;
- retired;
- compatibility-only;
- unclear.

### Effect on Priority 1

The Mind roadmap's Priority 1 outcome #5 states: "the legacy Mind Steward package is either migrated into Brain Core or retired."

B1.5 chose neither. It chose to retain Mind Steward with a clarified boundary separation. This creates a mismatch between the roadmap's binary outcome and the Brain-side evidence.

The disposition decision is documented in `system/reports/priority-1-mind-steward-disposition-decision-2026-08-02.md`.

---

## Verification commands

| Command | Result | Date |
|---|---|---|
| `rg -n 'capture/inbox\|capture/failed\|router/' system/agent-context` | Only explicitly classified historical/compatibility references | 2026-07-31 (M1.3) |
| `node tools/mind-canonical-path-registry.mjs validate` | pass | 2026-07-17 |
| `npm --prefix projects/mind-steward run ci` | pass | 2026-07-31 |
| `npm --prefix projects/brain-core run ci` | pass | 2026-07-31 |
| `node tools/validate-deletion-readiness.mjs` | 0 SAFE, 2 PARTIAL, 17 BLOCKED | 2026-08-01 |
| `node --test operations/specs/infinite-brain-boundary-contracts.test.mjs` | pass | 2026-07-17 |

---

## Conclusion

Priority 1 exit gate is blocked on exactly one issue: the Mind Steward package disposition does not match the roadmap's stated binary outcome. Steve must decide whether to:

- (A) update the roadmap outcome to accept "retain with boundary" as a valid disposition;
- (B) direct Brain to migrate Mind Steward responsibilities into Brain Core;
- (C) direct Brain to retire Mind Steward.

See `system/reports/priority-1-mind-steward-disposition-decision-2026-08-02.md` for the neutral options, benefits, risks, and required evidence.
