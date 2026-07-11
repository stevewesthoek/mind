# ProChat Public Platform Foundation Roadmap

**Status:** canonical public-platform roadmap  
**Owner:** Steve Westhoek  
**Approved:** 2026-07-11

## Program objective

Create a durable, company-level public platform for ProChat before expanding production implementation.

The program includes philosophy, strategy, page architecture, design language, product visuals, motion, technical foundations, legacy migration, public pages, validation, and launch governance.

## Program principles

- Company and product truth precede page design.
- Principles precede guidance; guidance precedes code.
- Static visual quality precedes cinematic motion.
- Mobile, accessibility, and performance are designed from the beginning.
- Legacy removal follows an inventory and migration decision.
- Every page has one primary audience and one primary job.
- ProChat is the company; ProChat Memory is the flagship; Memory for QA is the current edition; Workbench is the second product.
- Production work begins only after the relevant prototype and review gates pass.

## Phase 1 — Company foundation

**Status:** active and substantially complete.

### Goal

Make the highest-level ProChat philosophy, vision, mission, narrative, positioning, founder relationship, and decision principles explicit.

### Tasks

- define company belief;
- define vision and mission;
- define core philosophy;
- define product and trust principles;
- define design philosophy;
- define communication philosophy;
- define founder/company positioning;
- define decision tests;
- reconcile product strategy and narrative.

### Deliverables

```text
company-philosophy.md
product-strategy.md
narrative.md
public-platform-strategy.md
brand-governance.md
```

### Exit criteria

- ProChat can be described consistently as a company;
- founder transparency does not turn the site into a freelancer portfolio;
- the product hierarchy remains exact;
- philosophy, product strategy, and public-platform strategy do not conflict.

## Phase 2 — Public platform architecture

**Status:** active.

### Goal

Define the complete public platform before page-level design.

### Tasks

- define sitemap and navigation;
- define page responsibilities;
- define audience and conversion per page;
- define footer architecture;
- define legal and contact paths;
- define documentation role;
- define SEO and metadata responsibilities;
- define analytics and measurement boundaries;
- define company and founder presentation.

### Required pages

```text
/
/memory
/memory/qa
/workbench
/philosophy
/about
/contact
/privacy
/terms
documentation entry points
404 and error states
```

Routes may differ in implementation when existing compatibility requires it, but page responsibility must remain stable.

### Exit criteria

- every required page has one primary job;
- navigation and footer expose the correct hierarchy;
- no legacy product remains a top-level public destination without an approved reason;
- conversion destinations are explicit.

## Phase 3 — Canonical content second pass

**Status:** planned.

### Goal

Review all existing approved page copy against the completed philosophy and page architecture.

### Tasks

- review homepage copy;
- review ProChat Memory copy;
- review Memory for QA copy;
- write or review Workbench page copy;
- write philosophy page;
- write About page;
- write Contact page and form language;
- review Privacy and Terms for current product boundaries;
- define footer and navigation copy;
- define 404 and error-state copy;
- define metadata and social copy;
- create a claims register per page;
- create a canonical glossary and terminology map.

### Exit criteria

- every page has approved copy before production design;
- all claims are supported and correctly scoped;
- current, beta, future, and prohibited statements remain distinct;
- no page depends on legacy terminology.

## Phase 4 — Design-language foundation

**Status:** approved foundation; detailed expansion planned.

### Goal

Turn brand character into a reusable visual grammar.

### Tasks

- maintain global design principles;
- define visual language;
- define product visual library;
- define copy-to-visual mapping;
- define motion storyboards;
- define component anatomy;
- define imagery and iconography;
- define responsive behavior;
- define accessibility behavior;
- define performance budgets;
- define design-lab operation.

### Deliverables in the implementation repository

```text
DESIGN_PRINCIPLES.md
VISUAL_LANGUAGE.md
PRODUCT_VISUAL_LIBRARY.md
COPY_VISUAL_MAP.md
MOTION_STORYBOARD.md
DESIGN_LAB.md
COMPONENT_LIBRARY.md
RESPONSIVE_STRATEGY.md
ACCESSIBILITY_STRATEGY.md
PERFORMANCE_STRATEGY.md
```

### Exit criteria

- every major company and product proposition has a visual grammar;
- products remain recognizably related;
- mobile and reduced-motion forms are specified;
- implementation agents can act without inventing design decisions.

## Phase 5 — Foundational legacy sweep

**Status:** planned before production redesign.

### Goal

Understand and classify existing public-platform code, copy, styles, routes, assets, and experiments before replacement or removal.

### Inventories

- route audit;
- page audit;
- copy audit;
- component audit;
- style and token audit;
- motion audit;
- asset audit;
- dependency audit;
- metadata and SEO audit;
- analytics audit;
- legal-page audit;
- content-platform audit.

### Classification

Every item becomes:

```text
keep
refactor
rewrite
replace
archive
redirect
delete
```

### Required migration data

- current consumers;
- canonical replacement;
- dependency order;
- redirect behavior;
- rollback risk;
- validation requirement;
- deletion authorization.

### Exit criteria

- no legacy deletion remains ambiguous;
- production migration has an explicit order;
- stale active routes are identified;
- replacement and redirect plans exist;
- unrelated application areas remain protected.

## Phase 6 — Design laboratory and static prototypes

**Status:** planned.

### Goal

Validate visual foundations and product primitives without touching production pages.

### Tasks

- typography specimen;
- color and surface specimen;
- interaction and status specimen;
- Memory visual primitives;
- Workbench visual primitives;
- three static homepage hero directions;
- mobile hero variants;
- full page low-fidelity composition;
- static page directions for Memory QA and Workbench;
- legal/contact page layout patterns.

### Exit criteria

- static quality works without motion;
- one hero direction is selected;
- product primitives feel proprietary to ProChat;
- mobile foundations are approved;
- no new foundational design question remains.

## Phase 7 — Motion and product-story prototypes

**Status:** planned after static approval.

### Goal

Prove premium scroll-driven storytelling without compromising accessibility or speed.

### Tasks

- hero motion proof;
- Memory lifecycle sequence;
- relevant-context sequence;
- QA investigation sequence;
- Workbench control-plane sequence;
- page-transition experiments only if justified;
- reduced-motion compositions;
- mobile scene compositions;
- performance traces;
- deterministic screenshot states.

### Exit criteria

- motion explains product behavior;
- native scrolling remains smooth;
- reverse scrolling is predictable;
- reduced motion preserves the complete argument;
- performance remains within budget;
- no animation exists only for spectacle.

## Phase 8 — Independent design and implementation review

**Status:** planned.

### Goal

Challenge the complete plan before production integration.

### Reviews

- product-truth review;
- design-plan review;
- motion review;
- accessibility review;
- performance review;
- mobile review;
- technical feasibility review;
- conversion review;
- legal and privacy review.

### Exit criteria

- findings are resolved or rejected with rationale;
- documentation reflects approved changes;
- production work is packetized;
- no foundational uncertainty remains hidden.

## Phase 9 — Production foundation

**Status:** planned.

### Goal

Implement global foundations and reusable primitives before public pages.

### Tasks

- fonts;
- semantic design tokens;
- layout primitives;
- product visual components;
- motion infrastructure;
- reduced-motion utilities;
- visual testing;
- accessibility testing;
- performance instrumentation;
- design-lab isolation;
- shared navigation, footer, forms, and legal-layout primitives.

### Exit criteria

- production foundation passes build and test gates;
- component states are documented;
- visual baselines exist;
- legacy and new systems have a controlled boundary.

## Phase 10 — Public page implementation

**Status:** planned.

### Recommended order

1. Homepage
2. ProChat Memory
3. ProChat Memory for QA
4. ProChat Workbench
5. Philosophy
6. About
7. Contact and beta forms
8. Privacy
9. Terms
10. Documentation entry points
11. 404 and error states
12. Metadata, sitemap, social assets, navigation, and footer reconciliation

Each page requires:

- approved copy;
- approved visual story;
- desktop, mobile, and reduced-motion implementation;
- accessibility review;
- performance review;
- visual regression baselines;
- exact conversion destination;
- page-specific claim review.

## Phase 11 — Legacy migration and removal

**Status:** planned after replacements exist.

### Goal

Remove obsolete public-platform code safely.

### Tasks

- activate approved redirects;
- archive historical documentation;
- remove unused routes;
- remove obsolete components;
- remove superseded copy;
- remove old fonts, tokens, themes, animations, and assets;
- remove unused dependencies;
- update tests and documentation;
- verify no consumers remain;
- commit removals in isolated batches.

### Exit criteria

- no active page depends on obsolete design systems;
- no stale product direction remains discoverable as current;
- build and route checks pass;
- repository complexity is materially reduced;
- rollback points remain clear.

## Phase 12 — Production craft and launch validation

**Status:** planned.

### Goal

Reach premium production quality and launch safely.

### Tasks

- typography and layout polish;
- interaction and motion polish;
- empty, loading, success, error, and blocked states;
- browser and device validation;
- WCAG 2.2 AA review;
- Core Web Vitals review;
- visual regression review;
- five-second comprehension testing;
- conversion-path validation;
- legal and privacy approval;
- analytics verification;
- final claim review;
- production monitoring plan.

### Exit criteria

- the platform is coherent as a company system;
- all required pages are complete;
- approved legacy work is removed;
- accessibility, performance, and browser gates pass;
- public claims match current product truth;
- launch evidence is stored with the final commit and release record.

## Phase 13 — Continuous governance

**Status:** ongoing after launch.

### Tasks

- field-performance monitoring;
- accessibility audits;
- conversion and comprehension research;
- design-system adoption review;
- stale-page review;
- content freshness review;
- dependency and security review;
- product-stage reconciliation;
- quarterly canonical-document review while pre-revenue.
