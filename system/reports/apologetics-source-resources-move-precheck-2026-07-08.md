# Apologetics Source Resources Move Precheck — 2026-07-08

**Task:** Task O — Batch 5E apologetics source resources move precheck
**Status:** Batch 5E1 completed after precheck
**Boundary:** approved apologetics source resource content moved to `faith/resources/apologetics/`; source/provenance classification preserved.

## Proposed source-preserving move

```text
sources/research/apologetics/ -> faith/resources/apologetics/
```

This is a source/provenance-preserving move. It must not promote exploratory research, authored debate standards, converted dialogue packages, or draft responses into distilled conclusions under `faith/apologetics/`.

## Current state verified

Latest completed commit before this precheck:

```text
6feeae6 docs: move theology source resources
```

Starting dirty status contained only known unrelated paths:

```text
 M wiki/log.md
?? wiki/organisations/prochat/pitch-decks/
```

Source observed:

```text
sources/research/apologetics/
```

Target collision check:

```text
faith/resources/apologetics/ absent
```

## Source inventory

Top-level apologetics source paths observed:

```text
sources/research/apologetics/.DS_Store
sources/research/apologetics/README.md
sources/research/apologetics/atheism-dialogue-001/
sources/research/apologetics/baptism-dialogue-001/
sources/research/apologetics/gospel-dialogue-001/
sources/research/apologetics/steve-apologetics-voice-and-debate-standard.md
```

The requested named paths exist:

```text
sources/research/apologetics/README.md
sources/research/apologetics/steve-apologetics-voice-and-debate-standard.md
sources/research/apologetics/atheism-dialogue-001/
```

Additional dialogue packages also exist and must be included in any later whole-folder move decision:

```text
sources/research/apologetics/baptism-dialogue-001/
sources/research/apologetics/gospel-dialogue-001/
```

Non-knowledge metadata observed:

```text
sources/research/apologetics/.DS_Store
sources/research/apologetics/atheism-dialogue-001/.DS_Store
```

Do not migrate `.DS_Store` as knowledge. Handle metadata cleanup separately if needed.

## Dialogue package summary

Observed README evidence:

- `atheism-dialogue-001/` is an apologetics case file with Steve's original paper, an atheist response, Steve's reply, source/provenance documents, analysis pipeline files, archives, final sendable responses, and source appendices.
- `baptism-dialogue-001/` is an apologetics/theological dialogue package around baptism, grace, predestination, assurance, and Romans 14-style disagreement among believers. It includes source documents, pipeline notes, and final dialogue drafts.
- `gospel-dialogue-001/` is a gospel and evangelism follow-up package for a serious seeker, not an atheist rebuttal. It includes gospel/legal-framework documents, pipeline notes, source appendices, archive drafts, and a final follow-up letter.

## Classification

| Source path | Classification | Move readiness | Notes |
|-------------|----------------|----------------|-------|
| `sources/research/apologetics/README.md` | source/provenance material | likely safe after approval | README defines this folder as apologetics research, objections, evidence, and responses; not committed strategy or project plans. |
| `sources/research/apologetics/steve-apologetics-voice-and-debate-standard.md` | authored apologetics standard | needs human decision | Active personal writing standard used for debate replies. It may belong in `faith/resources/apologetics/` initially, but it is not merely raw source material and may later deserve a distilled/agent-context home. |
| `sources/research/apologetics/atheism-dialogue-001/` | dialogue package / converted source material | likely safe as source package after approval | Preserve as a complete provenance-heavy package first. Later distilled notes may be promoted selectively to `faith/apologetics/`. |
| `sources/research/apologetics/baptism-dialogue-001/` | dialogue package / converted source material; candidate for later distilled faith/apologetics promotion | needs human decision | Not named in the initial Batch 5E prompt but present in the source tree. It blends theological dialogue, apologetics voice guidance, and final drafts. |
| `sources/research/apologetics/gospel-dialogue-001/` | dialogue package / converted source material; candidate for later distilled faith/apologetics promotion | needs human decision | Not named in the initial Batch 5E prompt but present in the source tree. It is seeker/gospel follow-up material rather than atheist rebuttal. |
| `sources/research/apologetics/.DS_Store` | local metadata | do not move as knowledge | Exclude from knowledge migration or clean up separately. |
| `sources/research/apologetics/atheism-dialogue-001/.DS_Store` | local metadata | do not move as knowledge | Exclude from knowledge migration or clean up separately. |

## Active references found

Active references requiring update during a later move batch:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
```

References observed include:

```text
sources/research/apologetics/
sources/research/apologetics/steve-apologetics-voice-and-debate-standard.md
```

Compatibility/planning references also exist in:

```text
faith/README.md
home.md
system/folder-contract.md
system/top-level-folder-redesign-migration-plan.md
system/reports/faith-migration-precheck-2026-07-08.md
system/reports/faith-source-subinventory-2026-07-08.md
system/reports/bible-source-resources-move-precheck-2026-07-08.md
system/reports/theology-source-resources-move-precheck-2026-07-08.md
system/reports/top-level-folder-migration-batch-plan-2026-07-07.md
```

Those compatibility, historical, and planning references may remain until their owning contract or report is revised.

## Recommendation

Do not perform Batch 5E as a blind whole-folder move without approval, because the current source tree contains more than the originally named `README.md`, `steve-apologetics-voice-and-debate-standard.md`, and `atheism-dialogue-001/` package.

Recommended next move after approval:

```text
sources/research/apologetics/README.md -> faith/resources/apologetics/README.md
sources/research/apologetics/steve-apologetics-voice-and-debate-standard.md -> faith/resources/apologetics/steve-apologetics-voice-and-debate-standard.md
sources/research/apologetics/atheism-dialogue-001/ -> faith/resources/apologetics/atheism-dialogue-001/
```

Human decision needed before including:

```text
sources/research/apologetics/baptism-dialogue-001/
sources/research/apologetics/gospel-dialogue-001/
```

If approved, these should move source-preservingly under:

```text
faith/resources/apologetics/
```

Do not promote content into:

```text
faith/apologetics/
```

unless individual distilled outputs are reviewed separately.

## Required validation for a later Batch 5E1

1. Verify approved source paths exist and `faith/resources/apologetics/` is absent before moving.
2. Confirm whether `baptism-dialogue-001/` and `gospel-dialogue-001/` are included in scope.
3. Move only approved apologetics source resource paths.
4. Exclude or separately clean up `.DS_Store` metadata.
5. Keep the move source-preserving under `faith/resources/apologetics/`.
6. Update active references in the three agent-context files.
7. Do not move or edit unrelated faith content:
   - `wiki/faith.md`
   - `wiki/areas/personal-identity/theology.md`
   - `wiki/areas/theological-studies/`
8. Do not touch unrelated dirty paths:
   - `wiki/log.md`
   - `wiki/organisations/prochat/pitch-decks/`
9. Preserve Save-to-Mind behavior.
10. Keep continuous processing disabled.
11. Stage only moved apologetics source resource files and related active-reference/report updates.

## Boundaries preserved in Batch 5E1

- Only the approved apologetics source resource package moved.
- Apologetics source content was not promoted into `faith/apologetics/`.
- `.DS_Store` metadata was not migrated.
- `wiki/faith.md`, `wiki/areas/personal-identity/theology.md`, and `wiki/areas/theological-studies/` were not moved or edited.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.

## Batch 5E1 completion notes

Completed source-preserving move:

```text
sources/research/apologetics/README.md -> faith/resources/apologetics/README.md
sources/research/apologetics/steve-apologetics-voice-and-debate-standard.md -> faith/resources/apologetics/steve-apologetics-voice-and-debate-standard.md
sources/research/apologetics/atheism-dialogue-001/ -> faith/resources/apologetics/atheism-dialogue-001/
sources/research/apologetics/baptism-dialogue-001/ -> faith/resources/apologetics/baptism-dialogue-001/
sources/research/apologetics/gospel-dialogue-001/ -> faith/resources/apologetics/gospel-dialogue-001/
```

The human-approved Batch 5E1 move included:

```text
README.md
steve-apologetics-voice-and-debate-standard.md
atheism-dialogue-001/
baptism-dialogue-001/
gospel-dialogue-001/
```

Excluded metadata:

```text
sources/research/apologetics/.DS_Store
sources/research/apologetics/atheism-dialogue-001/.DS_Store
```

Active reference updates completed in:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
```
