# ProChat Workbench Strategy

**Status:** canonical product strategy  
**Owner:** Steve Westhoek  
**Last updated:** 2026-08-15  
**Review after:** 2026-09-15  
**Freshness risk:** high

## Naming source of truth

```text
wiki/organisations/prochat/brand/product-naming-architecture.md
```

## One-sentence position

ProChat Workbench helps people **build apps through ChatGPT locally**.

A more precise enterprise-grade positioning line is:

```text
ChatGPT plans and reasons. Workbench executes locally with policy, evidence, validation, and Git discipline.
```

## Product role

ProChat Workbench is the ChatGPT-first local control plane for building applications and working with knowledge repositories on a user-owned computer.

It should not become another AI IDE, terminal coding agent, or cloud coding worker. Instead, it should occupy the missing middle layer between ChatGPT, local repositories, Codex, MCP servers, local CLIs, local applications, validation, Git, and release workflows.

The long-term product goal is to let a user write or approve a roadmap, define autonomy boundaries, and have Workbench execute that roadmap locally until the work is complete, blocked, or reaches a pre-defined approval gate.

## Product gap

The defensible gap is:

```text
There is no mature, ChatGPT-native, local-first, policy-controlled execution bridge that lets a Custom GPT safely drive real local repositories through long-lived roadmap or goal-mode work, while preserving auditability, resumability, validation, and Git discipline.
```

Workbench should not compete directly with Cursor, Claude Code, GitHub Copilot coding agent, Codex, or Devin Desktop. Those products are editors, coding agents, cloud workers, or agent managers. Workbench should complement them as the local policy and execution control plane for ChatGPT-led work.

## Core philosophy

Workbench follows the broader ProChat philosophy:

```text
Memory is the foundation.
Evidence keeps it trustworthy.
Human review improves it.
AI puts it to work.
```

Within that philosophy, Workbench's specific doctrine is:

```text
ChatGPT is the reasoning and conversation surface.
The user's computer is the execution environment.
Workbench is the trusted bridge between them.
```

Workbench should be:

- **ChatGPT-first:** the primary interface is ChatGPT or a Custom GPT, not a special IDE.
- **Local-first:** repositories, folders, roadmaps, and knowledge remain on the user's machine unless explicitly exported, pushed, or published.
- **Policy-controlled:** all reads, writes, commands, MCP tools, Codex calls, Git operations, and release actions pass through Workbench rules.
- **Evidence-driven:** substantial work produces durable evidence, not vague claims.
- **Resumable:** long work can continue across turns, restarts, and conversations without reconstructing state.
- **Git-disciplined:** important changes are reviewable, explicit, and commit-based.
- **Tool-brokering:** Codex, MCP, CLIs, and local apps are capabilities governed by Workbench, not bypasses around Workbench.

## Founder decisions

The current product direction is based on the following decisions:

1. The product remains ChatGPT-first.
2. The primary public promise is: **Build apps through ChatGPT locally**.
3. Autonomy must be configurable. Some local-only builds may run until completion, while launch, deployment, publishing, external network writes, and risky operations require explicit approval levels.
4. Codex should become the main helper or executor, but Workbench should use ChatGPT as the main reasoning interface and use Codex credits deliberately.
5. Implementation should start with CLI capability support, then Codex integration, then MCP client brokering, then Workbench as an MCP server.
6. The long-term architecture should be MCP-compatible from the beginning.
7. Workbench should support both code repositories and knowledge repositories.
8. The local public product should remain free to use under the Workbench public licensing model. Monetization should focus on managed services, team or enterprise control planes, commercial/OEM licensing, support, and hosted coordination.

## Autonomy model

Workbench needs explicit autonomy levels.

| Level | Name | Description | Human approval required |
| --- | --- | --- | --- |
| 0 | Advisory | Read and advise only | Any write |
| 1 | Suggested edits | Propose patches, no direct write | Every write |
| 2 | Bounded edit | Write within exact approved files | Scope expansion, commit, push |
| 3 | Task mode | Complete one task with validation and one repair loop | Commit, push, destructive/risky operations |
| 4 | Phase mode | Complete a roadmap phase with persisted progress | Policy changes, push, deployment, secrets |
| 5 | Local goal mode | Complete an approved local roadmap end-to-end | External effects, ambiguous risk, failure exhaustion |
| 6 | Release/deploy mode | Push, tag, publish, deploy, external writes | Explicit approval gates only |

The target product capability is Level 5 for local app and repository development. Level 6 should remain approval-gated.

The product promise should be:

```text
Give Workbench a roadmap and a policy. It will execute locally until the goal is complete, blocked, or reaches a defined approval gate.
```

## Capability broker direction

Workbench should add a capability broker instead of raw integrations.

Context and capability sources must also be provider-driven. Workbench may use
Steve's Mind/Brain repositories as a high-value reference integration, but the
product core must not encode those repository names, paths, taxonomy, host
topology, or Steve-specific skills. Other users must be able to attach their own
knowledge/context sources and capability catalogs through the same versioned
contracts.

```text
Workbench Core
├─ Source / repo registry
├─ Context reader
├─ Write policy
├─ Validation jobs
├─ Git steward
├─ Persistent runs
└─ Capability broker
   ├─ CLI provider
   ├─ Codex provider
   ├─ MCP client provider
   ├─ Workbench MCP server provider
   ├─ Local app provider
   └─ Future managed provider
```

The Custom GPT action surface should remain small and stable:

```text
list_capabilities
inspect_capability
run_capability
get_capability_job
cancel_capability_job
```

Each capability must declare:

- id;
- description;
- input and output schemas;
- allowed working directories;
- allowed path scopes;
- write policy;
- network policy;
- timeout;
- confirmation level;
- risk level;
- validation requirements;
- audit logging requirements.

## CLI capability strategy

The first capability phase should support named local CLI tools.

Do not add arbitrary shell access. Add locally configured, allowlisted capabilities with command arrays, argument schemas, path scopes, network rules, confirmation requirements, output limits, and validation hooks.

## Codex strategy

Codex should be the main helper, but not an uncontrolled replacement for Workbench.

Recommended stages:

1. **Codex review mode** — Workbench calls Codex for read-only planning, review, or patch suggestions.
2. **Codex isolated worktree mode** — Workbench creates a temporary Git worktree, delegates a bounded task to Codex, reads the diff, validates, scans, and then stages or commits exact paths according to policy.
3. **Codex executor for roadmap packets** — Workbench delegates individual roadmap packets to Codex while Workbench remains the authority for run state, validation, repair limits, Git, and release evidence.

Codex should not initially modify the main working tree directly.

## MCP strategy

MCP compatibility is a long-term goal and should shape the architecture from the beginning.

### Phase A — MCP client broker

Workbench connects to configured MCP servers, reads tools and resources, validates metadata, applies policy, and exposes only approved tools to ChatGPT.

```text
ChatGPT -> Workbench -> approved MCP server/tool
```

### Phase B — Workbench as MCP server

Workbench exposes its own safe actions as MCP tools so other clients can call Workbench.

```text
Codex / Claude Code / Cursor / other MCP client -> Workbench MCP server -> local repo policy
```

Workbench as MCP server is strategically important because it makes Workbench a reusable local governance layer, not only a Custom GPT backend.

## MCP security requirements

Workbench must protect against:

- tool poisoning;
- malicious tool descriptions;
- prompt injection through resources;
- hidden tool instructions;
- unsafe tool argument schemas;
- delegated privilege confusion;
- untrusted tool outputs;
- accidental secret disclosure;
- tool-to-tool escalation.

Required controls:

- static tool validation before exposure;
- user-visible tool names, arguments, and risk levels;
- schema validation for all inputs;
- output redaction;
- path and network policies;
- per-tool confirmation;
- durable audit logs;
- disabled-by-default high-risk tools.

## Business model direction

The local tool should remain free and open under the Workbench public licensing model. Monetization should avoid weakening trust in the local-first story.

Likely paid paths:

1. **Commercial/OEM licensing** for organizations that do not want public-license obligations or want embedded/private use.
2. **Managed Workbench Cloud** for encrypted run history sync, team policy management, hosted dashboards, organization-level audit logs, shared capability registry, approval workflows, and remote/mobile approvals.
3. **Team control plane** for policy templates, approved capabilities, secrets isolation, audit logs, approval routing, and compliance export.
4. **Managed capability packs** for signed, supported integrations with Codex, GitHub, Linear, Jira, design tools, databases, deployment systems, and enterprise tooling.
5. **Support, onboarding, and implementation services** for teams adopting Workbench.

Recommendation:

```text
free AGPL/local tool
-> commercial/OEM licensing
-> team/enterprise support
-> managed control plane
-> managed capability packs
```

Do not start with a heavy managed product before the local tool proves real usage.

## What Workbench should not build now

Avoid:

- a full IDE or editor;
- unrestricted shell access;
- generic uncontrolled MCP marketplace;
- autonomous deploys by default;
- cloud-first rewrite;
- unrestricted local app or computer control;
- team enterprise administration before the single-user local workflow is excellent.

## Strategic roadmap order

The canonical product sequence is now stability-first. Workbench should become reliable as a local background control plane before adding broad new execution capabilities.

1. Performance telemetry dashboard.
2. Session manager.
3. Per-repo job queues and locks.
4. Compact evidence store.
5. Menu-bar local supervisor.
6. Worker pool and resource budgets.
7. Tunnel and local connection monitor.
8. Source automation and re-indexing.
9. Multi-repo control board.
10. Product doctrine and autonomy levels.
11. Capability broker core.
12. Named local CLI capabilities.
13. Goal-mode hardening for local roadmap execution.
14. Codex review adapter with native approval before delegation.
15. Codex isolated worktree adapter.
16. MCP client broker.
17. Workbench MCP server.
17.5. Source-agnostic context and capability federation: Workbench can consume bounded context plus skills, orchestrators, runbooks, named CLIs, validators, and MCP capabilities through neutral provider contracts; Steve's Brain/Mind integration is one profile, not product core.
18. Cross-device ChatGPT/Codex handoff.
19. Managed/team control plane only after repeated local value is proven.

## Success criteria

Workbench is succeeding if a technical founder can:

1. open ChatGPT or a Custom GPT;
2. select a local repo or knowledge folder;
3. describe an app, feature, or knowledge-work goal;
4. ask Workbench to create a roadmap;
5. approve autonomy level and policy;
6. let Workbench execute locally;
7. see validation, commits, and evidence;
8. stop only for meaningful approval gates;
9. resume later without reconstructing context.

## Repository authority

This Mind document is the canonical ProChat Workbench product strategy.

The Workbench product repository may maintain repository-local implementation strategy, technical architecture, capability plans, and release mechanics, but it must not independently redefine this product strategy, company positioning, naming, business model, licensing policy, or cross-product roadmap.
