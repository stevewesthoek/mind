# Maintenance Pilot — Brain Implementation Handoff

**Status:** ready for Brain implementation  
**Depends on:** `system/maintenance-intelligence-standard.md`, `system/maintenance-report-contract.md`, `system/runbooks/maintenance-report-pilot-runbook.md`, `system/reports/maintenance-pilot-fixture.md`, `system/reports/maintenance-pilot-expected-report.md`  
**Purpose:** give the Brain repo a bounded, testable implementation target for the first report-only Mind maintenance pilot.

## Handoff summary

Mind now defines the policy, report schema, review workflow, pilot dataset, expected findings, and safety tests.

Brain should implement only the first bounded pilot:

```text
five exact Mind files
→ three enabled report-only detectors
→ canonical JSON report
→ Markdown projection
→ parity and safety verification
```

No content-changing workflow is part of this handoff.

## Ownership boundary

### Mind owns

- maintenance policy;
- the five-file pilot boundary;
- detector meaning and evidence requirements;
- report and review semantics;
- accepted versus approved-write separation;
- safety and pass/fail criteria;
- report destinations in Mind.

### Brain owns

- runner implementation;
- exact-path file reads;
- deterministic detector logic;
- bounded AI-assisted comparison;
- configuration and feature flags;
- schema validation;
- atomic report writes;
- error isolation;
- suppression storage;
- status and report visibility.

Brain must not reinterpret the Mind policy into broader write permissions.

## First implementation goal

Build one report-only maintenance runner that reads exactly:

```text
system/agent-context/00-current-context.md
projects/prochat-qa-memory/STRATEGY-PLAN.md
wiki/organisations/prochat/brand/product-strategy.md
home.md
system/automation-roadmap.md
```

and may write only:

```text
system/reports/maintenance-latest.json
system/reports/maintenance-latest.md
```

The first runner should be manually or explicitly invoked. Do not schedule it yet.

## Required feature flag

The pilot must be protected by a Brain-owned flag equivalent to:

```yaml
mind_maintenance_pilot:
  enabled: false
  mode: report-only
  dataset: bounded-five-file-pilot
  allow_content_writes: false
```

Requirements:

- disabled by default;
- report-only mode cannot be overridden by request payload;
- write permissions are not inferred from accepted findings;
- future scheduled execution requires a separate decision.

## Initial detector set

Enable:

```yaml
stale-page: true
completed-but-active: true
source-gap: true
```

Disable:

```yaml
duplicate-candidate: false
contradiction-candidate: false
capture-promotion: false
```

A disabled detector must appear as disabled in the report. It must not be omitted in a way that suggests a clean result.

## Suggested module boundary

Brain should implement independent modules rather than one monolithic prompt.

```text
mind-maintenance-pilot/
├── config
├── pilot-file-loader
├── stale-page-detector
├── completed-active-detector
├── source-gap-detector
├── finding-normalizer
├── report-schema-validator
├── json-report-writer
├── markdown-report-renderer
├── parity-validator
├── source-integrity-validator
└── pilot-runner
```

Exact Brain paths may differ. The responsibilities should remain separated.

## Execution sequence

```text
load disabled-by-default configuration
→ resolve Mind repo and source commit
→ verify five exact paths
→ snapshot source-file hashes/status
→ read five files only
→ run deterministic detectors
→ build bounded ambiguous candidate list
→ call AI Model Selector only when needed
→ normalize findings
→ validate complete JSON report in memory
→ atomically write JSON latest report
→ render Markdown from validated JSON
→ atomically write Markdown latest report
→ verify parity
→ verify source files unchanged
→ return report-only result
```

If source integrity verification fails, the run fails even if the reports were generated.

## File loader requirements

The loader must:

- accept only the five configured relative paths;
- reject path traversal;
- reject dynamic folder expansion;
- record missing paths as preflight failure;
- record the source commit;
- keep file content in memory only for the bounded run;
- avoid broad repository scans;
- avoid reading captures, tasks, archive, or unrelated wiki pages.

The first pilot should not depend on Graphify output. Graphify may become a candidate-generation input in a later phase after the deterministic report path is proven.

## Stale-page detector

Implement deterministically first.

### Inputs

- page path;
- page class;
- status;
- `last_reviewed`;
- `review_after`;
- report date;
- freshness risk.

### First-pilot rule

For `system/agent-context/00-current-context.md`, emit a candidate when:

```text
review_after exists
AND report date is later than review_after
```

The finding must state:

```text
review is due
```

It must not state:

```text
the page is false
```

No semantic model call is needed for this first positive finding.

### Negative behavior

Do not emit stale findings for pages whose review date remains in the future.
Do not treat `draft` as equivalent to stale.
Do not invent review dates for pages without them.

## Completed-but-active detector

Implement only explicit mismatch checks in the first pilot.

Allowed deterministic evidence:

- active status plus explicit completion status;
- current navigation plus explicit supersession reference;
- active project label plus explicit archive/completion metadata.

Do not infer completion from:

- file age;
- headings containing “final”;
- completed subsections inside an unfinished roadmap;
- the presence of archived history elsewhere outside the five-file dataset.

Expected first-pilot result: usually zero findings.

## Source-gap detector

The detector must be conservative.

### Deterministic filter

Identify only candidate claims that are:

- externally factual;
- high impact;
- presented as current truth;
- plausibly expected to have provenance.

Exclude by default:

- personal beliefs;
- Steve's strategic choices;
- product principles stated as decisions;
- creative language;
- self-authored definitions.

### AI-assisted step

Use AI Model Selector only for ambiguous candidate claims.

The semantic task should answer:

```text
Is this an externally factual claim where provenance would materially improve trust, or is it a strategic choice, interpretation, principle, or self-authored position?
```

Output must identify one exact claim and explain uncertainty.

Zero source-gap findings is an acceptable pilot result.

## AI Model Selector contract

When semantic assistance is required, Brain should use the standardized selector path.

Suggested task type:

```text
mind_maintenance_evidence_review
```

Suggested policy:

```yaml
local_only: true
max_candidates: 5
structured_output: true
fallback: no-finding-with-explicit-detector-error
```

Do not call a model directly from the Mind repo or from an ad hoc script.
Do not send the whole Mind vault to a model.
Do not escalate to a cloud model unless a later approved policy explicitly allows it.

## Finding normalization

Every detector result must be normalized before report generation.

Required fields:

```text
id
type
status
created
source_repo
scope
paths
trigger
matched_evidence
comparison_evidence
uncertainty
confidence
risk
recommended_action
requires_approval
no_write_performed
deduplication_key
suppression_until
review
```

Reject a finding when:

- no exact path exists;
- no matched evidence exists;
- confidence is invalid;
- the recommendation is a broad rewrite;
- the detector overstates evidence;
- the finding implies a write occurred;
- the finding type is disabled.

## Report schema validation

Validate the entire JSON report before writing any latest file.

Required report-level checks:

- supported schema version;
- unique report ID;
- current source commit;
- mode equals `report-only`;
- exactly five files considered;
- enabled/disabled detector state is explicit;
- summary counts match array contents;
- every finding passes normalization;
- errors are structured;
- `no_write_performed` equals `true`.

A schema failure should produce no successful latest report.

## Atomic report writes

Use temporary files and atomic replacement.

Required behavior:

```text
build validated JSON in memory
→ write temporary JSON beside target
→ flush and close
→ atomically replace maintenance-latest.json
→ render Markdown from validated JSON
→ write temporary Markdown beside target
→ flush and close
→ atomically replace maintenance-latest.md
```

If Markdown rendering fails after JSON replacement:

- mark the run incomplete;
- expose recovery information;
- do not return success;
- do not touch any source file.

A later implementation may improve two-file transactional behavior, but the first version must never present a parity mismatch as success.

## Markdown renderer

The Markdown report must be generated from the validated JSON report.

It should include:

- report identity;
- source commit;
- mode and no-write confirmation;
- summary counts;
- enabled and disabled detectors;
- high-priority findings;
- other findings;
- careful no-finding language;
- detector errors;
- source-integrity result;
- review instructions.

Do not separately prompt a model to write the Markdown report. Rendering should be deterministic.

## Parity validator

After both files are written, verify:

```text
same report ID
same generated time
same source commit
same files-considered count
same finding count
same error count
same no-write state
```

A mismatch fails the run.

## Source-integrity validator

Before reading, capture hashes or Git state for:

```text
system/agent-context/00-current-context.md
projects/prochat-qa-memory/STRATEGY-PLAN.md
wiki/organisations/prochat/brand/product-strategy.md
home.md
system/automation-roadmap.md
kanban.md
```

After report generation, verify they are unchanged.

Allowed changed paths:

```text
system/reports/maintenance-latest.json
system/reports/maintenance-latest.md
```

Any other change fails the pilot.

The validator must distinguish changes that existed before the run from changes introduced by the run. Existing unrelated Mind working-tree changes must not be claimed as pilot output.

## Existing dirty working tree

Mind may contain unrelated user or automation changes before the pilot.

Brain must:

1. record the pre-run changed-path set;
2. run the report-only pilot;
3. compare the post-run changed-path set;
4. attribute only newly introduced changes to the pilot;
5. fail if the pilot introduces anything beyond the two report paths;
6. never stage, revert, delete, or commit unrelated changes.

This is essential because Mind is a live human workspace.

## Error isolation

Each detector should return either:

```text
completed with findings
completed with no findings
failed with structured error
```

A failed detector must not be translated into “no finding.”

One detector failure should not discard valid results from other detectors.

The overall report should be marked partial when any detector fails.

## Suppression storage

The first report may emit open findings without a full review UI.

However, design the finding key now:

```text
stale-page:system/agent-context/00-current-context.md:review_after
```

Suppression storage should eventually preserve:

- finding key;
- evidence fingerprint;
- review state;
- reviewer;
- review date;
- reason;
- suppression-until date;
- resolution reference.

For the first code slice, it is acceptable to define the interface and leave persistent suppression disabled, provided the report states that review feedback persistence is not yet implemented.

## Suggested implementation slices in Brain

### Slice 1 — Types and schema

Implement:

- report types;
- finding types;
- detector status types;
- schema validation;
- fixture validation tests.

No Mind files should be written.

### Slice 2 — Loader and stale detector

Implement:

- five-file loader;
- source commit lookup;
- preflight;
- stale-page detector;
- in-memory report generation;
- tests against the required positive and negative cases.

Still no report files need to be written.

### Slice 3 — Report writers and safety validation

Implement:

- atomic JSON writer;
- deterministic Markdown renderer;
- parity validator;
- source-integrity validator;
- output-path enforcement.

Run against a temporary fixture before writing into Mind.

### Slice 4 — Remaining enabled detectors

Implement:

- completed-but-active explicit checks;
- conservative source-gap filtering;
- AI Model Selector integration for ambiguous source-gap candidates;
- detector error isolation.

### Slice 5 — Live bounded pilot

Run manually against the five exact Mind files and write only the two latest-report surfaces.

Stop for human review.

## Brain test requirements

At minimum, test:

- valid report schema;
- invalid finding rejection;
- disabled detector rejection;
- passed and future review dates;
- draft-is-not-stale behavior;
- no completed finding without explicit completion evidence;
- source-gap exclusion for strategic choice;
- exact claim requirement;
- detector timeout serialization;
- Markdown rendering from JSON;
- parity mismatch failure;
- output-path rejection;
- pre-existing dirty working-tree attribution;
- source-file integrity;
- no content writes after accepted finding.

## Pilot completion response

The Brain runner should return a compact result such as:

```json
{
  "ok": true,
  "status": "completed",
  "mode": "report-only",
  "report_id": "mind-maintenance-...",
  "source_commit": "...",
  "files_considered": 5,
  "findings_total": 1,
  "detector_errors": 0,
  "reports": [
    "system/reports/maintenance-latest.json",
    "system/reports/maintenance-latest.md"
  ],
  "source_files_changed": 0,
  "next_action": "Review the Markdown report."
}
```

A partial result must say so explicitly.

## Non-goals for the first Brain implementation

Do not implement:

- repo-wide scanning;
- scheduled execution;
- continuous watching;
- duplicate detection;
- contradiction detection;
- capture promotion;
- automatic review-state writes;
- automatic exact-path change proposals;
- approved content writes;
- Brain Console controls beyond optional read-only visibility;
- Graphify-based candidate generation;
- cloud-model escalation.

## Handoff acceptance criteria

The Brain implementation is ready for the live pilot when:

- report and finding schemas pass tests;
- the five-file loader rejects all other paths;
- the stale-page fixture passes;
- enabled detectors are explicit;
- disabled detectors cannot emit findings;
- JSON and Markdown parity is enforced;
- output paths are restricted;
- existing dirty-tree changes are safely distinguished;
- source files remain unchanged;
- the runner is disabled by default and report-only;
- a human can review the output without reading Brain code.

## Exact next implementation prompt

Use this prompt in the Brain repo:

```text
Implement Slice 1 of the Mind maintenance pilot handoff: add report/finding types, schema validation, and fixture-based tests from mind/system/maintenance-brain-implementation-handoff.md. Do not write to Mind yet, do not add scheduling, and do not implement content changes.
```
