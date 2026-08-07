# Current Context — Mind

```yaml
status: current
last_reviewed: 2026-08-04
review_after: 2026-08-16
freshness_risk: medium
owner: Steve Westhoek
```

## Current operating direction

- Mind remains the human authority and orientation layer.
- Brain remains the AI capability and execution layer.
- The repositories remain separate and use a versioned bridge.
- Branch consolidation complete at `f8ddb3b` (2026-08-02); root agent entrypoints added.
- Structural legacy cleanup complete (2026-08-07): all six obsolete roots (capture, live, sources, wiki, archive, graphify-out) are absent; all 10 canonical roots present and verified.
- `inbox/new/` is the canonical success-intake target (Brain B1.0a verified 2026-07-22).
- `inbox/failed/` is the target failed-processing path; verify routing against `system/folder-contract.md` before writes or moves.
- `inbox/processed/` is the target proposal and receipt surface.
- the bounded Priority 6 pilot was retained on 2026-08-03; continuous processing remains disabled pending separate multi-week operational evidence and explicit authorization.
- broad Mind writes are not active.
- target folder structure is canonical and operational; legacy folder migration complete; Graphify compatibility roots retired.

## Priority status

| Priority | Status |
|----------|--------|
| 1 — Canonical coherence | complete; M1.1–M1.6 complete; Mind Steward retained as a separate Brain-owned local deterministic/report-only package with documented boundary and canonical shared path policy; Brain README refresh completed in commit `a97f4e80` on `origin/release/brain-stabilization-v1`; integration into Brain `main` remains pending in the separate Brain conversation; no migration, retirement, deployment, or automation activation occurred |
| 2 — Context Gateway | complete; M2.1–M2.4 complete; exact project-scoped read-only Codex adapter active-local with Steve approval; live health/readback, freshness, privacy scope, mutation rejection, unavailable manual fallback, and disable/restore verified; evidence: `system/reports/m2-4-m7-1-closure-2026-08-04.md` |
| 3 — Retrieval evaluation | complete |
| 4 — Capability truth | complete |
| 5 — Controlled application | complete |
| 6 — Measured automation | complete; M6.1–M6.3 complete; 8 of 8 runs fully evaluated; verdict `retain` (2026-08-03); 8 of 8 useful, 0 safety violations, 8 of 8 citations correct, and 0-minute measured median correction; immediate-batch evidence does not prove multi-week stability; no continuous automation authorized; evidence: `system/reports/priority-6-automation-pilot-verdict-2026-08-03.md` |
| 7 — System simplification | complete; M7.1–M7.5 complete; owner-ratified receipt-bound Graphify baseline excludes plugin internals and records an 8,972 KiB allocated working set; the restore drill and navigation baseline passed; future Graphify authority remains none; secondary backup coverage remains an external recovery-assurance follow-up |

## Current capability state (from Brain live-status runbook)

- Context Gateway CLI/core: repository-verified read-only.
- Context Gateway adapter: project-scoped `active-local`, owner-approved, fixed to
  provider `51e9091c...` and the current approved Mind HEAD; no mutation path.
- Workbench MCP: separate active-local provider; not Context Gateway activation.
- Codebase Memory MCP: candidate-only; not approved, default, deployed, or activated.
- Graphify: one-time Mind baseline accepted at `20260804T000604198Z-06de527423e0`;
  future execution authority `none`; graphify-out/ and .graphify-out/ retired as operational generated-output contracts.
- Save-to-Mind: live routing verified (B1.0a, 2026-07-22).
- Continuous automation: Observation 005 is operational monitoring, not implementation work; continuous automation remains separately governed.

Mind does not infer deployed, observed, or verified capability state from repository configuration or plans. Brain's live-status runbook is authoritative for current provider pin, runtime health, and operational Graphify execution state:
`/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md`

**After this correction commit, the Brain provider must be repinned to the final Mind SHA before the next operational observation.**

## Canonical direction

```text
system/infinite-brain-philosophy.md
→ system/mind-strategy.md
→ system/mind-roadmap.md
→ system/mind-implementation-plan.md
→ system/brain-mind-bridge.md
```

## Current retrieval rule

Prefer the healthy/current Brain `mind-context` provider for bounded cited
retrieval. If absent, unhealthy, stale, or unavailable, use `00-memory-map.md`,
current canonical domain files, and manual targeted search without broadening
scope. Do not treat captures, generated reports, graphs, or model summaries as
approved truth.

## Maintenance

Keep this file compact. Move details into canonical domain or project pages. Review it on or before `review_after`.
