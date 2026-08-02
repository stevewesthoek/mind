# MS0.4 Graphify Authority and Terminology — 2026-07-14

**Status:** complete — Mind documentation terminology only.

## Authority decision

- Mind owns Graphify purpose, interpretation, and human policy.
- Brain owns Graphify runtime, profile, storage, retention, validation, and evidence.
- Generated Graphify output is non-authoritative; source Markdown remains authoritative.
- The canonical future operational root is `runtime/local/graphify/`.
- `graphify-out/` and `.graphify-out/` are compatibility roots only.
- Execution is disabled/fail-closed pending the Brain-owned contained runner.
- Deployment and observation are unknown; no current run is claimed.
- Freshness requires a Brain receipt timestamp and source hashes; missing receipt means unknown.

## Brain evidence

This report is grounded in Brain `BS0.15` containment evidence and the validated
`graphify-contained-read-only` profile. No Brain file was modified for MS0.4.

## Mind files aligned

- `home.md`
- `system/folder-contract.md`
- `system/generated-output-policy.md`
- `system/graphify-strategy.md`
- `system/graph-visualization-contract.md`
- `system/graph-visualization-spec.md`
- `system/automation-roadmap.md`
- `tools/README.md`
- `system/mind-roadmap.md`

Historical renderer commands and compatibility artifacts remain documented only
as historical/deferred paths and do not assert execution.

## Verification

Focused Graphify terminology scan completed after edits. `git diff --check`
passes. No runtime, deployment, scheduler, credential, network, or generated
Graphify operation was invoked.

**Verdict:** MS0.4 complete. The remaining runtime truth stays Brain-owned and
unknown unless receipt-bound evidence is supplied.
