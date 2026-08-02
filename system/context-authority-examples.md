# Context Authority Examples

**Status:** canonical authority-resolution examples
**Version:** 1.0
**Last reviewed:** 2026-07-31
**Owner role:** Steve Westhoek (human authority)
**Depends on:** `system/brain-mind-bridge.md`, `system/context-privacy-scopes.md`
**Conflict rule:** when real authority decisions conflict with these synthetic examples, real decisions take precedence. These examples illustrate resolution patterns, not specific conclusions.

## Purpose

Provide ten synthetic examples that demonstrate how the Context Gateway should resolve authority, freshness, privacy, and conflict situations. All names, dates, strategies, and beliefs in these examples are synthetic illustrations — they do not represent actual decisions, disputes, or personal facts.

---

## Example 1 — Human decision versus raw capture

**Category:** human decision versus raw capture

**Query:** "What is our current pricing model?"

**Candidate sources:**
- `organizations/acme-corp/pricing-decisions.md` (explicit human decision, 2026-06-15)
- `inbox/new/email-vendor-pricing-discussion-2026-07-01.md` (unreviewed email capture)

**Expected authority:** human-decision
**Selected source:** `organizations/acme-corp/pricing-decisions.md`
**Excluded source:** `inbox/new/email-vendor-pricing-discussion-2026-07-01.md`
**Privacy scope:** business
**Freshness result:** fresh (decision within review window)
**Expected unknowns:** none — the decision document is current and complete
**Explanation:** An explicit human decision outranks an unreviewed capture even when the capture is more recent. The email may contain relevant context but cannot override an approved decision without a new human review.

---

## Example 2 — Human decision versus raw capture (recent capture contradicts)

**Category:** human decision versus raw capture

**Query:** "Are we still using flat-rate pricing?"

**Candidate sources:**
- `knowledge/decisions.md` entry: "flat-rate model approved 2026-03-01"
- `inbox/new/meeting-notes-pricing-pivot-2026-07-20.md` (unreviewed, suggests per-seat)

**Expected authority:** human-decision (current) with conflict signal
**Selected source:** `knowledge/decisions.md`
**Excluded source:** none — both included, capture flagged as conflicting
**Privacy scope:** business
**Freshness result:** mixed (decision is older; capture is newer but unreviewed)
**Expected unknowns:** ["Unreviewed meeting notes may indicate a pricing change not yet formally decided"]
**Explanation:** The approved decision remains authoritative, but the newer capture creates a conflict that must be surfaced. The retriever includes both, marks the capture as `conflicting` authority, and records the potential gap in unknowns.

---

## Example 3 — Canonical strategy versus research

**Category:** canonical strategy versus research

**Query:** "What is our go-to-market approach for the enterprise segment?"

**Candidate sources:**
- `organizations/acme-corp/strategy.md` (canonical strategy, reviewed 2026-06-01)
- `resources/research/enterprise-market-analysis-2026-07.md` (research, unreviewed)

**Expected authority:** canonical
**Selected source:** `organizations/acme-corp/strategy.md`
**Excluded source:** none — research included as supporting
**Privacy scope:** business
**Freshness result:** fresh
**Expected unknowns:** none
**Explanation:** Canonical strategy is authoritative for what-we-are-doing decisions. Research provides supporting evidence and may inform a future strategy update, but it does not override current canonical positioning. The research is included with `supporting` authority so the agent can reference it if asked about alternatives.

---

## Example 4 — Canonical strategy versus research (research supersedes)

**Category:** canonical strategy versus research

**Query:** "What channel should we prioritize for acquisition?"

**Candidate sources:**
- `organizations/acme-corp/strategy.md` section on channels (reviewed 2026-02-01, says "paid search")
- `knowledge/decisions.md` entry: "pivot to community-led, 2026-06-10" (human decision)

**Expected authority:** human-decision (newer explicit decision supersedes older strategy section)
**Selected source:** `knowledge/decisions.md`
**Excluded source:** none — strategy section included as conflicting/stale
**Privacy scope:** business
**Freshness result:** mixed (strategy section is stale; decision is fresh)
**Expected unknowns:** ["Strategy document section on channels has not been updated to reflect the pivot decision"]
**Explanation:** A newer explicit human decision supersedes an older strategy section that has not been updated. The retriever surfaces the conflict between the two, marks the strategy section as `stale`, and records that the strategy document needs a review update.

---

## Example 5 — Current versus superseded

**Category:** current versus superseded

**Query:** "What is our current tech stack for the backend?"

**Candidate sources:**
- `repos/main-app/architecture.md` (current, reviewed 2026-05-01)
- `history/old-backend-architecture-2024.md` (explicitly archived)

**Expected authority:** canonical
**Selected source:** `repos/main-app/architecture.md`
**Excluded source:** `history/old-backend-architecture-2024.md`
**Privacy scope:** business
**Freshness result:** fresh
**Expected unknowns:** none
**Explanation:** Superseded material in `history/` is excluded from current-state queries by default. If the query asked "what did we use before the migration," the historical document would be selected instead.

---

## Example 6 — Current versus superseded (query asks about history)

**Category:** current versus superseded

**Query:** "What authentication approach did we use before the 2025 rewrite?"

**Candidate sources:**
- `repos/main-app/architecture.md` (current, describes new auth)
- `history/auth-system-pre-rewrite-2025.md` (superseded but relevant to query)

**Expected authority:** canonical (historical context, correctly dated)
**Selected source:** `history/auth-system-pre-rewrite-2025.md`
**Excluded source:** none — current architecture included as context
**Privacy scope:** business
**Freshness result:** fresh (the historical document accurately represents the past state)
**Expected unknowns:** none
**Explanation:** When the query explicitly asks about a past state, superseded material is the correct authority. The retriever selects the historical document and includes the current architecture as supporting context so the agent can distinguish past from present.

---

## Example 7 — Conflicting sources (two canonical documents disagree)

**Category:** conflicting sources

**Query:** "What is our policy on open-source contributions?"

**Candidate sources:**
- `knowledge/engineering-policies.md` section: "contributions allowed with team-lead approval"
- `organizations/acme-corp/legal-policies.md` section: "no open-source contributions without legal review"

**Expected authority:** conflicting — both are canonical
**Selected source:** both included, marked as conflicting
**Excluded source:** none
**Privacy scope:** business
**Freshness result:** mixed (engineering policy reviewed 2026-04; legal policy reviewed 2026-06)
**Expected unknowns:** ["Two canonical policies conflict on open-source contribution authority; resolution requires human decision"]
**Explanation:** When two canonical documents genuinely conflict, neither is silently preferred. The retriever includes both with `conflicting` authority, records the conflict in the conflicts array, and surfaces the unresolved state in unknowns. The agent must not choose one without human direction.

---

## Example 8 — Conflicting sources (model inference versus human conclusion)

**Category:** conflicting sources

**Query:** "Is our monthly churn rate above or below industry average?"

**Candidate sources:**
- `knowledge/decisions.md` entry: "churn analysis complete, we are at 3.2%, below SaaS average per [source]" (human-approved, 2026-05-01)
- `inbox/processed/ai-churn-analysis-2026-07.md` (model inference, suggests 4.1%)

**Expected authority:** human-decision
**Selected source:** `knowledge/decisions.md`
**Excluded source:** none — AI analysis included as conflicting/untrusted
**Privacy scope:** business
**Freshness result:** mixed (human conclusion is older; AI analysis is newer but untrusted)
**Expected unknowns:** ["AI-generated analysis suggests different churn rate; human review needed to update or confirm"]
**Explanation:** Human-approved conclusions outrank model inference even when the inference is more recent. The newer AI analysis is included as `untrusted` authority with a conflict signal so the human can review whether the approved conclusion needs updating.

---

## Example 9 — Missing evidence

**Category:** missing evidence

**Query:** "What were the results of our Q2 customer satisfaction survey?"

**Candidate sources:**
- `organizations/acme-corp/quarterly-reviews.md` (mentions Q2 survey was planned)
- No survey results file found in any searched scope

**Expected authority:** N/A — evidence missing
**Selected source:** `organizations/acme-corp/quarterly-reviews.md` (context only)
**Excluded source:** none
**Privacy scope:** business
**Freshness result:** unknown (results not found)
**Expected unknowns:** ["Q2 customer satisfaction survey results not found in any searched scope; survey was planned but results may not have been captured or may be in an unauthorized scope"]
**Explanation:** When expected evidence is absent, the retriever must not infer or fabricate results. It includes available context (the planning reference), records the gap in unknowns, and lets the agent inform the user that the information is missing rather than presenting a guess as fact.

---

## Example 10 — Missing evidence with scope limitation

**Category:** missing evidence

**Query:** "What feedback did the pastoral team give on the new curriculum?"

**Candidate sources:**
- `projects/curriculum-v2/planning.md` (mentions feedback was requested)
- Authorized scope is `project:curriculum-v2` only; `ministry` scope not authorized

**Expected authority:** N/A — evidence may exist but is inaccessible
**Selected source:** `projects/curriculum-v2/planning.md` (context only)
**Excluded source:** potential ministry-scope documents (excluded due to scope restriction)
**Privacy scope:** project:curriculum-v2
**Freshness result:** unknown
**Expected unknowns:** ["Pastoral team feedback may exist in ministry-scoped content but is not accessible under current scope authorization"]
**Explanation:** The retriever cannot search unauthorized scopes. It records the scope limitation in exclusions with a reason, notes the gap in unknowns, and does not attempt to infer what unauthorized content might say. The agent should inform the user that broader scope authorization would be needed to find the feedback.
