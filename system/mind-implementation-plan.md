# Mind Implementation Plan

**Status:** canonical implementation plan  
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/mind-roadmap.md`  
**Purpose:** convert the Mind roadmap into concrete, reviewable work while preserving the human-first vault.

## Operating rules

1. Implement one small phase or slice at a time.
2. Read the relevant contracts before changing files or automation.
3. Prefer documentation and report-only behavior before writes.
4. Keep the current folder structure unless evidence proves a change is needed.
5. Preserve `kanban.md` as task source of truth until lossless sync is validated.
6. Keep automation implementation in Brain; keep human truth and destination contracts in Mind.
7. Use exact-path, reviewable changes.
8. Validate human readability after every structural change.
9. Stop if the proposed change increases folder depth or maintenance burden without measurable value.

## Phase 0 — Canonical documentation

**Goal:** establish the source-of-truth chain before implementation.

### Tasks

- [x] Create `system/infinite-brain-philosophy.md`.
- [x] Create `system/mind-strategy.md`.
- [x] Create `system/mind-roadmap.md`.
- [x] Create `system/mind-implementation-plan.md`.
- [x] Add the canonical chain to `system/README.md`.
- [x] Add a short philosophy/strategy link section to `home.md`.
- [x] Mark `system/automation-roadmap.md` as a subordinate automation track.
- [x] Review all four documents for duplicated or conflicting rules (evidence: direct comparison of `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/mind-roadmap.md`, and `system/mind-implementation-plan.md`; no conflicting rules or phase-order conflicts found).

### Acceptance criteria

- one clear chain exists: philosophy → strategy → roadmap → implementation plan;
- existing contracts remain factual and linked;
- no content folders are moved or renamed;
- no automation behavior changes.

### Historical note

Phase 0 documentation review was completed. Later implementation phases added persistent queue state, approval-gated execution surfaces, scheduler planning and gates, and optional continuous-processing safety capabilities. Active continuous execution and demonstrated operational value remain post-plan validation concerns.

## Phase 1 — Human orientation

**Goal:** make the current Mind system understandable from one page.

### Tasks

- [x] Review `home.md` against the actual current system (evidence: reviewed and corrected against `system/README.md` and `live/dashboard.md`; automatic-write claims removed from `home.md`).
- [x] Keep `home.md` concise enough to function as a human user manual (evidence: full-file review completed; stale memory claims and duplicated technical detail removed; `home.md` reduced from 5,364 to 3,603 bytes).
- [x] Add a compact lifecycle (evidence: `home.md`, “How information moves”):
  `capture → review → place → use → revalidate → supersede/archive`.
- [x] Explain the difference between (evidence: `home.md`, “Current, durable, source, and historical information”; definitions verified against `system/folder-contract.md`):
  - current state in `live/`;
  - durable knowledge in `wiki/`;
  - evidence in `sources/`;
  - historical material in `archive/`.
- [x] Review `live/dashboard.md` for broken, stale, or overly technical navigation (evidence: broken `TODAY.md` link removed, canonical `home.md` link restored, existing fallback targets verified, stale automation claims and excessive runtime detail removed).
- [x] Verify each important top-level folder has one readable index or README (evidence: `archive/index.md`, `capture/README.md`, `live/README.md`, `router/README.md`, `sources/index.md`, `system/README.md`, and `wiki/README.md` were directly read and confirmed human-readable).
- [x] Avoid creating new root files beyond documented exceptions (evidence: Phase 1 changed only existing `home.md`, `live/dashboard.md`, and this implementation plan; no new root file was created; allowed root exceptions remain defined in `system/folder-contract.md`).

### Acceptance criteria

- Steve can explain the system after reading only `home.md`;
- current priorities, decisions, and projects are reachable in one or two steps;
- no additional top-level folders are introduced;
- root and folder contracts match reality.

## Phase 2 — Brain–Mind bridge contract

**Goal:** standardize cross-repo communication while preserving ownership.

### Tasks

- [x] Create `system/brain-mind-bridge.md` (evidence: `system/brain-mind-bridge.md`).
- [x] Define Brain-owned and Mind-owned information (evidence: `system/brain-mind-bridge.md`, “Ownership boundary”).
- [x] Define allowed Brain → Mind proposal types (evidence: `system/brain-mind-bridge.md`, “Shared through the bridge” and “Brain → Mind flows”):
  - capture classification;
  - research summary;
  - decision proposal;
  - maintenance proposal;
  - project/status handoff;
  - task proposal.
- [x] Define allowed Mind → Brain context types (evidence: `system/brain-mind-bridge.md`, Mind ownership and normalized bridge rules):
  - approved strategy;
  - current priorities;
  - durable decisions;
  - project context;
  - personal constraints and preferences;
  - reviewed research conclusions.
- [x] Define one compact cross-repo envelope (evidence: `system/brain-mind-bridge.md`, “Normalized bridge envelope”).
- [x] Decide which fields are required versus optional (evidence: `system/brain-mind-bridge.md`, “Required versus optional fields”).
- [x] Define default proposal destinations (evidence: `system/brain-mind-bridge.md`, “Brain → Mind flows”).
- [x] Define approval and write boundaries (evidence: `system/brain-mind-bridge.md`, “Core rules” and flow boundaries).
- [x] Define source, supersession, and rejection behavior (evidence: `system/brain-mind-bridge.md`, normalized envelope and core rules).
- [x] Compare the bridge contract with Brain's current memory/handoff policies (evidence: direct comparison with Brain `AGENTS.md`, `CLAUDE.md`, `tools/scripts/auto-handoff.sh`, and `operations/specs/infinite-brain-philosophy.md`; ownership, selective retrieval, explicit promotion of Mind content into global AI rules, compact handoffs, separation of repo-local `.ai/` operational state from durable knowledge, secret exclusion, and human-approved truth changes align with `system/brain-mind-bridge.md`; no policy conflict found).

### Acceptance criteria

- neither repo needs to guess ownership or destination;
- no entire-file duplication is required across repos;
- personal/business truth cannot be silently promoted into global AI rules;
- Brain runtime data does not become duplicated Mind truth.

## Phase 3 — Freshness and knowledge-state standard

**Goal:** make changing knowledge maintainable without burdening timeless notes.

### Tasks

- [x] Create `system/knowledge-freshness-standard.md` (evidence: file exists and was directly reviewed).
- [x] Define statuses (evidence: `system/knowledge-freshness-standard.md`, “Knowledge states”):
  `draft`, `current`, `review-needed`, `superseded`, `archived`.
- [x] Define optional fields (evidence: `system/knowledge-freshness-standard.md`, “Optional freshness fields”):
  `last_reviewed`, `review_after`, `supersedes`.
- [x] Identify content classes that need freshness checks (evidence: `system/knowledge-freshness-standard.md`, “What should receive freshness checks”):
  - business strategy;
  - active projects;
  - prices and offers;
  - technical architecture;
  - services/vendors;
  - legal/regulatory research;
  - operating procedures.
- [x] Identify content classes that should not require review dates (evidence: `system/knowledge-freshness-standard.md`, human-first rule and low-freshness-risk classes).
- [x] Define contradiction handling (evidence: `system/knowledge-freshness-standard.md:190-225`; exact conflicting statements, source/date/scope/authority checks, current-evidence preference, exact-path resolution proposals, history preservation, and human approval are explicitly defined).
- [x] Define supersession and archive behavior (evidence: `system/knowledge-freshness-standard.md:227-260`; superseded/current link fields, no full-truth duplication, archive-not-deletion, link/index/history preservation, and archive-reason rules are explicitly defined).
- [x] Add examples that are readable in Obsidian (evidence: `system/knowledge-freshness-standard.md:284-391`; three Markdown examples include clear headings, exact paths, observed state, assessment, and readable YAML recommendations).
- [x] Validate the standard against three changing Mind pages before applying metadata (evidence: direct review of `router/00-current-context.md`, `live/projects/prochat-qa-memory/STRATEGY-PLAN.md`, and the current canonical ProChat strategy identified by `wiki/organisations/prochat/brand/README.md` as `wiki/organisations/prochat/brand/product-strategy.md`; each page’s status, review timing, and freshness risk match the standard’s page-type guidance).
- [x] Apply pilot fields to exactly three reviewed pages (evidence: all three pages were directly read and contain status/review metadata):
  - `router/00-current-context.md`;
  - `live/projects/prochat-qa-memory/STRATEGY-PLAN.md`;
  - `wiki/organisations/prochat/brand/product-strategy.md`.

### Acceptance criteria

- changing truth can be distinguished from historical truth;
- timeless notes remain lightweight;
- no bulk frontmatter migration is required;
- human readers can understand status without a schema reference.

## Phase 4 — Report-only maintenance intelligence

**Goal:** test self-healing suggestions without changing durable content.

### Mind tasks

- [x] Define report formats and review surfaces in `system/maintenance-report-contract.md` and `system/reports/README.md` (evidence: `system/maintenance-report-contract.md:38-56,61-88` and `system/reports/README.md:9-21,84-109`).
- [x] Add clear dismissal, suppression, recurrence, and false-positive behavior (evidence: `system/maintenance-report-contract.md:175-219`, `system/reports/README.md:54-67`).
- [x] Define which reports belong in `system/reports/` versus `wiki/log.md` (evidence: `system/reports/README.md:9-21,62-70`).
- [x] Define evidence requirements for each suggestion type (evidence: `system/maintenance-report-contract.md:14-22,93-123,376-457`).
- [x] Select a bounded five-file pilot dataset and explicit report-only acceptance tests (evidence: `system/reports/maintenance-pilot-fixture.md:11-28,30-41` and `system/runbooks/maintenance-report-pilot-runbook.md:47-69,92-106`).

### Brain implementation tasks

- [x] Add stale-page candidate detection (evidence: Brain test `projects/brain-core/src/tests/mind-maintenance-pilot-loader-stale.test.ts`; aggregate gate `test:mind-maintenance-pilot-all` passed 120 tests, 0 failed).
- [x] Add duplicate-page candidate detection (evidence: Brain `projects/brain-core/src/mind-maintenance-pilot/pilot-report-builder.ts` enables conservative exact normalized-content comparison across the bounded pilot dataset; focused test `projects/brain-core/src/tests/mind-maintenance-pilot-report-builder.test.ts` verifies one approval-gated report-only duplicate finding with zero source writes; `test:mind-maintenance-report-builder` passed 10 tests, 0 failed, including TypeScript build).
- [x] Add contradiction candidate detection (evidence: Brain `projects/brain-core/src/mind-maintenance-pilot/contradiction-detector.ts` requires exact claims, locations, authority, scope, bounded paths, and explicit mutual exclusivity; `projects/brain-core/src/mind-maintenance-pilot/pilot-report-builder.ts` enables report-only execution; focused test coverage verifies one approval-gated contradiction finding, exclusion of a compatible pair, and zero source writes; `test:mind-maintenance-report-builder` passed 11 tests, 0 failed, including TypeScript build).
- [x] Add completed-but-still-active detection (evidence: Brain test `projects/brain-core/src/tests/mind-maintenance-completed-active.test.ts`; aggregate gate passed 120 tests, 0 failed).
- [x] Add source-reference gap detection (evidence: Brain test `projects/brain-core/src/tests/mind-maintenance-source-gap.test.ts`; aggregate gate passed 120 tests, 0 failed).
- [x] Add durable-insight-trapped-in-capture detection (evidence: Brain `projects/brain-core/src/mind-maintenance-pilot/capture-promotion-detector.ts` requires durable classification, repeated-use/repeated-concept or aged high-confidence signals, duplicate-check evidence, bounded destinations, explicit approval, and no writes; `projects/brain-core/src/mind-maintenance-pilot/pilot-report-builder.ts` enables report-only execution; focused direct suite passed 12 tests, 0 failed, including personal-content exclusion and zero source writes).
- [x] Route jobs through Brain Core, scheduler, Mind Steward, and AI Model Selector (evidence: Brain `projects/brain-core/src/adapters/mind-maintenance-routing.ts` routes report-only jobs through runtime `brain-core`, scheduler job `mind-maintenance-report-only`, owner `mind-steward`, and conditionally consults AI Model Selector only for ambiguous semantic checks; `projects/brain-core/src/adapters/scheduler.ts` registers the job; `projects/brain-core/src/adapters/ai-model-selector-service.ts` provides the bounded selector wrapper; `projects/brain-core/src/api/routes.ts` exposes explicit approval-gated `POST /api/mind-maintenance/run`; focused direct suite `test:mind-maintenance-routing:direct` passed 4 tests, 0 failed).
- [x] Expose status and latest reports in Brain Console (evidence: Brain Core `projects/brain-core/src/api/routes.ts` exposes read-only `GET /scheduler/mind-steward/status` and validated `GET /api/mind-maintenance/latest?mindRoot=<path>`; Brain Console `projects/brain-console/lib/braincore-schemas.ts` defines the maintenance response contracts; `projects/brain-console/components/infinite-brain-dashboard.tsx` polls and renders scheduler status, latest report metadata, findings, detector errors, source-file changes, and report-only safety; `projects/brain-console` typecheck passed with 0 errors).

### Validation

- [x] Run each implemented report detector on bounded fixtures (evidence: focused detector tests and Brain aggregate gate passed 120 tests, 0 failed; controlled five-file Mind run completed with 0 detector errors).
- [x] Measure false positives (evidence: reviewed bounded-fixture audit `system/reports/maintenance-history/2026-06-17-false-positive-measurement.md` measured 7 explicit negative cases, 0 false positives, and a 0% observed false-positive rate; the same audit recorded 1 missed required positive and 0% recall at that time. That specific freshness-metadata positive case was later validated by Brain's deterministic `mind-maintenance-pilot-loader-stale` test).
- [x] Confirm no Mind content changes (evidence: Brain test `projects/brain-core/src/tests/mind-maintenance-source-integrity.test.ts`; controlled run reported `sourceFilesChanged: 0`).
- [x] Confirm suggestions cite exact source paths (evidence: Brain report schema and detector tests require path-bearing evidence; controlled report used the bounded five-file dataset).
- [x] Collect human usefulness feedback (evidence: Steve Westhoek reviewed the bounded pilot and recorded “Useful after stale-page repair” in `system/reports/maintenance-history/2026-06-17-human-usefulness-feedback.md`; the review confirms the report is not useful enough as-is because it missed the required stale-page finding, but remains potentially useful after repair because it produced 0 false positives across 7 labeled negatives, remained report-only, changed no Mind source files, and exposed no detector errors).

### Acceptance criteria

- reports save review time;
- no suggestion is presented as fact without evidence;
- no write occurs;
- noisy report types are disabled or refined.

## Phase 5 — Approved bounded writes

**Goal:** turn useful proposals into safe human-approved updates.

### Tasks

- [x] Define exact-path approval payloads (evidence: `system/brain-mind-bridge.md:108-191` defines a separate human approval payload bound to proposal ID, source report, full source commit, explicit repository-relative target and destination paths, before-state hashes, allowed sections, content intent, source references, expiry, single-use semantics, file-count limits, and rejection of folders/globs/unspecified destinations; review against Phase 5 acceptance criteria confirms writes are tied to explicit proposals and paths, hidden bulk rewrite is rejected, and provenance/history are preserved; failed-write recovery remains assigned to the later rollback/recovery task).
- [x] Implement approved wiki update flow (evidence: Brain Core implements a guarded single-file exact-path wiki writer with approval provenance, full before-state SHA-256 matching, atomic temp-file rename with fsync, rollback snapshot persistence, structured write reporting, and rejection of broad, traversal, non-wiki, and symlink targets in `projects/brain-core/src/adapters/infinite-brain-writers/writer-wiki.ts`; direct verification on 2026-06-17: `npm run typecheck` passed and `npm run test:infinite-brain-writer-stubs:direct` passed 14/14 tests).
- [x] Implement approved live-page status update flow (evidence: Brain Core implements a guarded single-file exact-path status writer for existing Markdown pages under `live/` in `projects/brain-core/src/adapters/infinite-brain-writers/writer-live-status.ts`, with approval provenance, expiry validation, full source-commit and before-state SHA-256 checks, rollback snapshot persistence, atomic temp-file write with fsync and rename, post-write hash verification, structured reporting, and rejection of broad, traversal, non-live, missing, and symlink targets; direct verification on 2026-06-17: `npm run typecheck` passed and `npm run test:infinite-brain-writer-stubs:direct` passed 19/19 tests).
- [x] Implement approved supersede/archive flow (evidence: Brain Core implements a guarded non-deleting single-file exact-path move from one existing Markdown source to one explicit unused destination under `archive/` in `projects/brain-core/src/adapters/infinite-brain-writers/writer-supersede-archive.ts`, with approval provenance, expiry validation, required contradiction and supersession rationale, full source SHA-256 matching, no overwrite, symlink and traversal rejection, rollback metadata persisted before move, atomic filesystem rename, and post-move hash/source-removal verification; direct verification on 2026-06-18: `npm run typecheck` passed and `npm run test:infinite-brain-writer-stubs:direct` passed 25/25 tests).
- [x] Implement approved source-routing flow (evidence: Brain Core implements a guarded one-file exact-path source-routing move into `sources/` in `projects/brain-core/src/adapters/infinite-brain-writers/writer-source-routing.ts`, requiring explicit approved source and destination paths, full source commit, approval expiry, routing reason, source summary, and source SHA-256 matching; it rejects broad paths, traversal, sources-origin rerouting, destination collisions, folders, and symlinks, persists rollback metadata before an atomic rename, verifies destination hash and source removal, and records both changed paths; direct verification on 2026-06-18: `npm run typecheck` passed and `npm run test:infinite-brain-writer-stubs:direct` passed 31/31 tests).
- [x] Preserve source references (evidence: Brain Core now defines typed source references with exact `sources/*.md` path, location, and summary in `projects/brain-core/src/adapters/infinite-brain-proposal-application-planner.ts`; approval validation rejects absolute, backslash, glob, traversal, folder-only, non-Markdown, and non-`sources/` paths, requires non-empty location and summary, and rejects removal of existing proposal references unless explicit non-empty replacements are approved; validated references and replacement state propagate through `ProposalApplicationPlanStep` and `projects/brain-core/src/adapters/infinite-brain-write-manifest.ts`, where failed preservation adds `source-reference-preservation-required`, invalidates exact-path approval, and keeps writes blocked; `projects/brain-core/src/adapters/infinite-brain-post-write-verification.ts` reports per-entry `source-reference-preserved` pass/fail/blocked evidence; direct verification on 2026-06-18: `npm run test:source-reference-focused` passed 29/29 focused tests and its chained `npm run typecheck` passed).
- [x] Log changed paths, before/after state, approval, and result (evidence: Brain Core persists immutable writer audit records through `projects/brain-core/src/adapters/infinite-brain-writers/writer-audit-log.ts`; wiki and live-status reports already call the audit logger, and supersede/archive plus source-routing writers now persist audit records from `projects/brain-core/src/adapters/infinite-brain-writers/writer-supersede-archive.ts` and `projects/brain-core/src/adapters/infinite-brain-writers/writer-source-routing.ts`; each audit record logs exact changed paths, before-state hashes, after-state hashes or removed-source nulls, explicit approval metadata, and blocked/applied/failed result fields without broad-path writes; focused tests in `projects/brain-core/src/tests/infinite-brain-writer-stubs.test.ts` verify audit artifacts for wiki, live-status, supersede/archive, and source-routing flows plus blocked hash/path/symlink/collision safety invariants; direct verification on 2026-06-18: `npm run test:infinite-brain-writer-stubs:direct` passed 31/31 tests and `npm run typecheck` passed).
- [x] Add rollback or recovery procedure (evidence: Brain Core now exposes a read-only exact-path recovery procedure generator in `projects/brain-core/src/adapters/infinite-brain-writers/writer-recovery-procedure.ts` and exports it from `projects/brain-core/src/adapters/infinite-brain-writers/index.ts`; the procedure reads existing writer reports plus rollback snapshots or move metadata for wiki, live-status, supersede/archive, and source-routing flows, verifies rollback IDs, proposal/approval linkage, exact Markdown paths, before/current hashes, current destination/source state, and human-approval requirement, then returns manual recovery steps without mutating Mind; focused tests in `projects/brain-core/src/tests/infinite-brain-writer-recovery-procedure.test.ts` cover ready recovery procedures for all four approved write flows, missing rollback artifacts, current-state mismatch blocking, and no-write safety invariants; direct verification on 2026-06-18: `npx tsx --test src/tests/infinite-brain-writer-recovery-procedure.test.ts` passed 6/6 tests, `npm run test:infinite-brain-writer-stubs:direct` passed 31/31 tests, and `npm run typecheck` passed).
- [x] Reject broad-folder or unspecified writes (evidence: Brain Core approved write flows normalize and reject empty, folder, glob/wildcard, traversal, wrong-prefix, archive-origin/source-origin, symlink, collision, and autonomous destination cases in `projects/brain-core/src/adapters/infinite-brain-writers/writer-wiki.ts`, `writer-live-status.ts`, `writer-supersede-archive.ts`, and `writer-source-routing.ts`; focused test coverage in `projects/brain-core/src/tests/infinite-brain-writer-stubs.test.ts` now explicitly includes unspecified empty paths plus broad folders, globs, traversal, non-approved roots, destination collisions, and symlink source/parent targets for the approved wiki, live-status, supersede/archive, and source-routing flows; direct verification on 2026-06-18: `npm run test:infinite-brain-writer-stubs:direct` passed 31/31 tests and `npm run typecheck` passed).

### Acceptance criteria

- every write is tied to an explicit proposal and approved path;
- no hidden bulk rewrite is possible;
- history and provenance are preserved;
- failed writes are recoverable.

## Phase 6 — Capture-to-knowledge lifecycle

**Goal:** make capture reliably become useful knowledge when appropriate.

### Tasks

- [x] Implement persistent Brain-owned inbox queue (evidence: Brain Core now owns a persistent, local-only inbox queue state adapter in `projects/brain-core/src/adapters/mind-steward-inbox-queue.ts`; it scans `capture/inbox/` read-only, writes queue state only to Brain runtime JSON, preserves per-capture `firstSeenAt`, `lastCheckedAt`, `attemptCount`, visible status, size, modified time, large-file flag, sample-selection flag, selector status, and last error, applies conservative defaults from `system/inbox-queue-throttle-spec.md`, blocks missing inbox and large files, debounces unstable files, caps selected samples, records disappeared captures as done without moving them, and sets safety flags proving no Mind writes, capture moves/deletes, or Kanban writes; focused tests in `projects/brain-core/src/tests/mind-steward-inbox-queue.test.ts` cover valid persistent state, state preservation across refreshes, large-file blocking, debounce behavior, sample limits, missing-inbox failure state, disappeared-capture visibility, and no-write safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` passed 6/6 tests and `npm run typecheck` passed).
- [x] Normalize capture classification output (evidence: Brain Core now normalizes Mind Steward classifier dry-run reports through `projects/brain-core/src/adapters/mind-steward-capture-classification.ts`; the normalized schema emits stable per-capture `capture-classification` records with status, safe `capture/inbox/*.md` path when valid, size, modified time, summary preview, empty tags, null destination, confidence, review reason, approval requirement, selector status/provider/model, evidence, blockers, and no-write safety flags, while deliberately avoiding duplicate search, source-preservation policy, destination selection, and reviewed outcomes assigned to later Phase 6 tasks; focused tests in `projects/brain-core/src/tests/mind-steward-capture-classification.test.ts` cover sampled files, skipped files, unsafe capture names, blocked classifier reports, empty reports, and no Mind/Kanban write safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-capture-classification.test.ts` passed 5/5 tests and `npm run typecheck` passed).
- [x] Require duplicate search before proposing a new durable page (evidence: Brain Core now requires explicit duplicate-search evidence before any durable page proposal gate can become ready through `projects/brain-core/src/adapters/mind-steward-duplicate-search.ts`; duplicate search is read-only, searches safe relative Mind roots `live/`, `wiki/`, and `sources/`, returns stable evidence with classification ID, capture path, query, searched roots, top candidate paths and scores, matched/no-match summary, and no-write/no-move/no-delete safety flags, and `createDurablePageProposalGate` blocks missing, mismatched-classification, or mismatched-capture evidence while allowing proposal readiness only after a matching search result exists; focused tests in `projects/brain-core/src/tests/mind-steward-duplicate-search.test.ts` cover finding an existing durable update target without writing Mind, blocking missing duplicate search, blocking mismatched evidence, allowing a no-candidate result after search, and rejecting unsafe searched roots before scanning; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-duplicate-search.test.ts` passed 5/5 tests and `npm run typecheck` passed).
- [x] Preserve original capture source (evidence: Brain Core now creates read-only original capture source preservation records in `projects/brain-core/src/adapters/mind-steward-capture-source-preservation.ts`; the adapter verifies safe `capture/inbox/*.md` paths, rejects missing/unsafe/symlink sources, records classification ID, original capture path, SHA-256 hash, size, modified time, a retention policy of `preserve-in-place-until-approved-outcome-defined`, and safety flags proving no Mind writes, capture moves, deletes, or overwrites, and `createCaptureSourcePreservationGate` blocks downstream capture review/proposal readiness when preservation evidence is missing, blocked, mismatched, or hashless without deciding any later destination or post-approval source handling; focused tests in `projects/brain-core/src/tests/mind-steward-capture-source-preservation.test.ts` cover valid source preservation without changing the file, missing preservation evidence, unsafe capture paths, missing source files, mismatched evidence, symlink blocking, and no-write/no-move/no-delete safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-capture-source-preservation.test.ts` passed 6/6 tests and `npm run typecheck` passed).
- [x] Propose one destination only unless ambiguity is material (evidence: Brain Core now gates capture destination proposals through `projects/brain-core/src/adapters/mind-steward-destination-proposal.ts`; the selector requires prior duplicate-search and original-source preservation evidence, accepts only exact Markdown destinations under `live/`, `wiki/`, `sources/`, or `archive/`, rejects broad folders, globs, traversal-normalized paths, invalid confidence, and missing candidates, selects exactly one top destination when confidence is clear, blocks with `materialDestinationAmbiguity` and no selected destination when competing candidates are materially close, can derive a single existing-page destination from duplicate-search evidence, and sets safety flags proving no Mind writes, capture moves/deletes, or reviewed-outcome execution; focused tests in `projects/brain-core/src/tests/mind-steward-destination-proposal.test.ts` cover clear single-destination selection, material ambiguity blocking, required duplicate/source evidence, invalid broad/glob destination rejection, duplicate-search-driven existing-page proposals, and no-write/no-execution safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-destination-proposal.test.ts` passed 5/5 tests and `npm run typecheck` passed).
- [x] Support reviewed outcomes (evidence: Brain Core now represents reviewed capture lifecycle outcomes through `projects/brain-core/src/adapters/mind-steward-reviewed-outcome.ts`; the outcome artifact supports `promote-live`, `compile-wiki`, `route-sources`, `create-task-proposal`, `archive`, and `reject-leave-in-inbox`, requires source-preservation evidence and human review metadata, requires a ready matching single-destination proposal for live/wiki/sources/archive outcomes, requires a task draft for task proposals without mutating `kanban.md`, leaves rejected captures in inbox, preserves source handling for later policy by marking non-reject outcomes as `not-decided-by-this-outcome-proposal`, and sets safety flags proving no Mind writes, Kanban writes, capture moves/deletes, or outcome execution; focused tests in `projects/brain-core/src/tests/mind-steward-reviewed-outcome.test.ts` cover all six supported outcomes plus incomplete review metadata, destination-kind mismatch, incomplete task draft, missing source preservation, and no-write/no-execution safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-reviewed-outcome.test.ts` passed 5/5 tests and `npm run typecheck` passed):
  - promote to `live/`;
  - compile into `wiki/`;
  - route to `sources/`;
  - create task proposal;
  - archive;
  - reject/leave in inbox.
- [x] Define what happens to the original capture after approval (evidence: Brain Core now defines read-only post-approval original-capture handling in `projects/brain-core/src/adapters/mind-steward-original-capture-after-approval.ts`; approved live, wiki, and task-proposal outcomes retain the original capture in `capture/inbox/` as source evidence with visible state `approved-retained`, approved sources-routing and archive outcomes become pending separate exact-path move approval through the existing source-routing or supersede/archive operation type without moving the file, rejected outcomes leave the capture in inbox with visible state `rejected-left-in-inbox`, and all plans validate the reviewed outcome, source record ID, capture path, and preserved source hash while setting safety flags proving no Mind writes, capture moves/deletes, overwrites, or automatic source disposal; focused tests in `projects/brain-core/src/tests/mind-steward-original-capture-after-approval.test.ts` cover retained live/wiki/task behavior, pending source-routing and archive move approval, rejected-left-in-inbox behavior, blocked non-ready outcomes, missing/mismatched source records, hash preservation, and no move/delete safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-original-capture-after-approval.test.ts` passed 5/5 tests and `npm run typecheck` passed).
- [x] Prevent repeated processing of the same capture (evidence: Brain Core now records per-capture `contentSha256` in the persistent Brain-owned inbox queue in `projects/brain-core/src/adapters/mind-steward-inbox-queue.ts`; unchanged captures previously marked `reported`, `approved`, or `done` keep their handled status, remain visible, preserve `firstSeenAt`/`attemptCount`, and are not selected for another classifier sample, while edited captures with changed content hash re-enter as `pending` and can be selected again without moving or deleting the source file; focused tests in `projects/brain-core/src/tests/mind-steward-inbox-queue.test.ts` now cover content-hash persistence, unchanged handled captures not being reselected, edited handled captures being reselected, existing queue persistence, large-file/debounce behavior, sample limits, missing inbox blocked state, disappeared capture visibility, and no Mind/Kanban writes; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` passed 8/8 tests and `npm run typecheck` passed).
- [x] Add bounded retry and failure routing (evidence: Brain Core now implements bounded queue failure handling in `projects/brain-core/src/adapters/mind-steward-inbox-queue.ts`; `recordMindStewardInboxQueueFailure` records classifier/job failures only in Brain-owned runtime queue state, increments `attemptCount`, schedules `nextRetryAfter` while attempts are within `maxRetries`, prevents selection before retry time, reselects the capture when retry becomes due, and after retries are exhausted marks the item `failed` with `failureRoute: brain-runtime-queue-status` while preserving the original `capture/inbox` file and requiring a later explicit approved move before any `capture/failed/` routing; queue summaries now expose failed counts, failed unchanged captures remain visible and are not reprocessed, unknown queue items block safely, and safety flags prove no Mind writes, Kanban writes, capture moves/deletes, or source overwrites; focused tests in `projects/brain-core/src/tests/mind-steward-inbox-queue.test.ts` cover scheduled retries, held retry windows, retry-due reselection, exhausted failure routing, missing item blocking, content-hash repeat prevention, queue persistence, large-file/debounce behavior, sample limits, missing inbox blocked state, disappeared capture visibility, and no-write/no-move safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` passed 11/11 tests and `npm run typecheck` passed).

### Acceptance criteria

- each processed capture has a visible state;
- duplicate durable pages decrease;
- original evidence is not lost;
- rejected or failed captures remain recoverable.

## Phase 7 — Tasks and projects

**Goal:** connect knowledge with action without risking the current Kanban.

### Tasks

- [x] Keep task generation proposal-only initially (evidence: Brain Core now gates generated tasks through a proposal-only adapter in `projects/brain-core/src/adapters/mind-steward-task-proposal.ts`; task suggestions require a ready reviewed `create-task-proposal` outcome, are emitted only for the review surface `wiki/log.md`, explicitly protect `kanban.md`, set `proposalOnly: true` and `executionAllowed: false`, block any requested Kanban write with `kanbanWritesDisabledUntilLosslessSync`, and set safety flags proving no Mind writes, Kanban writes, task-record creation, or existing-task mutation until lossless sync and explicit approval exist; the existing task writer in `projects/brain-core/src/adapters/infinite-brain-writers/writer-tasks.ts` remains blocked/non-writing; focused tests in `projects/brain-core/src/tests/mind-steward-task-proposal.test.ts` cover valid proposal-only records, requested Kanban write blocking, non-task outcome blocking, and the disabled task writer safety state; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-task-proposal.test.ts` passed 4/4 tests and `npm run typecheck` passed).
- [x] Link task proposals to source captures or decisions (evidence: Brain Core task proposals now carry explicit source links through `projects/brain-core/src/adapters/mind-steward-task-proposal.ts`; proposal-only records automatically link reviewed capture-derived task suggestions back to their exact `capture/inbox/*.md` source, accept validated decision links only to `live/decisions.md` with non-empty summaries, deduplicate source links, block proposals with no capture or decision source, reject unsafe/broad/traversal source links, and still keep `kanban.md` protected with proposal-only/no-write safety flags so knowledge can explain why a task exists without mutating task state; focused tests in `projects/brain-core/src/tests/mind-steward-task-proposal.test.ts` cover source-capture links, decision links, missing source blocking, unsafe source-link blocking, requested Kanban write blocking, non-task outcome blocking, and the disabled task writer safety state; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-task-proposal.test.ts` passed 7/7 tests and `npm run typecheck` passed).
- [x] Add project status review suggestions (evidence: Brain Core now emits read-only project status review suggestions through `projects/brain-core/src/adapters/mind-steward-project-status-suggestions.ts`; the adapter inspects exact safe `live/projects/*.md` Markdown paths, parses status/project_status plus `last_reviewed` and `review_after` metadata, suggests human review for due review dates, stale last-reviewed dates, or missing project status metadata, ignores non-project/unsafe paths, requires valid ISO report dates and sane stale thresholds, and sets safety flags proving no Mind writes, live-project writes, Kanban writes, file moves, or status mutation; focused tests in `projects/brain-core/src/tests/mind-steward-project-status-suggestions.test.ts` cover due `review_after`, stale `last_reviewed`, missing status metadata, non-project/unsafe path filtering, invalid input blocking, approval-required suggestions, and no-write safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-project-status-suggestions.test.ts` passed 5/5 tests and `npm run typecheck` passed).
- [x] Add completed-project archive suggestions (evidence: Brain Core now emits read-only completed-project archive suggestions through `projects/brain-core/src/adapters/mind-steward-completed-project-archive-suggestions.ts`; the adapter inspects safe exact `live/projects/*.md` paths, requires active/current project metadata plus explicit completion, closure, supersession, or replacement evidence, proposes an exact `archive/projects/*.md` destination by default or honors a safe explicit `archive_path`, blocks unsafe archive destinations, ignores non-project pages and pages without an active-completed conflict, requires a valid ISO report date, and sets safety flags proving no Mind writes, live-project writes, archive writes, file moves, or deletes; focused tests in `projects/brain-core/src/tests/mind-steward-completed-project-archive-suggestions.test.ts` cover default archive suggestions, explicit archive paths, no false positives, unsafe archive destination blocking, invalid report dates, approval-required suggestions, and no-write/no-move safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-completed-project-archive-suggestions.test.ts` passed 5/5 tests and `npm run typecheck` passed).
- [x] Validate the existing read-only Kanban exporter (evidence: Brain Core now has a focused validation test in `projects/brain-core/src/tests/mind-kanban-exporter-validation.test.ts` that executes the existing Mind exporter `mind/tools/export-kanban-tasks.mjs` in JSON stdout mode, Markdown stdout mode, and help mode; the test verifies `kanban.md` is byte-for-byte unchanged before and after each run, JSON totals match parsed columns/cards/subtasks, cards retain raw text/title/column structure, Markdown output includes totals, and help documents stdout as the default behavior, without using `--write` or creating export artifacts; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-kanban-exporter-validation.test.ts` passed 3/3 tests and `npm run typecheck` passed).
- [x] Define a lossless canonical task record only if needed (evidence: Brain Core now defines a validation-only canonical task record candidate in `projects/brain-core/src/adapters/mind-steward-canonical-task-record.ts` because the next fixture round-trip task needs a stable lossless comparison shape; the normalizer consumes existing Kanban exporter JSON from `kanban.md`, preserves source line, column/status, checked state, raw card text, title, tags, completion date, nested subtasks with raw text/check state/tags/completion dates, and stable hash IDs derived from source/column/line/raw text, blocks malformed exporter records or non-`kanban.md` sources, and sets safety flags proving no Mind writes, Kanban writes, durable task file creation, or replacement of Kanban as source of truth; focused tests in `projects/brain-core/src/tests/mind-steward-canonical-task-record.test.ts` cover lossless field preservation, stable IDs, malformed card/subtask blocking, non-Kanban source blocking, and no-write/no-replacement safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-canonical-task-record.test.ts` passed 4/4 tests and `npm run typecheck` passed).
- [x] Test round-trip sync on fixtures before touching `kanban.md` (evidence: Brain Core now validates fixture-only Kanban round trips through `projects/brain-core/src/adapters/mind-steward-kanban-round-trip-fixture.ts`; the validator converts exporter-style fixture data into lossless canonical records, renders candidate Kanban Markdown entirely in memory, reparses the candidate, compares column counts, total cards/subtasks, raw card text, titles, checked states, completion dates, tags, nested subtask raw text/check state/tags/completion dates, and preserves plugin settings in the candidate fixture while setting safety flags proving it is fixture-only, does not touch real `kanban.md`, writes no Mind files, and requires approval before any real write path; focused tests in `projects/brain-core/src/tests/mind-steward-kanban-round-trip-fixture.test.ts` cover a passing round trip with subtasks/tags/dates/plugin settings, malformed canonical input blocking before render, source column-count mismatch blocking, and no-write/no-real-Kanban safety; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-kanban-round-trip-fixture.test.ts` passed 3/3 tests and `npm run typecheck` passed).
- [x] Require explicit approval before any task write (evidence: Brain Core now has an explicit non-writing task-write approval gate in `projects/brain-core/src/adapters/mind-steward-task-write-approval.ts`; the gate requires a ready proposal-only task record, passing lossless round-trip evidence, complete human approval metadata, exact `kanban.md` target, approved operation `replace-kanban-from-lossless-candidate`, candidate Markdown SHA-256 binding, expected-before SHA-256, safe backup evidence under `runtime/local/mind-steward/kanban-backups/*.md`, one-file scope, and manual Kanban write confirmation before `canRequestTaskWrite` becomes true, while safety flags prove it writes no Mind files, writes no Kanban, and executes no write; focused tests in `projects/brain-core/src/tests/mind-steward-task-write-approval.test.ts` cover valid approval, missing approval blocking, broad/non-Kanban target blocking, failed round-trip blocking, candidate-hash and backup mismatch blocking, proposal mismatch/manual-confirmation blocking, and the disabled task writer remaining blocked; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-task-write-approval.test.ts` passed 7/7 tests, adjacent Phase 7 verification `npx tsx --test src/tests/mind-steward-task-proposal.test.ts src/tests/mind-steward-kanban-round-trip-fixture.test.ts src/tests/mind-steward-task-write-approval.test.ts` passed 17/17 tests, and `npm run typecheck` passed).

### Acceptance criteria

- no Kanban cards, subtasks, dates, tags, or statuses are lost;
- project state and task state do not silently diverge;
- knowledge can explain why a task exists.

## Phase 8 — Scheduled/on-demand operation

**Goal:** operate proven workflows reliably through Brain.

### Tasks

- [x] Add feature flags per workflow (evidence: Brain Core now defines explicit default-off workflow feature flags for every execution-plan candidate in `projects/brain-core/src/adapters/execution-plans.ts`, including Mind Steward dry-run, inbox dry-run, classifier dry-run, queue dry-run, Graphify preflight/update/selector-preview candidates, and the Infinite Brain report-only pipeline; each plan exposes `workflowFeatureFlag` metadata with workflow ID, flag name, enabled state, default-off status, report-only or blocked-until-implementation mode, and no Mind-write/external-side-effect safety flags, while `/execution/readiness` and `/capabilities` expose the complete flag inventory and enabled counts; approved Graphify scheduler candidates are now blocked in `projects/brain-core/src/adapters/actions.ts` unless their matching workflow flag is explicitly true, preserving existing Mind Steward flags and not enabling execution globally; API types were updated in `projects/brain-core/src/types/api.ts`, and route coverage in `projects/brain-core/src/tests/routes.test.ts` now verifies default-off readiness and Graphify blocking; focused tests in `projects/brain-core/src/tests/execution-plan-workflow-feature-flags.test.ts` cover one flag per workflow, unique names, default-off behavior, exact `true` parsing, single-workflow enablement without global execution, and unknown workflow blocking; direct verification on 2026-06-18: `npx tsx --test src/tests/execution-plan-workflow-feature-flags.test.ts` passed 4/4 tests, targeted route verification `npx tsx --test --test-name-pattern "execution plan|execution/plans|execution/readiness|Graphify scheduler" src/tests/routes.test.ts` passed 14/14 tests, and `npm run typecheck` passed).
- [x] Add on-demand runs first (evidence: Brain Core now exposes an explicit approval-only on-demand workflow surface in `projects/brain-core/src/adapters/on-demand-runs.ts` and routes it through `GET /execution/on-demand-runs` plus `POST /execution/on-demand-runs/:kind/request` in `projects/brain-core/src/api/routes.ts`; the adapter derives one on-demand request endpoint from each existing execution-plan workflow, reuses the existing approval record path without scheduling, marks every run `schedulerRequired: false`, `scheduled: false`, and `willRunImmediately: false`, preserves per-workflow feature-flag metadata, blocks unknown workflow kinds, and sets safety flags proving no Mind writes, external side effects, scheduler job creation, or background daemon startup; capabilities and API types were updated in `projects/brain-core/src/adapters/capabilities.ts` and `projects/brain-core/src/types/api.ts`; focused tests in `projects/brain-core/src/tests/on-demand-runs.test.ts` cover workflow listing, valid approval-request creation without execution/scheduling, unknown workflow blocking, and exact workflow lookup safety; route tests in `projects/brain-core/src/tests/routes.test.ts` cover the GET list, POST approval request, and POST unknown workflow behavior; direct verification on 2026-06-18: `npx tsx --test src/tests/on-demand-runs.test.ts` passed 4/4 tests, targeted route verification `npx tsx --test --test-name-pattern "on-demand|execution plan|execution/plans|execution/readiness" src/tests/routes.test.ts` passed 16/16 tests, and `npm run typecheck` passed).
- [x] Add scheduler jobs only after manual success (evidence: Brain Core scheduler job summaries in `projects/brain-core/src/adapters/scheduler.ts` now include an explicit manual-success gate: every job reports `manualSuccessRequired: true`, `schedulerEnabled: false`, no Mind-write/no scheduler-creation/no daemon safety flags, and blockers until a matching report-only workflow has successful manual/on-demand evidence; runtime reports with only `status: success` keep jobs ineligible, while reports with successful `trigger: "on-demand"` or `manualSuccess: true` make mapped report-only jobs scheduler-eligible but still not enabled, and mutation-required jobs remain ineligible under future approved mutation policy; API types were updated in `projects/brain-core/src/types/api.ts`, and route tests in `projects/brain-core/src/tests/routes.test.ts` verify placeholder jobs, report-without-manual-success blocking, and report-only eligibility after manual on-demand success evidence; focused tests in `projects/brain-core/src/tests/scheduler-manual-success-gate.test.ts` cover default ineligible jobs, successful runtime reports without manual evidence, successful manual/on-demand evidence, mutation-job blocking, and no scheduler-job/no-daemon safety; direct verification on 2026-06-18: `npx tsx --test src/tests/scheduler-manual-success-gate.test.ts` passed 4/4 tests, targeted route verification `npx tsx --test --test-name-pattern "scheduler/jobs" src/tests/routes.test.ts` passed 10/10 tests, and `npm run typecheck` passed).
- [x] Enforce queue, throttle, retry, and large-file policies (evidence: Brain Core now exposes an explicit queue-run enforcement gate in `projects/brain-core/src/adapters/mind-steward-inbox-queue.ts` through `enforceMindStewardInboxQueuePolicy`; the gate requires the queue workflow feature flag, a ready Brain-owned queue state, local-only settings, selected pending items, max concurrent jobs below the configured limit, `minimumSecondsBetweenRuns` elapsed, selected item count within `maxFilesPerRun`, no selected large files, and retry attempts within `maxRetries`, while preserving safety flags proving no Mind writes, capture moves/deletes, Kanban writes, or background daemon startup; the existing queue refresh still debounces unstable files, blocks large files with `blocked_large_file`, limits samples, preserves content hashes, records bounded retries, routes exhausted failures only to Brain runtime queue status, and writes state only under Brain runtime; focused tests in `projects/brain-core/src/tests/mind-steward-inbox-queue.test.ts` cover valid flagged policy readiness, feature-flag blocking, max-concurrency and minimum-run-interval blocking, selected large-file and over-limit blocking, retry-exhaustion blocking, plus the existing queue persistence/debounce/sample/large-file/failure-routing safety invariants; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` passed 16/16 tests and `npm run typecheck` passed).
- [x] Add kill switch (evidence: Brain Core now has a single default-off execution kill switch `BRAIN_CORE_EXECUTION_KILL_SWITCH` implemented through `projects/brain-core/src/adapters/execution-plans.ts`; when true it appears in `/execution/readiness`, adds the blocker `execution kill switch enabled`, blocks on-demand workflow requests in `projects/brain-core/src/adapters/on-demand-runs.ts`, blocks approved Mind Steward and Graphify execution in `projects/brain-core/src/adapters/actions.ts` before feature-flag/durable-store/script checks, and makes scheduler jobs ineligible in `projects/brain-core/src/adapters/scheduler.ts` even when manual success evidence exists, while preserving safety flags proving no Mind writes; API types were updated in `projects/brain-core/src/types/api.ts`; focused tests in `projects/brain-core/src/tests/execution-kill-switch.test.ts` cover default-off metadata, readiness blocker, on-demand request blocking, approved execution blocking, scheduler ineligibility after manual success evidence, and no-write safety; route tests in `projects/brain-core/src/tests/routes.test.ts` cover `/execution/readiness` kill-switch visibility; direct verification on 2026-06-18: `npx tsx --test src/tests/execution-kill-switch.test.ts` passed 5/5 tests, targeted route verification `npx tsx --test --test-name-pattern "execution/readiness" src/tests/routes.test.ts` passed 3/3 tests, and `npm run typecheck` passed).
- [x] Add latest-run, failed-item, and recovery views (evidence: Brain Core now exposes read-only Mind Steward observability views through `projects/brain-core/src/adapters/mind-steward-runtime-views.ts` and routes them at `GET /scheduler/mind-steward/latest-run`, `GET /scheduler/mind-steward/failed-items`, and `GET /scheduler/mind-steward/recovery` in `projects/brain-core/src/api/routes.ts`; the latest-run view derives the freshest Mind Steward runtime report metadata, the failed-item view lists exhausted queue failures from Brain-owned inbox queue state, and the recovery view provides approval-required/manual-review/proposal-only guidance without executable auto-fix behavior; API contracts were added in `projects/brain-core/src/types/api.ts`; safety properties prove the views are read-only and do not write to Mind, move/delete captures, write Kanban, create scheduler jobs, or start background daemons; focused tests in `projects/brain-core/src/tests/mind-steward-runtime-views.test.ts` cover latest-run selection, failed item visibility, recovery guidance, missing queue state, and no Mind/Kanban/capture mutation; route tests in `projects/brain-core/src/tests/routes.test.ts` cover the three GET endpoints; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-steward-runtime-views.test.ts` passed 4/4 tests, targeted route verification `npx tsx --test --test-name-pattern "scheduler/mind-steward/(latest-run|failed-items|recovery)" src/tests/routes.test.ts` passed 2/2 tests, queue regression verification `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` passed 16/16 tests, and `npm run typecheck` passed).
- [x] Schedule Graphify refresh where useful (evidence: Brain Core now exposes a plan-only Graphify refresh scheduler surface in `projects/brain-core/src/adapters/graphify-refresh-schedule.ts` and routes it at `GET /scheduler/graphify/refresh-plan` in `projects/brain-core/src/api/routes.ts`; the plan recommends only the report-only Mind and Brain Graphify preflight workflows when their runtime reports are missing, failed, stale, or missing timestamps, treats fresh reports as not useful yet, carries workflow feature-flag metadata, preserves manual-success scheduler gates, and keeps `schedulerEnabled: false`; `projects/brain-core/src/adapters/graphify-status.ts` now has an explicit typed status shape used by the schedule planner, and API contracts were added in `projects/brain-core/src/types/api.ts`; safety properties prove the schedule is plan-only/report-only and does not write to Mind, write target repos, write generated graph output, run Graphify immediately, create scheduler jobs, or start background daemons, while requiring feature flags, manual success before scheduling, and kill-switch honoring; focused tests in `projects/brain-core/src/tests/graphify-refresh-schedule.test.ts` cover missing-report recommendations, fresh-report suppression, stale and failed report recommendations, preserved scheduler blockers, and feature-flag metadata; route tests in `projects/brain-core/src/tests/routes.test.ts` cover the reachable API route and adjacent scheduler job behavior; direct verification on 2026-06-18: `npx tsx --test src/tests/graphify-refresh-schedule.test.ts` passed 4/4 tests, targeted route verification `npx tsx --test --test-name-pattern "scheduler/graphify/refresh-plan|scheduler/jobs" src/tests/routes.test.ts` passed 11/11 tests, adjacent scheduler-gate verification `npx tsx --test src/tests/scheduler-manual-success-gate.test.ts` passed 4/4 tests, and `npm run typecheck` passed).
- [x] Schedule report-only maintenance before approved writes (evidence: Brain Core now exposes a plan-only pre-write maintenance scheduler gate in `projects/brain-core/src/adapters/mind-maintenance-schedule.ts` and routes it at `GET /scheduler/mind-maintenance/report-only-plan` in `projects/brain-core/src/api/routes.ts`; the plan checks `system/reports/maintenance-latest.json`, recommends a report-only maintenance run when the latest report is missing, stale, timestampless, not `report-only`, missing no-write proof, or has detector errors, treats fresh no-write report-only evidence as satisfying the pre-write gate, exposes whether approved writes should remain blocked until a fresh report exists, and preserves the existing `mind-maintenance-report-only` scheduler job gate with `schedulerEnabled: false`; API contracts were added in `projects/brain-core/src/types/api.ts`; safety properties prove the schedule is plan-only/report-only and does not write to Mind, write reports immediately, execute maintenance immediately, create scheduler jobs, or start background daemons, while requiring human approval for writes and requiring report-only maintenance before approved writes; focused tests in `projects/brain-core/src/tests/mind-maintenance-schedule.test.ts` cover missing reports, stale/unsafe reports, fresh valid no-write report-only evidence, invalid timestamps, invalid modes, scheduler blockers, and no-execution safety; route tests in `projects/brain-core/src/tests/routes.test.ts` cover the reachable API route and adjacent scheduler job behavior; direct verification on 2026-06-18: `npx tsx --test src/tests/mind-maintenance-schedule.test.ts` passed 4/4 tests, targeted route verification `npx tsx --test --test-name-pattern "scheduler/mind-maintenance/report-only-plan|scheduler/jobs" src/tests/routes.test.ts` passed 11/11 tests, adjacent maintenance routing verification `npx tsx --test src/tests/mind-maintenance-routing.test.ts` passed 4/4 tests, and `npm run typecheck` passed).

### Acceptance criteria

- runs are observable and interruptible;
- failures do not corrupt Mind;
- system load remains acceptable;
- important changes still require review.

## Phase 9 — Continuous processing

**Goal:** enable near-real-time behavior only where measured value justifies it.

### Tasks

- [x] Select one proven workflow for continuous processing. Completed 2026-06-18: Brain Core now exposes the read-only Phase 9 selection surface in `projects/brain-core/src/adapters/continuous-processing-selection.ts`, routed at `GET /scheduler/continuous-processing/selection` via `projects/brain-core/src/api/routes.ts` with API types in `projects/brain-core/src/types/api.ts`; it selects exactly `scheduler-run-mind-steward-inbox-queue-dry-run` / `mind-steward-inbox-queue-dry-run` as the first continuous candidate while keeping `continuousEnabled:false`, `watcherEnabled:false`, no scheduler creation, no workflow execution, no Mind writes, no capture moves/deletes, no Kanban writes, and basic Mind use independent of continuous processing. Focused tests cover valid selection, blocked manual-success behavior, missing-selected-workflow failure behavior, kill-switch/no-watcher safety, route reachability, and existing queue safety: `npx tsx --test src/tests/continuous-processing-selection.test.ts` (4/4 pass), `npx tsx --test --test-name-pattern "scheduler/continuous-processing/selection" src/tests/routes.test.ts` (1/1 pass), `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` (16/16 pass), and `npm run typecheck` passed.
- [x] Add stable-file detection and debounce. Completed 2026-06-18: Brain Core implements deterministic stable-file detection and debounce in `projects/brain-core/src/adapters/mind-steward-inbox-queue.ts` (stableAt = modifiedAt + debounceSeconds, stable when now >= stableAt, debounceUntil present only while debouncing, only stable files selected for sample), with a read-only visibility view in `projects/brain-core/src/adapters/continuous-processing-stability.ts` routed at `GET /scheduler/continuous-processing/stability` via `projects/brain-core/src/api/routes.ts`, typed in `projects/brain-core/src/types/api.ts`; the view reports stable/debouncing/selectedStable counts, items, and blockers without writing to Mind, moving captures, creating scheduler jobs, or starting daemons; policy enforcement blocks selected debouncing items; legacy persisted state without new fields is safely refreshed; malformed state fails closed; repeated refresh does not duplicate items; existing large-file and handled-item behavior remains intact. Focused tests: `npx tsx --test src/tests/continuous-processing-stability.test.ts` (10/10 pass), `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` (17/17 pass), `npx tsx --test --test-name-pattern "scheduler/continuous-processing/stability" src/tests/routes.test.ts` (1/1 pass), and `npm run typecheck` passed.
- [x] Cap concurrency. Completed 2026-06-18: Brain Core exposes a read-only continuous processing concurrency cap view in `projects/brain-core/src/adapters/continuous-processing-concurrency.ts` routed at `GET /scheduler/continuous-processing/concurrency` via `projects/brain-core/src/api/routes.ts`, typed in `projects/brain-core/src/types/api.ts`; reports maxConcurrentJobs (from queue settings), runningJobs, availableSlots, capReached, and capBlocking without modifying concurrency at runtime; the existing queue policy in `enforceMindStewardInboxQueuePolicy` blocks when running jobs reach the cap; view does not write to Mind, move captures, start daemons, create scheduler jobs, or enable watchers. Focused tests: `npx tsx --test src/tests/continuous-processing-concurrency.test.ts` (6/6 pass), `npx tsx --test --test-name-pattern "scheduler/continuous-processing/concurrency" src/tests/routes.test.ts` (1/1 pass), and `npm run typecheck` passed.
- [x] Add retry exhaustion and failure-buffer behavior. Completed 2026-06-18: Brain Core exposes a read-only continuous processing failure buffer view in `projects/brain-core/src/adapters/continuous-processing-failure-buffer.ts` routed at `GET /scheduler/continuous-processing/failure-buffer` via `projects/brain-core/src/api/routes.ts`, typed in `projects/brain-core/src/types/api.ts`; tracks exhausted items (retries exceeded, routed to brain-runtime-queue-status) and retry-pending items, reports totalFailureBufferCount, and recommends `shouldPauseContinuousProcessing` when exhausted count reaches the configurable threshold (default 5); existing retry exhaustion in `mind-steward-inbox-queue.ts` routes failures through `recordMindStewardInboxQueueFailure`; the view does not clear failures, write to Mind, move captures, start daemons, or enable watchers. Focused tests: `npx tsx --test src/tests/continuous-processing-failure-buffer.test.ts` (6/6 pass), `npx tsx --test --test-name-pattern "scheduler/continuous-processing/failure-buffer" src/tests/routes.test.ts` (1/1 pass), and `npm run typecheck` passed.
- [x] Add large-file nightly fallback. Completed 2026-06-18: Brain Core now implements a plan-only, feature-flagged, disabled-by-default, kill-switch-aware, manual-success-gated large-file nightly fallback scheduler plan in `projects/brain-core/src/adapters/continuous-processing-large-file-fallback.ts`, routed at `GET /scheduler/continuous-processing/large-file-fallback/plan` via `projects/brain-core/src/api/routes.ts`, typed in `projects/brain-core/src/types/api.ts`; the plan reads existing queue state, identifies blocked large files (status `blocked`, lastError `blocked_large_file`), bounds eligible files to `maxFilesPerNightlyRun: 5` within a `02:00-05:00 Europe/Lisbon` nightly window, requires feature flag `BRAIN_CORE_ENABLE_LARGE_FILE_NIGHTLY_FALLBACK_EXECUTION` (default off), respects the execution kill switch, requires manual on-demand success before scheduling eligibility, and returns `schedulerEnabled: false`; a new execution plan candidate `scheduler-run-mind-steward-large-file-nightly-fallback` is registered in `projects/brain-core/src/adapters/execution-plans.ts` with a matching scheduler job in `projects/brain-core/src/adapters/scheduler.ts`; large files remain excluded from continuous processing selection; the plan does not execute, schedule autonomously, write to Mind, move captures, delete captures, write Kanban, create scheduler jobs, or start background daemons; the existing view at `GET /scheduler/continuous-processing/large-file-fallback` is preserved and now reflects feature-flag state; safety gates: feature flag required, kill switch honored, manual success required before scheduling, file-count bounded, plan-only mode. Focused tests: `npx tsx --test src/tests/continuous-processing-large-file-fallback.test.ts` (17/17 pass covering missing state, no large files, continuous exclusion, eligible files in plan, threshold respect, feature-flag blocking, kill-switch blocking, manual-success gates, disabled-by-default, no-execution safety, file-count bounds, and malformed-state fail-closed), `npx tsx --test --test-name-pattern "large-file-fallback" src/tests/routes.test.ts` (2/2 pass), `npx tsx --test src/tests/scheduler-manual-success-gate.test.ts` (4/4 pass), `npx tsx --test src/tests/execution-kill-switch.test.ts` (5/5 pass), `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` (17/17 pass), and `npm run typecheck` passed.
- [x] Measure latency, machine load, and review burden. Completed 2026-06-18: Brain Core measurement adapter rewritten in `projects/brain-core/src/adapters/continuous-processing-measurement.ts` with honest metric names. **Observed metrics:** latency derives from real `firstSeenAt` queue-item timestamps (source: `queue-item-firstSeenAt-timestamps`, reports `oldestPendingAgeSeconds` and `sampleCount`; null with blockers when no stable pending items exist; invalid timestamps fail closed); machine load reports a bounded one-time `process.memoryUsage()` sample (`processRssBytes`, `processHeapUsedBytes`, `sampledAt`; source: `process.memoryUsage-one-time-sample`); review burden reports `pendingReviewCount` from queue items with status `reported`, `failedNeedingReviewCount` from status `failed`, and `approvedCount`/`rejectedCount`/`pendingApprovalCount` from the approval store when available (source: `queue-status-reported-items-and-approval-store`; null counts with `approvalStoreUnavailableOrDisabled` blocker when store is disabled). **Configuration (separate section):** `maxConcurrentJobs`, `maxFilesPerRun`, `maxRetries`, `debounceSeconds`, `minimumSecondsBetweenRuns` — clearly labeled as configuration, not measurement. **Value assessment:** status `not-proven`; blockers: `noBaselineComparisonAvailable`, `noBeforeAfterTimeSavingsEvidence`. **Unavailable evidence:** CPU usage delta (not collected — would require always-on monitoring); event-loop delay (not collected); review latency (no timestamps on approval decisions); comparative before/after time savings (no baseline exists). Missing evidence returns null with explicit blockers, never zero. No automatic collection loop, no daemon, no watcher. API types updated in `projects/brain-core/src/types/api.ts`. Tests: `npx tsx --test src/tests/continuous-processing-measurement.test.ts` passed 12/12 (covers: missing state returns null with blockers; missing evidence never zero; latency from real timestamps; invalid timestamps fail closed; machine load is process memory not queue counts; process sample bounded; configuration separate from measurements; review burden from real records; unavailable approval store reports blockers not zero; value assessment not-proven; read-only safety; queue state unchanged). Route: `npx tsx --test --test-name-pattern "measurement" src/tests/routes.test.ts` passed 1/1. Queue regression: `npx tsx --test src/tests/mind-steward-inbox-queue.test.ts` passed 17/17. `npm run typecheck` passed. **"Meaningful time savings" remains unproven** — the Phase 9 acceptance criterion is not yet satisfied.
- [x] Document disable/recovery procedure. Completed 2026-06-18 (corrected 2026-06-18): The adapter in `projects/brain-core/src/adapters/continuous-processing-disable-recovery.ts` documents a 4-step disable procedure and 6-step recovery procedure; the documentation route at `GET /scheduler/continuous-processing/disable-recovery` is read-only (view safety: readOnly=true, disablesContinuousProcessing=false, runsWorkflowNow=false); environment/feature-flag operator steps correctly classify mutatesState:true; GET verification/review steps classify mutatesState:false; the procedure does not automatically perform any step. **Corrections applied:** (1) recovery step 3 now states factual on-demand-run semantics — accepted:false while kill switch enabled, accepted:false for unsupported workflow, accepted may be true for supported workflow after kill switch removed, executed remains false, separate approval/execution gates apply; (2) recovery step 4 split into distinct operator steps: step 4 removes kill switch only, step 5 decides feature flag independently, step 6 verifies remaining gates; (3) absolute "No data is lost" claim removed — replaced with factual: documentation view does not mutate state, GET steps do not move/delete captures, POST returns executed:false, later approved execution governed by its own contracts, queue state not deleted by kill switch toggle; (4) blockers:[] retained as static documentation design — endpoint-specific availability checked when each endpoint is called. **Evidence:** (1) accepted request does not imply approval granted (test); (2) accepted request has executed:false (test); (3) active kill switch blocks request (test); (4) unsupported workflow blocks request (test); (5) removing kill switch does not enable execution (test); (6) feature flag state independent of kill switch (test); (7) read-only steps non-mutating (test); (8) configuration steps mutating (test); (9) view executes none of documented actions (test); (10) static empty blockers match documentation design (test); (11) no absolute no-data-loss claim (test). Tests: `npx tsx --test src/tests/continuous-processing-disable-recovery.test.ts` passed 35/35, `npx tsx --test src/tests/execution-kill-switch.test.ts` passed 5/5, `npx tsx --test src/tests/on-demand-runs.test.ts` passed 4/4, `npx tsx --test src/tests/scheduler-manual-success-gate.test.ts` passed 4/4, route test passed 1/1, and `npm run typecheck` passed.

### Acceptance criteria

- the workflow saves meaningful time;
- no duplicate processing occurs;
- the system can be disabled immediately;
- continuous behavior does not become required for basic Mind use.

## Phase 10 — Simplification review

**Goal:** remove complexity that did not prove valuable.

### Tasks

- [x] Count top-level folders and maximum useful depth. Completed 2026-06-18 (corrected 2026-06-18): The simplification-review adapter at `projects/brain-core/src/adapters/simplification-review.ts` now separates observed physical depth from any useful-depth recommendation, and reports explicit scan completeness evidence (`scanComplete`, `unreadablePaths`, `blockers`). **Observed facts (current Mind, 2026-06-18, scan complete, no unreadable paths):** 10 top-level folders (`archive`, `capture`, `graphify-out`, `live`, `router`, `sources`, `system`, `tasks`, `tools`, `wiki`); observed maximum physical depth = 6 (relative to Mind root = depth 0, direct child = depth 1); directory count by depth: {1: 10, 2: 30, 3: 43, 4: 18, 5: 54, 6: 9}; deepest paths (all depth 6): `archive/old/legacy-03-projects/cedula/meetings/summaries`, `archive/old/legacy-03-projects/cedula/meetings/transcripts`, `archive/old/legacy-06-resources/research/sources/{books,drive-exports,papers,pdf,web}`, `sources/research/apologetics/atheism-dialogue-001/archive/weak-first-pass`, `wiki/organisations/prochat/youtube/channel/scripts`. **Scan completeness:** `scanComplete: true`; `unreadablePaths: []`. Physical depth is not a useful-depth recommendation. **Recommendation:** `recommendedMaximumUsefulDepth: null`; `recommendationStatus: insufficient-evidence`; blockers: `noNavigationDepthMeasurementFromHomeOrIndexes`, `noMaintenanceCostEvidenceByDepth`, `noUsabilityEvidenceByDepth`. **Removed:** `Math.min(maxDepth, 4)` arbitrary cap. **Fail-closed semantics:** missing root → `status: 'missing'` + `mindRootMissingOrUnreadable`; root readdir failure → `rootReaddirFailed` + no zero folder count; nested unreadable dir → `scanComplete: false` + relative `unreadablePaths` entry + useful-depth recommendation remains null. **Changed files:** `projects/brain-core/src/adapters/simplification-review.ts`, `projects/brain-core/src/types/api.ts` (added `scanComplete`, `unreadablePaths` to `BrainCoreSimplificationReviewFolderStructure`; updated inbox-age and maintenance-backlog types), `projects/brain-core/src/tests/simplification-review.test.ts` (21 new focused tests), `projects/brain-core/src/tests/routes.test.ts` (updated route assertion). **Tests:** `npx tsx --test src/tests/simplification-review.test.ts` passed 41/41; `npx tsx --test --test-name-pattern "simplification-review" src/tests/routes.test.ts` passed 1/1; `npm run typecheck` passed. No filesystem mutations occurred.
- [x] Review navigation paths from `home.md`. Completed 2026-06-18: The simplification review adapter in `projects/brain-core/src/adapters/simplification-review.ts` parses `[[wikilinks]]` from `home.md`, resolves them against the Mind filesystem (checking `.md`, directory, `index.md`, and `README.md` variants), and reports homeExists, linksChecked, brokenLinkCount, and brokenLinks; does not modify `home.md` or any navigation structure. Covered by the same test suite above.
- [x] Measure inbox age and maintenance backlog. Completed 2026-06-18 (corrected 2026-06-18): The simplification-review adapter now measures `inboxAge` and `maintenanceBacklog` as separate top-level structures. **Inbox age (observed 2026-06-18 from current Mind checkout, now=2026-06-18T12:00:00Z):** `status: available`; `captureCount: 18`; `oldestAgeHours: 401`; `newestAgeHours: 287`; `validTimestampCount: 18`; `invalidTimestampCount: 0`; `source: capture/inbox`; `blockers: []`. **Timestamp policy:** future timestamps fail closed (counted as invalid, not zero age); invalid timestamps do not become zero age; missing inbox is `status: missing` with null counts — not an apparent empty inbox; empty readable inbox is `captureCount: 0` with null age values; age is exact hours floored to whole hours. Hidden files excluded per canonical policy. **Maintenance backlog (observed 2026-06-18 from current Mind checkout):** `status: available`; `validFindingCount: 0`; `malformedFindingCount: 0`; `unresolvedFindingCount: 0`; `validDecisionCount: null`; `malformedDecisionCount: null`; `pendingDecisionCount: null` (decision store absent — `null` means the optional store was not present, not that zero decisions exist); `failedFindingCount: 0`; `overdueMaintenanceCount: null`; `source: [system/reports/maintenance-latest.json]`; `blockers: []`. **Schema used:** `system/maintenance-report-contract.md` contract version 1.0; canonical finding statuses: `open`, `accepted`, `dismissed`, `resolved`, `superseded`; `open` and `accepted` count as unresolved; `dismissed`, `resolved`, `superseded` are excluded. **Fail-closed behavior:** malformed finding entries add `maintenanceFindingsMalformed` blocker and are tracked in `malformedFindingCount`; unknown finding status is malformed, not silently open; missing `errors` field adds `maintenanceErrorsFieldMissing` and sets `failedFindingCount: null`; absent optional decision store yields `pendingDecisionCount: null` with no blocker; a present but malformed decision store adds `maintenanceDecisionStoreMalformed` blocker; malformed decision entries add `maintenanceDecisionsMalformed` and are tracked in `malformedDecisionCount`; any blocker causes `status: partial`. **Corrections applied:** (1) malformed finding entries are no longer silently skipped — they add a blocker and are tracked; (2) malformed decision entries are no longer silently skipped; (3) missing `errors` field now produces a blocker and `failedFindingCount: null` instead of `null` silently; (4) findings without a canonical status are malformed, not silently counted as open; (5) `pendingDecisionCount: null` correctly means the optional store was absent, not zero or empty evidence; (6) the old claim "absent document treated as empty" was incorrect and has been removed. **Changed files:** `projects/brain-core/src/adapters/simplification-review.ts`, `projects/brain-core/src/types/api.ts` (added `validFindingCount`, `malformedFindingCount`, `validDecisionCount`, `malformedDecisionCount` to `BrainCoreSimplificationReviewMaintenanceBacklog`), `projects/brain-core/src/tests/simplification-review.test.ts` (13 new focused corrective tests). **Tests:** `npx tsx --test src/tests/simplification-review.test.ts` passed 64/64; `npx tsx --test --test-name-pattern "simplification-review" src/tests/routes.test.ts` passed 1/1; `npm run typecheck` passed. **Read-only safety:** no Mind files created, modified, moved, or deleted; no report generation; no maintenance execution; no decisions recorded; no scheduler creation; no daemon or watcher.
- [x] Review false-positive rates. Completed 2026-06-18 (corrective audit): The adapter in `projects/brain-core/src/adapters/simplification-review.ts` reads the measurement report, extracts rates, and fails closed (returns `measured: false`) when: the report file is missing, expected regex fields do not match, parsed values are non-finite, or the negative-case denominator is zero. Focused tests in `projects/brain-core/src/tests/simplification-review.test.ts` prove five fail-closed paths (missing file, malformed content, zero denominator, non-numeric values) and one valid-measurement success path. Direct verification: `npx tsx --test src/tests/simplification-review.test.ts` passed 10/10 tests and `npm run typecheck` passed.
- [x] Review approval volume. Completed 2026-06-18 (provenance-corrected 2026-06-18): **Canonical approval surface reviewed:** Brain Core workflow approval persistence, implemented in `projects/brain-core/src/adapters/approval-store.ts`. The persistent store is enabled only when `BRAIN_CORE_APPROVAL_STORE_PATH` is set; when absent, `readApprovalStore()` returns `enabled: false, status: 'memory'`. **Provenance correction applied:** the prior implementation used a hardcoded path without checking whether persistence was configured, causing it to conflate "persistence not configured" with "store missing." These are distinct states with different causal interpretations. **Correct design:** `measureApprovalVolume` now uses `getApprovalStorePath()` from `approval-store.ts` to determine whether persistence is configured before inspecting any file. **Resulting schema:** `persistenceConfigured` (bool), `configuredStorePath` (string | null), `storeStatus` (`not-configured` | `configured-missing` | `configured-readable` | `configured-malformed`), `evidenceAvailability` (`none` | `partial` | `full`), plus all count fields and `blockers`. **Case semantics:** (1) no configured persistent store → `status: insufficient-evidence`, `blocker: approvalPersistenceNotConfigured`, counts null — does NOT say "no approvals exist"; (2) configured path missing → `status: insufficient-evidence`, `blocker: approvalStoreMissing`, counts null — does NOT say "no approvals were ever submitted"; (3) readable empty configured store → `status: available`, all counts zero; (4) malformed store → `status: insufficient-evidence`, `storeStatus: configured-malformed`, counts null; (5) readable records → counts accurate per canonical status, deduplicated by stable ID. **Observed approval evidence (2026-06-18, observed checkout):** `persistenceConfigured: false` — `BRAIN_CORE_APPROVAL_STORE_PATH` is not set in the observed environment; therefore `status: insufficient-evidence`, `storeStatus: not-configured`, `blockers: ['approvalPersistenceNotConfigured']`, all counts null. The Brain Core workflow approval persistence surface reviewed for this task was the only configured persistent store. No configured or readable persistent evidence was available in the observed checkout; therefore approval volume cannot be concluded from persistent evidence. **Removed unsupported statements:** "no workflow approvals have been submitted yet" and "No other canonical approval store exists" have been removed — a missing or unconfigured persistent store does not prove no approvals ever existed. **Test injection:** `_testOnlyApprovalStorePath` and `_testOnlyPersistenceConfigured` allow deterministic testing of all cases without mutating `process.env`. **Changed files:** `projects/brain-core/src/adapters/simplification-review.ts` (import `getApprovalStorePath`, replace hardcoded path with persistence-aware resolution, update `measureApprovalVolume` signature and semantics, update `ApprovalVolumeResult` with new fields, update null approval volume and final return), `projects/brain-core/src/types/api.ts` (added `persistenceConfigured`, `configuredStorePath`, `storeStatus`, `evidenceAvailability` to `BrainCoreSimplificationReviewApprovalVolume`), `projects/brain-core/src/tests/simplification-review.test.ts` (10 new focused provenance-correct approval-volume tests). **Tests:** `npx tsx --test src/tests/simplification-review.test.ts` passed 73/73; `npx tsx --test --test-name-pattern "simplification-review" src/tests/routes.test.ts` passed 1/1; `npm run typecheck` passed. **Read-only safety:** no files created, modified, or deleted; no approvals submitted; no writes; no daemon or watcher.
- [x] Remove redundant reports, metadata, or indexes. Completed 2026-06-18 (bounded evidence review only — no destructive action). **Scope reviewed:** `system/reports/**` (15 files), `system/reports/README.md` (canonical index), `system/README.md` (canonical system index). **Review methodology:** direct file reads, canonical inbound reference grep across `system/`, and content comparison for likely duplicates. **Candidate list and retention decisions:**
  - `system/reports/README.md` — **retain**. Canonical policy contract for the reports surface; hand-maintained; defines report-only boundary, finding states, surface requirements. Not a generated artifact.
  - `system/reports/maintenance-latest.json` — **retain**. Canonical machine-readable latest run per `maintenance-report-contract.md`; referenced in 5+ canonical documents; will be replaced by the next successful run.
  - `system/reports/maintenance-latest.md` — **retain**. Canonical human-readable projection of latest run; paired with JSON per contract; referenced in same canonical documents.
  - `system/reports/graph-refresh-latest.json` — **retain**. Current-state graphify refresh evidence; referenced in `automation-roadmap.md`.
  - `system/reports/graph-refresh-latest.md` — **retain**. Human-readable companion to graph-refresh JSON; current-state evidence.
  - `system/reports/kanban-inventory-2026-06-06.md` — **retain**. Historical lossless pre-redesign Kanban snapshot; referenced in `system/README.md`, `task-kanban-contract.md`, and `task-sync-spec.md` as migration baseline evidence. Three canonical inbound references.
  - `system/reports/mind-inventory-2026-06-06.md` — **retain**. Structural dependency inventory for cleanup planning; referenced in `system/README.md`. Still useful as historical baseline for future folder changes.
  - `system/reports/mind-cleanup-final-handoff-2026-06-07.md` — **retain**. Completed-phase summary, source-of-truth rules, remaining roadmap at 2026-06-07; referenced in `system/README.md`. Historical record.
  - `system/reports/mind-cleanup-phase-summary-2026-06-06.md` — **candidate-redundant** (requiresHumanApproval). Not referenced from `system/README.md` or any other canonical index found in grep. Appears to be a precursor to `mind-cleanup-final-handoff-2026-06-07.md`. Content overlap observed. No safe deletion without human review.
  - `system/reports/realtime-inbox-dependency-check-2026-06-06.md` — **insufficient-evidence** (requiresHumanApproval). Not referenced from canonical indexes. Topic (realtime inbox deps) is referenced in spec docs but no inbound link found to this specific file. May be supporting evidence for realtime specs or may be safely removable. Human review required to confirm.
  - `system/reports/brain-console-mind-steward-visibility-plan-2026-06-07.md` — **insufficient-evidence** (requiresHumanApproval). Not referenced from canonical indexes. It is a Phase 8 planning snapshot; unclear whether content is superseded by current system docs or still an active reference. Human review required.
  - `system/reports/maintenance-pilot-expected-report.md` — **retain**. Operational contract: expected report shape example for the first pilot; referenced in `maintenance-brain-implementation-handoff.md` as a direct dependency.
  - `system/reports/maintenance-pilot-fixture.md` — **retain**. Operational contract: five-file bounded pilot dataset; referenced in `maintenance-brain-implementation-handoff.md`, `mind-implementation-plan.md`, and `runbooks/maintenance-report-pilot-runbook.md`. Three canonical inbound references.
  - `system/reports/maintenance-history/2026-06-17-false-positive-measurement.md` — **retain**. Referenced in `mind-implementation-plan.md` as evidence; read at a hardcoded path by the `simplification-review` adapter — removing it would break FP measurement.
  - `system/reports/maintenance-history/2026-06-17-human-usefulness-feedback.md` — **retain**. Referenced in `mind-implementation-plan.md` as canonical human review outcome. Preserves Steve's reviewed judgment.
  **No destructive action occurred.** Three files require human approval before any further action: `mind-cleanup-phase-summary-2026-06-06.md` (candidate-redundant), `realtime-inbox-dependency-check-2026-06-06.md` (insufficient-evidence), `brain-console-mind-steward-visibility-plan-2026-06-07.md` (insufficient-evidence).
- [x] Archive superseded system specs. Completed 2026-06-18 (bounded classification review only — no file moved or archived). **Scope reviewed:** all 22 `system/*.md` files compared against the canonical chain (`infinite-brain-philosophy.md` → `mind-strategy.md` → `mind-roadmap.md` → `mind-implementation-plan.md`) and against `system/README.md` as the canonical index. **Review methodology:** direct file reads of status/depends-on frontmatter, `system/README.md` cross-reference check, and grep for superseding documents. **Per-file classification:**
  - `infinite-brain-philosophy.md` — **canonical-current**. Status: "canonical philosophy"; leads the chain; directly referenced by all other canonical docs. No superseding document found.
  - `mind-strategy.md` — **canonical-current**. Status: "canonical strategy"; depends on philosophy; directly linked from README chain.
  - `mind-roadmap.md` — **canonical-current**. Status: "canonical roadmap"; depends on strategy; directly linked from README chain.
  - `mind-implementation-plan.md` — **canonical-current**. Status: "canonical implementation plan"; depends on roadmap; directly linked from README chain.
  - `README.md` — **canonical-current**. System index; references the four canonical docs and all current contracts; regularly maintained.
  - `brain-mind-bridge.md` — **subordinate-current**. Status: "canonical bridge contract"; depends on canonical chain; listed in README contracts; referenced in multiple system docs.
  - `knowledge-freshness-standard.md` — **subordinate-current**. Status: "canonical standard"; listed in README contracts; referenced in maintenance chain.
  - `maintenance-intelligence-standard.md` — **subordinate-current**. Status: "canonical report-only standard"; listed in README contracts; defines detector behavior rules.
  - `maintenance-report-contract.md` — **subordinate-current**. Status: "canonical implementation contract"; listed in README contracts; defines the machine-readable report schema. Actively used by Brain adapters.
  - `automation-contract.md` — **subordinate-current**. Listed in README; records current automation boundary. Describes Save-to-Mind, Mind Steward, AI Model Selector, and capture-processing boundary.
  - `automation-roadmap.md` — **subordinate-current**. Status: "technical automation sub-roadmap"; depends on canonical chain; listed in README.
  - `realtime-inbox-processing-spec.md` — **operational-contract**. Listed in README; future spec — does not enable real-time processing yet; defines safe boundary. Not superseded by current docs.
  - `inbox-queue-throttle-spec.md` — **operational-contract**. Listed in README; future spec for queue/throttle/retry behavior required before real-time processing. Not superseded.
  - `folder-contract.md` — **operational-contract**. Listed in README; defines top-level folder meanings and root cleanliness rules. Actively enforced.
  - `task-kanban-contract.md` — **operational-contract**. Listed in README; defines kanban.md as current source-of-truth and no-data-loss migration boundary.
  - `task-sync-spec.md` — **operational-contract**. Listed in README; safe future task sync spec; does not change current behavior.
  - `graph-visualization-contract.md` — **operational-contract**. Listed in README; records current Graphify output reality and safe visual graph boundary.
  - `graph-visualization-spec.md` — **operational-contract**. Listed in README; safe future visual graph implementation spec.
  - `graphify-strategy.md` — **subordinate-current**. Listed in README; Mind-owned strategy for Graphify usage.
  - `generated-output-policy.md` — **subordinate-current**. Listed in README; governs generated Graphify output and capture inbox handling.
  - `maintenance-brain-implementation-handoff.md` — **subordinate-current** (not listed in README; no inbound references from other system docs found outside the file itself). Captures bounded pilot implementation scope for Brain. Content may be operationally complete but is not proven superseded — it still describes implementation requirements that may still apply. Requires human review before any archival action. **requiresHumanApproval.**
  - `InfiniteBrainWriteTest.md` — **unrelated/current**. Small test artifact ("verified" status in frontmatter). No inbound references found in system. Not referenced in README. Purpose is evidently a controlled write test rather than a specification. Not a superseded spec — it is a different kind of artifact. **requiresHumanApproval** if removal is considered.
  **No files moved or archived.** Zero files are proven superseded from bounded evidence. Two files require human review before any action: `maintenance-brain-implementation-handoff.md` (not in README, no inbound refs, but content not proven obsolete), `InfiniteBrainWriteTest.md` (not a spec, purpose unclear). The canonical wording "Archive superseded system specs" is satisfied by confirming that no specs are proven superseded in this bounded review. All changes remain pending human decision.
- [x] Update philosophy, strategy, roadmap, and implementation plan with validated learning. Completed 2026-06-18 (corrected 2026-06-18). **Validated learning incorporated (only evidence actually established in Phase 9 and Phase 10):**
  - Continuous processing remains disabled by default; safe queue controls now exist (implemented in Phase 9 adapters; confirmed read-only safety via `continuousEnabled: false` in all API safety contracts).
  - Continuous behavior is optional; basic Mind use does not depend on it.
  - Large-file handling is plan-only — Phase 9 implemented the nightly fallback plan adapter, not active autonomous large-file processing.
  - Process memory is sampled (`continuous-processing-measurement.ts`), but meaningful time savings relative to manual processing remain unproven; missing evidence returns null, never zero.
  - Useful folder depth could not be defensibly prescribed — `recommendedMaximumUsefulDepth: null` with `recommendationStatus: insufficient-evidence` in every observed run; physical max depth and useful depth are distinct concepts.
  - Absent evidence must remain null, not zero — approval volume, pending decisions, and failed findings are null when stores are absent or unconfigured; not described as zero.
  - Simplification reviews are bounded and evidence-based; all report-only; no destructive simplification occurs without human approval; a bounded review may validly conclude that no deletion or archival is justified.
  - Approval-volume evidence depends on configured persistent store; when persistence is not configured, the result is `status: insufficient-evidence` with `approvalPersistenceNotConfigured` blocker — not a zero count; absent persistent evidence does not prove no approvals have ever occurred.
  - Automation should be retained only when value is demonstrated; meaningful time savings and reduced maintenance burden remain unproven.
  - No redundant files were deleted in Phase 10 (three candidates remain pending human approval).
  - No superseded specs were archived (zero specs proven superseded; two files require human review).
  **Documents changed in this task (actual diffs):**
  - `system/infinite-brain-philosophy.md` — added two human-first rules: continuous automation is optional and disabled by default; automation is retained only when value is demonstrated. Added evidence-honesty as shared law 10. Renumbered "Keep the system calm" to law 11. Added a clarifying note to the cross-repo consistency section. Added physical-vs-useful-depth statement to the Simplicity boundary section.
  - `system/mind-strategy.md` — added four new subsections under the Automation strategy section: Continuous processing rules (disabled by default, gated, plan-only, current implementation), Operational validation requirement (automation retained only when value demonstrated; unproven claim must remain visible), Simplification strategy (physical depth ≠ useful depth; no destructive action without approval), Approval evidence rule (persistent approval volume; absent evidence ≠ zero count).
  - `system/mind-roadmap.md` — added Phase 9 verified outcome block (implemented safety capability confirmed; unresolved acceptance criteria listed). Added Phase 10 verified outcome block (confirmed/partially supported/unresolved acceptance criteria listed). Added Post-plan operational validation work section (five items; explicitly not a new phase).
  - `system/mind-implementation-plan.md` (this file) — corrected Task 8 evidence to list actual diffs across all four canonical documents. Replaced stale "First implementation batch" section with "Post-plan operational validation" section. Corrected definition of done to match actual and intended behavior. Added Phase 9/10 close-out acceptance status block.
  **What was NOT claimed:** meaningful time savings proven; full machine load measured; all approvals absent; redundant files deleted; specs archived; all retained automation has demonstrated operational value. The stale-page detector's required freshness-metadata positive case is now validated, but broader maintenance value still requires operational evidence.

### Acceptance criteria

- Mind remains human-readable and calm;
- Steve spends less time maintaining the system;
- every retained automation has demonstrated value;
- the canonical documentation matches actual behavior.

## Post-plan operational validation

_Historical note: the "First implementation batch" items (update `system/README.md` and `home.md`; create `brain-mind-bridge.md`; create `knowledge-freshness-standard.md`) were completed in Phases 0–3. This section replaces that stale future-facing block._

The following validation work is needed to determine whether Phase 9/10 acceptance criteria are satisfied. This is not a new phase — it is the operational evidence collection that the implementation plan is waiting for:

1. collect before/after maintenance-time evidence;
2. continue monitoring stale-page detector quality after deterministic validation of the required freshness-metadata positive case;
3. conduct a bounded real continuous-processing trial only after explicit approval and approval store configuration;
4. review the five human-decision file candidates listed under Phase 10 Tasks 7–8;
5. keep continuous execution disabled until value and safety are demonstrated.

## Post-plan improvement implementation backlog

These tasks came from two reviews: the Infinite Brain OS repository review and the OODA / Infinite Brain transcript review. They are not authorized implementation work yet; each task must be selected, scoped, validated, and approved before code or workflow changes are made.

### Task A — Brain-owned Mind structural validator/report

Goal: create a lightweight report-only validator for the exact Mind structure Steve depends on, without imposing a full typed ontology on every note.

Initial checks to design:

- required startup and workflow files exist (`home.md`, `kanban.md`, `wiki/log.md`, `router/00-current-context.md`, `router/00-memory-map.md`, `capture/inbox/`, `capture/failed/`);
- maintenance pilot configured paths exist and match real Mind;
- latest maintenance report JSON and Markdown exist and are parseable;
- freshness metadata is parseable where present;
- Graphify output path naming is consistent (`graphify-out/` versus `.graphify-out/`);
- generated/runtime files are not mistaken for durable Mind truth.

Acceptance evidence:

- report-only output;
- no Mind source writes;
- clear pass/warn/fail status;
- focused tests for missing required paths and stale Graphify naming.

Implementation handoff (2026-07-05):

- Status: implemented in Brain Core as a report-only validator module and CLI; no Mind writes are performed.
- Brain module: `projects/brain-core/src/mind-structure-validator/validator.ts`.
- Brain CLI: `projects/brain-core/src/bin/mind-structure-validator.ts`.
- Package script: `test:mind-structure-validator`.
- Output: JSON report with schema version, generated metadata, overall `pass | warn | fail` status, check summary, individual checks, and safety block (`noWritePerformed: true`, `sourceFilesChanged: 0`, `reportOnly: true`).
- CLI usage from local Brain terminal: `node projects/brain-core/dist/bin/mind-structure-validator.js --mind-root ../mind --generated-by "<name>"`.
- Validation evidence: `test:mind-structure-validator` passed 4/4 tests; `typecheck` passed 0 errors; CLI `--help` printed usage and changed no files.
- Safety boundary: this does not authorize continuous processing, durable Mind writes, report-file writes, path migration, Graphify refresh, or cleanup of generated/local files.

### Task B — Lightweight session closeout receipts

Goal: prevent forgotten branches, hidden dirty state, and lost decisions after significant AI/repo work.

Design a small receipt pattern before implementation. Each closeout should capture:

- date and repo;
- branch and commit range;
- changed files;
- validation evidence;
- remaining dirty files;
- decisions made;
- exact next task;
- what must not be forgotten.

Do not require a full transcript archive unless later evidence shows it is useful.

Implementation handoff (2026-07-05):

- Status: implemented as a Mind-owned lightweight template; ready for human use, with operational usefulness to be reviewed after several real closeouts.
- Template: `system/session-closeout-receipt-template.md`.
- Default receipt destination: `wiki/log.md`.
- Optional later destination, only if receipts become too long for `wiki/log.md`: `system/session-closeouts/YYYY-MM-DD-short-title.md`.
- Captures: date, repo, branch before/after, commit range, commits, changed files, validation evidence, remaining dirty files, decisions made, exact next task, and do-not-forget items.
- Validation evidence: template created and verified on disk; documentation-only change; no transcript archive, automation, or tooling was added.
- Safety boundary: a receipt records what happened; it does not authorize new writes, cleanup, branch deletion, secret storage, or broad commits.

### Task C — Processed-capture receipts

Goal: make capture outcomes auditable when inbox volume grows.

Design first; do not move files yet. A processed-capture receipt should record whether a capture was ignored, summarized, promoted to durable knowledge, converted into a task, or left pending, plus the destination and approval evidence.

This remains optional until capture volume or lost-context risk justifies it.

Implementation handoff (2026-07-05):

- Status: implemented as a Mind-owned lightweight template; ready for optional human use when capture volume or lost-context risk justifies it.
- Template: `system/processed-capture-receipt-template.md`.
- Default receipt destination: `wiki/log.md`.
- Optional later destination, only if capture processing becomes too noisy for `wiki/log.md`: `system/capture-receipts/YYYY-MM-DD-short-source.md`.
- Captures: capture path, source type/name, outcome, destination paths, approval requirement/status/reference, reason, summary, evidence, follow-up task, and do-not-forget items.
- Outcome vocabulary: ignored, summarized, promoted to knowledge, converted to task, project update proposed, maintenance finding, source rejected, left pending, or merged with other capture.
- Validation evidence: template created and verified on disk; documentation-only change; no capture files were moved, deleted, processed, archived, or rewritten.
- Safety boundary: a processed-capture receipt records an outcome; it does not authorize promotion, deletion, archive, durable writes, or broad ingestion automation.

### Task D — Runtime/system-config ownership audit

Goal: separate canonical configuration from generated adapter shims, live local machine state, logs, and machine-specific files under Brain `operations/system-configs/**`.

Design questions:

- which files are canonical and should be committed;
- which files are generated and should be reproducible;
- which files are local runtime state and should remain uncommitted;
- which adapters should be regenerated from canonical config rather than hand-edited.

No reset, clean, delete, or broad ignore change is authorized by this task alone.

Implementation handoff (2026-07-05):

- Status: implemented as a Brain-owned documentation-only audit baseline; no cleanup, ignore migration, symlink changes, binary edits, or runtime-state commits were performed.
- Audit document: `brain/operations/specs/runtime-system-config-ownership-audit.md`.
- Ownership classes defined: canonical portable config, canonical templates/generated-from-canon inputs, generated adapter shims/reproducible exports, intentionally synced runtime state, local-only machine state, binary/application bundles, and unknown/pending classification.
- Current recurring dirty-state pressure recorded as evidence only: `.graphifyignore`, `operations/system-configs/claude/**`, `operations/system-configs/codex/**`, and `tools/firecrawl/logs/firecrawl.log`.
- Recommended next follow-up: create a path-by-path classification table for recurring dirty paths, still report-only unless Steve separately approves exact-path ignore or cleanup proposals.
- Validation evidence: audit document created and verified on disk; documentation-only change; no dirty runtime/system files were staged, cleaned, reset, or modified by the audit.
- Safety boundary: this audit does not authorize reset, clean, stash, delete, broad ignore changes, binary bundle commits, symlink replacement, adapter regeneration, or committing currently dirty local/runtime files.

### Task E — Orientation-layer briefs

Goal: strengthen Mind as Brain's orientation layer without making Steve maintain a complex ontology.

Design compact briefs for the information Brain needs before acting:

- current context;
- strategy and priorities;
- constraints and non-negotiables;
- trusted sources/thinkers;
- active projects and status;
- decision principles;
- relevant evidence links.

The brief should be retrieved from existing Mind surfaces where possible, not duplicated into a new large folder structure.

Implementation handoff (2026-07-05):

- Status: implemented as a Mind-owned lightweight template; ready for optional human/Brain use before significant context-sensitive work.
- Template: `system/orientation-brief-template.md`.
- Source mapping: current context, memory map, home, kanban, wiki log, live dashboard, strategy/roadmap/implementation plan, Brain/Mind bridge, latest maintenance report, relevant `wiki/`, and relevant `sources/`.
- Captures: purpose, scope, source references, current context, strategy/priorities, constraints, trusted sources/thinkers, active projects/status, decision principles, evidence links, unknowns/gaps, recommended next action, and approval requirement.
- Validation evidence: template created and verified on disk; documentation-only change; no source pages were duplicated, rewritten, or promoted as truth.
- Safety boundary: an orientation brief orients work; it does not approve durable writes, override current evidence, replace source pages, or permit broad context copying.

### Task F — Intake-disposition pattern

Goal: define how observations become outcomes before building more ingestion automation.

An intake item may be routed to:

- ignore/archive;
- deterministic action;
- knowledge proposal;
- task proposal;
- project update proposal;
- maintenance finding;
- source-quality rejection.

Durable writes remain human-approved. Deterministic and cheap-model routing should be preferred for simple cases; stronger models should be reserved for high-context orientation tasks.

Implementation handoff (2026-07-05):

- Status: implemented as a Mind-owned lightweight pattern; ready for optional human/Brain use before adding more ingestion automation.
- Pattern document: `system/intake-disposition-pattern.md`.
- Routing outcomes defined: ignore/archive, deterministic action, knowledge proposal, task proposal, project update proposal, maintenance finding, source-quality rejection, and left pending.
- Model-routing guidance documented: deterministic rules first, cheap model for simple low-risk classification, stronger model only for high-context/strategic/ambiguous work, and human review whenever durable truth, tasks, projects, or business decisions could change.
- Captures: source path/type/name, observation summary, primary disposition, routing layer, confidence, reason, recommended destination, affected paths, approval status, evidence, source-quality notes, next action, and no-write-performed flag.
- Validation evidence: pattern created and verified on disk; documentation-only change; no ingestion automation, capture moves, task writes, project writes, or durable Mind writes were added.
- Safety boundary: a disposition is routing, not approval; archive/delete, knowledge promotion, task writes, project updates, and fixes still require exact-path approval.

### Task G — Source-quality gates

Goal: prevent mediocre or untrusted inputs from becoming durable orientation just because they were ingested.

Design criteria for promotion from transcript/newsletter/email/meeting/source into durable Mind knowledge:

- source trust;
- relevance to Steve's current projects or strategy;
- evidence quality;
- freshness risk;
- expected reuse value;
- human approval requirement.

### Task H — Wager/verdict pattern

Goal: add a lightweight scientific-method layer for significant business or workflow changes.

Before major changes, a proposal may include:

- expected improvement;
- metric or observable evidence;
- measurement window;
- risk and reversibility;
- affected components;
- planned verdict date.

After the window, record a verdict:

- improved / neutral / worsened / insufficient evidence;
- evidence used;
- whether to retain, revert, or adjust the change.

This should start as manual/report-only and must not require a business-intelligence database before proving value.

## Definition of done

The implementation is successful when:

```text
Mind can support safe, approved continuous capture processing when enabled,
while remaining fully usable without continuous automation —
keeping current truth visible,
turning reviewed insight into durable knowledge,
retrieving relevant context quickly,
flagging stale or conflicting knowledge,
preserving history,
and improving through safe human-approved use —
without becoming harder for Steve to read or navigate.
```

## Phase 9/10 close-out status

### Satisfied

- canonical documentation matches implemented behavior;
- no destructive simplification occurred;
- continuous processing remains optional and disableable.

### Partially supported

- Mind remains human-readable and calm (structure is unchanged; no folder depth was added).

### Unresolved

- meaningful time savings are not yet proven;
- Steve spends less time maintaining the system: not yet demonstrated;
- every retained automation has demonstrated value: not yet satisfied (time savings have no baseline; broader maintenance value needs operational evidence);
- stale-page detector recall for the required freshness-metadata positive case is validated by Brain's deterministic `mind-maintenance-pilot-loader-stale` test, including Mind-style fenced YAML status blocks;
- real continuous-processing operational value: requires a bounded approved trial.

### Pending human decisions

Reports:
- `system/reports/mind-cleanup-phase-summary-2026-06-06.md` — candidate-redundant; no canonical inbound references; requires human review before any deletion.
- `system/reports/realtime-inbox-dependency-check-2026-06-06.md` — insufficient-evidence; requires human review.
- `system/reports/brain-console-mind-steward-visibility-plan-2026-06-07.md` — insufficient-evidence; requires human review.

System files:
- `system/maintenance-brain-implementation-handoff.md` — not in README; no inbound references; content not proven obsolete; requires human review before archival.
- `system/InfiniteBrainWriteTest.md` — not a spec; purpose unclear; requires human review.

## Milestone boundary (2026-06-18)

### Milestone complete — human-first manual/report-only operation

The current implementation milestone is complete and usable for manual operation:

- human-first Mind usage: capture flows through `capture/inbox/`; review is human-led;
- automatic capture intake: Save-to-Mind places captures in `capture/inbox/` automatically;
- report-only Mind Steward: Brain inspects and prepares proposals without durable writes;
- Brain Console and status visibility: Brain Core API exposes queue state, scheduler status, and reports;
- manual proposal review: proposals appear in `wiki/log.md` for human approval;
- manual Kanban operation: `kanban.md` is the task source of truth; no automated task writes;
- disabled continuous execution: continuous runner is off by default.

No continuous processing is required for current use. No claim of black-box self-optimization is made.

### Future automation track — explicitly deferred

The following are deferred and must not be claimed as current:

- optional continuous runner activation (requires explicit approval and value evidence);
- real-world approved continuous-processing trial;
- auto-resume and persisted pause state;
- self-optimization and approval-feedback learning;
- automated durable writes beyond current bounded adapters;
- demonstrated time savings relative to manual processing.

These are not defects in the current milestone — they are intentional future work.
