# Documentation Consistency Audit — 2026-08-03

**Status:** complete
**Milestone:** M7.3
**Scope:** 26 current entrypoint, canonical-policy, and active graph-policy documents
**Historical boundary:** `history/`, `archive/`, `.trash/`, and historical report
content were not edited
**Method:** read-only `rg`, header, path-resolution, and inbound-reference
checks; findings are follow-up tasks rather than bulk rewrites

## Scope

The active scope contains `home.md`, `system/README.md`, the current Mind agent
entrypoints, the 19 documents with an explicit canonical status, the generated
output policy, and the two active graph-policy documents. The approved-write
pilot, dated evidence reports, migration plans, and historical compatibility
documents were searched only when needed to classify a hit; they were not
treated as competing canonical authority.

## Exact searches and counts

| Check | Exact search or method | Count | Classification |
|---|---|---:|---|
| Active scope | Explicit 26-file allowlist described above | 26 files | Review set |
| Explicit canonical status | `rg -l '^\*\*Status:\*\*.*canonical' system/*.md` | 19 files | Header-review subset |
| Header review date | For each canonical-status file, search lines 1–12 for `Last reviewed`, `Last verified`, or `last_reviewed` | 10 missing | Finding 1 |
| Explicit `review_after` | `rg -n 'review_after'` across the 26-file allowlist, then classify schema examples separately | 1 live date | `2026-08-16`; not overdue on 2026-08-03 |
| Markdown/path candidates | One-off read-only scanner over Markdown links and path-shaped code spans in the 26-file allowlist | 233 candidates | 190 resolve directly; 43 classified below |
| Authority language | `rg -n -i 'source of truth\|sole current human task authority\|task authority\|only authority\|authoritative source\|canonical source' system/*.md system/agent-context/*.md home.md` | 38 hits | 0 conflicting authority claims |
| Capability language | `rg -n -i 'graphify.*(active\|activated\|deployed)\|context gateway.*(active\|activated\|deployed\|production)\|continuous automation.*(active\|enabled\|authorized)\|adapter.*(active\|activated\|deployed)' system/*.md system/agent-context/*.md home.md` | 13 hits | 0 unsupported active claims |
| Retired success intake | `rg -o 'capture/inbox' system/*.md system/agent-context/*.md home.md` | 13 hits | 0 active defaults |
| Retired failure intake | `rg -o 'capture/failed' system/*.md system/agent-context/*.md home.md` | 11 hits | 0 active defaults |
| Legacy agent root | `rg -P -o '(?<![[:alnum:]_])router/' system/*.md system/agent-context/*.md home.md` | 18 hits | 0 active defaults |
| Legacy organization spelling | `rg -P -o '(?<![[:alnum:]_])wiki/organisations' system/*.md system/agent-context/*.md home.md` | 18 hits | 0 active defaults |
| Legacy source root | `rg -P -o '(?<![[:alnum:]_])sources/' system/*.md system/agent-context/*.md home.md` | 32 hits | 0 active defaults |
| Retired task snapshot | `rg -P -o '(?<![[:alnum:]_])tasks\.md' system/*.md system/agent-context/*.md home.md` | 36 hits | 0 authority conflicts |
| Active-scope inbound references | Search the other 25 allowlisted files for each canonical filename | 3 files with zero inbound links | Expanded non-report scan leaves 2 confirmed orphans |

## Path-candidate classification

Of 233 path candidates, 190 resolve directly. The 43 lexical misses are not 43
broken links:

- 13 are deliberately synthetic paths in `system/context-authority-examples.md`;
- 7 are parser-relative basenames whose full paths exist;
- 4 are legacy folder-contract examples or historical paths;
- 3 are generic, optional, or date-pattern generated-output names;
- 3 are Brain-owned external report paths and were not treated as Mind links;
- 1 is an embedded `rg` command, not a file reference;
- 3 are run/report filename templates using `NNN` or `YYYY-MM-DD`;
- 1 is the already-resolved absent `prochat-os-strategy.md` decision record;
- 2 are expected M7.4 and M7.5 outputs that do not exist until those milestones
  are executed;
- 6 are existing compatibility or migration references whose target exists or
  whose retired status is explicit.

**Confirmed broken active links:** 0.

## Findings

### Finding 1 — MEDIUM: ten canonical documents lack a header review date

The following explicit canonical-status files do not have `Last reviewed`,
`Last verified`, or `last_reviewed` in their first 12 lines:

- `system/intake-disposition-pattern.md`
- `system/knowledge-freshness-standard.md`
- `system/maintenance-intelligence-standard.md`
- `system/maintenance-report-contract.md`
- `system/orientation-brief-template.md`
- `system/processed-capture-receipt-template.md`
- `system/repo-boundaries.md`
- `system/session-closeout-receipt-template.md`
- `system/source-quality-gates.md`
- `system/wager-verdict-pattern.md`

**Follow-up task:** review each document substantively, then add a date only to
documents actually reviewed. Do not mechanically stamp all ten.

### Finding 2 — LOW: two canonical documents have no current non-report inbound link

`system/repo-boundaries.md` and `system/wager-verdict-pattern.md` are not linked
from another active canonical or non-report operational document. Historical
reports refer to `repo-boundaries.md`, but that is evidence of past use rather
than current discoverability. `system/maintenance-report-contract.md` initially
had no inbound link inside the 26-file allowlist, but the expanded scan found
current references from the maintenance implementation handoff and pilot
runbook, so it is not classified as orphaned.

**Follow-up task:** decide separately whether each confirmed orphan belongs in
`system/README.md`, another domain index, or should be explicitly retired. Do
not add links or retire files as part of this audit.

## Passed checks

| Check | Result |
|---|---|
| Broken active links | PASS — 0 confirmed after classifying all 43 lexical misses |
| Duplicate authority | PASS — 38 hits preserve scoped precedence; no conflicting current authority found |
| Stale paths | PASS — every reviewed legacy-path hit is labeled retired, historical, compatibility, migration, or an explicit target mapping |
| Unsupported capability claims | PASS — all 13 hits preserve fixture-only, quiesced, not-active, or not-authorized boundaries |
| Overdue live review date | PASS — the only live `review_after` is 2026-08-16 |
| Historical archive boundary | PASS — no historical or archive file was edited |

## Follow-up task inventory

1. Review and date the ten canonical documents in Finding 1 as bounded,
   substantive edits.
2. Decide whether to index or retire the two orphan documents in Finding 2.
3. Re-run this audit after M7.4 and M7.5 so their planned output paths resolve.

No finding in this report changes task authority, capability state, deployment
state, or deletion authorization.
