# Infinite Brain Second-Pass Assessment

**Date:** 2026-07-10
**Scope:** Mind and Brain philosophy, strategy, structure, documentation, roadmaps, implementation plans, core Mind integration code, Graphify reports, and cross-repo agent entrypoints
**Change boundary:** documentation only; no application code changed

## Verdict

The two-repo architecture remains correct.

```text
Mind  = human meaning and approved orientation
Brain = machine capability and execution
```

Merging the repos would weaken human readability, privacy boundaries, runtime isolation, and portability. The appropriate improvement is a stronger bridge and one retrieval core, not one repository.

The previous priorities remain valid after cleanup. They were consolidated into exactly seven priorities so ownership and sequencing are unambiguous.

## Improvements confirmed since the first assessment

- `inbox/new/` is now the target active success-intake surface.
- Brain Core's current path model prefers target folders and records retired paths as historical.
- the target human-first Mind structure exists;
- Graphify output is untracked by Git;
- both repos have clean source history for the completed inbox migration;
- the Brain Core typecheck currently passes.

## Remaining gaps

### 1. Active contract drift

The primary Claude, Codex, Gemini, Cursor, Kiro, IDE, and Brain-root startup pointers were corrected during this documentation pass. Active runbooks, integration docs, the separate Mind Steward package, and some scripts/tests still refer to retired Mind paths.

Risk: different LLMs retrieve different context and automations inspect different folders.

Roadmap response: Priority 1 creates one executable contract and a cross-repo conformance check.

### 2. Duplicate Mind Steward implementations

Brain Core contains target-first Mind integration, while `projects/mind-steward` contains a separate legacy contract and classifier. The package currently fails type checking and its classifier hard-codes `capture/inbox`.

Risk: duplicated policy, silent migration regression, and unclear implementation ownership.

Roadmap response: Priority 1 makes the package a thin adapter or retires it after parity tests.

### 3. Unsafe default classification posture

The legacy classifier writes unless dry-run is explicitly selected.

Risk: raw source mutation and mismatch with the documented report-only posture.

Roadmap response: Priority 1 makes report-only the default and requires explicit approved apply behavior.

### 4. No universal retrieval product

Agent instructions and memory maps provide a workable fallback, but every surface must interpret them independently. There is no single vendor-neutral Context Gateway.

Risk: inconsistent source selection, unnecessary context loading, and provider-specific behavior.

Roadmap response: Priority 2 builds a deterministic CLI core with thin adapters.

### 5. Retrieval quality is not measurable

The repos contain bounded maintenance fixtures, but no representative corpus for “does the AI understand Steve?”

Risk: graph, embedding, model, or prompt changes can appear sophisticated while reducing relevance, authority accuracy, or privacy.

Roadmap response: Priority 3 establishes expected/forbidden sources and fixed metrics before semantic expansion.

### 6. Capability status and planning are mixed

Roadmaps, implementation plans, reports, and status docs have historically used words such as implemented, operational, and active at different levels.

Risk: models or operators infer authority that does not exist.

Roadmap response: Priority 4 creates a manifest and one generated live-status source.

### 7. Safe write components exceed proven product scope

Brain includes many proposal, writer, approval, and rollback components, but the verified capability remains narrow.

Risk: code presence may be mistaken for approved general capability.

Roadmap response: Priority 5 binds one proposal type at a time to manifest state, exact approval, idempotency, and fixtures.

### 8. Automation value remains unproven

Safety infrastructure exists, but time saved and review burden have no real operational baseline.

Risk: maintaining automation costs more than manual work.

Roadmap response: Priority 6 permits one bounded pilot and requires a human retain/revise/retire verdict.

### 9. Code and generated-state complexity

- Brain Core has hundreds of TypeScript files and a route dispatcher over 5,000 lines.
- Mind and Brain Graphify reports are stale relative to current commits.
- the Mind graph is dominated by Obsidian plugin internals; the Brain report is too broad and poorly labeled.
- local Graphify history consumes hundreds of megabytes despite being untracked.
- system configs and project directories include large mutable/generated/runtime surfaces.

Risk: slower retrieval, higher context cost, harder reviews, and accidental source/runtime mixing.

Roadmap response: Priority 7 splits modules, fixes graph scope, adds retention, inventories local state, and establishes performance budgets.

### 10. Retrieved-content trust boundary

Captured emails, transcripts, webpages, and documents can contain adversarial instructions. Existing orientation documents did not make the data-versus-instruction boundary explicit enough.

Risk: prompt injection, privacy-scope expansion, unauthorized tool use, or false approval inferred from source content.

Roadmap response: the shared philosophy now treats retrieved content as untrusted data; Priority 2 adds boundary tests before adapters activate.

### 11. Recovery, retention, and deletion proof

Git history and backups are useful but do not prove that Mind and Brain can be restored cleanly or that generated/runtime data is distinguished from canonical data.

Risk: “self-healing” works for queues but fails during real data loss, corruption, device replacement, or approved deletion.

Roadmap response: Priority 7 adds isolated restore drills, retention classes, correction/supersession handling, and deletion boundaries.

## Philosophy gaps added

The revised philosophy now explicitly includes:

- human authority over meaning;
- query-dependent orientation and context budgets;
- knowledge-state separation;
- least-disclosure privacy;
- deterministic-before-model routing;
- bounded autonomy based on reversibility and impact;
- graceful degradation;
- derived-index/graph status;
- provider portability;
- evidence-based automation value;
- calmness and simplicity as design constraints.
- untrusted retrieved-content isolation;
- tested data recovery and retention boundaries.

## Documentation model after this assessment

### Mind

```text
philosophy
→ strategy
→ seven-priority roadmap
→ Mind-owned implementation tasks
→ bridge human policy
```

### Brain

```text
philosophy
→ strategy
→ runtime roadmap projection
→ lower-tier code implementation tasks
→ one live capability status page
```

## Validation evidence

Read-only commands run during assessment:

- repo and active-path inventories with `rg`, `find`, and Git;
- current and latest Graphify report inspection;
- Brain Core typecheck: passed;
- Mind Steward typecheck: failed with TS2412 in `src/cli/classify-captures.ts:25`;
- graph commit comparison: both latest reports were stale on 2026-07-10;
- generated-output tracking check: Graphify output is not tracked.

## Decision

Proceed with the seven priorities in order. Do not merge Mind and Brain. Do not add more semantic automation until Priority 1 coherence and Priority 3 evaluation exist. Do not broaden writes or continuous processing until capability truth, fixtures, and measured value gates pass.
