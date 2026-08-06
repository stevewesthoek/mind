/**
 * Tests for validate-context-gateway-observations.mjs
 *
 * Uses Node.js built-in test runner (node --test).
 * Each test creates a synthetic minimal observation set in a temp-like in-memory
 * fixture, runs the validator against it by monkey-patching fs.readFileSync/existsSync,
 * and asserts on the JSON output.
 *
 * The tests do NOT touch the real observation files.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  try {
    json = JSON.parse(result.stdout);
  } catch {
    // leave null
  }
  return { exitCode: result.status, json, stdout: result.stdout, stderr: result.stderr };
}

/**
 * Runs the validator with specific observation files substituted.
 * obsOverrides is a map of id → content string (or null to simulate missing).
 * expectationsOverride allows replacing the context-expectations.yaml content.
 */
function runWithOverrides(obsOverrides = {}, expectationsOverride = null) {
  // Write temp files
  const tmpDir = resolve(tmpdir(), `cgo-test-${Date.now()}-${Math.floor(Math.random() * 1e6)}`);
  mkdirSync(tmpDir, { recursive: true });

  // Copy real observations for IDs not overridden
  const realDir = __dirname;
  for (let id = 1; id <= 4; id++) {
    const padded = String(id).padStart(3, '0');
    const fname = `context-gateway-operational-observation-${padded}.md`;
    const destPath = resolve(tmpDir, fname);
    if (id in obsOverrides) {
      if (obsOverrides[id] === null) {
        // Don't write — simulate missing
      } else {
        writeFileSync(destPath, obsOverrides[id], 'utf8');
      }
    } else {
      const srcPath = resolve(realDir, fname);
      if (existsSync(srcPath)) {
        const src = readFileSync(srcPath, 'utf8');
        writeFileSync(destPath, src, 'utf8');
      }
    }
  }

  // Write context-expectations.yaml
  const expectPath = resolve(tmpDir, 'context-expectations.yaml');
  if (expectationsOverride !== null) {
    writeFileSync(expectPath, expectationsOverride, 'utf8');
  } else {
    const real = readFileSync(resolve(realDir, 'context-expectations.yaml'), 'utf8');
    writeFileSync(expectPath, real, 'utf8');
  }

  // Write a shimmed validator that patches __dirname to tmpDir
  const shimPath = resolve(tmpDir, 'validator-shim.mjs');
  const validatorSrc = readFileSync(
    resolve(__dirname, 'validate-context-gateway-observations.mjs'),
    'utf8',
  );
  // Replace the __dirname derivation so it points to tmpDir
  const shimmed = validatorSrc.replace(
    /const __dirname = dirname\(fileURLToPath\(import\.meta\.url\)\);/,
    `const __dirname = ${JSON.stringify(tmpDir)};`,
  );
  writeFileSync(shimPath, shimmed, 'utf8');

  const result = spawnSync(process.execPath, [shimPath], { encoding: 'utf8' });

  // Cleanup
  try {
    rmSync(tmpDir, { recursive: true, force: true });
  } catch {
    // ignore cleanup failures
  }

  let json = null;
  try {
    json = JSON.parse(result.stdout);
  } catch {
    // leave null
  }
  return { exitCode: result.status, json, stdout: result.stdout, stderr: result.stderr };
}

// Need readFileSync for the test helper
import { readFileSync } from 'node:fs';

// ────────────────────────────────────────────────────────────────────────────
// Test: valid ledger (real files) — must pass with exit 0
// ────────────────────────────────────────────────────────────────────────────
test('valid ledger passes with exit 0', () => {
  const { exitCode, json } = runRealValidator();
  assert.equal(exitCode, 0, `Validator should exit 0 on valid ledger, stderr: ${json?.failCount}`);
  assert.ok(json, 'Should produce JSON output');
  assert.equal(json.passed, true, `Validator should report passed=true; failures: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
  assert.equal(json.failCount, 0, `No failures expected; got: ${JSON.stringify(json?.results?.filter(r => r.status === 'FAIL'))}`);
});

// ────────────────────────────────────────────────────────────────────────────
// Test: wrong date in observation 003 — must fail
// ────────────────────────────────────────────────────────────────────────────
test('wrong date in observation 003 fails', () => {
  const real003 = readFileSync(
    resolve(__dirname, 'context-gateway-operational-observation-003.md'),
    'utf8',
  );
  // Replace the correct date 2026-08-05 with a wrong one
  const modified = real003.replace(/2026-08-05/g, '2026-09-01');
  const { exitCode, json } = runWithOverrides({ 3: modified });
  assert.notEqual(exitCode, 0, 'Should exit nonzero when obs 003 date is wrong');
  assert.ok(json, 'Should produce JSON output');
  assert.equal(json.passed, false, 'Should report passed=false');
  const dateFail = json.results.find(
    (r) => r.status === 'FAIL' && r.check === 'obs-3-date',
  );
  assert.ok(dateFail, 'Should have obs-3-date failure');
});

// ────────────────────────────────────────────────────────────────────────────
// Test: wrong qualifying count — must fail
// ────────────────────────────────────────────────────────────────────────────
test('wrong qualifying count in observation 004 fails', () => {
  const real004 = readFileSync(
    resolve(__dirname, 'context-gateway-operational-observation-004.md'),
    'utf8',
  );
  // Change "3 of 10" to "4 of 10"
  const modified = real004.replace(/3\s*of\s*10/gi, '4 of 10');
  const { exitCode, json } = runWithOverrides({ 4: modified });
  assert.notEqual(exitCode, 0, 'Should exit nonzero when qualifying count is wrong');
  assert.equal(json.passed, false);
  const fail = json.results.find(
    (r) => r.status === 'FAIL' && r.check === 'obs-004-accounting-completed',
  );
  assert.ok(fail, 'Should fail obs-004-accounting-completed check');
});

// ────────────────────────────────────────────────────────────────────────────
// Test: observation 001 marked as qualifying (counting) — must fail
// ────────────────────────────────────────────────────────────────────────────
test('observation 001 marked qualifying fails', () => {
  const real001 = readFileSync(
    resolve(__dirname, 'context-gateway-operational-observation-001.md'),
    'utf8',
  );
  // Replace fixture-only indication — add "qualifying live" text without non-counting context
  const modified = real001.replace(/fixture.only/gi, 'qualifying-live');
  const { exitCode, json } = runWithOverrides({ 1: modified });
  assert.notEqual(exitCode, 0, 'Should exit nonzero if obs 001 appears qualifying');
  assert.equal(json.passed, false);
  const fail = json.results.find(
    (r) => r.status === 'FAIL' && (r.check === 'obs-001-fixture-only' || r.check === 'obs-001-not-counting'),
  );
  assert.ok(fail, 'Should fail obs-001-fixture-only or obs-001-not-counting check');
});

// ────────────────────────────────────────────────────────────────────────────
// Test: wrong incident type in observation 002 — must fail
// ────────────────────────────────────────────────────────────────────────────
test('wrong incident type in observation 002 fails', () => {
  const real002 = readFileSync(
    resolve(__dirname, 'context-gateway-operational-observation-002.md'),
    'utf8',
  );
  // Remove all "authority" to break the retrieval-authority incident pattern
  const modified = real002.replace(/retrieval.authority/gi, 'retrieval-NOTHING');
  const { exitCode, json } = runWithOverrides({ 2: modified });
  assert.notEqual(exitCode, 0, 'Should exit nonzero when obs 002 incident type is wrong');
  assert.equal(json.passed, false);
  const fail = json.results.find(
    (r) => r.status === 'FAIL' && r.check === 'obs-2-incident-type',
  );
  assert.ok(fail, 'Should fail obs-2-incident-type check');
});

// ────────────────────────────────────────────────────────────────────────────
// Test: embedded self-SHA — must fail
// ────────────────────────────────────────────────────────────────────────────
test('observation with embedded self-referencing commit SHA fails', () => {
  const real004 = readFileSync(
    resolve(__dirname, 'context-gateway-operational-observation-004.md'),
    'utf8',
  );
  // Inject a self-referencing SHA
  const fakeSha = 'a'.repeat(40);
  const modified =
    real004 +
    `\n\n<!-- Final commit SHA for this file: ${fakeSha} -->`;
  // We need to match the detectSelfHash patterns — use one of the explicit patterns
  const injected =
    real004 + `\nFinal commit SHA: ${fakeSha}\n`;
  const { exitCode, json } = runWithOverrides({ 4: injected });
  assert.notEqual(exitCode, 0, 'Should exit nonzero when a self-hash is detected');
  assert.equal(json.passed, false);
  const fail = json.results.find(
    (r) => r.status === 'FAIL' && r.check === 'obs-4-no-self-hash',
  );
  assert.ok(fail, 'Should fail obs-4-no-self-hash check');
});

// ────────────────────────────────────────────────────────────────────────────
// Test: CTX-CON-006 forbidden source missing from expectations — must fail
// ────────────────────────────────────────────────────────────────────────────
test('missing forbidden source in CTX-CON-006 expectations fails', () => {
  const realExpectations = readFileSync(
    resolve(__dirname, 'context-expectations.yaml'),
    'utf8',
  );
  // Remove the forbidden source entry for system/templates/area.md
  const modified = realExpectations.replace(
    /.*system\/templates\/area\.md.*/g,
    '',
  );
  const { exitCode, json } = runWithOverrides({}, modified);
  assert.notEqual(exitCode, 0, 'Should exit nonzero when forbidden source is missing');
  assert.equal(json.passed, false);
  const fail = json.results.find(
    (r) => r.status === 'FAIL' && r.check === 'ctx-con-006-forbidden-source',
  );
  assert.ok(fail, 'Should fail ctx-con-006-forbidden-source check');
});
