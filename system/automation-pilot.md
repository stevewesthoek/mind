# Automation Pilot

**Status:** complete; 8 of 8 fully evaluated; M6.3 verdict `retain` (2026-08-03)
**Task:** M6.1–M6.3
**Version:** 1.0
**Date selected:** 2026-08-01
**Human owner:** Steve Westhoek
**Execution role:** run-scoped model/provider under explicit operator trigger
**Only one pilot was active. No second pilot or continuous execution is authorized.**

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
| Original start date | 2026-08-01 |
| Original final-run date | 2026-08-30 |
| Original verdict date | 2026-08-31 |
| Cadence change | 2026-08-03 — Steve Westhoek withdrew fixed calendar gating; immediate bounded serial execution authorized |
| Sample size | 8 runs total |

### Execution policy (updated 2026-08-03)

All eight runs are fully evaluated. Runs 3–8 executed in the authorized immediate serial batch on 2026-08-03. No date gate remains.

**Execution constraints:**
- Runs execute one at a time
- Each run has one independent CLI invocation
- No concurrent or background executions
- No run reuse or duplication
- All existing safety, authority, and no-mutation gates remain binding
- Kill conditions and verdict thresholds unchanged
- Verdict recorded after all 8 runs received human review

**Cadence change rationale:** No documented technical dependency requires calendar spacing. Immediate execution satisfies all safety and authority gates. Evidence limitation from compressed timeline must be disclosed in M6.3 verdict.

**Evidence:** `system/reports/m6-2-pilot-cadence-decision-2026-08-03.md`

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

**Status:** complete; 8 of 8 fully evaluated; verdict `retain`

**First counted run:** authorized from 2026-08-01 after the readiness gate passed

**Evidence report:** `system/reports/m6-2-read-only-candidate-preflight-2026-08-01.md`

**All preflights and readiness reruns are non-counting.**

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

**Pilot window:** Window 1 (2026-08-01 through 2026-08-07); execution 1 of 2.

**Progress at that point:** 1 of 8 counted runs fully evaluated. Final eight-run result is recorded below.

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

**Progress at that point:** 2 of 8 counted runs fully evaluated. Runs 3–8 were subsequently completed in the authorized immediate serial batch.

### Runs 3–8 — official immediate serial batch

| Run | Run date | Retrieval seconds | End-to-end seconds | Useful | Correction minutes | False positives | Missing context | Source count | Source bytes | Citation correct | Safety/scope violation | Record |
|---|---|---:|---:|---|---:|---:|---:|---:|---:|---|---|---|
| `m6-2-run-003` | 2026-08-03 | 0.297 | 79.101 | true | 0 | 0 | 0 | 1 | 6627 | true | false | `system/evals/automation-pilot-run-003.md` |
| `m6-2-run-004` | 2026-08-03 | 0.309 | 37.743 | true | 0 | 0 | 0 | 1 | 6627 | true | false | `system/evals/automation-pilot-run-004.md` |
| `m6-2-run-005` | 2026-08-03 | 0.346 | 24.523 | true | 0 | 0 | 0 | 1 | 6627 | true | false | `system/evals/automation-pilot-run-005.md` |
| `m6-2-run-006` | 2026-08-03 | 0.313 | 24.117 | true | 0 | 0 | 0 | 1 | 6627 | true | false | `system/evals/automation-pilot-run-006.md` |
| `m6-2-run-007` | 2026-08-03 | 0.304 | 25.918 | true | 0 | 0 | 0 | 1 | 6627 | true | false | `system/evals/automation-pilot-run-007.md` |
| `m6-2-run-008` | 2026-08-03 | 0.307 | 25.426 | true | 0 | 0 | 0 | 1 | 6627 | true | false | `system/evals/automation-pilot-run-008.md` |

All six runs completed Stages 1–3. Steve Westhoek explicitly determined that the byte-identical single-source briefs deserved the shared assessment recorded independently in each run file.

### Verdict criteria (M6.3)

Record one verdict based on completed runs (timing: immediately after all 8 runs receive Stage 3 human review):

**Required disclosure in verdict:** Runs 3–8 were completed in an immediate serial batch (cadence change 2026-08-03). This compressed timeline provides valid technical evidence but does not establish multi-week stability. Production deployment would require separate multi-week operational observation.

| Verdict | Conditions |
|---|---|
| `retain` | ≥ 6/8 useful runs AND zero safety violations AND citation correct in all runs AND median correction ≤ 1 minute |
| `revise` | Pilot was safe but one or more thresholds missed; record which threshold and a proposed adjustment |
| `retire` | Any safety or scope violation OR repeated authority failure (≥ 2 runs with wrong authority source) |
| `insufficient-evidence` | Fewer than 8 valid runs completed for reasons other than a kill condition |

Do not expand pilot scope, increase sample size, or add a second pilot until a `retain` or `revise` verdict is recorded and reviewed.

### Recorded verdict — `retain` (2026-08-03)

Observed result:

- 8 of 8 runs useful;
- 7 correction-time measurements at 0 minutes and 1 unmeasured value; measured median 0 minutes;
- 0 false positives;
- 0 missing-context findings;
- 8 of 8 citations correct;
- 0 safety or scope violations;
- no kill condition triggered.

All repository-defined `retain` conditions pass. M6.2 and M6.3 are complete.

The seven measured end-to-end results had a median of 25.918 seconds versus the 5-second manual baseline, so this pilot does not establish time savings. The retained value is correct, consistently cited orientation with zero measured correction burden.

Runs 3–8 were completed in an immediate serial batch on 2026-08-03 rather than across four calendar weeks. This compressed timeline provides valid technical evidence for the recorded Stage 1–3 gates but does not establish multi-week stability or detect latent anomalies that would emerge across real operational use. Production deployment requires separate multi-week operational observation and authorization.

**Verdict evidence:** `system/reports/priority-6-automation-pilot-verdict-2026-08-03.md`

Continuous automation, scheduling, deployment, adapter activation, MCP activation, and a second pilot remain unauthorized.
