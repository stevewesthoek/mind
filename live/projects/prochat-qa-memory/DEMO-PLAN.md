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

## 17. NotebookLM Research Report: ProChat QA Memory Demo Strategy

This section contains research findings from NotebookLM analysis of the demo plan against industry benchmarks (agent-qa, QASkills, GitHub Copilot instructions, and markdown AI memory systems).

### 17.1 Demo Thesis

The most compelling core thesis for the demo is:

> **"Stop investigating the same failure twice: Human-reviewed memory transforms generic AI into a specific QA expert."**

Unlike generic AI assistants or repository-bound instructions (like GitHub Copilot instructions), this demo proves that a tester's hard-earned lessons are **portable, persistent, and precise**, regardless of the client or tool being used.

### 17.2 Best Demo Scenario: The "Selector Strategy" Pivot

While three scenarios are proposed (Login, Payment, Checkout), the **Login Selector Failure** is the strongest for a 10-minute demo.

**Rationale:**
- Addresses a universal "pain point"—brittle automation
- Perfectly illustrates the difference between generic AI advice ("check your timeout") and memory-informed advice ("use the `data-testid` attribute as per our global selector strategy")

**Refinement:**
- Combine the "Payment" and "Checkout" scenarios into a single **"Future Benefit"** slide to show how memory scales
- Keep the live walkthrough focused on the Login selector for clarity
- Use the login scenario as the primary demo, with payment/checkout visible only as "next steps" slides

### 17.3 Minimum Demo Repo Tree

To provide a compelling, clutter-free public demo, use this minimum structure:

```text
prochat-qa-memory-demo/
├── README.md                       # 2-minute "Why this exists"
├── WALKTHROUGH.md                  # Step-by-step narrative
│
├── demo-cases/
│   └── login-failure/
│       ├── raw-log.txt             # The "Pain" (failed smoke test)
│       ├── before-generic-ai.md    # Generic AI response
│       ├── after-memory-aware.md   # Memory-informed response
│       └── sanitized-lesson.md     # Human-reviewed memory update
│
├── memory/                         # The "Memory"
│   ├── selector-strategy.md        # Global lessons (portable)
│   └── known-failures.md           # Client-specific context (local)
│
├── skills/
│   └── analyze-failure.SKILL.md    # The "How-to" for the AI
│
└── workflows/
    └── failed-test-to-lesson.md    # The "Review-First" process
```

### 17.4 Before/After Proof

The most convincing comparison for QA Leads and freelancers is the **"Specificity Gap"**:

**Before (Generic AI without memory):**
- Suggests five standard steps like "check network," "increase wait time," "verify DOM"
- Takes 10+ minutes to read
- Requires tester to manually filter irrelevant advice
- Tester has likely already tried these steps

**After (ProChat QA Memory-aware):**
- Provides a single, definitive instruction based on past reviews: "This is a known hydration issue on the login button; the project rule is to use the `getByRole` locator instead of CSS selectors"
- Takes 30 seconds to read
- Actionable without interpretation
- Junior testers follow senior-approved strategies

**Impact Message:**
"This proves the product reduces 'triage fatigue' and ensures teams follow consistent testing practices."

### 17.5 Walkthrough Script (Optimized 10 Minutes)

**0-2 min: The Pain**
- Paste a real, messy Playwright log into ChatGPT
- Show the AI giving a 5-paragraph generic answer that doesn't solve the problem
- Narration: "Here's what happens without memory. AI starts from zero every time."

**2-4 min: The Context**
- Show the `memory/` and `skills/` folders in a text editor
- Point out `selector-strategy.md` and `known-failures.md`
- Narration: "This is what we've already learned about this client's flaky login. Specific knowledge from past investigations."

**4-7 min: The Aware Prompt**
- Show the same Playwright log, but this time paste it with the memory context included
- Run the same log through the AI with memory files copied as context
- Show the AI providing a specific, actionable fix immediately (2-3 sentences max)
- Narration: "Same problem, same AI, different context = different answer. The AI now reasons like an expert."

**7-9 min: The Human Review**
- Demonstrate the "Review-first" principle
- Show how to sanitize the AI's output (strip client-specific details)
- Save it as a new "lesson" in a memory file
- Narration: "AI drafts. Tester decides. Memory improves. This is where human judgment protects the knowledge base."

**9-10 min: The Close**
- Explain how this lesson now travels with the tester to their next project
- Show a second failure of the same type, with the memory already available
- Narration: "This knowledge stays with you. Next time, you're smarter from day one."

### 17.6 Public vs. Paid Boundary

**Free Public Demo Contains:**
- Fake webshop demo files (login-failure scenario only)
- One basic "failure analysis" skill template
- Lightweight memory workflow with annotated steps
- README explaining the concept
- Walkthrough guide showing before/after

**Paid Product Repo Contains:**
- Full multi-tenant memory model for managing 5+ clients
- Specialized skill packs (Performance Testing, API Testing, Security Testing)
- Complete workspace templates for different testing scenarios
- Commercial rollout guide and training materials for agencies
- Advanced memory promotion rules and conflict resolution guidance
- Integration patterns with existing tools and CI systems (v0.2+)

### 17.7 Risks and Wording Fixes

The primary risk is being misidentified as a "self-healing" test runner (like agent-qa) or a SaaS dashboard. Use these wording fixes to clarify:

| Current Wording | Recommended Change | Rationale |
|---|---|---|
| "Run the failure triage" | **"Draft the triage strategy"** | Emphasizes that the human/AI performs the thinking, not the execution |
| "Fix the test" | **"Standardize the fix lesson"** | Focuses on the *memory* aspect rather than the code change itself |
| "Automated memory" | **"Persistent, reviewed memory"** | Aligns with OWASP Agent Memory Guard safety principles; avoids the "autopilot" trap |
| "QA Platform" | **"Portable Memory Layer"** | Clearly distinguishes ProChat from all-in-one tools like Jira or TestRail |
| "Automatic analysis" | **"Memory-guided analysis"** | Stresses that humans guide the process; memory informs, doesn't command |
| "Test healing" | **"Knowledge transfer"** | Positions as knowledge management, not test automation |

### 17.8 Key Differentiators in Demo

**Vs. QASkills:**
- QASkills focuses on the *skill* (the "how")
- ProChat focuses on the *memory* (the "what")
- Demo should show: "You capture what you learn, not just how you do it"

**Vs. GitHub Copilot:**
- Copilot is an IDE tool bound to GitHub/code context
- ProChat is a **knowledge asset** that remains with the tester even if they switch environments
- Demo should show: "Your QA knowledge travels from client to client"

**Vs. QA Automation Demos:**
- Most QA automation demos focus on a "green checkmark" (execution success)
- ProChat focuses on **"transfer of expertise"** (knowledge management)
- Demo should show: "Better insight leads to better testing, regardless of execution tool"

### 17.9 Demo Domain Decision: Stick with Fake Webshop

**Webshop remains the best choice because:**
- **Universal:** Almost all audiences have bought something online; pain points are relatable
- **Multi-faceted:** Login, payment, checkout, search, account management—all familiar
- **Safe:** No real secrets, no real data concerns when faking test failures
- **Visual:** Easy to show screenshots and understand the UI context
- **Pattern-rich:** Selector strategies, timing flakes, test-data issues are all common here

**Alternative domains rejected:**
- Healthcare: regulatory concerns; less universal for testers
- Banking: intimidating; audiences worry about data misuse
- E-commerce (non-webshop): too specific; loses the universal appeal

### 17.10 Demo Acceptance Criteria

The demo succeeds when a viewer can answer "yes" to all of these:

1. **"I understand this is not a test runner or automation tool."** — Wording and narrative clarity
2. **"I see how memory made the AI answer better."** — Before/after comparison is obvious
3. **"I could use this with my existing tools (Playwright, Cypress, etc.)."** — Portability is clear
4. **"My team could manage this without IT support."** — No infrastructure needed
5. **"I'm concerned about leaking client secrets, and I see how this avoids it."** — Safety rules are visible
6. **"I could implement this in less than a day."** — Simplicity is evident

---

**Research Date:** 2026-06-10  
**Research Method:** NotebookLM analysis of demo plan against industry benchmarks  
**Next Steps:** Build demo repo using the minimum tree structure above; test walkthrough script with 3-5 target users (testers, QA leads, testing company owners)
