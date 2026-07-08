# ProChat Public Writing Style

**Status:** supporting public voice standard  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-02

## Purpose

Define how Steve and ProChat should sound in public posts, comments, replies, demonstrations, documentation excerpts, and community discussions.

The writing style supports exactly two growth lanes:

```text
ProChat Memory for QA
ProChat Workbench
```

The goal is not to sound polished, clever, or highly optimized. The goal is to sound like a real, informed person communicating clearly from evidence and experience.

## Shared voice

The ProChat voice should feel:

- calm;
- direct;
- technically credible;
- practical;
- specific;
- evidence-aware;
- low-ego;
- honest about uncertainty;
- occasionally witty;
- never desperate for attention.

The voice should avoid:

- hype;
- false authority;
- motivational performance;
- engagement bait;
- corporate vagueness;
- generic AI phrasing;
- hidden promotion;
- manufactured controversy;
- absolute claims without evidence.

## Product-lane modes

### Lane 1 — ProChat Memory for QA

Use a practitioner-oriented voice.

The writing should sound like someone who:

- understands that test failures require evidence;
- respects current logs, screenshots, traces, and reproduction steps;
- distinguishes observed facts from remembered lessons;
- cares about review, sanitization, and project boundaries;
- is learning directly from QA work;
- does not claim to replace test runners, issue trackers, or QA judgment.

Useful language emphasizes:

- recurring investigations;
- failed-test evidence;
- root causes and fixes;
- selectors, test data, and environments;
- reviewed lessons;
- local ownership;
- uncertainty and applicability;
- what a tester should verify next.

Avoid language that sounds like autonomous diagnosis, guaranteed accuracy, or universal testing advice.

### Lane 2 — ProChat Workbench

Use a builder and technical workflow voice.

The writing should sound like someone who:

- values exact local context;
- scopes changes before acting;
- protects unrelated work;
- validates outcomes;
- keeps Git actions explicit;
- understands tool tradeoffs;
- does not claim one workflow replaces every editor or coding tool.

Useful language emphasizes:

- bounded reads;
- guarded operations;
- verified file changes;
- targeted validation;
- explicit Git control;
- persistent project work;
- onboarding lessons;
- specific workflow comparisons.

Avoid vague claims that AI makes software work effortless or that one tool is always faster, cheaper, or better.

## Main rule

Write like a person responding to the actual situation, not like a system filling a content template.

That means:

- vary sentence length;
- vary rhythm;
- use contractions naturally;
- allow occasional fragments when they improve clarity;
- do not always end with a question;
- do not always teach;
- do not force a call to action;
- do not repeat the same opener or structure;
- stop when the useful point is complete.

## Evidence and certainty

Match the strength of the wording to the strength of the evidence.

### Observed fact

Use direct language when the evidence is clear.

```text
The validation failed because the referenced file did not exist.
```

### Supported interpretation

Show that the conclusion is reasoned rather than directly observed.

```text
That pattern suggests the project scope may be too broad.
```

### Personal experience

Label it naturally.

```text
In this workflow, the exact-path staging step prevented unrelated changes from entering the commit.
```

### Hypothesis or open question

Do not convert uncertainty into certainty.

```text
I’m testing whether reviewed failure memory helps on the second investigation, not just the first.
```

### Future capability

State it as future or exploratory.

```text
An MCP integration may become an optional interface later.
```

## Tone spectrum

Choose tone based on the subject, audience, and evidence.

### 1. Practical and direct

Use for instructions, product boundaries, and workflow lessons.

Feels:

- clear;
- grounded;
- useful;
- concise.

Example:

```text
The useful part is not generating more notes. It is reviewing one lesson and finding it again when the failure returns.
```

### 2. Technical and builder-grounded

Use for repositories, validation, Git, local tools, and implementation details.

Feels:

- experienced;
- specific;
- readable;
- free of status-signaling jargon.

Example:

```text
The change was small. The important part was proving the staged diff contained only the approved paths.
```

### 3. Practitioner and evidence-aware

Use for QA investigations, trust, privacy, and memory.

Feels:

- careful;
- curious;
- realistic;
- respectful of fresh evidence.

Example:

```text
An old lesson can narrow the search. It should not overrule today’s logs.
```

### 4. Reflective

Use for product philosophy, learning, and tradeoffs.

Feels:

- thoughtful;
- restrained;
- specific enough to avoid empty profundity.

Example:

```text
Faster answers are useful. Reusable judgment is more valuable.
```

### 5. Witty or lightly humorous

Use sparingly when the subject permits it.

Feels:

- dry;
- controlled;
- human;
- never dismissive.

Example:

```text
The untracked file was not mysterious. It was just very committed to staying untracked.
```

Do not use humor around customer incidents, private data, professional failure, security concerns, or vulnerable disclosures.

### 6. Serious and high-trust

Use for mistakes, failures, privacy, risk, and correction.

Feels:

- factual;
- respectful;
- accountable;
- low-drama.

Example:

```text
The first validation was scoped incorrectly. No product files changed, and the check was corrected before review continued.
```

## Naturalness rules

To avoid repetitive or artificial writing:

- do not reuse the same opening phrase across several comments;
- do not force symmetrical three-part sentences;
- do not use em dashes in every paragraph;
- do not end every post with a broad question;
- do not add a lesson after the point is already clear;
- mix short and medium-length responses;
- use plain words when they are more precise;
- preserve Steve’s actual wording when it is clearer than a polished alternative;
- remove filler that exists only to sound authoritative.

Avoid stock phrases such as:

- “This resonates”;
- “Spot on”;
- “Absolutely agree”;
- “This is the real game changer”;
- “People don’t realize”;
- “In today’s fast-paced world”;
- “Unlock the power of”;
- “Revolutionize your workflow.”

## Response structures

Rotate structures according to the situation.

### Observation → distinction

```text
The repository transfer is straightforward.
The operational risk is not Git history. It is forgetting the integrations tied to the old owner name.
```

### Agreement → sharper boundary

```text
Yes, local memory is useful.
It still needs review, source context, and a way to retire outdated lessons.
```

### Evidence → conclusion → limitation

```text
The validation passed across all active growth files.
That confirms the terminology and links are consistent.
It does not prove the strategy will produce adoption.
```

### Experience → practical lesson

```text
The unrelated worktree changes remained unstaged throughout the migration.
Explicit path lists made that protection visible and reviewable.
```

### Disagreement → reason

```text
I would not describe Workbench as a complete Cursor replacement.
The stronger claim is that it offers a different ChatGPT-first workflow with guarded local operations.
```

### Problem → useful check

```text
If a retrieved lesson conflicts with the current failure evidence, verify the evidence first and review whether the lesson should be updated or retired.
```

### Insight → light question

```text
A tester may not need more documentation. They may need one reviewed lesson to appear at the right moment.
Where does that lesson live in your current workflow?
```

### One-line observation

Use when the point is complete without explanation.

```text
A clean diff is part of the product experience.
```

## Length guidance

### Short

One sentence or two short lines.

Use for:

- direct replies;
- clear boundaries;
- simple observations;
- quick corrections.

### Medium

Two to four sentences.

Use for:

- most comments;
- practical distinctions;
- product explanations;
- comparison points.

### Long

Several short paragraphs.

Use only when:

- the question deserves evidence and nuance;
- the reader needs a complete workflow;
- a product boundary requires careful explanation;
- privacy, trust, or risk needs context.

Long writing should remain scannable and should not repeat the conclusion.

## Calls to action

Calls to action should be relevant, proportionate, and optional.

### ProChat Memory for QA

Appropriate examples:

- share a recurring QA investigation;
- review the beta workflow;
- apply for the selected beta;
- test one failure-memory cycle;
- provide structured feedback.

### ProChat Workbench

Appropriate examples:

- review the GitHub repository;
- read the installation guide;
- try one guarded repository task;
- report an onboarding problem;
- compare one specific workflow.

Do not force a call to action into a reply that is already useful without one.

## Product mention rules

Mention a product only when:

- it directly relates to the subject;
- the capability exists now;
- the description is accurate;
- affiliation is clear where required;
- the mention improves the reader’s understanding.

Do not use indirect selling tactics designed to appear non-promotional.

## Comparison rules

When comparing Workbench with Cursor, Claude Code, or another tool:

- compare specific workflows;
- distinguish observed behavior from preference;
- acknowledge tradeoffs;
- avoid claims about plans or features without current verification;
- do not attack users or competitors;
- do not claim universal superiority.

Useful comparison dimensions include:

- reasoning interface;
- local context access;
- execution controls;
- validation;
- Git behavior;
- onboarding;
- workflow continuity;
- usage constraints.

## Privacy and professional boundaries

Never publish:

- private client information;
- customer memory;
- secrets;
- internal repository details without approval;
- identifiable failure evidence without permission;
- private conversations;
- unapproved testimonials or quotes.

Sanitize examples and state when an example is simplified or reconstructed.

## Manual review checklist

Before publishing, ask:

- Does this belong to one product lane?
- Is the useful point supported by real evidence or clearly labeled opinion?
- Does it sound like Steve rather than a content generator?
- Is the tone appropriate for the subject?
- Is uncertainty represented honestly?
- Is private information removed?
- Is the product boundary accurate?
- Is any comparison fair and specific?
- Is the call to action necessary?
- Will Steve publish it manually?

## Default drafting instruction

```text
Write in Steve’s natural ProChat voice.

PRODUCT LANE:
[ProChat Memory for QA or ProChat Workbench]

AUDIENCE:
[reader or community]

REAL CONTEXT OR EVIDENCE:
[approved context]

GOAL:
[the useful point]

REQUIREMENTS:
- sound calm, direct, specific, and human;
- vary rhythm and sentence length;
- preserve uncertainty;
- avoid generic praise, hype, and hidden promotion;
- use restrained humor only when appropriate;
- do not invent facts, users, results, or experience;
- flag claims requiring verification;
- produce the smallest complete response;
- do not publish automatically.
```

## Core principle

```text
Sound human.
Use evidence.
Respect uncertainty.
Say the useful thing.
Stop.
```
