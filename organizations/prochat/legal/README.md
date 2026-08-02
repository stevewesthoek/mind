# ProChat Legal

**Status:** internal legal-policy draft  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-02  
**Publication status:** requires factual verification and qualified Portuguese/EU legal review

## Purpose

This folder contains the current internal legal and licensing drafts for ProChat.

These documents align legal language with the current product strategy. They do not replace advice from qualified legal counsel and must not be published as final terms until the factual and legal review items are complete.

## Current company and product stage

ProChat is pre-revenue.

ProChat currently has exactly two products:

```text
ProChat Memory
└── current edition: ProChat Memory for QA

ProChat Workbench
```

ProChat Memory for QA is the current selected beta focus.

## Current beta position

The current intended beta position is:

- access is free;
- the feedback cohort is manually selected;
- the beta has no fixed end date;
- the product is distributed through a sanitized public repository;
- approved testers may evaluate it in authorized company or client work;
- customer and client project memory remains local;
- ProChat does not host customer project memory;
- human review and current evidence remain required;
- the source is visible for evaluation;
- the product is not currently described as open source;
- final commercial licensing has not been settled.

## Files

- `privacy.md` — draft beta-stage privacy notice and local-data boundary
- `terms.md` — draft Beta and Evaluation Terms

## Current legal documents

The current legal scope covers:

- beta applications and selected participation;
- local product data and project memory;
- information deliberately sent through support or feedback;
- GitHub and repository interactions;
- authorized company and client evaluation;
- source-visible evaluation access;
- human-review and backup responsibilities;
- redistribution, resale, sublicensing, and hosted-resale restrictions;
- beta-stage warranty, availability, support, and liability boundaries.

## Deferred commercial documents

The following documents and decisions remain deferred until monetization and product evidence justify them:

- individual commercial license;
- organization, team, or tester-seat license;
- paid-product consumer terms;
- business-to-business purchasing terms;
- refund and withdrawal process;
- support and update policy;
- service-level commitments;
- paid repository or account-access terms;
- payment and tax-processing disclosures.

## Source and licensing boundary

The beta may be source-visible for evaluation without being open source.

Final license terminology and permissions must be selected deliberately. Until then, growth, product, and repository documentation must not promise:

- open-source status, except for the product-specific ProChat Workbench Local public snapshot exception recorded below;
- perpetual commercial rights;
- lifetime updates;
- transferable access;
- organization-wide use;
- redistribution or sublicensing rights beyond the Workbench Local public snapshot license and any separate written commercial/OEM agreement.

## ProChat Workbench Local public release exception

ProChat Workbench Local has a product-specific public prerelease and licensing exception.

The exception records the current implementation fact that:

- the generated public Workbench Local snapshot is licensed under GNU Affero General Public License v3.0 only (`AGPL-3.0-only`);
- the public release applies only to ProChat Workbench Local files included in that generated public snapshot;
- separate commercial or OEM licensing may be requested from ProChat;
- public documentation does not grant a commercial or OEM license;
- commercial rights require a separate written agreement;
- managed services, private modules, customer operations, internal commercial material, and private Workbench infrastructure remain outside the public snapshot.

This exception does not apply to ProChat Memory, ProChat Memory for QA, future Memory editions, future ProChat products, managed services, private modules, customer operations, or internal commercial systems.

Broader legal terms, paid agreements, support commitments, managed services, commercial warranties, contributor terms, trademark permissions, and future product licensing still require deliberate owner approval and qualified legal review before public promotion.

## Factual verification required before publication

Before publishing the privacy notice or terms, verify:

- controller identity and required business disclosures;
- current contact details;
- actual website, analytics, cookie, email, hosting, repository, and support providers;
- whether beta applications are collected and where they are stored;
- whether GitHub account data is collected directly by ProChat;
- retention periods;
- international transfers;
- repository acceptance mechanism;
- supported third-party AI services;
- the intended governing-law and dispute language.

Do not name a processor or service provider in a public legal notice unless its use and data flow have been confirmed.

## Document authority

Canonical product strategy remains in:

```text
wiki/organisations/prochat/brand/
```

Growth execution remains in:

```text
organizations/prochat/growth/
```

Brand and growth documents do not create legal permissions or commercial license rights. Published legal terms must be consistent with the canonical strategy, but legal terms control the permissions they expressly grant.

## Review rule

Any material change to product hosting, payments, accounts, analytics, cookies, AI-provider integration, repository access, commercial licensing, team use, or support commitments requires a legal-document review before the change is promoted publicly.




## Verified public repository and licensing authority — 2026-07-19

This section records factual public-release evidence verified against the current public repositories and reconciles earlier provisional language.

### Canonical public repositories

| Product | Canonical public repository | Visibility | Current public status |
|---|---|---|---|
| ProChat Memory | No separate general-product repository is currently approved | n/a | The general flagship is represented publicly through its QA edition |
| ProChat Memory for QA | `https://github.com/prochattools/memory-qa` | Public | Source-available public evaluation snapshot; selected beta |
| ProChat Workbench | `https://github.com/prochattools/workbench` | Public | Free, self-hosted, local-first public prerelease |

ProChat Memory and ProChat Memory for QA are not separate current repositories. The QA repository is the current public implementation of the first Memory edition.

### ProChat Memory for QA

Current classification:

```yaml
repository_status: CONFIRMED_CURRENT
release_status: CONFIRMED_CURRENT_SELECTED_BETA
license_status: CONFIRMED_CURRENT_CUSTOM_EVALUATION_LICENSE
open_source_status: NOT_CURRENTLY_OFFERED
free_status: CONFIRMED_CURRENT_FOR_SELECTED_BETA
commercial_use: NOT_CURRENTLY_OFFERED_WITHOUT_WRITTEN_AGREEMENT
code_contributions: NOT_CURRENTLY_ACCEPTED
issues_and_discussions: CONFIRMED_CURRENT_FEEDBACK_CHANNELS
```

Approved public facts:

- the repository is public and may be viewed or starred;
- the public snapshot is source-available, not open source;
- only approved beta testers or evaluators receive permission to use the software;
- approved evaluators may clone or download the designated snapshot, install dependencies, build it, run it locally, and make local evaluation modifications;
- public production use, resale, redistribution, sublicensing, hosted resale, commercial embedding, and paid third-party service use are not permitted without separate written permission;
- GitHub Issues and Discussions are the current public feedback channels;
- code contributions and source-code pull requests are not accepted during the current beta;
- security reports must use the repository's private security-reporting path, not a public issue or discussion;
- the beta is free for approved participants and has no fixed end date, but this does not promise permanent availability, support, updates, or future free licensing.

Approved wording:

```text
Public source-available QA beta.
Free for approved beta testers.
View the repository.
Star the repository.
Apply for the selected beta.
Report sanitized feedback through GitHub Issues or Discussions.
```

Prohibited wording:

```text
Open source.
Free forever.
Free for unrestricted use.
Download and use without approval.
Commercial use included.
Contributions welcome.
Submit a pull request.
Production ready.
```

### ProChat Workbench

Current classification:

```yaml
repository_status: CONFIRMED_CURRENT
release_status: CONFIRMED_CURRENT_PUBLIC_PRERELEASE
license_status: CONFIRMED_CURRENT_AGPL_3_0_ONLY
open_source_status: CONFIRMED_CURRENT
free_status: CONFIRMED_CURRENT
self_hosted_status: CONFIRMED_CURRENT
commercial_or_oem_license: CONFIRMED_CURRENT_SEPARATE_REQUEST_PATH
issues_and_discussions: CONFIRMED_CURRENT
external_pull_requests: DISCUSSION_ALLOWED_MERGE_BLOCKED_PENDING_CONTRIBUTOR_TERMS
```

Approved public facts:

- the repository is public;
- the generated public snapshot is licensed under `AGPL-3.0-only`;
- Workbench is free, self-hosted, and local-first;
- people may view, star, fork, clone, and use the public repository subject to the AGPL and repository notices;
- Issues, Discussions, bug reports, design feedback, and contribution proposals are accepted;
- external code or documentation pull requests may be discussed and reviewed;
- external pull requests must not be merged until the approved contributor-rights workflow is enabled and completed;
- separate commercial or OEM licensing may be requested, but public documentation does not grant those rights;
- security reports must use the repository's private reporting channel;
- security-policy response times are not guaranteed.

Approved wording:

```text
Free and open source under AGPL-3.0-only.
Self-host ProChat Workbench locally.
View, star, fork, or clone the repository.
Open an issue or join a discussion.
Propose a contribution; merge requires the contributor-rights process.
Contact ProChat about separate commercial or OEM licensing.
```

Prohibited wording:

```text
MIT licensed.
Permissively licensed.
Commercial or OEM rights included.
Pull requests will be merged without contributor terms.
Guaranteed support or response times.
Managed service included.
Unlimited compatibility or availability.
```

## Public participation boundary

The products require different participation language.

| Action | Memory for QA | Workbench |
|---|---|---|
| View repository | Approved | Approved |
| Star repository | Approved | Approved |
| Fork repository | Do not promote as an evaluation right | Approved under repository license |
| Clone/install | Approved beta participants only | Approved under AGPL and repository instructions |
| Open issue | Approved for sanitized feedback | Approved |
| Join discussion | Approved | Approved |
| Submit code pull request | Not accepted in current beta | May be proposed; merge blocked pending contributor terms |
| Production use | Not permitted without written agreement | Governed by AGPL and repository scope; separate commercial/OEM rights are not included |
| Commercial use | Separate written agreement required | AGPL use remains subject to its terms; separate commercial/OEM licensing may be requested |

## Support authority

Current approved support language:

- beta and community support are limited and discretionary;
- security reports are investigated through private repository channels;
- documentation and support channels may change;
- no response time, service level, uptime, maintenance period, or compatibility promise is approved;
- Workbench security fixes target the current public beta release and current public `main` branch;
- Memory for QA supports only versions explicitly designated in its beta documentation.

## Managed implementation authority

No general managed-implementation offer is currently approved for homepage promotion.

Current classification:

```yaml
assessment: OWNER_DECISION_REQUIRED
deployment: OWNER_DECISION_REQUIRED
customization: OWNER_DECISION_REQUIRED
integration: OWNER_DECISION_REQUIRED
migration: OWNER_DECISION_REQUIRED
training: OWNER_DECISION_REQUIRED
governance: OWNER_DECISION_REQUIRED
maintenance: OWNER_DECISION_REQUIRED
support: OWNER_DECISION_REQUIRED
```

Repository references to managed services, private modules, customer deployments, or separate commercial agreements establish legal boundaries only. They do not prove that a standardized managed-service offer is currently available.

Until the owner approves an offer definition, the website may use only a neutral contact path for partnership or commercial-licensing questions. It must not advertise a managed implementation package.

## Analytics authority

No website analytics implementation or measurement policy is currently verified as active.

Current classification:

```yaml
repository_outbound_clicks: OWNER_DECISION_REQUIRED
documentation_starts: OWNER_DECISION_REQUIRED
installation_intent: OWNER_DECISION_REQUIRED
confirmed_stars_or_installs: NOT_MEASURABLE_FROM_SITE_CLICK_ALONE
fingerprinting: NOT_APPROVED
memory_content_analytics: PROHIBITED
```

Before implementation, the owner must approve a privacy-preserving analytics approach and reconcile it with the published privacy notice and actual provider configuration.

## Remaining owner decisions

1. Whether ProChat Memory receives a future general repository separate from the QA edition.
2. The final Memory licensing model after beta validation.
3. Whether and when Memory code contributions will be accepted.
4. The contributor-rights acceptance workflow for Workbench pull-request merges.
5. Any standardized managed implementation, training, deployment, integration, maintenance, or support offer.
6. Public support expectations beyond current repository policies.
7. Privacy-preserving website analytics and consent requirements.
8. Future commercial, team, organization, or OEM packaging beyond the current Workbench exception.
