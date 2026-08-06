# ProChat YouTube Visual Style Guide

**Status:** canonical channel visual system  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-02

## Purpose

Create a calm, precise visual system for videos about exactly two product lanes:

```text
ProChat Memory for QA
ProChat Workbench
```

The visual system should make evidence, scope, review, and validation easier to understand.

It should never make a weak claim look stronger than the evidence supports.

## Visual promise

```text
Calm technical clarity.
Visible evidence.
Controlled scope.
Low visual noise.
```

The viewer should feel that they are looking at a careful working environment, not a performance stage.

## Shared principles

- structure over decoration;
- evidence over spectacle;
- hierarchy over density;
- readable product state over cinematic framing;
- calm pacing over artificial urgency;
- consistent labels over novelty;
- real interfaces over generic stock imagery;
- honest limitations over visual persuasion.

## Product-lane expression

### ProChat Memory for QA

The visual language should emphasize:

- current failure evidence;
- reviewed memory;
- source traceability;
- local Markdown files;
- Git history where relevant;
- sanitization;
- applicability and uncertainty;
- comparison between stored lessons and current evidence.

Useful screen elements include:

- test output;
- logs;
- traces;
- screenshots;
- selectors;
- test data examples;
- memory entries;
- review states;
- source references;
- corrected or retired lessons.

Do not show private customer, client, employer, repository, environment, or account information.

### ProChat Workbench

The visual language should emphasize:

- selected source identity;
- exact local context;
- approved paths;
- bounded operations;
- validation output;
- changed versus staged files;
- cached diffs;
- commits;
- protection of unrelated work.

Useful screen elements include:

- ChatGPT conversation context;
- Workbench operation results;
- repository trees;
- focused file excerpts;
- terminal validation;
- Git status;
- changed-path lists;
- staged diffs;
- commit evidence.

Do not imply that an operation succeeded until the visible evidence confirms it.

## Aesthetic direction

Use calm systems minimalism:

- neutral working surfaces;
- restrained accents;
- generous spacing;
- clear type hierarchy;
- crisp screen capture;
- minimal decoration;
- predictable layout;
- stable framing.

Avoid:

- neon hacker styling;
- aggressive gradients;
- noisy backgrounds;
- startup-celebration imagery;
- exaggerated success graphics;
- heavy glow effects;
- clickbait visual language;
- decorative elements that obscure evidence.

## Color behavior

Use the approved ProChat brand palette when available from the canonical brand source.

For channel execution:

- use neutral surfaces for most of the frame;
- use one restrained accent to guide attention;
- reserve success treatment for actually validated results;
- reserve warning treatment for real uncertainty, failure, or review requirements;
- do not use color alone to communicate status;
- maintain readable contrast in code, logs, terminal output, captions, and diagrams.

Do not create a separate YouTube-only product palette that conflicts with the canonical brand.

## Typography

Typography should feel technical, editorial, and readable.

Use:

- a clear sans-serif for headings and labels;
- a highly readable sans-serif for body text and captions;
- monospace only for code, commands, paths, hashes, logs, and structured output;
- short labels;
- consistent capitalization;
- generous line spacing.

Avoid:

- decorative display fonts;
- excessive bold text;
- long paragraphs over screen recordings;
- tiny terminal or code text;
- multiple type styles competing in one frame.

## Screen-capture standards

Before recording:

- use a dedicated sanitized environment;
- close unrelated windows and tabs;
- hide notifications;
- remove personal bookmarks and recent files;
- remove secrets, tokens, account identifiers, and private URLs;
- enlarge important text;
- confirm the cursor is visible;
- confirm terminal history is safe;
- confirm browser and editor profiles reveal no private data;
- check the recording area before every take.

When private information appears, stop and correct the source. Do not rely only on blur added later.

## Composition

Each frame should have one clear focal point.

Prefer:

- one primary product or evidence view;
- deliberate negative space;
- one short overlay when needed;
- consistent placement for scope, evidence, validation, and limitation labels;
- stable window positions during a workflow.

Avoid showing multiple terminals, editors, dashboards, and diagrams simultaneously unless the comparison is necessary.

## Evidence labels

Use simple labels where they improve comprehension:

```text
SCOPE
CURRENT EVIDENCE
STORED MEMORY
HUMAN REVIEW
VALIDATION
LIMITATION
UNSTAGED
STAGED
COMMITTED
```

A label must describe the actual state. Do not use `VALIDATED`, `SAFE`, or `APPROVED` before the required check occurs.

## Motion language

Motion should reduce intimidation and preserve context.

Allowed:

- stable screen share;
- smooth cursor movement;
- clean cuts;
- restrained zoom for readability;
- simple highlight boxes;
- short transitions between workflow stages;
- subtle progress indicators for real multi-step sequences.

Avoid:

- rapid zooms;
- animated reactions;
- loud transitions;
- cursor circling without purpose;
- frequent camera changes;
- motion that hides the before-and-after state.

## Editing rhythm

Let the viewer see important evidence long enough to read it.

Keep:

- the initial result visible;
- the scope visible before action;
- the failed state visible when it teaches the control point;
- validation output visible after execution;
- the final limitation visible before the call to action.

Remove:

- dead time;
- repeated navigation;
- accidental private information;
- irrelevant setup;
- decorative pauses;
- duplicated explanation.

Do not edit out a relevant failure merely to make the product appear flawless.

## Diagrams

Use diagrams only when the relationship is difficult to understand from the interface alone.

### QA lane diagram patterns

```text
failure evidence
→ reviewed lesson
→ local memory
→ later retrieval
→ current verification
```

```text
raw evidence
→ sanitization
→ human review
→ approved memory
```

### Workbench lane diagram patterns

```text
ChatGPT reasoning
→ bounded Workbench operation
→ local source
→ validation
→ explicit Git state
```

```text
requested task
→ approved paths
→ verified changes
→ staged paths
→ commit
```

Keep diagrams flat, labeled, and source-traceable. Avoid decorative architecture complexity.

## Thumbnail system

Every thumbnail should communicate one bounded outcome.

Use:

- one real interface or evidence view;
- one short phrase;
- high readability;
- strong negative space;
- restrained product identification.

### QA examples

- `The Failure Returned`
- `Memory vs Fresh Logs`
- `Review Before Reuse`
- `Sanitize This Lesson`

### Workbench examples

- `Only These 3 Files`
- `Protect Unrelated Changes`
- `Review the Cached Diff`
- `One Bounded Repair`

Avoid:

- unsupported numbers;
- income or growth claims;
- exaggerated emotional faces;
- red circles and arrows;
- unrelated brand logos;
- generic “AI changed everything” language;
- text implying guaranteed success.

## On-screen product naming

Use exact names:

```text
ProChat Memory for QA
ProChat Workbench
```

Do not shorten names in a way that creates a third product or confuses the company with a feature.

## Calls to action

Use one visually restrained, lane-specific action.

### ProChat Memory for QA

- Review the beta
- Try one recurring failure
- Share an investigation pattern
- Provide structured feedback

### ProChat Workbench

- Review the GitHub repository
- Follow the installation guide
- Try one guarded task
- Report an onboarding problem

Do not use visual calls to action for obsolete products, generic software courses, or monetization systems.

## Accessibility

- provide accurate captions;
- avoid color-only distinctions;
- maintain readable contrast;
- keep overlays concise;
- explain important visual state verbally;
- enlarge evidence before discussing it;
- avoid flashing or rapid motion;
- provide meaningful link descriptions.

## Legacy warning

The existing `scripts/001` through `scripts/010` and `../archive/YouTube-Money-Plan.pdf` belong to the previous channel direction and are preserved as historical legacy material.

They are not approved sources for current thumbnails, visual examples, diagrams, calls to action, or product positioning pending Phase 4B review.

## Final visual review

Before publication, confirm:

- the primary product lane is unmistakable;
- the focal evidence is readable;
- private information is absent;
- status labels match the actual state;
- success styling follows validation;
- the limitation is visible or spoken;
- the call to action matches the lane;
- visual restraint supports comprehension rather than hiding weak evidence.
