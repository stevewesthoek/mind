# Graph Visualization Specification

This specification defines the safe future path for adding a clickable visual graph to Mind.

The renderer is implemented and can generate `graphify-out/graph.html` locally from `graphify-out/graph.json`.

## Current state

Graphify output currently lives in:

```text
graphify-out/
```

Confirmed current artifacts:

- `graphify-out/graph.json` — generated graph data.
- `graphify-out/GRAPH_REPORT.md` — generated human-readable graph report.
- `graphify-out/manifest.json` — generated file manifest and hashes.
- `graphify-out/cache/` — generated graph cache.

A clickable visual graph artifact is now generated at `graphify-out/graph.html`.

The current graph contract records the known refresh command:

```bash
graphify update .
```

## Goal

Add a generated visual graph artifact that lets a human click and explore relationships in Mind.

Recommended artifact:

```text
graphify-out/graph.html
```

The visual graph should be generated from existing graph data, not hand-maintained.

## Non-goals

- Do not manually edit `graphify-out/graph.json`.
- Do not make `graphify-out/` the source of truth.
- Do not write graph output to the repository root.
- Do not move or rename `graphify-out/` without checking Graphify, Obsidian, Brain, and automation references.
- Do not require cloud AI for graph rendering unless explicitly needed later.

## Renderer tool

A local renderer now exists at:

```text
tools/render-graph-html.mjs
```

It reads `graphify-out/graph.json` and can generate `graphify-out/graph.html` when run locally.

Default command:

```bash
node tools/render-graph-html.mjs
```

## Required behavior

A graph visualization process should:

1. read `graphify-out/graph.json`;
2. produce `graphify-out/graph.html`;
3. preserve the existing `graphify-out/GRAPH_REPORT.md` report;
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

After `graphify-out/graph.html` exists, update the Mind home or graph overview to link both:

```text
graphify-out/GRAPH_REPORT.md
graphify-out/graph.html
```

Do not link `graph.html` as current behavior until the file exists and is generated successfully.

## Validation requirements

Before committing any visual graph implementation:

1. Confirm `graphify-out/graph.html` exists.
2. Confirm it opens locally in a browser.
3. Confirm it reads generated graph data only.
4. Confirm no source notes were modified.
5. Confirm no output was written to the repository root.
6. Confirm the regeneration command is documented.

## Relationship to generated-output policy

`graphify-out/graph.html` should be treated as generated output unless intentionally tracked for convenience.

If tracked, the reason should be documented in `system/generated-output-policy.md`.
