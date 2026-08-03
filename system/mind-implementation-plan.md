# Mind Implementation Plan

**Status:** canonical Mind-owned execution plan
**Version:** 2.0
**Last reviewed:** 2026-08-03
**Owner role:** Steve Westhoek (human authority); lower-tier models execute
**Depends on:** `system/mind-roadmap.md`
**Conflict rule:** when this plan conflicts with roadmap, strategy, or philosophy, those take precedence in that order. Task-level disputes are resolved by the roadmap's priority sequencing.
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

## Pre-1.0 Architecture Stabilization Coordination

The Brain stabilization program is authoritative for Brain runtime work and is
tracked under `BS0.1`–`BS0.23` in Brain's implementation plan. The tasks below
are Mind-owned coordination tasks only. They do not duplicate Brain tasks or
authorize Brain edits, deployment, automation changes, runtime changes, or
external writes.

### MS0.1 — Establish the authority-precedence matrix

- **Status:** complete; evidence: `system/reports/ms0-1-authority-precedence-matrix-2026-07-14.md`.
- **Ownership:** Mind documentation and policy only.
- **Purpose:** Define precedence among human decisions, Mind canonical documents, scoped domain authorities, compatibility exceptions, Brain contracts, and Brain live status.
- **Exact outcome:** A dated matrix names one owner, precedence, evidence source, and conflict rule for each authority class.
- **Prerequisites:** None; may proceed independently.
- **Existing M-task dependency:** Informs M1.3 classification; does not start M1.4 or M1.5.
- **Minimum verification:** Every class has one owner, one precedence rule, and one unresolved-conflict handling rule.
- **Stop conditions:** Two authorities claim the same concern without an explicit scope or human decision.
- **Evidence:** Create a dated Mind planning/evidence report with the matrix and unresolved conflicts.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.2 — Resolve ProChat strategy authority

- **Status:** complete; explicit human decision recorded in `system/reports/ms0-2-prochat-strategy-authority-decision-request-2026-07-14.md`.
- **Ownership:** Mind product and documentation authority only.
- **Purpose:** Resolve the missing `prochat-os-strategy.md` reference without inventing a replacement.
- **Exact outcome:** An explicit human authority selection, or an explicit decision to retire the missing concept, is recorded with affected references.
- **Prerequisites:** Human authority selection; no automatic inference is permitted.
- **Existing M-task dependency:** Uses M1.3 findings; M1.5 remains deferred.
- **Minimum verification:** All active references to the missing strategy are classified as resolved, retained compatibility, historical, or blocked.
- **Stop conditions:** No explicit human selection, competing strategy scopes remain, or the proposed replacement changes product meaning.
- **Evidence:** Create or append a dated Mind evidence report recording the decision and rejected candidates.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.3 — Resolve dashboard authority roles

- **Status:** complete; evidence: `system/reports/ms0-3-dashboard-authority-roles-2026-07-14.md`.
- **Ownership:** Mind human-facing documentation roles only.
- **Purpose:** Distinguish human navigation, Markdown reporting, and Brain runtime status without claiming runtime authority in Mind.
- **Exact outcome:** `home.md`, `system/reports/dashboard.md`, `live/`, and Brain Console each have an explicit role or are explicitly retired.
- **Prerequisites:** Review existing Mind dashboard and fallback surfaces; Brain live status remains authoritative for runtime facts.
- **Existing M-task dependency:** May continue independently of M1.4; M1.3 must stop if it encounters unresolved dashboard authority.
- **Minimum verification:** No Mind document presents a non-Brain surface as authoritative runtime status.
- **Stop conditions:** A role decision would require claiming deployed, observed, or verified runtime state.
- **Evidence:** Create a dated Mind evidence report with the role matrix and unresolved references.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.4 — Resolve Graphify human-facing authority and path terminology

- **Status:** complete; evidence: `system/reports/ms0-4-graphify-authority-terminology-2026-07-14.md`.
- **Ownership:** Mind documentation terminology only; Brain owns operational Graphify truth.
- **Purpose:** Align human-facing references with the operational Graphify contract without making generated output authoritative.
- **Exact outcome:** Mind documents use one approved human-facing terminology and distinguish operational `graphify-out/` from non-authoritative generated artifacts.
- **Prerequisites:** Brain `BS0.15` operational Graphify containment and capacity-bound truth.
- **Existing M-task dependency:** M1.3 remains independently continuable only for references not dependent on this decision; M7.1 remains deferred as applicable.
- **Minimum verification:** No active Mind document treats generated Graphify output as authority or names competing active output paths.
- **Stop conditions:** BS0.15 has not established the operational path/profile, or the proposed terminology changes runtime behavior.
- **Evidence:** Create a dated Mind evidence report linked to the Brain BS0.15 evidence.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.5 — Record compatibility-authoritative exceptions

- **Status:** complete; evidence: `system/reports/ms0-5-compatibility-authoritative-exceptions-2026-07-14.md`.
- **Ownership:** Mind folder and documentation policy only.
- **Purpose:** Record explicit exceptions where a legacy path remains authoritative for a bounded domain, including ProChat brand/playbooks/YouTube and personal identity where applicable.
- **Exact outcome:** Each exception has scope, owner, reason, replacement condition, and deletion prohibition until proof.
- **Prerequisites:** MS0.1.
- **Existing M-task dependency:** Constrains M1.3; does not authorize M1.4 or M1.5.
- **Minimum verification:** Every retained legacy path is either explicitly exception-authoritative, compatibility-only, or historical-only.
- **Stop conditions:** A path has active authority but no bounded scope or replacement condition.
- **Evidence:** Create a dated Mind evidence report containing the exception register.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.6 — Rebaseline the maintenance pilot authority dataset

- **Status:** complete; evidence: `system/reports/ms0-6-maintenance-pilot-authority-rebaseline-2026-07-14.md`.
- **Ownership:** Mind maintenance evidence and fixture policy only.
- **Purpose:** Remove unresolved or obsolete authority assumptions from the maintenance pilot dataset without changing runtime behavior.
- **Exact outcome:** The fixture distinguishes verified replacements, compatibility exceptions, historical evidence, and blocked authority decisions.
- **Prerequisites:** MS0.2 and MS0.3.
- **Existing M-task dependency:** M1.3 findings informed this completed rebaseline; M1.4 later resolved by retaining `kanban.md` authority.
- **Minimum verification:** The fixture contains no unclassified missing ProChat strategy or dashboard authority and no claim of live deployment.
- **Stop conditions:** MS0.2 or MS0.3 remains unresolved, or the fixture would encode a runtime claim owned by Brain.
- **Evidence:** Create a dated Mind maintenance-fixture evidence report with before/after classifications.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.7 — Align Mind status documents with Brain-generated capability truth

- **Status:** complete; evidence: `system/reports/ms0-7-capability-truth-alignment-2026-07-14.md`.
- **Ownership:** Mind status-document wording only.
- **Purpose:** Remove duplicated runtime and capability claims from Mind while preserving Mind's human/product acceptance criteria.
- **Exact outcome:** Mind status documents link to Brain evidence for capability state and clearly distinguish repository, deployed, observed, and verified state.
- **Prerequisites:** Brain `BS0.11`, `BS0.12`, and `BS0.13`.
- **Existing M-task dependency:** Prepares M4.1; does not reopen M1.1 or change M1.2.
- **Minimum verification:** Focused scan finds no unsupported Mind claim of active deployment, scheduler truth, schema implementation, or capability verification.
- **Stop conditions:** Brain evidence is absent, stale, or contradictory; retain the claim as unresolved rather than rewriting it as true.
- **Evidence:** Create a dated Mind status-alignment report citing exact Brain evidence sources.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.8 — Complete M1.3 after Brain runtime dependencies are resolved

- **Status:** complete (2026-07-31).
- **Ownership:** Mind documentation cleanup only.
- **Purpose:** Finish M1.3 after runtime-dependent authority decisions are stable.
- **Exact outcome:** Active Markdown references are cleaned or explicitly classified, with no unsupported replacement invented.
- **Prerequisites:** Brain B1.0a and BS0.15 completion, implemented Context Pack and Context Gateway contracts, and resolved Mind authority decisions.
- **Existing M-task dependency:** M1.3 is complete; M1.4 is complete through the retained-`kanban.md` authority decision.
- **Minimum verification:** Re-run the saved pre/post reference scan, classify every remaining active legacy path, and preserve historical evidence.
- **Stop conditions:** Runtime, deployment, Graphify, task-authority, dashboard-authority, ProChat-strategy, or maintenance-contract decisions remain unresolved.
- **Evidence:** `system/reports/m1-3-m1-4-closure-2026-07-31.md`.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.9 — Prepare M1.4 task-authority migration gate

- **Status:** complete (2026-07-31).
- **Ownership:** Mind task-authority policy and evidence only.
- **Purpose:** Prepare the lossless migration gate without migrating task content.
- **Exact outcome:** The gate defines current authority, compatibility/generated status, synchronization proof, rollback evidence, and human approval requirements.
- **Prerequisites:** M1.3 completion and stable runtime/task behavior.
- **Existing M-task dependency:** M1.4 is complete by applying the gate's fail-closed result: retain `kanban.md` authority because lossless synchronization is not proven.
- **Minimum verification:** A deliberately divergent fixture fails; an equivalent fixture passes; no live task content is moved.
- **Stop conditions:** Lossless synchronization or runtime/task behavior is not proven; this condition requires retaining current authority rather than switching it.
- **Evidence:** `system/reports/ms0-9-task-authority-migration-gate-2026-07-14.md` and `system/reports/m1-3-m1-4-closure-2026-07-31.md`.
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

### MS0.10 — Prepare M1.5 authority-header normalization

- **Status:** complete (2026-07-31).
- **Ownership:** Mind documentation headers and ownership metadata only.
- **Purpose:** Prepare, but do not execute, consistent authority headers after ownership decisions stabilize.
- **Exact outcome:** A file-by-file header checklist identifies owner, status, version, dependencies, and conflict handling without changing documents yet.
- **Prerequisites:** MS0.1, M1.4 readiness, and stable ownership decisions.
- **Existing M-task dependency:** M1.5 execution authorized and completed in this session.
- **Minimum verification:** Checklist detects duplicate ownership and missing required fields without modifying files.
- **Stop conditions:** Two documents still claim the same concern, or M1.4 is not ready.
- **Evidence:** `system/reports/ms0-10-authority-header-preparation-2026-07-31.md`
- **Authorization boundary:** No Brain edit, deployment, automation change, runtime change, or external write is authorized.

## Priority 1 — Canonical coherence and migration closure

### M1.1 — Align agent-context status

- **Status:** complete (2026-07-10). Evidence: [M1.1 completion report](reports/m1-1-agent-context-status-2026-07-10.md).
- **Files:** `system/agent-context/AGENTS.md`, `00-start-here.md`, `00-current-context.md`, `00-memory-map.md`, `current.md`, `map.md`
- **Change:** replace active success-intake references with `inbox/new/`; replace active failure-intake references with the verified current path; mark legacy paths historical only; use target folder names.
- **Verify:** `rg -n 'capture/inbox|capture/failed|router/' system/agent-context` returns only explicitly labeled historical references.
- **Stop if:** Brain's active failure path is not verified.

### M1.2 — Align the folder and bridge contracts

- **Status:** complete (2026-07-31). Brain Context Pack 1.0, Context Gateway B2.1–B2.8, and guarded live intake routing are implemented and evidenced; `system/folder-contract.md` and `system/brain-mind-bridge.md` now reflect the verified boundaries.
- **Files:** `system/folder-contract.md`, `system/brain-mind-bridge.md`
- **Change:** make the folder contract authoritative for current paths; make the bridge reference the Brain schema version and Context Gateway contract; remove target/legacy ambiguity for completed migrations.
- **Verify:** every current path in the bridge exists; `rg -n 'guidance only|future target|legacy fallback'` is reviewed line by line.
- **Stop if:** a path migration is incomplete.

### M1.3 — Clean active Mind documentation paths

- **Status:** complete (2026-07-31). Evidence: `system/reports/m1-3-m1-4-closure-2026-07-31.md`; prior findings remain historical evidence in the 2026-07-12 and 2026-07-14 reports.
- **Scope:** all tracked Markdown except `history/`, `archive/`, `system/reports/`, and explicitly historical sections.
- **Change:** update stale active path references; label retained examples as historical fixtures.
- **Verify:** save the exact `rg` command and output count before and after; no unexplained active old-path match remains.
- **Stop if:** a path is used by active automation; create a finding for Brain task B1.1 instead.

### M1.4 — Decide the task compatibility boundary

- **Status:** complete (2026-07-31). Decision: retain `kanban.md` as sole human task authority; `tasks.md` is retired and non-authoritative. Evidence: `system/reports/m1-3-m1-4-closure-2026-07-31.md`.
- **Files:** `system/task-kanban-contract.md`, `system/folder-contract.md`, `tasks.md`, `kanban.md`
- **Change:** record whether `tasks.md` or `kanban.md` is current authority; name the other surface as generated, compatibility, or retired; do not migrate task content in this task.
- **Verify:** both files and all agent-context docs state the same authority.
- **Stop if:** lossless task synchronization has not been validated; retain the current authority.

### M1.5 — Add documentation authority headers

- **Status:** complete (2026-07-31). Evidence: `system/reports/ms0-10-authority-header-preparation-2026-07-31.md` (preparation) and `system/reports/documentation-consistency-2026-07-31.md` (audit).
- **Files:** canonical philosophy, strategy, roadmap, implementation plan, bridge, folder contract
- **Change:** ensure each file declares status, version, last review date, owner role, and canonical dependencies.
- **Verify:** a simple heading/frontmatter scan finds all required fields.
- **Stop if:** two files claim ownership of the same concern; resolve ownership before editing content.

### M1.6 — Close the Priority 1 exit gate

- **Status:** complete (2026-08-03).
- **Ownership:** Mind documentation and evidence only.
- **Purpose:** Reconcile the post-consolidation path gate and package disposition to satisfy all Priority 1 outcomes.
- **Prerequisites:** M1.1–M1.5 complete; Brain BS0.10 (legacy producer retirement) complete; Brain BS0.19 (deletion-readiness evaluation) complete; Brain B1.5 (package-boundary resolution) complete.
- **Outcome:** Steve Westhoek selected Option A — retain. Mind Steward remains a separate Brain-owned local deterministic/report-only package with documented boundary separation and canonical shared path policy.
- **Verification:** exact active-path scan found zero active defects; all configured agent entrypoints route through `system/agent-context/`; Brain B1.5 defines the retained package boundary; Brain BS0.8 migrates Mind Steward to the canonical Brain path registry; Brain BS0.9 applies the same registry to Brain Core consumers.
- **Evidence:** `system/reports/priority-1-exit-gate-reconciliation-2026-08-02.md`; `system/reports/priority-1-mind-steward-disposition-decision-2026-08-02.md`; Brain `operations/reports/b1-5-mind-steward-package-boundary-2026-07-14.md`; Brain `operations/reports/bs0-8-mind-steward-path-registry-migration-2026-07-14.md`; Brain `operations/reports/bs0-9-brain-core-path-consumer-migration-2026-07-14.md`.
- **Result:** Priority 1 exit gate satisfied. No Brain package migration, retirement, deployment, scheduling, continuous execution, production write, deletion, or automation activation occurred.
- **Authorization boundary:** no Brain edit; no package migration or retirement; no deletion; no automation activation.

## Priority 2 — Context Gateway policy and fixtures

### M2.1 — Finalize the context-pack human policy

- **Status:** complete (2026-07-31). Evidence: `system/reports/m2-context-policy-fixtures-2026-07-31.md`.
- **File:** `system/brain-mind-bridge.md`
- **Change:** document required context-pack fields, allowed authority labels, privacy scopes, freshness states, conflict handling, and citation rules.
- **Verify:** compare the field list with Brain's JSON Schema; names and version match exactly.
- **Stop if:** the Brain schema does not yet exist; mark the section `proposed` and do not claim implementation.

### M2.2 — Create privacy-scope guidance

- **Status:** complete (2026-07-31). Evidence: `system/reports/m2-context-policy-fixtures-2026-07-31.md`.
- **File:** `system/context-privacy-scopes.md`
- **Change:** define `personal`, `business`, `ministry`, `project:<id>`, `organization:<id>`, and `public-safe`; give allowed and excluded examples for each.
- **Verify:** every scope has purpose, default exclusions, and escalation rule.
- **Stop if:** the guidance would expose credentials or private third-party data; record the exclusion instead.

### M2.3 — Create authority examples

- **Status:** complete (2026-07-31). Evidence: `system/reports/m2-context-policy-fixtures-2026-07-31.md`.
- **File:** `system/context-authority-examples.md`
- **Change:** add ten small examples covering human decision vs capture, canonical strategy vs research, current vs superseded, conflicting sources, and missing evidence.
- **Verify:** every example names expected authority, selected source, excluded source, and explanation.
- **Stop if:** an example requires deciding a real unresolved belief or strategy; use a synthetic example.

### M2.4 — Update agent entrypoints after Gateway activation

- **Status:** blocked — Gateway adapter activation not confirmed by Brain live evidence. All capability-table entries for context-gateway-* show `deployed: unknown`.
- **Files:** `system/agent-context/AGENTS.md`, `00-start-here.md`, `00-memory-map.md`
- **Prerequisite:** Brain task B2.8 passes AND Gateway adapter deployment is verified (currently `deployed: unknown` per Brain live-status 2026-07-31).
- **Change:** make Context Gateway the preferred retrieval path; retain the manual targeted-read fallback.
- **Verify:** instructions work both with and without Brain running.
- **Stop if:** Gateway health or fallback tests fail.

## Priority 3 — Retrieval evaluation and ground truth

### M3.1 — Create the question corpus

- **Status:** complete (2026-07-31). Evidence: `system/reports/m3-1-question-corpus-2026-07-31.md`.
- **File:** `system/evals/context-questions.yaml`
- **Change:** add 30 real-shaped questions: 5 personal, 5 ProChat, 5 Yeshua Academy, 5 faith/theology, 5 active-project, and 5 AI-system boundary questions.
- **Verify:** each question has a stable ID, query, allowed scope, and risk class.
- **Stop if:** a question would store sensitive content in a fixture; use a redacted formulation.

### M3.2 — Label expected and forbidden sources

- **Status:** complete (2026-08-01). Evidence: `system/reports/m3-2-source-expectations-2026-07-31.md`.
- **File:** `system/evals/context-expectations.yaml`
- **Change:** for every question ID, list required sources, acceptable alternatives, forbidden sources, authority expectation, freshness expectation, and expected unknowns.
- **Verify:** every question has one expectation record; every listed file exists or is marked intentionally missing.
- **Stop if:** the correct source is disputed; mark the case `human-review-required`.

### M3.3 — Add privacy and contradiction cases

- **Status:** complete (2026-08-01). Evidence: `system/reports/m3-3-adversarial-context-cases-2026-08-01.md`.
- **Files:** the two evaluation YAML files
- **Change:** add at least five least-disclosure cases, five contradiction/supersession cases, and five source prompt-injection/data-poisoning cases.
- **Verify:** each privacy case names content that must not appear; each contradiction case names both competing sources; each injection case proves source text cannot change scope, permissions, or requested action.
- **Stop if:** evaluation output would reproduce secret values; assert path/category exclusion instead.

### M3.4 — Record the manual baseline

- **Status:** complete (2026-08-01). Evidence: `system/evals/manual-baseline-2026-07.md`.
- **File:** `system/evals/manual-baseline-2026-07.md`
- **Change:** manually follow the current memory map for ten representative questions; record sources opened, time taken, and context size estimate.
- **Verify:** all ten runs have the same fields and no invented precision metrics.
- **Stop if:** the correct answer cannot be established; record `insufficient-evidence`.

## Priority 4 — Capability truth and observability

### M4.1 — Remove duplicate runtime-status claims

- **Status:** complete (2026-08-01). Evidence: `system/reports/m4-1-capability-truth-audit-2026-08-01.md`.
- **Scope:** active Mind canonical docs
- **Change:** replace detailed runtime status claims with links to Brain's status page; retain only Mind's human/product acceptance state.
- **Verify:** `rg -n 'implemented|active|deployed|operational' system/*.md` is reviewed; every machine-capability claim cites Brain status.
- **Stop if:** a claim is historical evidence; move or retain it under `system/reports/` with a date.

### M4.2 — Add a compact system-status link

- **Status:** complete (2026-08-01). Evidence: `system/reports/m4-2-system-status-link-verification-2026-08-01.md`.
- **Files:** `home.md`, `system/README.md`
- **Change:** link to the Brain live-status page and explain that it is authoritative for machine capability.
- **Verify:** link resolves and no second live capability table is added to Mind.
- **Stop if:** the status page is not yet canonical; wait for Brain task B4.4.

## Priority 5 — Controlled proposal application

### M5.1 — Select the first real proposal type

- **Status:** complete (2026-07-31). Evidence: `system/approved-write-pilot.md` and `system/reports/m5-controlled-write-pilot-verification-2026-07-31.md`.
- **File:** `system/approved-write-pilot.md`
- **Change:** choose one low-risk proposal type; name exact allowed target pattern, forbidden paths, required evidence, approval owner, and rollback expectation.
- **Recommended first type:** one frontmatter freshness update on one explicitly approved file.
- **Verify:** the pilot cannot authorize content, task, strategy, belief, archive, or external-action changes.
- **Stop if:** the proposed type changes meaning rather than metadata.

### M5.2 — Create before/after fixtures

- **Status:** complete (2026-07-31). Evidence: `system/evals/write-pilot/` and `system/reports/m5-controlled-write-pilot-verification-2026-07-31.md`.
- **Folder:** `system/evals/write-pilot/`
- **Change:** create synthetic before, approved proposal, expected after, and expected rollback fixtures.
- **Verify:** fixtures contain no personal production content and use exact paths/hashes required by the bridge schema.
- **Stop if:** Brain schema validation fails.

### M5.3 — Write the human review checklist

- **Status:** complete (2026-07-31). Evidence: `system/runbooks/review-approved-mind-write.md` and `system/reports/m5-controlled-write-pilot-verification-2026-07-31.md`.
- **File:** `system/runbooks/review-approved-mind-write.md`
- **Change:** document preview, evidence, scope, before hash, expiry, rollback, post-write verification, and receipt checks.
- **Verify:** a reviewer can complete it without reading Brain source code.
- **Stop if:** any step says “use judgment” without naming the evidence to inspect.

### Priority 5 cross-repo closure

- **Status:** complete (2026-08-01). Brain B5.4 complete (2026-07-31); Mind M5.1–M5.3 complete (2026-07-31).
- **Brain evidence:** `/Users/Office/Repos/stevewesthoek/brain/operations/reports/b5-4-controlled-write-pilot-2026-07-31.md`
- **Reconciliation report:** `system/reports/priority-5-controlled-application-reconciliation-2026-08-01.md`
- **Scope note:** pilot is synthetic and fixture-only; no production writes, batch writes, broader proposal types, scheduler authorization, or continuous operation are authorized.

## Priority 6 — Measured automation pilots

### M6.1 — Select one pilot

- **Status:** complete (2026-08-01). Evidence: `system/automation-pilot.md`.
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
