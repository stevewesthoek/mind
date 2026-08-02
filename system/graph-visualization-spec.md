# Graph Visualization Specification

This specification defines the safe future path for adding a clickable visual graph to Mind.

The prior renderer and compatibility paths are retained as historical
documentation. Current Graphify execution state is owned by Brain's live-status
runbook.

## Current state

The canonical future operational output root is:

```text
runtime/local/graphify/
```

Compatibility roots are:

```text
graphify-out/
.graphify-out/
```

They are generated/non-authoritative projections, not operational truth.

Historical compatibility artifacts (not evidence of a current run):

- `.graphify-out/graph.json` — generated graph data.
- `.graphify-out/GRAPH_REPORT.md` — generated human-readable graph report.
- `.graphify-out/manifest.json` — generated file manifest and hashes.
- `.graphify-out/cache/` — generated graph cache.

No current visual artifact or active run is claimed. A missing Brain receipt
means freshness is unknown.

The current graph contract records the known refresh command:

```bash
graphify update .  # historical compatibility command; do not invoke while the profile is disabled
```

## Goal

Add a generated visual graph artifact that lets a human click and explore relationships in Mind.

Recommended future artifact location:

```text
runtime/local/graphify/graph.html
```

The visual graph should be generated from existing graph data, not hand-maintained.

## Non-goals

- Do not manually edit `.graphify-out/graph.json`.
- Do not make `.graphify-out/` the source of truth.
- Do not write graph output to the repository root.
- Do not move or rename `.graphify-out/` without checking Graphify, Obsidian, Brain, and automation references.
- Do not require cloud AI for graph rendering unless explicitly needed later.

## Renderer tool

A local renderer is retained as historical compatibility tooling at:

```text
tools/render-graph-html.mjs
```

It reads `.graphify-out/graph.json` and can generate `.graphify-out/graph.html` only as a local compatibility projection; it is not an active execution path. Current execution state is owned by Brain's live-status runbook.

Historical compatibility command (do not invoke without checking Brain status):

```bash
node tools/render-graph-html.mjs
```

## Required behavior

A future contained graph visualization process should:

1. read `.graphify-out/graph.json`;
2. produce `.graphify-out/graph.html`;
3. preserve the existing `.graphify-out/GRAPH_REPORT.md` report;
4. avoid changing source notes;
5. be repeatable after `graphify update .`;
6. avoid root writes;
7. document the command used to regenerate the visual graph.

## Suggested visual features

Minimum useful visual graph:

- nodes;
- edges;
- search by node label;
- zoom and pan;
- click a node to inspect metadata;
- show file path or source reference where available;
- filter by community or node type if available.

## Root/index linking

After a contained-run receipt proves a generated visual artifact exists, update
the Mind home or graph overview to link the generated report and visual output
under `runtime/local/graphify/`.

Historical compatibility links may refer to:

```text
graphify-out/GRAPH_REPORT.md
graphify-out/graph.html
```

Do not link `graph.html` as current behavior until the file exists and is generated successfully.

## Validation requirements

Before committing any visual graph implementation:

1. Confirm the Brain receipt exists and source hashes match.
2. Confirm the generated visual artifact exists under `runtime/local/graphify/`.
3. Confirm it reads generated graph data only.
4. Confirm no source notes were modified.
5. Confirm no output was written to the repository root.
6. Confirm the regeneration command is documented.

## Relationship to generated-output policy

`runtime/local/graphify/graph.html` is generated output and non-authoritative.
Compatibility-root artifacts should be treated as historical/generated output.

If tracked, the reason should be documented in `system/generated-output-policy.md`.
