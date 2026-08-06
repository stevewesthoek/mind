# ProChat YouTube Roadmap

**Status:** canonical channel roadmap  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-02

## Roadmap principle

Publish only what current product evidence supports.

The channel has exactly two content lanes:

```text
ProChat Memory for QA
ProChat Workbench
```

The roadmap should build viewer understanding in this order:

```text
problem
→ product boundary
→ first safe workflow
→ evidence and review
→ repeated use
→ honest comparison or limitation
```

## Current stage

ProChat is pre-revenue.

YouTube should prioritize:

- product understanding;
- selected QA beta learning;
- qualified Workbench discovery;
- installation and onboarding;
- real demonstrations;
- trust and privacy;
- evidence of repeated value;
- documentation improvements.

It should not optimize around generic software-building demand, founder monetization, or unrelated infrastructure tutorials.

## Shared production sequence

Every roadmap item must define:

1. product lane;
2. viewer problem;
3. bounded outcome;
4. sanitized demonstration source;
5. evidence shown;
6. validation shown;
7. limitation stated;
8. one relevant call to action.

## Lane 1 — ProChat Memory for QA

### Stage QA-1 — Problem and product boundary

Goal:

```text
Help testers recognize repeated investigation work and understand what ProChat Memory does not replace.
```

Candidate videos:

1. **Why the same QA failure gets investigated twice**  
   Show where useful lessons disappear after a test is fixed.

2. **What belongs in QA memory—and what does not**  
   Separate current evidence, draft observations, and reviewed lessons.

3. **Old memory versus today’s logs**  
   Demonstrate why current evidence overrides a stored lesson.

4. **ProChat Memory for QA in one local workflow**  
   Show capture, sanitization, review, approval, retrieval, and correction.

Exit criteria:

- the product is clearly understood as local reviewed memory;
- no viewer could reasonably mistake it for a test runner or autonomous diagnosis system.

### Stage QA-2 — First useful memory cycle

Goal:

```text
Show one tester completing a bounded memory cycle locally.
```

Candidate videos:

5. **Turn one failed test into a reviewed lesson**  
   Use a sanitized failure with visible evidence.

6. **Record what was ruled out during an investigation**  
   Preserve discarded hypotheses without presenting them as truth.

7. **Store the fix without exposing client information**  
   Demonstrate sanitization and project boundaries.

8. **Retrieve a relevant lesson for a similar failure**  
   Show why retrieval narrows the search but does not decide the cause.

Exit criteria:

- installation and first use are demonstrable;
- one complete local cycle can be shown without private data;
- the review step is visible.

### Stage QA-3 — Tool-specific demonstrations

Goal:

```text
Connect the memory workflow to real testing evidence without replacing the testing tool.
```

Candidate videos:

9. **Playwright failure memory: selector changed**
10. **Cypress investigation memory: environment mismatch**
11. **Selenium lesson: timing and stale element evidence**
12. **Robot Framework memory: data or keyword change**
13. **CI failure: what the trace proved and what it did not**

Each video must:

- use current evidence from the named tool;
- sanitize repositories and test data;
- show the reviewed memory created;
- state applicability limits.

Exit criteria:

- at least one current tool workflow is demonstrated safely;
- practitioner feedback identifies which examples are genuinely useful.

### Stage QA-4 — Repeated value and case-study learning

Goal:

```text
Show whether reviewed memory helps during a later investigation.
```

Candidate videos:

14. **The failure returned: did the old lesson help?**
15. **When a QA lesson should be corrected**
16. **When a QA lesson should be retired**
17. **What a tester rejected—and why**
18. **A beta onboarding problem we fixed**

Case-study requirements:

- real or explicitly reconstructed timeline;
- permission for any participant information;
- no invented time saving;
- visible evidence for the claimed benefit;
- limitation and counterexample where relevant.

Exit criteria:

- reviewed memory helps at least one later investigation;
- the workflow’s trust and onboarding problems are understood better.

## Lane 2 — ProChat Workbench

### Stage WB-1 — Product and installation boundary

Goal:

```text
Explain the ChatGPT-first local workflow and get one supported installation working.
```

Candidate videos:

1. **What ProChat Workbench connects—and what stays local**
2. **Install Workbench and connect one source**
3. **Give ChatGPT exact repository context without uploading the whole project**
4. **Workbench versus an editor-first workflow: the practical difference**

Exit criteria:

- viewers understand ChatGPT as the reasoning interface and the local computer as the project layer;
- installation and source connection are reproducible from current documentation.

### Stage WB-2 — Guarded task fundamentals

Goal:

```text
Show a meaningful real-project task with visible boundaries.
```

Candidate videos:

5. **Read only the files needed for one change**
6. **Make one bounded documentation update**
7. **Validate a change without running the whole test suite**
8. **Protect unrelated worktree changes during an AI-assisted task**
9. **Review a diff before staging anything**

Exit criteria:

- one real repository task is completed with exact scope;
- validation and final Git state are shown.

### Stage WB-3 — Git control and repair

Goal:

```text
Demonstrate explicit Git control and evidence-based repair.
```

Candidate videos:

10. **Stage exact paths instead of everything**
11. **Review the cached diff before committing**
12. **A validation failed: one bounded repair attempt**
13. **Why Workbench stops when source identity changes**
14. **Commit a clean task while unrelated files remain modified**

Exit criteria:

- viewers can distinguish changed, staged, and committed work;
- failure handling is shown honestly rather than edited out.

### Stage WB-4 — Real-project workflows and comparisons

Goal:

```text
Show where the Workbench workflow is useful and where another tool may fit better.
```

Candidate videos:

15. **Documentation migration across several verified files**
16. **Resume a project task from persisted state**
17. **Workbench and Cursor: compare one repository workflow**
18. **Workbench and Claude Code: compare validation and Git control**
19. **When not to use Workbench**
20. **An onboarding problem that changed the product**

Comparison requirements:

- verify current product behavior;
- compare one concrete workflow;
- acknowledge plan, platform, and usage differences;
- avoid universal conclusions;
- state personal preference separately from observed behavior.

Exit criteria:

- qualified builders try the repository for a relevant reason;
- comparisons produce actionable onboarding or product feedback.

## Cross-lane videos

A video may discuss both products only when the relationship is the subject, such as:

- why local project memory and guarded project work are separate products;
- how reviewed memory can inform a Workbench task without becoming automatic authority;
- shared principles: local-first, Git-versioned, review-first, and evidence-aware.

The title, description, and call to action must still identify one primary lane.

## Publishing priorities

Select the next video using this order:

1. unblock installation or first use;
2. answer a repeated practitioner question;
3. demonstrate a current product capability;
4. clarify a trust, privacy, or review boundary;
5. show repeated value;
6. compare workflows responsibly;
7. address distribution opportunities only when product relevance remains strong.

## Legacy content status

The current files `scripts/001` through `scripts/010` are from the previous channel roadmap.

They are:

- legacy;
- non-canonical;
- not approved for recording;
- not approved for publication;
- pending Phase 4B disposition.

`../archive/YouTube-Money-Plan.pdf` is an archived historical legacy asset and is not approved as current roadmap guidance.

No roadmap item may depend on those materials until their content is reviewed and deliberately migrated.

## Roadmap success

The roadmap succeeds when YouTube contributes to:

### ProChat Memory for QA

- better QA problem understanding;
- suitable selected beta participants;
- successful local evaluations;
- evidence of later reuse;
- trust and privacy learning;
- honest case studies.

### ProChat Workbench

- qualified GitHub discovery;
- successful installation;
- real guarded tasks;
- clearer validation and Git control;
- repeat builder use;
- useful comparison and onboarding feedback.

Views and subscribers are distribution signals, not roadmap exit criteria.
