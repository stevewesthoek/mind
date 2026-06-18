# Infinite Brain Philosophy for Mind

**Status:** canonical philosophy  
**Contract version:** 1.0
**Purpose:** define the first principles from which Mind strategy, roadmap, and implementation decisions must follow.

## Core idea

Mind is Steve's human knowledge and personal operating system.

It should behave like an Infinite Brain:

```text
capture continuously
→ preserve sources
→ keep current truth visible
→ turn reviewed insight into durable knowledge
→ retrieve what matters
→ detect change and contradiction
→ update or supersede stale knowledge
→ preserve useful history
→ improve through continued use
```

The value of Mind is not the number of files it stores. Its value is that knowledge remains understandable, retrievable, current, and useful over time.

## Human-first rule

Mind is primarily for human reading, reasoning, and navigation in Obsidian.

Therefore:

- fewer folders are better;
- shallow structure is better than deep nesting;
- one clear page is better than several fragmented indexes;
- natural titles and links are better than machine-only identifiers;
- automation should reduce maintenance, not make the vault feel technical;
- continuous automation is optional and disabled by default; basic reading and navigation do not require it;
- automation is retained only when its value is demonstrated, not assumed;
- important truth changes remain visible and reviewable by a human.

Mind may be AI-readable, but it must never become organized primarily for an AI at the expense of the human experience.

## Brain and Mind

The repositories are separate but paired:

```text
brain = AI operating system
mind  = human knowledge and personal operating system
```

Brain owns:

- AI skills and orchestrators;
- automation and runtime behavior;
- schedulers and queues;
- model routing;
- technical runbooks and system health;
- machine-facing execution logic.

Mind owns:

- personal knowledge and convictions;
- business strategy and decisions;
- active projects and priorities;
- research conclusions;
- durable human context;
- the current human interpretation of what is true and important.

Brain may observe, classify, summarize, compare, and propose changes to Mind. Mind remains the authority for personal and business truth.

## Shared Infinite Brain laws

Brain and Mind should follow the same underlying laws, even though their implementations differ.

### 1. Retrieve selectively

Do not load or review everything when one relevant page or source is enough.

### 2. Preserve provenance

Important claims, conclusions, and decisions should retain links to their source when useful.

### 3. Current truth wins

Stored knowledge is not permanent proof. New evidence may change an earlier conclusion.

### 4. Surface contradictions

Do not silently merge conflicting information. Show the conflict and prepare a reviewed resolution.

### 5. Revalidate changing knowledge

Business strategy, active projects, technical stacks, vendors, pricing, schedules, and procedures can become stale.

### 6. Preserve history without confusing it with current truth

Superseded or completed material should move out of the active layer while remaining available in archive/history.

### 7. Prevent unnecessary duplication

Before creating durable knowledge, check whether an existing page should be updated instead.

### 8. Improve through reviewed use

Each capture, decision, correction, and completed project should have the opportunity to improve future work.

### 9. Human approval governs important truth changes

Automation may detect, prepare, and recommend. It must not silently redefine personal beliefs, business strategy, priorities, or durable conclusions.

### 10. Evidence honesty

Missing evidence remains null, blocked, or insufficient. Missing evidence must not be converted to zero. Configuration and proxies must not be mislabeled as measured outcomes.

### 11. Keep the system calm

The Infinite Brain should feel simpler as it grows, not more complicated.

## Cross-repo consistency

The shared laws above are canonical and must remain word-for-word consistent with `../../brain/operations/specs/infinite-brain-philosophy.md`.

Note: law 10 (Evidence honesty) and law 11 (Keep the system calm) are Mind-side additions that extend the shared chain. Laws 1–9 must stay word-for-word consistent with the Brain counterpart.

If Brain and Mind need different implementation details, keep those differences in repo-specific sections instead of rewriting the shared laws.

## Information lifecycle

Mind uses this lifecycle:

```text
capture
→ classify
→ review
→ place
→ retrieve
→ use
→ revalidate
→ update, supersede, or archive
```

### Capture

New material lands safely in `capture/inbox/` without requiring immediate organization.

### Classify

Mind Steward or a human identifies whether the material is current work, durable knowledge, source evidence, a task, or archive material.

### Review

A human confirms important routing, truth changes, and durable conclusions.

### Place

Information goes to the smallest appropriate destination:

- `live/` for active/current state;
- `wiki/` for durable reviewed knowledge;
- `sources/` for evidence and research material;
- `archive/` for completed, superseded, or historical material.

### Retrieve

Humans should start from `home.md`, `live/dashboard.md`, Obsidian links, and search. AI systems should use Graphify and targeted reads when available.

### Use

Knowledge should improve decisions, work, and future reasoning.

### Revalidate

Changing information should be checked when new evidence appears or when its review date is reached.

### Update, supersede, or archive

Current pages should be updated deliberately. Old versions should be marked superseded or archived when history matters.

## Freshness philosophy

Not all knowledge expires at the same rate.

Frequently changing knowledge may use:

```yaml
status: current | review-needed | superseded | archived
last_reviewed: YYYY-MM-DD
review_after: YYYY-MM-DD
```

Use freshness metadata selectively for:

- active business strategy;
- current projects;
- pricing and offers;
- technical architecture;
- external services and vendors;
- legal or regulatory research;
- operating procedures.

Do not burden timeless notes, convictions, creative ideas, or historical records with unnecessary maintenance fields.

## Self-healing in Mind

Self-healing does not mean autonomous rewriting.

For Mind it means:

```text
automatically notice
→ automatically compare
→ automatically prepare a safe proposal
→ human reviews the truth change
```

The system should help detect:

- stale current-state pages;
- contradictory conclusions;
- duplicate durable notes;
- completed work still shown as active;
- useful insight trapped in raw captures;
- missing source references;
- old material that should be superseded or archived.

## Simplicity boundary

The philosophy should improve the existing shallow structure, not create a new maze of folders.

Physical folder depth is not the same as useful depth. Useful-depth recommendations require navigation, usability, and maintenance evidence. No destructive simplification occurs without human approval.

The preferred top-level model remains:

```text
capture/
live/
wiki/
sources/
archive/
system/
kanban.md
home.md
```

New top-level folders require strong evidence that the existing model cannot express the need clearly.

## Decision rule

Every future Mind change should answer:

```text
Does this make knowledge easier to capture, understand, retrieve, trust, maintain, or improve without making the human experience more complex?
```

If not, it does not belong in Mind.
