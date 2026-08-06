# ProChat Brand and Public-Platform Governance

**Status:** canonical governance  
**Owner:** Steve Westhoek  
**Approved:** 2026-07-11

## Purpose

This document defines how ProChat company truth, product truth, design truth, copy, public pages, and implementation evolve without creating competing sources of authority.

## Authority hierarchy

```text
1. Company philosophy and product strategy in Mind
2. Canonical public copy and design direction in Mind
3. Repository-local implementation specifications in ProChat
4. Production code and tests
5. Prototypes and experiments
6. Archived historical material
```

A lower layer may implement or test a higher layer. It may not silently redefine it.

## Maturity model

ProChat follows a principles-to-guidance-to-code progression.

```text
Principles
→ strategy, philosophy, trust, and design values

Guidance
→ copy, page responsibility, visual language, component anatomy, motion, accessibility, and performance

Code
→ tokens, components, routes, tests, analytics, and production behavior
```

Do not begin code-level expansion when the relevant principle or guidance remains unresolved.

## Canonical document classes

### Company truth

Examples:

- company philosophy;
- product strategy;
- product naming;
- product roadmap;
- customer profiles;
- public-platform strategy;
- founder/company positioning.

Location:

```text
Mind
```

### Brand and design truth

Examples:

- brand rules;
- canonical homepage copy;
- global design foundation;
- visual and motion system;
- public communication principles.

Primary location:

```text
Mind
```

Implementation translation:

```text
ProChat repository documentation
```

### Implementation truth

Examples:

- technical design;
- component contracts;
- route map;
- design tokens in code;
- tests;
- migration matrices;
- production deployment.

Location:

```text
ProChat repository
```

## Change process

Every foundational change follows:

```text
problem or evidence
→ authority check
→ proposed decision
→ canonical documentation change
→ implementation-plan update
→ bounded implementation
→ validation
→ explicit commit
```

Do not reverse this sequence by changing production design first and documenting it later.

## Decision status

Every major design or platform decision should be one of:

- proposed;
- approved;
- canonical;
- deferred;
- deprecated;
- archived.

Canonical documents should state status, owner, date, and review trigger.

## Contribution requirements

A new or changed component, pattern, page, or cinematic sequence is incomplete without:

- purpose;
- permitted use;
- content guidance;
- visual states;
- responsive behavior;
- accessibility behavior;
- reduced-motion behavior where relevant;
- implementation guidance;
- test coverage;
- migration or deprecation impact.

## Legacy governance

Legacy material must not be deleted by intuition alone.

Every legacy item is classified as:

- keep;
- refactor;
- rewrite;
- replace;
- archive;
- redirect;
- delete.

The classification must include:

- current consumers;
- current route or dependency;
- canonical replacement;
- migration sequence;
- rollback risk;
- validation requirement;
- deletion authorization.

Deletion occurs only after:

- the replacement is verified;
- routes and consumers are accounted for;
- redirects are approved where necessary;
- tests pass;
- the removal is isolated in Git.

## Page governance

Each public page requires:

- a named primary audience;
- one primary job;
- one primary conversion or next step;
- canonical claims;
- page-level visual story;
- metadata;
- responsive and accessibility requirements;
- ownership;
- review trigger.

A page that cannot satisfy these requirements should be merged, archived, redirected, or removed.

## Design-system governance

The global design system includes:

- principles;
- tokens;
- typography;
- color;
- spacing;
- layout;
- visual primitives;
- interaction and motion;
- accessibility;
- performance;
- documentation;
- production components.

Design-system maturity is not measured by the number of components. It is measured by consistency, adoption, documentation, accessibility, maintainability, and the ability to support real products.

## Performance governance

Performance budgets are release constraints.

New design or functionality must explain its cost in:

- JavaScript;
- CSS;
- fonts;
- images or media;
- main-thread work;
- layout shift;
- interaction latency;
- mobile rendering.

A visual effect that exceeds the approved budget must be simplified, deferred, or removed unless the budget is consciously revised with evidence.

## Accessibility governance

Accessibility is included in every phase:

- research;
- content;
- design;
- prototyping;
- component implementation;
- visual QA;
- release validation;
- maintenance.

Automated checks supplement but do not replace manual keyboard, screen-reader, zoom, contrast, motion, and mobile review.

## Review cadence

Review foundational company and product strategy:

- when product stage changes;
- before a new discipline edition;
- before monetization;
- before a major hosted service;
- before a new product name;
- at least quarterly while pre-revenue.

Review public-platform and design documentation:

- before each major page build;
- after prototype testing;
- after a significant design-system migration;
- after accessibility or performance findings;
- after removal of major legacy surfaces.

## Model and agent governance

AI agents must read the relevant canonical and local documents before proposing or editing.

Agents may:

- explore alternatives;
- critique;
- prototype;
- implement bounded changes;
- validate.

Agents may not:

- invent new product names;
- change canonical claims silently;
- introduce a new palette or font system without approval;
- delete legacy code without a migration decision;
- treat a prototype as production truth;
- commit unrelated worktree changes.

## Evidence required for completion

Every major phase should produce:

- changed paths;
- canonical decisions;
- screenshots or prototypes where visual;
- validation evidence;
- accessibility findings;
- performance findings;
- migration state;
- commit hash;
- exact next task.
