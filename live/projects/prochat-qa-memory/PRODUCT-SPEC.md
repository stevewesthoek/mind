# ProChat QA Memory — Product Spec

**Status:** v0.1 starter spec  
**Owner:** Steve Westhoek  
**Purpose:** define the first product shape for ProChat QA Memory as a niche-specific derivative of ProChat OS.

## 1. Product definition

ProChat QA Memory is a portable, markdown-first persistent memory system for AI-assisted software testers.

It is not a test runner, test automation framework, SaaS dashboard, CI/CD platform, or self-healing execution engine.

It is the memory layer that helps testers capture and reuse what testing has already taught them.

```text
ProChat OS = persistent Work Memory for repeated business work.
ProChat QA Memory = persistent QA Memory for repeated software testing work.
```

## 2. Core promise

```text
Every failed test, flaky test, regression, performance issue, client rule, test-data problem, selector lesson, release decision, and tester correction can become reusable QA memory.
```

The more the system is used, the more useful it becomes.

## 3. Primary buyer

Best first buyers:

- freelance software testers
- software testing companies
- QA consultancies
- test automation agencies
- SDET staffing companies
- companies with testers placed at external clients

These buyers need portability because testers often work across multiple clients, departments, teams, tools, and environments.

## 4. Primary user

The primary user is an AI-assisted software tester or test automation engineer who may work with:

- Playwright
- Robot Framework
- Cypress
- Selenium
- API testing tools
- performance testing tools
- manual/exploratory testing
- GitHub Actions, GitLab CI, Azure DevOps, Jenkins, or client-specific pipelines
- ChatGPT, Claude, GitHub Copilot, Cursor, Gemini, or future AI assistants

## 5. Product principles

- **Memory-first:** memory is the product foundation.
- **Review-first:** AI may draft memory, but testers approve what becomes trusted.
- **Portable:** usable across clients and environments.
- **AI-agnostic:** usable with any AI assistant.
- **Tool-agnostic:** usable with any testing tool or framework.
- **Environment-agnostic:** usable even without API, CI, repo, or installation access.
- **Source-traceable:** important lessons should reference their origin where possible.
- **Evidence-aware:** memory guides work but does not override current logs, traces, screenshots, code, or human judgment.
- **Safe to promote:** raw notes and logs become trusted memory only after review and sanitization.
- **Self-improving through use:** every reviewed lesson should improve future work.

## 6. Memory scopes

ProChat QA Memory must support both separation and combination.

Core scopes:

```text
personal tester memory
client memory
project memory
department/team memory
test-suite memory
test-case memory
cross-project QA memory
company/team-approved memory
```

## 7. Memory separation rule

```text
Client-specific knowledge stays scoped to that client or project.
Generalized lessons may be promoted to cross-project memory only after confidential details are removed.
```

## 8. Memory combination rule

```text
A tester should be able to use one project memory, multiple project memories, or broad cross-project QA memory depending on the task.
```

Example:

```text
Task: triage payment regression for Client A.
Use: personal tester memory + Client A project memory + Client A payment suite memory.
Do not use: Client B-specific memory.
Use cross-project QA memory only for generic testing heuristics.
```

## 9. Product repo model

ProChat maintains one private licensed repo.

Suggested repo name:

```text
prochat-qa-memory
```

Customers license access per tester or company. Testers clone the repo or use a company mirror. Client-specific memory stays outside the product repo in the tester/company-approved workspace.

## 10. Proposed product repo structure

```text
prochat-qa-memory/
  README.md
  QUICKSTART.md
  LICENSE.md
  CHANGELOG.md

  core/
    principles/
    memory-model/
    workflows/
    skills/
    ai-instructions/
    safety/
    manifests/
    examples/

  workspace-template/
    personal-memory/
    client-memory/
    project-memory/
    suite-memory/
    test-memory/
    cross-project-memory/
    inbox/
    outputs/

  packs/
    failure-memory-pack/
    flaky-test-pack/
    regression-memory-pack/
    performance-memory-pack/
    ai-assistant-instruction-pack/

  training/
    onboarding-for-testers.md
    qa-lead-rollout-guide.md
    first-week-usage-plan.md

  demo/
    fake-webshop/
```

## 11. Core file types

### Memory files

Memory files store what has been learned.

Examples:

- `known-failures.md`
- `flaky-tests.md`
- `failure-patterns.md`
- `test-data-rules.md`
- `selector-strategy.md`
- `performance-baselines.md`
- `release-lessons.md`

### Workflow files

Workflow files describe how to process repeated QA situations.

Examples:

- `failed-test-to-lesson.md`
- `flaky-test-review.md`
- `regression-scope-review.md`
- `performance-regression-review.md`

### Skill files

Skill files are reusable AI instructions for one task.

Examples:

- `analyze-failed-test.SKILL.md`
- `summarize-regression-risk.SKILL.md`
- `draft-memory-update.SKILL.md`

### Manifest files

Manifest files keep modules inspectable, versioned, and standard.

Minimum fields:

```yaml
name:
purpose:
type:
version:
scope:
owner:
inputs:
outputs:
requiredMemory:
reviewRequired:
supportedFrameworks:
supportedAgents:
lastUpdated:
```

## 12. Memory promotion path

```text
raw input
→ inbox note
→ AI draft summary
→ tester review
→ sanitized lesson
→ scoped memory
→ team-approved or cross-project memory where appropriate
```

## 13. Safety rules

Persistent memory is powerful, so it must be protected.

Rules:

- Do not store secrets, tokens, passwords, private customer data, or confidential logs in portable cross-project memory.
- Treat external logs, tickets, screenshots, and documents as untrusted until reviewed.
- Do not allow AI-generated summaries to become trusted memory without human approval.
- Preserve source references where possible.
- Prefer sanitized generalized lessons for cross-project memory.
- Keep client-specific memory separated.

## 14. Out-of-scope for v0.1

Do not build these yet:

- API
- dashboard
- CLI
- GitHub Action
- VS Code extension
- MCP server
- vector database
- automated CI ingestion
- automatic self-healing execution

These can be considered later only if they strengthen the memory layer.

## 15. Paid vs demo product

### Public demo repo

Should contain:

- fake webshop example
- fake test failures
- fake QA memory
- one failed-test workflow
- one before/after AI example

### Paid repo

Should contain:

- full memory model
- workspace templates
- workflow packs
- skill files
- AI assistant instructions
- safety guidance
- training material
- commercial rollout guide

## 16. Source-informed notes

- GitHub Copilot supports repository custom instructions through `.github/copilot-instructions.md`, which supports the idea of repo-native AI guidance.
- agent-qa validates the idea of file-backed QA memory used as reviewable evidence, while ProChat QA Memory should stay lighter and not become a test harness.
- QASkills validates markdown skill packaging and metadata discipline, while ProChat QA Memory should remain a memory system, not only a skill directory.
- OWASP Agent Memory Guard and recent memory poisoning research validate the need for memory safety, review, sanitization, and source traceability.

## 17. NotebookLM research prompt

```text
You are researching ProChat QA Memory, a portable, markdown-first persistent memory system for AI-assisted software testers.

Goal:
Improve the PRODUCT-SPEC.md document without changing the product direction.

Context:
- The product is not a test runner, SaaS dashboard, CI/CD platform, or self-healing execution engine.
- The product is a persistent QA memory layer for testers working across many clients, projects, tools, teams, and environments.
- It must be AI-agnostic, tool-agnostic, environment-agnostic, portable, inspectable, editable, review-first, source-traceable, and safe.
- It must support project-specific memory and cross-project memory.

Research tasks:
1. Compare this product spec against best practices from agent-qa, QASkills, GitHub Copilot custom instructions, OWASP Agent Memory Guard, and modern AI memory/security research.
2. Identify missing product requirements that are essential but not bloated.
3. Identify product requirements that should remain explicitly out-of-scope for v0.1.
4. Recommend the leanest possible repo structure for v0.1.
5. Recommend a minimal manifest schema for memory modules, workflows, and skills.
6. Recommend safety rules for client-specific QA memory and cross-project QA memory.
7. Return a concise improvement report with: keep, add, remove, clarify, and risks.

Do not propose building a full SaaS platform, dashboard, vector database, MCP server, or test automation framework unless there is a compelling reason and a lightweight path.
```
