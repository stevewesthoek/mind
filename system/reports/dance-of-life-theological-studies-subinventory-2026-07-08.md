# Dance of Life Theological Studies Sub-Inventory — 2026-07-08

**Task:** Task O — Batch 5H theological-studies / Dance of Life sub-inventory precheck  
**Status:** precheck only  
**Boundary:** no `wiki/areas/theological-studies/` content moved or edited in this batch.

## Area inspected

```text
wiki/areas/theological-studies/
wiki/areas/theological-studies/dance-of-life/
```

Observed top-level entries include:

```text
wiki/areas/theological-studies/dance-of-life/
wiki/areas/theological-studies/dance-of-life/2026-04-13.md
wiki/areas/theological-studies/dance-of-life/26 Reasons Why Catholicism & Orthodoxy Have NOTHING To Do With the Early Church/
wiki/areas/theological-studies/dance-of-life/26 Reasons Why Catholicism & Orthodoxy Have NOTHING To Do With the Early Church/02-of-02 - 14 Reasons Why Catholicism & Orthodoxy Have NOTHING To Do With the Early Church.md
wiki/areas/theological-studies/dance-of-life/Birthday Special Episode/
```

Focused search also surfaced:

```text
wiki/areas/theological-studies/dance-of-life/README.md
wiki/areas/theological-studies/dance-of-life/PROJECT.md
wiki/areas/theological-studies/dance-of-life/Untitled.base
wiki/areas/theological-studies/dance-of-life/Know Thine Enemy/01-of-10 - Introduction.md
```

## Content evidence

`README.md` describes the folder as Dance of Life Bible Studies, with transcribed notes from the Dance of Life Library and many series tracked by status.

`PROJECT.md` describes a permanent personal project that mirrors a large Bible study video/document library from sync.com to Google Drive for RAG use in Obsidian. It includes external source, destination, sync architecture, browser download details, and operational assumptions.

A sample nested series note, `Know Thine Enemy/01-of-10 - Introduction.md`, includes frontmatter such as series name, part number, source video, transcription date, NotebookLM notebook, and Dance of Life / Bible study tags, followed by timestamped transcript-style content.

Target boundary files inspected:

```text
faith/studies/README.md
faith/resources/README.md
```

`faith/studies/README.md` says Bible studies, teaching preparation, discipleship material, and study outputs belong in `faith/studies/`, while imported transcripts and unreviewed evidence belong under `faith/resources/` until processed.

`faith/resources/README.md` says faith-specific source material, raw evidence, imports, transcripts, papers, articles, and provenance-heavy research belong under `faith/resources/` before promotion into distilled notes.

## Classification

| Path / content type | Classification | Likely future target | Move readiness | Notes |
|---------------------|----------------|----------------------|----------------|-------|
| `wiki/areas/theological-studies/dance-of-life/README.md` | study index plus source-library index | needs human decision: `faith/studies/dance-of-life/README.md` or `faith/resources/dance-of-life/README.md` | not ready for blind move | It is an index of transcribed study material, but it also tracks source-library provenance. |
| `wiki/areas/theological-studies/dance-of-life/PROJECT.md` | active project/sync operations; source/provenance operations | needs human decision: project/operations path, or `faith/resources/dance-of-life/PROJECT.md` with project links | not ready for faith-only move | Contains operational sync/RAG architecture, external source/destination details, and maintenance rules. |
| Nested series directories | imported/transcribed source material; possible study preparation | likely `faith/resources/dance-of-life/` first; selected processed outputs later to `faith/studies/dance-of-life/` | needs narrower inventory | Timestamped transcripts should remain source/provenance material until processed. |
| Sample nested series note | imported/transcribed source material; study input | `faith/resources/dance-of-life/<series>/` first | needs narrower inventory | Frontmatter and transcript timestamps show source/transcription provenance. |
| Zero-byte/stub files such as `2026-04-13.md` and `Untitled.base` | generated/app metadata or history/archive candidate | hold or archive after human decision | not ready | Do not move blindly; could be Obsidian/app/generated metadata or accidental stubs. |
| Full `wiki/areas/theological-studies/dance-of-life/` tree | mixed study/source/project/metadata package | split target required | not ready | A single tree move would mix study output, raw transcripts, active project operations, and metadata. |

## Active references found

Active references to the broader theological-studies area exist in:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
```

No exact `wiki/areas/theological-studies` reference was found in:

```text
system/agent-context/AGENTS.md
```

These references should be updated only after a target structure decision is made.

## Recommendation

Do not move the whole Dance of Life tree in one batch.

Recommended next handling is a human decision / split-plan batch:

1. Choose whether raw transcript material should move first to:
   ```text
   faith/resources/dance-of-life/
   ```
2. Choose whether processed study indexes and reusable study outputs should later live in:
   ```text
   faith/studies/dance-of-life/
   ```
3. Choose a separate home for `PROJECT.md` if it remains active operational project documentation, such as a project/operations path rather than a faith-study content path.
4. Hold zero-byte and app metadata files until a dedicated metadata/archive decision is made.
5. Before any move, run a narrower tree inventory for file counts, series directories, zero-byte files, `.base` files, and generated/app metadata.

## Validation required before any later move

1. Verify exact file inventory and target absence before moving.
2. Do not promote transcribed source material into settled study output.
3. Keep project/sync operations distinct from faith content if a separate project path is selected.
4. Update active references only after target decisions are made.
5. Do not touch unrelated dirty paths:
   - `wiki/log.md`
   - `wiki/organisations/prochat/pitch-decks/`
6. Preserve Save-to-Mind behavior.
7. Keep continuous processing disabled.

## Boundaries preserved in this precheck

- No Dance of Life content moved.
- No theological-studies area content edited.
- No wiki area content moved.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.
