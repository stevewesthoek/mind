# Dance of Life Split-Decision Plan — 2026-07-08

**Task:** Task O — Batch 5I Dance of Life split-decision plan  
**Status:** decision plan completed  
**Approved strategy:** Strategy A — conservative source-first migration  
**Boundary:** no Dance of Life content moved or edited in this batch.

## Decision

Use a conservative source-first migration for Dance of Life.

Approved future first move:

```text
wiki/areas/theological-studies/dance-of-life/ -> faith/resources/dance-of-life/
```

This first move keeps the Dance of Life package as source/provenance-heavy material. It does not promote transcripts, indexes, or study material into `faith/studies/` yet.

Do not create or populate `faith/studies/dance-of-life/` during the first move. Processed/reusable study outputs can be promoted later in separate reviewed batches.

## Evidence used

Read during this decision batch:

```text
system/reports/dance-of-life-theological-studies-subinventory-2026-07-08.md
wiki/areas/theological-studies/dance-of-life/README.md
wiki/areas/theological-studies/dance-of-life/PROJECT.md
faith/studies/README.md
faith/resources/README.md
```

Batch 5H found that Dance of Life mixes transcribed Bible-study notes, source-library metadata, active sync/RAG project operations, zero-byte/stub files, and nested series notes.

`faith/resources/README.md` supports this decision because it defines `faith/resources/` as the home for faith-specific source material, raw evidence, imports, transcripts, and provenance-heavy research.

`faith/studies/README.md` also supports this decision because it says imported transcripts and unreviewed evidence belong under `faith/resources/` until processed into study output.

## Content separation model

| Content type | Initial handling | Later handling |
|--------------|------------------|----------------|
| Raw/transcribed source material | Move source-first to `faith/resources/dance-of-life/` | Promote selected reviewed outputs later. |
| Reusable prepared study material | Do not move separately during first move | Later promote to `faith/studies/dance-of-life/` only after review. |
| Index/navigation files such as `README.md` | Move with source package to `faith/resources/dance-of-life/README.md` | Later create a curated `faith/studies/dance-of-life/README.md` only if needed. |
| Active sync/RAG project operations such as `PROJECT.md` | Keep with source package in the first move for provenance | Later decide whether to split to a project/operations path. |
| Zero-byte/app metadata/stub files such as `.base` or empty dated files | Move only if included in the source package and tracked as part of provenance, or hold if validation marks them generated/untracked | Later archive/remove only after metadata-specific approval. |

## Target buckets

### First approved target

```text
faith/resources/dance-of-life/
```

Use this for the initial source-preserving move of the Dance of Life tree.

### Not used in first move

```text
faith/studies/dance-of-life/
```

Reserve this path for later reviewed, reusable study outputs only.

### Deferred decision

```text
projects/dance-of-life-library/
```

This remains a possible later target for active sync/RAG project operations if `PROJECT.md` should be split out of the faith resource package.

### Metadata/stub handling

Hold any deletion or cleanup decision for zero-byte files, `.base` files, `.DS_Store`, generated/app metadata, and other stubs until a dedicated metadata/archive validation batch.

## Recommended next batch

Proceed with **Batch 5I1 — Dance of Life source-first move precheck**.

That precheck should verify:

1. exact source tree inventory and tracked/untracked status;
2. target absence at `faith/resources/dance-of-life/`;
3. active references to `wiki/areas/theological-studies/` and `wiki/areas/theological-studies/dance-of-life/`;
4. whether any `.DS_Store`, `.base`, zero-byte, or generated/app files are tracked;
5. whether Workbench write policy will block the legacy wiki-area move.

No move should happen until that precheck passes.

## Boundaries preserved in this decision batch

- No Dance of Life content moved.
- No theological-studies area content edited.
- No `faith/resources/dance-of-life/` target created.
- No `faith/studies/dance-of-life/` target created.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.
