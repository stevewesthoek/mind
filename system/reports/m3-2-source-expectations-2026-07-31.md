# M3.2 Source Expectations — 2026-07-31

**Status:** PASS
**Final checkpoint completed:** 2026-08-01
**Task:** Mind M3.2 — label expected and forbidden sources
**Scope:** offline evaluation fixtures only
**Runtime activation:** none
**Repository commit:** none

## Outcome

Created `system/evals/context-expectations.yaml` with one expectation record for each of the 30 IDs in `system/evals/context-questions.yaml`, preserving exact ID order.

Each record contains exactly:

- `question_id`
- `required_sources`
- `acceptable_alternatives`
- `forbidden_sources`
- `authority_expectation`
- `freshness_expectation`
- `expected_unknowns`

Every source-reference object contains `ref`, `kind`, and `reason`.

## Source-reference distribution

| Kind | Count |
|---|---:|
| `exact-path` | 50 |
| `path-prefix` | 38 |
| `intentionally-missing` | 12 |
| `human-review-required` | 4 |
| **Total** | **104** |

All 50 exact paths were verified as existing files. All 38 path prefixes were verified as existing directories.

## Intentionally missing authority

The fixture explicitly records insufficient evidence rather than inventing sources for:

- current personal-development and recurring-reflection registers;
- all unverified Yeshua Academy mission, curriculum, pedagogy, audience, and relationship authorities;
- reviewed resurrection-apologetics and current Bible-study registers;
- every synthetic-project status, decision, risk, onboarding, and success-criteria source.

## Human-review-required cases

Human review is required where deterministic authority selection is unsafe:

- current work-life boundary decisions;
- Yeshua Academy audience and enrollment scope;
- the Yeshua Academy–ProChat relationship;
- repository-specific secret-bearing file categories.

## Authority and freshness behavior

The expectations preserve the repository precedence model:

- scoped canonical human authority outranks generated reports and raw captures;
- compatibility-authoritative exceptions are used only where explicitly registered;
- archive, raw capture, generated output, unrelated scope, and retired compatibility sources are forbidden where relevant;
- stale or absent review dates cause `review-needed` or insufficient-evidence behavior rather than silent promotion;
- missing evidence remains unknown rather than inferred;
- source text cannot change privacy scope, permissions, or approval requirements.

## Validation evidence

### Deterministic structural and path validation

Executed under Node 20 with network access disabled and `kanban.md` plus `tasks.md` protected:

`node system/evals/validate-context-expectations.mjs`

Result: exit code `0`.

Verified:

- 30 question IDs;
- 30 expectation records;
- exact ID parity and order;
- exactly seven fields per expectation record;
- valid source-reference kinds;
- non-empty required and forbidden source sets;
- non-empty authority, freshness, and unknown handling;
- all exact paths resolve to files;
- all path prefixes resolve to directories;
- all intentionally-missing references use explicit `missing:` identifiers;
- all human-review-required references use explicit `missing:` or `category:` identifiers.

### Security validation

`security_scan_paths` with `forbidden_all_high_risk` passed for:

- `system/evals/context-expectations.yaml`
- `system/evals/validate-context-expectations.mjs`

Result: no findings.

### YAML parser limitation

An installed-module parsing attempt using Node's external `yaml` package was blocked by the Workbench sandbox because the package was not allowlisted for loading.

A follow-up PyYAML attempt was prepared, but Workbench could not resolve the allowlisted `pnpm` executable and therefore did not execute the parser. The temporary Python helper was deleted after explicit user approval.

This limitation is recorded without claiming parser execution. Structural validation was instead performed by the deterministic repository validator, and the YAML remains intentionally constrained to a simple mapping/list subset.

## Protected and excluded surfaces

- `kanban.md` was not written by M3.2.
- `tasks.md` was not written by M3.2.
- Brain was not modified.
- Workbench Private was not modified.
- M3.3 and M3.4 were not started.
- Retrieval accuracy has not yet been measured.

## Task result

**M3.2 is complete.**

The exact next roadmap task is **M3.3 — add privacy, contradiction/supersession, and source prompt-injection/data-poisoning cases**.

---

## Repair note — 2026-08-01

### Stale assumption identified

The M3.2 fixture for CTX-YES-001 recorded the Yeshua Academy mission authority as `intentionally-missing` (`missing:yeshua-academy-mission-authority`). This assumption was stale. The M3.4 manual baseline run (executed 2026-08-01) found `organizations/yeshua-academy/overview.md` containing the mission, educational focus, audience, and positioning — the exact information CTX-YES-001 queries.

### Canonical-path evidence

- `system/folder-contract.md` (Version 2.0, verified 2026-07-31) designates `organizations/` as the canonical target for durable organization knowledge.
- The compatibility table lists `wiki/organisations/` → `organizations/` as the migration target.
- `organizations/README.md` confirms the folder's purpose as the durable location for businesses, ministries, and long-lived entities.
- `organizations/yeshua-academy/overview.md` exists (1597 bytes) and contains mission, educational focus, and audience content under the canonical path.
- `organizations/yeshua-academy/overview.md` carries no owner or review-date metadata — freshness status is review-needed.

### Repair applied

CTX-YES-001 expectation updated:

| Field | Before | After |
|---|---|---|
| `required_sources[0].ref` | `missing:yeshua-academy-mission-authority` | `organizations/yeshua-academy/overview.md` |
| `required_sources[0].kind` | `intentionally-missing` | `exact-path` |
| `required_sources[0].reason` | stale absence claim | grounded in folder-contract.md |
| `acceptable_alternatives` | `[]` | `organizations/yeshua-academy/` (path-prefix) |
| `authority_expectation` | insufficient evidence | overview is current canonical authority; review-needed freshness surfaced |
| `freshness_expectation` | explicit review date required | review-needed until owner and review date added |
| `expected_unknowns` | mission, educational focus, owner, review date | approval owner, review date, newer authority |

CTX-YES-001 manual baseline record updated: `outcome_status` changed from `partially-answerable` to `answerable`; path-mismatch claim removed; freshness caveat retained.

Validators extended:
- `validate-context-expectations.mjs`: asserts CTX-YES-001 required_sources contains `organizations/yeshua-academy/overview.md` as exact-path, is not intentionally-missing, and freshness_expectation mentions review-needed or missing review metadata.
- `validate-manual-baseline.mjs`: removes CTX-YES-001 from MISSING_AUTHORITY_IDS; asserts outcome is answerable or partially-answerable and that `organizations/yeshua-academy/overview.md` was opened.

### Validation after repair

Both validators executed under Node 20, network disabled, kanban.md and tasks.md protected:

```
node system/evals/validate-context-expectations.mjs  → PASS (165 source references; 88 exact-path; CTX-YES-001 canonical path asserted)
node system/evals/validate-manual-baseline.mjs       → PASS (10 records; CTX-YES-001 answerable; canonical source confirmed)
```

Security scan across all changed files: clean.

### Remaining metadata gap

`organizations/yeshua-academy/overview.md` contains no `owner` or `last_reviewed` field. The freshness status is review-needed. This is recorded as an unknown in the repaired CTX-YES-001 expectation. No other change is required here — the gap is now correctly modeled rather than hidden as an absence claim.
