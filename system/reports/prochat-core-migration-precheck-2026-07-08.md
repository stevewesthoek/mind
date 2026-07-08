# ProChat Core Migration Precheck — 2026-07-08

**Task:** Task O — Batch 4C ProChat core organization precheck  
**Status:** Batch 4C1 completed after precheck
**Boundary:** only ProChat core README, `growth/`, and `legal/` moved; held legacy ProChat folders remain in place.

## Files and folders inspected

- `wiki/organisations/prochat/README.md`
- `wiki/organisations/prochat/growth/`
- `wiki/organisations/prochat/legal/`
- `organizations/README.md`
- `system/reports/organizations-migration-precheck-2026-07-07.md`
- `system/reports/top-level-folder-migration-batch-plan-2026-07-07.md`

Explicitly excluded:

- `wiki/organisations/prochat/pitch-decks/`
- `wiki/organisations/prochat/brand/`
- `wiki/organisations/prochat/playbooks/`
- `wiki/organisations/prochat/youtube/`

## Inventory summary

Core files and folders in scope:

```text
wiki/organisations/prochat/README.md
wiki/organisations/prochat/growth/README.md
wiki/organisations/prochat/growth/daily-growth-command.md
wiki/organisations/prochat/growth/keyword-topic-engine.md
wiki/organisations/prochat/growth/linkedin-comment-strategy.md
wiki/organisations/prochat/growth/posting.md
wiki/organisations/prochat/growth/reddit-comment-strategy.md
wiki/organisations/prochat/growth/writing-style.md
wiki/organisations/prochat/growth/x-comment-strategy.md
wiki/organisations/prochat/legal/README.md
wiki/organisations/prochat/legal/privacy.md
wiki/organisations/prochat/legal/terms.md
```

Additional non-knowledge item observed:

```text
wiki/organisations/prochat/.DS_Store
```

Do not migrate `.DS_Store` as knowledge. Handle it only during a separate cleanup step if needed.

Target collision check:

```text
organizations/prochat/                  absent
organizations/prochat/README.md         absent
organizations/prochat/growth/           absent
organizations/prochat/legal/            absent
```

## Classification

| Current path | Proposed target | Classification | Move readiness | Notes |
|--------------|-----------------|----------------|----------------|-------|
| `wiki/organisations/prochat/README.md` | `organizations/prochat/README.md` | ProChat organization overview and authority map | Likely safe after approval | Must update internal authority paths from legacy `wiki/organisations/prochat/...` to target paths while holding brand/playbooks/youtube where they remain legacy. |
| `wiki/organisations/prochat/growth/` | `organizations/prochat/growth/` | Growth and distribution execution system | Likely safe after approval | Durable ProChat organization growth context; active agent-context references are known. |
| `wiki/organisations/prochat/legal/` | `organizations/prochat/legal/` | Internal legal-policy drafts | Likely safe after approval | Durable ProChat organization legal context; keep warnings that docs require legal review. |
| `wiki/organisations/prochat/.DS_Store` | no target | Local metadata | Do not move | Not durable knowledge. |

## Active references found

Active references that will need updating during the move batch:

```text
system/agent-context/00-memory-map.md
wiki/organisations/prochat/README.md
wiki/organisations/prochat/legal/README.md
wiki/organisations/prochat/youtube/README.md
```

References in migration reports may remain as historical/audit evidence.

## Move recommendation

Proceed next with **Batch 4C1 — ProChat core move**, after explicit approval or a Codex-assisted move if Workbench write policy blocks legacy `wiki/organisations/prochat/**` paths.

Recommended move set:

```text
wiki/organisations/prochat/README.md -> organizations/prochat/README.md
wiki/organisations/prochat/growth/ -> organizations/prochat/growth/
wiki/organisations/prochat/legal/ -> organizations/prochat/legal/
```

Do not include:

```text
wiki/organisations/prochat/.DS_Store
wiki/organisations/prochat/brand/
wiki/organisations/prochat/playbooks/
wiki/organisations/prochat/youtube/
wiki/organisations/prochat/pitch-decks/
```

## Required validation for Batch 4C1

1. Confirm source files/folders exist and target paths are absent.
2. Confirm `.DS_Store` is not staged or migrated.
3. Move only ProChat README, `growth/`, and `legal/`.
4. Update active references in:
   - `system/agent-context/00-memory-map.md`;
   - moved `organizations/prochat/README.md`;
   - moved `organizations/prochat/legal/README.md`;
   - legacy `wiki/organisations/prochat/youtube/README.md`, if still active and not moved.
5. Keep `brand/`, `playbooks/`, `youtube/`, and `pitch-decks/` untouched.
6. Keep `wiki/log.md` untouched.
7. Preserve Save-to-Mind behavior.
8. Keep continuous processing disabled.
9. Stage only moved ProChat core files and related docs/reference updates.

## Boundaries preserved in Batch 4C1

- only ProChat core README, `growth/`, and `legal/` moved;
- active references updated only for moved ProChat core paths;
- `wiki/log.md` untouched;
- `wiki/organisations/prochat/pitch-decks/` untouched;
- `wiki/organisations/prochat/.DS_Store` untouched;
- `wiki/organisations/prochat/brand/` untouched;
- `wiki/organisations/prochat/playbooks/` untouched;
- `wiki/organisations/prochat/youtube/` untouched;
- Save-to-Mind unchanged;
- continuous processing disabled.

## Batch 4C1 completion notes

Completed move set:

```text
wiki/organisations/prochat/README.md -> organizations/prochat/README.md
wiki/organisations/prochat/growth/ -> organizations/prochat/growth/
wiki/organisations/prochat/legal/ -> organizations/prochat/legal/
```

Reference updates completed in:

```text
system/agent-context/00-memory-map.md
organizations/prochat/README.md
organizations/prochat/legal/README.md
wiki/organisations/prochat/youtube/README.md
```

Held paths intentionally left in legacy location:

```text
wiki/organisations/prochat/.DS_Store
wiki/organisations/prochat/brand/
wiki/organisations/prochat/playbooks/
wiki/organisations/prochat/youtube/
wiki/organisations/prochat/pitch-decks/
```
