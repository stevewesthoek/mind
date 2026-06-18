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
→ update, supersede, or archive
```

Mind remains human-first. Brain may classify, compare, and prepare proposals, but personal and business truth stays reviewable and human-approved.

Canonical direction:

1. `system/infinite-brain-philosophy.md`
2. `system/mind-strategy.md`
3. `system/mind-roadmap.md`
4. `system/mind-implementation-plan.md`

---

## What happens automatically

1. **Save-to-Mind places new captures in `capture/inbox/` when you use it.** You do not need to choose a permanent destination during capture.

2. **Brain runs report-only Mind Steward and scheduler workflows.** These workflows inspect, classify, and prepare status or review information without moving captures or changing durable Mind content automatically.

3. **Brain Console provides the primary live system view.** Use the Obsidian Brain Console plugin for Brain Core, Mind Steward, scheduler, approval, and maintenance status. `live/dashboard.md` remains the Markdown fallback.

Automatic capture moves, automatic durable knowledge writes, automatic Kanban writes, and continuous processing are not enabled.

---

## What you need to do

**Use Brain Console for system status and exceptions.**

Open the Obsidian Brain Console plugin when you need runtime status, maintenance previews, approvals, scheduler state, or the next safe action.

**Review `wiki/log.md` when proposals are present.**

For each proposal:
- **Accept** — approve or perform the documented exact-path action.
- **Reject** — record or remove the proposal according to its review instructions.
- **Later** — leave it open for later review.

A proposal does not authorize an automatic content change.

**Use `kanban.md` as the current task source of truth.**

Open it to see what is to-do, in progress, and done. Add, move, and complete tasks there until a lossless task-sync implementation is validated.

---

## Current, durable, source, and historical information

- **`live/` — current state:** active projects, current decisions, dashboards, task summaries, and other information that describes what is true or active now.
- **`wiki/` — durable knowledge:** reviewed, compiled knowledge intended to remain useful beyond the original capture or source.
- **`sources/` — evidence:** raw evidence, research, files, books, papers, and other source material that supports later conclusions.
- **`archive/` — historical material:** completed, superseded, legacy, or otherwise inactive material preserved for history rather than presented as current truth.

Use `live/` for what is current, `wiki/` for what has been distilled, `sources/` for what supports a claim, and `archive/` for what should remain retrievable without appearing active.

---

## Where everything lives

| What | Where |
|------|-------|
| New captures (unreviewed) | `capture/inbox/` |
| Pending system proposals | `wiki/log.md` |
| Working task board and current task source of truth | `kanban.md` |
| Mind Steward task summary surface | `live/tasks.md` |
| Active projects | `live/projects/` |
| Committed decisions | `live/decisions.md` |
| Business & org knowledge | `wiki/organisations/` (ProChat, Arkware, Yeshua Academy) |
| Personal areas (faith, family, health) | `wiki/areas/` |
| Apologetics research | `sources/research/apologetics/` |
| Bible studies | `sources/research/bible/` |
| Theology | `sources/research/theology/` |
| Marketing & business research | `sources/research/marketing/` · `sources/research/business/` |
| Books and people | `sources/research/books/` · `sources/research/people/` |
| Completed or inactive material | `archive/` |

---

## How information moves

```text
capture → review → place → use → revalidate → supersede or archive
```

Brain may prepare classifications and proposals. Durable placement or truth changes remain reviewed and approval-gated.

---

## Technical details

For system contracts, automation boundaries, and generated-output rules, use `system/README.md`.
