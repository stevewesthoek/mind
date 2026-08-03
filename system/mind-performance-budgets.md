# Mind Performance Budgets

**Status:** canonical provisional budgets for M7.4
**Version:** 1.0
**Last reviewed:** 2026-08-03
**Review after:** 2026-09-03
**Owner role:** Steve Westhoek (human policy); Brain owns runtime measurement
**Depends on:** `system/mind-strategy.md`, `system/brain-mind-bridge.md`,
`system/generated-output-policy.md`

These budgets bound the cost of orienting an agent and retrieving Mind context.
They are repository policy, not evidence that Context Gateway, Graphify, or an
adapter is deployed. Brain's live-status runbook remains authoritative for
runtime state.

## Budget table

| Concern | Budget | 2026-08-03 baseline | Measurement | Review date |
|---|---|---|---|---|
| Startup context files | The four required files total no more than 16 KiB and 2,000 whitespace-delimited words | 12,400 bytes, 1,615 words after the completion-audit status update | `wc -c -w system/agent-context/AGENTS.md system/agent-context/00-start-here.md system/agent-context/00-current-context.md system/agent-context/00-memory-map.md` | 2026-09-03 |
| Manual navigation depth | At most 3 link transitions from an entrypoint to the canonical domain source for a routine question | 10 representative questions; median 2 transitions, maximum 3; PASS | Re-run the path-chain method in `system/reports/manual-navigation-depth-baseline-2026-08-03.md` and report median/max | 2026-09-03 |
| Generated storage — current projections | Current receipt and compatibility projections tracked in Git stay below 1 MiB total | `graph-refresh-latest.md` plus `.json` use 8 KiB by filesystem blocks | `du -ck system/reports/graph-refresh-latest.md system/reports/graph-refresh-latest.json | tail -1` | 2026-09-03 |
| Generated storage — report evidence | `system/reports/` stays below 5 MiB; growth beyond the budget requires retention review, not automatic deletion | 852 KiB after the completion-audit evidence reports | `du -sk system/reports` | 2026-09-03 |
| Generated storage — Graphify working set | `.graphify-out/` stays below 25 MiB when present | Provisional: directory absent; Graphify is quiesced | `test ! -e .graphify-out || du -sk .graphify-out`; establish the first baseline only after an authorized Brain-owned refresh | 2026-09-03 |
| Context Gateway response tokens | Default bounded retrieval uses at most 2,000 estimated tokens unless a task records a justified override | Fixture-only pilot used 1,648 of 2,000 tokens for one required source | Use the CLI receipt `budget.usedTokens` and `budget.maxTokens`; do not infer activation from a receipt or fixture | 2026-09-03 |
| Retrieval latency | Local CLI retrieval-stage p95 stays at or below 1.0 second for the bounded single-source fixture | 8 samples; nearest-rank p95 `0.346` seconds; range `0.297`–`0.346` | Parse `retrieval_elapsed_seconds` from `system/evals/automation-pilot-observations.csv`, sort numerically, and use nearest-rank p95 | 2026-09-03 |

## Interpretation rules

- A budget breach is a review trigger, not deletion or deployment authority.
- Startup size and navigation depth protect human and model usability; reducing
  bytes must not remove authority, privacy, freshness, or safety context.
- Generated evidence required for audit or recovery follows
  `system/generated-output-policy.md`; storage pressure never permits silent
  removal.
- Retrieval-stage latency excludes model generation and human review. It must
  not be presented as end-to-end time savings. The Priority 6 pilot did not
  demonstrate end-to-end savings against its five-second manual baseline.
- Context Gateway and Graphify measurements are provisional or fixture-bound
  until Brain supplies separate authorized runtime evidence.

## Baseline and remeasurement tasks

1. Complete (2026-08-03): 10 representative questions across current context,
   personal, organization, project, repository, faith, research, tasks, and the
   AI-system boundary recorded a median of 2 and maximum of 3 transitions.
   Evidence: `system/reports/manual-navigation-depth-baseline-2026-08-03.md`.
2. After the first separately authorized Brain-owned Graphify refresh, record
   `.graphify-out/` storage without changing the 25 MiB budget unless evidence
   supports a reviewed revision.
3. Re-measure all budgets after a startup contract, routing map, retrieval
   schema, or generated-output policy change.

## Failure and escalation

If a budget is exceeded, record the exact measurement, identify the responsible
artifact or query class, and create a bounded follow-up task. Do not compress
away required policy, broaden retrieval, activate a runtime, or delete evidence
to manufacture a pass.
