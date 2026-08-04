# Mind Performance Budgets

**Status:** canonical budgets for M7.4
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
| Startup context files | The four required files total no more than 16 KiB and 2,000 whitespace-delimited words | 13,905 bytes, 1,821 words after the M2.4/M7.1 closure update; PASS | `wc -c -w system/agent-context/AGENTS.md system/agent-context/00-start-here.md system/agent-context/00-current-context.md system/agent-context/00-memory-map.md` | 2026-09-03 |
| Manual navigation depth | At most 3 link transitions from an entrypoint to the canonical domain source for a routine question | 10 representative questions; median 2 transitions, maximum 3; PASS | Re-run the path-chain method in `system/reports/manual-navigation-depth-baseline-2026-08-03.md` and report median/max | 2026-09-03 |
| Generated storage — current projections | Current receipt and compatibility projections tracked in Git stay below 1 MiB total | `graph-refresh-latest.md` plus `.json` use 8 KiB by filesystem blocks | `du -ck system/reports/graph-refresh-latest.md system/reports/graph-refresh-latest.json | tail -1` | 2026-09-03 |
| Generated storage — report evidence | `system/reports/` stays below 5 MiB; growth beyond the budget requires retention review, not automatic deletion | 856 KiB after M2.4/M7.1 closure evidence; PASS | `du -sk system/reports` | 2026-09-03 |
| Generated storage — Graphify working set | The accepted Brain operational run stays below 25 MiB allocated | Accepted run `20260804T000604198Z-06de527423e0`: 8,972 KiB allocated, 4,359,884 logical bytes, 600 files; PASS | `du -sk "$BRAIN_REPO/runtime/local/graphify/mind-knowledge/runs/20260804T000604198Z-06de527423e0"` where `BRAIN_REPO` is the local Brain checkout; receipt details in `system/reports/graph-refresh-latest.json` | 2026-09-03 |
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
- Context Gateway and Graphify measurements are valid only when bound to their
  cited Brain runtime evidence; repository configuration alone proves neither
  deployment nor freshness.

## Baseline and remeasurement tasks

1. Complete (2026-08-03): 10 representative questions across current context,
   personal, organization, project, repository, faith, research, tasks, and the
   AI-system boundary recorded a median of 2 and maximum of 3 transitions.
   Evidence: `system/reports/manual-navigation-depth-baseline-2026-08-03.md`.
2. Complete (2026-08-04): the first separately authorized Brain-owned Graphify
   refresh established an 8,972 KiB allocated working-set baseline without
   changing the 25 MiB budget. Evidence:
   `system/reports/graph-refresh-latest.json`.
3. Re-measure all budgets after a startup contract, routing map, retrieval
   schema, or generated-output policy change.

## Failure and escalation

If a budget is exceeded, record the exact measurement, identify the responsible
artifact or query class, and create a bounded follow-up task. Do not compress
away required policy, broaden retrieval, activate a runtime, or delete evidence
to manufacture a pass.
