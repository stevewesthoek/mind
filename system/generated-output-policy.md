# Generated Output Policy

This document records how Mind should treat generated or refreshable output.

## Current generated-output examples

Graphify currently generates files under `graphify-out/`, including:

- `.graphify_labels.json`
- `.graphify_root`
- `GRAPH_REPORT.md`
- `cache/`
- `graph.json`
- `manifest.json`

These files are refreshable outputs from the graph process. They are not the source of truth for Mind knowledge.

## Current capture-output examples

Save-to-Mind, video analyzer, and transcript workflows may create files under:

```text
capture/inbox/
```

These are incoming captures, not root-level notes. They should remain reviewable and processable by Mind Steward.

## Tracking rule

- Source notes, contracts, and documentation should be tracked.
- Generated graph outputs should normally be ignored or regenerated unless a specific artifact is intentionally committed for audit.
- Capture inbox files should not be deleted automatically; they are user/source material until processed or archived.
- Generated output should never be written to the repository root.

## Recommended ignore rule

BuildFlow's current write policy blocks editing `.gitignore`, but the recommended ignore block is:

```gitignore
# Graphify generated output
# Keep graphify-out/README.md tracked as documentation; generated artifacts are refreshable.
graphify-out/.graphify_labels.json
graphify-out/.graphify_root
graphify-out/GRAPH_REPORT.md
graphify-out/cache/
graphify-out/graph.json
graphify-out/manifest.json
```

## Safety rules

- Do not ignore `capture/inbox/` unless there is a separate durable capture store.
- Do not delete generated files as cleanup unless the generator and regeneration command are confirmed.
- Do not manually edit generated graph files as source knowledge.
- Keep human-facing documentation such as `graphify-out/README.md` tracked.
