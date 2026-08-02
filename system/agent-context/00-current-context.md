# Current Context — Mind

```yaml
status: current
last_reviewed: 2026-08-02
review_after: 2026-08-16
freshness_risk: medium
owner: Steve Westhoek
```

## Current operating direction

- Mind remains the human authority and orientation layer.
- Brain remains the AI capability and execution layer.
- The repositories remain separate and use a versioned bridge.
- Branch consolidation complete at `f8ddb3b` (2026-08-02); root agent entrypoints added.
- `inbox/new/` is the canonical success-intake target (Brain B1.0a verified 2026-07-22).
- `inbox/failed/` is the target failed-processing path; verify routing against `system/folder-contract.md` before writes or moves.
- `inbox/processed/` is the target proposal and receipt surface.
- continuous processing remains disabled until a bounded pilot proves value.
- broad Mind writes are not active.
- target folder structure is canonical; legacy folder removal remains gated on separate human approval.

## Priority status

| Priority | Status |
|----------|--------|
| 1 — Canonical coherence | in progress; M1.1–M1.5 complete; M1.6 blocked on Mind Steward package disposition; exit-gate report: `system/reports/priority-1-exit-gate-reconciliation-2026-08-02.md` |
| 2 — Context Gateway | in progress; M2.1–M2.3 complete; M2.4 blocked on Gateway adapter activation |
| 3 — Retrieval evaluation | complete |
| 4 — Capability truth | complete |
| 5 — Controlled application | complete |
| 6 — Measured automation | in progress; M6.1 complete; M6.2 run 1 and run 2 fully evaluated (both Window 1); Window 1 maximum reached; 6 runs remain; run 3 not started; run 3 first eligible 2026-08-08 |
| 7 — System simplification | planned |

## Current capability state (from Brain live-status runbook)

- Context Gateway CLI/core: repository-verified read-only; deployment unknown.
- Context Gateway MCP adapter: fixture-only; not activated.
- Codebase Memory MCP: candidate binary installed; not activated.
- Graphify: quiesced; `graphify-transition-governance.json` prohibits deletion.
- Save-to-Mind: live routing verified (B1.0a, 2026-07-22).
- Continuous automation: not authorized.

Mind does not infer deployed, observed, or verified capability state from repository configuration or plans. Brain's live-status runbook is authoritative:
`/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md`

## Canonical direction

```text
system/infinite-brain-philosophy.md
→ system/mind-strategy.md
→ system/mind-roadmap.md
→ system/mind-implementation-plan.md
→ system/brain-mind-bridge.md
```

## Current retrieval rule

Use `00-memory-map.md`, current canonical domain files, and targeted search. Do not treat captures, generated reports, graphs, or model summaries as approved truth.

## Maintenance

Keep this file compact. Move details into canonical domain or project pages. Review it on or before `review_after`.
