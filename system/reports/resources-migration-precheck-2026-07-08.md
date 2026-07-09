# Resources Migration Precheck — 2026-07-08

**Task:** Task O — Batch 7 resources migration precheck
**Status:** Batch 7A completed after precheck
**Boundary:** no `sources/` content moved or edited in this batch.

## Current state verified

Latest completed commit before this precheck:

```text
e7ffda2 docs: precheck general knowledge migration closeout
```

Starting dirty status contained only known unrelated paths:

```text
 M wiki/log.md
?? Untitled.canvas
?? wiki/organisations/prochat/pitch-decks/
```

These paths were not touched or staged.

## Remaining source tree inventory

Read-only recursive inventory of `sources/` found:

| Metric | Count |
|--------|-------|
| Directories | 12 |
| Files | 14 |

Observed files:

```text
sources/.DS_Store
sources/books/README.md
sources/files/README.md
sources/index.md
sources/papers/README.md
sources/research/README.md
sources/research/ai/README.md
sources/research/books/README.md
sources/research/business/README.md
sources/research/marketing/README.md
sources/research/organisations/README.md
sources/research/people/README.md
sources/transcripts/README.md
sources/web/README.md
```

`resources/` currently contains only:

```text
resources/README.md
```

## Target collision check

The following candidate targets are absent:

```text
resources/books/
resources/files/
resources/papers/
resources/transcripts/
resources/web/
resources/research/
resources/research/ai/
resources/research/books/
resources/research/business/
resources/research/marketing/
resources/research/organisations/
resources/research/people/
resources/index.md
```

No target collision was found for a source-preserving resources move.

## Content classification

| Source path | Classification | Likely target | Move readiness | Notes |
|-------------|----------------|---------------|----------------|-------|
| `sources/books/README.md` | source/provenance category README | `resources/books/README.md` | likely safe after approval | Book notes, excerpts, reading notes, and bibliographic source material. |
| `sources/files/README.md` | source/provenance category README | `resources/files/README.md` | likely safe after approval | Uploaded/imported raw files and references. |
| `sources/papers/README.md` | source/provenance category README | `resources/papers/README.md` | likely safe after approval | Papers, reports, whitepapers, and long-form research sources. |
| `sources/transcripts/README.md` | source/provenance category README | `resources/transcripts/README.md` | likely safe after approval | Transcript material from video, audio, calls, or lessons. |
| `sources/web/README.md` | source/provenance category README | `resources/web/README.md` | likely safe after approval | Web captures, links, pages, and online research sources. |
| `sources/index.md` | legacy source index | `resources/index.md` or merge into `resources/README.md` | likely safe after approval | Needs wording updated from legacy `wiki/` compilation model. |
| `sources/research/README.md` | exploratory research guidance | `resources/research/README.md` | likely safe after approval | Existing text references old strategy/task paths and may need compatibility wording later. |
| `sources/research/ai/README.md` | exploratory AI research guidance | `resources/research/ai/README.md` | likely safe after approval | Durable AI knowledge now has `knowledge/ai.md`; research notes remain resources. |
| `sources/research/books/README.md` | book-derived research notes | `resources/research/books/README.md` | likely safe after approval | Source/provenance research, not synthesis. |
| `sources/research/business/README.md` | exploratory business research | `resources/research/business/README.md` | needs active-reference update | Committed business knowledge already moved to `knowledge/business.md`; exploratory research should remain resources. |
| `sources/research/marketing/README.md` | exploratory marketing research | `resources/research/marketing/README.md` | needs active-reference update | ProChat growth/marketing active references still point here. |
| `sources/research/organisations/README.md` | organization research notes | `resources/research/organisations/README.md` | likely safe after approval | Canonical organization truth belongs under `organizations/`. |
| `sources/research/people/README.md` | people research notes | `resources/research/people/README.md` | privacy/human-decision caution | Keep research/provenance separate from private people records. |
| `sources/.DS_Store` | local generated metadata | do not migrate | not approved | Leave unstaged/unmoved or delete only in a dedicated cleanup batch if approved. |

## Active references found

Active references to legacy `sources/` paths remain in:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
```

Examples include routing for:

```text
sources/research/
sources/research/marketing/
sources/research/business/
sources/research/ai/
sources/research/books/
sources/research/people/
```

These should be updated only during the actual move batch, after target paths exist.

`system/folder-contract.md` still contains compatibility rows for the broader `sources/` migration. Those compatibility rows should be revised after the actual resources move, not during this precheck.

## Recommendation

Proceed next with **Batch 7A — source resource README/index move precheck or move**, depending on desired caution.

Because the remaining source tree is small and target paths are absent, the likely safe move set is:

```text
sources/books/ -> resources/books/
sources/files/ -> resources/files/
sources/papers/ -> resources/papers/
sources/transcripts/ -> resources/transcripts/
sources/web/ -> resources/web/
sources/research/ -> resources/research/
sources/index.md -> resources/index.md
```

Do not migrate:

```text
sources/.DS_Store
```

If a whole-tree move is used, explicitly exclude `.DS_Store` from staging and migration.

Required active-reference updates during the move should point forward-looking source/resource routing from `sources/research/**` to `resources/research/**`.

## Validation required for the move batch

1. Verify source paths still exist and resource targets are absent.
2. Move only approved source/resource content.
3. Do not move or stage `.DS_Store`.
4. Update active references in:
   - `system/agent-context/00-memory-map.md`
   - `system/agent-context/00-current-context.md`
   - `system/agent-context/AGENTS.md`
5. Update `system/folder-contract.md` compatibility rows only after paths move.
6. Do not touch unrelated dirty paths:
   - `wiki/log.md`
   - `Untitled.canvas`
   - `wiki/organisations/prochat/pitch-decks/`
7. Preserve Save-to-Mind behavior.
8. Keep continuous processing disabled.

## Boundaries preserved in this precheck

- No `sources/` content moved.
- No `resources/` target content created beyond this report under `system/reports/`.
- No `.DS_Store` moved or staged.
- `wiki/log.md` untouched.
- `Untitled.canvas` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.

## Batch 7A completion notes

Completed source-preserving moves:

```text
sources/books/ -> resources/books/
sources/files/ -> resources/files/
sources/papers/ -> resources/papers/
sources/transcripts/ -> resources/transcripts/
sources/web/ -> resources/web/
sources/research/ -> resources/research/
sources/index.md -> resources/index.md
```

Excluded from migration and staging:

```text
sources/.DS_Store
```

Updated active references in:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
system/folder-contract.md
```

Forward-looking non-faith source/resource routing now points to:

```text
resources/
resources/research/
resources/research/ai/
resources/research/books/
resources/research/business/
resources/research/marketing/
resources/research/organisations/
resources/research/people/
```

Faith resources were not moved or edited.

Batch 7A boundaries preserved:

- `sources/.DS_Store` was not migrated or staged;
- `wiki/log.md` was not touched;
- `Untitled.canvas` was not touched;
- `wiki/organisations/prochat/pitch-decks/` was not touched;
- Save-to-Mind behavior was not changed;
- continuous processing was not enabled.
