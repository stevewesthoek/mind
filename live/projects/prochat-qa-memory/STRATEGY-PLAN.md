# ProChat QA Memory — Strategy Plan

**Status:** discovery strategy draft  
**Created:** 2026-06-08  
**Owner:** Steve Westhoek  
**Location:** `live/projects/prochat-qa-memory/STRATEGY-PLAN.md`

## 1. Executive summary

ProChat QA Memory is a proposed niche-specific derivative product from the ProChat OS direction.

The highest ProChat OS vision is not to build another temporary software tool, another isolated agent, or another workflow that becomes obsolete when tools change. The highest vision is to give people and businesses a **persistent Work Memory**: a growing, reusable body of knowledge, examples, decisions, lessons, preferences, rules, and feedback that makes every future AI-assisted workflow better.

The core ProChat OS philosophy:

```text
Every repeated work situation should leave reusable memory behind.
That memory should make the next run faster, clearer, and more accurate.
```

ProChat QA Memory applies this philosophy to software testing.

The product should not be a new testing framework, test runner, SaaS dashboard, CI/CD tool, self-healing engine, or AI agent platform. Those categories are crowded, tool-dependent, maintenance-heavy, and difficult to differentiate.

The recommended product is a **portable, licensed, markdown-first persistent QA memory system** for software testers and software testing companies.

The core promise:

```text
Give every tester a structured way to capture client context, test decisions, failures, risks, regression lessons, performance lessons, and reusable AI instructions — so testing knowledge compounds over time instead of disappearing into chats, tickets, logs, and people’s heads.
```

The product distinction:

```text
Most QA tools help testers write, run, heal, or report tests.
ProChat QA Memory helps testers remember what testing has already taught them.
```

The more ProChat QA Memory is used, the more valuable it becomes. Each reviewed failure, flaky test, regression issue, performance concern, client rule, test-data problem, selector lesson, and release decision becomes reusable testing intelligence for future work.

The best first buyer is not necessarily a software company that owns one product. The better first buyer is a **software testing company, QA consultancy, SDET staffing company, or test automation agency** with multiple testers working across multiple client environments.

Those testers often cannot install new tools in client systems, cannot change client pipelines, cannot add SaaS integrations, and cannot give external vendors access to client repositories. A repo-native, local, tool-agnostic memory system fits that constraint better than another testing platform.

The recommended initial packaging:

```text
ProChat QA Memory
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

The customer licenses access per tester or per company. Testers clone the product repo, then create private local/client workspaces from the provided templates. Client-specific information stays in their own local or employer-approved environment and does not return to ProChat.

This is viable if the product stays focused on **persistent memory and reusable testing intelligence**, not test execution automation.

## 2. Terminology note

The current canonical repo strategy documents refer to **ProChat OS** as the managed AI work system that turns messy information and reusable company knowledge into review-ready outputs.

This plan uses the name **ProChat QA Memory** because that is the product name requested during the conversation. Naming should be confirmed later.

Potential naming options:

| Name | Positioning | Notes |
|---|---|---|
| ProChat QA Memory | Productized derivative from ProChat/ProChat OS | Good if ProChat becomes the commercial product family. |
| ProChat QA Memory | Stronger connection to existing ProChat OS docs | Good if ProChat remains the public brand. |
| QA Memory OS | Clear category name | Generic, but strong. |
| Test Memory OS | Broader and simpler | Could include manual, automation, regression, performance, API, mobile. |
| ProChat Test Memory | Slightly broader than QA | May be easier to understand for testers. |

Recommendation for now:

```text
Use “ProChat QA Memory” as the project name internally.
Use “portable QA memory for AI-assisted software testers” as the public explanation.
```

## 3. How it relates to ProChat / ProChat OS

ProChat OS is the higher-level product philosophy and operating pattern. It exists to turn repeated work into persistent Work Memory that improves future work.

The canonical ProChat OS pattern is:

```text
messy input + work memory → useful output → human review → improvement loop
```

The deeper principle is persistence:

```text
Useful work should not disappear after it is completed.
Every run should leave behind reusable memory.
That memory should improve the next run.
```

This is the foundation of ProChat OS across all niches. ProChat OS should be understood as a memory-first work system, not primarily as software, automation, or agents. Software, automations, and agents may be used later, but they are replaceable implementation layers. The persistent Work Memory is the durable product layer.

ProChat QA Memory is the QA-specific version:

```text
test failures + logs + tester notes + client constraints + testing standards + historical lessons
→ persistent QA memory
→ better triage, better test decisions, better AI assistance, better regression judgment
→ tester review
→ QA memory improves
```

This makes ProChat QA Memory a natural derivative product rather than a new business direction.

The key relationship:

```text
ProChat OS = persistent Work Memory for repeated business work.
ProChat QA Memory = persistent QA Memory for repeated software testing work.
```

ProChat QA Memory should therefore be built from the same foundation as ProChat OS: memory first, workflows second, software third.

### 3.1 ProChat OS layer mapping

| ProChat / ProChat OS concept | QA-specific version |
|---|---|
| Messy input | Failed test logs, Playwright traces, screenshots, Jira tickets, PR notes, test run summaries, performance results, release notes, acceptance criteria. |
| Work Memory | QA Memory: known failures, flaky tests, product risks, client rules, selector strategy, test data rules, regression lessons, performance baselines, release lessons. |
| Workflow module | Failed-test-to-lesson, flaky-test review, new-story-to-test-plan, regression scope review, performance regression review. |
| Human review | Tester confirms whether AI analysis is correct before memory is updated. |
| Improvement loop | Each reviewed failure or release adds more reusable knowledge. |
| Managed improvement | ProChat updates the core memory model, templates, checklists, and AI instructions. |

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

This matches ProChat OS perfectly: recurring knowledge work becomes reusable memory.

## 4. Product thesis

### 4.0 Product foundation

ProChat QA Memory is not a QA tool, test runner, or automation platform.

It is the persistent memory layer for QA work.

It should work with:

- any testing framework
- any AI assistant
- any IDE
- any client environment
- any repository setup
- with or without API access
- with or without CI integration
- with or without permission to install tools in the client environment

Its core job is to make testing knowledge compound.

```text
Failed tests, flaky tests, regressions, performance issues, client rules, test-data problems, selector lessons, release decisions, and tester corrections become reusable QA memory.
```

This is the QA-specific version of the ProChat OS memory-first strategy.

### 4.1 QA memory design principles

- **Persistent:** lessons should survive individual chats, tickets, pipeline runs, and tester memory.
- **Portable:** testers should be able to carry their approved working method across clients without carrying confidential client data.
- **Client-safe:** client-specific memory should stay in the tester/company-approved workspace, not in the ProChat product repo.
- **AI-agnostic:** the memory should be usable with ChatGPT, Claude, Copilot, Cursor, Gemini, or future AI assistants.
- **Tool-agnostic:** the memory should support Playwright, Robot Framework, Cypress, Selenium, API testing, performance testing, manual testing, and future tools.
- **Environment-agnostic:** the product should still be useful when testers cannot change the client repo, pipeline, or tooling.
- **Canonical:** every important rule, lesson, pattern, or decision should have one trusted current place.
- **Source-traceable:** important lessons should link back where possible to the failed run, bug ticket, PR, test file, screenshot, trace, report, or tester note that created the lesson.
- **Review-first:** AI can draft summaries and memory updates, but testers decide what becomes trusted QA memory.
- **Self-improving through use:** every reviewed failure, correction, regression, and release should make the next investigation easier.

### 4.2 Practical meaning of self-healing

ProChat QA Memory should not initially promise automatic self-healing test execution.

In this product, self-healing means:

```text
A failure does not only get fixed.
It leaves behind a reviewed lesson that reduces the chance of repeating the same mistake.
```

Future automation can use this memory to suggest safer fixes, better triage, improved test design, and eventually tool-specific self-healing workflows. But the foundation is the memory, not the automation.

## 4.3 Product thesis

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

ProChat QA Memory changes the loop:

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

ProChat QA Memory is a **licensed, portable QA memory repo**.

It contains:

1. A reusable QA memory model.
2. A tester workspace template.
3. Client/project memory templates.
4. AI assistant instruction files.
5. QA workflows for repeated situations.
6. Review checklists.
7. Example memories.
8. Training and rollout guides.
9. Versioned improvements maintained by ProChat.

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

ProChat maintains one private repository:

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

ProChat’s repo contains the reusable method, not the customer’s private data.

### 7.3 Update model

ProChat updates the product repo with:

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

Or their company mirror pulls from ProChat on a release schedule.

### 7.4 No-access constraint

Because the buyer’s testers work at external client companies, ProChat should assume:

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
3. Tester runs the ProChat failed-test workflow with their AI assistant.
4. AI proposes a failure summary, category, next action, and reusable lesson.
5. Tester reviews and corrects the proposal.
6. Final lesson is stored in QA memory.
7. Future analysis uses the accumulated memory.
```

### 9.3 Failure categories

ProChat QA Memory should standardize failure categories:

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
| AI test automation platforms | mabl, Functionize, Testim, Katalon, testRigor, ACCELQ, Autify, MagicPod, Momentic, QA Wolf, LambdaTest, Rainforest QA, Applitools, Bug0, TestSprite, Octomind, BaseRock, Autonoma, SpurTest, Autosana | These compete if ProChat QA Memory is positioned as AI testing automation. They are less direct if ProChat is positioned as portable memory. |
| Test analytics / failure analysis platforms | ReportPortal | Relevant for failure history, pattern analysis, AI failure reason detection. More platform/integration-heavy. |
| Research / experimental approaches | RAG Selenium agents, self-healing selector frameworks, AI E2E generation papers | Validate the trend, but usually require systems, tooling, vector DBs, or frameworks. |
| Public workflow/template repos | AI QA workflow repos, markdown QA memory examples | Conceptually similar, but usually not packaged as a B2B licensed tester memory product. |

## 11. Competitor comparison table

| Product / competitor | What it does | Strengths | Limitations / cons | What it cannot easily do | Threat to ProChat QA Memory | ProChat QA Memory differentiation |
|---|---|---|---|---|---|---|
| **Vostride agent-qa** | Agentic QA harness with memory; natural-language tests; CLI/dashboard; self-improving test execution. | Very close to QA + memory. Has runtime, test execution, file-backed memory, self-healing direction. Strong validation that QA memory matters. | More tool/runtime-heavy. Requires adopting its harness. Commercial reuse is license-sensitive due to Functional Source License style restrictions. More likely to need setup, dependencies, and LLM/runtime decisions. | Does not primarily serve as a portable consultant memory system independent of its execution harness. | High conceptual threat. Closest direct signal. | ProChat should be lighter, framework-agnostic, no harness required, no pipeline integration required, designed for testers moving across client environments. |
| **QASkills.sh** | Directory of QA skills for AI coding agents, including Playwright, API, performance, accessibility, visual regression, etc. | Strong skills marketplace angle. Easy install into many coding agents. Broad testing coverage. | Primarily skill installation, not persistent project/client memory. Requires Node/npx for quick install flow. Skills may improve AI behavior but do not necessarily create a long-term QA memory discipline. | Does not provide a full memory operating system with client/project/personal/team memory, review loops, and licensing for testing companies. | Medium threat if ProChat is positioned as “QA skills.” | ProChat should include skills, but as part of a larger memory system: lessons learned, failure memory, regression memory, onboarding, governance. |
| **mabl** | AI-native test automation platform with low-code testing, auto-healing, regression, performance, API/mobile/web testing. | Mature platform; strong automation story; broad enterprise features; self-healing and AI testing positioning. | SaaS/platform dependency. Competes in test execution and automation, not portable memory. Adoption requires tool change and budget. May not fit testers embedded in client environments without permission. | Cannot be a simple, local, markdown-first personal/client memory system usable across any tool stack. | High only if ProChat claims to be AI test automation. Low if ProChat stays memory-first. | ProChat complements mabl by documenting what failures teach testers, independent of test platform. |
| **Functionize** | Enterprise AI test automation platform; agentic AI builds, runs, diagnoses, and self-heals tests. | Strong enterprise automation promise. Reduces maintenance. Good for teams that can adopt a platform. | Heavy platform category. May be expensive and client-permission dependent. Not designed as portable memory for outsourced testers. | Cannot easily give an individual tester a client-safe local memory method across many tool stacks. | High in AI testing automation category. Low in portable memory category. | ProChat avoids platform replacement and focuses on tester-owned memory. |
| **Testim / Tricentis** | AI-powered low-code web app test automation with smart/self-healing locators and test management. | Strong smart-locator and low-code test maintenance story. Backed by Tricentis. | Platform adoption required. Primarily about test creation/execution/maintenance. Less focused on transferable human/AI memory. | Cannot standardize lessons learned across client projects without adopting the platform. | Medium if ProChat talks about self-healing. | ProChat should avoid “self-healing engine” claims and focus on remembering selector lessons, failure patterns, and decisions. |
| **ReportPortal** | Test automation analytics platform with dashboards, history, ML/AI failure reason detection, pattern analysis. | Strong in test result history, failure categorization, dashboards, and analytics. Open-source ecosystem signal. | Requires integration and operation. More centralized system than portable repo. Better for companies controlling their pipelines than testers moving across clients. | Does not provide a lightweight, AI-agnostic memory repo for personal/client QA lessons. | Medium-high for failure analysis and history. | ProChat can be the low-friction memory layer when ReportPortal is unavailable or too heavy. |
| **Katalon** | AI platform for software quality across web, mobile, API, desktop; includes planning, authoring, executing, analyzing, and self-healing locators. | Broad platform and known brand. Strong coverage across testing workflows. | Platform dependency. License and setup required. Not portable for testers across client environments. | Cannot act as a simple client-safe markdown memory method independent of Katalon. | Medium-high in all-in-one QA tooling. | ProChat should not compete as a platform; it should work beside Katalon and capture reusable lessons. |
| **testRigor** | AI/no-code/plain-English test automation; self-healing; web/mobile/API/desktop. | Very simple authoring story. Good for non-technical testers. Strong “plain English” appeal. | Natural language can become limiting for complex technical test logic. Platform dependency. Not primarily a memory system. | Cannot preserve cross-client tester lessons as portable markdown memory. | Medium if ProChat is sold as natural-language testing. | ProChat should focus on persistent testing intelligence, not plain-English test execution. |
| **ACCELQ** | AI-powered codeless test automation and continuous testing platform. | Enterprise codeless automation and broad lifecycle coverage. | Platform replacement/integration category. Less relevant for client-embedded testers without control over tool stack. | Not a local memory OS. | Medium adjacent threat. | ProChat stays tool-independent and lightweight. |
| **Autify / MagicPod** | AI/codeless test automation platforms. | Easier test authoring and maintenance. | Platform-specific. Tool adoption required. | Not portable across client restrictions. | Medium adjacent threat. | ProChat works without changing the client’s automation platform. |
| **Momentic / QA Wolf / LambdaTest / Rainforest QA / Applitools / Bug0 / TestSprite / Octomind / BaseRock / Autonoma / SpurTest / Autosana** | Various AI QA, automated testing, visual testing, cloud testing, managed QA, and agentic testing tools. | Validate strong market demand for AI-assisted QA. Some may have powerful automation or managed services. | Mostly platform/service/tooling categories. They usually require adoption, integration, or vendor workflow. | They do not primarily sell portable, markdown-first tester memory for use across unrelated client environments. | Medium market-noise threat. | ProChat should use different language: memory, lessons learned, AI-usable QA context, portable tester operating system. |
| **Public markdown QA memory examples / workflow repos** | Individual repos and articles showing QA memory, `.md` long-term memory, agent workflows, regression maps, and AI skills. | Very close conceptually. Shows the idea is emerging organically. | Often not commercialized, not packaged, not maintained for B2B licensing, not focused on outsourced testers. | Usually lacks professional rollout, licensing, training, maintenance, and a complete productized system. | Medium idea-copy threat. | ProChat can win by packaging, clarity, training, and buyer-specific positioning. |
| **Academic / research prototypes** | RAG-based Selenium agents, self-healing selector approaches, AI E2E generation, API test generation. | Validates trend: context, history, and grounding improve testing. | Research prototypes are not usually easy commercial products. Often require vector DBs, tools, datasets, or specific frameworks. | Do not provide a ready-to-use consultant memory system. | Low direct threat, high inspiration. | ProChat can translate research insight into simple operational memory patterns. |

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

### 13.0 Core positioning principle

The product should be positioned around persistent QA memory, not around automation.

Recommended internal principle:

```text
Memory is the product.
Workflows are the method.
AI is the assistant.
Testing tools are the environment.
```

This keeps ProChat QA Memory aligned with ProChat OS. The system should become more valuable over time because the tester or team keeps adding reviewed knowledge from real testing work.

The strongest strategic distinction:

```text
ProChat QA Memory does not try to be the tool that runs or heals tests.
It is the memory layer that remembers what previous tests, failures, regressions, and releases have taught the tester.
```

This persistent memory can later support more advanced capabilities such as better AI-assisted triage, better test planning, safer self-healing suggestions, automated summaries, or tool integrations. But those capabilities should be built on top of memory, not replace memory as the product foundation.

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
ProChat QA Memory is a portable memory system for AI-assisted software testers.
```

Expanded version:

```text
It helps testers capture client context, failure patterns, regression lessons, test data rules, performance baselines, and reusable AI instructions in a structured local workspace, so testing knowledge compounds across projects without depending on one tool, one framework, one client environment, or one AI model.
```

### 13.3 Unique selling proposition

The unique selling proposition:

```text
Your testers already have tools. ProChat QA Memory gives them persistent testing memory that works across all of them.
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

ProChat QA Memory focuses on:

- remembering lessons
- preserving client/project context
- improving AI prompts with reusable context
- standardizing tester thinking
- capturing failure patterns
- transferring experience across projects safely
- keeping memory independent from tools and AI models

This is a different category.

## 14. What ProChat QA Memory can and cannot do

### 14.1 Can do

ProChat QA Memory can:

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
- be updated centrally by ProChat

### 14.2 Cannot do

ProChat QA Memory cannot, by itself:

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
ProChat QA Memory does not replace your testing tools. It makes your testing knowledge reusable across them.
```

## 15. Lean product recommendation

### 15.1 Recommended MVP

Build only the following first:

```text
ProChat QA Memory v0.1
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
Tester uses ProChat QA Memory context and gets a more specific, reusable failure analysis plus memory update.
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
- updates from ProChat
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
ProChat QA Memory gives software testers a portable memory system for AI-assisted testing, so lessons from failures, regressions, and client projects do not disappear.
```

### 17.2 Buyer pitch

```text
Your testers already use different tools at different clients. They cannot always install new platforms or change pipelines. ProChat QA Memory gives them a structured, local-first way to capture what they learn, reuse it with AI assistants, and standardize QA thinking across projects.
```

### 17.3 Tester pitch

```text
Stop asking AI the same testing questions from zero. Keep a client-safe QA memory with known failures, flaky tests, regression risks, test data rules, and reusable prompts so every project becomes easier to test over time.
```

### 17.4 QA lead pitch

```text
Give every tester the same memory discipline without forcing one testing tool. ProChat QA Memory standardizes how your testers capture lessons, use AI, and avoid repeated investigation across client projects.
```

## 18. Risks and mitigations

| Risk | Explanation | Mitigation |
|---|---|---|
| Buyers think it is just markdown templates | Repo-only products can feel low-value. | Sell it as maintained QA operating method, with training, examples, versioned updates, and rollout material. |
| Testers do not use it consistently | Memory systems only work if updated. | Make workflows extremely short. Start with failure memory only. Add weekly review habit. |
| Client data/security concerns | Testers may handle confidential logs or product data. | Build client-data safety rules. Encourage local/client-approved storage only. Never require upload to ProChat. |
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

- it fits ProChat / ProChat OS core strategy
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
ProChat QA Memory Team License
For up to 20 testers.
Includes private repo access, onboarding guide, first workflow pack, quarterly updates, and team lead rollout guide.
```

## 21. Final strategic recommendation

ProChat QA Memory should be built as a **productized memory layer**, not as software automation.

The perfect ProChat OS alignment is:

```text
ProChat OS = reusable work memory for businesses.
ProChat QA Memory = reusable testing memory for software testers.
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
Your testers already have testing tools. ProChat QA Memory gives them the persistent memory those tools do not carry across clients.
```

This is the leanest, most ProChat-native path.
