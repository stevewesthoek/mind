# MS0.2 ProChat Strategy Authority — Human Decision Request — 2026-07-14

**Status:** complete — explicit human decision recorded 2026-07-14.
**Decision owner:** Steve Westhoek
**Automatic selection:** prohibited.

## Human decision recorded

Steve Westhoek decided: **Retire the unsupported “single ProChat OS strategy” concept and use the existing scoped strategy authorities.**

This decision does not designate a substitute single strategy page. The applicable canonical Mind sources are:

- `wiki/organisations/prochat/brand/product-strategy.md` for company and product-portfolio strategy;
- `wiki/organisations/prochat/brand/prochat-workbench-strategy.md` for ProChat Workbench strategy; and
- `wiki/organisations/prochat/brand/README.md` as the canonical index for the applicable brand and product authority.

## Former decision requirement

`system/repo-boundaries.md` claims that the one canonical ProChat OS strategy is `wiki/organisations/prochat/brand/prochat-os-strategy.md`. That file is absent. Active references remain in:

- `system/repo-boundaries.md`
- `system/knowledge-freshness-standard.md`
- `system/maintenance-report-contract.md`
- `system/maintenance-brain-implementation-handoff.md`
- `system/runbooks/maintenance-report-pilot-runbook.md`

The human owner selected option 4:

1. **Adopt `wiki/organisations/prochat/brand/product-strategy.md` as the canonical ProChat OS strategy.** This is the closest existing company/product-wide canonical strategy, but it does not itself explicitly define the missing “Agentic Workflow OS” concept.
2. **Adopt `wiki/organisations/prochat/brand/prochat-workbench-strategy.md` as the canonical ProChat OS strategy.** This captures the local policy/execution bridge concept, but it is explicitly scoped to ProChat Workbench rather than all ProChat products.
3. **Create a new canonical ProChat OS strategy document.** This retains the broad strategy concept and requires its human-authored scope, positioning, non-goals, and relationship to the two existing products.
4. **Retire the “single ProChat OS strategy” concept.** This requires updating all active references to use explicitly scoped strategy sources instead of a single replacement page. **Selected.**

## Candidate comparison

| Candidate | Proven present scope | Why it cannot be selected automatically |
|---|---|---|
| `product-strategy.md` | Canonical company/product strategy for ProChat Memory and ProChat Workbench. | It is not explicitly designated as the broad ProChat OS / Agentic Workflow OS strategy. |
| `prochat-workbench-strategy.md` | Canonical ProChat Workbench product strategy. | Its stated product scope cannot automatically become company-wide ProChat OS strategy. |
| `brand/README.md` | Canonical brand index linking to scoped documents. | An index is not a strategy document. |
| New document | Could define the missing broad scope. | Its product meaning must be supplied and approved by the human owner. |
| Retirement | Removes the unsupported one-document requirement. | Changes how active strategy references are structured and therefore requires explicit human approval. |

## Active-reference disposition

| Reference | Disposition |
|---|---|
| `system/repo-boundaries.md` | Resolved in this decision: the unsupported single-document rule is retired and replaced with the scoped authority map. |
| `system/knowledge-freshness-standard.md` | Resolved in this decision: its example now uses the existing scoped canonical strategies. |
| `system/maintenance-report-contract.md` | Blocked for MS0.6 fixture rebaseline; it couples strategy selection with the retired dashboard filename. |
| `system/maintenance-brain-implementation-handoff.md` | Blocked for MS0.6 maintenance-dataset rebaseline. |
| `system/runbooks/maintenance-report-pilot-runbook.md` | Blocked for MS0.6 maintenance-dataset rebaseline. |

## Consequences

- The five active missing-path references are now classified as resolved or MS0.6-blocked above.
- Rebaseline the coupled maintenance-pilot authority dataset in MS0.6, using the already-established dashboard role classification.
- Resume only deterministic M1.3 cleanup that has an exact authoritative replacement.

No new strategy page was created. Brain remains read-only and no runtime, automation, deployment, or task state changed.
