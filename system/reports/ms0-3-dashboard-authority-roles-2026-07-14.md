# MS0.3 Dashboard Authority Roles — 2026-07-14

**Status:** complete — roles classified; unresolved maintenance-pilot references are explicitly blocked.
**Owner:** Mind human-facing documentation roles
**Scope:** no runtime assertion, configuration, or UI change.

## Role matrix

| Surface | Role | Authority boundary | Current treatment |
|---|---|---|---|
| `home.md` | Human navigation and orientation dashboard | Human-first orientation only; it links to Brain for machine capability status. | Active Mind entrypoint. |
| `system/reports/dashboard.md` | Markdown fallback navigation/reporting surface | Human-readable fallback; must not store runtime logs or duplicate live machine state. | Active fallback. |
| `live/` | Compatibility-only compact Markdown views | May summarize/review; is not the source of runtime facts or the complete task database. | Retained compatibility surface. |
| `live/dashboard.md` | Missing retired fallback filename | Has no present file and no independent runtime authority. | Do not recreate or silently substitute it in a maintenance fixture. |
| Brain Console | Brain-owned operator control-plane UI | Brain Core remains the runtime source of truth; Mind is an optional human viewing/orientation surface. | Primary live system view by role, with no deployment claim made here. |
| Generated dashboards/reports | Evidence/proposal only | Never establish canonical runtime truth. | Non-authoritative unless adopted by the appropriate owner. |

## Existing-reference classification

| Active reference location | Classification | Required follow-up |
|---|---|---|
| `system/top-level-folder-redesign-migration-plan.md` | Explicit migration history: records `live/dashboard.md` among old paths. | Preserve as migration evidence; no role ambiguity. |
| `system/maintenance-report-contract.md` | Blocked maintenance-pilot dataset assumption. | Rebaseline only in MS0.6 after MS0.2; do not edit in this task. |
| `system/runbooks/maintenance-report-pilot-runbook.md` | Blocked maintenance-pilot dataset assumption. | Rebaseline only in MS0.6 after MS0.2; do not edit in this task. |
| `system/maintenance-brain-implementation-handoff.md` | Blocked handoff that mirrors the maintenance-pilot dataset. | Update only with the MS0.6 maintenance decision. |
| `system/orientation-brief-template.md` | Blocked template reference. | Replace only when MS0.6 establishes the pilot/template authority set. |

The four maintenance-related files are explicitly blocked rather than silently rewritten because the maintenance pilot couples the missing dashboard to the separately unresolved ProChat strategy authority. This report establishes the roles required by MS0.3; it does not authorize a maintenance-contract rebaseline.

## Verification

- No Mind surface presents itself as authoritative runtime status.
- `home.md`, `system/reports/dashboard.md`, `live/`, the missing legacy filename, and Brain Console have explicit roles.
- Every non-historical active reference to `live/dashboard.md` is either an explicit maintenance blocker or an explicit migration record.
- No deployed, observed, or verified runtime status is claimed.

## Evidence consulted

- `home.md`
- `system/reports/dashboard.md`
- `live/README.md`
- `system/repo-boundaries.md`
- `system/reports/m1-3-active-documentation-paths-2026-07-12.md`
