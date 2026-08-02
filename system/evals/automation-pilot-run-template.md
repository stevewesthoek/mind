# Automation Pilot Run Template

**Purpose:** Complete this template for every counted run of the automation pilot. All three stages must be done before a run is complete for pilot-verdict purposes.

---

## Run identity

| Field | Value |
|---|---|
| Run ID | <!-- e.g. m6-2-run-003 --> |
| Run date | <!-- ISO 8601, e.g. 2026-08-05 --> |

---

## Stage 1 — Retrieval

### User question

```
CTX-PRO-003 — What are the current ProChat development priorities?
```

### Retrieval query

```
ProChat product roadmap current stage immediate priorities
```

### Command executed

```
node /Users/Office/Repos/stevewesthoek/brain/projects/mind-context/src/cli/cli.mjs resolve \
  --query "ProChat product roadmap current stage immediate priorities" \
  --root /Users/Office/Repos/stevewesthoek/mind \
  --scope wiki/organisations/prochat/brand \
  --forbidden-scope wiki/organisations/prochat/brand/archive \
  --format json \
  --max-items 1 \
  --max-tokens 2000
```

### Selected source

| Field | Value |
|---|---|
| Path | <!-- e.g. wiki/organisations/prochat/brand/product-roadmap.md --> |
| Citation | <!-- e.g. wiki/organisations/prochat/brand/product-roadmap.md#L1 --> |
| Source bytes | <!-- integer --> |
| Source freshness | <!-- from source document's Last updated field, or "unknown" --> |

### Automated gate results

| Gate | Result |
|---|---|
| Exit code 0 | <!-- PASS / FAIL --> |
| Required source present | <!-- PASS / FAIL --> |
| No forbidden source | <!-- PASS / FAIL --> |
| Citation correct | <!-- PASS / FAIL --> |
| Scope respected | <!-- PASS / FAIL --> |
| Mind no-mutation | <!-- PASS / FAIL --> |
| Brain no-mutation | <!-- PASS / FAIL --> |
| Safety or scope violation | <!-- true / false --> |

### Timing

| Field | Value |
|---|---|
| Retrieval elapsed seconds | <!-- CLI retrieval stage wall-clock time, e.g. 0.316 --> |
| Observed elapsed seconds (end-to-end, trigger to report ready) | <!-- blank when the full interval was not measured --> |

---

## Stage 2 — Orientation brief

> **Non-authoritative notice:** This brief is a read-only retrieval report. It does not represent a deployment state, scheduler state, task assignment, or human decision. It is produced from a single fixed source and must not be treated as authoritative product strategy.

**Model/provider:** Run-scoped. The human owner authorizes the model/provider for each run via explicit operator trigger. Record the authorized model/provider for this run below.

| Field | Value |
|---|---|
| Authorized model/provider | <!-- e.g. Claude Code Sonnet session — authorized by human owner for this run only --> |

### Source used

<!-- Confirm only product-roadmap.md was used. No other source permitted. -->

### Current priorities (as stated in source)

<!-- Extract and quote the "immediate priorities" section from product-roadmap.md verbatim or with minimal summarization. Do not infer or extend. -->

### Source freshness

<!-- State the Last updated date from product-roadmap.md, e.g. "2026-07-01 per document header." -->

### Explicit unknowns

<!-- List what is not knowable from this source alone. Examples: current phase completion status, tester feedback, live usage data, recent decisions not yet reflected in the roadmap. -->

---

## Stage 3 — Human review

**Human owner:** Steve Westhoek
**Instructions:** Fill in the four fields below from direct experience. Do not infer or default any field. Leave blank if not yet assessed.

| Field | Value |
|---|---|
| useful | <!-- true / false --> |
| correction_minutes | <!-- integer or blank --> |
| false_positive_count | <!-- integer or blank --> |
| missing_context_count | <!-- integer or blank --> |

---

## Run completion status

| Stage | Status |
|---|---|
| Stage 1 — retrieval | <!-- complete / pending / failed --> |
| Stage 2 — orientation brief | <!-- complete / pending --> |
| Stage 3 — human review | <!-- complete / pending --> |
| **Run complete for pilot-verdict purposes** | <!-- yes / no --> |
