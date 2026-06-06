# Mind Folder Contract

This document records the current top-level Mind structure and root cleanliness rules.

## Root purpose

The Mind root is the orientation layer. It should stay small, stable, and human-readable.

Allowed root files:

- `home.md` — primary user manual and navigation entry point.
- `kanban.md` — current daily task board and task source of truth.
- `.gitignore` — Git ignore rules.
- `.DS_Store` — local macOS metadata when present; not meaningful knowledge.

Generated captures, transcripts, reports, research drafts, and automation dumps should not be written to the repository root.

## Current top-level folders

- `archive/` — legacy, completed, superseded, or historical material.
- `capture/` — Save-to-Mind inbox, failed captures, and daily capture groupings.
- `graphify-out/` — generated Graphify graph output.
- `live/` — active dashboard surfaces, task summaries, decisions, and current-state views.
- `router/` — Mind Steward and AI handoff/startup contracts.
- `sources/` — raw evidence, research, files, books, papers, and source material.
- `system/` — Mind operating documentation, contracts, reports, and future automation notes.
- `wiki/` — durable compiled knowledge distilled from captures and sources.

## Root write rule

Unknown or unclassified incoming material must go to:

```text
capture/inbox/
```

If processing fails, it should go to:

```text
capture/failed/
```

If material is distilled into durable knowledge, it should be linked or moved into the documented destination while preserving source references when useful.

## README rule

Every important top-level folder should have either:

1. a `README.md`; or
2. a clearly named index file that serves the same purpose.

Empty folders should either be removed later or given a README that explains what will populate them.

## Safety rule

Do not move, rename, or delete folders until dependencies are checked for:

- Save-to-Mind;
- Mind Steward;
- Brain Core or scheduler references;
- AI Model Selector references;
- Graphify refresh commands;
- Obsidian links and plugin assumptions;
- video/transcript capture paths;
- Kanban/task references.
