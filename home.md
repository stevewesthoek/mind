---
type: dashboard
---

# Mind — Infinite Brain Human Operating Manual

This is the human-facing entry point for Infinite Brain. It explains where human meaning lives, how Brain supports the work, what is active now, and what still requires review or future authorization.

## Infinite Brain philosophy

Infinite Brain is one philosophy expressed through two deliberately separate repositories:

```text
Mind  = meaning, priorities, strategy, human context, identity, decisions, and approved knowledge
Brain = operational capability, execution boundaries, validation, automation, infrastructure, and operational truth
```

Mind and Brain are separate because human meaning must remain readable, private, portable, and human-governed. Brain may retrieve, normalize, compare, validate, summarize, and prepare bounded workflow artifacts. It must not silently redefine beliefs, priorities, strategy, commitments, or durable personal knowledge.

The authority boundary is:

```text
Mind authority
→ Brain operational authority
→ evidence
→ derived review views
→ human decisions
→ controlled promotion preparation
→ reviewed knowledge evolution
```

Mind owns meaning and importance. Brain owns machine capability and operational truth. A context pack, briefing, review item, workflow artifact, or promotion candidate is not itself approved Mind knowledge.

The governing lifecycle is:

```text
capture
→ inbox
→ evidence normalization
→ review
→ human decision
→ controlled promotion
→ knowledge evolution
```

Human authority remains required whenever meaning, priority, identity, strategy, privacy, commitment, or canonical knowledge changes.

## Current operational model

Information enters through a bounded capture or ingestion path and remains traceable to its source. Brain can create evidence envelopes, normalize provenance, present a unified review inbox, and prepare a human-readable briefing. The review workflow records state and history without changing canonical knowledge. Accepted evidence can become a promotion candidate, but promotion requires explicit human confirmation and a separately authorized bounded transaction.

The current operating loop is:

```text
capture → normalize → brief → review → decide → prepare promotion → validate → preserve history
```

Derived indexes, briefings, workflow files, calibration reports, and readiness reports are navigation and operational evidence. They do not replace Mind source files or Brain canonical contracts.

### What Infinite Brain is

Infinite Brain is the operating relationship between the human-owned Mind vault and the capability-owned Brain repository:

- **Mind and Obsidian** hold human meaning, source material, priorities, decisions, and approved knowledge. `inbox/new/` is the normal entry point for unreviewed information.
- **Brain Core** is the machine boundary. It exposes bounded evidence, review, projection, validation, and safety contracts; it is not a second Mind.
- **Brain Console** is an optional read-oriented operations surface over Brain Core. It presents projections and status; it does not bypass Brain Core or become a knowledge store.
- **Claude Code, Codex, and Workbench** are bounded adapters for reasoning, implementation, validation, and controlled execution. Explicitly selected session output is evidence only when routed through the existing review boundary.

The current path is:

```text
Mind inbox/new, GitHub reference, selected AI-session evidence, or document
  → bounded ingestion/evidence envelope
  → unified review inbox and briefing
  → daily review and human decision
  → optional, explicitly approved promotion
```

Only a human can decide that information changes Mind knowledge, meaning, priorities, or commitments.

## Active now

The following capabilities are active as bounded, human-controlled workflows:

- **Universal context consumption:** agents use the shared Brain/Mind navigation and context contracts to retrieve relevant context progressively. Context is bounded orientation, not a full-vault dump or permission to act.
- **Claude Code, Codex, and Workbench usage:** each environment is a bounded adapter. They may consume Brain/Mind context according to their own runtime controls; none becomes the canonical source of Mind or Brain truth.
- **Session continuity:** session state and handoff artifacts can preserve objective, progress, decisions, evidence, and continuation points across environments. Automatic takeover is not enabled.
- **Inbox ingestion:** new captures and supported documents can become traceable ingestion envelopes or review inputs. Failed or blocked intake remains visible rather than silently disappearing.
- **Evidence normalization:** source identity, provenance, authority context, freshness, confidence, uncertainty, and review requirements are preserved in derived artifacts.
- **Unified review inbox:** evidence from supported producers can be viewed through one review projection without creating a second knowledge store.
- **Intelligence briefing:** the review inbox can be grouped into urgent, important, informational, deferred, and historical views using explicit evidence signals only. Human importance is not inferred.
- **Human review workflow:** items can be marked `new`, `reviewing`, `accepted`, `rejected`, `deferred`, or `archived`. State is workflow state, not canonical knowledge.
- **Controlled memory promotion boundary:** accepted items can become promotion candidates for Mind, Brain, or evidence/archive-only destinations. Human confirmation, scope, reason, reviewer, provenance, and rollback evidence are required.
- **Daily intelligence loop:** an operator can inspect current state, attention items, deferred work, stale items, conflicts, and promotion preparation without scheduling or automatic execution.
- **Operational feedback calibration:** real workflow artifacts can produce report-only signals about repeated reviews, stale evidence, missing context, duplicates, failed ingestion, and friction.
- **Readiness checks:** the system can report capability availability, data health, workflow health, empty runtime state, and operator guidance without repairing anything automatically.
- **Operational learning checkpoint:** after real usage, observations can be separated into immediate fixes, future capabilities, and experimental ideas. These remain observations until separately reviewed.
- **GitHub repository intelligence:** explicitly supplied public repository references can receive bounded metadata, documentation, architecture, and fit evidence through the existing review workflow. It is advisory and does not clone, execute, inspect source, or adopt a repository.
- **Conversation intelligence:** explicitly selected Claude, Codex, or Workbench session evidence can become bounded review candidates without transcript databases, broad scanning, automatic discovery, or automatic promotion.
- **Brain Console projections:** the optional Console exposes current Brain Core projections and operational status through the existing safety boundary.
- **Operational adoption:** real Mind inbox usage, review decisions, calibration, friction, and readiness evidence have been collected. Feature expansion is paused while operational learning continues.

These capabilities support review and preparation. They do not autonomously write Mind, rewrite Brain canonical state, call providers, schedule themselves, or promote knowledge.

**Current state:** Infinite Brain is ready for daily usage. Feature expansion is paused; the focus is operational learning, measurement, stabilization, and ergonomics.

## Planned / future

The following are not active capabilities and must not be represented as operational:

- automatic GitHub discovery, repository cloning, source/dependency analysis, or undocumented architecture inference;
- automatic conversation mining, historical session ingestion, or transcript storage;
- multimodal or video understanding;
- autonomous maintenance or predictive actions;
- automatic memory creation or learning;
- automatic daily scheduling;
- autonomous agents that decide or apply semantic changes;
- any new provider, ingestion system, dashboard, analytics store, or authority layer without a separate authorization and acceptance gate.

Future work must preserve the Mind/Brain boundary, provenance, reversibility, privacy, and human approval.

## Daily operating guide

### How should I use Infinite Brain?

Put human-owned information in Mind and use Brain to process, retrieve, validate, and present it. Start with the smallest relevant context. Treat generated output as evidence or a proposal until you inspect its source and authority.

### What should I do daily?

1. Add new information to `inbox/new/` or preserve an original in `inbox/raw/` when needed.
2. Run the Brain daily intelligence loop when beginning a review session.
3. Read the attention queue and follow each item’s evidence reference.
4. Record a human review decision: accept, reject, defer, or archive.
5. Prepare promotion only when the evidence is accepted and the destination and scope are clear.
6. Run calibration and readiness after meaningful review activity.
7. Leave unresolved or uncertain items visible; do not force a conclusion.

Weekly, review calibration signals, friction notes, capability health, unresolved decisions, and any unused or unstable capability. Do not turn one friction observation into a feature request until it repeats in real work and is separately authorized.

The Brain-side commands are documented in:

```text
/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/mind-steward-daily-intelligence-loop.md
/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/mind-steward-operational-feedback-calibration.md
/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/mind-steward-operational-readiness.md
```

The verified complete daily-review entrypoint is:

```bash
MIND_STEWARD_MIND_ROOT=/Users/Office/Repos/stevewesthoek/mind \
node tools/scripts/mind-steward-daily-review.mjs
```

For the read-only daily view alone:

```bash
node tools/scripts/mind-steward-daily-intelligence-loop.mjs
```

Daily review composes ingestion, briefing, workflow, daily loop, calibration, and readiness artifacts. Read the generated attention queue and runtime-local reports; readiness identifies blockers but does not repair, decide, promote, or write canonical state.

### Where do I put information?

- New, unreviewed captures: `inbox/new/`
- Immutable originals: `inbox/raw/` or `resources/`
- Generated proposals and receipts: `inbox/processed/`
- Failed or blocked intake: `inbox/failed/`
- Reviewed orientation: `projects/`, `organizations/`, `repos/`, `people/`, `faith/`, `knowledge/`
- Completed or superseded material: `history/`

### How do I review information?

Open the current review briefing or workflow artifact, inspect the source and evidence references, then record an explicit decision with a reason. An accepted review item is not automatically written into Mind. Meaning, importance, priorities, and personal or strategic conclusions remain yours to approve.

### How do I ask questions?

Ask the relevant environment to retrieve the smallest context pack and cite its sources. Examples:

- “What needs my attention today?”
- “What changed recently?”
- “What does Infinite Brain know about this?”
- “What decisions were made?”
- “What did we learn yesterday?”
- “What needs my attention?”
- “What GitHub repositories were analyzed?”
- “What evidence is waiting for review?”
- “What changed in the system?”
- “What should be improved?”

When an answer affects beliefs, strategy, identity, priorities, or commitments, verify it against canonical Mind sources before treating it as truth.

### How do I check system health?

Run the operational readiness check after the daily loop and calibration report. It reports whether the capabilities are available, whether runtime artifacts are empty or stale, what workflow remains unresolved, and what requires human attention. A readiness report identifies problems; it does not repair them.

## Entry points and environment roles

| Entry point | Primary role |
|---|---|
| Mind repository | Meaning, knowledge, priorities, human context, identity, decisions, tasks, and history |
| Brain repository | Execution boundaries, capabilities, automation, validation, infrastructure, schemas, and operational truth |
| Claude Code | Claude-oriented implementation and repository work within local runtime controls |
| Codex | Reasoning, planning, validation, and bounded repository collaboration within Codex runtime controls |
| Workbench | Controlled execution workflows and tool/MCP boundaries; execution authority remains explicit |

These environments are replaceable adapters. They share navigation and authority semantics, not a copied full context or independent truth.

## Canonical Mind structure

| What | Target path | Migration note |
|------|-------------|----------------|
| New captures | `inbox/new/` | `history/legacy-capture/inbox/` is migrated historical evidence |
| Raw originals | `inbox/raw/` | source paths reviewed and migrated to `history/legacy-capture/` |
| Processed proposals and receipts | `inbox/processed/` | `inbox/processed/legacy-wiki-proposal-log.md` retains migrated wiki log |
| Failed intake | `inbox/failed/` | verify current external failure routing in `system/folder-contract.md` |
| Organizations | `organizations/` | `wiki/organisations/` migrated; history retains legacy material |
| Active projects | `projects/` | `history/legacy-live/projects.md` is historical evidence |
| Repos and apps | `repos/` | current target area |
| People | `people/` | identity material is under the current people structure |
| Faith, Bible, theology, apologetics, ministry | `faith/` | source material migrated from prior research batches |
| Durable non-faith knowledge | `knowledge/` | reviewed personal knowledge belongs here |
| Non-faith source material | `resources/` | source material is separated from active knowledge |
| Completed or inactive material | `history/` | completed and superseded material remains traceable |
| AI/coding-agent context | `system/agent-context/` | orientation and retrieval contracts |
| Graphify operational output | `runtime/local/graphify/` | generated output is derived and non-authoritative |

Some legacy folders remain for compatibility or historical evidence. Their presence does not make them active destinations. `system/folder-contract.md` is the detailed path authority.

## Evolution and release history

This page is the highest-level human operating manual. Whenever Infinite Brain philosophy, architecture, operational workflows, or user interaction changes, review and update `home.md` in the same bounded documentation change.

Significant evolution history:

| Date | Change | Reason | Operational impact | User action required |
|---|---|---|---|---|
| 2026-07-31 | Philosophy and Mind/Brain authority model reviewed | Preserve human meaning and machine capability boundaries | Mind remains human-owned; Brain remains operational | Use the correct repository for the question |
| 2026-08-23 | Unified inbox, briefing, review, promotion, daily loop, calibration, readiness, and learning checkpoint aligned | Make the review loop usable and measurable without autonomous learning | Evidence can be reviewed and prepared for promotion with explicit human control | Run the daily loop, review evidence, and reassess after real usage |
| 2026-08-23 | This human operating manual synchronized with the current architecture | Keep the highest-level entry point accurate | Active and future capabilities are clearly separated | Treat this page as the starting orientation |

Future entries should capture the date, change, reason, operational impact, and user action required. Historical entries describe what changed at the time; they do not authorize future capability.

### Infinite Brain capability release history

“Active” means available for bounded human-controlled use; it does not mean automatic or autonomous. Testing remains continuous against Brain contracts and real operational evidence.

| Milestone / released | Capability and purpose | Status | How to use | Still needs testing |
|---|---|---|---|---|
| MRU0-P3.17–P3.20 · 2026-08-23 | Unified review inbox, briefing, review workflow, and controlled promotion boundary | Active | Run daily review, inspect evidence, record an explicit decision, and prepare promotion only after acceptance | Repeated real review outcomes and promotion receipts |
| MRU0-P3.21–P3.24 · 2026-08-23 | Daily loop, calibration, readiness, and operational learning checkpoint | Active | Run the daily loop after review activity; inspect calibration and readiness | At least two weeks or ten completed review sessions |
| MRU0-P3.25 · 2026-08-23 | Brain Core projections and Brain Console operational views | Active | Use the optional Console for read-oriented status and projections through Brain Core | Continued UI/runtime compatibility and operator ergonomics |
| MRU0-P3.26–P3.32 · 2026-08-24 | Human review cycles, evidence preview, cockpit refinement, and review-intelligence quality | Active | Follow source/evidence references, record decisions, and use calibration to identify friction | More real workload and usefulness measurements |
| MRU0-P3.33–P3.41 · 2026-08-24 | GitHub evidence, metadata, fit, documentation, and bounded architecture intelligence | Active, advisory | Supply an explicit public GitHub reference and request bounded enrichment during daily review | More real candidates and fit calibration; no source inspection or automatic adoption |
| MRU0-P3.42–P3.47 · 2026-08-24 | Conversation evidence, operator evaluation, privacy benchmark, and structured extraction improvement | Active, review-only | Supply explicitly selected session evidence and inspect candidates in the existing review workflow | More privacy-safe real usage before any controlled discovery decision |
| MRU0-P3.48 · 2026-08-24 | Operational adoption, health stabilization, usage, friction, and capability reporting | Active, feature-frozen | Use real Mind inbox work, record decisions, review calibration/friction, and reassess later | Two weeks or ten completed sessions before the next roadmap decision |

Experimental or deferred work requires separate authorization. No hidden release is implied by a passing test or available adapter.

### Release discipline

```text
Build → Test → Validate → Document → Activate → Use → Improve
```

Capabilities become live only after their evidence, safety boundary, documentation, and human workflow are validated. Large hidden releases, automatic promotion, and silent authority changes are not part of the operating model.

## Canonical references

Mind philosophy and strategy:

1. `system/infinite-brain-philosophy.md`
2. `system/mind-strategy.md`
3. `system/mind-roadmap.md`
4. `system/mind-implementation-plan.md`
5. `system/brain-mind-bridge.md`

Brain’s current machine capability status:

```text
/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md
```

For detailed system contracts, folder rules, privacy, automation boundaries, and migration state, use:

- `system/README.md`
- `system/folder-contract.md`
- `system/brain-mind-bridge.md`
- `system/agent-context/00-start-here.md`
- `system/agent-context/00-memory-map.md`

This page is orientation, not a replacement for those canonical sources.
