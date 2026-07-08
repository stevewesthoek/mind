# Dance of Life Source-First Move Precheck — 2026-07-08

**Task:** Task O — Batch 5I1 Dance of Life source-first move precheck  
**Status:** precheck only  
**Approved strategy:** Strategy A — conservative source-first migration  
**Boundary:** no Dance of Life content moved or edited in this batch.

## Proposed future move

```text
wiki/areas/theological-studies/dance-of-life/ -> faith/resources/dance-of-life/
```

This future move must remain source-preserving. It must not promote Dance of Life transcripts, indexes, or other materials into `faith/studies/dance-of-life/` during the first move.

## Current state verified

Latest completed commit before this precheck:

```text
c5969b6 docs: decide Dance of Life source-first migration
```

Starting dirty status contained only known unrelated paths:

```text
 M wiki/log.md
?? wiki/organisations/prochat/pitch-decks/
```

Path existence check:

```text
wiki/areas/theological-studies/dance-of-life: exists
faith/resources/dance-of-life: absent
faith/studies/dance-of-life: absent
```

No target folder was created in this precheck.

## Source tree inventory

Read-only recursive inventory of `wiki/areas/theological-studies/dance-of-life/` found:

| Metric | Count |
|--------|-------|
| Directories | 30 |
| Files | 127 |
| Markdown files | 126 |
| Zero-byte files | 2 |
| `.base` files | 1 |
| `.DS_Store` files | 0 |

Extensions observed:

```text
.md: 126
.base: 1
```

Top-level files observed:

```text
wiki/areas/theological-studies/dance-of-life/2026-04-13.md        # zero-byte
wiki/areas/theological-studies/dance-of-life/PROJECT.md
wiki/areas/theological-studies/dance-of-life/README.md
wiki/areas/theological-studies/dance-of-life/Untitled.base         # zero-byte
```

Sample nested files observed:

```text
wiki/areas/theological-studies/dance-of-life/26 Reasons Why Catholicism & Orthodoxy Have NOTHING To Do With the Early Church/02-of-02 - 14 Reasons Why Catholicism & Orthodoxy Have NOTHING To Do With the Early Church.md
wiki/areas/theological-studies/dance-of-life/Birthday Special Episode/01-of-01 - Birthday Special - Life Lessons & Answering Your Questions.md
wiki/areas/theological-studies/dance-of-life/Christianity is the True Zen/01-of-01 - Christianity is the True Zen.md
wiki/areas/theological-studies/dance-of-life/Cosmology/01-of-08 - Possible Sun Analemma Explanation.md
wiki/areas/theological-studies/dance-of-life/Know Thine Enemy/01-of-10 - Introduction.md
```

`git status --short` did not show untracked or modified files under `wiki/areas/theological-studies/dance-of-life/`; the only dirty paths were the known unrelated paths listed above.

## Classification for future move

| Content type | Future first-move handling | Notes |
|--------------|----------------------------|-------|
| Raw/transcribed study material | Move to `faith/resources/dance-of-life/` | Keep as provenance-heavy source material. |
| Index/navigation files such as `README.md` | Move with the source package to `faith/resources/dance-of-life/README.md` | Do not turn into a curated study index yet. |
| `PROJECT.md` | Move with the source package for the first move | Keep operational/source context together initially; project split is deferred. |
| Zero-byte files | Preserve in first move if tracked and still present | Do not delete or clean up without separate metadata/archive approval. |
| `.base` files | Preserve in first move if tracked and still present | Treat as app/generated metadata until a later decision. |
| `.DS_Store` | None observed | If one appears later, do not migrate or stage without approval. |
| Processed/reusable study outputs | Do not separate during first move | Later reviewed batches may promote selected outputs to `faith/studies/dance-of-life/`. |

## Active references found

Active references to the broader theological-studies area were found in:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
```

No exact `wiki/areas/theological-studies` reference was found in:

```text
system/agent-context/AGENTS.md
```

No explicit `Dance of Life` references were found in the checked active agent-context files. Repository search mainly surfaced Dance of Life files themselves.

## Required future reference updates

During the future move batch, update active context references as needed from the old theological-studies location to the new source-resource location, while preserving the broader theological responsibility rule if still needed.

Likely files to update during the move:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
```

Historical reports may keep old paths as historical evidence; update only forward-looking roadmap/status sections.

## Workbench move risk

Previous migration batches from legacy `sources/` or `wiki/` paths have sometimes required Codex-assisted moves when Workbench write policy blocked legacy-source edits. Batch 5I1 did not attempt a move, so no write-policy result is recorded for this path yet.

The future Batch 5I2 move should attempt only the approved source-first move. If Workbench blocks the legacy `wiki/areas/theological-studies/dance-of-life/**` move, stop and use a Codex-assisted move with the exact approved target.

## Recommendation

Proceed next with **Batch 5I2 — Dance of Life source-first move**, after approval.

Approved future move:

```text
wiki/areas/theological-studies/dance-of-life/ -> faith/resources/dance-of-life/
```

Do not create or populate:

```text
faith/studies/dance-of-life/
```

Do not delete or clean up:

```text
2026-04-13.md
Untitled.base
zero-byte files
.base files
metadata/stub files
```

Any cleanup or promotion should be a later separate batch.

## Validation required for Batch 5I2

1. Verify source path exists and target path is absent.
2. Verify `faith/studies/dance-of-life/` is not created.
3. Move the Dance of Life tree source-preservingly to `faith/resources/dance-of-life/`.
4. Preserve README/index files, `PROJECT.md`, nested transcript files, zero-byte files, and `.base` files unless a separate approval says otherwise.
5. Update forward-looking active references in `system/agent-context/00-memory-map.md` and `system/agent-context/00-current-context.md` as appropriate.
6. Do not edit or move unrelated theological-studies content.
7. Do not touch unrelated dirty paths:
   - `wiki/log.md`
   - `wiki/organisations/prochat/pitch-decks/`
8. Preserve Save-to-Mind behavior.
9. Keep continuous processing disabled.

## Boundaries preserved in this precheck

- No Dance of Life content moved.
- No theological-studies content edited.
- No `faith/resources/dance-of-life/` target created.
- No `faith/studies/dance-of-life/` target created.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.
