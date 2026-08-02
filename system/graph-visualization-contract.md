# Graph Visualization Contract

This document records the current Mind graph reality and the safe boundary for future visual graph work.

## Historical compatibility graph surface

The former Mind graph artifacts are retained only as compatibility/historical
references. They do not prove a current Graphify run.

Confirmed artifacts:

- `.graphify-out/graph.json` — generated machine-readable graph data.
- `.graphify-out/GRAPH_REPORT.md` — generated human-readable graph report.
- `.graphify-out/manifest.json` — generated file manifest and hashes.
- `.graphify-out/cache/` — generated cache.

The current graph report states:

- corpus: 1,279 files and about 4,760,699 words
- graph size: 12,185 nodes and 20,025 edges
- communities: 1,420 total, with 466 shown and 954 thin omitted
- built from commit: `79796272`
- refresh command noted by the report: `graphify update .`

## Current operational status

Current Graphify execution and profile state is owned by Brain's live-status
runbook. A current visual graph run is not claimed by Mind.

```text
graphify-out/graph.html
```

Any compatibility artifact remains a generated, non-authoritative projection.
`GRAPH_REPORT.md` is a human-facing navigation/evidence surface only, and its
freshness requires the Brain receipt timestamp plus source hashes.

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
- Do not move or rename `.graphify-out/` without checking Graphify refresh commands and any Brain/Obsidian references.
- Do not assume graph visualization exists until a generated visual artifact is present, documented, and bound to a Brain receipt with source hashes.
- Refreshes should be repeatable and should not require writing captures or reports to the repository root.
