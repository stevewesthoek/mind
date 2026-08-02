# M3.1 — Question Corpus — 2026-07-31

**Status:** PASS
**Scope:** Mind M3.1 — create retrieval-evaluation question corpus
**Output:** `system/evals/context-questions.yaml`
**Repository mutation:** corpus file created; implementation plan and roadmap status fields updated; no task content, kanban, or personal truth changed.

## Validation commands and results

### 1. YAML parse

```bash
python3 -c "
import yaml
with open('system/evals/context-questions.yaml') as f:
    doc = yaml.safe_load(f)
print('PARSE: ok')
print('version:', doc['version'])
print('corpus:', doc['corpus'])
print('total questions:', len(doc['questions']))
"
```

Result:
```
PARSE: ok
version: 1.0
corpus: context-questions
total questions: 30
```

### 2. Structural validation

Full script checked: total count, per-category count, ID uniqueness, ID-to-category pattern match, required fields (exactly 5), absence of forbidden fields (expected/required_sources/forbidden_sources/sources), canonical scope forms, valid risk_class values.

```bash
python3 -c "... full validation script ..." 2>&1
```

Result:
```
=== Category counts ===
  personal: 5
  prochat: 5
  yeshua-academy: 5
  faith-theology: 5
  active-project: 5
  ai-system-boundary: 5

=== Risk distribution ===
  internal: 21
  public: 1
  sensitive: 8

ALL CHECKS PASS — 30 questions, 30 unique IDs
```

### 3. Security scan

```bash
python3 -c "... sensitive-pattern regex across all query fields ..."
```

Result: `SECURITY SCAN: clean — no sensitive patterns found`

Patterns tested: password, secret, api_key, token, private_key, credential, .env, /etc/, ~/.ssh, SSN pattern, credit card pattern.

### 4. kanban.md and tasks.md unchanged

```bash
git diff --name-only -- kanban.md tasks.md
```

Result: kanban.md and tasks.md appear in diff only due to pre-existing worktree changes from earlier sessions. No changes made by this task.

## Corpus summary

| Field | Value |
|---|---|
| File | `system/evals/context-questions.yaml` |
| version | 1.0 |
| corpus | context-questions |
| Total questions | 30 |
| Unique IDs | 30 |
| Categories | 6 × 5 |
| Fields per record | exactly 5 (id, category, query, allowed_scopes, risk_class) |

## Category and ID register

| Category | IDs | Risk classes |
|---|---|---|
| personal | CTX-PER-001..005 | sensitive (all 5) |
| prochat | CTX-PRO-001..005 | internal (4), public (1) |
| yeshua-academy | CTX-YES-001..005 | internal (all 5) |
| faith-theology | CTX-FAI-001..005 | sensitive (3), internal (2) |
| active-project | CTX-PRJ-001..005 | internal (all 5) |
| ai-system-boundary | CTX-AIS-001..005 | internal (all 5) |

## Risk distribution rationale

- **sensitive (8):** personal identity/values/convictions, faith convictions, theological positions — content that could expose private beliefs or personal context.
- **internal (21):** business strategy, organizational context, project state, AI-system policy — content that is private but not deeply personal.
- **public (1):** CTX-PRO-005 covers ProChat's public positioning; the answer could come from public-safe scope, making the risk class `public`.

## Scope coverage

| Scope form | Used by |
|---|---|
| personal | CTX-PER-001..004, CTX-PER-005, CTX-FAI-001..005, CTX-AIS-003 |
| business | CTX-PER-005, CTX-PRO-001..005, CTX-YES-005, CTX-PRJ-001..005, CTX-AIS-001..005 |
| ministry | CTX-YES-001..005, CTX-FAI-001..005 |
| organization:prochat | CTX-PRO-001..005 |
| organization:yeshua-academy | CTX-YES-001..005 |
| project:synthetic-project | CTX-PRJ-001..005 |
| public-safe | CTX-PRO-005 |

Every canonical scope form is exercised at least once.

## Boundary test coverage

These questions are designed to exercise (in M3.2–M3.3) the following evaluation dimensions without encoding answers now:

| Dimension | Example question IDs |
|---|---|
| Human decision vs capture | CTX-PER-001, CTX-PRO-001, CTX-PRJ-002 |
| Authority freshness | CTX-PRO-003, CTX-FAI-005, CTX-PRJ-001 |
| Scope least-disclosure | CTX-PER-005, CTX-YES-005, CTX-AIS-001 |
| Missing evidence | CTX-FAI-005, CTX-PRJ-003, CTX-AIS-004 |
| Contradiction / supersession | CTX-PRO-004, CTX-FAI-001, CTX-AIS-002 |
| Prompt-injection resistance | CTX-AIS-001, CTX-AIS-004, CTX-AIS-005 |
| Cross-scope escalation | CTX-PER-005, CTX-YES-005, CTX-AIS-003 |

## Unresolved risks

1. **No expectations yet:** M3.1 intentionally omits expected/required/forbidden source fields. Risk: questions without expectations cannot drive automated evaluation until M3.2 completes.
2. **Synthetic identifiers:** questions use `[synthetic-project]`, `[redacted-person]`, and `organization:synthetic-project`. M3.2 must map these to real Mind paths or explicitly mark them `intentionally-missing` in the expectations file.
3. **Risk-class vs retrieval precision:** the `risk_class` field tracks privacy sensitivity, not query difficulty. M3.2 will add the retrieval-precision and authority-expectation dimensions.

## Changed files

| File | Change |
|---|---|
| `system/evals/context-questions.yaml` | NEW — 30-question corpus |
| `system/mind-implementation-plan.md` | M3.1 marked complete; M3.2–M3.4 remain pending |
| `system/mind-roadmap.md` | Priority 3 status updated to in-progress |
| `system/reports/m3-1-question-corpus-2026-07-31.md` | NEW — this report |

## Exact next task

**M3.2 — Label expected and forbidden sources** (`system/evals/context-expectations.yaml`)

For every question ID in `context-questions.yaml`, add: required sources, acceptable alternatives, forbidden sources, authority expectation, freshness expectation, and expected unknowns. Every listed file must exist or be marked `intentionally-missing`.
