# Context Privacy Scopes

**Status:** canonical privacy-scope guidance
**Version:** 1.0
**Last reviewed:** 2026-07-31
**Owner role:** Steve Westhoek (human authority)
**Depends on:** `system/brain-mind-bridge.md`, `system/mind-strategy.md`
**Conflict rule:** when this document conflicts with the bridge or strategy, those take precedence. When retrieval behavior conflicts with this document's scope definitions, this document takes precedence for scope boundaries.

## Purpose

Define the allowed privacy scopes for context-pack retrieval. Every context pack must declare which scopes were searched and which were excluded. These scopes control what information Brain may include when assembling orientation for an authorized agent.

## Scope definitions

### personal

**Purpose:** private life context, personal identity, relationships, health, finances, personal preferences, and non-business reflections.

**Allowed examples (synthetic):**
- personal identity and values statements
- personal relationship context
- personal health or fitness notes
- personal finance or budget notes
- private journal-style reflections

**Default exclusions:**
- business strategy and client data
- ministry-specific pastoral records
- organization financials
- credentials, tokens, API keys

**Cross-scope escalation:** if a personal note contains business-relevant decisions, the retriever may cite the decision existence without disclosing personal context. Escalation to `business` requires explicit authorization.

**Citation expectations:** cite path and freshness; never quote private content beyond what the query requires.

**Third-party privacy:** personal scope may contain information about other people. Do not include third-party private information (health, finances, relationships) in a context pack unless the query explicitly requires it and the requesting agent has personal-scope authorization.

**Secret/credential exclusion:** never include passwords, private keys, tokens, session cookies, account numbers, or PINs regardless of scope authorization.

**Fail-closed behavior:** if scope authorization is ambiguous or the retriever cannot determine whether content belongs to personal scope, exclude it and record in exclusions with reason.

---

### business

**Purpose:** business strategy, product decisions, client context, revenue, pricing, operations, go-to-market, vendor relationships, and professional work context.

**Allowed examples (synthetic):**
- product strategy documents
- pricing and packaging decisions
- client project context
- vendor evaluation notes
- business operations and workflows
- professional development and hiring context

**Default exclusions:**
- personal relationships and private reflections
- ministry pastoral records
- faith convictions (unless directly relevant to business positioning)
- credentials, tokens, API keys

**Cross-scope escalation:** business decisions that affect ministry positioning (e.g., faith-based product strategy) may cite ministry-scope context if `ministry` is also authorized. If not authorized, note the gap in unknowns.

**Citation expectations:** cite path, authority, and freshness; distinguish between current strategy and historical/superseded strategy.

**Third-party privacy:** client data, partner information, and employee context must not be disclosed beyond what the query requires. Redact names and identifiers when only the pattern or decision matters.

**Secret/credential exclusion:** never include API keys, webhook URLs with tokens, database connection strings, client secrets, or financial account numbers.

**Fail-closed behavior:** if a document mixes business and personal content and the boundary is unclear, exclude the ambiguous portions and record in exclusions.

---

### ministry

**Purpose:** faith-based ministry work, Yeshua Academy context, theological studies, Bible teaching, pastoral interactions, apologetics research, and faith community context.

**Allowed examples (synthetic):**
- Bible study notes and theological research
- ministry planning and curriculum
- apologetics arguments and evidence
- faith community relationship context
- ministry communication drafts

**Default exclusions:**
- personal non-faith reflections
- business pricing and client data
- pastoral counseling records of other individuals
- credentials and tokens

**Cross-scope escalation:** ministry work that intersects business (e.g., faith-based product positioning) may cite business-scope context if `business` is also authorized. Faith convictions that inform business strategy require both scopes.

**Citation expectations:** cite Scripture references, source texts, and study context. Distinguish personal conviction from scholarly consensus from denominational position.

**Third-party privacy:** pastoral interactions, prayer requests, and personal disclosures from ministry participants must not be included unless the query explicitly names the person and the requesting agent has ministry-scope authorization.

**Secret/credential exclusion:** never include ministry platform credentials, donor financial data, or private communications content beyond what the query requires.

**Fail-closed behavior:** when unsure whether theological content is ministry-relevant or purely personal devotion, exclude and record the gap.

---

### project:\<id\>

**Purpose:** scope retrieval to a single named project. Only content tagged, filed under, or explicitly linked to that project is included.

**Allowed examples (synthetic):**
- `project:prochat-workbench` — ProChat Workbench project context
- `project:yeshua-academy-curriculum` — Yeshua Academy curriculum project
- `project:brain-stabilization` — Brain stabilization program context

**Default exclusions:**
- other project contexts unless explicitly cross-linked
- general personal, business, or ministry content not relevant to this project
- credentials and tokens

**Cross-scope escalation:** project-scoped retrieval may surface context from `business`, `ministry`, or `personal` if those scopes are also authorized AND the content is explicitly linked to the project. Without the broader scope authorization, cite only the project-filed material.

**Citation expectations:** cite project-relative paths and creation dates. Note when a project decision supersedes a broader strategy decision.

**Third-party privacy:** project participants' personal information must not be included beyond their role in the project.

**Secret/credential exclusion:** project-specific API keys, deploy tokens, and infrastructure credentials are never included.

**Fail-closed behavior:** if a file could belong to multiple projects and the target project is ambiguous, exclude it and record in exclusions.

---

### organization:\<id\>

**Purpose:** scope retrieval to a single named organization. Only content filed under, tagged to, or explicitly linked to that organization is included.

**Allowed examples (synthetic):**
- `organization:prochat` — ProChat organizational context
- `organization:arkware` — Arkware organizational context
- `organization:yeshua-academy` — Yeshua Academy organizational context

**Default exclusions:**
- other organization contexts
- personal content not relevant to this organization
- cross-organization strategy comparisons (unless both are authorized)
- credentials and tokens

**Cross-scope escalation:** organization-scoped retrieval may surface project-scoped content if the project belongs to this organization. Broader scope authorization (business, ministry) is required to include cross-cutting strategy context.

**Citation expectations:** cite organization-relative paths. Distinguish between organization-wide decisions and project-specific decisions within the organization.

**Third-party privacy:** employee, member, or participant personal information must not be included beyond their organizational role.

**Secret/credential exclusion:** organization credentials, financial account data, and infrastructure secrets are never included.

**Fail-closed behavior:** if content could belong to multiple organizations, exclude it and record in exclusions with reason.

---

### public-safe

**Purpose:** restrict retrieval to content that is safe for public disclosure, external sharing, or inclusion in publicly visible outputs.

**Allowed examples (synthetic):**
- published blog posts and public documentation
- public product descriptions and pricing (already published)
- published theological writing
- public portfolio or professional bio

**Default exclusions:**
- all private strategy, draft content, and internal decisions
- all personal, pastoral, and relationship context
- all credentials, tokens, and infrastructure details
- unpublished pricing, roadmap, or positioning
- third-party private information regardless of category

**Cross-scope escalation:** not applicable. `public-safe` is the most restrictive scope and does not escalate. If information is needed that exceeds public-safe boundaries, the retriever must decline or return an empty pack with unknowns.

**Citation expectations:** cite only publicly available sources. Do not cite internal paths that would reveal private structure.

**Third-party privacy:** no third-party information may be included unless it is already publicly available from a verifiable public source.

**Secret/credential exclusion:** absolute. No credentials, tokens, keys, internal URLs, or infrastructure identifiers of any kind.

**Fail-closed behavior:** if there is any doubt about whether content is publicly safe, exclude it. An empty context pack with documented unknowns is correct behavior for public-safe scope.

---

## Cross-cutting rules

1. **Scope authorization is required, not inferred.** The requesting agent must declare scopes. Brain does not infer scope from the query text.

2. **Multiple scopes may be authorized.** A context pack with `authorizedScopes: ["business", "ministry"]` may include content from both, subject to each scope's exclusion rules.

3. **Least disclosure governs overlap.** When content could serve multiple scopes, include only what the query requires and prefer the narrower interpretation.

4. **Secrets are never in scope.** No scope authorization overrides the credential exclusion rule.

5. **Fail-closed means exclude and record.** Ambiguous scope membership always resolves to exclusion with a reason entry, never to inclusion by inference.

6. **privacyClassification records the result.** After assembling the pack, set `privacyClassification` to the highest sensitivity level of the included content: `public` if all content is public-safe, `internal` if any is business/project/organization-internal, `sensitive` if any is personal/pastoral/relationship content.

7. **Scope exclusion is auditable.** Every excluded source appears in the `exclusions` array. An agent cannot determine what was excluded from the pack, only what was included — but the pack itself records what it omitted for human audit.
