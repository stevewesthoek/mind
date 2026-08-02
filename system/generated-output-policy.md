# Generated Output Policy

This document records how Mind should treat generated or refreshable output.

## Graphify output policy

The Brain-owned Graphify profile defines the canonical future operational
output root as:

```text
runtime/local/graphify/
```

The retained compatibility roots are:

```text
graphify-out/
.graphify-out/
```

The compatibility roots are not canonical operational truth. Current Graphify
execution state is owned by Brain's live-status runbook. Repository
configuration or file presence must not be treated as a current run,
deployment, observation, or verification.

Historical/compatibility output examples include:

- `.graphify_labels.json`
- `.graphify_root`
- `GRAPH_REPORT.md`
- `cache/`
- `graph.json`
- `manifest.json`

These files are refreshable generated projections. They are not the source of truth for Mind knowledge, and their presence does not prove a current Graphify run.

## Current capture-output examples

Save-to-Mind, video analyzer, and transcript workflows may create files under:

```text
inbox/new/
```

These are incoming captures, not root-level notes. They should remain reviewable and processable by Mind Steward.

## Tracking rule

- Source notes, contracts, and documentation should be tracked.
- Generated graph outputs should normally be ignored or regenerated unless a specific artifact is intentionally committed for audit or convenience.
- A compatibility-root `graph.html` may be retained as a historical/convenience artifact, but it is non-authoritative and must not be presented as current without a valid Brain receipt and source hashes.
- Capture inbox files should not be deleted automatically; they are user/source material until processed or archived.
- Generated output should never be written to the repository root.

## Recommended ignore rule

BuildFlow's current write policy blocks editing `.gitignore`, but the recommended ignore block is:

```gitignore
# Graphify generated output
# Keep .graphify-out/README.md tracked as documentation; generated artifacts are refreshable.
.graphify-out/.graphify_labels.json
.graphify-out/.graphify_root
.graphify-out/GRAPH_REPORT.md
.graphify-out/cache/
.graphify-out/graph.json
.graphify-out/manifest.json
```

## Safety rules

- Do not ignore `inbox/new/` unless there is a separate durable capture store.
- Do not delete generated files as cleanup unless the generator and regeneration command are confirmed.
- Do not manually edit generated graph files as source knowledge.
- Human-facing Graphify reports are navigation/evidence surfaces only; source Markdown remains authoritative.
- Freshness means the Brain receipt timestamp plus source hashes. A missing receipt is unknown.
- Keep human-facing documentation such as `.graphify-out/README.md` tracked.
