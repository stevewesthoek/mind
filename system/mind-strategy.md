# Mind Strategy

**Status:** canonical strategy  
**Depends on:** `system/infinite-brain-philosophy.md`  
**Purpose:** translate the Infinite Brain philosophy into strategic choices for Mind.

## Strategic definition

Mind is Steve's human-first personal and business knowledge system.

Its strategic purpose is:

```text
Turn continuous capture into clear current context, durable knowledge, traceable decisions, and reusable human understanding — without making the vault harder to use as it grows.
```

Mind should become more useful with time because it remembers, connects, revalidates, and preserves what matters.

## Strategic position in the wider system

```text
Mind  = human truth, strategy, knowledge, priorities, interpretation
Brain = AI capabilities, automation, runtime, tools, orchestration
```

Mind and Brain share the Infinite Brain philosophy but implement it differently.

Mind is optimized for:

- Obsidian;
- human browsing;
- shallow navigation;
- clear current-state pages;
- durable linked knowledge;
- personal and business interpretation.

Brain is optimized for:

- AI startup and routing;
- automation;
- machine-readable contracts;
- system execution;
- observability and recovery.

## Strategic outcomes

Mind should deliver five outcomes.

### 1. Capture without friction

Steve should be able to save text, voice, AI-session output, research, decisions, and ideas without deciding the final destination immediately.

### 2. Current truth is easy to find

Active priorities, projects, decisions, and business state should be visible from a small number of live surfaces.

### 3. Durable knowledge compounds

Reviewed insight should move from raw capture into clear wiki knowledge that can improve future reasoning and work.

### 4. Stale knowledge does not silently mislead

Changing knowledge should be reviewable, contradictions should be surfaced, and superseded information should leave the active layer.

### 5. Brain assists without taking ownership of human truth

Brain should make Mind easier to maintain through classification, summaries, comparison, maintenance suggestions, and approved writes.

## Structural strategy

Keep the existing shallow top-level model:

```text
home.md
kanban.md
capture/
live/
wiki/
sources/
archive/
system/
```

The strategic meaning is:

| Surface | Role |
|---|---|
| `home.md` | Human entrypoint and user manual |
| `kanban.md` | Current daily task source of truth |
| `capture/` | Safe intake and failure buffer |
| `live/` | Current state, active projects, decisions, and dashboards |
| `wiki/` | Durable reviewed knowledge |
| `sources/` | Evidence, research, and original material |
| `archive/` | Completed, superseded, legacy, and historical material |
| `system/` | Mind philosophy, strategy, contracts, roadmap, plans, and reports |

Do not solve retrieval problems by adding more folder depth first. Prefer better page titles, links, compact indexes, frontmatter where useful, Obsidian search, and Graphify.

## Human navigation strategy

The human retrieval path should stay simple:

```text
home.md
→ live/dashboard.md or one clear destination
→ linked page
```

The system should not require Steve to remember technical routing rules.

## AI retrieval strategy

AI systems should:

1. understand the Brain/Mind boundary;
2. use Graphify or focused search rather than broad scans;
3. read only relevant Mind pages;
4. distinguish current state from durable knowledge and source evidence;
5. state when context is stale, missing, or contradictory;
6. treat Mind as the authority for personal and business truth.

## Brain–Mind bridge strategy

The bridge should be standardized, normalized, modular, and minimal.

Brain may exchange compact briefs with Mind containing:

```yaml
title:
type:
status:
source_repo:
source_path:
created:
last_reviewed:
confidence:
summary:
evidence:
recommended_destination:
requires_approval:
supersedes:
```

This envelope is for cross-repo captures, proposals, maintenance suggestions, and approved handoffs. It is not required on every human-authored note.

### Brain → Mind

Default flow:

```text
Brain observes or prepares knowledge
→ compact normalized proposal
→ capture/inbox/ or documented review surface
→ human review
→ approved placement in live/, wiki/, sources/, archive/, or kanban.md
```

Brain should not silently rewrite durable personal or business truth.

### Mind → Brain

Brain may retrieve:

- current priorities;
- approved business strategy;
- durable decisions;
- project context;
- personal preferences and constraints;
- reviewed research conclusions.

Mind content should become a global AI-system rule only through an explicit promotion decision.

## Knowledge-state strategy

Use a small shared status vocabulary where state matters:

```text
draft
current
review-needed
superseded
archived
```

Use it selectively. Human readability remains more important than universal metadata completeness.

## Maintenance strategy

Mind maintenance should be proactive but review-gated.

The system should be able to propose:

- duplicate merges;
- stale-page reviews;
- contradiction resolutions;
- archive candidates;
- updates to current project status;
- source-reference improvements;
- durable lessons trapped in capture;
- completed work still shown as active.

The sequence should remain:

```text
report-only
→ proposal
→ human approval
→ bounded write
→ verification and log
```

## Automation strategy

Automation belongs operationally in Brain.

Mind should contain:

- the human strategy;
- destination contracts;
- approval boundaries;
- review surfaces;
- durable logs and results where appropriate.

Brain should contain:

- scheduler implementation;
- queues and throttling;
- model selection;
- retries and recovery;
- runtime status;
- automated execution.

### Continuous processing rules

Continuous processing is optional and disabled by default. Basic Mind use — reading, navigation, capture, and Obsidian workflows — does not depend on continuous automation.

Continuous processing must not be enabled until its operational value is demonstrated through a bounded, approved trial with before/after evidence. `continuousEnabled: false` and `watcherEnabled: false` are the safe default state.

The current implementation is gated and plan-only. Large-file nightly fallback is a bounded plan, not active autonomous execution.

### Operational validation requirement

Automation must be retained only when value is demonstrated. Meaningful time savings and reduced maintenance burden remain unproven for the current continuous processing implementation. Lack of demonstrated value must remain visible and must not be treated as success.

### Simplification strategy

Do not solve retrieval problems by adding more folder depth first. Prefer better page titles, links, compact indexes, frontmatter where useful, Obsidian search, and Graphify.

Physical folder depth is not the same as useful depth. Useful-depth recommendations require navigation, usability, and maintenance evidence before they can be made. A bounded simplification review may validly conclude that no deletion or archival is justified.

No destructive simplification occurs without explicit human approval.

### Approval evidence rule

Persistent approval volume is measurable only when persistence is configured and readable. Absent persistent evidence does not prove no approvals have ever occurred. When the approval store is not configured, the result is `insufficient-evidence`, not a zero count.

## Success measures

The strategy is working when:

- new information is easy to capture;
- current priorities and decisions are easy to find;
- fewer useful insights remain trapped in inboxes or chats;
- stale or conflicting knowledge is surfaced before it misleads;
- old material leaves the active layer without being lost;
- Brain can assist without creating duplicate truth;
- the number of folders and navigation steps remains small;
- Steve spends less time maintaining Mind as Mind becomes more useful.

## Non-goals

Mind should not become:

- a database-shaped vault requiring rigid schemas everywhere;
- a copy of Brain's AI operating structure;
- a runtime log store;
- an automation codebase;
- a deeply nested PARA implementation;
- a place where AI silently rewrites personal or business truth;
- a second copy of information already owned by Brain.

## Strategic rule

```text
Mind should become more intelligent through better lifecycle, retrieval, freshness, and reviewed maintenance — not through more folders or more complexity.
```
