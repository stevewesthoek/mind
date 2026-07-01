# ProChat Customer Profiles

**Status:** canonical customer profiles  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-01

## Current stage

ProChat is pre-revenue.

The immediate objective is free, selected beta validation for ProChat Memory for QA rather than an immediate sale.

## Primary user

The primary user is an individual QA tester who repeatedly investigates similar failures and wants reviewed project knowledge to remain reusable.

They may work:

- inside a software company;
- for a QA business;
- as an independent QA consultant;
- across one or more client projects.

Their recurring problems may include:

- investigating the same failure more than once;
- losing useful lessons in tickets, chats, logs, or personal notes;
- rechecking causes that were already ruled out;
- forgetting which selector, test data, environment, or framework condition mattered;
- explaining the same project context repeatedly to an AI assistant;
- lacking a trusted, local record of previous QA investigations.

Desired outcome:

```text
Reviewed QA investigation knowledge that can be retrieved and reused
when a similar failure appears again.
```

## Secondary influencers

QA leads and test managers are secondary influencers.

They may care about:

- reducing repeated investigation effort;
- improving handoffs between testers;
- preserving useful lessons when team members change;
- maintaining project-specific memory without leaking client data;
- encouraging consistent review and sanitization practices;
- understanding whether repeated use creates measurable value.

They may recommend the product, sponsor a beta evaluation, or help define team requirements, but the first product experience should remain useful to one tester working locally.

## Future economic buyers

Future economic buyers may include:

- QA businesses purchasing licenses for individual testers;
- software companies purchasing licenses for internal QA teams;
- consultancies purchasing licenses for testers working across approved client projects.

Team or organization licensing should be designed only after individual tester value is demonstrated.

## Beta qualification criteria

A good beta tester:

- regularly investigates recurring or similar test failures;
- can identify one or more real workflows where previous QA lessons would help;
- is comfortable running a local CLI or following technical setup instructions;
- accepts that customer and client data must remain local;
- can use sanitized evidence where required;
- is willing to review AI-assisted drafts before approving memory;
- is willing to provide structured feedback;
- can use the product repeatedly rather than only once;
- understands that the product is in active development and licensing is not final.

## Strong beta scenarios

Good early scenarios include:

- recurring Playwright, Cypress, Selenium, or Robot Framework failures;
- repeated CI investigation patterns;
- flaky tests with known environmental causes;
- project-specific selector or test-data rules;
- repeated triage across several releases;
- testers working across multiple approved projects or clients;
- teams losing useful QA knowledge between tickets or people.

## Poor beta fit

Avoid or defer testers who:

- want the product to replace their test runner or test-management system;
- expect fully autonomous decisions without human review;
- cannot keep customer data local;
- cannot provide any sanitized or approved evidence;
- only want a one-time demonstration without repeated use;
- require finalized enterprise licensing, procurement, or support before evaluation;
- expect guaranteed accuracy or zero hallucinations.

## Beta success signals

The beta is useful when:

- the tester completes installation;
- one investigation produces a reviewed memory lesson;
- that memory is retrieved during a later investigation;
- the tester can explain whether it saved effort or improved confidence;
- the tester returns without being prompted;
- the tester reports trust, privacy, or workflow problems clearly;
- the tester recommends the product to another QA professional.

## Expansion path

```text
individual tester value
→ repeat usage
→ invited team evaluation
→ QA business or software-company licensing
```

Do not move to team licensing before the individual workflow is proven.
