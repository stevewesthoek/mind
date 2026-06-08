# ProKit QA Memory — Strategy Plan

**Status:** discovery strategy draft  
**Created:** 2026-06-08  
**Owner:** Steve Westhoek  
**Location:** `live/projects/prochat-qa-memory/STRATEGY-PLAN.md`

## 1. Executive summary

ProKit QA Memory is a proposed derivative product from the ProKit / ProChat OS direction.

The product should not be a new testing framework, test runner, SaaS dashboard, CI/CD tool, self-healing engine, or AI agent platform. Those categories are crowded, tool-dependent, maintenance-heavy, and difficult to differentiate.

The recommended product is a **portable, licensed, markdown-first QA memory operating system** for software testers and software testing companies.

The core promise:

```text
Give every tester a structured way to capture client context, test decisions, failures, risks, regression lessons, performance lessons, and reusable AI instructions — so testing knowledge compounds over time instead of disappearing into chats, tickets, logs, and people’s heads.
```

The best first buyer is not necessarily a software company that owns one product. The better first buyer is a **software testing company, QA consultancy, SDET staffing company, or test automation agency** with multiple testers working across multiple client environments.

Those testers often cannot install new tools in client systems, cannot change client pipelines, cannot add SaaS integrations, and cannot give external vendors access to client repositories. A repo-native, local, tool-agnostic memory system fits that constraint better than another testing platform.

The recommended initial packaging:

```text
ProKit QA Memory
A private, licensed, versioned GitHub repository containing:
- core QA memory model
- tester workspace templates
- client/project memory templates
- failure memory workflows
- regression memory workflows
- performance memory workflows
- AI assistant instructions
- review checklists
- onboarding and rollout material
- examples and training cases
```

The customer licenses access per tester or per company. Testers clone the product repo, then create private local/client workspaces from the provided templates. Client-specific information stays in their own local or employer-approved environment and does not return to ProKit.

This is viable if the product stays focused on **portable memory and reusable testing intelligence**, not test execution automation.

## 2. Terminology note

The current canonical repo strategy documents refer to **ProChat OS** as the managed AI work system that turns messy information and reusable company knowledge into review-ready outputs.

This plan uses the name **ProKit QA Memory** because that is the product name requested during the conversation. Naming should be confirmed later.

Potential naming options:

| Name | Positioning | Notes |
|---|---|---|
| ProKit QA Memory | Productized derivative from ProKit/ProChat OS | Good if ProKit becomes the commercial product family. |
| ProChat QA Memory | Stronger connection to existing ProChat OS docs | Good if ProChat remains the public brand. |
| QA Memory OS | Clear category name | Generic, but strong. |
| Test Memory OS | Broader and simpler | Could include manual, automation, regression, performance, API, mobile. |
| ProKit Test Memory | Slightly broader than QA | May be easier to understand for testers. |

Recommendation for now:

```text
Use “ProKit QA Memory” as the project name internally.
Use “portable QA memory for AI-assisted software testers” as the public explanation.
```

## 3. How it relates to ProKit / ProChat OS

The canonical ProChat OS pattern is:

```text
messy input + work memory → useful output → human review → improvement loop
```

ProKit QA Memory is the QA-specific version:

```text
test failures + logs + tester notes + client constraints + testing standards + historical lessons
→ QA memory
→ better triage, better test decisions, better AI assistance, better regression judgment
→ tester review
→ memory improves
```

This makes ProKit QA Memory a natural derivative product rather than a new business direction.

### 3.1 ProKit OS layer mapping

| ProKit / ProChat OS concept | QA-specific version |
|---|---|
| Messy input | Failed test logs, Playwright traces, screenshots, Jira tickets, PR notes, test run summaries, performance results, release notes, acceptance criteria. |
| Work Memory | QA Memory: known failures, flaky tests, product risks, client rules, selector strategy, test data rules, regression lessons, performance baselines, release lessons. |
| Workflow module | Failed-test-to-lesson, flaky-test review, new-story-to-test-plan, regression scope review, performance regression review. |
| Human review | Tester confirms whether AI analysis is correct before memory is updated. |
| Improvement loop | Each reviewed failure or release adds more reusable knowledge. |
| Managed improvement | ProKit updates the core memory model, templates, checklists, and AI instructions. |

### 3.2 Why QA is a good derivative niche

QA is a strong derivative niche because testing already produces repeated knowledge:

- recurring failures
- recurring flaky tests
- repeated release risks
- repeated regression areas
- repeated selector/test data problems
- repeated environment problems
- repeated client-specific rules
- repeated onboarding context for new testers
- repeated explanations given to AI assistants

This matches ProKit OS perfectly: recurring knowledge work becomes reusable memory.

## 4. Product thesis

Most QA teams and testers already have tools:

- Playwright
- Robot Framework
- Cypress
- Selenium
- Postman
- k6
- JMeter
- GitHub Actions
- GitLab CI
- Azure DevOps
- Jira
- TestRail
- Xray
- Zephyr
- GitHub Copilot
- ChatGPT
- Claude
- Cursor

The gap is not lack of tools.

The gap is persistent, portable, AI-usable testing memory.

Current tester workflow often looks like this:

```text
Test fails → tester investigates → conclusion goes into Slack/Jira/PR comment/head → lesson is forgotten → similar failure happens later → investigation repeats.
```

ProKit QA Memory changes the loop:

```text
Test fails → tester investigates with QA memory → tester confirms conclusion → reusable lesson is stored → future AI/test work starts smarter.
```

The product does not need to run tests. It needs to help testers remember and reuse what test results taught them.

## 5. Target customer and user

### 5.1 Best first buyer

The best first buyer is a company with testers who work across client environments:

- software testing company
- QA consultancy
- test automation agency
- SDET staffing company
- digital agency with QA department
- freelance tester collective

Why this buyer is attractive:

- They have multiple testers.
- They need consistent work quality.
- Their testers work in different client environments.
- They often cannot install heavy tools in client systems.
- They benefit from standardizing AI-assisted QA practice.
- They can buy licenses centrally.

### 5.2 First user persona

**AI-assisted software tester / test automation engineer**

They may work with:

- Playwright or Robot Framework
- JavaScript/TypeScript or Python
- GitHub Actions or Azure DevOps
- Copilot or ChatGPT
- smoke tests after deployment
- nightly regression tests
- manual exploratory testing
- bug reports and release testing

Their pain:

- Same failures come back.
- Client-specific rules are hard to remember.
- AI gives generic advice unless repeatedly re-prompted.
- Test logs and failure lessons disappear.
- New testers need context.
- Regression knowledge is scattered.
- Test-data and environment issues waste time.
- Flaky tests keep being re-investigated.

### 5.3 Buyer-facing outcome

```text
Your testers keep their existing tools, but gain a portable memory system that captures what each project teaches them and makes AI assistance more consistent over time.
```

## 6. What the product is

ProKit QA Memory is a **licensed, portable QA memory repo**.

It contains:

1. A reusable QA memory model.
2. A tester workspace template.
3. Client/project memory templates.
4. AI assistant instruction files.
5. QA workflows for repeated situations.
6. Review checklists.
7. Example memories.
8. Training and rollout guides.
9. Versioned improvements maintained by ProKit.

### 6.1 What it is not

It is not:

- a test runner
- a Playwright replacement
- a Robot Framework replacement
- a self-healing engine
- a cloud SaaS product
- a dashboard
- a CI/CD connector
- a browser automation agent
- a vector database
- an MCP server
- an API service
- a Jira plugin
- a test management system

This is intentional.

The strategic advantage is low dependency, low maintenance, high portability, and evergreen value.

## 7. Technical delivery model

### 7.1 Master product repo

ProKit maintains one private repository:

```text
prokit-qa-memory/
  README.md
  LICENSE.md
  CHANGELOG.md
  RELEASES.md

  core/
    principles/
    memory-model/
    workflows/
    ai-instructions/
    checklists/
    testing-domains/
    examples/

  workspace-template/
    project-memory/
    personal-memory/
    client-memory/
    inbox/
    outputs/

  training/
    onboarding-for-testers.md
    rollout-guide-for-qa-leads.md
    first-week-usage-plan.md
    team-review-session.md

  commercial/
    license-summary.md
    acceptable-use.md
    client-data-safety.md
```

### 7.2 Customer usage model

The customer buys licenses for testers.

Each tester gets access to the private repo or to a company mirror.

The tester clones the product repo:

```bash
git clone git@github.com:prokit/prokit-qa-memory.git
```

Then they create a working memory for each client/project by copying the workspace template:

```text
my-qa-work/
  client-a-memory/
  client-b-memory/
  internal-learning-memory/
```

Client-specific data lives only in the tester/company-controlled workspace.

ProKit’s repo contains the reusable method, not the customer’s private data.

### 7.3 Update model

ProKit updates the product repo with:

- new workflow templates
- improved AI instructions
- new testing domain packs
- better examples
- new checklists
- new onboarding guides
- refined memory structures

Customers pull updates:

```bash
git pull
```

Or their company mirror pulls from ProKit on a release schedule.

### 7.4 No-access constraint

Because the buyer’s testers work at external client companies, ProKit should assume:

- no access to client repos
- no access to client laptops
- no access to client pipelines
- no physical installation
- no permission to install SaaS agents
- no permission to upload client test logs externally

The product should work under these constraints.

That means the product must remain:

- local-first
- markdown-first
- tool-agnostic
- AI-agnostic
- framework-agnostic
- client-safe
- easy to copy into an approved working folder

## 8. Proposed repository structure

```text
prokit-qa-memory/
  README.md
  QUICKSTART.md
  LICENSE.md
  CHANGELOG.md

  core/
    principles/
      00-qa-memory-principles.md
      01-evergreen-testing-memory.md
      02-human-review-rules.md
      03-client-data-safety.md
      04-ai-agnostic-usage.md

    memory-model/
      00-memory-index.md
      01-personal-qa-memory.md
      02-project-qa-memory.md
      03-team-qa-memory.md
      04-failure-memory.md
      05-regression-memory.md
      06-performance-memory.md
      07-release-memory.md

    workflows/
      failed-test-to-lesson.md
      flaky-test-review.md
      new-story-to-test-plan.md
      regression-scope-review.md
      performance-regression-review.md
      bug-report-from-test-failure.md
      release-retrospective-to-memory.md
      new-client-onboarding-memory.md
      weekly-qa-memory-review.md

    ai-instructions/
      generic-ai-assistant.md
      chatgpt.md
      claude.md
      github-copilot.md
      cursor.md
      windsurf.md

    testing-domains/
      playwright.md
      robot-framework.md
      cypress.md
      selenium.md
      api-testing.md
      performance-testing.md
      exploratory-testing.md
      mobile-testing.md
      accessibility-testing.md

    checklists/
      smoke-test-checklist.md
      regression-test-checklist.md
      flaky-test-checklist.md
      selector-strategy-checklist.md
      test-data-checklist.md
      performance-baseline-checklist.md
      release-quality-checklist.md

    examples/
      failed-login-test-example.md
      flaky-checkout-test-example.md
      expired-test-data-example.md
      environment-failure-example.md
      performance-regression-example.md

  workspace-template/
    README.md
    project-memory/
      index.md
      product-map.md
      test-strategy.md
      smoke-suite.md
      regression-suite.md
      known-failures.md
      flaky-tests.md
      failure-patterns.md
      test-data-rules.md
      selector-strategy.md
      performance-baselines.md
      release-lessons.md
    personal-memory/
      lessons-learned.md
      reusable-prompts.md
      mistakes-to-avoid.md
      client-rules.md
    inbox/
      failed-test-input.md
      performance-result-input.md
      new-story-input.md
      release-notes-input.md
    outputs/
      failure-summary.md
      memory-update-draft.md
      bug-report-draft.md
      regression-scope-draft.md

  training/
    onboarding-for-testers.md
    first-week-usage-plan.md
    qa-lead-rollout-guide.md
    team-review-session.md

  commercial/
    buyer-one-pager.md
    license-summary.md
    implementation-options.md
```

## 9. First product module

The recommended first module is **Failure Memory**.

### 9.1 Why Failure Memory first

Failure memory is the best first module because:

- every automated QA team has failed tests
- smoke and regression failures are frequent
- failure triage is repetitive
- value is easy to explain
- lessons compound quickly
- it avoids building a test runner
- it fits Playwright, Robot Framework, Cypress, Selenium, API tests, and performance tests

### 9.2 Failure Memory workflow

```text
1. A test fails.
2. Tester collects minimal evidence.
3. Tester runs the ProKit failed-test workflow with their AI assistant.
4. AI proposes a failure summary, category, next action, and reusable lesson.
5. Tester reviews and corrects the proposal.
6. Final lesson is stored in QA memory.
7. Future analysis uses the accumulated memory.
```

### 9.3 Failure categories

ProKit QA Memory should standardize failure categories:

- real product bug
- test automation bug
- flaky test
- selector/locator issue
- test data issue
- environment issue
- pipeline/infrastructure issue
- timing/synchronization issue
- permission/authentication issue
- unclear / needs investigation

### 9.4 Example failure memory entry

```markdown
## Pattern: expired test data causes payment regression failures

### Symptoms
- Payment regression fails before the payment step.
- Error occurs during test account setup.
- API returns user not found, expired, or unauthorized.

### Classification
Usually a test data issue, not a product regression.

### Preferred action
Check test account validity and refresh test data before debugging the payment flow.

### AI instruction
When payment tests fail before the payment step, check `test-data-rules.md` before suggesting product fixes.

### Review rule
Do not mark as product bug until test data freshness is confirmed.
```

## 10. Competitor and adjacent-market research

This market is not empty. There are direct, near-direct, and adjacent competitors.

The key strategic conclusion:

```text
Avoid competing as an AI testing platform.
Compete as a portable QA memory operating system for testers who cannot depend on one client tool stack.
```

### 10.1 Competitor categories

| Category | Examples | Relevance |
|---|---|---|
| Direct / strongest conceptual competitor | Vostride agent-qa | Has an agentic QA harness with file-backed memory. Very relevant, but more software/runtime-heavy. |
| QA skills / AI-agent skill libraries | QASkills.sh | Provides installable QA skills for AI coding agents. Relevant as a skills competitor, not full memory OS. |
| AI test automation platforms | mabl, Functionize, Testim, Katalon, testRigor, ACCELQ, Autify, MagicPod, Momentic, QA Wolf, LambdaTest, Rainforest QA, Applitools, Bug0, TestSprite, Octomind, BaseRock, Autonoma, SpurTest, Autosana | These compete if ProKit QA Memory is positioned as AI testing automation. They are less direct if ProKit is positioned as portable memory. |
| Test analytics / failure analysis platforms | ReportPortal | Relevant for failure history, pattern analysis, AI failure reason detection. More platform/integration-heavy. |
| Research / experimental approaches | RAG Selenium agents, self-healing selector frameworks, AI E2E generation papers | Validate the trend, but usually require systems, tooling, vector DBs, or frameworks. |
| Public workflow/template repos | AI QA workflow repos, markdown QA memory examples | Conceptually similar, but usually not packaged as a B2B licensed tester memory product. |

## 11. Competitor comparison table

| Product / competitor | What it does | Strengths | Limitations / cons | What it cannot easily do | Threat to ProKit QA Memory | ProKit QA Memory differentiation |
|---|---|---|---|---|---|---|
| **Vostride agent-qa** | Agentic QA harness with memory; natural-language tests; CLI/dashboard; self-improving test execution. | Very close to QA + memory. Has runtime, test execution, file-backed memory, self-healing direction. Strong validation that QA memory matters. | More tool/runtime-heavy. Requires adopting its harness. Commercial reuse is license-sensitive due to Functional Source License style restrictions. More likely to need setup, dependencies, and LLM/runtime decisions. | Does not primarily serve as a portable consultant memory system independent of its execution harness. | High conceptual threat. Closest direct signal. | ProKit should be lighter, framework-agnostic, no harness required, no pipeline integration required, designed for testers moving across client environments. |
| **QASkills.sh** | Directory of QA skills for AI coding agents, including Playwright, API, performance, accessibility, visual regression, etc. | Strong skills marketplace angle. Easy install into many coding agents. Broad testing coverage. | Primarily skill installation, not persistent project/client memory. Requires Node/npx for quick install flow. Skills may improve AI behavior but do not necessarily create a long-term QA memory discipline. | Does not provide a full memory operating system with client/project/personal/team memory, review loops, and licensing for testing companies. | Medium threat if ProKit is positioned as “QA skills.” | ProKit should include skills, but as part of a larger memory system: lessons learned, failure memory, regression memory, onboarding, governance. |
| **mabl** | AI-native test automation platform with low-code testing, auto-healing, regression, performance, API/mobile/web testing. | Mature platform; strong automation story; broad enterprise features; self-healing and AI testing positioning. | SaaS/platform dependency. Competes in test execution and automation, not portable memory. Adoption requires tool change and budget. May not fit testers embedded in client environments without permission. | Cannot be a simple, local, markdown-first personal/client memory system usable across any tool stack. | High only if ProKit claims to be AI test automation. Low if ProKit stays memory-first. | ProKit complements mabl by documenting what failures teach testers, independent of test platform. |
| **Functionize** | Enterprise AI test automation platform; agentic AI builds, runs, diagnoses, and self-heals tests. | Strong enterprise automation promise. Reduces maintenance. Good for teams that can adopt a platform. | Heavy platform category. May be expensive and client-permission dependent. Not designed as portable memory for outsourced testers. | Cannot easily give an individual tester a client-safe local memory method across many tool stacks. | High in AI testing automation category. Low in portable memory category. | ProKit avoids platform replacement and focuses on tester-owned memory. |
| **Testim / Tricentis** | AI-powered low-code web app test automation with smart/self-healing locators and test management. | Strong smart-locator and low-code test maintenance story. Backed by Tricentis. | Platform adoption required. Primarily about test creation/execution/maintenance. Less focused on transferable human/AI memory. | Cannot standardize lessons learned across client projects without adopting the platform. | Medium if ProKit talks about self-healing. | ProKit should avoid “self-healing engine” claims and focus on remembering selector lessons, failure patterns, and decisions. |
| **ReportPortal** | Test automation analytics platform with dashboards, history, ML/AI failure reason detection, pattern analysis. | Strong in test result history, failure categorization, dashboards, and analytics. Open-source ecosystem signal. | Requires integration and operation. More centralized system than portable repo. Better for companies controlling their pipelines than testers moving across clients. | Does not provide a lightweight, AI-agnostic memory repo for personal/client QA lessons. | Medium-high for failure analysis and history. | ProKit can be the low-friction memory layer when ReportPortal is unavailable or too heavy. |
| **Katalon** | AI platform for software quality across web, mobile, API, desktop; includes planning, authoring, executing, analyzing, and self-healing locators. | Broad platform and known brand. Strong coverage across testing workflows. | Platform dependency. License and setup required. Not portable for testers across client environments. | Cannot act as a simple client-safe markdown memory method independent of Katalon. | Medium-high in all-in-one QA tooling. | ProKit should not compete as a platform; it should work beside Katalon and capture reusable lessons. |
| **testRigor** | AI/no-code/plain-English test automation; self-healing; web/mobile/API/desktop. | Very simple authoring story. Good for non-technical testers. Strong “plain English” appeal. | Natural language can become limiting for complex technical test logic. Platform dependency. Not primarily a memory system. | Cannot preserve cross-client tester lessons as portable markdown memory. | Medium if ProKit is sold as natural-language testing. | ProKit should focus on persistent testing intelligence, not plain-English test execution. |
| **ACCELQ** | AI-powered codeless test automation and continuous testing platform. | Enterprise codeless automation and broad lifecycle coverage. | Platform replacement/integration category. Less relevant for client-embedded testers without control over tool stack. | Not a local memory OS. | Medium adjacent threat. | ProKit stays tool-independent and lightweight. |
| **Autify / MagicPod** | AI/codeless test automation platforms. | Easier test authoring and maintenance. | Platform-specific. Tool adoption required. | Not portable across client restrictions. | Medium adjacent threat. | ProKit works without changing the client’s automation platform. |
| **Momentic / QA Wolf / LambdaTest / Rainforest QA / Applitools / Bug0 / TestSprite / Octomind / BaseRock / Autonoma / SpurTest / Autosana** | Various AI QA, automated testing, visual testing, cloud testing, managed QA, and agentic testing tools. | Validate strong market demand for AI-assisted QA. Some may have powerful automation or managed services. | Mostly platform/service/tooling categories. They usually require adoption, integration, or vendor workflow. | They do not primarily sell portable, markdown-first tester memory for use across unrelated client environments. | Medium market-noise threat. | ProKit should use different language: memory, lessons learned, AI-usable QA context, portable tester operating system. |
| **Public markdown QA memory examples / workflow repos** | Individual repos and articles showing QA memory, `.md` long-term memory, agent workflows, regression maps, and AI skills. | Very close conceptually. Shows the idea is emerging organically. | Often not commercialized, not packaged, not maintained for B2B licensing, not focused on outsourced testers. | Usually lacks professional rollout, licensing, training, maintenance, and a complete productized system. | Medium idea-copy threat. | ProKit can win by packaging, clarity, training, and buyer-specific positioning. |
| **Academic / research prototypes** | RAG-based Selenium agents, self-healing selector approaches, AI E2E generation, API test generation. | Validates trend: context, history, and grounding improve testing. | Research prototypes are not usually easy commercial products. Often require vector DBs, tools, datasets, or specific frameworks. | Do not provide a ready-to-use consultant memory system. | Low direct threat, high inspiration. | ProKit can translate research insight into simple operational memory patterns. |

## 12. Public evidence and source notes

Research signals found during the conversation:

1. Vostride agent-qa describes itself as an open-source agentic QA harness with memory, natural-language tests, CLI, dashboard, and regression catching.
   - Source: GitHub repository search result, `github.com/vostride/agent-qa`.
2. Vostride publishes license material and comparison pages against many AI QA/test automation competitors.
   - Source: `vostride.com/license`.
3. Functional Source License is a source-available license model that permits use except for competing use and converts to Apache 2.0 or MIT after a delay.
   - Sources: SPDX FSL 1.1 and `fsl.software`.
4. QASkills.sh presents a directory of QA testing skills for AI coding agents and lists hundreds of skills across E2E, API, unit, integration, performance, security, accessibility, mobile, visual regression, contract, load, chaos, BDD, database, compliance, browser automation, TDD, and code quality.
   - Source: `qaskills.sh` and `qaskills.sh/skills`.
5. mabl positions itself as AI-native test automation with agentic testing, low-code testing, mobile/API/performance testing, and AI auto-healing.
   - Source: `mabl.com`.
6. Functionize positions itself as an enterprise AI test automation platform where agentic AI builds, runs, diagnoses, and self-heals tests.
   - Source: `functionize.com`.
7. Testim / Tricentis positions Testim around AI-powered locators that self-heal to improve stability and eliminate maintenance.
   - Source: Tricentis Testim product page.
8. ReportPortal positions itself around test result visualization, history, pattern detection, AI/ML failure reason detection, and automation analytics.
   - Sources: `reportportal.io` and ReportPortal docs.
9. Katalon positions itself as an AI platform for software quality across web, mobile, API, and desktop, with AI agents and self-healing mechanisms.
   - Sources: `katalon.com` and Katalon docs.
10. testRigor positions itself as generative AI/plain-English test automation with self-healing.
   - Sources: `testrigor.com`.
11. Recent research and articles show active interest in AI test generation, RAG-grounded Selenium generation, self-healing selectors, and avoiding AI-generated QA technical debt.
   - Sources: arXiv and technology/QA articles found during research.

## 13. Strategic positioning

### 13.1 Do not say

Avoid positioning as:

- AI test automation platform
- self-healing testing tool
- automated QA agent
- test runner
- no-code testing tool
- test analytics dashboard
- CI/CD testing platform
- Playwright replacement
- Copilot replacement

These terms create direct comparison with large and crowded tools.

### 13.2 Say instead

Recommended positioning:

```text
ProKit QA Memory is a portable memory system for AI-assisted software testers.
```

Expanded version:

```text
It helps testers capture client context, failure patterns, regression lessons, test data rules, performance baselines, and reusable AI instructions in a structured local workspace, so testing knowledge compounds across projects without depending on one tool, one framework, one client environment, or one AI model.
```

### 13.3 Unique selling proposition

The unique selling proposition:

```text
Your testers already have tools. ProKit QA Memory gives them persistent testing memory that works across all of them.
```

More specific:

```text
A client-safe, markdown-first QA memory operating system for testers who move between projects, tools, and companies.
```

### 13.4 Why this is unique

Most competitors focus on:

- writing tests
- running tests
- healing tests
- analyzing test results
- dashboards
- CI/CD integration
- low-code automation
- agentic execution

ProKit QA Memory focuses on:

- remembering lessons
- preserving client/project context
- improving AI prompts with reusable context
- standardizing tester thinking
- capturing failure patterns
- transferring experience across projects safely
- keeping memory independent from tools and AI models

This is a different category.

## 14. What ProKit QA Memory can and cannot do

### 14.1 Can do

ProKit QA Memory can:

- help testers structure project/client context
- capture recurring failure patterns
- capture flaky-test knowledge
- document selector and test data strategy
- capture regression risk areas
- capture performance baseline notes
- help AI assistants give less generic answers
- improve consistency across testers
- reduce repeated investigation of known issues
- support testers in environments where no tool installation is allowed
- work with many frameworks and AI tools
- be sold as a maintained licensed repo
- be updated centrally by ProKit

### 14.2 Cannot do

ProKit QA Memory cannot, by itself:

- run tests
- automatically collect pipeline logs
- execute Playwright/Robot/Cypress/Selenium scripts
- self-heal selectors automatically
- replace Jira/TestRail/Xray
- automatically detect flaky tests from CI history
- guarantee better testing without disciplined use
- access client systems without permission
- remove the need for human tester judgment

These limitations should be embraced, not hidden.

Buyer-facing explanation:

```text
ProKit QA Memory does not replace your testing tools. It makes your testing knowledge reusable across them.
```

## 15. Lean product recommendation

### 15.1 Recommended MVP

Build only the following first:

```text
ProKit QA Memory v0.1
- README and quickstart
- core QA memory principles
- workspace template
- failure memory workflow
- flaky-test workflow
- regression memory workflow
- generic AI assistant instructions
- ChatGPT instructions
- GitHub Copilot instructions
- Playwright example
- Robot Framework example
- QA lead rollout guide
```

Do not build:

- API
- dashboard
- CLI
- installer
- VS Code extension
- GitHub Action
- MCP server
- vector database
- browser automation

### 15.2 First three workflows

1. **Failed Test → Reusable Lesson**
2. **Flaky Test → Pattern + Decision**
3. **New Story → Test Memory-Aware Test Plan**

These cover immediate tester pain without building software.

### 15.3 First three memory files

1. `known-failures.md`
2. `flaky-tests.md`
3. `failure-patterns.md`

Additional files can come later.

### 15.4 First proof of value

The first proof should show before/after:

Before:

```text
Tester pastes a failure into AI and gets a generic answer.
```

After:

```text
Tester uses ProKit QA Memory context and gets a more specific, reusable failure analysis plus memory update.
```

## 16. Commercial model

### 16.1 Recommended tiers

| Tier | Price idea | Includes |
|---|---:|---|
| Solo / Freelancer | €99–€199/year | Private repo access for 1 tester, updates, quickstart. |
| Small Team | €499–€999/year | Up to 5 testers, repo access, onboarding guide, examples. |
| QA Company Team | €1,999–€3,999/year | Up to 20 testers, company mirror option, onboarding session, rollout guide, quarterly update briefing. |
| Professional / Agency | €4,999–€9,999/year | 50+ testers, team lead training, custom memory review session, priority roadmap input. |

A monthly per-seat model can also work:

```text
€15–€30 per tester per month
```

For 20 testers:

```text
€300–€600/month
```

### 16.2 What customers are paying for

They are not paying for markdown files.

They are paying for:

- a maintained QA memory method
- standardized tester workflows
- reusable AI instructions
- consistent team practice
- onboarding material
- updates from ProKit
- a structured way to make AI-assisted testing safer and more useful
- a system that works without client-system access

### 16.3 Demo vs paid repo

Recommended:

```text
Public demo repo:
prokit-qa-memory-demo

Private paid repo:
prokit-qa-memory
```

The public demo should include:

- fake webshop example
- fake Playwright failure
- fake flaky test
- one small QA memory example
- one AI prompt example
- buyer explanation

The private paid repo includes:

- full memory model
- all workflow templates
- all AI instructions
- all examples
- training material
- rollout guides
- updates

## 17. Sales message

### 17.1 One-liner

```text
ProKit QA Memory gives software testers a portable memory system for AI-assisted testing, so lessons from failures, regressions, and client projects do not disappear.
```

### 17.2 Buyer pitch

```text
Your testers already use different tools at different clients. They cannot always install new platforms or change pipelines. ProKit QA Memory gives them a structured, local-first way to capture what they learn, reuse it with AI assistants, and standardize QA thinking across projects.
```

### 17.3 Tester pitch

```text
Stop asking AI the same testing questions from zero. Keep a client-safe QA memory with known failures, flaky tests, regression risks, test data rules, and reusable prompts so every project becomes easier to test over time.
```

### 17.4 QA lead pitch

```text
Give every tester the same memory discipline without forcing one testing tool. ProKit QA Memory standardizes how your testers capture lessons, use AI, and avoid repeated investigation across client projects.
```

## 18. Risks and mitigations

| Risk | Explanation | Mitigation |
|---|---|---|
| Buyers think it is just markdown templates | Repo-only products can feel low-value. | Sell it as maintained QA operating method, with training, examples, versioned updates, and rollout material. |
| Testers do not use it consistently | Memory systems only work if updated. | Make workflows extremely short. Start with failure memory only. Add weekly review habit. |
| Client data/security concerns | Testers may handle confidential logs or product data. | Build client-data safety rules. Encourage local/client-approved storage only. Never require upload to ProKit. |
| Competition from AI testing tools | Large platforms can claim AI memory, self-healing, analytics. | Avoid automation category. Position around portable memory for testers across client environments. |
| Too broad too soon | QA includes manual, automation, API, performance, mobile, security, accessibility. | Start with failure memory for automation/regression. Add domains later. |
| Hard to prove ROI | Memory value compounds over time. | Use before/after demos and repeated-failure examples. Track repeated investigations avoided. |
| Users expect automation | Some buyers may want automatic pipeline integration. | Be explicit: no tool replacement. Optional integrations can come later after proof. |
| Repo access/licensing admin | Managing named testers manually can be annoying. | Start manual. Later support company mirrors and license files. |

## 19. Viability verdict

Recommendation:

```text
Proceed, but only as a narrow, portable QA memory product.
```

This is viable because:

- it fits ProKit / ProChat OS core strategy
- it uses memory, not tool replacement, as the main value
- it can be built leanly in markdown
- it does not require APIs, servers, or client access
- it matches your 12 years of software testing background
- it can be sold through your testing network
- it is differentiated from AI test automation platforms
- it can later grow into software if demand is proven

This is not viable if it becomes:

- another AI testing platform
- another Playwright/Robot wrapper
- another self-healing agent
- another dashboard
- another CI/CD integration tool

The key discipline:

```text
Build memory first. Package method first. Add software only after repeated buyer demand proves the need.
```

## 20. Recommended next steps

### Step 1 — Create the first product skeleton

Create the private repo structure with the minimum files:

```text
README.md
QUICKSTART.md
core/principles/00-qa-memory-principles.md
core/workflows/failed-test-to-lesson.md
core/workflows/flaky-test-review.md
core/workflows/regression-scope-review.md
core/ai-instructions/generic-ai-assistant.md
workspace-template/project-memory/known-failures.md
workspace-template/project-memory/flaky-tests.md
workspace-template/project-memory/failure-patterns.md
workspace-template/project-memory/test-strategy.md
training/onboarding-for-testers.md
```

### Step 2 — Build one fake demo project

Use a fake webshop or task app.

Include:

- fake test failures
- fake known failures
- fake flaky tests
- fake regression lessons
- fake AI prompt/output example

### Step 3 — Interview the tester contact

Ask:

1. Where do failed smoke/regression lessons live now?
2. How often do the same failure types come back?
3. How does he use Copilot today for test failures?
4. Would a local QA memory folder help him?
5. What files would he actually open weekly?
6. What would be too much friction?
7. What could his employer safely allow testers to use?

### Step 4 — Run a manual pilot

Give him a private copy of v0.1.

Ask him to use only the failure-memory workflow for two weeks.

Measure:

- number of failures captured
- number of reusable lessons created
- whether AI answers improved
- whether it saved time
- whether he would recommend it to other testers

### Step 5 — Package the first commercial offer

Offer:

```text
ProKit QA Memory Team License
For up to 20 testers.
Includes private repo access, onboarding guide, first workflow pack, quarterly updates, and team lead rollout guide.
```

## 21. Final strategic recommendation

ProKit QA Memory should be built as a **productized memory layer**, not as software automation.

The perfect ProKit OS alignment is:

```text
ProKit OS = reusable work memory for businesses.
ProKit QA Memory = reusable testing memory for software testers.
```

The unique wedge is:

```text
Portable QA memory for testers who cannot depend on one client environment, one AI model, one testing framework, or one platform.
```

The strongest first promise:

```text
Every failed test becomes a reusable lesson.
```

The strongest buyer sentence:

```text
Your testers already have testing tools. ProKit QA Memory gives them the persistent memory those tools do not carry across clients.
```

This is the leanest, most ProKit-native path.
