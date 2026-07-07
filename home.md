---
type: dashboard
---

# Mind — User Manual

This is your personal knowledge system. This page explains what happens automatically, what still needs review, and where your information lives.

## Infinite Brain philosophy

Mind should become more useful over time without becoming harder to read.

```text
capture continuously
→ keep current truth visible
→ turn reviewed insight into durable knowledge
→ retrieve what matters
→ revalidate changing information
→ update, supersede, or preserve in history
```

Mind remains human-first. Brain may classify, compare, and prepare proposals, but personal, business, and faith truth stays reviewable and human-approved.

Canonical direction:

1. `system/infinite-brain-philosophy.md`
2. `system/mind-strategy.md`
3. `system/mind-roadmap.md`
4. `system/mind-implementation-plan.md`
5. `system/top-level-folder-redesign-migration-plan.md`

---

## What happens automatically

1. **Save-to-Mind currently places new captures in legacy `capture/inbox/`.** The target path is `inbox/new/`, but the write destination will not change until Brain, Obsidian links, and validation are ready.

2. **Brain runs report-only Mind Steward and scheduler workflows.** These workflows inspect, classify, and prepare status or review information without moving captures or changing durable Mind content automatically.

3. **Brain Console provides the primary live system view.** Use the Obsidian Brain Console plugin for Brain Core, Mind Steward, scheduler, approval, and maintenance status. Legacy `live/dashboard.md` remains the Markdown fallback until dashboard surfaces migrate.

Automatic capture moves, automatic durable knowledge writes, automatic task writes, and continuous processing are not enabled.

---

## What you need to do

**Use Brain Console for system status and exceptions.**

Open the Obsidian Brain Console plugin when you need runtime status, maintenance previews, approvals, scheduler state, or the next safe action.

**Review proposals in the current proposal surface.**

Target review surface after migration: `inbox/processed/`.

Compatibility surface during migration: `wiki/log.md`.

For each proposal:
- **Accept** — approve or perform the documented exact-path action.
- **Reject** — record or remove the proposal according to its review instructions.
- **Later** — leave it open for later review.

A proposal does not authorize an automatic content change.

**Use the current task source of truth.**

Target path after migration: `tasks.md`.

Compatibility surface during migration: `kanban.md`.

Open the active task surface to see what is to-do, in progress, and done. Add, move, and complete tasks there until a lossless task-sync implementation is validated.

---

## Target structure

| What | Target path | Compatibility fallback |
|------|-------------|------------------------|
| New captures | `inbox/new/` | `capture/inbox/` |
| Raw originals | `inbox/raw/` | selected `capture/` or source paths after review |
| Processed proposals and receipts | `inbox/processed/` | `wiki/log.md` and current reports |
| Failed intake | `inbox/failed/` | `capture/failed/` |
| Organizations | `organizations/` | `wiki/organisations/` |
| Active projects | `projects/` | `live/projects/` |
| Repos and apps | `repos/` | none; new target area |
| People | `people/` | selected legacy research/source notes after review |
| Faith, Bible, theology, apologetics, ministry | `faith/` | `sources/research/bible/`, `sources/research/theology/`, `sources/research/apologetics/`, selected `wiki/areas/` |
| Durable non-faith knowledge | `knowledge/` | `wiki/` |
| Non-faith source material | `resources/` | `sources/` |
| Completed or inactive material | `history/` | `archive/` |
| AI/coding-agent context | `system/agent-context/` | `router/` |
| Generated graph output | `system/generated/graph/` | `graphify-out/` and older `.graphify-out/` references |

---

## How information moves

```text
inbox → review → propose destination and relations → approve → place → use → revalidate → supersede or preserve in history
```

During migration, old folders remain as compatibility fallbacks. No content has been moved merely because the target folder exists.

Brain may prepare classifications, relation proposals, and destination proposals. Durable placement or truth changes remain reviewed and approval-gated.

---

## Technical details

For system contracts, automation boundaries, generated-output rules, and migration status, use:

- `system/README.md`
- `system/folder-contract.md`
- `system/brain-mind-bridge.md`
- `system/top-level-folder-redesign-migration-plan.md`
