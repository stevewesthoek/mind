# MS0.1 Authority-Precedence Matrix — 2026-07-14

**Status:** complete — policy classification only; no runtime state was asserted or changed.
**Owner:** Steve Westhoek / Mind human authority
**Scope:** Mind documentation and policy, with Brain inspected read-only.

## Boundary rule

Mind owns human meaning, strategy, policy, and scoped domain truth. Brain owns executable schemas, validation, runtime configuration, and runtime facts. The bridge is an interface between those roles; it is not a third owner. A document or generated artifact cannot promote itself to a higher authority class.

## Precedence matrix

| Authority class | Normative owner | Precedence and evidence rule | Conflict handling / stop rule |
|---|---|---|---|
| Explicit human decision | Steve | Highest authority for human meaning and scope; must be recorded in Mind. | Stop when absent; do not infer a selection. |
| Infinite Brain philosophy | Mind human authority | Governs enduring human-first principles below an explicit decision. | Surface a conflict with a lower Mind document for human resolution. |
| Mind strategy | Mind human authority | Governs canonical cross-domain strategy below philosophy and explicit decisions. | Do not let a roadmap or implementation plan redefine it. |
| Mind roadmap | Mind planning authority | Sequences strategy; cannot alter strategy meaning. | Escalate any strategic conflict to the strategy owner. |
| Mind implementation plan | Mind planning authority | Authorizes bounded documentation work only; subordinate to policy and roadmap. | Stop work outside its stated authorization boundary. |
| Scoped Mind policy or contract | Named Mind document owner | Governs its declared concern, such as paths, task authority, or maintenance evidence. | Stop if it contradicts a higher human/strategy authority or has no bounded scope. |
| Scoped domain authority | Named Mind domain owner | Canonical only for its explicit product, brand, playbook, channel, or personal-identity scope. | Do not extend its scope to another concern without a human decision. |
| Compatibility-authoritative exception | Mind human authority | Retains bounded legacy authority only under its recorded path, scope, read/write policy, and deletion prerequisites. | Treat as compatibility-only outside the stated scope; stop if scope or replacement condition is absent. |
| Brain executable schema or validator | Brain runtime authority | Governs machine-readable contract shape and deterministic validation, not product meaning. | Do not use it to choose Mind strategy; report schema/policy conflict for cross-repo review. |
| Brain runtime configuration | Brain runtime authority | Governs executable configuration only when its state is separately evidenced. | Never infer deployed or verified state from configuration presence. |
| Repository candidate configuration | Repository owner, evidence only | Indicates a candidate/declared configuration; it is below observed and verified runtime evidence. | Label as candidate; stop before claiming runtime truth. |
| Deployed runtime state | Brain runtime authority | Governs current runtime facts only with deployment evidence. | If deployment evidence is missing, classify as unverified rather than deployed. |
| Observed state | Evidence producer; interpreted by the owning domain | Records a dated observation without becoming normative policy. | Preserve provenance and do not upgrade observation to verification. |
| Verified state | Validator/evidence producer; interpreted by the owning domain | Records the result of an explicit validation against a stated contract. | A failed or missing validation blocks the asserted conclusion. |
| Generated evidence | Generator/evidence producer | A disposable proposal, index, report, or visualization; never normative merely because it exists. | Require a higher authority to adopt any conclusion. |
| Historical material | Historical record owner | Preserved context only; cannot govern active behavior. | Label or retain as historical; do not revive as active authority. |

## Applied strategy decision

At matrix creation, `system/repo-boundaries.md` named `wiki/organisations/prochat/brand/prochat-os-strategy.md` as the sole canonical ProChat OS strategy, but that file was absent. The existing `product-strategy.md` is company/product scoped and `prochat-workbench-strategy.md` is Workbench scoped. They are not two unscoped competing authorities.

The required MS0.2 human decision has now retired the unsupported single-document claim. The scoped documents retain only their declared authority; no existing page was promoted beyond its scope.

## Verification

- Every authority class above has one normative owner, one precedence rule, and one conflict rule.
- No Mind document is treated as authoritative runtime status.
- No Brain schema, registry, or generated evidence was used to invent a human strategy decision.
- Brain was read only, including `operations/specs/infinite-brain-contract-layer-map.json` and `operations/specs/infinite-brain-path-registry.json`.

## Evidence consulted

- `system/infinite-brain-philosophy.md`
- `system/mind-strategy.md`
- `system/mind-roadmap.md`
- `system/mind-implementation-plan.md`
- `system/repo-boundaries.md`
- `system/brain-mind-bridge.md`
- Brain read-only: `operations/specs/infinite-brain-contract-layer-map.json`, `operations/specs/infinite-brain-path-registry.json`
