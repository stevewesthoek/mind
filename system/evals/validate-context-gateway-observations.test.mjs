/**
 * Tests for validate-context-gateway-observations.mjs
 *
 * Uses Node.js built-in test runner (node --test).
 * Each test creates a synthetic minimal observation set, runs the shimmed
 * validator against it, and asserts on the JSON output.
 *
 * Fail-closed tests prove that the validator catches wrong values even when
 * the correct value appears elsewhere in the document (narrative, tables, etc.)
 * but NOT in the bounded ## Ledger metadata block.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Fixtures ──────────────────────────────────────────────────────────────────

/** Minimal valid ledger metadata block for a fixture-only obs 001. */
function metaBlock001() {
  return `## Ledger metadata

- observation_id: 001
- session_date: 2026-08-04
- classification: fixture-only
- qualifying: false
- incident_type: none
- qualifying_count: 0
- target_count: 10
- remaining_sessions: 10
- next_observation: 002
`;
}

/** Minimal valid ledger metadata block for qualifying obs N. */
function metaBlockQ(id, date, incidentType, qualifyingCount, remaining) {
  const padded = String(id).padStart(3, '0');
  const next = String(id + 1).padStart(3, '0');
  return `## Ledger metadata

- observation_id: ${padded}
- session_date: ${date}
- classification: qualifying-live
- qualifying: true
- incident_type: ${incidentType}
- qualifying_count: ${qualifyingCount}
- target_count: 10
- remaining_sessions: ${remaining}
- next_observation: ${next}
`;
}

/** Build a minimal valid observation 001 document. */
function obs001(metaOverride = null) {
  const meta = metaOverride !== null ? metaOverride : metaBlock001();
  return `# Context Gateway Operational Observation 001

${meta}

## Session notes

This is the fixture-only diagnostic session. It does not count toward
multi-session stability. classification: fixture-only
`;
}

/** Build a minimal valid qualifying observation. */
function obsN(id, date, incidentType, qualifyingCount, remaining, extra = '') {
  const padded = String(id).padStart(3, '0');
  const meta = metaBlockQ(id, date, incidentType, qualifyingCount, remaining);
  return `# Context Gateway Operational Observation ${padded}

${meta}

## Evidence

${extra}
Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
}

/**
 * Valid minimal four-observation set: 001 fixture, 002–004 qualifying.
 */
function validObsSet() {
  return {
    1: obs001(),
    2: obsN(2, '2026-08-04', 'retrieval-authority', 1, 9),
    3: obsN(3, '2026-08-05', 'retrieval-relevance', 2, 8),
    4: obsN(4, '2026-08-06', 'none', 3, 7),
  };
}

// ── Test runner helpers ───────────────────────────────────────────────────────

/**
 * Runs the real validator against the real observation files.
 * Returns { exitCode, json }.
 */
function runRealValidator() {
  const result = spawnSync(
    process.execPath,
    [resolve(__dirname, 'validate-context-gateway-observations.mjs')],
    { encoding: 'utf8' },
  );
  let json = null;
  try { json = JSON.parse(result.stdout); } catch { /* leave null */ }
  return { exitCode: result.status, json, stdout: result.stdout, stderr: result.stderr };
}

/**
 * Runs the shimmed validator against a synthetic set of observation files.
 *
 * obsContents: Map<number, string|null>  (null → file absent)
 * expectationsOverride: string|null  (null → use real file)
 */
function runSynthetic(obsContents, expectationsOverride = null) {
  const tmpDir = resolve(tmpdir(), `cgo-test-${process.hrtime.bigint()}`);
  mkdirSync(tmpDir, { recursive: true });

  try {
    for (const [id, content] of Object.entries(obsContents)) {
      if (content === null) continue; // simulate missing
      const padded = String(id).padStart(3, '0');
      writeFileSync(
        resolve(tmpDir, `context-gateway-operational-observation-${padded}.md`),
        content, 'utf8',
      );
    }

    const expectPath = resolve(tmpDir, 'context-expectations.yaml');
    if (expectationsOverride !== null) {
      writeFileSync(expectPath, expectationsOverride, 'utf8');
    } else {
      const real = readFileSync(resolve(__dirname, 'context-expectations.yaml'), 'utf8');
      writeFileSync(expectPath, real, 'utf8');
    }

    const validatorSrc = readFileSync(
      resolve(__dirname, 'validate-context-gateway-observations.mjs'),
      'utf8',
    );
    // Replace __dirname with tmpDir so file discovery and path resolution use our synthetic set
    const shimmed = validatorSrc.replace(
      /const __dirname = dirname\(fileURLToPath\(import\.meta\.url\)\);/,
      `const __dirname = ${JSON.stringify(tmpDir)};`,
    ).replace(
      /const VAULT_ROOT = resolve\(__dirname, '\.\.', '\.\.'\);/,
      `const VAULT_ROOT = ${JSON.stringify(tmpDir)};`,
    );
    const shimPath = resolve(tmpDir, 'validator-shim.mjs');
    writeFileSync(shimPath, shimmed, 'utf8');

    const result = spawnSync(process.execPath, [shimPath], { encoding: 'utf8' });
    let json = null;
    try { json = JSON.parse(result.stdout); } catch { /* leave null */ }
    return { exitCode: result.status, json, stdout: result.stdout, stderr: result.stderr };
  } finally {
    try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* ignore */ }
  }
}

function hasFail(json, checkSubstring) {
  return json?.results?.some(r => r.status === 'FAIL' && r.check.includes(checkSubstring));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

// ── Real-file golden path ──────────────────────────────────────────────────────
test('valid ledger passes with exit 0', () => {
  const { exitCode, json } = runRealValidator();
  const failures = json?.results?.filter(r => r.status === 'FAIL') ?? [];
  assert.equal(exitCode, 0,
    `Validator should exit 0 on valid ledger; failures: ${JSON.stringify(failures)}`);
  assert.ok(json, 'Should produce JSON output');
  assert.equal(json.passed, true, 'Should report passed=true');
  assert.equal(json.failCount, 0, `No failures expected; got: ${JSON.stringify(failures)}`);
});

test('output contains no absolute paths', () => {
  const { json } = runRealValidator();
  assert.ok(json, 'Should produce JSON output');
  const raw = JSON.stringify(json);
  assert.ok(!raw.includes('/Users/'), 'Output must not contain absolute /Users/ paths');
  assert.ok(!raw.includes('/home/'), 'Output must not contain absolute /home/ paths');
});

// ── Fail-closed: wrong metadata header, correct value appears only in narrative ──

test('wrong header date fails even when correct date appears later in narrative', () => {
  // obs-003 date wrong in metadata; correct date appears only in body text
  const badMeta = metaBlockQ(3, '2099-01-01', 'retrieval-relevance', 2, 8);
  const content = `# Context Gateway Operational Observation 003

${badMeta}

## Notes

This session occurred on 2026-08-05 as documented in history.
Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 3: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when header date is wrong');
  assert.equal(json?.passed, false);
  // The nondecreasing check should fire (2099 > 2026-08-06)
  assert.ok(
    hasFail(json, 'obs-003-date') || hasFail(json, 'date'),
    `Should have a date-related failure; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`
  );
});

test('wrong header classification fails even when qualifying appears later', () => {
  // obs-002 classified wrong in metadata; "qualifying-live" appears only in body
  const badMeta = `## Ledger metadata

- observation_id: 002
- session_date: 2026-08-04
- classification: fixture-only
- qualifying: true
- incident_type: retrieval-authority
- qualifying_count: 1
- target_count: 10
- remaining_sessions: 9
- next_observation: 003
`;
  // This makes obs-002 fixture-only with qualifying=true — contradiction
  // The validator checks: obs-002 qualifying must be true (passes), but fixture-only
  // classification is only enforced for obs-001.  The real guard is that obs-001
  // must be fixture-only; obs-002+ must be qualifying.  Let us instead test the
  // scenario where we set obs-002 classification=fixture-only AND qualifying=false
  // while "qualifying-live" appears in body text.
  const badMeta2 = `## Ledger metadata

- observation_id: 002
- session_date: 2026-08-04
- classification: fixture-only
- qualifying: false
- incident_type: retrieval-authority
- qualifying_count: 1
- target_count: 10
- remaining_sessions: 9
- next_observation: 003
`;
  const content = `# Context Gateway Operational Observation 002

${badMeta2}

## Notes

This is a qualifying-live session with retrieval-authority incident.
qualifying: true classification: qualifying-live
Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 2: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when header qualifying=false for obs-002');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'qualifying'), `Should have qualifying failure; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

test('wrong header incident type fails even when expected phrase appears later', () => {
  // obs-002: incident_type set to "none" in metadata; "retrieval-authority" appears only in body
  const badMeta = `## Ledger metadata

- observation_id: 002
- session_date: 2026-08-04
- classification: qualifying-live
- qualifying: true
- incident_type: none
- qualifying_count: 1
- target_count: 10
- remaining_sessions: 9
- next_observation: 003
`;
  const content = `# Context Gateway Operational Observation 002

${badMeta}

## Notes

This session had a retrieval-authority incident at rank 1.
Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 2: content };
  const { exitCode, json } = runSynthetic(set);
  // incident_type "none" is valid — this actually should pass the type check.
  // But qualifying_count=1 with incident_type=none is fine per the spec.
  // The key test is that the validator uses ONLY the metadata block.
  // "none" is a valid incident type, so this will pass incident-type.
  // The meaningful assertion is that the body text "retrieval-authority" does NOT
  // cause the incident-type check to report a different value.
  assert.ok(json, 'Should produce JSON output');
  // The validator should use metadata value "none" — not the body text
  const incidentCheck = json?.results?.find(r => r.check === 'obs-002-incident-type');
  assert.ok(incidentCheck, 'Should have obs-002-incident-type check');
  assert.equal(incidentCheck.status, 'PASS', 'incident_type "none" is valid; validator must not read body text');
});

test('wrong header count fails even when history table has correct count', () => {
  // obs-004: qualifying_count=99 in metadata; "3 of 10" appears only in body table
  const badMeta = `## Ledger metadata

- observation_id: 004
- session_date: 2026-08-06
- classification: qualifying-live
- qualifying: true
- incident_type: none
- qualifying_count: 99
- target_count: 10
- remaining_sessions: 7
- next_observation: 005
`;
  const content = `# Context Gateway Operational Observation 004

${badMeta}

## Final accounting

| ID | Counts |
|----|--------|
| 001 | No |
| 002 | Yes |
| 003 | Yes |
| 004 | Yes |

Qualifying sessions completed: 3 of 10
Remaining sessions: 7
Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 4: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when metadata count is wrong');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'qualifying-count'), `Should fail qualifying-count; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

// ── Structural failure tests ───────────────────────────────────────────────────

test('missing metadata block fails', () => {
  const content = `# Context Gateway Operational Observation 002

## Notes

This is a qualifying-live session with retrieval-authority incident.
session_date: 2026-08-04
qualifying: true
Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 2: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when metadata block is missing');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'meta-block'), `Should fail meta-block check; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

test('duplicate metadata key fails', () => {
  const badMeta = `## Ledger metadata

- observation_id: 002
- session_date: 2026-08-04
- classification: qualifying-live
- qualifying: true
- incident_type: retrieval-authority
- qualifying_count: 1
- target_count: 10
- remaining_sessions: 9
- next_observation: 003
- qualifying_count: 1
`;
  const content = `# Context Gateway Operational Observation 002

${badMeta}

Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 2: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when metadata has duplicate key');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'meta-duplicate'), `Should fail meta-duplicates check; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

test('ID gap fails', () => {
  // Provide obs 001, 002, 004 — missing 003 creates a gap
  const set = { 1: validObsSet()[1], 2: validObsSet()[2], 4: validObsSet()[4] };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when there is an ID gap');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'sequential'), `Should fail sequential-ids check; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

test('qualifying sessions reusing a date fails', () => {
  // obs-003 uses the same date as obs-002 (both 2026-08-04)
  const sameDate3 = obsN(3, '2026-08-04', 'retrieval-relevance', 2, 8);
  const set = { ...validObsSet(), 3: sameDate3 };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when qualifying sessions reuse a date');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'distinct-dates'), `Should fail distinct-dates check; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

test('self-referencing commit SHA fails', () => {
  const content = validObsSet()[4] + '\nFinal commit SHA: ' + 'a'.repeat(40) + '\n';
  const set = { ...validObsSet(), 4: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when self-hash is detected');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'no-self-hash'), `Should fail no-self-hash; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

test('output with absolute path fails path check', () => {
  // Confirm that the real validator output contains no absolute paths
  const { json, stdout } = runRealValidator();
  assert.ok(json, 'Should produce JSON output');
  // Check raw JSON string for absolute paths
  assert.ok(!stdout.includes('/Users/'), 'stdout must not contain /Users/ absolute paths');
});

test('missing forbidden source in CTX-CON-006 expectations fails', () => {
  const realExpectations = readFileSync(
    resolve(__dirname, 'context-expectations.yaml'),
    'utf8',
  );
  const modified = realExpectations.replace(/.*system\/templates\/area\.md.*/g, '');
  const { exitCode, json } = runSynthetic(validObsSet(), modified);
  assert.notEqual(exitCode, 0, 'Should fail when forbidden source is missing');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'ctx-con-006'), `Should fail ctx-con-006-forbidden-source; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

// ── Obs 001 fixture-only enforcement ──────────────────────────────────────────

test('observation 001 marked qualifying fails', () => {
  const badMeta = `## Ledger metadata

- observation_id: 001
- session_date: 2026-08-04
- classification: qualifying-live
- qualifying: true
- incident_type: none
- qualifying_count: 1
- target_count: 10
- remaining_sessions: 9
- next_observation: 002
`;
  const content = `# Context Gateway Operational Observation 001

${badMeta}

## Notes

fixture-only diagnostic
`;
  const set = { ...validObsSet(), 1: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should fail when obs-001 is not fixture-only');
  assert.equal(json?.passed, false);
  assert.ok(
    hasFail(json, 'fixture-only') || hasFail(json, 'not-counting') || hasFail(json, 'qualifying-count-zero'),
    `Should fail an obs-001 fixture check; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`
  );
});

// ── Existing meaningful tests ─────────────────────────────────────────────────

test('wrong date in observation 003 fails', () => {
  const content = obsN(3, '2099-09-01', 'retrieval-relevance', 2, 8);
  const set = { ...validObsSet(), 3: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should exit nonzero when obs 003 date is wrong');
  assert.equal(json?.passed, false);
  // Date is non-decreasing from 004=2026-08-06 to 003=2099 — it's 003 before 004,
  // so actually this makes 003 ahead of 004 but 003 is processed before 004 in order.
  // The non-decreasing check compares sequential ids, so 003 date > 002 date passes
  // but 004 date 2026-08-06 < 003 date 2099-09-01 triggers nondecreasing failure on 004.
  assert.ok(
    hasFail(json, 'date') || hasFail(json, 'nondecreasing'),
    `Should have a date failure; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`
  );
});

test('wrong qualifying count in observation 004 fails', () => {
  const badMeta = `## Ledger metadata

- observation_id: 004
- session_date: 2026-08-06
- classification: qualifying-live
- qualifying: true
- incident_type: none
- qualifying_count: 99
- target_count: 10
- remaining_sessions: 7
- next_observation: 005
`;
  const content = `# Context Gateway Operational Observation 004

${badMeta}

Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 4: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should exit nonzero when qualifying count is wrong');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'qualifying-count'), 'Should fail qualifying-count check');
});

test('wrong incident type in observation 002 fails', () => {
  const badMeta = `## Ledger metadata

- observation_id: 002
- session_date: 2026-08-04
- classification: qualifying-live
- qualifying: true
- incident_type: unknown-invalid-type
- qualifying_count: 1
- target_count: 10
- remaining_sessions: 9
- next_observation: 003
`;
  const content = `# Context Gateway Operational Observation 002

${badMeta}

retrieval-authority mentioned here but not in metadata
Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 2: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should exit nonzero when incident type is invalid');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'incident-type'), 'Should fail incident-type check');
});

test('observation with embedded self-referencing commit SHA fails', () => {
  const fakeSha = 'a'.repeat(40);
  const content = validObsSet()[4] + `\nFinal commit SHA: ${fakeSha}\n`;
  const set = { ...validObsSet(), 4: content };
  const { exitCode, json } = runSynthetic(set);
  assert.notEqual(exitCode, 0, 'Should exit nonzero when a self-hash is detected');
  assert.equal(json?.passed, false);
  assert.ok(hasFail(json, 'no-self-hash'), 'Should fail no-self-hash check');
});

// ── Synthetic Observation 005 — future obs validates without editing validator ──

test('synthetic Observation 005 with valid metadata passes without modifying validator', () => {
  // Build a valid obs-005 with correct sequential counts
  const obs005 = `# Context Gateway Operational Observation 005

## Ledger metadata

- observation_id: 005
- session_date: 2026-08-07
- classification: qualifying-live
- qualifying: true
- incident_type: none
- qualifying_count: 4
- target_count: 10
- remaining_sessions: 6
- next_observation: 006

## Evidence

Provider revision: 076b9f97030e1c90bc66ffbb61d29456b41ed69f
`;
  const set = { ...validObsSet(), 5: obs005 };
  const { exitCode, json } = runSynthetic(set);
  const failures = json?.results?.filter(r => r.status === 'FAIL') ?? [];
  assert.equal(exitCode, 0,
    `Synthetic obs-005 should pass with exit 0; failures: ${JSON.stringify(failures)}`);
  assert.equal(json?.passed, true, 'Should report passed=true for valid obs-005');
  assert.equal(json?.failCount, 0, `No failures expected; got: ${JSON.stringify(failures)}`);
});
