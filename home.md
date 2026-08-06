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
5. `system/brain-mind-bridge.md`

Brain's machine capability status is authoritative in:

```text
/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md
```

---

## What Mind expects

1. **New captures belong in `inbox/new/`.** Failed or blocked processing belongs in `inbox/failed/`; generated proposals and receipts belong in `inbox/processed/`.

2. **Brain owns machine status.** For current capability, scheduler, workflow, and maintenance state, consult Brain's canonical live-status runbook. Mind does not duplicate or describe runtime state.

3. **Proposals do not authorize durable Mind writes.** Human approval is required for meaningful changes to knowledge, strategy, tasks, commitments, or history. Automatic moves, durable writes, task writes, and continuous processing require explicit human authorization before they are permitted.

---

## What you need to do

**Use Brain Console for system status and exceptions.**

Open the Obsidian Brain Console plugin when you need runtime status, maintenance previews, approvals, scheduler state, or the next safe action.

**Review proposals in the current proposal surface.**

Target review surface: `inbox/processed/`.

For each proposal:
- **Accept** — approve or perform the documented exact-path action.
- **Reject** — record or remove the proposal according to its review instructions.
- **Later** — leave it open for later review.

A proposal does not authorize an automatic content change.

**Use the current task source of truth.**

Authoritative task surface: `kanban.md`.

Retired compatibility snapshot: `tasks.md` (read-only and non-authoritative).

Open `kanban.md` to see what is to-do, in progress, and done. Add, move, and complete tasks only there. A future authority migration requires separate lossless, reversible validation and explicit approval.

---

## Target structure

| What | Target path | Migration note |
|------|-------------|----------------|
| New captures | `inbox/new/` | `history/legacy-capture/inbox/` is migrated historical evidence |
| Raw originals | `inbox/raw/` | source paths reviewed and migrated to `history/legacy-capture/` |
| Processed proposals and receipts | `inbox/processed/` | `inbox/processed/legacy-wiki-proposal-log.md` retains migrated wiki log |
| Failed intake | `inbox/failed/` | verify current external failure routing in `system/folder-contract.md` |
| Organizations | `organizations/` | `wiki/organisations/` migrated Phase 2; `history/legacy-wiki/organisations/README.md` retains legacy organisations README |
| Active projects | `projects/` | `history/legacy-live/projects.md` is migrated historical evidence |
| Repos and apps | `repos/` | none; new target area |
| People | `people/` | `people/steve/personal-identity/` migrated Phase 2 from `wiki/areas/personal-identity/` |
| Faith, Bible, theology, apologetics, ministry | `faith/` | source material migrated from `sources/research/` prior batches |
| Durable non-faith knowledge | `knowledge/` | `knowledge/personal/` migrated Phase 2 from `wiki/family.md`, `wiki/finance.md`, `wiki/health.md` |
| Non-faith source material | `resources/` | `sources/` root removed Phase 1 |
| Completed or inactive material | `history/` | `history/legacy-wiki/` migrated Phase 2; `history/archive/` migrated Phase 3 |
| AI/coding-agent context | `system/agent-context/` | `router/` |
| Graphify operational output | `runtime/local/graphify/` (future contained profile) | `graphify-out/` and `.graphify-out/` are compatibility roots; generated output is non-authoritative |

---

## How information moves

```text
inbox → review → propose destination and relations → approve → place → use → revalidate → supersede or preserve in history
```

Some old folders remain as compatibility or historical surfaces. Their current state is defined by `system/folder-contract.md`; an old folder's presence does not make it an active destination.

Brain may prepare classifications, relation proposals, and destination proposals. Durable placement or truth changes remain reviewed and approval-gated.

---

## Technical details

For system contracts, automation boundaries, generated-output rules, and migration status, use:

- `system/README.md`
- `system/folder-contract.md`
- `system/brain-mind-bridge.md`
- `system/top-level-folder-redesign-migration-plan.md`
