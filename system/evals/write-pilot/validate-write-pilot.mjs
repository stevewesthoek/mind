import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const fixtureDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(fixtureDir, '..', '..', '..');
const targetPath = 'system/evals/write-pilot/synthetic-frontmatter-target.md';
const fixedNow = new Date('2026-07-31T12:30:00.000Z');
const expiredNow = new Date('2026-08-01T12:00:00.001Z');
const forbiddenModelFields = new Set([
  'approvalId',
  'approvedBy',
  'approvedAt',
  'expiresAt',
  'authorization',
  'files',
  'rollback',
]);

const readText = (name) => fs.readFileSync(path.join(fixtureDir, name), 'utf8');
const readJson = (name) => JSON.parse(readText(name));
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const canonicalJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
};

class FixtureError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

function normalizeRepositoryPath(input) {
  if (!input || input.includes('\\')) throw new FixtureError('invalid_path');
  const normalized = path.posix.normalize(input);
  if (
    normalized !== input ||
    normalized.startsWith('../') ||
    normalized.startsWith('/') ||
    normalized === '..'
  ) {
    throw new FixtureError('path_scope_mismatch');
  }
  return normalized;
}

function validateSections(requested, allowed) {
  if (requested.length === 0) throw new FixtureError('missing_section_scope');
  for (const section of requested) {
    if (
      !Number.isInteger(section.startLine) ||
      !Number.isInteger(section.endLine) ||
      section.startLine < 1 ||
      section.endLine < section.startLine
    ) {
      throw new FixtureError('invalid_section_scope');
    }
    if (
      !allowed.some(
        (candidate) =>
          section.startLine >= candidate.startLine && section.endLine <= candidate.endLine,
      )
    ) {
      throw new FixtureError('section_scope_mismatch');
    }
  }
}

function validateExactScopeApproval(approval, proposal, now) {
  if (!approval.approvalId || !approval.approvedBy) {
    throw new FixtureError('missing_trusted_approval_identity');
  }
  if (Date.parse(approval.approvedAt) > now.getTime()) {
    throw new FixtureError('approval_not_yet_valid');
  }
  if (Date.parse(approval.expiresAt) <= now.getTime()) {
    throw new FixtureError('approval_expired');
  }
  if (proposal.idempotencyKey !== approval.idempotencyKey) {
    throw new FixtureError('idempotency_scope_mismatch');
  }
  if (proposal.rollbackRequired !== true) throw new FixtureError('rollback_required');
  for (const key of Object.keys(proposal.modelSupplied ?? {})) {
    if (forbiddenModelFields.has(key)) throw new FixtureError('model_supplied_authorization');
  }
  if (proposal.changes.length !== approval.files.length) {
    throw new FixtureError('file_scope_mismatch');
  }

  const approvedByPath = new Map(
    approval.files.map((file) => [normalizeRepositoryPath(file.path), file]),
  );
  for (const change of proposal.changes) {
    const requestedPath = normalizeRepositoryPath(change.path);
    const allowed = approvedByPath.get(requestedPath);
    if (!allowed) throw new FixtureError('file_scope_mismatch');
    if (change.beforeHash !== allowed.beforeHash) {
      throw new FixtureError('before_hash_mismatch');
    }
    validateSections(change.sections, allowed.sections);
    const rollback = approval.rollback[requestedPath];
    if (
      !rollback ||
      rollback.required !== true ||
      rollback.strategy !== 'restore-before-content' ||
      rollback.beforeHash !== allowed.beforeHash
    ) {
      throw new FixtureError('rollback_scope_mismatch');
    }
  }

  return sha256(
    canonicalJson({
      approvalId: approval.approvalId,
      idempotencyKey: approval.idempotencyKey,
      files: approval.files,
      rollback: approval.rollback,
    }),
  );
}

function applyFixture({ approval, proposal, contents, consumed, now }) {
  const scopeHash = validateExactScopeApproval(approval, proposal, now);
  const existing = consumed.get(proposal.idempotencyKey);
  const afterHashes = proposal.changes.map((change) => sha256(change.afterContent));
  if (existing) {
    if (
      existing.scopeHash !== scopeHash ||
      existing.files.some((file, index) => file.afterHash !== afterHashes[index])
    ) {
      throw new FixtureError('idempotency_conflict');
    }
    return { ...existing, status: 'idempotent-replay' };
  }

  const files = proposal.changes.map((change) => {
    const current = contents.get(change.path) ?? null;
    const currentHash = current === null ? null : sha256(current);
    if (currentHash !== change.beforeHash) {
      throw new FixtureError('repository_state_changed');
    }
    contents.set(change.path, change.afterContent);
    return {
      path: change.path,
      beforeHash: change.beforeHash,
      afterHash: sha256(change.afterContent),
      sections: change.sections,
      rollback: approval.rollback[change.path],
    };
  });

  const receipt = {
    status: 'applied',
    approvalId: approval.approvalId,
    idempotencyKey: proposal.idempotencyKey,
    scopeHash,
    files,
  };
  consumed.set(proposal.idempotencyKey, receipt);
  return receipt;
}

function expectCode(action, expectedCode) {
  let observed = null;
  try {
    action();
  } catch (error) {
    observed = error.code ?? error.message;
  }
  assert.equal(observed, expectedCode);
}

const target = fs.readFileSync(path.join(repoRoot, targetPath), 'utf8');
const before = readText('before.md');
const expectedAfter = readText('expected-after.md');
const expectedRollback = readText('expected-rollback.md');
const proposal = readJson('approved-proposal.json');
const approval = readJson('exact-scope-approval.json');
const expectedApplyReceipt = readJson('expected-apply-receipt.json');
const expectedReplayReceipt = readJson('expected-idempotent-replay-receipt.json');
const expectedExpiry = readJson('expected-expiry-rejection.json');
const expectedRollbackProof = readJson('expected-rollback-proof.json');

assert.equal(target, before);
assert.equal(before, expectedRollback);
assert.equal(proposal.changes.length, 1);
assert.equal(proposal.changes[0].path, targetPath);
assert.equal(proposal.changes[0].afterContent, expectedAfter);
assert.equal(sha256(before), proposal.changes[0].beforeHash);
assert.equal(sha256(before), approval.files[0].beforeHash);
assert.equal(sha256(expectedAfter), expectedApplyReceipt.files[0].afterHash);

const beforeLines = before.split('\n');
const afterLines = expectedAfter.split('\n');
const changedLines = beforeLines
  .map((line, index) => (line === afterLines[index] ? null : index + 1))
  .filter((line) => line !== null);
assert.deepEqual(changedLines, [4, 5]);
assert.deepEqual(proposal.changes[0].sections, [{ startLine: 4, endLine: 5 }]);

const scopeHash = validateExactScopeApproval(approval, proposal, fixedNow);
assert.equal(scopeHash, expectedApplyReceipt.scopeHash);
assert.equal(scopeHash, expectedReplayReceipt.scopeHash);

const contents = new Map([[targetPath, before]]);
const consumed = new Map();
const applyReceipt = applyFixture({ approval, proposal, contents, consumed, now: fixedNow });
assert.deepEqual(applyReceipt, expectedApplyReceipt);
assert.equal(contents.get(targetPath), expectedAfter);

const replayReceipt = applyFixture({ approval, proposal, contents, consumed, now: fixedNow });
assert.deepEqual(replayReceipt, expectedReplayReceipt);
assert.equal(contents.get(targetPath), expectedAfter);

const conflictingProposal = structuredClone(proposal);
conflictingProposal.changes[0].afterContent = `${expectedAfter}\n`;
expectCode(
  () => applyFixture({ approval, proposal: conflictingProposal, contents, consumed, now: fixedNow }),
  'idempotency_conflict',
);

expectCode(() => validateExactScopeApproval(approval, proposal, expiredNow), 'approval_expired');
assert.equal(expectedExpiry.code, 'approval_expired');
assert.equal(expectedExpiry.evaluatedAt, expiredNow.toISOString());
assert.equal(expectedExpiry.expiresAt, approval.expiresAt);

const staleProposal = structuredClone(proposal);
staleProposal.changes[0].beforeHash = '0'.repeat(64);
expectCode(() => validateExactScopeApproval(approval, staleProposal, fixedNow), 'before_hash_mismatch');

const outOfScopeProposal = structuredClone(proposal);
outOfScopeProposal.changes[0].sections = [{ startLine: 4, endLine: 6 }];
expectCode(
  () => validateExactScopeApproval(approval, outOfScopeProposal, fixedNow),
  'section_scope_mismatch',
);

const traversalProposal = structuredClone(proposal);
traversalProposal.changes[0].path = '../synthetic-frontmatter-target.md';
expectCode(() => validateExactScopeApproval(approval, traversalProposal, fixedNow), 'path_scope_mismatch');

const modelAuthorizedProposal = structuredClone(proposal);
modelAuthorizedProposal.modelSupplied = { approvedBy: 'model' };
expectCode(
  () => validateExactScopeApproval(approval, modelAuthorizedProposal, fixedNow),
  'model_supplied_authorization',
);

contents.set(targetPath, before);
assert.equal(contents.get(targetPath), expectedRollback);
assert.equal(sha256(contents.get(targetPath)), expectedRollbackProof.restoredHash);
assert.equal(expectedRollbackProof.restoredHash, expectedRollbackProof.expectedBeforeHash);
assert.equal(expectedRollbackProof.matchesBefore, true);
assert.equal(expectedRollbackProof.report.rollbackApplied, true);

const result = {
  status: 'passed',
  targetPath,
  beforeHash: sha256(before),
  afterHash: sha256(expectedAfter),
  scopeHash,
  changedLines,
  approvalValidAt: fixedNow.toISOString(),
  expiryRejectedAt: expiredNow.toISOString(),
  applyStatus: applyReceipt.status,
  replayStatus: replayReceipt.status,
  idempotencyConflictRejected: true,
  beforeHashMismatchRejected: true,
  sectionScopeMismatchRejected: true,
  pathTraversalRejected: true,
  modelSuppliedAuthorizationRejected: true,
  rollbackEquivalent: contents.get(targetPath) === before,
  repositoryMutated: false,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
