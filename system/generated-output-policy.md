# Generated Output Policy

**Status:** complete for M7.2 (2026-08-03)
**Version:** 1.0
**Owner role:** Steve Westhoek (retention and deletion authority)
**Operational owner:** Brain for Graphify execution; Mind for source and audit policy
**Depends on:** `system/graphify-strategy.md`, `system/folder-contract.md`

This policy separates canonical human-owned source from generated projections,
caches, reports, and convenience artifacts. File presence never proves that a
generator is deployed, active, current, or receipt-bound.

## Retention classes

| Class | Meaning | Default handling |
|---|---|---|
| `canonical-source` | Human-owned Markdown, contracts, decisions, and approved knowledge | Track in Git; retain through correction or explicit supersession |
| `audit-record` | Deliberately committed report needed to explain a decision or verification | Track in Git; retain with the decision or milestone it supports |
| `latest-receipt` | Bounded current status projection with source hashes and generation identity | Keep the latest verified copy and the last known-good copy outside canonical source |
| `rebuildable-output` | Graph, rendered view, index, or other output reproducible from canonical source | Keep outside Git; remove only after regeneration is confirmed |
| `cache` | Performance-only intermediate data | Keep outside Git; discard after seven days of non-use or when invalidated |
| `capture` | Incoming user or source material, even when created by automation | Not disposable generated output; retain until human-reviewed disposition |

## Artifact inventory

| Artifact type | Location | Owner | Retention | Regeneration command or method | Git tracking rule |
|---|---|---|---|---|---|
| Canonical Mind source | Current approved Markdown under `system/`, `organizations/`, `projects/`, `repos/`, `people/`, `faith/`, `knowledge/`, and `resources/` | Steve Westhoek | Indefinite; correct or supersede explicitly | Not generated | Track |
| Graphify operational snapshot | `runtime/local/graphify/` | Brain execution; Mind interpretation | Keep latest verified and last known-good receipt-bound snapshots; retire older snapshots after 30 days only when both retained copies are readable | Operator request `/graphify --update` through the Brain-owned contained `mind-knowledge` profile; unavailable or unverified execution means regeneration status is unknown | Do not track generated contents |
| Graphify compatibility snapshot | `.graphify-out/`, `graphify-out/` | Brain execution; Mind interpretation | Retain until a receipt-bound operational snapshot replaces it; afterward treat as rebuildable output | Same `/graphify --update` path; do not run a repo-local custom generator | Ignore generated contents; track documentation such as `.graphify-out/README.md` only when deliberately added |
| Graphify caches | `runtime/local/graphify/cache/`, `.graphify-out/cache/`, `graphify-out/cache/` | Brain | Seven days after last use, or until invalidated by source/profile/version change | Rebuilt by the next authorized `/graphify --update` | Never track |
| Graph data and semantic reports | `graph.json`, `manifest.json`, `GRAPH_REPORT.md`, `.graphify_labels.json`, `.graphify_root` below Graphify output roots | Brain | Same as the containing operational or compatibility snapshot | Rebuilt by the next authorized `/graphify --update` | Never track unless a dated audit explicitly names and justifies a bounded copy |
| Visual convenience artifact | `graph.html` below a Graphify output root | Brain | Latest useful render only; no historical series required | Rebuilt by the authorized Graphify renderer as part of `/graphify --update` when graph size permits | Never track |
| Latest refresh receipt | `system/reports/graph-refresh-latest.md`, `system/reports/graph-refresh-latest.json` | Mind policy; Brain supplies machine evidence | Keep the latest committed pair until replaced by a newer verified pair; preserve milestone-specific evidence in a dated audit report | Replace only from a verified Brain receipt and source hashes; no Mind-only regeneration command is authorized | Track only the bounded latest pair or a dated audit copy |
| Dated audit or decision report | `system/reports/*YYYY-MM-DD.md` | Mind | Retain with the milestone, decision, or recovery record it supports | Re-run only the exact commands documented by that report; otherwise create a new dated report | Track |
| Disposable tool logs and temporary output | `runtime/`, `tmp/`, `.tmp/`, external `/tmp/` evidence | Tool/runtime owner | Keep only for the active bounded run unless a contract requires a retained audit copy | Re-run the owning tool under the original authorization; do not reconstruct expired evidence merely to make a path exist | Never track |
| Captures and source imports | `inbox/new/`, `inbox/raw/`, `resources/` | Steve Westhoek | Until human-reviewed routing, correction, or archive disposition | Not regenerated; recover from Git or the approved backup source | Track according to the folder contract; never auto-delete |

## Authority and freshness

- Canonical Markdown source outranks every generated graph, report, cache, and
  summary.
- A Graphify artifact is current only when a Brain-owned receipt identifies the
  source commit, profile, generator version, timestamps, and source hashes.
- Compatibility outputs without that receipt are historical or convenience
  projections with unknown freshness.
- A generated report may support a decision, but it does not become authority
  merely because it is committed.
- Current Graphify activation and execution state remains a Brain-owned runtime
  fact; Mind does not infer it from repository configuration.

## Regeneration and failure rules

1. Regenerate from canonical source; never edit graph data or caches as if they
   were source knowledge.
2. Use the Brain-owned `mind-knowledge` profile. Do not add a custom Mind-side
   wrapper, scheduler, provider fallback, or model choice.
3. If `/graphify --update` is unavailable, quiesced, or lacks a verified receipt,
   record regeneration as blocked or unknown. A stale compatibility artifact is
   not a successful substitute.
4. If regeneration fails, retain the last known-good receipt-bound snapshot and
   the failure evidence. Do not replace it with partial output.
5. Dated audit reports are append-only evidence: correct them with an explicit
   amendment or a newer report rather than silently rewriting historical claims.

## Tracking and deletion rules

- `.gitignore` continues to exclude `.graphify-out/` and `graphify-out/`.
- Future `runtime/local/graphify/` generated contents remain operational state,
  not repository source.
- A bounded generated artifact may be committed only when a dated audit names
  its purpose, source commit, freshness evidence, retention owner, and removal
  condition.
- No automated cleanup may touch `inbox/new/`, `inbox/raw/`, `resources/`,
  canonical Markdown, dated audit reports, or recovery records.
- This policy authorizes no deletion. Material deletion requires the existing
  deletion-readiness gate, exact targets, recovery evidence, and Steve
  Westhoek's explicit approval.

## M7.2 verification

The artifact inventory records a location, owner, retention rule, regeneration
method, and Git tracking rule for every in-scope artifact type. Audit- and
recovery-required artifacts are deliberately retained; refreshable outputs and
caches remain non-authoritative and bounded.
