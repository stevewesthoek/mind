# ProChat QA Memory — Demo Plan

**Status:** refined v0.1 demo plan  
**Owner:** Steve Westhoek  
**Purpose:** define a simple demo that proves ProChat QA Memory without real client data or heavy software.

## 1. Demo goal

The demo must prove one thing clearly:

```text
Persistent QA memory makes AI-assisted testing more specific, safer, and more useful over time.
```

The demo should not sell a dashboard, test runner, automation agent, or CI integration.

It should show:

```text
failed test → memory-aware analysis → reviewed lesson → future better triage
```

## 2. Demo thesis

```text
Stop investigating the same failure twice.
Human-reviewed memory turns generic AI into a more specific QA assistant.
```

The strongest proof is the specificity gap:

```text
same failed test + same AI + no memory = generic advice
same failed test + same AI + QA memory = specific, useful triage
```

## 3. Demo audience

Primary audience:

- freelance testers
- QA consultants
- testing company owners
- QA leads
- test automation engineers

The demo should speak to testers who work across many client environments and cannot always install tools or change pipelines.

## 4. Demo product promise

```text
Your testers already have testing tools.
ProChat QA Memory gives them the persistent memory those tools do not carry across clients.
```

## 5. Demo format

Recommended first format:

- public demo repo
- fake webshop example
- markdown files only
- no API
- no server
- no dashboard
- no pipeline integration

Optional supporting material:

- short screen recording
- one-page buyer summary
- before/after screenshots
- 10-minute walkthrough script

## 6. Demo domain decision

Use a fake webshop.

Why:

- universal and easy to understand
- visual and familiar
- contains login, checkout, payment, search, and account flows
- supports common QA issues such as selectors, test data, timing, and regression risk
- safe because all data is fake

Rejected alternatives:

- healthcare: too regulated and distracting
- banking: creates unnecessary security anxiety
- abstract demo app: less relatable

## 7. Primary demo scenario

Use one focused live scenario:

```text
Login selector failure after UI change
```

Why this is the best first demo:

- brittle selectors are a common automation pain
- it is easy to understand without deep domain knowledge
- it clearly shows generic AI advice vs memory-aware advice
- it does not require running tests live
- it keeps the walkthrough under 10 minutes

Payment test-data and checkout timing examples can be shown as future benefit examples, but they should not be part of the live walkthrough.

## 8. Demo repo structure

```text
prochat-qa-memory-demo/
  README.md
  WALKTHROUGH.md

  demo-cases/
    login-selector-failure/
      raw-log.txt
      before-generic-ai.md
      after-memory-aware.md
      reviewed-memory-update.md

  memory/
    selector-strategy.md
    known-failures.md
    general-qa-lessons.md

  skills/
    analyze-failure.SKILL.md

  workflows/
    failed-test-to-lesson.md

  future-examples/
    payment-test-data.md
    checkout-timing-flake.md
```

Keep the public demo small. The paid product can contain the full multi-scope workspace templates, additional skills, training material, safety guides, and rollout material.

## 9. Demo case — login selector failure

### Raw input

```text
Test: login-smoke.spec.ts > user can log in
Error: Timeout waiting for locator '[data-testid="login-submit"]'
Environment: test
Screenshot: login page loaded, submit button visible as "Sign in"
API: no backend error
Recent change: login button text changed
```

### Generic AI answer without memory

Expected generic answer:

- check if the app is down
- increase timeout
- inspect selector
- verify network calls
- rerun test
- check browser state

Problem:

```text
The answer is not wrong, but it starts from zero and makes the tester filter generic advice manually.
```

### Memory available

`selector-strategy.md` says:

```markdown
## Login selector strategy

Prefer stable role-based locators for user-facing actions when labels are stable.
Use approved data-testid values only when they are intentionally maintained.
Do not fix selector failures by increasing timeout unless current evidence shows timing is the cause.
```

`known-failures.md` says:

```markdown
## Login button locator failures

### Symptoms
- Login page loads correctly.
- API is healthy.
- Test times out on submit button locator.
- Screenshot shows visible submit button with changed label or attribute.

### Likely classification
Selector/locator issue, not product regression.
```

### Memory-aware answer

Expected better answer:

```text
This is likely a selector/locator issue, not a product bug.
Evidence: the login page loaded, the button is visible, and the API is healthy.
Do not increase the timeout yet. Check the current login selector strategy.
Recommended next action: update the locator to the approved stable strategy and rerun the smoke test.
Draft a memory update only if this is a new selector pattern.
```

### Reviewed memory update

```markdown
---
id: login-selector-failure-pattern
name: Login selector failure pattern
type: memory
version: 0.1.0
scope: project
status: reviewed
source_reference: fake-demo-login-smoke-failure
review_required: true
---

## Pattern: login smoke selector failures

### Symptoms
- Login page loads correctly.
- Backend/API is healthy.
- Test times out on submit button locator.
- Screenshot shows a visible button with changed label or attribute.

### Classification
Likely selector/locator issue, not product regression.

### Preferred action
Check the current selector strategy before changing the test.
Prefer the approved stable locator strategy.

### Review rule
Do not mark as product bug until the visible login flow and API health are checked.
```

## 10. Before/after proof

### Before ProChat QA Memory

```text
A test fails.
The tester asks AI.
AI gives generic debugging advice.
The tester solves it manually.
The lesson disappears into chat, Jira, Slack, or memory.
```

### After ProChat QA Memory

```text
A test fails.
The tester asks AI with project and cross-project QA memory.
AI gives a more specific answer.
The tester reviews and sanitizes the lesson.
The lesson is stored in the correct memory scope.
Next time, similar triage starts smarter.
```

## 11. 10-minute walkthrough script

### 0–2 min — The pain

Show the raw failed test log and the generic AI answer.

Narration:

```text
This is what happens without memory. AI starts from zero every time.
```

### 2–4 min — The memory

Show only the two memory files that matter:

- `selector-strategy.md`
- `known-failures.md`

Do not explain the internal `.SKILL.md` mechanics during the live demo. Treat skills as helpers and keep the focus on memory.

Narration:

```text
This is what the tester or team has already learned about this app. It is active memory, not a passive wiki page.
```

### 4–7 min — The memory-aware answer

Show the same failed test with memory context included.

Show the improved answer.

Narration:

```text
Same problem, same AI, better context. The answer becomes more specific because it uses reviewed testing memory.
```

### 7–9 min — Human review and sanitization

Show the reviewed memory update.

Then show one unsafe raw detail being generalized before promotion:

```text
staging-client-01.example.internal → staging environment
internal Jira ticket URL → sanitized source reference
client-specific selector name → approved selector pattern
```

Narration:

```text
AI drafts. Tester decides. Sensitive details are removed. Memory improves safely.
```

### 9–10 min — The close

Show that the lesson can be reused next time.

Narration:

```text
The next investigation starts smarter. That is the product.
```

## 12. Public vs paid boundary

### Public demo contains

- fake webshop login failure
- one basic failed-test workflow
- one basic skill file
- small memory folder
- before/after AI answer
- reviewed memory update
- walkthrough guide

### Paid product contains

- full multi-scope memory model
- external workspace templates
- additional workflows and skills
- full safety and sanitization guide
- promotion guide
- AI assistant instruction pack
- training and rollout material
- commercial licensing and update path
- future specialized packs

## 13. Wording rules

Avoid language that makes the demo look like a test runner or automation platform.

| Avoid | Use instead |
|---|---|
| run the failure triage | draft the triage strategy |
| fix the test | standardize the fix lesson |
| automated memory | persistent, reviewed memory |
| QA platform | portable memory layer |
| automatic analysis | memory-guided analysis |
| test healing | knowledge transfer / reviewed lesson |
| self-healing test runner | memory that reduces repeated mistakes |

## 14. Key differentiators to show

### Vs. AI skills libraries

Skills explain how to do a task. ProChat QA Memory also stores what the tester has learned.

Demo message:

```text
You capture what you learn, not just how you ask AI.
```

### Vs. GitHub Copilot instructions

Copilot instructions are useful inside a repo. ProChat QA Memory is a portable knowledge asset testers can use across environments.

Demo message:

```text
Your QA knowledge travels from client to client without carrying confidential client data.
```

### Vs. QA automation tools

QA automation tools aim for execution success. ProChat QA Memory aims for transferable expertise.

Demo message:

```text
Better memory leads to better testing, regardless of execution tool.
```

## 15. Skeptical buyer objections

### Objection: This is just a folder of markdown files. We already have a wiki.

Answer:

```text
A wiki is passive documentation. ProChat QA Memory is active memory designed to be used at the moment of failure with an AI assistant.
```

### Objection: Is this just another prompt library?

Answer:

```text
Prompts tell the AI how to work. Memory tells the AI what the tester, project, and team already know.
```

### Objection: How do we avoid leaking client data?

Answer:

```text
Client-specific memory stays scoped to the client/project workspace. Cross-project memory is sanitized before promotion.
```

### Objection: Why not just use the test tool's reports?

Answer:

```text
Reports explain what happened in one run. ProChat QA Memory captures the reusable lesson so future investigations start smarter.
```

## 16. Demo acceptance criteria

The demo succeeds when a viewer can answer yes to all of these:

1. I understand this is not a test runner or automation tool.
2. I see how memory made the AI answer better.
3. I could use this with my existing tools.
4. My team could manage this without IT support.
5. I see how client-specific information is kept separate.
6. I see how reviewed memory improves future testing.
7. I could try this in less than a day.

## 17. What not to demo yet

Do not demo:

- automatic CI ingestion
- automatic PR creation
- automatic selector healing
- dashboard analytics
- vector search
- MCP runtime
- browser agents
- custom extension
- multi-client workspace manager

These may create excitement, but they create the wrong expectation for v0.1.

## 18. Research assessment

Two NotebookLM passes have now been processed into this demo plan.

Integrated from the latest pass:

- stronger specificity-gap thesis
- less explanation of folder mechanics during the demo
- visible sanitization proof
- buyer objections and concise answers
- sharper public vs paid boundary
- stronger closing statement

Rejected or deferred:

- detailed skill-file explanation during the demo
- payment and checkout live walkthroughs
- dashboard or CI-driven proof
- automation-style demo language
- advanced paid features in the public demo

## 19. Demo readiness verdict

This demo plan is ready to support building the public demo materials.

No further broad NotebookLM research is recommended before building the first demo. The next useful research should come from testing the demo with 3–5 target buyers or users and capturing their objections.