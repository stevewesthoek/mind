# Graphify Strategy for the Infinite Brain

This document defines why Graphify matters for the Infinite Brain system and how it should be used across Mind, Brain, and all project/application repositories.

## Repository roles

The repository roles are fixed:

```text
mind  = highest strategy, natural-language memory, business strategy, source of truth for why
brain = machine and execution layer, standards implementation, schedulers, APIs, selectors, console
other repos = consumers: products, applications, codebases, research/project repositories
```

Mind owns the strategic intent. Brain owns the operational standard and implementation. Other repositories consume the standard through small declarative profiles and local generated outputs.

Graphify is not a one-off Mind feature. It is a cross-repo intelligence layer for the whole working system.

Operational boundary: Mind owns Graphify's human purpose, interpretation, and
policy. Brain owns execution, profiles, operational storage, retention,
validation, and machine evidence. Current execution and profile state is
owned by Brain's live-status runbook. Generated output is non-authoritative
and source Markdown remains authoritative.

## Strategic goals

Graphify must serve two primary goals.

### 1. Human sense-making

A human should be able to understand a repository quickly by seeing:

- what files exist;
- how files relate;
- which folders/modules/domains matter;
- which concepts connect different areas;
- why file A is related to file B in natural language.

For Mind specifically, the graph should help Steve understand memory, strategy, sources, captures, wiki knowledge, tasks, and system contracts.

### 2. Cheap AI context

AI systems should be able to understand a repository without repeatedly reading the whole repo.

The standard workflow should be:

```text
read Graphify report
→ query/traverse graph
→ inspect only the relevant files
→ answer or implement with targeted context
```

The goal is high-context reasoning with fewer tokens, less latency, less repeated broad search, and lower cost.

## Strategic principles

### Standardized

Every repository should consume the same Graphify operating standard from Brain.

Do not create custom per-repo Graphify scripts, prompts, or model-routing hacks unless the Brain standard explicitly defines them as profile options.

### Modular

Graphify must remain one module in a larger system.

The responsibilities should stay separate:

```text
Mind strategy                  → why Graphify exists and what it must achieve
Brain Graphify standard        → how Graphify is run and validated
AI Model Selector              → which model/provider/backend is used
Graphify Orchestrator          → runs Graphify through the standard path
Repo profile                   → declares repo-specific mode/profile only
Graphify outputs               → generated report, graph data, visual graph
Human/AI views                 → generated projections from canonical outputs
```

Do not hardcode model choices or fallback logic inside one-off Graphify scripts.

### Upgradeable

Each module must be independently upgradeable.

Changing a model, Graphify version, repo profile, visual renderer, or scheduler should not break unrelated repos or automation.

### Graph-first for AI

AI assistants should not default to broad repo scans when Graphify outputs are available.

Expected AI behavior:

```text
1. read a Graphify receipt and source-hash record before reading generated output;
2. query compatibility outputs only when receipt-bound, treating them as non-authoritative;
3. inspect targeted source files only after graph traversal;
4. cite or describe the graph path used when relevant.
```

### Quality first for canonical builds

The first full semantic graph of a repo is strategic infrastructure. A cheap weak graph can become expensive because later AI decisions depend on bad context.

Initial full semantic builds and critical semantic rebuilds should use the highest-quality approved model path through AI Model Selector.

Incremental updates, code-only AST changes, and routine refreshes may use cheaper/local/update paths when safe.

## Graphify modes

The system needs separate modes because one graph cannot serve every use case equally well.

### Mode 1 — Human File Relationship Mode

Purpose:

```text
Help Steve understand a repo visually and in natural language.
```

Expected nodes:

- files;
- folders/modules/domains;
- important tags/concepts;
- source groups;
- task or workflow surfaces when relevant.

Expected relationship explanations:

- file A links to file B;
- file A imports or calls file B;
- file A shares concepts with file B;
- file A belongs to the same module/workflow/source area;
- file A is referenced by a decision/report/task.

This mode is for human navigation and understanding. It may be a generated projection from canonical Graphify outputs, not necessarily raw Graphify `graph.html`.

### Mode 2 — AI Context Mode

Purpose:

```text
Give AI fast relational context at low token cost.
```

Canonical inputs:

- receipt-bound `runtime/local/graphify/` output;
- compatibility `.graphify-out/` output only when receipt-bound;
- Graphify query/path/explain commands when available;
- repo-local profile metadata.

This mode is optimized for machine traversal, source locations, relation types, confidence, and targeted context retrieval.

### Mode 3 — Code Architecture Mode

Purpose:

```text
Understand application/code repositories.
```

Expected focus:

- modules;
- classes;
- functions;
- imports;
- call flow;
- API routes;
- database/schema relationships;
- infrastructure and runtime boundaries.

This mode should preserve Graphify's code-intelligence strengths. Do not collapse code repos to only high-level files too early if function/class/call-flow structure is important.

### Mode 4 — Knowledge / Research Mode

Purpose:

```text
Understand Mind, research, long-form notes, sources, claims, and strategy.
```

Expected focus:

- concepts;
- claims;
- sources;
- decisions;
- questions;
- wiki areas;
- captures;
- strategy and business context.

Mind uses this mode heavily because Mind is the natural-language memory and strategy repo.

### Mode 5 — Operations / Freshness Mode

Purpose:

```text
Keep graph artifacts fresh, trustworthy, observable, and cheap to update.
```

Expected surfaces:

- latest full build status;
- latest incremental update status;
- model/backend used;
- staleness status;
- refresh report;
- dashboard visibility;
- failed files or skipped files.

## Model-selection strategy

Graphify must consume AI through AI Model Selector where AI is needed.

Do not let Graphify wrappers hardcode providers directly unless the Brain standard defines a temporary adapter and records the reason.

### Initial full semantic build

Preferred quality policy:

```text
1. Codex 5.5 xhigh
2. Opus through Amazon Bedrock as fallback
```

This must be implemented as an AI Model Selector policy or capability, not as fragile script-level branching.

If AI Model Selector does not yet support ordered preferred models/fallback chains, Brain must add that capability in the selector layer first.

### Critical semantic rebuild

Use the same high-quality policy as initial full build.

### Incremental update

Use the Graphify update/hook/watch path only as a future/deferred path when the Brain-owned contained profile explicitly enables it.

Use local or cheaper AI only when the selector policy says quality and safety are sufficient.

### Code-only AST changes

Prefer no premium semantic rebuild when static analysis/update is sufficient.

## Repo profiles

Every repository should declare a small profile that consumes the Brain standard.

Example profiles:

```text
mind-knowledge
brain-runtime
code-app
research
mixed
```

The profile should not implement custom logic. It should only declare which standard mode and outputs apply.

## Canonical outputs

Every Graphify-enabled repo should use the Brain-defined operational root when
the contained runner is available:

```text
runtime/local/graphify/
```

The compatibility roots remain readable only as historical/generated
projections:

```text
graphify-out/
.graphify-out/
```

Neither compatibility root is canonical authority. A report is fresh only
when its Brain receipt and source hashes exist; missing receipt means unknown.

Optional outputs for code repos may include architecture/call-flow views.

## Rollout rule

The rollout order should be:

```text
1. Brain standard
2. AI Model Selector capability verification
3. Brain Graphify Orchestrator
4. Mind profile
5. Brain profile
6. code-app profile template
7. rollout to project/application repos
```

Do not roll out custom Graphify setups repo by repo before the Brain standard exists.

## Decision

Graphify remains strategically important, but the current Mind custom renderer is not the canonical source of truth.

The canonical strategy is:

```text
Mind owns why.
Brain owns how.
AI Model Selector owns model choice.
Graphify Orchestrator owns execution.
Repos declare profiles.
Generated outputs are consumed by humans and AI through standardized modes.
```
