# B1.7 — Mind Entrypoint and Intake-Path Verification

**Date:** 2026-07-30
**Scope:** Mind-local, source-authoritative assessment for Brain roadmap task B1.7
**Verdict:** Mind-side entrypoint and intake-path agreement verified; no Mind implementation change is required.

## Repository evidence

- Branch: `main`
- HEAD: `7687bb83436b8dcd2d9dca144cdeb9fbda5a434c`
- Preflight status: dirty before this assessment. All pre-existing modified and untracked paths were preserved.

Preflight `git status --short`:

```text
 M capture/README.md
 M faith/resources/bible/README.md
 M home.md
 M kanban.md
 M knowledge/decisions.md
 M live/README.md
 M live/video.md
 M organizations/prochat/legal/README.md
 M resources/README.md
 M resources/books/README.md
 M resources/files/README.md
 M resources/index.md
 M resources/papers/README.md
 M resources/research/README.md
 M resources/research/business/README.md
 M resources/transcripts/README.md
 M resources/web/README.md
 M system/agent-context/00-current-context.md
 M system/agent-context/AGENTS.md
 M system/agent-context/CLAUDE.md
 M system/agent-context/current.md
 M system/agent-context/implementation-plan.md
 M system/agent-context/maintenance.md
 M system/agent-context/map.md
 M system/agent-context/mind-steward.md
 M system/agent-context/roadmap.md
 M system/agent-context/router-README.md
 M system/agent-context/rules.md
 M system/agent-context/taxonomy.md
 M system/automation-contract.md
 M system/automation-roadmap.md
 M system/brain-mind-bridge.md
 M system/folder-contract.md
 M system/generated-output-policy.md
 M system/graph-visualization-contract.md
 M system/graph-visualization-spec.md
 M system/graphify-strategy.md
 M system/inbox-queue-throttle-spec.md
 M system/infinite-brain-philosophy.md
 M system/intake-disposition-pattern.md
 M system/knowledge-freshness-standard.md
 M system/maintenance-brain-implementation-handoff.md
 M system/maintenance-report-contract.md
 M system/mind-implementation-plan.md
 M system/mind-roadmap.md
 M system/orientation-brief-template.md
 M system/processed-capture-receipt-template.md
 M system/realtime-inbox-processing-spec.md
 M system/repo-boundaries.md
 M system/runbooks/maintenance-report-pilot-runbook.md
 M system/runbooks/mind-steward-preflight-runbook.md
 M tools/README.md
 M wiki/README.md
 M wiki/log.md
 M wiki/organisations/prochat/brand/company-principles.md
 M wiki/organisations/prochat/brand/product-strategy.md
 M wiki/organisations/prochat/brand/public-platform-strategy.md
?? organizations/prochat/discovery/
?? system/reports/m1-1-agent-context-status-2026-07-10.md
?? system/reports/m1-2-folder-bridge-contracts-2026-07-10.md
?? system/reports/m1-3-active-documentation-paths-2026-07-12.md
?? system/reports/m1-3-authority-prerequisite-reassessment-2026-07-14.md
?? system/reports/ms0-1-authority-precedence-matrix-2026-07-14.md
?? system/reports/ms0-2-prochat-strategy-authority-decision-request-2026-07-14.md
?? system/reports/ms0-3-dashboard-authority-roles-2026-07-14.md
?? system/reports/ms0-4-graphify-authority-terminology-2026-07-14.md
?? system/reports/ms0-5-compatibility-authoritative-exceptions-2026-07-14.md
?? system/reports/ms0-6-maintenance-pilot-authority-rebaseline-2026-07-14.md
?? system/reports/ms0-7-capability-truth-alignment-2026-07-14.md
?? system/reports/ms0-9-task-authority-migration-gate-2026-07-14.md
?? system/reports/pre-1-0-architecture-stabilization-mind-planning-2026-07-13.md
?? system/task-authority-migration-contract.json
?? tools/fixtures/
?? tools/validate-task-authority-migration.mjs
?? tools/validate-task-authority-migration.test.mjs
```

## Authoritative entrypoint

`system/agent-context/` exists and is the **active authoritative AI/agent orientation entrypoint**, not a generated or compatibility path.

The required startup files are, in order:

1. `system/agent-context/AGENTS.md`
2. `system/agent-context/00-start-here.md`
3. `system/agent-context/00-current-context.md` when current state matters
4. `system/agent-context/00-memory-map.md`

`system/agent-context/README.md` identifies the folder as the target home for AI and coding-agent context. `system/brain-mind-bridge.md` names `system/agent-context/` as the current `Agent orientation` path and its manual retrieval fallback begins with `system/agent-context/AGENTS.md`.

The predecessor `router/` is obsolete for active use: it is retained only through `system/agent-context/router-README.md` and explicitly labeled legacy, historical, or compatibility-only. It is not an alternate active entrypoint.

## Intake paths and metadata contract

The authoritative paths for external/context intake are distinct by exchange type:

| Exchange type | Authoritative Mind path or contract |
|---|---|
| Agent orientation | `system/agent-context/` |
| New unreviewed capture | `inbox/new/` |
| Raw/original evidence | `inbox/raw/` or `resources/` |
| Generated proposal or receipt | `inbox/processed/` |
| Failed or blocked capture target | `inbox/failed/` |
| Typed Brain–Mind exchange | `system/brain-mind-bridge.md` |

`inbox/new/` is the active success-intake path. `capture/inbox/` is historical. `inbox/failed/` is the canonical Mind failure target, while any external failure routing remains explicitly compatibility-only and unverified; that runtime fact is not changed or inferred here.

There is no single repository-wide mandatory Markdown frontmatter schema for every capture. The exact source defines layered contracts instead:

- **All conforming bridge payloads:** `schema_version`, stable ID, `type`, creation time, source references, `status`, and `producer`.
- **Read-only context pack (required):** `schema_version`, `pack_id`, `query`, `created_at`, `producer`, `scopes_searched`, `scopes_excluded`, `sources`, `authority_summary`, `freshness_summary`, `conflicts`, `unknowns`, `context_budget`, and `brief`. Each `sources` item requires `path`, `authority`, `freshness`, `relevance_reason`, and `excerpt`.
- **Proposal (required):** `schema_version`, `proposal_id`, `type`, `status`, `created_at`, `source_paths`, `target_paths`, `summary`, `evidence`, `confidence`, `authority_impact`, and `requires_approval`.
- **Approval (required):** `schema_version`, `approval_id`, `proposal_id`, `approved_by`, `approved_at`, `expires_at`, `source_commit`, `idempotency_key`, `action`, `targets`, `required_checks`, and `reason`. Each target requires `path`, `expected_before_hash`, `destination_path`, `allowed_sections`, and `content_intent`.
- **Capture disposition template (canonical lightweight pattern):** `title`, `date`, `status`, `source_path`, `source_type`, `source_name`, `observation_summary`, `primary_disposition`, `routing_layer`, `confidence`, `reason`, `recommended_destination`, `affected_paths`, `requires_approval`, `approval_status`, `evidence`, `source_quality_notes`, `next_action`, and `no_write_performed`.
- **Processed-capture receipt template (canonical lightweight template):** `title`, `date`, `capture_path`, `source_type`, `source_name`, `outcome`, `destination_paths`, `approval`, `reason`, `summary`, `evidence`, `follow_up_task`, and `do_not_forget`.

Source identity is represented by the bridge `producer`, stable payload ID, source references, and—by exchange type—`sources[].path`, `source_paths`, or disposition `source_path`. Capture origin is represented by `source_type` and `source_name`; the generic capture template also uses `source`.

Repository/document paths must be repository-relative when used as proposal targets: the bridge rejects folder roots, globs, unspecified destinations, path traversal, and symlink escape. The authoritative policy does not prescribe an absolute Mind-repository path for an intake item. Absolute paths appearing in explanatory documentation identify external Brain-owned implementation targets, not a Mind intake metadata format.

Freshness/lifecycle is explicit where needed:

- bridge source freshness: `current | review-needed | superseded | unknown`;
- proposal/disposition lifecycle: `proposed | approved | rejected | applied | superseded`;
- knowledge freshness standard: `draft | current | review-needed | superseded | archived`, with optional `last_reviewed`, `review_after`, `supersedes`, `source_ref`, and `freshness_risk`.

The bridge contract is a canonical human-policy document, manually maintained in Mind; its machine schema is explicitly Brain-owned and planned/not present according to the exact Mind source. Context packs are read-only disposable runtime projections; runtime generation, schemas, queues, and receipts are Brain-owned. The capture-disposition and receipt documents are canonical templates/patterns, not runtime-managed registries.

## Brain-specific records and compatibility findings

No active Brain-specific intake record was found under the active Mind intake surfaces. The authoritative bridge is the Brain–Mind exchange policy; it does not constitute a live intake record. Existing `inbox/new/` examples contain imported capture content, and the inspected generic capture template is not a Brain-specific bridge record.

The only entrypoint predecessor is `router/`, and all active-source references found in `system/agent-context/` label it historical, legacy, or compatibility-only. No conflicting active agent entrypoint was found. Compatibility references to `capture/inbox/` and `capture/failed/` remain documented as historical or external-routing compatibility, respectively; they do not invalidate the `system/agent-context/` reference.

## B1.7 conclusion

Brain references to `mind/system/agent-context/` resolve correctly in this repository as `system/agent-context/`. No Mind-side compatibility shim, metadata implementation, semantic ingestion, or intake record creation is required for this B1.7 verification gate.

Accordingly, the **Mind-side condition for B1.7 is satisfied** and can be closed without a Mind implementation change. Brain should attach or cite this report in its own B1.7 evidence and make the roadmap-status closure there. This does not claim that the planned Brain Context Gateway or machine-readable schema is implemented; those are separate Brain-owned prerequisites recorded by the bridge.

## Exact Mind files inspected

- `system/agent-context/AGENTS.md`
- `system/agent-context/00-start-here.md`
- `system/agent-context/00-current-context.md`
- `system/agent-context/00-memory-map.md`
- `system/agent-context/README.md`
- `system/agent-context/CLAUDE.md`
- `system/agent-context/current.md`
- `system/agent-context/map.md`
- `system/agent-context/rules.md`
- `system/agent-context/router-README.md`
- `system/agent-context/roadmap.md`
- `system/agent-context/implementation-plan.md`
- `system/agent-context/maintenance.md`
- `system/agent-context/mind-steward.md`
- `system/agent-context/taxonomy.md`
- `system/mind-roadmap.md`
- `system/mind-implementation-plan.md`
- `system/brain-mind-bridge.md`
- `system/folder-contract.md`
- `system/intake-disposition-pattern.md`
- `system/processed-capture-receipt-template.md`
- `system/realtime-inbox-processing-spec.md`
- `system/knowledge-freshness-standard.md`
- `system/templates/capture.md`
- `system/templates/resource.md`
- `system/templates/task.md`
- `system/templates/project.md`
- `inbox/README.md`
- `inbox/new/README.md`
- `inbox/failed/README.md`
- `inbox/raw/README.md`
- `system/reports/README.md`
- `system/reports/m1-1-agent-context-status-2026-07-10.md`
- `system/reports/m1-2-folder-bridge-contracts-2026-07-10.md`
- `system/reports/m1-3-active-documentation-paths-2026-07-12.md`
- `system/reports/ms0-5-compatibility-authoritative-exceptions-2026-07-14.md`
- `system/reports/ms0-7-capability-truth-alignment-2026-07-14.md`
- `system/reports/pre-1-0-architecture-stabilization-mind-planning-2026-07-13.md`
- `system/reports/README.md`
- `tools/README.md`

## Exclusions and preservation

No Workbench Private, Brain, ProChat, Codebase Memory MCP runtime, Graphify runtime, Orbit, semantic-ingestion, scheduler, queue, hook, service, cache, index, embedding, external repository, or runtime-state work was performed. Generated Graphify output was not treated as authority and no Graphify process was run. No commit or push was performed.

The only file added by this assessment is this report. All pre-existing dirty, staged, and untracked Mind work was preserved.
