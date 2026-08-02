# MS0.5 Compatibility-Authoritative Exceptions — 2026-07-14

**Status:** complete — bounded register only; no legacy path was moved, rewritten, or deleted.
**Owner:** Steve Westhoek / Mind human authority
**Prerequisite:** MS0.1 authority-precedence matrix completed on 2026-07-14.

## Register

| Retained path | Bounded authority scope and owner | Why it remains | Read / write policy | Replacement and deletion prohibition |
|---|---|---|---|---|
| `wiki/organisations/prochat/brand/` | ProChat brand and product strategy; Steve / Mind human authority | Existing canonical brand index and scoped strategy corpus remain there. | Scoped authoritative read; human-only writes. | No replacement is asserted. Do not delete until a Mind authority decision, cross-repo conformance, and approved folder cleanup. |
| `wiki/organisations/prochat/playbooks/` | ProChat reusable strategic playbooks; Steve / Mind human authority | Bounded playbook/reference surface. | Scoped authoritative read; human-only writes. | No replacement is asserted. Same three deletion prerequisites. |
| `wiki/organisations/prochat/youtube/` | ProChat YouTube execution strategy and materials; Steve / Mind human authority | Canonical YouTube execution index is retained here. | Scoped authoritative read; human-only writes. | No replacement is asserted. Same three deletion prerequisites. |
| `wiki/areas/personal-identity/` | Personal identity, values, mission, and ethical/theological boundaries; Steve / Mind human authority | Durable personal context requires a bounded, human-owned surface. | Scoped authoritative read; human-only writes. | No replacement is asserted. Same three deletion prerequisites; Brain must not interpret this as runtime configuration. |
| `wiki/log.md` | Proposal/review ledger only; Mind compatibility policy | Active compatibility dependency for reviewed proposals, not durable knowledge authority. | Compatibility read; writes forbidden by current contract. | Successor is `inbox/processed/`. Do not delete until cross-repository conformance, proposal-ledger migration, and approved folder cleanup. |

## General rule

These exceptions do not make `wiki/` generally canonical. Any legacy path outside this register is compatibility-only, historical-only, generated evidence, or separately resolved by a human decision. In particular, the missing `wiki/organisations/prochat/brand/prochat-os-strategy.md` is **not** an exception: it has no existing file, and the former single-document concept was retired through MS0.2 rather than replaced.

## Verification

- Every retained path has a bounded scope, owner, reason, read/write treatment, replacement or explicit no-replacement condition, and deletion prohibition.
- No path is granted general authority merely because it is under `wiki/`.
- The register agrees with the read-only Brain path registry entries for `wiki-log`, the four scoped exceptions, and `prochat-os-strategy-missing`.

## Evidence consulted

- `system/folder-contract.md`
- `system/repo-boundaries.md`
- `wiki/organisations/prochat/brand/README.md`
- `wiki/organisations/prochat/playbooks/README.md`
- `wiki/organisations/prochat/youtube/README.md`
- `wiki/areas/personal-identity/README.md`
- Brain read-only: `operations/specs/infinite-brain-path-registry.json`
