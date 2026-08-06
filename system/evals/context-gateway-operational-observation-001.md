# Context Gateway Operational Observation 001

**Observation ID:** context-gateway-operational-observation-001
**Execution date:** 2026-08-04
**Operator-triggered:** yes — explicitly initiated as part of the post-closeout
operational-assurance session defined in
`system/reports/post-closeout-operational-assurance-2026-08-04.md`
**Next observation number:** 002
**No fixed next date:** observation frequency is operator-determined

This record covers one real retrieval session. It does not prove multi-week
stability, production readiness, or meaningful time savings. It does not reopen
any completed roadmap milestone.

## Ledger metadata

- observation_id: 001
- session_date: 2026-08-04
- classification: fixture-only
- qualifying: false
- incident_type: none
- qualifying_count: 0
- target_count: 10
- remaining_sessions: 10
- next_observation: 002

---

## Session metadata

| Field | Value |
|---|---|
| Session start (UTC) | `2026-08-04T13:33:04Z` |
| Session end (UTC) | `2026-08-04T13:34:45Z` |
| Session start (Europe/Lisbon) | `2026-08-04T14:33:04+0100` |
| Elapsed wall-clock | approx. 101 seconds (inclusive of two retries; see notes) |
| Mind branch | `main` |
| Mind HEAD | `2a2cb9c` (successor of approved pin `08b2d1a7`) |
| Pre-session git status | 8 protected paths modified; nothing staged |
| Post-session git status | identical — 8 protected paths modified; nothing staged |
| Mind working-tree mutated | no |

---

## Provider state

| Field | Value |
|---|---|
| Interface used | Brain `mind-context` CLI via `npm --prefix projects/mind-context run cli` |
| Brain repo path | `/Users/Office/Repos/stevewesthoek/brain` (Brain `main`) |
| Package version | `1.0.0` |
| Schema version | `1.0` |
| `coreAvailable` | `true` |
| `readOnly` | `true` |
| `fixtureOnly` | **`true`** — see incident below |
| `networkAccess` | `false` |
| `credentialInspection` | `false` |
| `productionPathInspection` | `false` |
| Provider revision | `51e9091c7374e0642f4fe076b895c184152dd516` (approved; on `origin/codex/mind-m7-m2-unblock`) |
| Approved Mind pin | `08b2d1a7a4f7bc4b447350ee32be7b6da5e26b8e` |
| Actual Mind HEAD | `2a2cb9c` (3 commits ahead of approved pin; committed documentation only) |

**Key finding:** Brain `main` at `/Users/Office/Repos/stevewesthoek/brain` has
`ADAPTER_BOUNDARY = 'fixture-only'`. The live-activated adapter exists on
`origin/codex/mind-m7-m2-unblock` at commit `103440945a...`, which has not been
fetched to this Brain clone and has not been merged into Brain `main`. The MCP
tool registration (`mind_context_health`, `mind_context_resolve`,
`mind_context_explain`) is also absent from this Claude Code session — no
project-scoped `.mcp.json` was found in Mind, and no matching server was
registered in any discoverable Claude config. The MCP interface is project-scoped
to Codex per the M2.4 closure evidence. The CLI was used as the equivalent
interface.

This finding is consistent with the documented state: Brain branch integration
remains a pending Brain-owned follow-up. It does not invalidate M2.4 completion,
which was verified on the evidence branch.

---

## Operator question

```text
What is the current verified operating state of the Mind repository,
which external assurance items remain open, and which canonical Mind
documents support that answer?
```

---

## health result

```json
{
  "command": "health",
  "packageVersion": "1.0.0",
  "schemaVersion": "1.0",
  "corpusVersion": "1.0.0",
  "coreAvailable": true,
  "readOnly": true,
  "fixtureOnly": true,
  "networkAccess": false,
  "credentialInspection": false,
  "productionPathInspection": false
}
```

---

## resolve result

**First attempt** (scopes `system`, `home`) returned `invalid_context_pack:source:0:scope,source:2:scope` — exit code 4. Top-level scope names without subdirectory are not valid. No retry-worthy failure; adjusted scope to `system/agent-context` and `system/reports`.

**Second attempt** (scopes `system/agent-context`, `system/reports`; max-items 6, max-tokens 2000):

```json
{
  "packId": "pack-What is the current verified operating state of the Mind repository, which external assurance items remain open, and which canonical Mind documents support that answer?",
  "version": "1.0",
  "queryId": "What is the current verified operating state of the Mind repository, which external assurance items remain open, and which canonical Mind documents support that answer?",
  "generatedAt": "2026-07-16T12:00:00.000Z",
  "freshness": "fresh",
  "authorizedScopes": ["system/agent-context", "system/reports"],
  "sources": [
    {
      "sourceId": "system-reports-mind-cleanup-final-handoff-2026-06-07-md",
      "path": "system/reports/mind-cleanup-final-handoff-2026-06-07.md",
      "authority": "supporting",
      "citation": "system/reports/mind-cleanup-final-handoff-2026-06-07.md#L1",
      "sha256": "00000000000000000000000000000000000000000000000000000000f369a931",
      "freshness": "unknown",
      "scope": "system/reports"
    },
    {
      "sourceId": "system-reports-brain-console-mind-steward-visibility-plan-2026-06-07-md",
      "path": "system/reports/brain-console-mind-steward-visibility-plan-2026-06-07.md",
      "authority": "supporting",
      "citation": "system/reports/brain-console-mind-steward-visibility-plan-2026-06-07.md#L1",
      "sha256": "00000000000000000000000000000000000000000000000000000000efbf6229",
      "freshness": "unknown",
      "scope": "system/reports"
    }
  ],
  "conflicts": [],
  "unknowns": [],
  "exclusions": [],
  "privacyClassification": "public",
  "budget": {
    "maxItems": 6,
    "maxTokens": 2000,
    "usedItems": 2,
    "usedTokens": 1942
  },
  "truncation": {
    "truncated": true,
    "reason": "budget"
  },
  "provenance": {
    "retriever": "mind-context-core",
    "corpusVersion": "1.0.0",
    "deterministicOrder": true
  },
  "state": {
    "repository": "implemented",
    "deployed": "unknown",
    "observed": "fixture-only",
    "verified": "tested"
  }
}
```

---

## explain result (summary)

The explain command confirmed `fixtureOnly: true`, the same authorized scopes,
and selected `system/reports/ms0-4-graphify-authority-terminology-2026-07-14.md`
as its single source. The full explain output was 67.8 KB (all admitted corpus
items with ranking detail); it confirmed that the explain command is functional
and bounded.

---

## Independent verification

| Dimension | Value | Verification |
|---|---|---|
| `health_success` | true | Health command returned exit 0; `coreAvailable: true`, `readOnly: true` |
| `readback_success` | partial — fixture-only | Core is available and executes; adapter is fixture-only, not live |
| `citation_correct` | partial | Both returned paths resolve and are readable Mind files; but they are June 2026 supporting reports, not the canonical current-state documents for this query |
| `source_fresh` | no — fixture stale | Both returned sources carry `freshness: unknown` and synthetic SHA-256 values (`00000000...`). Real SHA-256 values are `eb04ddf5...` and `568d774d...`. The live-activated adapter computes real hashes; the fixture adapter does not. |
| `scope_respected` | yes | Only `system/agent-context` and `system/reports` paths returned; no forbidden path appeared |
| `privacy_failure` | none | No personal, credential, or out-of-scope content appeared |
| `mutation_path_exposed` | none | Only `health`, `resolve`, and `explain` tools are implemented; no write tool exists in the CLI |
| `stale_source_incident` | **yes** | `generatedAt: "2026-07-16T12:00:00.000Z"` is a synthetic fixture timestamp; the adapter is not reading live source dates. The fixture-only adapter cannot compare the approved Mind pin to the actual working HEAD. Actual Mind HEAD `2a2cb9c` is newer than the approved pin `08b2d1a7`. |
| `operator_correction_minutes` | 0 | The scope error on the first attempt was an expected input-format constraint, not a provider anomaly. No answer correction was required. |
| `retrieval_elapsed_seconds` | approx. 101 s wall-clock (multi-call session); individual CLI calls completed in under 5 seconds each | See notes |

### Citation quality assessment

The canonical documents for this specific question are:
- `system/agent-context/00-current-context.md` — current priority status
- `system/reports/post-closeout-operational-assurance-2026-08-04.md` — open
  assurance items

Neither was returned by the fixture-only resolver. The resolver selected two
June 2026 supporting reports that do not answer the current-state question. This
is a **ranking deficiency** in the fixture-only adapter, not a safety or
authority failure. The live-activated adapter on `origin/codex/mind-m7-m2-unblock`
uses real source-hash and recency data; its ranking behavior may differ.

---

## Warnings and incidents

### Incident 1 — fixture-only adapter on Brain main

The active Brain `main` adapter boundary is `fixture-only`. The live-activated
adapter is on `origin/codex/mind-m7-m2-unblock`, which is not fetched to or
merged into the local Brain clone. This session therefore used the fixture-only
CLI, not the live-activated provider.

**Classification:** KNOWN — consistent with documented Brain branch-integration
follow-up. Not a new failure; not a rollback trigger. The fixture-only state
proves the adapter is bounded and safe.

**Effect on session validity:** this session records fixture-only CLI behavior,
not live-adapter behavior. It is valid as an evidence record of the current
accessible CLI state. It does not substitute for a session on the live-activated
adapter.

### Incident 2 — stale synthetic timestamps and hashes

The fixture adapter returns `generatedAt: "2026-07-16T12:00:00.000Z"` and
truncated `00000000...` SHA-256 values for all sources. Real file hashes were
computed separately and differ: `eb04ddf5...` and `568d774d...`.

**Classification:** KNOWN — expected fixture behavior. Not a security or
integrity failure; the fixture-only adapter documents this in `state.observed:
"fixture-only"`. No action required beyond recording.

### Incident 3 — MCP tool registration absent from this Claude Code session

`mind_context_health`, `mind_context_resolve`, and `mind_context_explain` were
not present in the deferred tool registry for this session. No project-scoped
`.mcp.json` was found in Mind. The Codex discovery configuration is project-scoped
to Codex, not Claude Code.

**Classification:** KNOWN — per M2.4 closure, the adapter discovery is
Codex-specific. Claude Code access to the Context Gateway requires a separate
Mind-owned decision to add a Claude Code project config; no such decision has
been made or authorized. The CLI is the equivalent interface for this session.

### Incident 4 — scope input error on first attempt

First resolve attempt used top-level scope tokens `system` and `home`, which are
not valid sub-directory scope paths. The CLI returned
`invalid_context_pack:source:0:scope,source:2:scope` (exit code 4). Corrected
immediately; no retry of invalid input.

**Classification:** OPERATOR SCOPE INPUT ERROR — not a provider failure.

---

## Mutation-path check

The CLI exposes only three commands: `health`, `resolve`, `explain`. No write,
delete, update, or mutation command exists. Mind working tree was verified
identical before and after the session.

---

## Pre/post git state comparison

| State | Value |
|---|---|
| Pre-session HEAD | `2a2cb9c` |
| Post-session HEAD | `2a2cb9c` — unchanged |
| Pre-session dirty paths | 8 protected plugin/kanban paths |
| Post-session dirty paths | identical — 8 protected plugin/kanban paths |
| Staged files | none before; none after |
| New or deleted tracked files | none |

---

## Session verdict

| Check | Result |
|---|---|
| Core available | PASS |
| Read-only | PASS |
| No mutation path | PASS |
| No scope/privacy failure | PASS |
| No unexpected Mind mutation | PASS |
| Provider live-activated on Brain main | FAIL — fixture-only; known follow-up |
| Source ranking quality | PARTIAL — fixture ranking returned old supporting reports instead of canonical current-state documents |
| Real source hashes | FAIL — fixture synthetic values; expected for fixture-only mode |
| MCP tools present in Claude Code session | FAIL — Codex-only discovery; not a Claude Code failure |

Overall: this session is valid as a **fixture-only CLI observation**. It is not
equivalent to a session on the live-activated adapter. Three of the five
dimension failures are documented known states, not new incidents. Zero safety
violations, zero mutation paths, zero scope failures.

---

## Evidence still required for multi-session stability claim

Per `system/reports/post-closeout-operational-assurance-2026-08-04.md`
Section 3, multi-session stability requires:

- At least 10 independent real retrieval sessions across distinct dates.
- Sessions must use the live-activated adapter (requires Brain branch integration
  or Codex client with access to `origin/codex/mind-m7-m2-unblock`).
- Each session must record health/readback success, citation correctness, real
  source hashes, scope/privacy result, mutation-path result, and latency.
- At least 2 sessions must test the unavailable-service fallback.
- At least 1 disable/restore drill must be completed.

This observation (001) counts toward the total only when re-run against the
live-activated adapter. A session on the fixture-only Brain `main` CLI does not
substitute for a live-adapter session.
