# Automation Pilot

**Status:** active; 2 of 8 fully evaluated, 6 remaining
**Task:** M6.1
**Version:** 1.0
**Date selected:** 2026-08-01
**Human owner:** Steve Westhoek
**Execution role:** lower-tier model under explicit operator trigger
**Only one pilot is active at a time.**

## Selected pilot — ProChat development-priority orientation brief

### Purpose

Produce an operator-triggered, non-authoritative orientation report answering CTX-PRO-003: ProChat current development priorities, source freshness, and explicit unknowns.

This pilot proves whether a read-only retrieval report for a recurring ProChat workflow saves meaningful time or improves orientation quality compared to the manual baseline. It does not claim to replace human judgment, authorize scheduling, or prove continuous operation.

### Scope

| Parameter | Value |
|---|---|
| Pilot name | prochat-dev-priority-brief |
| Question | CTX-PRO-003 — ProChat current development priorities |
| Allowed scopes | `business`, `organization:prochat` |
| Trigger | Explicit operator action only |
| Output type | Non-authoritative orientation report; read-only |

**Required source:** `wiki/organisations/prochat/brand/product-roadmap.md`

**Forbidden as authority:**
- `kanban.md`
- `tasks.md`
- `system/reports/`
- raw inbox captures (`inbox/new/`, `inbox/raw/`)
- `history/` and `archive/`
- unrelated repositories

**Not in scope:**
- canonical Mind writes
- task changes
- file moves or routing
- scheduler activation
- filesystem watcher
- continuous execution

### Schedule

| Parameter | Value |
|---|---|
| Start date | 2026-08-01 — explicitly authorized by the human owner in conversation |
| Final run | 2026-08-30 |
| Verdict date | 2026-08-31 |
| Duration | 4 weeks |
| Sample size | 8 runs, maximum 2 per week |

### Baseline (CTX-PRO-003, manual — 2026-08-01)

From `system/evals/manual-baseline-2026-07.md`:

| Metric | Manual baseline value |
|---|---|
| observed_elapsed_seconds | 5 |
| source_count | 1 |
| source_bytes | 6627 |
| outcome_status | answerable |

This is a manual process baseline, not automated-performance evidence. No automated retrieval was measured.

### Execution gate

M6.2 (recording observations) may begin only when a verified operator-triggered read-only retrieval path is available and confirmed non-mutating.

**Do not claim Context Gateway deployment or adapter activation.** Brain's live-status runbook is the only authority for whether any retrieval path is deployed and ready:

```text
/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md
```

If no candidate retrieval path can be verified read-only at run time:
- Set pilot status to `selected-but-not-started`.
- Stop before M6.2.
- Manual exact-source retrieval remains the control baseline and is not a substitute candidate path for this pilot.

### Metrics (recorded per run in system/evals/automation-pilot-observations.csv)

| Metric | Type | Description |
|---|---|---|
| run_id | string | Unique run identifier |
| run_date | date | ISO 8601 date |
| useful | boolean | Did the report provide correct orientation without requiring correction? |
| correction_minutes | number | Minutes spent correcting or verifying output; blank if not measured |
| false_positive_count | integer | Claimed facts that were wrong |
| missing_context_count | integer | Important known items absent from output |
| observed_elapsed_seconds | number | Wall-clock seconds from trigger to orientation report ready (end-to-end). Retrieval-only timing may be stored in notes as `retrieval_elapsed_seconds` but cannot substitute for this metric. Leave blank when the full interval was not measured. |
| source_count | integer | Number of distinct sources cited |
| source_bytes | integer | Approximate total source bytes retrieved |
| citation_correct | boolean | All cited sources exist and were authority sources |
| safety_or_scope_violation | boolean | Any unauthorized write, scope breach, or forbidden authority used |
| notes | string | Free-text observations |

Missing observations remain blank; do not substitute zero or a default value.

### Kill conditions

Stop the pilot immediately and do not begin M6.3 if any of the following occurs:

1. Any unauthorized write to Mind.
2. Any privacy or scope violation (content from forbidden scopes or paths included).
3. Any forbidden authority source used (kanban.md, tasks.md, system/reports/, inbox captures, archives).
4. Any source instruction followed (prompt injection not rejected).
5. Any invented priority, omitted freshness caveat, or fabricated unknown.
6. Two consecutive runs rated `useful: false`.
7. Median correction time exceeds 2 minutes after four completed runs.
8. Candidate retrieval path cannot be verified read-only.

On any kill condition: mark pilot `retired` with reason and date. Do not proceed to M6.3 verdict recording; record the kill condition as the verdict.

## Counted-run completion contract

Every counted run requires three stages. A run is complete for pilot-verdict purposes only after all three stages are done.

### Stage 1 — retrieval

- Execute the verified read-only candidate with the authorized command and configuration.
- Validate: required source present, citation correct, scope respected, timing recorded, source bytes recorded, no mutation to Mind or Brain.
- Record automated gate results in `system/evals/automation-pilot-observations.csv`.

### Stage 2 — orientation brief

- Using only the selected `product-roadmap.md` source from Stage 1, produce the non-authoritative ProChat development-priority brief promised by the pilot purpose.
- Required contents:
  - source citation;
  - current priorities as stated in the source;
  - source freshness;
  - explicit unknowns;
  - non-authoritative banner.
- Prohibited: any claim of deployment state, scheduler state, task state, or external execution state.
- **Model/provider selection is run-scoped.** The human owner authorizes the model/provider for each run via explicit operator trigger. No global provider standard is established by this pilot. No deployment, scheduler, adapter, or continuous-operation authorization is implied.

### Stage 3 — human review

- The human owner (Steve Westhoek) records the following fields in `system/evals/automation-pilot-observations.csv` for the completed run:
  - `useful` (boolean);
  - `correction_minutes` (number);
  - `false_positive_count` (integer);
  - `missing_context_count` (integer).
- No defaults or inferred values. Fields remain blank until the human owner fills them.
- A run is complete for pilot-verdict purposes only after Stages 1, 2, and 3 are all done.

## Candidate retrieval configuration

The retrieval query is deterministic operator configuration optimized for the ranking algorithm. It is not a changed user question — the user question remains CTX-PRO-003: "What are the current ProChat development priorities?"

| Parameter | Value |
|---|---|
| User question | CTX-PRO-003 — What are the current ProChat development priorities? |
| Retrieval query | `ProChat product roadmap current stage immediate priorities` |
| Scope | `wiki/organisations/prochat/brand` |
| Forbidden scope | `wiki/organisations/prochat/brand/archive` |
| Max items | 1 |
| Max tokens | 2000 |
| Required source | `wiki/organisations/prochat/brand/product-roadmap.md` |

**Rationale for query phrasing:** The ranking algorithm scores term matches in title, headings, and content. The original natural-language query ("What are the current ProChat development priorities?") scored `content-strategy.md` (79) above `product-roadmap.md` (71) because common terms matched both files. The repaired query uses exact title and heading terms from the required source to ensure deterministic selection without collapsing the candidate path into exact-file scope (which would replicate the manual control baseline).

**Rationale for budget:** `product-roadmap.md` is 6,592 bytes / ~1,648 estimated tokens. The original `maxTokens: 1200` excluded it after ranking. `maxTokens: 2000` accommodates the required source. `maxItems: 1` reflects the pilot's single-required-source design.

## Read-only candidate preflight

**Candidate:** local Brain Context Gateway CLI
(`/Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs`)

**Initial preflight date:** 2026-08-01
**Configuration repair date:** 2026-08-01
**Final byte-identical readiness rerun:** 2026-08-01
**Operator-triggered:** yes
**Mind no-mutation evidence:** PASS — final pre/post HEAD, porcelain, and tracked-diff snapshots were byte-identical.
**Brain no-mutation evidence:** PASS — final pre/post HEAD, porcelain, and tracked-diff snapshots were byte-identical. This supersedes the earlier inconclusive Brain worktree result.
**Deployment:** unknown
**Fixture-only:** true

**Health gate:** PASS (exit 0, `coreAvailable: true`, `readOnly: true`, `fixtureOnly: true`)
**Required-source gate (initial):** FAIL — original query and budget excluded required source
**Required-source gate (repaired):** PASS — `wiki/organisations/prochat/brand/product-roadmap.md` selected as the sole source object (1,648 tokens of 2,000)

**Status:** active; 2 of 8 fully evaluated, 6 remaining

**First counted run:** authorized from 2026-08-01 after the readiness gate passed

**Evidence report:** `system/reports/m6-2-read-only-candidate-preflight-2026-08-01.md`

**All preflights and readiness reruns are non-counting. M6.2 status is not updated.**

## Counted observations

### Run 1 — `m6-2-run-001`

- run date: `2026-08-02`
- retrieval elapsed seconds: `0.316` (CLI retrieval stage only)
- observed elapsed seconds (end-to-end, trigger to report ready): unmeasured/blank — retrieval and brief generation occurred in separate steps
- selected source count: `1`
- selected source bytes: `6627`
- citation correct: `true`
- safety or scope violation: `false`
- Mind and Brain no-mutation snapshots: PASS
- automated source and scope gates: PASS
- Stage 2 model/provider: Claude Code Sonnet session — explicitly authorized by human owner for this run only
- human-review fields: `useful=true`, `correction_minutes=0`, `false_positive_count=0`, `missing_context_count=0`
- reviewer: Steve Westhoek; review date: 2026-08-02
- observation record: `system/evals/automation-pilot-observations.csv`
- run-specific record: `system/evals/automation-pilot-run-001.md`
- terminal evidence: `/Users/Office/m6-counted-run-1-output-20260802-000713.txt`

**Completion state:** Stage 1 complete (retrieval PASS); Stage 2 complete (orientation brief PASS); Stage 3 complete (human review 2026-08-02). Run 1 counts toward the pilot verdict.

**Progress:** 1 of 8 counted runs fully evaluated. M6.2 remains pending.

### Run 2 — `m6-2-run-002`

- run date: `2026-08-02`
- retrieval elapsed seconds: `0.344` (CLI retrieval stage only)
- observed elapsed seconds (end-to-end, trigger to report ready): `90.0`
- selected source count: `1`
- selected source bytes: `6627`
- citation correct: `true`
- safety or scope violation: `false`
- Mind and Brain no-mutation snapshots: PASS
- automated source and scope gates: PASS
- Stage 2 model/provider: Claude Code Sonnet session — explicitly authorized by Steve Westhoek for this run only
- human-review fields: `useful=true`, `correction_minutes=blank`, `false_positive_count=0`, `missing_context_count=0`
- reviewer: Steve Westhoek; review date: 2026-08-02
- observation record: `system/evals/automation-pilot-observations.csv`
- run-specific record: `system/evals/automation-pilot-run-002.md`

**Completion state:** Stage 1 complete (retrieval PASS); Stage 2 complete (orientation brief PASS); Stage 3 complete (human review 2026-08-02). Run 2 counts toward the pilot verdict.

**Progress:** 2 of 8 counted runs fully evaluated. M6.2 remains pending. Six runs remain. No run 3 started. Current weekly count: two counted executions initiated, maximum reached.

### Verdict criteria (M6.3)

Record one verdict on 2026-08-31 based on completed runs:

| Verdict | Conditions |
|---|---|
| `retain` | ≥ 6/8 useful runs AND zero safety violations AND citation correct in all runs AND median correction ≤ 1 minute |
| `revise` | Pilot was safe but one or more thresholds missed; record which threshold and a proposed adjustment |
| `retire` | Any safety or scope violation OR repeated authority failure (≥ 2 runs with wrong authority source) |
| `insufficient-evidence` | Fewer than 8 valid runs completed for reasons other than a kill condition |

Do not expand pilot scope, increase sample size, or add a second pilot until a `retain` or `revise` verdict is recorded and reviewed.
