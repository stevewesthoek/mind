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

- `brand/` — canonical philosophy, naming, product architecture, positioning, roadmap, and market context
- `growth/` — channel and growth execution documents
- `legal/` — privacy, terms, and future licensing documents
- `playbooks/` — strategic reference playbooks and assets
- `youtube/` — ProChat YouTube channel system

## Recommended reading order

Start here:

1. `brand/README.md` — canonical brand index
2. `brand/product-naming-architecture.md` — company, product, and edition naming
3. `brand/product-strategy.md` — philosophy, product boundary, QA focus, and business stage
4. `brand/product-architecture.md` — relationship between Memory and Workbench
5. `brand/prochat-memory-technical-definition.md` — local Markdown-first memory architecture
6. `brand/product-roadmap.md` — beta and product-development sequence
7. `brand/future-capabilities.md` — capabilities that are explicitly not current products
8. `brand/company-overview.md` — concise company overview
9. `brand/category-definition.md` — product categories and differentiation
10. `brand/narrative.md` — company story and belief system
11. `brand/brand-ruleset.md` — approved public language

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
2. `wiki/organisations/prochat/legal/` controls approved legal-policy direction and records unresolved legal decisions.
3. `wiki/organisations/prochat/growth/` and `wiki/organisations/prochat/youtube/` control their respective execution systems.
4. The subordinate product repository controls verified implementation facts for that product.
5. A material implementation fact that contradicts Mind must be reported and reconciled; it must not silently replace canonical strategy.

Subordinate repositories must link back to this authority and clearly label repository-local philosophy, strategy, roadmap, and licensing documents as implementation guidance or proposals where applicable.

## Rule

- brand truth lives in `brand/`;
- legal reference lives in `legal/`;
- execution guidance lives in `growth/`, `playbooks/`, and `youtube/`;
- future capabilities must not be presented as current products;
- do not duplicate ProChat strategy in ad-hoc root files.
