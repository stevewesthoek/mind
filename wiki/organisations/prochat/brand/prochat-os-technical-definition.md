# ProChat OS Technical Definition

**Status:** canonical technical definition  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-03

## Product definition

ProChat OS is a managed AI work system that combines three layers:

```text
Work Memory + Workflow Modules + Review Loop
```

The system turns messy business input and reusable company knowledge into useful outputs that people can review and use.

## Core flow

```text
input arrives
→ select relevant Work Memory
→ run the workflow module
→ prepare output
→ ask for review where needed
→ capture feedback
→ improve examples, rules, and memory
```

## Layer 1 — Work Memory

Work Memory stores the reusable context that makes AI output useful for a person, team, or business.

Work Memory can include:

- writing style
- tone of voice
- good examples
- bad examples
- decision rules
- procedures
- templates
- client context
- project context
- product/service context
- common questions and answers
- objections and responses
- approved phrases
- recurring report formats
- reviewer feedback

Implementation options:

- markdown files
- indexed documents
- structured metadata
- vector search where useful
- database records where useful
- repo-backed storage where useful

Design rule:

```text
Work Memory must be inspectable, editable, portable, and model-agnostic.
```

## Layer 2 — Workflow Modules

A workflow module turns a repeated situation into a specific output.

A module defines:

- buyer problem
- input types
- expected output
- needed Work Memory
- workflow steps
- approval checkpoints
- examples
- evaluation criteria

Examples:

- sales follow-up module
- support reply module
- founder delegation module
- document summary module
- proposal draft module
- status report module
- content preparation module

Design rule:

```text
A module should solve one recognizable repeated work problem.
```

## Layer 3 — Review Loop

The review loop improves output quality.

It captures:

- output generated
- reviewer edits
- approval or rejection
- missing context
- useful examples
- repeated corrections
- time saved estimate

Improvement loop:

```text
run → review → capture feedback → update memory/examples/rules → run better next time
```

## Customer delivery

Default delivery is managed by ProChat.

The customer can send work through simple entry points:

- email
- form
- file drop
- manual upload
- shared folder
- API call

The customer receives outputs such as:

- summary
- checklist
- draft reply
- proposal draft
- support answer
- report
- task list
- status update

## Technical components

The implementation can include:

- workflow runner
- worker/scheduler
- input handlers
- output handlers
- Work Memory store
- index builder
- retrieval layer
- model/provider execution layer
- approval state
- event log
- review feedback store
- optional console
- optional support CLI
- optional module registry

These are implementation components, not public marketing terms.

## Storage principles

Work Memory should be:

- portable
- readable
- versionable
- exportable
- easy to inspect
- separated by person/team/company scope
- safe to update through review

Suggested scopes:

```text
personal memory
team memory
department memory
company memory
```

Promotion path:

```text
personal useful pattern → team-approved pattern → department/company memory
```

## Indexing principles

AI should not search every document blindly.

Every Work Memory should include indexes or summaries that help the system find the right context quickly.

Useful indexes:

- people index
- clients index
- projects index
- examples index
- procedures index
- decisions index
- tone/style index
- recurring outputs index

## Safety principles

Important outputs stay review-first by default.

Automation levels:

```text
review only → assisted sending → approved low-risk automation
```

Do not impersonate employees without clear approval.

Do not market the system as replacing people.

The system prepares work. People remain responsible for review and use.

## Reproducible setup

The technical environment should become repeatable across demo, managed, and customer-specific deployments.

Candidate tools:

- containers
- Devbox
- Nix
- documented managed-server baseline

This is a support and implementation concern, not buyer-facing positioning.

## Future CLI direction

A future CLI may support:

```bash
prochat memory index
prochat memory validate
prochat module list
prochat module run sales-followup
prochat module evaluate sales-followup
prochat support bundle
```

These commands are roadmap ideas, not current public promises.
