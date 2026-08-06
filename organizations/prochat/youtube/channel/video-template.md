# ProChat Result-First Video Template

**Status:** canonical production template  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-02

## Purpose

Use one repeatable structure for calm, evidence-first product demonstrations.

Every video must select exactly one primary lane:

```text
ProChat Memory for QA
ProChat Workbench
```

## Before recording

Complete this preparation block:

```text
PRODUCT LANE:
[ProChat Memory for QA or ProChat Workbench]

VIEWER PROBLEM:
[one real problem]

BOUNDED OUTCOME:
[one result the video will prove]

SOURCE OF TRUTH:
[current logs, product state, repository, documentation, or approved example]

PRIVATE DATA CHECK:
[what must be sanitized or hidden]

VALIDATION:
[how the result will be checked]

LIMITATION:
[what the result does not prove]

CALL TO ACTION:
[one lane-specific next action]
```

Do not record until the demonstration source is safe and the outcome can be validated visibly.

## Video structure

### 0:00 — Show the verified result

Open with the final state or the clearest evidence that the bounded outcome was achieved.

Examples:

#### ProChat Memory for QA

- the reviewed lesson retrieved for a later similar failure;
- the sanitized memory entry and its source evidence;
- the corrected or retired lesson after new evidence appeared.

#### ProChat Workbench

- the final scoped diff;
- passing targeted validation;
- the cached staged-path list;
- unrelated worktree changes still untouched.

State the outcome plainly:

```text
In this video, we’re proving that [bounded result].
```

Do not imply that the visible result proves more than it does.

### 0:20 — Define the problem and boundary

Explain:

- the real problem;
- which product lane applies;
- what the video will change or demonstrate;
- what remains outside scope.

Examples:

```text
This is a QA memory workflow, not a test-runner replacement.
```

```text
This task changes one approved documentation file. It does not modify application code.
```

### 0:45 — Identify the source of truth

Show the evidence that controls the workflow.

#### QA lane

Possible sources:

- current test logs;
- screenshots;
- traces;
- reproduction steps;
- test code;
- CI output;
- reviewed existing memory.

State that current evidence overrides stored memory.

#### Workbench lane

Possible sources:

- locked repository source;
- exact files or symbols;
- current Git status;
- approved task scope;
- current documentation;
- validation output.

State which paths or operations are allowed.

### 1:15 — Execute calmly

Screen share is the default.

Rules:

- explain only what matters to the bounded outcome;
- keep actions small and visible;
- show the review point before accepting important changes;
- do not hide uncertainty;
- do not skip privacy or permission boundaries;
- stop when the source or scope is no longer trustworthy.

#### QA lane execution pattern

```text
capture evidence
→ draft memory
→ sanitize
→ review
→ approve
→ retrieve or compare
```

#### Workbench lane execution pattern

```text
verify source
→ read exact context
→ make bounded change
→ validate
→ review diff and Git state
```

### Control insight

Pause once to explain the main tester-derived control point.

Examples:

```text
The old lesson narrows the search, but today’s logs decide whether it applies.
```

```text
The change is not complete until the diff and validation prove the scope.
```

This is the authority moment. Keep it factual and brief.

### Validation

Show the exact check used to confirm the result.

#### ProChat Memory for QA

Possible validation:

- the lesson preserves its source;
- private details are removed;
- the tester approves the lesson;
- retrieval finds the relevant memory;
- current evidence confirms or rejects applicability;
- the lesson is corrected or retired when necessary.

#### ProChat Workbench

Possible validation:

- targeted tests or checks pass;
- the changed-path list matches scope;
- the cached diff contains only approved paths;
- unrelated changes remain unstaged;
- the latest commit matches the approved message;
- the final file exists with the intended content.

Do not replace validation with “it looks right.”

### Limitation

State one important limitation before the call to action.

Examples:

```text
This lesson helped with one later investigation. It does not guarantee the next failure has the same cause.
```

```text
The documentation validation passed. That does not prove the product implementation is correct.
```

### Call to action

Use exactly one lane-specific action.

#### ProChat Memory for QA

- Review the ProChat Memory for QA beta
- Try one recurring failure
- Share a repeated investigation pattern
- Provide structured beta feedback

#### ProChat Workbench

- Review ProChat Workbench on GitHub
- Follow the installation guide
- Try one guarded task on a real repository
- Report an onboarding problem

Do not direct viewers to unrelated products, generic software-building resources, or monetization systems.

## Production rules

- one primary lane;
- one viewer problem;
- one bounded outcome;
- one visible source of truth;
- one validation sequence;
- one stated limitation;
- one call to action;
- manual review before publication.

Video length follows the evidence required. Do not pad a small result or compress a trust-sensitive workflow unnaturally.

## Editing rules

Use:

- clean cuts;
- readable screen capture;
- occasional zoom for evidence;
- simple labels for scope, evidence, review, validation, and result;
- captions when they improve accessibility.

Avoid:

- loud sound effects;
- fast decorative edits;
- manufactured suspense;
- fake failures;
- hidden corrections;
- overlays that obscure logs, diffs, or product state.

## Thumbnail formula

Use:

```text
one real product or evidence view
+
one short bounded outcome
```

Example QA text:

- `The Failure Returned`
- `Memory vs Fresh Logs`
- `Review Before Reuse`
- `Sanitize the Lesson`

Example Workbench text:

- `Only These 3 Files`
- `Validation Failed—Then Passed`
- `Protect Unrelated Changes`
- `Review the Cached Diff`

Avoid clickbait, unsupported numbers, income claims, arrows, exaggerated reactions, and unrelated tool logos.

## Description template

```text
[One-sentence bounded outcome]

Product lane:
[ProChat Memory for QA or ProChat Workbench]

What this video shows:
- [problem]
- [evidence]
- [workflow]
- [validation]
- [limitation]

Next action:
[one approved lane-specific call to action]
```

## Final review checklist

Before publication, confirm:

- the product lane is explicit;
- the capability exists now;
- the demonstration source is sanitized;
- private tabs, notifications, paths, and credentials are hidden;
- evidence and interpretation are distinguished;
- human review is visible;
- validation supports the claim;
- limitations are stated;
- the call to action matches the lane;
- no legacy script or unverified asset was used as canonical guidance.
