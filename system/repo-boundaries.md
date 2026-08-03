# Cross-Repo Constitution: Mind, Brain, Brain Core, and Brain Console

**Status:** canonical boundary document  
**Last reviewed:** 2026-08-03
**Owner:** Steve Westhoek  
**Applies to:** `mind`, `brain`, Brain Core, Brain Console, ProChat OS documentation  

## Canonical rule

```text
mind documents intent.
brain operationalizes intent.
Brain Core exposes operational truth.
Brain Console visualizes and controls through Brain Core.
```

This document exists to prevent strategy drift, duplicated truth, and mixed responsibilities between the private knowledge system and the machine-operational system.

## Mind repo role

```text
mind = private Steve/business memory
```

The `mind` repo is Steve's private human and business wiki. It is also the canonical product-definition layer for business strategy, brand direction, positioning, go-to-market thinking, and roadmap intent.

`mind` may also act as the prototype pattern for customer memory and context because it demonstrates how structured human/business knowledge can be organized. That does not make the private `mind` repo the customer product.

### Mind owns

- private human memory
- business memory
- organization context
- product strategy
- brand strategy
- public positioning
- go-to-market direction
- high-level roadmaps and phase intent
- project context and decisions
- personal and business documentation
- canonical prose strategy

### Mind does not own

- runtime APIs
- Brain Core API contracts
- Brain Console source code
- local machine control code
- feature execution code
- operational status JSON
- local app orchestration code
- runtime logs
- secrets or credentials

## Brain repo role

```text
brain = AI/system/runtime operating layer
```

The `brain` repo is the machine-operational AI brain. It contains the system rules, capabilities, runtime services, runbooks, feature implementations, local-machine configuration patterns, project implementation records, and control-plane software needed for AI-assisted work.

The `brain` repo may contain ProChat OS documentation when that documentation has an execution, architecture, implementation, API, runbook, or operational purpose. It must not become a second source of canonical business strategy.

### Brain owns

- AI-operational machine brain
- system rules, skills, configs, and runbooks
- local runtime services
- Brain Core implementation and API contracts
- Brain Console implementation
- feature implementations
- local app orchestration
- machine-readable runtime documentation
- execution readiness and capability registries
- project implementation plans and completion records
- operational safety boundaries

### Brain does not own

- canonical ProChat OS business strategy
- canonical brand positioning
- canonical go-to-market direction
- personal identity canon
- broad organization truth
- duplicated `mind` strategy content
- secrets in Git

## Brain Core role

Brain Core is the local API boundary and operational source of truth for machine/session/workflow state.

### Brain Core owns

- machine-readable API contracts
- runtime state surfaces
- health, capabilities, sessions, skills, repos, and local apps
- approvals and audit surfaces
- execution readiness
- safe controlled action endpoints
- JSON payloads consumed by Brain Console and other local clients

### Brain Core does not own

- UI rendering
- canonical business strategy
- brand messaging
- project-specific admin UI
- broad shell execution
- direct secret exposure
- uncontrolled Mind mutations

## Brain Console role

Brain Console is the human control plane. The canonical Brain Console runtime is now a standalone local web application owned entirely by the `brain` repo.

```text
Brain Console = primary control-plane UI in brain.
Obsidian = optional viewer of local Brain Console pages.
```

Brain Console visualizes and controls the system by consuming Brain Core API surfaces. It should not depend on native Obsidian plugin lifecycle for operational workflows.

### Brain Console owns

- dashboard visualization
- operator review surfaces
- manual refresh and observability
- approval views
- controlled buttons that call Brain Core endpoints
- shared system health and readiness views
- feature visibility for both local and cloud capabilities

### Brain Console does not own

- source-of-truth data
- direct shell execution from the browser UI
- canonical strategy
- copied runtime reports inside Mind notes
- secrets
- autonomous mutation outside approved Brain Core endpoints
- operational dependence on Obsidian-native plugin state

### Obsidian relationship

`mind` may view Brain Console through an Obsidian web viewer, but `mind` does not consume, host, or implement Brain Console. The operational console remains in `brain`; Obsidian is only a viewing surface.

## Product strategy and implementation plans

There is no single canonical ProChat OS strategy document. The former one-document claim is retired because its referenced file does not exist.

ProChat strategy is intentionally scoped in Mind:

- `wiki/organisations/prochat/brand/product-strategy.md` is the canonical company and product strategy for ProChat's product portfolio.
- `wiki/organisations/prochat/brand/prochat-workbench-strategy.md` is the canonical strategy for ProChat Workbench.
- `wiki/organisations/prochat/brand/README.md` is the canonical index that identifies the applicable brand and product authority.

Brain-side ProChat documents must be execution-facing. They may describe architecture, CLI plans, managed-service plans, Brain Core contracts, Brain Console surfaces, deployment patterns, implementation phases, and operational runbooks. They must defer to the applicable scoped Mind strategy rather than restating, replacing, or generalizing it.

If a Brain document conflicts with an applicable Mind strategy, update the Brain document to defer to that scoped strategy unless the Mind strategy itself is intentionally changed first.

## Duplication rules

Do not duplicate strategy across repos.

Allowed in Brain:

- short summaries that explicitly defer to Mind
- implementation architecture derived from Mind strategy
- operational plans and runbooks
- API contracts and console surface definitions
- historical implementation records clearly marked as archived

Not allowed in Brain:

- competing ProChat OS strategy definitions
- alternative product categories
- separate public positioning canon
- copied long-form strategy from Mind
- outdated strategy kept without an archive warning

## Video Orchestrator boundary

Video Orchestrator is a ProChat OS module with two separate execution lanes:

```text
Local Video Orchestrator = local development/control/readiness lane.
Cloud Video Orchestrator = AWS-backed media execution lane.
```

They may share concepts, metadata contracts, approval models, templates, Brain Core visibility, and Brain Console dashboard surfaces. They must not be described as the same implementation.

### Local Video Orchestrator owns

- local planning and readiness surfaces
- local development fixtures and dry-runs
- local module visibility through Brain Core
- local operator review in Brain Console
- non-production experiments where explicitly marked

### Cloud Video Orchestrator owns

- AWS-backed generation and rendering
- Bedrock, Polly, Transcribe, Nova, MediaConvert, S3, Step Functions, Lambda, and related cloud execution
- cloud job folders and exported media assets
- production-oriented async video pipeline execution

### Shared between both lanes

- ProChat OS workflow concepts
- approval gates
- metadata contracts where explicitly shared
- status visibility in Brain Console
- implementation documentation links

### Must not be mixed

- local fixture/readiness state must not be presented as cloud production execution
- cloud execution state must not be hidden inside local-only docs
- Brain Console may show both lanes, but each card/section must identify whether it represents local or cloud capability
- implementation plans must say which lane they affect

## Link and move policy

Do not move, delete, or rename files merely to make the structure look cleaner. Assume every file may have references, links, or symlinks.

When a file is moved, deleted, renamed, or superseded:

1. preserve the information or explicitly archive it
2. update every known reference
3. leave a redirect or pointer when useful
4. validate that code and dashboard paths still work when code is involved
5. document the new canonical location

Documentation cleanup should prefer clarification, archive labels, and index files over destructive restructuring.
