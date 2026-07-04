# The ProChat Channel Starting Point

**Status:** canonical viewer orientation  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-02

## Start with your work

The ProChat YouTube channel has exactly two content lanes:

```text
ProChat Memory for QA
ProChat Workbench
```

Choose the lane that matches the problem you are trying to solve.

## Lane 1 — ProChat Memory for QA

Choose this lane when your work involves software testing and repeated investigations.

The core problem is simple:

```text
Useful lessons disappear after the failure is fixed.
```

A tester may collect logs, screenshots, traces, reproduction steps, selector details, test data, environment information, and ruled-out causes. The immediate failure gets resolved, but the reviewed lesson is often scattered across tickets, chat, notes, or memory.

When a similar failure returns, the investigation starts again.

ProChat Memory for QA provides a local, Markdown-first structure for preserving reviewed investigation knowledge.

It helps a tester remember:

- what failed;
- which evidence mattered;
- what caused the failure;
- what was ruled out;
- how it was fixed;
- which selector, data, test case, or environment condition mattered;
- what should be checked when a similar failure appears again.

### What it does not replace

ProChat Memory for QA does not replace:

- Playwright;
- Cypress;
- Selenium;
- Robot Framework;
- CI systems;
- issue trackers;
- test-management tools;
- current evidence;
- tester judgment.

Stored memory is a reviewed starting point, not automatic truth.

Current logs, screenshots, traces, reproduction results, and professional judgment decide whether an old lesson applies today.

### Local and review-first boundary

Customer and client project memory remains local.

A useful memory cycle is:

```text
capture evidence
→ draft a lesson
→ sanitize private details
→ review the lesson
→ approve trusted memory
→ retrieve it later
→ verify against current evidence
→ correct or retire it when needed
```

### Current beta position

ProChat Memory for QA is in active beta development.

The intended beta is:

- free;
- manually selected for the feedback cohort;
- open for an indefinite period with no fixed end date;
- distributed through a sanitized public repository;
- suitable for authorized company or client evaluation;
- local-first for customer and client project memory;
- dependent on human review;
- not governed by final commercial licensing yet.

### Start here

Begin with one recurring failure.

Use a sanitized example and ask:

1. What evidence proved the cause?
2. What was ruled out?
3. What fix worked?
4. What should a tester verify next time?
5. Which parts can be preserved safely as reviewed memory?

Approved next actions:

- Review the ProChat Memory for QA beta
- Try one recurring failure
- Share a repeated investigation pattern
- Provide structured beta feedback

## Lane 2 — ProChat Workbench

Choose this lane when you want ChatGPT to reason about a real local repository, documentation set, notes folder, or project workspace.

The core problem is also simple:

```text
Useful reasoning needs exact context and safe execution boundaries.
```

Copying fragments into a chat can lose project structure. Giving a tool broad access without visible boundaries creates a different risk.

ProChat Workbench provides a ChatGPT-first local workflow for:

- selecting the correct local source;
- reading exact files or symbols;
- applying bounded changes;
- using guarded operations;
- running targeted validation;
- reviewing diffs;
- staging explicit paths;
- keeping unrelated worktree changes separate;
- preserving project continuity.

### What it does not replace

ProChat Workbench is not a universal replacement for:

- editors;
- terminals;
- Git clients;
- testing tools;
- code review;
- security review;
- professional judgment;
- every other AI-assisted coding workflow.

It is a different workflow for people who prefer ChatGPT as the reasoning interface while the local computer remains the project and execution layer.

### Guarded workflow

A useful Workbench task follows this pattern:

```text
lock the source
→ verify current Git state
→ read exact context
→ define approved scope
→ make one bounded change
→ validate the result
→ review changed and staged paths
→ commit only with explicit approval
```

The result is not complete merely because a file changed. The diff, validation, and Git state must support the claim.

### Responsible comparison

Workbench may be compared with Cursor, Claude Code, and similar tools through specific criteria:

- reasoning interface;
- local context access;
- execution boundaries;
- validation;
- Git control;
- onboarding;
- workflow continuity;
- usage constraints.

No single workflow is automatically best for every person or project.

### Start here

Begin with one real, low-risk repository task.

Ask:

1. Which source is correct?
2. Which files are actually needed?
3. What must remain untouched?
4. Which validation proves the result?
5. Should anything be staged or committed?

Approved next actions:

- Review ProChat Workbench on GitHub
- Follow the installation guide
- Try one guarded task on a real repository
- Report an onboarding problem

## Shared ProChat principles

Both lanes are:

- local-first;
- review-first;
- evidence-aware;
- inspectable;
- Git-compatible;
- designed around bounded, human-approved work.

Shared rule:

```text
Memory can guide.
AI can assist.
Current evidence and human judgment remain responsible.
```

## What this channel is not

The channel is not:

- a generic software-building course;
- a founder monetization system;
- a shortcut to guaranteed results;
- an autonomous testing or coding channel;
- a source of automatic trust in AI output;
- a replacement for employer, client, repository, privacy, or legal obligations.

## Legacy-content warning

The files `scripts/001` through `scripts/010` belong to the previous channel direction.

They are non-canonical and not approved for recording or publication pending Phase 4B review.

`../archive/YouTube-Money-Plan.pdf` is an archived historical legacy asset and is not approved as current channel guidance.

## Choose one lane

```text
Repeated QA investigation?
→ Start with ProChat Memory for QA.

Guarded ChatGPT project work?
→ Start with ProChat Workbench.
```
