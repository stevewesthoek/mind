# ProChat QA Memory — Demo Plan

**Status:** starter demo plan  
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

## 2. Demo audience

Primary audience:

- freelance testers
- QA consultants
- testing company owners
- QA leads
- test automation engineers

The demo should speak to testers who work across many client environments and cannot always install tools or change pipelines.

## 3. Demo product promise

```text
Your testers already have testing tools.
ProChat QA Memory gives them the persistent memory those tools do not carry across clients.
```

## 4. Demo format

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

## 5. Fake demo project

Use a fake webshop because it is easy to understand.

Project name:

```text
FakeShop QA Memory Demo
```

Fake product areas:

- login
- checkout
- payment
- search
- user account

Fake test suites:

- smoke suite
- regression suite
- payment suite
- checkout suite

## 6. Demo repo structure

```text
prochat-qa-memory-demo/
  README.md
  QUICKSTART.md

  demo/fakeshop/
    README.md

    raw-inputs/
      failed-login-selector.md
      failed-payment-test-data.md
      flaky-checkout-timing.md

    memory-before/
      project-context.md
      test-strategy.md
      known-failures.md
      flaky-tests.md
      failure-patterns.md
      test-data-rules.md
      selector-strategy.md
      cross-project-qa-lessons.md

    workflows/
      failed-test-to-lesson.md

    ai-prompts/
      generic-prompt-without-memory.md
      prochat-memory-aware-prompt.md

    outputs/
      generic-ai-answer.md
      memory-aware-answer.md
      reviewed-memory-update.md

    memory-after/
      known-failures.md
      flaky-tests.md
      failure-patterns.md
      test-data-rules.md
      cross-project-qa-lessons.md
```

## 7. Demo case 1 — login selector failure

### Scenario

A smoke test fails after a UI copy or locator change.

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

Likely generic answer:

- check if the app is down
- increase timeout
- inspect selector
- rerun test

### Memory-aware answer

Expected better answer:

- classify as likely selector/locator issue
- note that product flow appears available
- check selector strategy
- suggest updating locator according to project rules
- draft reusable memory lesson

### Reviewed memory update

```markdown
## Pattern: login smoke selector failures

### Symptoms
- Login page loads correctly.
- Backend/API is healthy.
- Test times out on submit button locator.
- Screenshot shows visible button with changed label.

### Classification
Likely selector/locator issue, not product regression.

### Preferred action
Check current selector strategy before changing the test.
Prefer stable role or approved data-testid strategy.

### Review rule
Do not mark as product bug until the visible login flow and API health are checked.
```

## 8. Demo case 2 — payment test-data failure

### Scenario

A regression test fails before the payment step because test data expired.

### Raw input

```text
Test: payment-regression.spec.ts > returning user can pay
Error: test user not found or unauthorized
Environment: test
Screenshot: user account setup failed
API: 401 during test account setup
Recent change: test data refresh job failed overnight
```

### Memory-aware lesson

```markdown
## Pattern: expired test data causes payment regression failures

### Symptoms
- Failure happens before actual payment step.
- Test user setup fails.
- API returns unauthorized, expired, or user not found.

### Classification
Usually test data issue, not payment product bug.

### Preferred action
Verify test data freshness before debugging payment flow.

### Review rule
Do not escalate as payment regression until test data freshness is confirmed.
```

## 9. Demo case 3 — flaky checkout timing

### Scenario

Checkout sometimes fails because the test asserts before async totals finish updating.

### Raw input

```text
Test: checkout-regression.spec.ts > order total updates after discount
Error: expected total €90, received €100
Re-run: passed
Recent change: discount calculation now updates after async pricing call
```

### Memory-aware lesson

```markdown
## Pattern: checkout total timing flake

### Symptoms
- Expected discounted total not visible immediately.
- Re-run often passes.
- API/pricing call finishes after UI assertion.

### Classification
Likely timing/synchronization flake.

### Preferred action
Wait for pricing update signal or stable UI state before asserting total.

### Review rule
Do not hide this with arbitrary timeout. Prefer deterministic wait condition.
```

## 10. Demo story arc

The demo should tell this story:

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

## 11. Demo acceptance criteria

The demo works if a viewer understands within 10 minutes:

- this is not a test runner
- this is not another QA platform
- this works with their existing tools
- memory improves AI output
- memory improves future testing work
- client/project separation is built in
- cross-project memory is possible without leaking client data
- human review stays central

## 12. Demo script

### Step 1 — Show the pain

Show a failed test log and a generic AI answer.

Message:

```text
AI can help, but without memory it starts almost from zero.
```

### Step 2 — Show QA memory

Show:

- project context
- known failures
- flaky tests
- selector strategy
- test data rules
- cross-project QA lessons

Message:

```text
ProChat QA Memory gives the AI and tester reusable context.
```

### Step 3 — Run memory-aware prompt

Show the better answer.

Message:

```text
The answer is more specific because it uses reviewed testing memory.
```

### Step 4 — Review the lesson

Show that the tester approves/sanitizes the lesson.

Message:

```text
AI drafts. Tester decides. Memory improves.
```

### Step 5 — Show future benefit

Show same/similar failure later.

Message:

```text
The next investigation starts smarter.
```

## 13. Demo sales message

For testing companies:

```text
Give every tester a portable QA memory system they can use across client environments without changing the client's tools.
```

For freelance testers:

```text
Carry your testing knowledge from project to project without carrying confidential client data.
```

For QA leads:

```text
Standardize how testers capture lessons, use AI, and avoid repeated investigation.
```

## 14. What not to demo yet

Do not demo:

- automatic CI ingestion
- automatic PR creation
- automatic selector healing
- dashboard analytics
- vector search
- MCP runtime
- browser agents
- custom extension

These may create excitement, but they also create the wrong expectation.

## 15. Research notes

The demo should reflect current best practices:

- repository instructions are a valid pattern for AI guidance
- markdown skill files and manifests are increasingly common
- file-backed QA memory has market validation
- persistent memory must be safe against poisoning, unsafe writes, and secret leakage
- current evidence must override stored memory

## 16. NotebookLM research prompt

```text
You are improving the DEMO-PLAN.md for ProChat QA Memory.

Goal:
Design the simplest possible demo that proves the value of persistent QA memory for AI-assisted software testers.

Context:
- ProChat QA Memory is a portable, markdown-first memory system.
- It is not a test runner, QA dashboard, CI tool, SaaS app, or self-healing automation engine.
- The target buyer may be a testing company or freelancer whose testers work across many external client environments.
- The demo must use fake data only.
- The demo must prove that memory makes AI-assisted triage and future testing better.

Research tasks:
1. Review examples from agent-qa, QASkills, GitHub Copilot custom instructions, markdown AI memory systems, and QA automation demos.
2. Recommend the clearest fake demo scenario.
3. Recommend whether a fake webshop is the best demo domain or whether another domain is easier.
4. Recommend the strongest before/after comparison.
5. Recommend the minimum files needed in the public demo repo.
6. Recommend the best 10-minute walkthrough script.
7. Recommend what should be hidden in the paid repo versus shown in the public demo.
8. Identify where the demo might accidentally make ProChat QA Memory look like a test runner or automation platform, and suggest wording to avoid that.

Output format:
- Demo thesis
- Best demo scenario
- Minimum demo repo tree
- Before/after proof
- Walkthrough script
- Public vs paid boundary
- Risks and wording fixes
```
