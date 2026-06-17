# Mind Maintenance False-Positive Measurement

**Date:** 2026-06-17  
**Scope:** canonical five-file maintenance pilot fixture  
**Source fixture:** `system/reports/maintenance-pilot-fixture.md`  
**Measured report:** `system/reports/maintenance-latest.json`  
**Mode:** report-only  
**Review status:** measured and reviewed against labeled fixture expectations

## Result

| Measure | Count |
|---|---:|
| Expected positive cases | 1 |
| Explicit negative cases | 7 |
| Findings emitted | 0 |
| True positives | 0 |
| False positives | 0 |
| True negatives | 7 |
| False negatives | 1 |

## Rates

- False-positive rate: `0 / 7 = 0%`
- Precision: not defined because the report emitted no findings
- Recall: `0 / 1 = 0%`

## Interpretation

The measured run produced no noisy findings across the seven explicitly labeled negative cases, so the observed false-positive rate was 0% on the bounded fixture.

The same run missed the fixture's required stale-page finding for `router/00-current-context.md`. This is a false negative and means the detector set is not yet acceptable as fully validated despite the zero false-positive result.

## Safety confirmation

The measured report states:

- `mode: report-only`
- `sourceFilesChanged: 0`
- `noWritePerformed: true`
- `detectorErrors: 0`

## Required follow-up

Refine or repair stale-page detection so the required positive case is emitted without increasing false positives on the seven labeled negative cases. Re-run this measurement after the repair before treating Phase 4 detector quality as complete.
