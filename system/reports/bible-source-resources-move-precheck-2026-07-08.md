# Bible Source Resources Move Precheck — 2026-07-08

**Task:** Task O — Batch 5C Bible source resources move precheck  
**Status:** precheck only  
**Boundary:** no legacy Bible source content moved or edited in this batch.

## Proposed source-preserving move

```text
sources/research/bible/ -> faith/resources/bible/
```

This is a source/provenance-preserving move. It must not promote exploratory research into distilled Bible conclusions.

## Current state verified

Latest completed commit before this precheck:

```text
83714c7 docs: inventory faith source content
```

Starting dirty status contained only known unrelated paths:

```text
 M wiki/log.md
?? wiki/organisations/prochat/pitch-decks/
```

Target parent observed:

```text
faith/resources/README.md
```

Target collision check:

```text
faith/resources/bible/ absent
```

## Source inventory

Observed source paths under `sources/research/bible/`:

```text
sources/research/bible/README.md
sources/research/bible/comparative-views/README.md
sources/research/bible/passages/README.md
sources/research/bible/theological-questions/README.md
sources/research/bible/topics/README.md
sources/research/bible/word-studies/README.md
```

The folder is README-backed and organized as exploratory Bible research categories.

## Classification

| Source path | Proposed target | Classification | Move readiness | Notes |
|-------------|-----------------|----------------|----------------|-------|
| `sources/research/bible/README.md` | `faith/resources/bible/README.md` | source/provenance material | likely safe after approval | Existing README says Bible notes are source-grounded and exploratory. |
| `sources/research/bible/comparative-views/` | `faith/resources/bible/comparative-views/` | source/provenance material | likely safe after approval | Do not treat comparative views as final doctrine. |
| `sources/research/bible/passages/` | `faith/resources/bible/passages/` | source/provenance material / possible study input | likely safe after approval | Passage notes may later be promoted selectively to `faith/bible/` or `faith/studies/`. |
| `sources/research/bible/theological-questions/` | `faith/resources/bible/theological-questions/` | unresolved question research | likely safe after approval | Later individual items may move to `faith/questions/` after review. |
| `sources/research/bible/topics/` | `faith/resources/bible/topics/` | topic research / study input | likely safe after approval | Later synthesis can be promoted to `faith/topics/`. |
| `sources/research/bible/word-studies/` | `faith/resources/bible/word-studies/` | lexical/original-language source research | likely safe after approval | Preserve provenance. |

## Active references found

Active references requiring update during a later move batch:

```text
system/agent-context/00-memory-map.md
```

References observed there include routing/search locations for:

```text
sources/research/bible/passages/
sources/research/bible/topics/
sources/research/bible/word-studies/
sources/research/bible/theological-questions/
sources/research/bible/comparative-views/
sources/research/bible/
```

Compatibility/planning reference also observed in:

```text
system/folder-contract.md
```

That reference is part of the migration contract and may remain or be updated only when the compatibility contract is revised.

Historical/report references exist in migration reports and do not need to be rewritten as active routing unless the report is being updated for status.

## Recommendation

Proceed next with **Batch 5C1 — Bible source resources move**, after explicit approval or a Codex-assisted move if Workbench policy blocks the legacy `sources/research/bible/**` paths.

Recommended move set:

```text
sources/research/bible/README.md -> faith/resources/bible/README.md
sources/research/bible/comparative-views/ -> faith/resources/bible/comparative-views/
sources/research/bible/passages/ -> faith/resources/bible/passages/
sources/research/bible/theological-questions/ -> faith/resources/bible/theological-questions/
sources/research/bible/topics/ -> faith/resources/bible/topics/
sources/research/bible/word-studies/ -> faith/resources/bible/word-studies/
```

Required active-reference update during Batch 5C1:

```text
system/agent-context/00-memory-map.md
```

Do not change source meaning while updating references. New target paths should still be treated as source/provenance material, not settled doctrine.

## Validation required for Batch 5C1

1. Verify all source paths exist and `faith/resources/bible/` is absent before moving.
2. Move only the Bible source resource package.
3. Keep the move source-preserving under `faith/resources/bible/`.
4. Update active references in `system/agent-context/00-memory-map.md`.
5. Do not move or edit unrelated faith content:
   - `sources/research/theology/`
   - `sources/research/apologetics/`
   - `wiki/faith.md`
   - `wiki/areas/personal-identity/theology.md`
   - `wiki/areas/theological-studies/`
6. Do not touch unrelated dirty paths:
   - `wiki/log.md`
   - `wiki/organisations/prochat/pitch-decks/`
7. Preserve Save-to-Mind behavior.
8. Keep continuous processing disabled.
9. Stage only moved Bible source resource files and related active-reference/report updates.

## Boundaries preserved in this precheck

- No Bible source content moved.
- No Bible source content edited.
- No legacy faith/source/wiki content moved.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.
