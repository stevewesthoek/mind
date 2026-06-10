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

ProChat QA Memory must support multiple scopes from the beginning, but v0.1 should keep the user-facing scope model simple.

### v0.1 primary scopes

```text
personal memory
client/project memory
cross-project memory
company-approved memory
```

| Scope | Purpose |
|---|---|
| Personal memory | The tester's own reusable heuristics, prompts, habits, lessons, and mistakes to avoid. |
| Client/project memory | Client-specific and project-specific context, tools, risks, rules, environments, failures, and lessons. |
| Cross-project memory | Generalized lessons that are safe and useful across clients without leaking confidential details. |
| Company-approved memory | Patterns approved by the testing company for all licensed testers. |

### v0.2+ sub-scopes

The full long-term model can still support more precise scopes, but they should not create folder fatigue in v0.1.

```text
department/team memory
test-suite memory
test-case memory
```

In v0.1, suite-level and test-case-level details can live as headings, tags, or sections inside client/project memory. They can become separate folders later if real use proves the need.

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

Recommended standard relationship:

```text
qa-memory-system/
  prochat-qa-memory/      # licensed product repo: core method, templates, skills, workflows
  qa-workspaces/          # user-controlled local/company workspace
    client-a/
    client-b/
    cross-project/
```

The product repo and workspace should be siblings under one parent folder. This makes relative-path examples predictable while keeping private client memory out of the licensed product repo.

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

Hard-coded v0.1 minimum fields:

```yaml
---
id: unique-slug
scope: personal|client-project|cross-project|company-approved
status: raw|draft|reviewed|trusted|deprecated
created: YYYY-MM-DD
source_ref: sanitized-source-or-origin
---
```

These fields are intentionally minimal. Git history can track authorship and version history in v0.1.

Optional fields for product repo files, mature shared memory, workflows, and skills:

```yaml
name: Human-readable name
type: memory|workflow|skill
version: 0.1.0
owner: owner-name
last_reviewed: YYYY-MM-DD
review_required: true
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

`source_ref` must be sanitized when memory is promoted to cross-project or company-approved memory. Do not place private Jira links, PR URLs, internal hostnames, client names, or ticket IDs in portable metadata.

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

Two NotebookLM passes have now been processed into this product spec.

Integrated from the latest pass:

- v0.1 scope consolidation to four primary scopes
- clear sibling relationship between licensed product repo and private workspaces
- hard-coded minimum frontmatter fields
- metadata sanitization for `source_ref`
- raw input sandboxing concept
- stronger commercial hook for freelance testers and QA agencies

Rejected or deferred:

- automated promotion
- complex CLI/GUI for v0.1
- automated ingestion
- real-time multi-user syncing
- heavy validation scripts in v0.1
- separate suite and test-case folders before real usage proves the need
- broad specialized testing packs before the failure-memory loop is validated

## 20. Product readiness verdict

This product specification is ready to support v0.1 implementation planning.

No further broad NotebookLM research is recommended before building the first repo skeleton and demo. The next useful research should be based on pilot feedback or a concrete blocked implementation decision.