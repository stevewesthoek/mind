# Infinite Brain Context & Learning Runtime — Owner Charter

**Status:** owner-approved architecture program; specification phase only
**Approved:** 2026-08-15
**Owner:** Steve Westhoek
**Supersedes:** nothing; this is a post-closure program and does not reopen the completed Mind roadmap or Brain P1-P8 runtime roadmap

## Purpose

Create a universal, fresh, cross-tool context and learning layer through which any approved LLM or IDE can work with Steve's Mind and Brain without requiring Steve to manually reload context at the start of every conversation.

The runtime must make models interchangeable. Mind provides human meaning and strategy. Brain provides machine capability, skills, rules, runbooks, and execution policy. Conversation histories, runtime evidence, and tool logs are evidence that can improve those systems, but they are not automatically canonical truth.

## Owner outcomes

The system should make these statements true:

1. Every supported AI session starts with a small, current, trusted orientation to Mind first and Brain second.
2. The user does not have to prompt an LLM to "load Mind" or "load Brain" before useful work can begin.
3. Context is retrieved progressively and atomically. The system sends the smallest useful cited context pack, then expands only when the task requires it.
4. Claude Code, Codex, Gemini, Cursor, Kiro, Workbench, terminal clients, and future supported clients can use the same logical context interface.
5. Local Office, MacBook, home-network, Tailscale, and future single-tenant VPS deployments use the same contracts even when transport differs.
6. Conversation evidence is mined for useful learning: repeated preferences, repeated workflows, decisions, corrections, failure episodes, successful repairs, reusable skills, runbook lessons, and strategy conflicts.
7. A model should challenge Steve in the live conversation when a proposed direction conflicts with current canonical Mind strategy. The model must distinguish "this conflicts with current strategy" from "you are not allowed to change strategy."
8. Durable learning remains reviewable, provenance-cited, freshness-aware, reversible, and approval-gated according to authority.
9. The human experience stays simple. Steve should not manage several proposal systems, notification channels, or memory databases manually.
10. The architecture must be modular, standardized, installable, upgradeable, and suitable for future personal, business, managed single-tenant, and VPS deployments.

## Human simplicity contract

For Steve, the system should behave mostly as a black box.

### Live conversations

During a conversation, the runtime may proactively surface:

- relevant current strategy;
- a contradiction with a current strategy or decision;
- a stale strategy that should be revalidated;
- a previously learned failure or recovery pattern;
- an applicable Brain skill or runbook;
- a warning that a durable decision is being made and should enter the decision workflow.

This feedback should happen in the conversation without requiring a special prompt.

### Decisions that require human authority

All unresolved durable human decisions must converge into **one logical Decision Center**.

For Steve's deployment, the preferred human interface is a dedicated Decision Center surface in the Obsidian Brain Console. The queue itself is Brain-owned runtime state; Obsidian is a presentation and approval adapter, not the source of truth.

The Decision Center should cover at least:

- proposed Mind truth or strategy changes;
- contradictions between new evidence and current Mind truth;
- stale knowledge requiring revalidation;
- proposed Brain skills, rules, hooks, tests, or runbook changes that require judgment;
- cross-repo learning transactions;
- compaction/deletion decisions where evidence would otherwise be lost;
- security, privacy, or authority-boundary decisions.

Notifications may come through Obsidian, macOS, email, Slack, or future adapters, but they must point back to the same logical queue. Notification channels must not become separate decision stores.

Default notification behavior should avoid noise: notify on important new attention, surface a pending-count badge, and support a daily digest rather than generating a notification for every low-priority candidate.

## Lean-memory principle

Infinite Brain must become **more connected and more useful**, not merely larger.

The system should mimic the useful property of human memory: repeated experience strengthens relationships and compresses understanding rather than creating endless duplicated copies.

Therefore:

- raw conversations remain source evidence where possible and are not duplicated wholesale into Git;
- accepted knowledge should update or supersede existing atoms instead of appending near-duplicates forever;
- relation edges may increase while hot textual summaries stay compact;
- derived indexes and caches must be disposable and rebuildable;
- stale, superseded, duplicate, and low-value candidates must leave the hot retrieval surface;
- historical evidence may be retained when useful without remaining default-active context;
- skill libraries and learned operational rules must continue to be pruned for signal and context cost;
- every storage class must have an explicit retention, compaction, or rebuild policy;
- disk growth, context-token growth, retrieval latency, and duplication rate are first-class quality metrics.

The target is sublinear growth of hot memory relative to processed evidence. If processing more conversations makes default context, disk use, or retrieval time grow roughly in proportion to transcript volume, the architecture is failing.

## Freshness principle

Memory is not just stored truth. Useful memory answers whether a claim is still trustworthy **now**.

Every durable or derived knowledge atom should support enough metadata to determine:

- where it came from;
- when it was observed;
- who/what had authority;
- when it became valid;
- when it was last confirmed;
- whether it has a review date or freshness risk;
- whether newer evidence supersedes or contradicts it.

Changing runtime facts should be revalidated from current Brain/source evidence. Human meaning and strategy should be revalidated according to Mind authority and explicit review policy.

The system must never silently treat "Steve preferred X four months ago" as equivalent to "Steve currently prefers X."

## Learning-from-failure principle

A failure episode should not terminate at "remember the fix."

The preferred learning chain is:

```text
symptom
→ attempted approaches
→ why they failed
→ root cause
→ successful repair
→ invariant learned
→ cheapest proactive prevention mechanism
```

The prevention mechanism may be a deterministic test, hook, validator, rule, runbook, skill, decision-log update, or contextual memory. Prefer deterministic prevention over future prompt burden when feasible.

## Authority model

The architecture must preserve the existing ownership split:

- **Mind:** human meaning, beliefs, preferences, strategy, commitments, approved durable knowledge, relationships, and historical human context.
- **Brain:** execution policy, tools, skills, runbooks, machine configuration, capability truth, deterministic safety controls, and operational learning.
- **Conversation/runtime evidence:** observations only; not canonical truth.
- **Derived hot memory/indexes:** disposable projections for fast retrieval; never a parallel authority surface.
- **Context packs:** ephemeral, cited task orientation.

`~/.brain/memory/` must evolve toward a derived hot-recall layer rather than remaining an independent source of human truth.

## Packaging principle

This system is intended to become installable for other people and businesses.

The core must therefore avoid Steve-specific assumptions in APIs, schemas, storage, and business logic. Steve's deployment is one profile/configuration of a general architecture.

Required qualities:

- explicit interfaces between core services and adapters;
- stable schemas and versioned contracts;
- host-neutral path/config discovery;
- no hard dependency on Obsidian, macOS, a specific LLM, or a specific IDE in the core;
- optional adapters for Obsidian, CLI, MCP, HTTP, Slack/Telegram, browser UI, and managed control planes;
- local-first and single-tenant deployment before multi-tenant SaaS complexity;
- secrets and private evidence outside Git;
- reproducible install/doctor/update/backup/export paths;
- deterministic migration and rollback contracts;
- bounded dependency surface and no always-on heavyweight database requirement for personal installs;
- upgrade-safe configuration separation from application runtime data.

A simplified customer edition may expose only context, learning proposals, a decision center, and a small Brain skill layer. The architecture must not require every customer to adopt Steve's full Mind taxonomy or every Brain subsystem.

## Non-goals for the specification phase

This charter does **not** authorize:

- ingesting conversation histories;
- broad or automatic Mind writes;
- automatic strategy changes;
- automatic skill promotion;
- deleting historical evidence;
- enabling continuous autonomous model processing;
- changing the completed P1-P8 roadmap;
- changing active `feature/video-orchestrator` work;
- binding the architecture permanently to Obsidian or any specific vendor/client.

## Technical projection

Brain owns the technical architecture, roadmap, implementation plan, conformance gates, and runtime status for this program:

- `operations/specs/infinite-brain-context-learning-runtime-architecture.md`
- `operations/specs/infinite-brain-context-learning-runtime-roadmap.md`
- `operations/specs/infinite-brain-context-learning-runtime-implementation-plan.md`

Those documents must defer human strategy and authority to this charter and the existing Mind philosophy/strategy documents.
