# ProChat OS Roadmap

**Status:** canonical roadmap  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-03

## Roadmap principle

Build ProChat OS by proving one repeated work outcome at a time.

Do not start with a broad platform, every connector, or a regulated niche.

Start with one person or team, one repeated task, a small set of examples, and one review-ready output.

## Product build order

```text
1. First time-saving test
2. Work Memory for one person or team
3. Workflow module for one repeated task
4. Review feedback loop
5. Done-for-you launch
6. Managed improvement
7. Team rollout
8. Department/company memory
```

## Phase 1 — First time-saving test

Goal:

```text
Prove that ProChat can save time on one repeated information task.
```

Best first scenario:

```text
Founder/owner gives messy notes, examples, and context → ProChat prepares a client reply, task instruction, and proposal draft in the business style.
```

Inputs:

- 3 to 10 examples of past work
- notes or emails that represent the repeated task
- desired output format
- reviewer feedback

Outputs:

- one useful draft
- one checklist or task list
- one short summary of what context was used
- one before/after demo

Exit criteria:

```text
The buyer can clearly see how the output saves time compared with doing it manually.
```

## Phase 2 — Work Memory v1

Goal:

Create the first reusable Work Memory structure for one person or team.

Minimum Work Memory:

- style notes
- good examples
- things to avoid
- preferred output format
- common facts/context
- recurring decisions/rules
- reviewer feedback
- simple index

Exit criteria:

```text
The system can reuse the same knowledge across more than one output without the user re-explaining everything.
```

## Phase 3 — Workflow module v1

Goal:

Turn one repeated task into a reusable workflow module.

Candidate first modules:

- founder/owner client reply
- sales follow-up
- support reply
- proposal draft
- weekly status report
- content draft

Minimum module definition:

- input type
- output type
- required Work Memory
- steps
- approval rule
- evaluation questions

Exit criteria:

```text
The same type of input can produce a useful output repeatedly, with human review.
```

## Phase 4 — Review feedback loop

Goal:

Improve outputs from reviewer edits and comments.

Capture:

- what was approved
- what was edited
- what was rejected
- what context was missing
- what example should be added
- what rule should change

Exit criteria:

```text
The second or third run is visibly better because feedback improved the Work Memory or workflow module.
```

## Phase 5 — Done-for-you launch

Goal:

Make the first workflow usable by a real buyer.

Entry points can be simple:

- email
- form
- file drop
- manual upload
- shared folder
- API call

Outputs should be easy to review:

- email draft
- document draft
- checklist
- task list
- report
- status update

Exit criteria:

```text
The buyer can use the output in their normal work without learning a complex new system.
```

## Phase 6 — Managed improvement

Goal:

Turn the first workflow into a recurring managed service.

Recurring tasks:

- improve examples
- clean up context
- update rules
- review failures
- add small output improvements
- track whether time is still being saved

Exit criteria:

```text
The buyer keeps paying because the output remains useful and improves over time.
```

## Phase 7 — Team rollout

Goal:

Expand from one person to one team.

Team rollout adds:

- shared examples
- approved language
- shared procedures
- team-specific output formats
- role-based review rules
- more repeated tasks

Exit criteria:

```text
More than one person benefits from the same Work Memory and workflow modules.
```

## Phase 8 — Department/company memory

Goal:

Promote useful patterns from one person or team into broader company memory.

Promotion path:

```text
personal pattern → team-approved pattern → department/company memory
```

Exit criteria:

```text
The business captures knowledge that would otherwise stay scattered across people, documents, chat history, and old examples.
```

## First demo to build

Build a simple demo around this before/after:

Before:

```text
A founder has messy notes, old examples, client context, and a request that needs a reply or proposal.
```

After:

```text
ProChat prepares a review-ready reply, proposal outline, task list, and short explanation of the context used.
```

This is business-agnostic, easy to understand, and does not require legal/accounting expertise.

## Roadmap rules

- one repeated task at a time
- one clear output at a time
- examples before automation
- human review before important use
- feedback improves the memory
- sell time saved, not architecture
- expand only when the first output is useful

## Active implementation notes

Engineering work should support the roadmap above.

The current internal automation work can continue when it proves reusable ProChat OS capabilities such as:

- workflow execution
- approvals
- event logs
- output generation
- scheduling
- review loops
- managed infrastructure

Internal modules such as video orchestration are implementation proof, not the public product identity.
