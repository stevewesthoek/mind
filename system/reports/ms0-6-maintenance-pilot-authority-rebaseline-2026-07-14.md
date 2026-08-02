# MS0.6 Maintenance-Pilot Authority Rebaseline — 2026-07-14

**Status:** complete — Mind maintenance evidence and fixture policy only.
**Scope:** no runtime, deployment, automation, credential, or task-state change.

## Prerequisite confirmation

- MS0.2 is complete: the unsupported single ProChat OS strategy concept is retired.
- MS0.3 is complete: `home.md` is the Mind navigation/orientation surface; Mind does not claim runtime status.

## Rebaselined five-file pilot

| Former fixture assumption | Rebaselined Mind path | Classification | Rule |
|---|---|---|---|
| `router/00-current-context.md` | `system/agent-context/00-current-context.md` | Verified path replacement | Use the current agent-context page for freshness metadata. |
| `live/projects/prochat-qa-memory/STRATEGY-PLAN.md` | `projects/prochat-qa-memory/STRATEGY-PLAN.md` | Verified path replacement | Retain its draft-status semantics. |
| nonexistent single ProChat OS strategy | `wiki/organisations/prochat/brand/product-strategy.md` | Scoped compatibility-authoritative strategy | Read only within its declared company/product scope; consult `brand/README.md` for the applicable authority and do not generalize it to Workbench strategy. |
| `live/dashboard.md` | `home.md` | Verified Mind documentation-role replacement | Use for human navigation/orientation only; Brain Console and Brain Core retain runtime authority. |
| `system/automation-roadmap.md` | unchanged | Mind technical-roadmap evidence | Keep its documented automation boundary; do not infer live implementation state. |

## Authority handling in the fixture

- **Verified replacements** are read by their exact current Mind paths above.
- **Compatibility exceptions** remain read-only and scoped: the ProChat brand path is not general `wiki/` authority; `wiki/log.md` remains a proposal-ledger compatibility dependency, not durable knowledge authority.
- **Historical evidence** such as `live/dashboard.md` in the top-level migration plan remains historical and is not a pilot input.
- **Blocked authority decisions** must be emitted as a blocked/report-only finding with exact evidence. The runner must not select a strategy, dashboard, or runtime replacement for an absent path. No such unresolved authority remains in this five-file fixture after MS0.2 and MS0.3.

## Documents rebaselined

- `system/maintenance-report-contract.md`
- `system/runbooks/maintenance-report-pilot-runbook.md`
- `system/maintenance-brain-implementation-handoff.md`
- `system/orientation-brief-template.md`

The runbook and contract now identify the strategy as scoped and `home.md` as human navigation. They do not claim that Mind has live runtime status or that the rebaselined fixture is deployed.

## Verification

All current pilot paths and supporting canonical paths exist:

```text
system/agent-context/00-current-context.md=true
projects/prochat-qa-memory/STRATEGY-PLAN.md=true
wiki/organisations/prochat/brand/product-strategy.md=true
wiki/organisations/prochat/brand/prochat-workbench-strategy.md=true
wiki/organisations/prochat/brand/README.md=true
home.md=true
system/automation-roadmap.md=true
```

No active Mind document outside reports/history/archive retains the retired missing strategy or dashboard fixture reference. The only remaining `live/dashboard.md` occurrence is explicit migration-history evidence in `system/top-level-folder-redesign-migration-plan.md`.
