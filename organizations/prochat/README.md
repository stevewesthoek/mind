# ProChat

Canonical ProChat organization context.

## Company and products

```text
ProChat
├── ProChat Memory
│   └── ProChat Memory for QA
└── ProChat Workbench
```

ProChat currently has exactly two products.

## Structure

- `growth/` — channel and growth execution documents
- `legal/` — privacy, terms, and future licensing documents
- `wiki/organisations/prochat/brand/` — canonical philosophy, naming, product architecture, positioning, roadmap, and market context
- `wiki/organisations/prochat/playbooks/` — strategic reference playbooks and assets
- `wiki/organisations/prochat/youtube/` — ProChat YouTube channel system

## Recommended reading order

Start here:

1. `wiki/organisations/prochat/brand/README.md` — canonical brand index
2. `wiki/organisations/prochat/brand/product-naming-architecture.md` — company, product, and edition naming
3. `wiki/organisations/prochat/brand/product-strategy.md` — philosophy, product boundary, QA focus, and business stage
4. `wiki/organisations/prochat/brand/product-architecture.md` — relationship between Memory and Workbench
5. `wiki/organisations/prochat/brand/prochat-workbench-strategy.md` — canonical Workbench strategy, autonomy, Codex, MCP, and capability direction
6. `wiki/organisations/prochat/brand/prochat-memory-technical-definition.md` — local Markdown-first memory architecture
7. `wiki/organisations/prochat/brand/product-roadmap.md` — beta and product-development sequence
8. `wiki/organisations/prochat/brand/future-capabilities.md` — capabilities that are explicitly not current products
9. `wiki/organisations/prochat/brand/company-overview.md` — concise company overview
10. `wiki/organisations/prochat/brand/category-definition.md` — product categories and differentiation
11. `wiki/organisations/prochat/brand/narrative.md` — company story and belief system
12. `wiki/organisations/prochat/brand/brand-ruleset.md` — approved public language

## Current strategy

ProChat is memory-first, local-first, Markdown-first, Git-versioned, review-first, and pre-revenue.

ProChat Memory is the flagship product. ProChat Memory for QA is its first discipline-specific edition.

ProChat Workbench is a ChatGPT-first local builder workbench.

## Repository authority and precedence

This `mind` repository is the authoritative source for ProChat company philosophy, brand, naming, product hierarchy, positioning, growth policy, legal-policy direction, and cross-product roadmap.

The product repositories are subordinate implementation sources:

```text
prochattools-prochat-memory
prochattools-prochat-workbench
```

They define current product behavior, code, technical architecture, release mechanics, and repository-specific operating instructions. They must not independently redefine ProChat philosophy, product count, naming, market position, business stage, licensing policy, or company-level roadmap.

When documents conflict:

1. `wiki/organisations/prochat/brand/` controls company philosophy, naming, product hierarchy, positioning, and strategy.
2. `organizations/prochat/legal/` controls approved legal-policy direction and records unresolved legal decisions.
3. `organizations/prochat/growth/` and `wiki/organisations/prochat/youtube/` control their respective execution systems.
4. The subordinate product repository controls verified implementation facts for that product.
5. A material implementation fact that contradicts Mind must be reported and reconciled; it must not silently replace canonical strategy.

Subordinate repositories must link back to this authority and clearly label repository-local philosophy, strategy, roadmap, and licensing documents as implementation guidance or proposals where applicable.

## Rule

- brand truth lives in `wiki/organisations/prochat/brand/`;
- legal reference lives in `legal/`;
- execution guidance lives in `growth/`, `wiki/organisations/prochat/playbooks/`, and `wiki/organisations/prochat/youtube/`;
- future capabilities must not be presented as current products;
- do not duplicate ProChat strategy in ad-hoc root files.
