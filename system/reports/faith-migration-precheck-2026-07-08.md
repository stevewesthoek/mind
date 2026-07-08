# Faith Migration Precheck — 2026-07-08

**Task:** Task O — Batch 5 faith-first migration precheck  
**Status:** planning/precheck only  
**Boundary:** no faith, source, wiki, or area content moved in this batch.

## Files and folders inspected

- `system/reports/top-level-folder-migration-batch-plan-2026-07-07.md`
- `system/folder-contract.md`
- `faith/README.md`
- `sources/research/bible/`
- `sources/research/theology/`
- `sources/research/apologetics/`
- `wiki/faith.md`
- `wiki/areas/`
- `wiki/areas/personal-identity/theology.md`
- `wiki/areas/theological-studies/`

## Current target state

`faith/` currently contains:

```text
faith/README.md
```

No faith migration target subfolders were observed yet during this precheck.

Suggested target substructure already recorded in `faith/README.md`:

```text
bible/
studies/
topics/
theology/
apologetics/
ministry/
resources/
questions/
```

## Candidate legacy content observed

Batch 5 candidates from the top-level migration plan:

```text
sources/research/bible/        -> faith/bible/ or faith/resources/
sources/research/theology/     -> faith/theology/ or faith/resources/
sources/research/apologetics/  -> faith/apologetics/ or faith/resources/
wiki/faith.md                  -> faith/README.md merge or faith/index.md
selected wiki/areas/faith*     -> faith/
```

Exact content observed during this precheck:

```text
sources/research/bible/README.md
sources/research/bible/comparative-views/
sources/research/bible/passages/
sources/research/bible/topics/
sources/research/bible/word-studies/
sources/research/theology/README.md
sources/research/apologetics/README.md
sources/research/apologetics/atheism-dialogue-001/
wiki/faith.md
wiki/areas/personal-identity/theology.md
wiki/areas/theological-studies/
```

## Classification

| Current path | Likely target | Classification | Move readiness | Notes |
|--------------|---------------|----------------|----------------|-------|
| `sources/research/bible/` | `faith/resources/bible/` first; selectively promote settled notes to `faith/bible/` later | Source-grounded Bible research | Precheck only | README says these are exploratory notes and should not contain committed ministry strategy. Preserve provenance before promoting conclusions. |
| `sources/research/theology/` | `faith/resources/theology/` first; selectively promote settled notes to `faith/theology/` later | Broader theology research | Likely small move after approval | Currently observed as README-only, but target decision should preserve source/research boundary. |
| `sources/research/apologetics/` | `faith/resources/apologetics/` or `faith/apologetics/research/` | Apologetics research and dialogue material | Needs human decision | Contains `atheism-dialogue-001/` with original paper, response, and reply; may be source/evidence plus authored response rather than pure durable doctrine. |
| `wiki/faith.md` | merge into `faith/README.md` or move to `faith/index.md` | Durable faith landing page stub | Likely safe after approval | Very small page: “Compiled durable faith, ministry, theology, and discipleship memory belongs here.” Avoid overwriting target README. |
| `wiki/areas/personal-identity/theology.md` | `faith/theology/personal-boundaries.md` or `people/steve/faith-boundaries.md` | Personal theological commitments and AI boundaries | Needs human decision | Faith content, but also personal identity/AI operating boundary content. Could belong in `faith/` with links from agent context or in a future personal/people area. |
| `wiki/areas/theological-studies/` | `faith/studies/` or `faith/resources/theological-studies/` | Study material and imported theological/media notes | Needs detailed sub-inventory | Contains nested study/media-style material. Move only after a finer inventory distinguishes studies, resources, and history. |

## Recommended next batch

Proceed next with **Batch 5A — Faith target preparation and source-boundary precheck**, not a content move.

Recommended safe next steps:

1. Create target README-backed folders under `faith/`:
   - `faith/bible/`
   - `faith/studies/`
   - `faith/topics/`
   - `faith/theology/`
   - `faith/apologetics/`
   - `faith/ministry/`
   - `faith/resources/`
   - `faith/questions/`
2. Record folder rules that source/research material keeps provenance under `faith/resources/` unless intentionally promoted.
3. Do not move `sources/research/**` yet.
4. Do not merge `wiki/faith.md` into `faith/README.md` yet.
5. Do not move `wiki/areas/personal-identity/theology.md` or `wiki/areas/theological-studies/` until a narrower sub-inventory is complete.

## Required validation before any move batch

- Source material remains distinguishable from distilled Bible/theology conclusions.
- Bible studies that are output/preparation work target `faith/studies/`.
- Raw or imported evidence remains under `faith/resources/` or another provenance-preserving target.
- Personal theological boundaries keep links from any active AI/agent context that depends on them.
- No unrelated dirty files are staged, especially:
  - `wiki/log.md`
  - `wiki/organisations/prochat/pitch-decks/`

## Boundaries preserved in this precheck

- No faith content moved.
- No source material moved.
- No `wiki/areas/` content moved.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.



## Batch 5A completion notes

Completed target folder preparation:

```text
faith/bible/README.md
faith/studies/README.md
faith/topics/README.md
faith/theology/README.md
faith/apologetics/README.md
faith/ministry/README.md
faith/resources/README.md
faith/questions/README.md
```

Each target folder now has README-backed boundary rules.

No legacy content was moved in Batch 5A:

```text
sources/research/bible/
sources/research/theology/
sources/research/apologetics/
wiki/faith.md
wiki/areas/personal-identity/theology.md
wiki/areas/theological-studies/
```

Boundaries preserved:

- source and provenance-heavy material remains in legacy source paths for now;
- distilled faith targets are prepared but empty except for README files;
- `wiki/log.md` untouched;
- `wiki/organisations/prochat/pitch-decks/` untouched;
- Save-to-Mind unchanged;
- continuous processing disabled.
