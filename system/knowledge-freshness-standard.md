# Mind Knowledge Freshness Standard

**Status:** canonical standard  
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/brain-mind-bridge.md`  
**Purpose:** keep changing knowledge current without making every Mind note schema-heavy or time-sensitive.

## Core principle

```text
Stored knowledge is not permanent proof.
Current evidence may confirm it, weaken it, contradict it, or supersede it.
```

Freshness is part of trust.

A page may be well-written, sourced, and previously correct while no longer being reliable for the present situation.

## Human-first rule

Freshness metadata should reduce uncertainty, not create maintenance work everywhere.

Use freshness fields only when the content can materially change and an outdated statement could mislead future decisions.

Do not require review dates for timeless notes, personal reflections, historical records, creative ideas, source archives, or settled convictions unless there is a specific reason.

## Knowledge states

Use this small vocabulary where state matters:

```text
draft
current
review-needed
superseded
archived
```

### `draft`

The page is exploratory, incomplete, proposed, or not yet accepted as durable truth.

### `current`

The page is the best reviewed representation of what is currently believed, decided, or active.

Current does not mean permanently true.

### `review-needed`

The page may still be useful, but something has triggered revalidation:

- the review date passed;
- new evidence appeared;
- the context changed;
- another page conflicts with it;
- the project or business moved forward;
- the page claims to describe current state but has not been reviewed recently.

### `superseded`

A newer page, decision, or section has replaced the page as current truth.

Keep the old page only when its history remains useful. Link to the replacement.

### `archived`

The page is retained for history or reference but is no longer part of the active knowledge layer.

## Optional freshness fields

Use frontmatter or a compact status block where useful:

```yaml
status: current
last_reviewed: YYYY-MM-DD
review_after: YYYY-MM-DD
supersedes: path/or-link
```

Optional supporting fields:

```yaml
owner: Steve Westhoek
source_ref: path/or-link
freshness_risk: low | medium | high
```

Do not add every optional field by default.

## What should receive freshness checks

Use freshness metadata for knowledge that changes often or drives present decisions.

### High freshness risk

- current context and dashboards;
- active project status;
- business strategy and positioning;
- pricing, offers, and go-to-market plans;
- technical architecture and system state;
- vendors, services, integrations, and tool capabilities;
- legal, tax, regulatory, or compliance guidance;
- operating procedures tied to changing tools or infrastructure.

Suggested review rhythm:

```text
current context: weekly or when context materially changes
active project status: weekly to monthly
business strategy: monthly or after major decisions
technical architecture: after material implementation changes
legal/regulatory guidance: before reliance and after relevant changes
```

These are guidance intervals, not automatic expiry rules.

### Medium freshness risk

- reusable business playbooks;
- product strategy for a developing product;
- ongoing research conclusions;
- role and responsibility pages;
- recurring workflows.

Review when new evidence appears or at a practical project milestone.

### Low freshness risk

- historical records;
- completed project retrospectives;
- stable personal preferences;
- timeless notes or reflections;
- original source material;
- archived research documents.

These normally need no recurring review date.

## Freshness triggers

A page should move to `review-needed` when one or more of these triggers occur.

### Time trigger

`review_after` has passed.

A passed date is a prompt to review, not proof that the page is false.

### Evidence trigger

New source material, implementation evidence, or observed reality conflicts with the page.

### Context trigger

The project, market, client, team, system, product, or environment changed enough that the page may no longer apply.

### Contradiction trigger

Another current page claims something materially different.

### Completion trigger

A page still describes work as active after the work was completed, paused, cancelled, or replaced.

### Usage trigger

The page repeatedly leads to incorrect assumptions, rejected proposals, or failed actions.

## Revalidation workflow

Use this sequence:

```text
freshness trigger
→ identify the affected statement
→ compare current evidence
→ classify the outcome
→ prepare the smallest update
→ human review
→ mark current, superseded, or archived
```

Possible outcomes:

1. **Confirmed current** — update `last_reviewed` and retain `current`.
2. **Partially changed** — update only the affected section and explain the change.
3. **Uncertain** — use `review-needed` and preserve both the old statement and new evidence.
4. **Replaced** — mark `superseded` and link to the replacement.
5. **No longer active** — move or mark `archived` according to the folder contract.

## Contradiction handling

When two pages conflict:

1. Do not silently combine them.
2. Identify the exact conflicting statements.
3. Check source type, date, scope, and authority.
4. Prefer current observed evidence for the present answer.
5. Distinguish raw research from committed strategy.
6. Prepare a resolution proposal with exact affected paths.
7. Preserve useful history.
8. Require human approval before changing personal or business truth.

Recommended proposal shape:

```text
Conflict:
- page A says:
- page B says:

Current evidence:

Likely reason:
- different date
- different scope
- draft versus canonical
- implementation changed
- unresolved disagreement

Recommended action:
- keep A current
- update A
- supersede B
- mark both review-needed
- preserve both as scoped viewpoints
```

## Supersession rules

Use `superseded` when a newer statement replaces an older one but the older record still has historical value.

The older page should state:

```yaml
status: superseded
superseded_by: path/or-link
last_reviewed: YYYY-MM-DD
```

The newer page may state:

```yaml
supersedes: path/or-link
status: current
```

Do not duplicate the full new truth inside the old page. Link to the replacement.

## Archive rules

Archive when content is no longer active and does not need to remain in current navigation.

Archive is not deletion.

Before archiving:

- confirm the content is no longer current;
- preserve inbound links when practical;
- update current indexes or dashboards;
- retain source and decision history;
- record the reason when it is not obvious.

## AI behavior

Brain and Mind Steward may automatically:

- detect likely stale pages;
- compare dates and current context;
- identify contradictions;
- identify completed-but-active pages;
- prepare exact-path update or supersession proposals;
- recommend a practical next review date;
- explain why a freshness check was triggered.

They must not automatically:

- declare a page false because a date passed;
- rewrite canonical business strategy;
- change personal convictions;
- archive active work;
- erase conflicting evidence;
- bulk-add metadata to every note;
- treat a newer page as automatically more authoritative.

## Validation against three real Mind pages

These examples validate the standard without changing the pages yet.

### Example 1 — Current AI context

Path:

```text
system/agent-context/00-current-context.md
```

Observed state:

```yaml
status: active
last_reviewed: 2026-05-22
```

Assessment:

- this page explicitly represents current context;
- current-context pages have high freshness risk;
- its existing `last_reviewed` field is useful;
- `active` should eventually normalize to `current` or remain as a documented compatibility value;
- because the page describes current architecture and writing defaults, it should receive a short review interval or event-triggered review;
- a passed review interval should mark it `review-needed`, not automatically rewrite it.

Pilot recommendation:

```yaml
status: review-needed
last_reviewed: 2026-05-22
review_after: 2026-06-05
freshness_risk: high
```

This is a recommendation for review, not an applied truth change.

### Example 2 — Developing product strategy

Path:

```text
projects/prochat-qa-memory/STRATEGY-PLAN.md
```

Observed state:

```text
Status: discovery strategy draft
Created: 2026-06-08
```

Assessment:

- the page is correctly labeled as a draft;
- the product has changed through implementation and strategy refinements after creation;
- developing product strategy has medium-to-high freshness risk;
- the page should remain `draft` until Steve accepts it as canonical;
- review should occur after meaningful product or positioning changes, not on a rigid weekly schedule;
- when a final strategy replaces it, the draft should be marked superseded or archived rather than silently treated as current.

Pilot recommendation:

```yaml
status: draft
last_reviewed: 2026-06-13
review_after: 2026-07-13
freshness_risk: medium
```

The `last_reviewed` date should only be applied after an actual content review.

### Example 3 — Scoped canonical business strategies

Paths:

```text
wiki/organisations/prochat/brand/product-strategy.md
wiki/organisations/prochat/brand/prochat-workbench-strategy.md
```

Observed state:

```text
Each page declares a canonical scope and human owner.
```

Assessment:

- each scoped page is canonical and therefore high-impact within its stated scope;
- canonical does not mean permanent;
- business strategy should be reviewed after major positioning, offer, product hierarchy, or go-to-market decisions;
- a page should not be rewritten merely because a review date passed;
- new niche-product strategy should extend or reference the applicable scoped strategy unless it contradicts it;
- conflicts should trigger an explicit strategy review.

Pilot recommendation:

```yaml
status: current-within-declared-scope
freshness_risk: high
```

Again, this should only be applied after Steve confirms that the applicable scoped strategy remains current.

## Pilot conclusion

The three examples confirm that one universal expiry rule would be harmful.

The appropriate model is:

```text
current-context pages → short review cycle
active project strategy → milestone/event review
canonical business strategy → periodic and decision-triggered review
```

No bulk metadata migration is recommended.

## Success criteria

The freshness standard is working when:

- changing knowledge is easier to identify;
- review dates prompt inspection without pretending to prove falsehood;
- contradictions are surfaced with exact evidence;
- superseded pages no longer compete with current truth;
- timeless notes remain lightweight;
- humans can understand status without a schema manual;
- AI maintenance suggestions reduce uncertainty rather than create noise.
