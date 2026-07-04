# ProChat YouTube Playbook

**Status:** canonical channel playbook  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-02

## Purpose

Use YouTube to demonstrate real product workflows, teach practical control points, build relevant practitioner trust, and collect product learning.

Every approved video belongs to exactly one lane:

```text
ProChat Memory for QA
ProChat Workbench
```

The channel is not a generic software-building course, a founder monetization system, or an infrastructure tutorial library.

## Channel promise

```text
One real problem.
One bounded workflow.
Visible evidence.
A reviewed result.
```

The viewer should leave knowing:

- what problem was addressed;
- what evidence was used;
- what ProChat did;
- what the human still had to review;
- what was validated;
- what remains uncertain.

## Audience

### Lane 1 — ProChat Memory for QA

Primary audience:

- individual QA testers;
- QA engineers;
- test-automation practitioners;
- Playwright, Cypress, Selenium, and Robot Framework users;
- QA leads and test managers evaluating future tester adoption.

Viewer problems may include:

- solving similar failures repeatedly;
- losing useful investigation notes;
- weak handoffs between testers;
- outdated lessons overriding current evidence;
- private client information appearing in notes;
- difficulty finding the relevant root cause later;
- uncertainty about what belongs in trusted memory.

### Lane 2 — ProChat Workbench

Primary audience:

- developers;
- builders;
- technical operators;
- vibe coders;
- ChatGPT power users;
- people evaluating local AI-assisted project workflows.

Viewer problems may include:

- ChatGPT lacking exact local context;
- broad or accidental file changes;
- unverified edits;
- unrelated work entering a commit;
- unclear Git state;
- unsafe command execution;
- broken onboarding;
- uncertainty about tradeoffs between project tools.

## Authority

Steve’s authority comes from:

- professional software-testing experience;
- visible investigation discipline;
- careful scoping;
- evidence review;
- verification rather than performance;
- honest disclosure of failed attempts and limitations;
- current product work shown on screen.

Authority does not come from:

- invented customer outcomes;
- revenue claims;
- follower counts;
- speed claims without evidence;
- universal tool comparisons;
- pretending the beta is more mature than it is.

## Content lane 1 — ProChat Memory for QA

### Objectives

Videos should support:

- QA domain credibility;
- selected beta understanding;
- real workflow demonstrations;
- tester onboarding;
- structured feedback;
- privacy and trust learning;
- evidence-based case-study development.

### Approved video types

#### Repeated failure demonstration

Show:

1. a sanitized failure;
2. the evidence collected;
3. the reviewed lesson created;
4. a later similar failure;
5. how memory narrowed the investigation;
6. why current evidence still controlled the conclusion.

#### Investigation-memory walkthrough

Show one bounded memory cycle:

```text
capture
→ sanitize
→ review
→ approve
→ retrieve
→ verify
→ improve or retire
```

#### Tool-specific QA example

Use a real or carefully sanitized example from:

- Playwright;
- Cypress;
- Selenium;
- Robot Framework;
- CI logs;
- selectors;
- test data;
- environment differences.

The tool remains the source of current evidence. ProChat Memory preserves reviewed learning around it.

#### Trust and privacy video

Explain:

- what stays local;
- what should be sanitized;
- how project scopes work;
- why client information should not enter public demonstrations;
- why retrieved memory may be wrong or outdated;
- how human review protects trust.

#### Beta onboarding video

Demonstrate one verified installation or first-use path.

State accurately that:

- beta participation is selected;
- the beta is free;
- it has no fixed end date;
- customer and client memory remains local;
- licensing is not final;
- human review remains required.

#### Product-learning video

Show a real onboarding problem, failed retrieval, trust concern, or product limitation and explain what changed afterward.

### Prohibited QA positioning

Do not claim that ProChat Memory:

- automatically diagnoses every failure;
- replaces test runners or tester judgment;
- guarantees correct root causes;
- turns unreviewed input into trusted knowledge;
- eliminates the need for fresh logs or reproduction;
- hosts customer project memory.

## Content lane 2 — ProChat Workbench

### Objectives

Videos should support:

- qualified GitHub discovery;
- installation and onboarding;
- real-project adoption;
- guarded workflow understanding;
- validation discipline;
- explicit Git control;
- responsible comparisons;
- product feedback.

### Approved video types

#### Guarded repository task

Show:

1. the exact requested outcome;
2. source selection;
3. bounded context reading;
4. one verified change;
5. targeted validation;
6. the final diff;
7. explicit staging or the decision not to stage.

#### Unrelated-work protection

Demonstrate how a task proceeds while pre-existing unrelated changes remain untouched and unstaged.

#### Validation and repair

Show:

- a failed validation;
- the evidence from the failure;
- one bounded repair;
- the rerun;
- the final state.

Do not hide the failure to make the workflow look smoother.

#### Git-control demonstration

Show:

- exact changed paths;
- staged versus unstaged state;
- cached diff review;
- an explicit-path commit;
- why broad staging is avoided.

#### Installation and onboarding

Demonstrate one supported installation or source-connection path using current documentation.

Record real friction and update the documentation when appropriate.

#### Responsible comparison

Compare Workbench with Cursor, Claude Code, or another tool only through specific criteria:

- reasoning interface;
- local context access;
- execution boundaries;
- validation;
- Git control;
- onboarding;
- workflow continuity;
- usage constraints.

A comparison must acknowledge tradeoffs and current verification limits.

### Prohibited Workbench positioning

Do not claim that Workbench:

- replaces every editor or coding tool;
- guarantees correct or secure code;
- prevents every hallucination;
- has unlimited usage;
- is always cheaper or faster;
- can operate safely without review;
- should be trusted with production changes without independent verification.

## Video selection rules

Create a video only when:

- it belongs to one product lane;
- the workflow exists now;
- a real demonstration or approved sanitized example is available;
- the outcome can be bounded;
- validation can be shown;
- privacy can be protected;
- the viewer can take one relevant next action.

Skip or defer when:

- the capability is future-only;
- the example depends on private material that cannot be sanitized safely;
- the result is not reproducible enough to demonstrate honestly;
- the video would exist only to maintain a publishing schedule;
- the topic is generic software advice unrelated to either current product.

## Production format

### Delivery

- screen share is the default;
- use calm, direct narration;
- show the result early;
- explain only the context needed for the bounded outcome;
- preserve mistakes that teach a useful control point;
- avoid performance, drama, and artificial urgency.

### Length

Use the shortest complete format.

A video may be short when one control point is enough. It may be longer when evidence, privacy, or a multi-step workflow requires context.

Do not force every video into an arbitrary duration.

### Editing

Use:

- clean cuts;
- occasional zoom for readability;
- labels for scope, evidence, validation, and result;
- readable terminal, browser, editor, or product views.

Avoid:

- fast cuts;
- loud sound effects;
- manufactured suspense;
- exaggerated reaction shots;
- decorative animation that obscures evidence.

## Evidence standard

Every demonstration should identify:

- the source of truth;
- the observed evidence;
- the action taken;
- the validation performed;
- the limitation of the result.

Use direct language for observed facts and qualified language for interpretations.

Examples:

```text
The test failed because the selector no longer matched the current page.
```

```text
The retrieved lesson suggests checking the environment variable, but today’s logs still need to confirm it.
```

```text
The cached diff contains only the three approved paths. That confirms commit scope, not product quality.
```

## Privacy and sanitization

Before recording:

- use a sanitized repository or example;
- remove customer and client identifiers;
- remove secrets, tokens, internal URLs, and private account details;
- review terminal history and notifications;
- check filenames, branches, tabs, browser profiles, and recent files;
- avoid exposing private memory or unrelated worktree content;
- confirm permission for any third-party material.

Stop recording when private information appears. Correct the source rather than relying only on post-production blur.

## Calls to action

Use one relevant action.

### ProChat Memory for QA

- Review the ProChat Memory for QA beta
- Try one recurring failure
- Share a repeated investigation pattern
- Provide structured beta feedback

### ProChat Workbench

- Review ProChat Workbench on GitHub
- Follow the installation guide
- Try one guarded task on a real repository
- Report an onboarding problem

Do not direct viewers to obsolete products, generic monetization resources, or unrelated software-building offers.

## Publishing workflow

1. Select one content lane.
2. Define one viewer problem and one bounded outcome.
3. Confirm the current product capability.
4. Prepare sanitized evidence and a safe demonstration environment.
5. Record the result-first workflow.
6. Review claims, privacy, limitations, and product boundaries.
7. Confirm the call to action matches the lane.
8. Publish manually after Steve’s approval.
9. Record useful questions, objections, onboarding problems, and product learning.

## Success signals

### ProChat Memory for QA

- a tester understands one memory cycle;
- a suitable tester expresses informed beta interest;
- a repeated QA problem is articulated more clearly;
- a privacy or trust requirement is discovered;
- a demonstration leads to structured product feedback;
- a real later investigation benefits from reviewed memory.

### ProChat Workbench

- a relevant builder reviews the repository;
- installation or onboarding succeeds;
- a real guarded task is attempted;
- a validation or Git-control concept becomes clearer;
- a responsible comparison generates useful feedback;
- a product or documentation issue is identified.

Views, subscribers, and watch time may provide distribution context. They do not prove retained product value.

## Legacy boundary

`scripts/001` through `scripts/010` belong to the previous channel direction.

They are non-canonical and not approved for recording or publication pending Phase 4B review.

`../archive/YouTube-Money-Plan.pdf` is an archived historical legacy asset and must not guide current channel decisions.

## Core principle

```text
Show one real workflow.
Expose the evidence.
Keep the scope bounded.
Review the result.
State the limitation.
```
