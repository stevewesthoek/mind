# M6.2 Run Evidence Repair — 2026-08-03

**Status:** complete; runs 003–008 fully evaluated through Stage 3 human review
**Owner:** Steve Westhoek
**Scope:** Mind-owned audit and evidence repair for `m6-2-run-003` through `m6-2-run-008`
**Authorization boundary:** no Brain modification, deployment, registration, activation, provider change, scheduler change, MCP change, or continuous automation

## Purpose

Audit the six pre-existing run drafts and their retained temporary evidence, reject unsupported evidence, preserve the original drafts, and establish complete independent evidence for official runs 003–008.

The repository contracts in `system/automation-pilot.md`, `system/evals/automation-pilot-run-template.md`, and `system/reports/m6-2-pilot-cadence-decision-2026-08-03.md` are authoritative.

## Original-draft preservation

All six original drafts were copied before replacement to:

```text
/tmp/m6-2-original-drafts-2026-08-03/
```

SHA-256 comparison confirmed that every preserved copy was byte-identical to its original draft before replacement.

## Retained-evidence audit

The only retained preparation directories were:

```text
/tmp/m6-2-run-003-evidence/
/tmp/m6-2-run-004-evidence/
/tmp/m6-2-run-005-evidence/
/tmp/m6-2-run-006-evidence/
/tmp/m6-2-run-007-evidence/
/tmp/m6-2-run-008-evidence/
```

Across all six directories:

- `output.json` was byte-identical with SHA-256 `733090009fbf0b2970475d6451d85c320b6a2f9c1cba39cbd7ea4d6662fd01ee`;
- `exit_code.txt` contained `0`;
- `stderr.txt` was empty;
- start/end timestamps collapsed into only `2026-08-03T16:59:43Z` and `2026-08-03T16:59:44Z`;
- no exact command capture existed;
- no Mind or Brain pre/post snapshot existed;
- no protected-path fingerprint existed;
- no source-content snapshot or valid source-byte measurement existed;
- no independent citation-resolution evidence existed;
- no complete Stage 2 brief artifact or brief hash existed;
- no reliable end-to-end trigger-to-Stage-2-ready timing existed.

Run 003 alone included `source.txt`; it contained `null`, not source content or a byte measurement.

The retained JSON selected the required path, but path selection alone did not prove the claimed source bytes, citation correctness, no-mutation result, timing, safety result, or complete brief. These invocations therefore do not count.

## Per-run classification and repair outcome

| Run | Original draft status | Evidence found | Evidence missing | Required classification | Fresh invocation required | Earlier invocation counts | Final official evidence directory | Official technical result |
|---|---|---|---|---|---|---|---|---|
| `m6-2-run-003` | Claimed Stage 1 and Stage 2 complete; Stage 3 pending; contained unsupported `6627`, copied-looking `0.316`, bare PASS results, and unauthorized Claude Code Haiku attribution | exit `0`; empty stderr; selected-path JSON; one-second-resolution timestamps; `source.txt`=`null` | exact command, independent timing, source content/bytes, citation resolution, Mind/Brain snapshots, protected fingerprints, warnings/provenance references, complete brief hash | `REQUIRES OFFICIAL RE-EXECUTION` | yes | no — non-counted preparation | `/tmp/m6-2-run-003-official-evidence/` | PASS; retrieval `0.297s`; end-to-end `79.101s` |
| `m6-2-run-004` | Claimed Stage 1 and Stage 2 complete; Stage 3 pending; contained unsupported `6627`, copied-looking timing, bare PASS results, and unauthorized Claude Code Haiku attribution | exit `0`; empty stderr; selected-path JSON; one-second-resolution timestamps | exact command, independent timing, source content/bytes, citation resolution, Mind/Brain snapshots, protected fingerprints, warnings/provenance references, complete brief hash | `REQUIRES OFFICIAL RE-EXECUTION` | yes | no — non-counted preparation | `/tmp/m6-2-run-004-official-evidence/` | PASS; retrieval `0.309s`; end-to-end `37.743s` |
| `m6-2-run-005` | Abbreviated draft; claimed Stage 1 and Stage 2 complete; Stage 3 pending; omitted query, command, timing, snapshot, and resolver detail; unauthorized Claude Code Haiku attribution | exit `0`; empty stderr; selected-path JSON; one-second-resolution timestamps | complete template fields, exact command, independent timing, source content/bytes, citation resolution, Mind/Brain snapshots, protected fingerprints, resolver details, complete brief hash | `REQUIRES OFFICIAL RE-EXECUTION` | yes | no — non-counted preparation | `/tmp/m6-2-run-005-official-evidence/` | PASS; retrieval `0.346s`; end-to-end `24.523s` |
| `m6-2-run-006` | Abbreviated draft with the same unsupported claim pattern as run 005 | exit `0`; empty stderr; selected-path JSON; one-second-resolution timestamps | complete template fields, exact command, independent timing, source content/bytes, citation resolution, Mind/Brain snapshots, protected fingerprints, resolver details, complete brief hash | `REQUIRES OFFICIAL RE-EXECUTION` | yes | no — non-counted preparation | `/tmp/m6-2-run-006-official-evidence/` | PASS; retrieval `0.313s`; end-to-end `24.117s` |
| `m6-2-run-007` | Abbreviated draft with the same unsupported claim pattern as run 005 | exit `0`; empty stderr; selected-path JSON; one-second-resolution timestamps | complete template fields, exact command, independent timing, source content/bytes, citation resolution, Mind/Brain snapshots, protected fingerprints, resolver details, complete brief hash | `REQUIRES OFFICIAL RE-EXECUTION` | yes | no — non-counted preparation | `/tmp/m6-2-run-007-official-evidence/` | PASS; retrieval `0.304s`; end-to-end `25.918s` |
| `m6-2-run-008` | Abbreviated draft with the same unsupported claim pattern as run 005 | exit `0`; empty stderr; selected-path JSON; one-second-resolution timestamps | complete template fields, exact command, independent timing, source content/bytes, citation resolution, Mind/Brain snapshots, protected fingerprints, resolver details, complete brief hash | `REQUIRES OFFICIAL RE-EXECUTION` | yes | no — non-counted preparation | `/tmp/m6-2-run-008-official-evidence/` | PASS; retrieval `0.307s`; end-to-end `25.426s` |

No retained run qualified as `ACCEPTABLE WITH COMPLETE EVIDENCE` or `REPAIRABLE FROM RETAINED EVIDENCE`.

## Run 003 evidence-harness preparation attempt

The first fresh run-003 resolver invocation completed, but the temporary evidence harness failed immediately afterward because an `awk` expression used a reserved variable name. That attempt lacked reliable end timing and post-snapshots, so it is explicitly non-counted and preserved at:

```text
/tmp/m6-2-run-003-official-evidence-preparation-attempt-1/
```

Immediate read-only comparison confirmed that current Mind and Brain branch, HEAD, and status still matched the attempt's pre-snapshots. The harness received one bounded repair, passed syntax validation, and the official run-003 invocation was then executed fresh. No failed safety, authority, citation, scope, or mutation gate was rerun silently.

## Official evidence characteristics

Every final official directory contains independent:

- exact command text;
- UTC and Europe/Lisbon start/end timestamps;
- exit code, stdout, and stderr;
- retrieval elapsed time;
- selected-source count, path, citation, content, byte measurement, line count, freshness, and SHA-256;
- budget, truncation, warning, and provenance evidence;
- Mind pre/post branch, HEAD, status, tracked-diff hash, and cached-diff hash;
- Brain pre/post branch, HEAD, status, tracked-diff hash, and cached-diff hash;
- pre/post fingerprints for all nine preserved Mind paths;
- consolidated Stage 1 gate results;
- complete Stage 2 brief, Stage-2-ready timestamps, end-to-end timing, and brief SHA-256.

All six official source snapshots are independently captured and byte-identical:

```text
9088dd96dc957b179c1d983c6abf341036c1ca975fea7001342e719770c172f1
```

All six complete Stage 2 briefs are byte-identical because the independently captured selected sources and authorized synthesis constraints are byte-identical:

```text
4d97de9aa3723bceb0b869d8fd72b41f1d90a1e8928cbb145d2c16b073aebbde
```

## Current completion boundary

- Stage 1: complete for official runs 003–008.
- Stage 2: complete for official runs 003–008.
- Stage 3: complete; Steve Westhoek explicitly applied the same `useful=true`, `correction_minutes=0`, `false_positive_count=0`, and `missing_context_count=0` assessment independently to runs 003–008.
- Observations CSV: complete with exactly eight unique data rows.
- M6.2: complete with eight fully evaluated runs.
- M6.3: complete; verdict `retain`; evidence: `system/reports/priority-6-automation-pilot-verdict-2026-08-03.md`.
- Continuous automation: not authorized.

The temporary external evidence directories expired before the Stage 3 resume and were not recreated. Stages 1–2 were not rerun. The official run records and this audit retain the measured values, classifications, hashes, and no-mutation results used for closure.
