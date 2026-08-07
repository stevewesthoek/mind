# Graph Visualization Contract

This document records the current Mind graph reality and the safe boundary for future visual graph work.

## Retired compatibility graph surface

**Status:** Retired and absent as of 2026-08-07.

The former Mind compatibility graph roots `.graphify-out/` and `graphify-out/` have been retired. The historical artifacts listed below are documented for evidence purposes only and do not currently exist:

Former artifacts (retired):

- `.graphify-out/graph.json` — retired generated machine-readable graph data.
- `.graphify-out/GRAPH_REPORT.md` — retired generated human-readable graph report.
- `.graphify-out/manifest.json` — retired generated file manifest and hashes.
- `.graphify-out/cache/` — retired generated cache.

Historical graph report metrics (no longer current):

- corpus: 1,279 files and about 4,760,699 words
- graph size: 12,185 nodes and 20,025 edges
- communities: 1,420 total, with 466 shown and 954 thin omitted
- built from commit: `79796272` (historical evidence only)
- refresh command noted by the report: `graphify update .` (do not execute on absent roots)

These retired paths must not be recreated merely to satisfy historical documentation. All artifact data has been deleted under the Brain SAFE_TO_REMOVE classification.

## Current operational status

Current Graphify execution, profile state, and output location are owned by
Brain's live-status runbook. Mind does not claim a current visual graph.

When Brain authorizes a future Graphify run, output belongs under the
Brain-owned operational root `runtime/local/graphify/`, not under retired
compatibility roots.

Any former compatibility artifact (`graphify-out/`, `.graphify-out/`) remains
a generated, non-authoritative projection and must not be mistaken for current
output. Historical `GRAPH_REPORT.md` is evidence-only and requires the Brain
receipt timestamp plus source hashes to be interpreted as fresh.

## Desired future behavior

The safe future implementation specification is documented in:

```text
system/graph-visualization-spec.md
```

Mind should support both:

1. human-readable graph reports for review; and
2. a clickable visual graph for exploring relationships.

A future visual graph should be generated from the existing graph data, not hand-maintained.

Canonical future operational output root:

```text
runtime/local/graphify/
```

Recommended root behavior:

- compatibility-root reports may be linked only as generated evidence;
- a future contained runner may publish visual artifacts under `runtime/local/graphify/`;
- generated graph files remain generated outputs, not source-of-truth notes

## Safety rules

- Do not manually edit generated graph data as the source of truth.
- Retired compatibility roots (`.graphify-out/`, `graphify-out/`) must not be recreated merely to satisfy historical documentation.
- Do not assume graph visualization exists until a generated visual artifact is present, documented, bound to a Brain receipt with source hashes, and located under the current operational root.
- Future Graphify refreshes should be repeatable and should not require writing artifacts to the repository root; all output belongs under Brain-owned `runtime/local/graphify/` or similar contained storage.
