# Faith Source Sub-Inventory — 2026-07-08

**Task:** Task O — Batch 5B faith source/research sub-inventory  
**Status:** completed read-only sub-inventory  
**Boundary:** no legacy faith/source/wiki content moved or edited in this batch.

## Inputs inspected

- `sources/research/bible/`
- `sources/research/theology/`
- `sources/research/apologetics/`
- `wiki/faith.md`
- `wiki/areas/personal-identity/theology.md`
- `wiki/areas/theological-studies/`
- `wiki/areas/theological-studies/dance-of-life/README.md`
- `wiki/areas/theological-studies/dance-of-life/PROJECT.md`

A broad multi-file read timed out once, so the inventory used smaller exact reads, list operations, and focused search evidence.

## Inventory summary

### `sources/research/bible/`

Observed paths:

```text
sources/research/bible/README.md
sources/research/bible/comparative-views/README.md
sources/research/bible/passages/README.md
sources/research/bible/theological-questions/README.md
sources/research/bible/topics/README.md
sources/research/bible/word-studies/README.md
```

Classification:

| Path | Classification | Likely future target | Notes |
|------|----------------|----------------------|-------|
| `sources/research/bible/README.md` | source/provenance material | `faith/resources/bible/README.md` or merge into target resource README | Current README says Bible notes are source-grounded and exploratory. |
| `sources/research/bible/comparative-views/` | source/provenance material; needs human decision before promotion | `faith/resources/bible/comparative-views/` | Comparative tradition/interpretive material should not become final doctrine automatically. |
| `sources/research/bible/passages/` | source/provenance material; possible study input | `faith/resources/bible/passages/` first | Passage notes may later be promoted into `faith/bible/` or `faith/studies/` after review. |
| `sources/research/bible/theological-questions/` | unresolved question research | `faith/questions/` or `faith/resources/bible/theological-questions/` | Needs decision per file: open question vs research source. |
| `sources/research/bible/topics/` | topic research / study input | `faith/resources/bible/topics/` first; selected synthesis to `faith/topics/` | Preserve exploratory/source status until reviewed. |
| `sources/research/bible/word-studies/` | source/provenance material | `faith/resources/bible/word-studies/` | Lexical/original-language research should retain provenance. |

Recommended move posture: do not move as a single `faith/bible/` batch. Prefer a source-preserving move to `faith/resources/bible/` first, with later selective promotion.

### `sources/research/theology/`

Observed paths:

```text
sources/research/theology/README.md
```

Classification:

| Path | Classification | Likely future target | Notes |
|------|----------------|----------------------|-------|
| `sources/research/theology/README.md` | source/provenance material | `faith/resources/theology/README.md` or merge into `faith/resources/README.md` | README describes broader theology research and says not to store final ministry strategy here. |

Recommended move posture: likely safe as a small source-preserving move after approval, but do not promote directly into `faith/theology/` without reviewed content.

### `sources/research/apologetics/`

Observed paths:

```text
sources/research/apologetics/README.md
sources/research/apologetics/atheism-dialogue-001/
sources/research/apologetics/atheism-dialogue-001/01-original-paper.md
sources/research/apologetics/atheism-dialogue-001/02-atheist-response.md
sources/research/apologetics/atheism-dialogue-001/03-steve-reply.md
```

Classification:

| Path | Classification | Likely future target | Notes |
|------|----------------|----------------------|-------|
| `sources/research/apologetics/README.md` | source/provenance material | `faith/resources/apologetics/README.md` | README describes apologetics research, objections, evidence, and responses. |
| `sources/research/apologetics/atheism-dialogue-001/01-original-paper.md` | authored apologetics argument; study/source input | `faith/resources/apologetics/atheism-dialogue-001/` first | Large argument document. Could later yield distilled apologetics notes. |
| `sources/research/apologetics/atheism-dialogue-001/02-atheist-response.md` | source/provenance material; converted PDF response | `faith/resources/apologetics/atheism-dialogue-001/` | Contains PDF conversion metadata and page markers; preserve as evidence/source. |
| `sources/research/apologetics/atheism-dialogue-001/03-steve-reply.md` | authored reply plus PDF-converted/provenance material | `faith/resources/apologetics/atheism-dialogue-001/` first | Large converted document; may later be distilled into `faith/apologetics/`. |

Recommended move posture: move the dialogue as a provenance-preserving resource package only after approval. Do not split or promote pieces during the initial move.

### `wiki/faith.md`

Observed content:

```text
# Faith

Compiled durable faith, ministry, theology, and discipleship memory belongs here.
```

Classification:

| Path | Classification | Likely future target | Notes |
|------|----------------|----------------------|-------|
| `wiki/faith.md` | distilled durable faith knowledge; landing-page stub | merge into `faith/README.md` or move to `faith/index.md` | Very small page. Avoid overwriting prepared `faith/README.md`. |

Recommended move posture: safe later as a merge/retire operation, not a raw move over `faith/README.md`.

### `wiki/areas/personal-identity/theology.md`

Observed content includes personal theological commitments, ethical boundaries, and red lines for AI output.

Classification:

| Path | Classification | Likely future target | Notes |
|------|----------------|----------------------|-------|
| `wiki/areas/personal-identity/theology.md` | personal AI/theology boundary; distilled durable faith knowledge | needs human decision: `faith/theology/personal-boundaries.md`, `people/steve/faith-boundaries.md`, or `system/agent-context/` linked copy/reference | This file is faith content, personal identity, and agent behavior guidance. It should not be moved without checking active references. |

Recommended move posture: hold for human decision and active-reference review.

### `wiki/areas/theological-studies/`

Observed paths and evidence:

```text
wiki/areas/theological-studies/dance-of-life/
wiki/areas/theological-studies/dance-of-life/2026-04-13.md
wiki/areas/theological-studies/dance-of-life/PROJECT.md
wiki/areas/theological-studies/dance-of-life/README.md
wiki/areas/theological-studies/dance-of-life/Untitled.base
wiki/areas/theological-studies/dance-of-life/Know Thine Enemy/01-of-10 - Introduction.md
```

`dance-of-life/README.md` describes transcribed notes from the Dance of Life Library and many Bible-study series. `PROJECT.md` describes a permanent personal project that mirrors a large external Bible study video/document library to Google Drive for RAG use.

Classification:

| Path | Classification | Likely future target | Notes |
|------|----------------|----------------------|-------|
| `wiki/areas/theological-studies/dance-of-life/README.md` | study output/preparation; source index | `faith/studies/dance-of-life/README.md` or `faith/resources/dance-of-life/README.md` | Mixed: study index plus source-library metadata. |
| `wiki/areas/theological-studies/dance-of-life/PROJECT.md` | active/permanent project documentation; source/provenance operations | needs human decision: `projects/dance-of-life-library/PROJECT.md`, `faith/resources/dance-of-life/PROJECT.md`, or `faith/studies/dance-of-life/PROJECT.md` | Contains operational sync architecture and large external library details; not pure faith knowledge. |
| `wiki/areas/theological-studies/dance-of-life/* series notes` | study output/preparation and imported/transcribed source material | likely `faith/studies/dance-of-life/` with source boundary notes, or `faith/resources/dance-of-life/` first | Needs a narrower file count and link inventory before moving. |
| `wiki/areas/theological-studies/dance-of-life/*.base` and zero-byte/stub files | needs human decision / possible generated or app-specific metadata | hold | Do not migrate blindly. |

Recommended move posture: do not move the full theological-studies folder as one batch. Create a narrower Batch 5C inventory for `wiki/areas/theological-studies/dance-of-life/` before any move.

## Recommended next batches

### Batch 5C — Bible source resources move precheck

Recommended first movable source package:

```text
sources/research/bible/ -> faith/resources/bible/
```

Only after validating:

- all source categories are README-backed;
- no target collision exists under `faith/resources/bible/`;
- active references can be updated without changing meaning;
- no distilled conclusions are promoted during the move.

### Batch 5D — Theology README source move

Possible small move:

```text
sources/research/theology/README.md -> faith/resources/theology/README.md
```

Only after deciding whether to create `faith/resources/theology/` or merge the README into `faith/resources/README.md`.

### Batch 5E — Apologetics dialogue resource package precheck

Precheck before moving:

```text
sources/research/apologetics/ -> faith/resources/apologetics/
```

The `atheism-dialogue-001/` package should remain together as provenance-heavy source/evidence material during any first move.

### Batch 5F — Dance of Life theological studies sub-inventory

Required before moving:

```text
wiki/areas/theological-studies/dance-of-life/
```

Inventory should distinguish:

- study index files;
- transcribed notes;
- active project/sync operations;
- generated/app metadata;
- history/archive candidates.

## Boundaries preserved

- No legacy faith/source/wiki content moved.
- No legacy faith/source/wiki content edited.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.
