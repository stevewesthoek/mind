# M2 Context Policy and Fixtures — 2026-07-31

**Status:** M2.1–M2.3 PASS; M2.4 BLOCKED
**Scope:** Mind Priority 2 — context-pack human policy, privacy scopes, and authority examples
**Repository mutation:** documentation only; no runtime, automation, or task changes

## Brain evidence read

Brain Context Pack schema `1.0`: `/Users/Office/Repos/stevewesthoek/brain/operations/specs/context-pack.schema.json`
Brain live-status page: `/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md` (last verified 2026-07-31)

## Schema validation — M2.1

Comparison of Brain schema `1.0` fields against `system/brain-mind-bridge.md` context-pack section:

| Schema field | Type / constraint | Present in bridge | Notes |
|---|---|---|---|
| packId | string, non-empty | YES | mapped from human `pack_id` |
| version | const "1.0" | YES | mapped from human `schema_version` |
| queryId | string, non-empty | YES | mapped from human `query` |
| generatedAt | date-time | YES | mapped from human `created_at` |
| freshness | fresh\|stale\|mixed\|unknown | YES | top-level pack freshness |
| authorizedScopes | array min 1 | YES | mapped from human `scopes_searched` |
| sources[].sourceId | string | YES | |
| sources[].path | string | YES | |
| sources[].authority | canonical\|supporting\|conflicting\|untrusted | YES | with 7-value human expansion and mapping |
| sources[].citation | string non-empty | YES | |
| sources[].sha256 | 64-char hex | YES | |
| sources[].freshness | fresh\|stale\|unknown | YES | per-source freshness (distinct from top-level) |
| sources[].scope | string | YES | |
| sources[].untrusted | boolean | YES | |
| conflicts[].field | string | YES | |
| conflicts[].leftSourceId | string | YES | |
| conflicts[].rightSourceId | string | YES | |
| unknowns | array of strings | YES | |
| exclusions[].sourceId | string | YES | |
| exclusions[].reason | string | YES | |
| privacyClassification | public\|internal\|sensitive | YES | |
| budget.maxItems | int 1–20 | YES | mapped from human context_budget |
| budget.maxTokens | int | YES | |
| budget.usedItems | int | YES | |
| budget.usedTokens | int | YES | mapped from human `estimated_tokens` |
| truncation.truncated | boolean | YES | |
| truncation.reason | string\|null | YES | |
| provenance.retriever | string | YES | mapped from human `producer` |
| provenance.corpusVersion | string | YES | |
| provenance.deterministicOrder | const true | YES | with enforcement rule |
| state.repository | string | YES | |
| state.deployed | string | YES | |
| state.observed | string | YES | |
| state.verified | string | YES | |
| safetyWarnings | array of strings | YES | |
| modelSuppliedAuthority | boolean (optional) | YES | with prohibition rule |

**Result:** all 35 schema fields covered. Human-policy aliases mapped explicitly. No field mismatch. Version reference exact ("1.0").

## M2.1 validation commands

```bash
rg -n 'packId|queryId|generatedAt|authorizedScopes|privacyClassification|safetyWarnings|deterministicOrder|modelSuppliedAuthority' system/brain-mind-bridge.md
# returned 14 matches — all machine-field names present

rg -n '"1\.0"' system/brain-mind-bridge.md
# returned 2 matches — version reference exact in both machine field definition and mapping table
```

**M2.1 result:** PASS

## M2.2 validation

Six scopes verified in `system/context-privacy-scopes.md`:

| Scope | Purpose | Default exclusions | Cross-scope escalation | Fail-closed |
|---|---|---|---|---|
| personal | YES | YES | YES | YES |
| business | YES | YES | YES | YES |
| ministry | YES | YES | YES | YES |
| project:\<id\> | YES | YES | YES | YES |
| organization:\<id\> | YES | YES | YES | YES |
| public-safe | YES | YES | N/A (most restrictive) | YES |

Additional verified per-scope fields: citation expectations, third-party privacy, secret/credential exclusion.

```bash
rg -c '\*\*Purpose:\*\*' system/context-privacy-scopes.md
# 6 — one per scope

rg -n '^\*\*Purpose:\*\*|^\*\*Default exclusions:\*\*|^\*\*Cross-scope escalation:\*\*|^\*\*Fail-closed' system/context-privacy-scopes.md | wc -l
# 26 — all required subsections present across six scopes
```

**M2.2 result:** PASS

## M2.3 validation

Ten examples verified in `system/context-authority-examples.md`:

| # | Category | Query | Authority | Selected | Excluded | Privacy | Freshness | Unknowns | Explanation |
|---|---|---|---|---|---|---|---|---|---|
| 1 | human decision vs capture | pricing model | human-decision | decisions.md | inbox capture | business | fresh | none | YES |
| 2 | human decision vs capture (conflict) | flat-rate pricing | human-decision+conflict | decisions.md | none (both) | business | mixed | YES | YES |
| 3 | canonical strategy vs research | enterprise GTM | canonical | strategy.md | none (supporting) | business | fresh | none | YES |
| 4 | canonical strategy vs research (supersedes) | acquisition channel | human-decision | decisions.md | none (conflicting) | business | mixed | YES | YES |
| 5 | current vs superseded | tech stack | canonical | architecture.md | history/ | business | fresh | none | YES |
| 6 | current vs superseded (history query) | auth pre-rewrite | canonical (historical) | history/ | none | business | fresh | none | YES |
| 7 | conflicting sources | open-source policy | conflicting | both | none | business | mixed | YES | YES |
| 8 | conflicting sources (inference) | churn rate | human-decision | decisions.md | none (untrusted) | business | mixed | YES | YES |
| 9 | missing evidence | Q2 survey results | N/A missing | context only | none | business | unknown | YES | YES |
| 10 | missing evidence + scope limit | pastoral feedback | N/A missing | context only | ministry-scoped | project:id | unknown | YES | YES |

```bash
rg -c '## Example' system/context-authority-examples.md
# 10 — exactly ten examples

rg -n 'query:|candidate sources:|expected authority:|selected source:|excluded source:|privacy scope:|freshness result:|expected unknowns:|explanation:' system/context-authority-examples.md -i | wc -l
# 92 — all required fields present (10 × 9 = 90 minimum; 2 examples have multi-line unknowns)
```

All examples use synthetic or redacted content. No real disputed belief, strategy, or personal fact resolved.

**M2.3 result:** PASS

## Security scan

```bash
rg -n 'password|secret|api.key|credential|token|private.key|webhook.*http|\.env' \
  system/brain-mind-bridge.md system/context-privacy-scopes.md \
  system/context-authority-examples.md system/reports/documentation-consistency-2026-07-31.md
```

All matches are prohibition statements (e.g., "never include credentials, tokens, API keys") or token-budget references (e.g., "usedTokens"). No actual secrets, credentials, or unsafe path claims found.

```bash
rg -n '/etc/|/tmp/|~/.ssh|\.env\b' system/context-privacy-scopes.md system/context-authority-examples.md
# 0 matches
```

**Security result:** PASS

## Governance residual closure

`system/task-kanban-contract.md` authority headers added: Status 1.0, Version 1.0, Last reviewed 2026-07-31, Owner role, Depends on, Conflict rule.

`system/reports/documentation-consistency-2026-07-31.md` post-audit resolution note appended confirming all six findings resolved.

## M2.4 status and blocker

**M2.4 is blocked.** Gateway adapter activation is not confirmed by Brain live evidence.

Brain capability table (2026-07-31):

| Capability | Deployed | Observed | Verified |
|---|---|---|---|
| context-gateway-core | unknown | observed | verified |
| context-gateway-cli-resolve | unknown | observed | verified |
| context-gateway-cli-health | unknown | observed | verified |
| context-gateway-cli-explain | unknown | observed | verified |
| fixture-only-thin-mcp-adapter | unknown | observed | verified |
| retrieval-trust-boundary | unknown | observed | verified |

All gateway capabilities show `deployed: unknown`. None show `active` state. The MCP adapter is `fixture-only` safety level.

M2.4 requires: Gateway adapter `deployed` status confirmed AND fallback health verified. Neither condition is met by current Brain live-status evidence. M2.4 remains blocked until Brain separately activates and verifies adapter deployment.

## Remaining risks

1. **M2.4 blocker:** Gateway adapter `deployed: unknown` in Brain capability table. No action required in Mind until Brain activates and confirms.
2. **Priority 1 exit gate:** Brain-owned — legacy Mind Steward package retirement and path-contract test passage are Brain-local work. Mind cannot clear this gate.
3. **Field mapping drift:** if Brain updates Context Pack schema beyond version 1.0, the bridge mapping table and privacy-scope `privacyClassification` enum must be reviewed. No versioned change notification mechanism exists yet.

## Changed files

| File | Change |
|---|---|
| `system/task-kanban-contract.md` | Added authority header block (Status, Version, Last reviewed, Owner role, Depends on, Conflict rule) |
| `system/reports/documentation-consistency-2026-07-31.md` | Appended post-audit resolution note |
| `system/brain-mind-bridge.md` | Replaced context-pack section with schema-aligned machine fields, explicit field mapping, authority/freshness mapping tables, privacy scope reference, conflict/citation/unknown/least-disclosure rules |
| `system/context-privacy-scopes.md` | NEW — six scope definitions with all required fields |
| `system/context-authority-examples.md` | NEW — ten synthetic authority-resolution examples |
| `system/mind-implementation-plan.md` | Marked M2.1–M2.3 complete; M2.4 blocked with exact evidence; updated roadmap reference |
| `system/mind-roadmap.md` | Updated Priority 2 status to in-progress with evidence reference |
| `system/reports/m2-context-policy-fixtures-2026-07-31.md` | NEW — this report |

## Exact next roadmap task

Priority 2 Mind work is complete pending M2.4 (blocked on Brain). The next available Mind-owned work is:

**M3.1 — Create the question corpus** (`system/evals/context-questions.yaml`)

Priority 3 depends on Priority 2's core output contract (now satisfied by M2.1–M2.3). M3.1 may proceed independently of M2.4 since it uses the policy definitions, not the live Gateway.
