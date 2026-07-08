# Theology Source Resources Move Precheck — 2026-07-08

**Task:** Task O — Batch 5D theology source resources move precheck  
**Status:** precheck only  
**Boundary:** no theology source content moved or edited in this batch.

## Proposed source-preserving move

```text
sources/research/theology/README.md -> faith/resources/theology/README.md
```

This is a source/provenance-preserving move. It must not promote exploratory theology research into distilled theology conclusions under `faith/theology/`.

## Current state verified

Latest completed commit before this precheck:

```text
cf15dcd docs: move Bible source resources
```

Starting dirty status contained only known unrelated paths:

```text
 M wiki/log.md
?? wiki/organisations/prochat/pitch-decks/
```

Source observed:

```text
sources/research/theology/README.md
```

Target parent observed:

```text
faith/resources/README.md
faith/resources/bible/
```

Target collision check:

```text
faith/resources/theology/ absent
```

## Source inventory

`sources/research/theology/` currently appears README-only:

```text
sources/research/theology/README.md
```

The README describes broader theology research not tied to a single passage and says not to store final ministry strategy or task execution there.

## Classification

| Source path | Proposed target | Classification | Move readiness | Notes |
|-------------|-----------------|----------------|----------------|-------|
| `sources/research/theology/README.md` | `faith/resources/theology/README.md` | source/provenance material | likely safe after approval | Keep as research/source guidance, not distilled doctrine. |

## Active references found

Active references requiring update during a later move batch:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
```

References observed include:

```text
sources/research/theology/
```

The memory map also uses this path as an alternate destination for theological questions alongside `faith/resources/bible/theological-questions/`.

Compatibility/planning reference also exists in:

```text
system/folder-contract.md
```

That compatibility reference may remain until the folder contract is revised more broadly.

## Recommendation

Proceed next with **Batch 5D1 — Theology source resources move**, after explicit approval or a Codex-assisted move if Workbench policy blocks legacy `sources/research/theology/**` writes.

Recommended move set:

```text
sources/research/theology/README.md -> faith/resources/theology/README.md
```

Allowed equivalent:

```text
sources/research/theology/ -> faith/resources/theology/
```

Only use the equivalent whole-folder move if the folder still contains exactly the README-only source package and no extra unrelated content.

Required active-reference updates during Batch 5D1:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
```

Do not change source meaning while updating references. New target path should remain source/provenance material, not settled doctrine.

## Validation required for Batch 5D1

1. Verify `sources/research/theology/README.md` exists and `faith/resources/theology/` is absent.
2. Move only the theology source resource README or README-only folder.
3. Keep the move source-preserving under `faith/resources/theology/`.
4. Update active references in the three agent-context files.
5. Do not move or edit unrelated faith content:
   - `sources/research/apologetics/`
   - `wiki/faith.md`
   - `wiki/areas/personal-identity/theology.md`
   - `wiki/areas/theological-studies/`
6. Do not touch unrelated dirty paths:
   - `wiki/log.md`
   - `wiki/organisations/prochat/pitch-decks/`
7. Preserve Save-to-Mind behavior.
8. Keep continuous processing disabled.
9. Stage only moved theology source resource files and related active-reference/report updates.

## Boundaries preserved in this precheck

- No theology source content moved.
- No theology source content edited.
- No legacy faith/source/wiki content moved.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.
