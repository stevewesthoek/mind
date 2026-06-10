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

## 18. NotebookLM Research Report: ProChat QA Memory v0.1 Improvement & Implementation

This section contains research findings from NotebookLM analysis of the product spec against best practices from agent-qa, QASkills, GitHub Copilot custom instructions, OWASP Agent Memory Guard, and modern AI memory/security research.

### 18.1 Keep (From Current Spec)

The following foundational elements are well-defined and should remain the core of the product:

- **Product Principles:** The "Review-first," "Portable," and "AI-agnostic" principles are critical for the primary buyer (freelance testers and QA agencies) who work across disparate environments.
- **Agnosticism:** Remaining tool-agnostic (Playwright, Cypress, etc.) and environment-agnostic ensures the memory layer is not tied to a specific CI/CD pipeline or test runner.
- **Markdown-First Architecture:** Using standard file types (Memory, Workflow, Skill) as the source of truth maintains portability and inspectability.
- **Safety Constraints:** The prohibition of storing secrets, tokens, or unreviewed AI summaries in persistent memory is a necessary security baseline.

### 18.2 Add (Missing Requirements)

To make v0.1 viable, the following requirements must be added to provide structure to the "memory layer":

- **Manifest Schema Completeness:** Every module (Skill, Workflow, or Memory bundle) requires a unique identifier, version string, and explicit dependency list to prevent desync during updates.
- **Workflow Processing Rules:** Define a standard "Processing Logic" for how a raw log or note becomes a "draft" vs. "trusted" memory. This includes a mandatory "Sanitization Step" before any data is moved to the portable layer.
- **Memory Promotion Validation:** A checklist or "Safety Gate" must be defined to ensure that generalizable lessons are stripped of client-specific selectors, IPs, or naming conventions before promotion.
- **Audit Trail Requirements:** Use Git commit history as the primary audit trail, but include a `last_reviewed_by` and `source_reference` field within the Markdown metadata of memory files.
- **Version Control Integration:** Clear guidance on using Git branches for "Draft" memory vs. `main` for "Trusted" memory.

### 18.3 Remove or Defer (Out-of-Scope)

The following should be explicitly deferred to v0.2+ to maintain a "lean" v0.1:

- **Automated Ingestion:** Any "automatic" syncing from Jira, GitHub Issues, or CI logs should be deferred. v0.1 should focus on manual, human-reviewed entry.
- **Complex CLI/GUI:** While a CLI is mentioned as out-of-scope, even basic "installers" should be deferred in favor of simple Git cloning.
- **Real-time Multi-user Syncing:** Rely entirely on Git for collision resolution and synchronization.

### 18.4 Clarify (Ambiguous Points)

The spec requires specificity in these areas before development:

- **Memory Separation vs. Combination:** The current spec lists these as headers but lacks the actual logic rules. Specify how an AI assistant should be instructed to "look" in both the local client folder and the global product folder simultaneously.
- **"Tester/Company-Approved Workspace":** Clarify the directory relationship. Does the product repo live *inside* the client workspace, or is the client workspace an external path referenced by the AI?
- **The Promotion Path:** Define the exact "file move" or "content copy" steps required to move a lesson from a `raw-notes.md` to a `known-failures.md`.

### 18.5 Risks (Critical Gaps)

If not addressed in v0.1, these gaps could compromise the product:

- **Memory Poisoning/Hallucination:** If "Review-first" is not strictly enforced via the manifest/workflow, AI-generated "false lessons" could pollute the persistent memory.
- **Privacy Leaks:** Without a mandatory "Sanitization" rule for cross-project promotion, testers may accidentally leak one client's infrastructure details to another.
- **Context Fragmentation:** If there is no standard for how memory files are organized, the AI may fail to find relevant "lessons" when needed.

### 18.6 Lean Repo Structure for v0.1

The absolute minimum structure to support the spec's core file types:

```text
prochat-qa-memory/
├── core/                   # Core principles and safety guides
│   ├── safety-rules.md
│   └── promotion-guide.md
├── skills/                 # Task-specific AI instructions (.SKILL.md)
│   ├── analyze-failure.md
│   └── sanitize-lesson.md
├── workflows/              # Process descriptions
│   ├── triage-workflow.md
│   └── memory-update-workflow.md
├── templates/              # Blank structures for new memory files
│   ├── known-failure-template.md
│   └── manifest-template.yaml
└── examples/               # Demo content for public repo
    └── webshop-demo/
```

### 18.7 Minimal Manifest Schema

A minimal `manifest.yaml` is required to make the system "inspectable and versioned".

**Core Fields:**

```yaml
id: unique-slug-identifier
name: Display Name
version: 1.0.0
type: memory|workflow|skill
scope: global|local
author: Author Name
last_reviewed: 2024-05-20
description: Brief summary for AI context
```

**Example Manifest:**

```yaml
id: playwright-selector-strategy
name: Playwright Selector Strategy
version: 1.0.0
type: memory
scope: global
author: "Steve Westhoek"
last_reviewed: 2024-05-20
description: "Validated selector patterns for resilient Playwright tests across common web frameworks."
```

### 18.8 Safety Rules Summary

Consolidated critical rules for memory separation and promotion:

1. **Isolation:** Client-specific data (IDs, PII, internal URLs) must never be committed to the `global` (portable) memory directory. Enforced by `.gitignore` and pre-merge review.

2. **Sanitization:** All lessons promoted to `global` memory must be generalized. Example: change "Login failed on staging-01.client.com" to "Login timeout patterns on high-latency environments".

3. **Human Sign-off:** No AI-generated content can move from a `.raw` or `.draft` status to a `.trusted` status without a human-in-the-loop review. This is the primary review-first gate.

4. **No Secrets:** A `.gitignore` must be pre-configured to block common sensitive file extensions and specific patterns (e.g., `.env`, `*confidential*`, `*.key`).

### 18.9 Implementation Recommendations

Based on this research, the following are recommended first steps for v0.1 development:

1. **Finalize Manifest Schema:** Adopt the minimal manifest schema (Section 18.7) and document it in `core/manifest-spec.md`.

2. **Document Promotion Flow:** Create `core/promotion-guide.md` with step-by-step rules for sanitization and human sign-off before cross-project promotion.

3. **Create Template Pack:** Build the templates in `templates/` directory to make first-use onboarding fast and consistent.

4. **Write AI Instructions:** Develop `core/ai-instructions.md` that explains to AI assistants exactly how to use and update memory files while respecting safety boundaries.

5. **Set Up Safety Tooling:** Pre-configure `.gitignore` and create a `scripts/validate-safety.sh` hook to catch common mistakes before commit.

### 18.10 Key Uncertainties Remaining

- **Workspace Integration:** Need clarity on how external workspaces reference and compose the product repo's memory with their own client-specific memory.
- **AI Context Window Management:** How should large memory collections be chunked for AI assistants when they have limited context?
- **Conflict Resolution:** Need decision rules when the same lesson appears in both project and cross-project memory—which takes precedence?

---

**Research Date:** 2026-06-10  
**Research Method:** NotebookLM analysis of product spec against industry best practices  
**Next Steps:** Incorporate findings into core documentation, templates, and AI instructions before v0.1 alpha release
