# ProChat OS Modules

**Status:** canonical module architecture  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-03

## Purpose

ProChat OS is built from two module types:

```text
Work Memory modules
Workflow modules
```

Work Memory modules store reusable knowledge.

Workflow modules turn repeated situations into useful outputs.

Together they create the product pattern:

```text
messy input + reusable work knowledge → ready-to-review output
```

## Work Memory module

A Work Memory module organizes the knowledge that makes outputs sound and feel right for a person, team, or company.

A Work Memory module may include:

- style guide
- preferred tone
- examples of good work
- examples to avoid
- procedures
- templates
- decisions
- client/project context
- common answers
- objections and responses
- recurring formats
- review feedback
- index files

Examples:

- founder/owner memory
- sales memory
- support memory
- marketing voice memory
- operations/reporting memory
- team memory
- company memory

A Work Memory module is useful when people keep explaining the same context or rewriting outputs into the same preferred style.

## Workflow module

A workflow module turns a repeated work situation into a specific output.

A workflow module may include:

- problem statement
- input examples
- output examples
- required Work Memory
- workflow steps
- skills
- schedules where useful
- approval checkpoints
- evaluation criteria

Examples:

- lead follow-up
- support reply
- client intake summary
- document summary and checklist
- sales proposal draft
- weekly status report
- content preparation
- delegation instructions

A workflow module is useful when the same type of work repeats often enough to make automation valuable.

## Module pairing

The best product comes from pairing Work Memory with workflow modules.

Examples:

```text
sales memory + lead follow-up workflow → better follow-up drafts
support memory + support reply workflow → more consistent customer answers
founder memory + delegation workflow → clearer tasks for the team
marketing voice memory + content workflow → more on-brand drafts
operations memory + reporting workflow → faster weekly updates
```

## Module manifest

Each module should eventually have a small manifest.

Work Memory manifest fields:

- name
- scope: personal, team, department, company
- owner
- purpose
- included knowledge types
- indexes
- allowed workflows
- review/update rules

Workflow manifest fields:

- name
- buyer problem
- input types
- expected outputs
- required Work Memory
- steps
- approval requirements
- schedule if recurring
- evaluation criteria

## Skills

A skill is a small reusable ability used inside a workflow module.

Examples:

- summarize notes
- extract missing information
- draft follow-up email
- classify support request
- convert notes to tasks
- prepare report outline
- apply brand voice

Skill rules:

- one skill should do one job
- inputs and outputs should be clear
- examples should be included
- skills should be testable in isolation
- skills should not hide business-critical decisions from reviewers

## Schedules

Schedules are useful for recurring work.

Examples:

- daily lead follow-up draft
- daily support summary
- weekly status report
- weekly missing-information list
- monthly client document checklist
- monthly content planning draft

Schedules should prepare work for review unless the workflow is low-risk and explicitly approved for automation.

## Evaluation

Every module needs evaluation.

Evaluation questions:

- Was the output useful?
- Was the output accurate?
- Did it match the desired style?
- What did the reviewer edit?
- What context was missing?
- Did it save time?
- Should the memory, examples, rules, or workflow change?

Evaluation loop:

```text
run → review → capture feedback → improve module → run better next time
```

## First modules to build

Priority order:

1. Founder/owner memory
2. Sales follow-up memory and workflow
3. Support reply memory and workflow
4. Marketing voice memory and content workflow
5. Operations/reporting memory and workflow

Legal and accounting can still be built as niche workflow modules, but they are not required for the core product to be understandable or sellable.

## Public language rule

Do not sell modules, memory, manifests, skills, schedules, or architecture.

Sell the outcome:

```text
We help your team stop rewriting, re-explaining, and redoing the same work.
```

Internal delivery language:

```text
We build the Work Memory and workflow module that produce the buyer's desired output.
```
