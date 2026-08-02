# Documentation Consistency Audit — 2026-07-31

**Status:** complete
**Scope:** canonical philosophy, strategy, roadmap, implementation plan, bridge, folder contract, task contract, system/README.md, home.md, and active agent-context files
**Method:** deterministic `rg` and `ls` commands; no inference-based claims

## Audit commands executed

| # | Command | Purpose |
|---|---------|---------|
| 1 | `rg -n 'Until the Context Gateway exists' system/ --type md` | Stale "does not exist" Gateway wording |
| 2 | `rg -n 'tasks\.md' system/ home.md --type md` | tasks.md authority claims |
| 3 | `rg -n 'Status:\|Version:\|Last reviewed:\|review_after:\|Depends on:\|Owner:' <6 canonical files>` | Header field completeness |
| 4 | `rg -n 'capture/inbox\|capture/failed' system/ --type md \| grep -v 'reports/'` | Legacy path in active docs |
| 5 | `rg -n 'router/' system/agent-context/ --type md` | Legacy router/ references |
| 6 | `rg -n 'activated\|activation\|adapter.*active\|live.*adapter\|production.*deploy' <canonical files>` | Unsupported runtime claims |
| 7 | `rg -n 'kanban\.md' system/mind-strategy.md` | kanban.md authority in strategy |
| 8 | `ls <all referenced paths>` | Broken canonical links |
| 9 | `rg -n 'Version:\|version:' system/folder-contract.md system/task-kanban-contract.md` | Version header gaps |
| 10 | `rg -n 'review_after' system/agent-context/00-current-context.md` | Stale review date |

## Findings

### Finding 1 — CRITICAL: mind-strategy.md line 113 — stale Gateway wording

**File:** `system/mind-strategy.md:113`
**Text:** `Until the Context Gateway exists, agents use:`
**Problem:** Brain Context Pack 1.0 and Context Gateway B2.1–B2.8 are implemented (evidenced by `system/brain-mind-bridge.md` header and `system/mind-roadmap.md` baseline). The Gateway core exists as implemented schema and code; thin adapters remain fixture-only until separately activated. The phrasing "Until the Context Gateway exists" implies nothing is implemented.
**Correct boundary:** Context Gateway core and CLI are implemented; adapter activation status is owned by Brain; the manual targeted-read fallback is retained as the current default retrieval path for Mind agents.
**Authority:** `system/brain-mind-bridge.md:8`, `system/mind-roadmap.md:34`

### Finding 2 — CRITICAL: mind-strategy.md lines 47 and 60 — kanban.md classified as compatibility

**File:** `system/mind-strategy.md:47,60`
**Text (line 47):** `tasks.md` listed in the target structure; `kanban.md` absent.
**Text (line 60):** `kanban.md and remaining legacy folders are compatibility surfaces only`
**Problem:** M1.4 (complete 2026-07-31) explicitly decided `kanban.md` is the sole current human task authority. The strategy's "target structure" lists `tasks.md` as canonical and classifies `kanban.md` as compatibility — the opposite of the confirmed authority.
**Authority:** `system/task-kanban-contract.md`, `system/reports/m1-3-m1-4-closure-2026-07-31.md`, `system/infinite-brain-philosophy.md:143`, `system/folder-contract.md:17`

### Finding 3 — HIGH: mind-strategy.md line 73 — information classes table lists tasks.md as Commitment home

**File:** `system/mind-strategy.md:73`
**Text:** `| Commitment | Human-approved decision, task, priority, or project state | tasks.md, projects/, organizations/, or knowledge/ |`
**Problem:** The M1.4 decision retired `tasks.md`. Listing it as the default home for Commitment class contradicts all other canonical documents.
**Authority:** Same as Finding 2.

### Finding 4 — MEDIUM: folder-contract.md and task-kanban-contract.md — missing authority headers

**File:** `system/folder-contract.md`
**Missing:** `Version:`, `Owner role:`, `Depends on:`, and explicit conflict rule
**File:** `system/task-kanban-contract.md`
**Missing:** `Version:`, `Owner role:`, `Depends on:`, `Last reviewed:`, and explicit conflict rule
**Required by:** M1.5 specification (implementation plan MS0.10/M1.5)

### Finding 5 — MEDIUM: agent-context/00-current-context.md — review_after date past due

**File:** `system/agent-context/00-current-context.md:6`
**Text:** `review_after: 2026-07-24`
**Problem:** Today is 2026-07-31; the review-after date has passed without update. Content is still accurate but the freshness commitment is broken.

### Finding 6 — LOW: infinite-brain-philosophy.md and mind-strategy.md — missing Owner role and Depends on

**File:** `system/infinite-brain-philosophy.md`
**Present:** Status, Version, Last reviewed, Purpose
**Missing:** Owner role (inferred: Steve Westhoek), Depends on (root document — none)
**File:** `system/mind-strategy.md`
**Present:** Status, Version, Last reviewed, Depends on
**Missing:** Owner role (inferred: Steve Westhoek)

These are M1.5 targets and are not yet expected. Noted for checklist preparation.

## Passed checks

| Check | Result |
|---|---|
| Duplicate authority for same concern | PASS — no two canonical files claim the same scope without explicit differentiation |
| Legacy capture/inbox and capture/failed in active instructions | PASS — all references are labeled historical/retired/compatibility |
| Legacy router/ in agent-context | PASS — all references are labeled historical/compatibility |
| Unsupported runtime activation claims | PASS — bridge and roadmap correctly state "fixture-only until separately activated" |
| Broken canonical links (all referenced paths) | PASS — every file referenced in canonical docs exists |
| kanban.md/tasks.md content unchanged | N/A — this is a read-only audit |
| home.md authority claims | PASS — correctly states kanban.md authority and tasks.md retired status |
| system/README.md links | PASS — all listed contracts exist |
| brain-mind-bridge.md boundary claims | PASS — correctly states "implemented and validated" for Context Pack 1.0 and "fixture-only until separately activated" for adapters |

## Summary

| Severity | Count | Actionable now |
|---|---|---|
| CRITICAL | 2 | Yes — targeted corrections in mind-strategy.md |
| HIGH | 1 | Yes — targeted correction in mind-strategy.md |
| MEDIUM | 2 | Finding 4 deferred to M1.5; Finding 5 actionable now |
| LOW | 1 | Deferred to M1.5 |
| **Total** | **6** | **4 actionable now** |

## Recommendations

1. **Fix Finding 1:** Replace "Until the Context Gateway exists" with precise current boundary wording.
2. **Fix Findings 2–3:** Add `kanban.md` to the target structure, classify `tasks.md` as retired, and update the Commitment row in the information classes table.
3. **Fix Finding 5:** Update `review_after` to a future date after actual review.
4. **Defer Findings 4 and 6** to MS0.10/M1.5 authority-header normalization.

## Post-audit resolution — 2026-07-31

All findings resolved in same session:

| Finding | Resolution |
|---|---|
| Finding 1 (Gateway wording) | Fixed in mind-strategy.md — M1.5 session |
| Finding 2 (kanban.md classified as compatibility) | Fixed in mind-strategy.md — M1.5 session |
| Finding 3 (tasks.md in Commitment table) | Fixed in mind-strategy.md — M1.5 session |
| Finding 4 (folder-contract.md missing headers) | Fixed during M1.5 execution; task-kanban-contract.md completed during Priority 2 governance closure |
| Finding 5 (stale review_after) | Fixed in 00-current-context.md — M1.5 session |
| Finding 6 (missing Owner role) | Fixed during M1.5 execution for all six files |

`system/task-kanban-contract.md` now has: Status, Version, Last reviewed, Owner role, Depends on, and Conflict rule. All seven canonical governance files carry the full authority header set.
