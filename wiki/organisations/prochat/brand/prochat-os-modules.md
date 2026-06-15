# ProChat Product Modules

**Status:** canonical module architecture  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-14

## Naming source of truth

```text
wiki/organisations/prochat/brand/product-naming-architecture.md
```

## Product suite relationship

```text
ProChat Memory      = reusable knowledge foundation
ProChat Answers     = grounded question-answering product
ProChat Automations = repeated-work product
ProChat Workbench   = safe local project workbench
ProChat for [...]   = packaged role or industry solution
```

## Internal module model

The business products use two internal module types:

```text
Memory modules
Automation modules
```

Together they create two main product patterns:

```text
question + approved memory → reliable answer with sources
```

```text
messy input + reusable memory → review-ready work
```

These are internal architecture terms. Public product language should use ProChat Memory, ProChat Answers, and ProChat Automations.

## Memory modules

A memory module stores reusable knowledge for a person, project, client, team, department, company, or niche.

It may contain:

- style and tone
- examples of good work
- examples to avoid
- procedures
- templates
- decisions and rules
- client and project context
- approved answers
- objections and responses
- recurring formats
- reviewer feedback
- source references
- indexes

Memory scopes:

```text
personal
project
client
team
department
company
cross-project
niche
```

Memory should be inspectable, editable, portable, source-traceable, model-agnostic, and safely promoted through review.

## ProChat Answers modules

ProChat Answers uses approved memory to answer questions reliably.

An Answers module defines:

- supported question types
- approved memory scopes
- source requirements
- retrieval rules
- answer format
- citation or source behavior
- confidence and uncertainty behavior
- review and correction rules
- feedback capture

Examples:

- company policy answers
- product support answers
- project knowledge answers
- client-file answers
- legal knowledge answers
- accounting procedure answers
- sales offer and objection answers

Core loop:

```text
question
→ retrieve approved memory and sources
→ prepare grounded answer
→ show sources
→ capture correction or approval
→ improve memory
```

## ProChat Automations modules

An automation module turns one repeated work situation into one recognizable output.

It defines:

- buyer problem
- input types
- expected output
- required memory
- steps
- skills
- approval checkpoints
- schedule where useful
- evaluation criteria

Examples:

- Follow-up Automation
- Proposal Automation
- Support Reply Automation
- Reporting Automation
- Intake Automation
- Content Automation
- Delegation Automation

Design rule:

```text
One automation should solve one repeated work problem.
```

## Module pairing

The strongest products pair memory with answers or automations.

Examples:

```text
sales memory + Answers → grounded answers about offers and objections
sales memory + Follow-up Automation → stronger follow-up drafts
support memory + Answers → consistent internal support guidance
support memory + Support Reply Automation → review-ready customer replies
founder memory + Delegation Automation → clearer task instructions
marketing memory + Content Automation → more on-brand drafts
operations memory + Reporting Automation → faster recurring reports
```

## Solutions

Use:

```text
ProChat for [Role or Industry]
```

A solution combines:

```text
relevant memory
+ ProChat Answers where useful
+ ProChat Automations where useful
+ review rules
+ delivery configuration
```

Examples:

- ProChat for Founders
- ProChat for Sales
- ProChat for Support
- ProChat for Marketing
- ProChat for Operations
- ProChat for Legal
- ProChat for Accounting

Solutions reuse the same foundation. They are not separate technical platforms.

## Skills

A skill is a small reusable ability inside an Answers or Automation module.

Examples:

- retrieve relevant sources
- summarize notes
- extract missing information
- draft follow-up email
- classify support request
- convert notes to tasks
- apply preferred style
- prepare report outline

Skill rules:

- one skill should do one job
- inputs and outputs should be clear
- examples should be included
- skills should be testable
- important decisions should remain reviewable

## Review and improvement

Every Answers and Automation module needs evaluation.

Questions:

- Was the answer or output useful?
- Was it accurate?
- Were the right sources used?
- Did it match the expected style?
- What did the reviewer edit?
- What context was missing?
- Did it save time?
- Should memory, rules, or module behavior change?

Improvement loop:

```text
run → review → capture feedback → improve memory or module → run better next time
```

## First modules to build

Priority:

1. Founder or owner memory
2. ProChat Answers for approved company knowledge
3. Sales memory plus Follow-up Automation
4. Support memory plus Answers and Support Reply Automation
5. Marketing memory plus Content Automation
6. Operations memory plus Reporting Automation

## ProChat Workbench relationship

ProChat Workbench is the builder product powered by the BuildFlow engine.

It may help maintain memory files, source indexes, automation definitions, documentation, tests, validation, and explicit reviewed changes.

It is not a memory or automation module. It is a separate product for safe local project work.

## Public language rule

Do not sell manifests, module graphs, retrieval architecture, or workflow runtimes first.

Sell the relevant product outcome:

```text
ProChat Answers → reliable answers from trusted knowledge
ProChat Automations → repeated work prepared for review
ProChat Workbench → safe local project work with ChatGPT
```
