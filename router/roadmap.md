# Mind OS Roadmap

**Date:** 2026-05-16
**Status:** accepted direction for migration planning

## Decision

This Obsidian vault will become the single human cockpit for personal memory, business context, live work, research, strategy, and machine/orchestrator visibility.

The vault will move from numbered PARA folders to clean unnumbered folders maintained by the model router.

The model-router implementation lives in `brain`. This vault contains the router contract and human-readable memory.

## Target Experience

The user should open Obsidian and work from a small, clean set of surfaces:

```text
home.md
TODAY.md
router/
capture/
live/
wiki/
sources/
archive/
```

The model router handles classification, routing, cleanup, compilation, deduplication, drift detection, and maintenance automatically.

## Final Folder Structure

```text
mind/
  home.md
  TODAY.md
  README.md
  AGENTS.md

  router/
    current.md
    map.md
    rules.md
    taxonomy.md
    maintenance.md
    model-router.md

  capture/
    inbox/
    daily/
    failed/

  live/
    dashboard.md
    tasks.md
    projects.md
    workflows.md
    decisions.md

  wiki/
    index.md
    log.md
    people.md
    organisations.md
    business.md
    faith.md
    family.md
    health.md
    finance.md
    content.md
    ai.md
    tools.md

  sources/
    index.md
    web/
    books/
    papers/
    transcripts/
    files/

  archive/
    index.md
    completed/
    old/
```

## Folder Roles

### `router/`

The model-router contract for this vault.

It tells the AI steward what is current, where to look, how to write, what tags/types are allowed, and how to maintain the vault.

### `capture/`

The official intake surface.

Save-to-Mind, ChatGPT captures, local shortcuts, and imports land here first.

```text
capture/inbox/   successful classified captures
capture/daily/   daily scratch/capture logs if needed
capture/failed/  raw captures that need retry or repair
```

### `live/`

The current operating layer.

```text
live/tasks.md      active tasks without hundreds of tiny files
live/projects.md   active projects
live/workflows.md  research, design, code, video, deploy, memory workflows
live/decisions.md  committed current decisions
```

### `wiki/`

Compiled long-term memory.

This is the model-router-maintained knowledge layer. It should be concise, useful, linked, and human-readable.

`wiki/index.md` is the content catalog. `wiki/log.md` is an append-only maintenance ledger for ingests, compilations, lint passes, important queries, and accepted updates. It is not a Brain runtime log.

### `sources/`

Raw evidence and source material.

The model router reads sources and compiles useful knowledge into `wiki/`.

### `archive/`

Old, completed, or legacy material.

This keeps daily work light while preserving history.

## Manual Sorting Decision

Use clean folder names and order them in Obsidian with a manual sorting/custom-sort plugin.

Do not use numeric prefixes just to force folder order.

If manual sorting is unavailable, `home.md` remains the true dashboard and navigation entry point.

## Save-to-Mind Direction

Save-to-Mind remains permanent.

Current path:

```text
01-inbox/
```

Target path:

```text
capture/inbox/
```

Failure buffer:

```text
capture/failed/
```

The public webhook can remain `/mind-inbox` for compatibility. Only the internal target path changes after the new structure is ready.

## Brain Core and Scheduler Direction

Brain Core will expose machine, orchestrator, and scheduler state to Obsidian.

The Office nightly scheduler in `brain` will eventually run:

```text
mind-compile-loop
mind-memory-loop
mind-hygiene-loop
mind-drift-error-loop
```

These loops keep the vault small, current, and healthy.

## Anti-Clutter Rules

The model router should enforce practical limits:

```text
router/current.md      max 150 lines
TODAY.md               max 200 lines
live/tasks.md          max 300 lines
live/projects.md       max 250 lines
wiki/*.md              target max 500 lines
capture/inbox/         no files older than 7 days
capture/failed/        no files older than 3 days without retry/review
```

When files exceed limits, the model router summarizes, splits, archives, or compiles them.

## Expansion Rule

Every new thing follows one pipeline:

```text
capture -> classify -> route -> compile -> dashboard -> maintain
```

This applies to:

- new ideas
- new tasks
- new projects
- new research
- new skills
- new orchestrators
- new business context
- new personal context

## Success Criteria

- Obsidian is the only daily dashboard.
- The vault uses clean unnumbered folders.
- Save-to-Mind writes to `capture/inbox/`.
- Failed captures are recoverable in `capture/failed/`.
- Daily work happens from `home.md`, `TODAY.md`, and `live/`.
- Long-term knowledge is compiled into `wiki/`.
- Raw evidence is kept in `sources/`.
- Old numbered folders are eventually archived.
- The model router keeps the vault organized automatically.
