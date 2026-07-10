# Mind Implementation Plan

**Status:** canonical Mind-owned execution plan
**Version:** 2.0
**Last reviewed:** 2026-07-10
**Roadmap:** `system/mind-roadmap.md`
**Brain code plan:** `/Users/Office/Repos/stevewesthoek/brain/operations/specs/infinite-brain-runtime-implementation-plan.md`

## Purpose

This plan contains only Mind-owned documentation, data, fixture, and human-validation work. Brain code work belongs in Brain's implementation plan.

## Lower-tier execution contract

Execute one task per change. Do not combine tasks.

For every task:

1. Read the listed files.
2. Make only the described change.
3. Run the listed verification.
4. Stop if a prerequisite is missing, a path is ambiguous, or verification fails.
5. Report files changed, commands run, and unresolved findings.

Do not move, delete, or rewrite personal truth unless the task explicitly names the exact file and approval.

## Priority 1 — Canonical coherence and migration closure

### M1.1 — Align agent-context status

- **Files:** `system/agent-context/AGENTS.md`, `00-start-here.md`, `00-current-context.md`, `00-memory-map.md`, `current.md`, `map.md`
- **Change:** replace active success-intake references with `inbox/new/`; replace active failure-intake references with the verified current path; mark legacy paths historical only; use target folder names.
- **Verify:** `rg -n 'capture/inbox|capture/failed|router/' system/agent-context` returns only explicitly labeled historical references.
- **Stop if:** Brain's active failure path is not verified.

### M1.2 — Align the folder and bridge contracts

- **Files:** `system/folder-contract.md`, `system/brain-mind-bridge.md`
- **Change:** make the folder contract authoritative for current paths; make the bridge reference the Brain schema version and Context Gateway contract; remove target/legacy ambiguity for completed migrations.
- **Verify:** every current path in the bridge exists; `rg -n 'guidance only|future target|legacy fallback'` is reviewed line by line.
- **Stop if:** a path migration is incomplete.

### M1.3 — Clean active Mind documentation paths

- **Scope:** all tracked Markdown except `history/`, `archive/`, `system/reports/`, and explicitly historical sections.
- **Change:** update stale active path references; label retained examples as historical fixtures.
- **Verify:** save the exact `rg` command and output count before and after; no unexplained active old-path match remains.
- **Stop if:** a path is used by active automation; create a finding for Brain task B1.1 instead.

### M1.4 — Decide the task compatibility boundary

- **Files:** `system/task-kanban-contract.md`, `system/folder-contract.md`, `tasks.md`, `kanban.md`
- **Change:** record whether `tasks.md` or `kanban.md` is current authority; name the other surface as generated, compatibility, or retired; do not migrate task content in this task.
- **Verify:** both files and all agent-context docs state the same authority.
- **Stop if:** lossless task synchronization has not been validated; retain the current authority.

### M1.5 — Add documentation authority headers

- **Files:** canonical philosophy, strategy, roadmap, implementation plan, bridge, folder contract
- **Change:** ensure each file declares status, version, last review date, owner role, and canonical dependencies.
- **Verify:** a simple heading/frontmatter scan finds all required fields.
- **Stop if:** two files claim ownership of the same concern; resolve ownership before editing content.

## Priority 2 — Context Gateway policy and fixtures

### M2.1 — Finalize the context-pack human policy

- **File:** `system/brain-mind-bridge.md`
- **Change:** document required context-pack fields, allowed authority labels, privacy scopes, freshness states, conflict handling, and citation rules.
- **Verify:** compare the field list with Brain's JSON Schema; names and version match exactly.
- **Stop if:** the Brain schema does not yet exist; mark the section `proposed` and do not claim implementation.

### M2.2 — Create privacy-scope guidance

- **File:** `system/context-privacy-scopes.md`
- **Change:** define `personal`, `business`, `ministry`, `project:<id>`, `organization:<id>`, and `public-safe`; give allowed and excluded examples for each.
- **Verify:** every scope has purpose, default exclusions, and escalation rule.
- **Stop if:** the guidance would expose credentials or private third-party data; record the exclusion instead.

### M2.3 — Create authority examples

- **File:** `system/context-authority-examples.md`
- **Change:** add ten small examples covering human decision vs capture, canonical strategy vs research, current vs superseded, conflicting sources, and missing evidence.
- **Verify:** every example names expected authority, selected source, excluded source, and explanation.
- **Stop if:** an example requires deciding a real unresolved belief or strategy; use a synthetic example.

### M2.4 — Update agent entrypoints after Gateway activation

- **Files:** `system/agent-context/AGENTS.md`, `00-start-here.md`, `00-memory-map.md`
- **Prerequisite:** Brain task B2.8 passes.
- **Change:** make Context Gateway the preferred retrieval path; retain the manual targeted-read fallback.
- **Verify:** instructions work both with and without Brain running.
- **Stop if:** Gateway health or fallback tests fail.

## Priority 3 — Retrieval evaluation and ground truth

### M3.1 — Create the question corpus

- **File:** `system/evals/context-questions.yaml`
- **Change:** add 30 real-shaped questions: 5 personal, 5 ProChat, 5 Yeshua Academy, 5 faith/theology, 5 active-project, and 5 AI-system boundary questions.
- **Verify:** each question has a stable ID, query, allowed scope, and risk class.
- **Stop if:** a question would store sensitive content in a fixture; use a redacted formulation.

### M3.2 — Label expected and forbidden sources

- **File:** `system/evals/context-expectations.yaml`
- **Change:** for every question ID, list required sources, acceptable alternatives, forbidden sources, authority expectation, freshness expectation, and expected unknowns.
- **Verify:** every question has one expectation record; every listed file exists or is marked intentionally missing.
- **Stop if:** the correct source is disputed; mark the case `human-review-required`.

### M3.3 — Add privacy and contradiction cases

- **Files:** the two evaluation YAML files
- **Change:** add at least five least-disclosure cases, five contradiction/supersession cases, and five source prompt-injection/data-poisoning cases.
- **Verify:** each privacy case names content that must not appear; each contradiction case names both competing sources; each injection case proves source text cannot change scope, permissions, or requested action.
- **Stop if:** evaluation output would reproduce secret values; assert path/category exclusion instead.

### M3.4 — Record the manual baseline

- **File:** `system/evals/manual-baseline-2026-07.md`
- **Change:** manually follow the current memory map for ten representative questions; record sources opened, time taken, and context size estimate.
- **Verify:** all ten runs have the same fields and no invented precision metrics.
- **Stop if:** the correct answer cannot be established; record `insufficient-evidence`.

## Priority 4 — Capability truth and observability

### M4.1 — Remove duplicate runtime-status claims

- **Scope:** active Mind canonical docs
- **Change:** replace detailed runtime status claims with links to Brain's status page; retain only Mind's human/product acceptance state.
- **Verify:** `rg -n 'implemented|active|deployed|operational' system/*.md` is reviewed; every machine-capability claim cites Brain status.
- **Stop if:** a claim is historical evidence; move or retain it under `system/reports/` with a date.

### M4.2 — Add a compact system-status link

- **Files:** `home.md`, `system/README.md`
- **Change:** link to the Brain live-status page and explain that it is authoritative for machine capability.
- **Verify:** link resolves and no second live capability table is added to Mind.
- **Stop if:** the status page is not yet canonical; wait for Brain task B4.4.

## Priority 5 — Controlled proposal application

### M5.1 — Select the first real proposal type

- **File:** `system/approved-write-pilot.md`
- **Change:** choose one low-risk proposal type; name exact allowed target pattern, forbidden paths, required evidence, approval owner, and rollback expectation.
- **Recommended first type:** one frontmatter freshness update on one explicitly approved file.
- **Verify:** the pilot cannot authorize content, task, strategy, belief, archive, or external-action changes.
- **Stop if:** the proposed type changes meaning rather than metadata.

### M5.2 — Create before/after fixtures

- **Folder:** `system/evals/write-pilot/`
- **Change:** create synthetic before, approved proposal, expected after, and expected rollback fixtures.
- **Verify:** fixtures contain no personal production content and use exact paths/hashes required by the bridge schema.
- **Stop if:** Brain schema validation fails.

### M5.3 — Write the human review checklist

- **File:** `system/runbooks/review-approved-mind-write.md`
- **Change:** document preview, evidence, scope, before hash, expiry, rollback, post-write verification, and receipt checks.
- **Verify:** a reviewer can complete it without reading Brain source code.
- **Stop if:** any step says “use judgment” without naming the evidence to inspect.

## Priority 6 — Measured automation pilots

### M6.1 — Select one pilot

- **File:** `system/automation-pilot.md`
- **Change:** choose one report-only pilot and record owner, duration, sample size, baseline, metrics, kill conditions, and verdict date.
- **Recommended:** Context Gateway retrieval for one recurring project workflow.
- **Verify:** only one pilot is active.
- **Stop if:** Priority 3 baseline is incomplete.

### M6.2 — Record human review burden

- **File:** `system/evals/automation-pilot-observations.csv`
- **Change:** record run ID, useful/not useful, correction minutes, false-positive count, missing-context count, and notes.
- **Verify:** missing observations are blank, not zero.
- **Stop if:** collection would require always-on personal monitoring; use bounded manual sampling.

### M6.3 — Record the verdict

- **File:** `system/automation-pilot.md`
- **Change:** append `retain`, `revise`, or `retire` with evidence and next action.
- **Verify:** verdict cites baseline and observed results.
- **Stop if:** evidence is insufficient; verdict must be `insufficient-evidence`, not retain.

## Priority 7 — System simplification and performance

### M7.1 — Refresh the Mind graph with a bounded profile

- **Files:** `.graphifyignore`, Graphify profile documentation
- **Change:** exclude `.obsidian/plugins`, generated output, history, archive, vendor code, and unrelated binaries; include current high-signal Markdown and Mind-owned scripts only.
- **Verify:** fresh report no longer lists Obsidian plugin internals as core Mind modules; graph commit equals current HEAD.
- **Stop if:** the profile excludes canonical Mind content; adjust before accepting.

### M7.2 — Define generated-output retention

- **File:** `system/generated-output-policy.md`
- **Change:** set retention for Graphify snapshots, caches, generated reports, and convenience artifacts; identify canonical source vs disposable output.
- **Verify:** policy contains location, owner, retention, regeneration command, and Git tracking rule for each artifact type.
- **Stop if:** an artifact is required for audit or recovery; retain a bounded deliberate copy.

### M7.3 — Run a documentation consistency audit

- **Output:** `system/reports/documentation-consistency-YYYY-MM-DD.md`
- **Change:** check broken links, duplicate authority, stale paths, unsupported capability claims, missing review dates, and orphan canonical docs.
- **Verify:** report includes exact searches and counts; findings become separate tasks, not immediate bulk rewrites.
- **Stop if:** the audit touches historical archives; report without editing them.

### M7.4 — Set Mind performance budgets

- **File:** `system/mind-performance-budgets.md`
- **Change:** define budgets for startup context files, manual navigation depth, generated storage, Context Gateway tokens, and retrieval latency.
- **Verify:** every budget has measurement command/method and review date.
- **Stop if:** no baseline exists; record a provisional budget and a baseline task.

### M7.5 — Define and test Mind recovery and retention

- **Files:** `system/mind-data-recovery.md`, existing backup/runbook references
- **Change:** document canonical Git/backup sources, restore order, verification hashes, retention classes, correction/supersession behavior, and exact human-approved deletion handling.
- **Verify:** perform a restore drill into a temporary directory and confirm canonical entrypoints plus a bounded sample of source files match expected hashes.
- **Stop if:** the drill would overwrite the live vault or expose secrets; use an isolated temporary destination.

## Completion checklist

- [ ] Priority 1 path and authority coherence passes.
- [ ] Context Gateway policy and fallback are documented.
- [ ] Evaluation corpus and manual baseline exist.
- [ ] Mind contains no duplicate live capability status.
- [ ] First write pilot fixtures and review checklist pass.
- [ ] One automation pilot has an evidence-backed verdict.
- [ ] Graph, generated output, docs, and performance budgets are bounded.
- [ ] Mind remains fully useful without Brain or a model provider.
