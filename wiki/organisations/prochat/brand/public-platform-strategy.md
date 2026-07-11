# ProChat Public Platform Strategy

**Status:** canonical public-platform strategy  
**Owner:** Steve Westhoek  
**Approved:** 2026-07-11

## Purpose

The ProChat public website is not a single landing page. It is the public platform for the company, its products, documentation, legal commitments, contact paths, and future growth.

The platform must communicate one coherent company while supporting distinct product journeys.

## Primary objective

Establish ProChat as a real memory-first software company and convert qualified visitors toward the current flagship opportunity: ProChat Memory for QA.

## Public hierarchy

```text
ProChat — company and philosophy
├── ProChat Memory — flagship product and general product model
│   └── ProChat Memory for QA — current edition and primary conversion page
├── ProChat Workbench — second product
├── Company
│   ├── Philosophy
│   ├── About
│   └── Contact
├── Resources
│   ├── Documentation
│   ├── Examples
│   └── Product updates when justified
└── Legal
    ├── Privacy
    └── Terms
```

## Homepage role

The homepage leads with ProChat as the company.

It must:

- explain the company belief and category;
- establish ProChat Memory as the flagship;
- visually explain the Memory trust and reuse model;
- state that Memory is currently available for QA;
- create a clear path to ProChat Memory for QA;
- introduce ProChat Workbench without competing with the flagship;
- communicate company and product boundaries;
- provide clear navigation, footer, contact, legal, and documentation paths.

The homepage does not sell ProChat as a consultancy, personal service, or abstract philosophy alone.

## Page responsibilities

### Homepage

Audience:

- first-time visitors;
- partners;
- testers;
- builders;
- potential customers;
- people discovering the company through Steve’s network.

Primary action:

```text
Explore ProChat Memory for QA
```

Secondary actions:

- See how ProChat Memory works
- Join the selected QA beta
- Explore ProChat Workbench

### ProChat Memory

Role:

Explain the general flagship product model deeply without implying broad commercial availability in every discipline.

Must cover:

- project-memory problem;
- evidence and trust model;
- local Markdown-first workspace;
- review, retrieval, correction, and retirement;
- relevant context;
- current QA availability;
- product boundaries;
- links to the QA edition.

### ProChat Memory for QA

Role:

Primary niche-specific conversion page.

Must use QA terminology, real investigation workflows, relevant examples, beta qualification, and a concrete next action.

Primary promise:

```text
Stop solving the same QA failure twice.
```

### ProChat Workbench

Role:

Explain the second product as a controlled ChatGPT-first local builder workbench.

Must show:

- exact context;
- bounded operations;
- guarded changes;
- validation;
- persistent run state;
- explicit Git actions;
- confirmation boundaries;
- current availability and project status.

### Philosophy

Role:

Explain the highest-level company beliefs in a durable editorial form.

This page supports trust and category formation. It is not the primary conversion destination.

### About

Role:

Present ProChat as a company and Steve Westhoek as its founder.

The page should explain founder credibility without turning the company website into a freelancer portfolio.

### Contact

Role:

Provide simple, explicit paths for:

- QA beta interest;
- Workbench interest;
- partnerships;
- general company contact;
- legal or privacy contact where appropriate.

### Privacy and Terms

Role:

Provide accurate, understandable, versioned legal information.

Legal pages must distinguish:

- website data;
- beta communications;
- customer-owned local memory;
- external AI-provider behavior;
- repository licensing;
- future commercial terms.

Do not use marketing language to obscure legal boundaries.

### Documentation

Role:

Help technically capable visitors evaluate and use current products.

Documentation should remain subordinate to current product truth and version status.

## Information-architecture principles

### Company first, flagship dominant

The top-level identity is ProChat.

ProChat Memory receives the most visual and narrative emphasis because it is the flagship.

Memory for QA receives the strongest conversion path because it is the current edition.

Workbench receives a clear dedicated path but does not compete equally in the homepage hero.

### Progressive depth

The platform should let visitors choose their depth:

1. five-second understanding;
2. business value;
3. product model;
4. trust and architecture;
5. current use case;
6. technical detail;
7. beta or contact action.

### One page, one primary job

Every page must have one dominant audience and one dominant action.

Avoid pages that mix company story, detailed technical documentation, pricing, legal information, and multiple unrelated conversion goals.

### Navigation stability

Top-level navigation should remain small and durable.

Recommended initial structure:

```text
Memory
Memory for QA
Workbench
Philosophy
Documentation
```

Use the footer for deeper company, resource, legal, and contact links.

### Footer as platform map

The footer should clearly expose:

- company statement;
- both products and the QA edition;
- philosophy/about/contact;
- documentation and GitHub where appropriate;
- privacy and terms;
- LinkedIn and other approved company channels;
- current copyright and company identity.

## Founder and company positioning

ProChat should be positioned as the company.

Steve Westhoek should be positioned publicly as:

```text
QA Engineer and Founder of ProChat
```

Recommended separation:

- Steve’s LinkedIn may lead with active QA credibility and identify him as ProChat founder.
- ProChat’s website, social presence, products, and documentation lead with the company.
- The About page names Steve as founder and connects his QA work to the origin of Memory for QA.
- The homepage does not revolve around Steve’s freelance services.
- ProChat should not imply a large team if that is not true.

Preferred language:

```text
ProChat was founded by Steve Westhoek, a QA engineer building tools from direct experience with repeated project context and investigation work.
```

Avoid:

- presenting ProChat as a personal portfolio;
- presenting Steve’s freelance QA offering as a ProChat product;
- implying an undisclosed large company team;
- hiding the founder when transparency improves trust.

## Experience principles

The platform must be:

- mobile-first;
- responsive;
- fast;
- accessible;
- expandable;
- visually coherent;
- easy to maintain;
- clear without animation;
- enhanced by purposeful motion;
- honest about product maturity.

## Performance and accessibility

Performance and accessibility are product requirements.

The platform should:

- target WCAG 2.2 AA;
- provide reduced-motion alternatives;
- preserve semantic document structure;
- use performance budgets for JavaScript, media, fonts, and Core Web Vitals;
- design mobile compositions intentionally rather than scaling desktop;
- prevent decorative motion from delaying content or interaction;
- validate in current major browsers and realistic mobile conditions.

## Governance

The public platform has three authority layers:

```text
Mind
→ company and product truth

ProChat repository documentation
→ design, page, migration, and implementation truth

Production code
→ verified implementation
```

Production code must not silently redefine company strategy or design principles.

## Success measures

Before monetization, assess:

- homepage comprehension;
- qualified visits to Memory for QA;
- beta interest quality;
- documentation engagement;
- repeated product use;
- trust and privacy questions;
- performance and accessibility;
- clarity of product hierarchy;
- absence of confusion between ProChat and Steve’s freelance QA work.
