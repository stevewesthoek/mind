# ProChat OS

**Status:** active product direction  
**Owner:** Steve Westhoek  
**Organisation:** ProChat

## Positioning

ProChat OS is the flagship platform product in the ProChat ecosystem.

It is the source-available AI builder operating layer for memory, agents, automations, runtimes, SaaS operations, and managed workflows.

It turns the paired `mind` and `brain` systems into a larger commercial product direction:

```text
mind  = private human/business memory
brain = AI/system/runtime operating layer
ProChat OS = the productized system built from the pattern
```

## Public description

ProChat OS is the structured operating layer for AI-powered SaaS builders.

It connects private memory, AI agents, workflow automation, local runtimes, project context, cloud deployments, and operational visibility into one coherent system.

It is not a literal computer operating system. It is an operating system for AI-assisted work: the structure around how builders remember, decide, build, automate, deploy, monitor, and manage their products.

## Core message

```text
AI builds code.
Structure ships SaaS.
ProChat OS operates the structure.
```

## Relationship to existing ProChat positioning

Existing ProChat message:

```text
AI builds code. Structure ships SaaS.
```

ProChat OS extends this from education/kits into a platform:

- frameworks teach the structure
- kits provide implementation foundations
- ProChat OS operates the structure over time
- managed ProChat OS makes the structure usable for paying customers without self-hosting complexity

## Licensing direction

ProChat OS should be source-available, not open source.

Desired rule:

- free use, study, modification, and forks for non-commercial purposes
- commercial use requires a paid ProChat commercial license
- managed hosting, SaaS use, agency/client use, resale, and internal business operation require commercial permission

Recommended software license direction:

```text
PolyForm Noncommercial 1.0.0 + separate ProChat Commercial License
```

## Business model

Fastest path to revenue:

1. Commercial local license.
2. Managed single-tenant ProChat OS pilot.
3. Paid setup and support.
4. Managed team/fleet offering.
5. Full SaaS control plane later.

## Product architecture direction

The private `mind` and `brain` repos should work in unison and document their role in ProChat OS, but they should not be merged or published directly.

Public release should be extracted into a sanitized repo:

```text
prochat-os/
  core/
  cli/
  api/
  adapters/
  docs/
  examples/
```

## Brand risk note

`ProChat OS` can be used as the working product name, but the `ProChat` root is crowded in software/chat categories. The safest messaging is to always use the full mark `ProChat OS` and describe it as an AI builder operating layer, not as a generic chat app.

Formal trademark clearance is required before public launch.

## Near-term actions

- keep `mind` private
- keep `brain` private until extraction work is done
- create a sanitized public `prochat-os` repo
- add a non-commercial source-available license
- add commercial license summary
- add trademark policy
- build the umbrella `prochat` CLI first
- sell managed single-tenant pilots before building full SaaS
