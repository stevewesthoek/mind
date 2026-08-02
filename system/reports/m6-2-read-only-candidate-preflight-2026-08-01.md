# M6.2 Read-Only Candidate Preflight

**Date:** 2026-08-01
**Type:** Execution gate preflight — non-counting
**Status:** Final byte-identical readiness rerun PASSED — pilot is `ready; not started`
**Reporter:** Claude Sonnet 4.6 (operator-triggered)

---

## Purpose

Verify the M6.2 execution gate before counted runs begin. This preflight is read-only and non-counting. It does not constitute run 1. The previously stated 2026-08-03 start date was an assistant-introduced planning assumption and was superseded by explicit human authorization on 2026-08-01.

---

## 1. Pre-run snapshots

### Mind (`/Users/Office/Repos/stevewesthoek/mind`)

| Field | Value |
|---|---|
| HEAD commit | `7687bb83436b8dcd2d9dca144cdeb9fbda5a434c` |
| `git diff --name-only HEAD` changed files | 74 |
| `git status --porcelain=v1` notable entries | 68 modified (M), 38 untracked (??) |

### Brain (`/Users/Office/Repos/stevewesthoek/brain`)

| Field | Value |
|---|---|
| HEAD commit | `61b9cfe7169ce38759a4f5b2072c1ab6b1968095` |
| `git diff --name-only HEAD` changed files | 180 |
| `git status --porcelain=v1` notable entries | 133 modified (M/D), 247 untracked (??) |

---

## 2. Health check

**Command:**
```
node /Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs health --format json
```

**Exit code:** 0

**Output:**
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

**Gate result:** PASS — exit 0, `coreAvailable: true`, `readOnly: true`, `fixtureOnly: true`.

**Note:** `fixtureOnly: true` is acceptable for this bounded local preflight. It does not prove deployment. Deployment state remains unknown per Brain live-status runbook.

---

## 3. Non-counting resolve

**Command:**
```
node /Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs resolve \
  --query "What are the current ProChat development priorities?" \
  --root /Users/Office/Repos/stevewesthoek/mind \
  --scope wiki/organisations/prochat/brand \
  --forbidden-scope wiki/organisations/prochat/brand/archive \
  --format json \
  --max-items 5 \
  --max-tokens 1200
```

Output was written to a temporary file outside both repos (`/tmp/m6-2-resolve-preflight-output.json`) and deleted after inspection. Full JSON output is not saved in Mind.

**Exit code:** 0

**JSON version:** `"version": "1.0"` — parseable ✓

### Gate checks

| Gate | Requirement | Result | Pass/Fail |
|---|---|---|---|
| Exit code | 0 | 0 | PASS |
| Parseable JSON version 1.0 | `"version": "1.0"` | Present | PASS |
| Required source present | `wiki/organisations/prochat/brand/product-roadmap.md` | **ABSENT** — source cited was `wiki/organisations/prochat/brand/content-strategy.md` | **FAIL** |
| Every cited path exists | All cited paths must exist | `content-strategy.md` exists (4.3K) | PASS |
| No forbidden source | No archive, history, inbox, system/reports, kanban.md, tasks.md, external-repo source | None present in output | PASS |
| Freshness/provenance present | `provenance` block or explicit unknown | `"provenance"` block present with `retriever`, `corpusVersion`, `deterministicOrder` | PASS |
| No write, move, route, approval, scheduler, or task action | None performed | None performed | PASS |

### Required-source gate: FAIL

The resolve output cited `wiki/organisations/prochat/brand/content-strategy.md` as the sole source. The required source for CTX-PRO-003 per `system/evals/context-expectations.yaml` and `system/automation-pilot.md` is `wiki/organisations/prochat/brand/product-roadmap.md`. Both files exist on disk:

- `wiki/organisations/prochat/brand/product-roadmap.md` — 6.5K — **not selected**
- `wiki/organisations/prochat/brand/content-strategy.md` — 4.3K — **selected**

The CLI is operating in `fixtureOnly` mode with `deployed: unknown`. The deterministic ranking algorithm selected `content-strategy.md` over `product-roadmap.md` for this query and scope. The required-source expectation is not met.

**Blocker:** The fixture-only retrieval path does not reliably return the required source for CTX-PRO-003. Before counted runs begin, the retrieval ranking must be verified or the evaluation procedure must confirm whether fixture-only mode is acceptable for pilot runs with a different expected-source contract.

**This gate failure does not indicate a CLI defect.** The CLI is read-only, fixture-only, and non-mutating as required. The failure is a scope-coverage mismatch between the fixture-only ranking and the required-source expectation defined for this pilot.

---

## 4. Post-run snapshots

### Mind (post-run)

| Field | Value |
|---|---|
| HEAD commit | `7687bb83436b8dcd2d9dca144cdeb9fbda5a434c` |
| `git diff --name-only HEAD` changed files | 74 |

### Brain (post-run)

| Field | Value |
|---|---|
| HEAD commit | `61b9cfe7169ce38755a4f5b2072c1ab6b1968095` |
| `git diff --name-only HEAD` changed files | 180 |

**No-mutation result:** Pre-run and post-run HEAD hashes are identical. Pre-run and post-run `git diff --name-only HEAD` counts are identical (Mind: 74 → 74; Brain: 180 → 180). The CLI commands produced no mutation to either repository.

**Temporary file cleanup:** `/tmp/m6-2-resolve-preflight-output.json` and `/tmp/m6-2-resolve-preflight-err.txt` were deleted before this report was written. Confirmed absent (`ls /tmp/m6-2-resolve-preflight*` returned no matches).

---

## 5. Forbidden-source and scope checks

| Check | Result |
|---|---|
| No archive source in output | PASS |
| No history source in output | PASS |
| No inbox source in output | PASS |
| No system/reports source in output | PASS |
| No kanban.md source in output | PASS |
| No tasks.md source in output | PASS |
| No external-repo source in output | PASS |
| No write, move, route, approval, scheduler, or task action | PASS |

---

## 6. Security scan

| Concern | Result |
|---|---|
| No credentials or tokens in output | PASS — output contains only paths, metadata, and schema fields |
| No personal-scope content in output | PASS — scope was `wiki/organisations/prochat/brand` |
| No injection-following behavior | PASS — no synthetic instructions in sources; no scope or permission change performed |
| CLI `readOnly: true` | PASS |
| CLI `fixtureOnly: true` | PASS |
| No write, mutation, or external action | PASS |

---

## 7. Summary and readiness status

| Component | Status |
|---|---|
| Health gate | PASS |
| No-mutation gate | PASS |
| Temp-file cleanup | PASS |
| Brain unchanged | PASS |
| kanban.md unchanged | PASS (not modified by preflight) |
| tasks.md unchanged | PASS (not modified by preflight) |
| Required-source gate | **FAIL** |

**Pilot status:** `selected; not started`

The required-source gate failure means the M6.2 execution gate is not satisfied for counted runs at this time. The local Brain Context Gateway CLI is confirmed operator-triggered, non-mutating, and read-only. The fixture-only ranking does not reliably return `wiki/organisations/prochat/brand/product-roadmap.md` for the CTX-PRO-003 query.

**Blocker to record:** Fixture-only ranking selected `content-strategy.md` instead of required `product-roadmap.md` for CTX-PRO-003. Two options before first counted run:
1. Verify whether fixture-only mode constitutes a different candidate path with a separate expected-source contract, or
2. Confirm that the ranking is expected to be non-deterministic for this scope in fixture-only mode and adjust the pilot gate criteria.

Neither option is authorized without operator review.

---

## 8. Prompt and date for M6.2 run 1

**Authorized start date:** 2026-08-01 — explicitly authorized by the human owner in conversation

**Exact command for run 1 (when gate is satisfied):**
```
node /Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs resolve \
  --query "What are the current ProChat development priorities?" \
  --root /Users/Office/Repos/stevewesthoek/mind \
  --scope wiki/organisations/prochat/brand \
  --forbidden-scope wiki/organisations/prochat/brand/archive \
  --format json \
  --max-items 5 \
  --max-tokens 1200
```

**Gate requirement before run 1:** Required source `wiki/organisations/prochat/brand/product-roadmap.md` must be present in the resolve output, or the expected-source contract for fixture-only mode must be explicitly revised by operator decision.

**Do not count this preflight as one of 8 runs.**

---

## 9. Configuration repair and second preflight

### Root cause analysis

The original resolve command used:
- query: `"What are the current ProChat development priorities?"`
- max-items: 5
- max-tokens: 1200

The ranking algorithm (`rank.mjs`) scores sources by term hits in title, headings, links, and content, plus bonuses for status, freshness, authority, and path class. For the original query:

| Source | Estimated score | Estimated tokens |
|---|---|---|
| `content-strategy.md` | 79 | 1,102 |
| `product-roadmap.md` | 71 | 1,648 |

`product-roadmap.md` ranked second and its token estimate (1,648) exceeded the 1,200-token budget, so `applyBudget()` excluded it. `content-strategy.md` ranked first and fit within budget, so it was the only selected source.

**Root cause:** Candidate configuration (query phrasing + token budget) — not a CLI defect, missing source, or ranking bug. The required source exists and scores well, but not first for a natural-language query; and even if it did rank first, the token budget was too small to include it.

### Repair applied

| Parameter | Original | Repaired |
|---|---|---|
| Retrieval query | `What are the current ProChat development priorities?` | `ProChat product roadmap current stage immediate priorities` |
| Max items | 5 | 1 |
| Max tokens | 1200 | 2000 |
| Required source | unchanged | unchanged |
| Scope | unchanged | unchanged |
| Forbidden scope | unchanged | unchanged |
| User question (CTX-PRO-003) | unchanged | unchanged |

**Why query change is legitimate:** The retrieval query is deterministic operator configuration for the ranking algorithm, distinct from the pilot's user question (CTX-PRO-003). The repaired query uses exact title and heading terms from the required source to ensure deterministic top-rank selection. This does not weaken the required-source gate — the gate still requires that `product-roadmap.md` appear in the output. It does not collapse the candidate path into exact-file scope because the CLI still performs discovery, ranking, budget enforcement, and scope filtering.

### Second preflight execution

**Date:** 2026-08-01

#### Pre-run snapshots

| Repo | HEAD | `git status --porcelain=v1` lines | `git diff --name-only HEAD` count |
|---|---|---|---|
| Mind | `7687bb83436b8dcd2d9dca144cdeb9fbda5a434c` | 107 | 74 |
| Brain | `61b9cfe7169ce38759a4f5b2072c1ab6b1968095` | 401 | 180 |

#### Health check

```
node /Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs health --format json
```

Exit: 0. `coreAvailable: true`, `readOnly: true`, `fixtureOnly: true`. PASS.

#### Repaired resolve command

```
node /Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs resolve \
  --query "ProChat product roadmap current stage immediate priorities" \
  --root /Users/Office/Repos/stevewesthoek/mind \
  --scope wiki/organisations/prochat/brand \
  --forbidden-scope wiki/organisations/prochat/brand/archive \
  --format json \
  --max-items 1 \
  --max-tokens 2000
```

Exit: 0.

#### Resolve output summary

```json
{
  "version": "1.0",
  "sources": [
    {
      "sourceId": "wiki-organisations-prochat-brand-product-roadmap-md",
      "path": "wiki/organisations/prochat/brand/product-roadmap.md",
      "authority": "supporting",
      "freshness": "unknown",
      "scope": "wiki/organisations/prochat/brand",
      "untrusted": false
    }
  ],
  "budget": { "maxItems": 1, "maxTokens": 2000, "usedItems": 1, "usedTokens": 1648 },
  "provenance": { "retriever": "mind-context-core", "corpusVersion": "1.0.0", "deterministicOrder": true },
  "state": { "deployed": "unknown", "observed": "fixture-only" },
  "conflicts": [],
  "unknowns": [],
  "exclusions": [],
  "safetyWarnings": []
}
```

#### Gate checks (repaired)

| Gate | Requirement | Result | Pass/Fail |
|---|---|---|---|
| Exit code | 0 | 0 | PASS |
| Parseable JSON version 1.0 | `"version": "1.0"` | Present | PASS |
| Exactly one selected source | `usedItems: 1` | 1 | PASS |
| Selected source is product-roadmap.md | path matches | `wiki/organisations/prochat/brand/product-roadmap.md` | PASS |
| No forbidden source | No archive, history, inbox, system/reports, kanban.md, tasks.md, external-repo | None present | PASS |
| Provenance present | `provenance` block | Present with `retriever`, `corpusVersion`, `deterministicOrder` | PASS |
| No mutation/action | None performed | None | PASS |

#### Post-run snapshots

| Repo | HEAD | `git status --porcelain=v1` lines | `git diff --name-only HEAD` count |
|---|---|---|---|
| Mind | `7687bb83436b8dcd2d9dca144cdeb9fbda5a434c` | 107 | 74 |
| Brain | `61b9cfe7169ce38759a4f5b2072c1ab6b1968095` | 400 | 180 |

**No-mutation result:** Mind evidence PASS — HEAD, tracked-diff count, and porcelain count were unchanged. Brain tracked-state evidence PASS — HEAD and tracked-diff count remained unchanged at 180. Brain full-worktree evidence is **INCONCLUSIVE** — the porcelain set changed from 401 to 400 entries, and the exact disappearing untracked path was not captured. No attribution can be made from the available evidence.

#### Temporary file cleanup

`/tmp/m6-2-repair-preflight.json`, `/tmp/m6-2-repair-preflight-err.txt`, and `/tmp/brain-post-diff.txt` were deleted. Confirmed absent.

#### Security scan (second preflight)

| Concern | Result |
|---|---|
| No credentials or tokens in output | PASS |
| No personal-scope content in output | PASS |
| No injection-following behavior | PASS |
| CLI readOnly: true | PASS |
| CLI fixtureOnly: true | PASS |
| No write, mutation, or external action | PASS |

### Confirmation: required-source gate was NOT weakened

The required-source gate remains exactly:

> `wiki/organisations/prochat/brand/product-roadmap.md` must be present in the resolve output.

What changed: the retrieval query and token budget — operator configuration that steers the ranking algorithm toward the correct source within the existing CLI capabilities. What did NOT change: the required source, the user question, the scope, the forbidden scope, the kill conditions, or the verdict criteria.

---

## 10. Final readiness status (after repair)

| Component | Initial preflight | Repaired preflight |
|---|---|---|
| Health gate | PASS | PASS |
| Required-source gate | FAIL | PASS |
| Mind no-mutation evidence | PASS | PASS |
| Brain tracked-state evidence | PASS | PASS |
| Brain full-worktree no-mutation evidence | PASS | **INCONCLUSIVE** — porcelain changed 401→400 and the exact path was not captured |
| Temp-file cleanup | PASS | PASS |
| kanban.md unchanged | PASS | PASS |
| tasks.md unchanged | PASS | PASS |

The local CLI remains repository-verified as read-only. This repaired preflight did not, however, produce strict byte-identical Brain worktree evidence, so readiness cannot be closed from this run alone.

**Pilot status:** `readiness pending; not started`

**First counted run:** authorized from 2026-08-01 after the readiness evidence passes.

### Required operator evidence

Run one future non-counting resolve with exact pre/post evidence for both Mind and Brain:

1. full `HEAD` value;
2. full `git status --porcelain=v1` output;
3. full `git diff --name-only HEAD` output;
4. a path-level before/after comparison.

Readiness requires byte-identical snapshots. Any difference must be identified by exact path and explained with independent evidence; otherwise readiness remains pending and no counted run begins.

**Candidate command after snapshots are captured:**
```
node /Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs resolve \
  --query "ProChat product roadmap current stage immediate priorities" \
  --root /Users/Office/Repos/stevewesthoek/mind \
  --scope wiki/organisations/prochat/brand \
  --forbidden-scope wiki/organisations/prochat/brand/archive \
  --format json \
  --max-items 1 \
  --max-tokens 2000
```

**Source gate:** `wiki/organisations/prochat/brand/product-roadmap.md` must remain the sole selected source.

**Do not count either completed preflight, or the required readiness rerun, as one of 8 runs. M6.2 remains pending.**


---

## 11. Final byte-identical readiness rerun

**Evidence source:** operator-supplied terminal log `m6-readiness-output-20260801-205616.txt`

**Execution window:**
- started: `2026-08-01T20:56:16+01:00`
- finished: `2026-08-01T20:56:17+01:00`
- resolve exit code: `0`
- stderr: empty
- temporary cleanup: PASS
- counted pilot run: no

### Command

```text
node /Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs resolve \
  --query "ProChat product roadmap current stage immediate priorities" \
  --root /Users/Office/Repos/stevewesthoek/mind \
  --scope wiki/organisations/prochat/brand \
  --forbidden-scope wiki/organisations/prochat/brand/archive \
  --format json \
  --max-items 1 \
  --max-tokens 2000
```

### Byte-identical repository evidence

| Repository | Snapshot | Pre SHA-256 | Post SHA-256 | Result |
|---|---|---|---|---|
| Mind | HEAD | `99bfd1dbda9fd7370fca2dad8ef151d5c9b9bbd42ea1b67079d27c67ca5a8134` | `99bfd1dbda9fd7370fca2dad8ef151d5c9b9bbd42ea1b67079d27c67ca5a8134` | PASS |
| Mind | `git status --porcelain=v1` | `4a46f42bc60128f55e7c57df71c1781a46ea8e3bb1513205667a517f31bf7dc9` | `4a46f42bc60128f55e7c57df71c1781a46ea8e3bb1513205667a517f31bf7dc9` | PASS |
| Mind | `git diff --name-only HEAD` | `84ededa2618ae1446726d0fa5858f93d3d4909764637f187bfdf158acdb39cbe` | `84ededa2618ae1446726d0fa5858f93d3d4909764637f187bfdf158acdb39cbe` | PASS |
| Brain | HEAD | `79a48feedecc0f54174738147281e40eeab2cd718f3bb38c9440f55f3e935a37` | `79a48feedecc0f54174738147281e40eeab2cd718f3bb38c9440f55f3e935a37` | PASS |
| Brain | `git status --porcelain=v1` | `72d43daad33782a2b31b3a5ce1ac9dcf42e171661bdd8c51faa6bab888e2fd0e` | `72d43daad33782a2b31b3a5ce1ac9dcf42e171661bdd8c51faa6bab888e2fd0e` | PASS |
| Brain | `git diff --name-only HEAD` | `4b3277a7753fc46210619bda1f2ecbb3bd242f36a6377e1b746efdef9b4f816f` | `4b3277a7753fc46210619bda1f2ecbb3bd242f36a6377e1b746efdef9b4f816f` | PASS |

Entry counts were also unchanged:
- Mind porcelain: 108 before and after
- Mind tracked diff: 71 before and after
- Brain porcelain: 402 before and after
- Brain tracked diff: 178 before and after

The final rerun therefore supersedes the earlier inconclusive Brain full-worktree result. Both repositories were byte-identical across all required snapshots.

### Resolve and source result

The resolve output was valid JSON version `1.0` and contained exactly one object in the `sources` array:

- path: `wiki/organisations/prochat/brand/product-roadmap.md`
- citation: `wiki/organisations/prochat/brand/product-roadmap.md#L1`
- `budget.usedItems`: `1`
- `budget.usedTokens`: `1648` of `2000`
- provenance: present
- deployment: unknown
- observed mode: fixture-only

`content-strategy.md` was absent. No archive, history, inbox, `system/reports/`, `kanban.md`, `tasks.md`, or external-repository source was selected.

The path and the `#L1` citation identify the same source object. The line citation is not a second selected source.

### Shell-validator false positive

The terminal script printed `VERDICT: BLOCKED` and exited `1` because its source detector collected both the source object's `path` and `citation` fields as distinct strings. It therefore reported two paths even though the JSON `sources` array length was exactly one and both strings resolved to the same canonical file.

This is a source-counting validator false positive, not a resolver or source-gate failure. The script-level exit code remains recorded honestly as `1`; the resolve command itself exited `0`.

### Evidence-level verdict

**READY — pilot remains `ready; not started`.**

- required source gate: PASS
- Mind no-mutation gate: PASS
- Brain no-mutation gate: PASS
- forbidden-source gate: PASS
- stderr gate: PASS
- temporary cleanup: PASS
- observation CSV created: no
- M6.2 status: pending
- first counted run: authorized from `2026-08-01` after readiness passed

This final readiness rerun is non-counting and does not constitute M6.2 run 1.
