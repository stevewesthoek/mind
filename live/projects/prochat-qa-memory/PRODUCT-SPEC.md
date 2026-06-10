# ProChat QA Memory — Product Spec

**Status:** refined v0.1 product spec  
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

## 3. Product thesis

Most testers already have tools.

They may use Playwright, Robot Framework, Cypress, Selenium, Postman, k6, JMeter, GitHub Actions, GitLab CI, Azure DevOps, Jira, TestRail, ChatGPT, Claude, GitHub Copilot, Cursor, or other tools.

The gap is not another tool.

The gap is persistent, portable, reviewed QA memory that survives projects, clients, tools, teams, chats, tickets, and pipeline runs.

## 4. Primary buyer

Best first buyers:

- freelance software testers
- software testing companies
- QA consultancies
- test automation agencies
- SDET staffing companies
- companies with testers placed at external clients

These buyers need portability because testers often work across multiple clients, departments, teams, tools, and environments.

## 5. Primary user

The primary user is an AI-assisted software tester or test automation engineer who may work across:

- multiple clients
- multiple departments inside one client
- multiple test environments
- multiple teams
- multiple frameworks
- multiple AI assistants
- multiple project lifecycles

The product must support both strict memory separation and safe cross-project reuse.

## 6. Product principles

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

## 7. Memory scopes

ProChat QA Memory must support multiple scopes from the beginning.

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

### Scope meanings

| Scope | Purpose |
|---|---|
| Personal tester memory | The tester's own reusable heuristics, prompts, habits, lessons, and mistakes to avoid. |
| Client memory | Approved context that applies across multiple projects inside one client organization. |
| Project memory | Context, tools, risks, rules, environments, and lessons for one project. |
| Department/team memory | Rules that apply to one team or department, not necessarily the whole client. |
| Test-suite memory | Patterns for a smoke, regression, API, performance, mobile, or accessibility suite. |
| Test-case memory | Recurring behavior or known issues for a specific test or scenario. |
| Cross-project QA memory | Generalized lessons that are safe and useful across clients. |
| Company/team-approved memory | Patterns approved by the testing company for all licensed testers. |

## 8. Memory separation and combination rules

### Separation rule

```text
Client-specific knowledge stays scoped to that client or project.
Generalized lessons may be promoted to cross-project memory only after confidential details are removed.
```

### Combination rule

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

### Precedence rule

When memory conflicts:

```text
current evidence > project/test-case memory > test-suite memory > client/team memory > cross-project memory > personal heuristic
```

Stored memory can suggest what is likely. Current logs, screenshots, traces, source code, test output, and human review decide what is true now.

## 9. Product repo model

ProChat maintains one private licensed product repo.

Suggested repo name:

```text
prochat-qa-memory
```

Customers license access per tester or company. Testers clone the product repo or use a company mirror.

Client-specific memory should live outside the product repo in a tester/company-approved workspace.

Recommended relationship:

```text
prochat-qa-memory/        # licensed product repo: core method, templates, skills, workflows
qa-workspaces/            # user-controlled local/company workspace
  client-a/
  client-b/
  cross-project/
```

The product repo provides the method. The workspace contains private working memory.

## 10. v0.1 product repo structure

```text
prochat-qa-memory/
  README.md
  QUICKSTART.md
  LICENSE.md
  CHANGELOG.md

  .github/
    copilot-instructions.md

  core/
    principles.md
    safety-rules.md
    promotion-guide.md
    manifest-schema.yaml
    git-workflow.md

  core/ai-instructions/
    generic-ai-assistant.md
    chatgpt.md
    claude.md
    github-copilot.md

  skills/
    analyze-failure.SKILL.md
    sanitize-lesson.SKILL.md
    draft-memory-update.SKILL.md

  workflows/
    triage-to-lesson.md

  templates/
    workspace-readme-template.md
    client-memory-template.md
    project-memory-template.md
    known-failure-template.md
    flaky-test-template.md
    manifest-template.yaml

  memory/
    general-qa-lessons.md
    generic-failure-patterns.md
    testing-heuristics.md

  demo/
    README.md
    walkthrough.md
    login-selector-failure/
```

This is intentionally smaller than the earlier structure. More packs can be added after the first pilot proves value.

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

v0.1 contains one primary workflow:

```text
failed test → reviewed lesson
```

### Skill files

Skill files are reusable AI instructions for one task.

v0.1 contains three skills:

- `analyze-failure.SKILL.md`
- `sanitize-lesson.SKILL.md`
- `draft-memory-update.SKILL.md`

### Manifest files

Manifest files keep modules inspectable, versioned, and standard.

## 12. Metadata and manifest standard

All v0.1 memory, workflow, and skill files should use lightweight YAML frontmatter.

Minimum fields:

```yaml
---
id: unique-slug
name: Human-readable name
type: memory|workflow|skill
version: 0.1.0
scope: product|personal|client|project|suite|test|cross-project|team-approved
status: draft|reviewed|trusted|deprecated
owner: owner-name
last_reviewed: YYYY-MM-DD
source_reference: source or origin
review_required: true
---
```

Optional fields:

```yaml
dependencies:
  - related-memory-or-skill-id
supported_frameworks:
  - playwright
  - robot-framework
supported_agents:
  - chatgpt
  - claude
  - github-copilot
inputs:
  - failed-test-log
outputs:
  - reviewed-memory-update
```

## 13. Memory states

ProChat QA Memory should distinguish between raw, draft, reviewed, trusted, and deprecated content.

| State | Meaning |
|---|---|
| Raw | Unprocessed input such as logs, notes, screenshots, or tickets. |
| Draft | AI-assisted or human draft not yet trusted. |
| Reviewed | Human-reviewed and corrected. |
| Trusted | Approved for repeated use in the relevant scope. |
| Deprecated | Kept for history, but no longer used as active guidance. |

No AI-generated content becomes trusted memory without human review.

## 14. Memory promotion path

```text
raw input
→ inbox note
→ AI draft summary
→ tester review
→ sanitized lesson
→ scoped memory
→ team-approved or cross-project memory where appropriate
```

Manual v0.1 procedure:

1. Save the raw or summarized issue in the local workspace inbox.
2. Run the `triage-to-lesson` workflow with relevant memory context.
3. Draft a lesson using the AI assistant.
4. Review and correct the lesson manually.
5. Sanitize any client-specific details.
6. Save the lesson to the right scoped memory file.
7. Promote only generalized lessons into cross-project memory.
8. Commit the reviewed change where Git is used.

## 15. Safety rules

Persistent memory is powerful, so it must be protected.

Rules:

- Do not store secrets, tokens, passwords, private customer data, or confidential logs in portable cross-project memory.
- Treat external logs, tickets, screenshots, and documents as untrusted until reviewed.
- Do not allow AI-generated summaries to become trusted memory without human approval.
- Preserve source references where possible.
- Prefer sanitized generalized lessons for cross-project memory.
- Keep client-specific memory separated.
- Use `.gitignore` to exclude obvious sensitive files such as `.env`, keys, raw confidential logs, and local-only client artifacts.

Sanitization examples:

| Unsafe client-specific detail | Safer generalized lesson |
|---|---|
| `staging-01.clientname.com` | staging environment |
| internal IP address | internal service endpoint |
| customer email | test user |
| exact private selector with client naming | project-specific selector pattern |
| client project name | client project |

## 16. Out-of-scope for v0.1

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
- automatic memory deduplication
- multi-tenant workspace manager

These can be considered later only if they strengthen the memory layer and pilot evidence proves the need.

## 17. v0.2+ roadmap candidates

Potential later additions:

- CLI for manifest creation and validation
- GitHub Action for manifest/safety checks
- optional local search or indexing
- optional workspace manager for many clients
- optional templates for API, performance, accessibility, and mobile testing
- optional memory deduplication workflow
- optional CI integration patterns

## 18. Paid vs demo product

### Public demo repo

Should contain:

- fake webshop example
- one login selector failure
- one basic failed-test workflow
- one skill template
- one before/after AI example
- one reviewed memory update

### Paid repo

Should contain:

- full memory model
- workspace templates
- workflow and skill files
- AI assistant instructions
- safety guidance
- promotion guide
- training material
- commercial rollout guide
- future update packs

## 19. Research assessment

NotebookLM research was useful and sufficient for v0.1 product specification.

Integrated:

- frontmatter/manifest discipline
- draft vs trusted memory states
- memory promotion validation
- audit/source metadata
- Git as primary audit trail
- explicit product repo vs workspace separation
- conflict/precedence rules
- memory safety and sanitization
- v0.1 vs v0.2 boundaries

Rejected or deferred:

- complex CLI/GUI for v0.1
- automated ingestion
- real-time multi-user syncing
- heavy validation scripts in v0.1
- broad specialized testing packs before the failure-memory loop is validated

## 20. Follow-up NotebookLM prompt

```text
You are reviewing the refined PRODUCT-SPEC.md for ProChat QA Memory.

Goal:
Stress-test the product specification for clarity, safety, commercial viability, and v0.1 implementability without changing the product direction.

Product direction:
- ProChat QA Memory is a portable, markdown-first persistent QA memory system.
- It is not a test runner, SaaS dashboard, CI/CD platform, AI agent harness, vector database, or self-healing execution engine.
- It is designed for freelance testers, QA consultancies, and testing companies whose testers work across many external client environments.
- It must support personal, client, project, suite, test-case, cross-project, and team-approved memory scopes.
- It must be review-first, source-traceable, safe, AI-agnostic, tool-agnostic, and environment-agnostic.

Review tasks:
1. Identify any remaining ambiguity in the product repo vs external workspace model.
2. Identify any missing v0.1 requirements that are essential for safe use.
3. Identify anything that still feels like feature bloat and should move to v0.2+.
4. Review the metadata/frontmatter schema and recommend only essential changes.
5. Review the memory scope and precedence rules for tester usability.
6. Review the safety and sanitization rules for client confidentiality and memory poisoning risk.
7. Recommend the clearest commercial explanation of what the buyer is paying for.

Output format:
- Ready to keep
- Must clarify before build
- Move to roadmap
- Safety concerns
- Suggested wording improvements
- Final v0.1 readiness verdict
```
