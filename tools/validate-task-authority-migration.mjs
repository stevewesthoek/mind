#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const repoRoot = resolve(new URL('..', import.meta.url).pathname);
const contractPath = resolve(repoRoot, 'system/task-authority-migration-contract.json');
const recordFields = [
  'id', 'rawText', 'title', 'status', 'checked', 'tags', 'priority', 'owner',
  'project', 'dependencies', 'completedAt', 'createdAt', 'updatedAt', 'subtasks',
  'order', 'sourceLocation',
];
const subtaskFields = ['text', 'checked', 'tags', 'completedAt'];
const orderFields = ['column', 'ordinal'];
const sourceLocationFields = ['path', 'line'];

function stable(value) {
  return JSON.stringify(value);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertExactKeys(value, allowed, label) {
  assert(value && typeof value === 'object' && !Array.isArray(value), `${label} must be an object`);
  const unknown = Object.keys(value).filter(key => !allowed.includes(key));
  assert(unknown.length === 0, `${label} contains unsupported field(s): ${unknown.join(', ')}`);
  const missing = allowed.filter(key => !(key in value));
  assert(missing.length === 0, `${label} is missing field(s): ${missing.join(', ')}`);
}

export function validateRecords(records, contract, label) {
  assert(Array.isArray(records), `${label} must be an array`);
  const ids = new Set();
  for (const [index, record] of records.entries()) {
    const prefix = `${label}[${index}]`;
    assertExactKeys(record, recordFields, prefix);
    assert(typeof record.id === 'string' && /^task-[a-z0-9-]+$/.test(record.id), `${prefix}.id must be a stable task-* ID`);
    assert(!ids.has(record.id), `${label} has duplicate stable ID: ${record.id}`);
    ids.add(record.id);
    assert(typeof record.rawText === 'string', `${prefix}.rawText must be preserved text`);
    assert(typeof record.title === 'string', `${prefix}.title must be preserved text`);
    assert(contract.allowedStatusValues.includes(record.status), `${prefix}.status is unsupported: ${record.status}`);
    assert(typeof record.checked === 'boolean', `${prefix}.checked must be boolean`);
    assert(Array.isArray(record.tags) && record.tags.every(tag => typeof tag === 'string'), `${prefix}.tags must be strings`);
    assert(record.priority === null || typeof record.priority === 'string', `${prefix}.priority must be string or null`);
    assert(record.owner === null || typeof record.owner === 'string', `${prefix}.owner must be string or null`);
    assert(record.project === null || typeof record.project === 'string', `${prefix}.project must be string or null`);
    assert(Array.isArray(record.dependencies) && record.dependencies.every(id => typeof id === 'string'), `${prefix}.dependencies must be IDs`);
    for (const field of ['completedAt', 'createdAt', 'updatedAt']) assert(record[field] === null || typeof record[field] === 'string', `${prefix}.${field} must be string or null`);
    assert(Array.isArray(record.subtasks), `${prefix}.subtasks must be an array`);
    for (const [subIndex, subtask] of record.subtasks.entries()) {
      assertExactKeys(subtask, subtaskFields, `${prefix}.subtasks[${subIndex}]`);
      assert(typeof subtask.text === 'string' && typeof subtask.checked === 'boolean', `${prefix}.subtasks[${subIndex}] has invalid content`);
      assert(Array.isArray(subtask.tags) && subtask.tags.every(tag => typeof tag === 'string'), `${prefix}.subtasks[${subIndex}].tags must be strings`);
      assert(subtask.completedAt === null || typeof subtask.completedAt === 'string', `${prefix}.subtasks[${subIndex}].completedAt must be string or null`);
    }
    assertExactKeys(record.order, orderFields, `${prefix}.order`);
    assert(typeof record.order.column === 'string' && Number.isInteger(record.order.ordinal) && record.order.ordinal >= 0, `${prefix}.order is invalid`);
    assertExactKeys(record.sourceLocation, sourceLocationFields, `${prefix}.sourceLocation`);
    assert(typeof record.sourceLocation.path === 'string' && Number.isInteger(record.sourceLocation.line) && record.sourceLocation.line > 0, `${prefix}.sourceLocation is invalid`);
  }
}

function resolveStage(value, source, stage) {
  if (value === 'COPY_SOURCE') return structuredClone(source);
  assert(Array.isArray(value), `${stage} must be records or COPY_SOURCE`);
  return value;
}

function assertEquivalent(source, candidate, label) {
  assert(source.length === candidate.length, `${label} task count differs: source=${source.length}; candidate=${candidate.length}`);
  for (const [index, sourceRecord] of source.entries()) {
    const candidateRecord = candidate[index];
    assert(candidateRecord && candidateRecord.id === sourceRecord.id, `${label} ID/order differs at index ${index}`);
    assert(stable(candidateRecord) === stable(sourceRecord), `${label} changes authoritative fields for ${sourceRecord.id}`);
  }
}

export async function validateFixturePath(path) {
  const [fixture, contract] = await Promise.all([
    readFile(resolve(repoRoot, path), 'utf8').then(JSON.parse),
    readFile(contractPath, 'utf8').then(JSON.parse),
  ]);
  const source = fixture.source;
  const destination = resolveStage(fixture.destination, source, 'destination');
  const roundTrip = resolveStage(fixture.roundTrip, source, 'roundTrip');
  const secondRun = resolveStage(fixture.secondRun, source, 'secondRun');
  const rollback = resolveStage(fixture.rollback, source, 'rollback');
  validateRecords(source, contract, 'source');
  validateRecords(destination, contract, 'destination');
  validateRecords(roundTrip, contract, 'roundTrip');
  validateRecords(secondRun, contract, 'secondRun');
  validateRecords(rollback, contract, 'rollback');
  assertEquivalent(source, destination, 'lossless migration');
  assertEquivalent(source, roundTrip, 'round-trip');
  assertEquivalent(destination, secondRun, 'idempotent second run');
  assertEquivalent(source, rollback, 'rollback');
  return { taskCount: source.length };
}

async function dryRun() {
  const contract = JSON.parse(await readFile(contractPath, 'utf8'));
  if (!contract.futureAuthority) {
    console.error('migration=blocked; reason=future_authority_unresolved; live_content_changed=false');
    process.exitCode = 2;
    return;
  }
  console.log('migration=ready; live_content_changed=false');
}

async function main(argv) {
  const [command, value] = argv;
  if (command === 'validate-fixture' && value) {
    const result = await validateFixturePath(value);
    console.log(`fixture=pass; tasks=${result.taskCount}; lossless=true; round_trip=true; idempotent=true; rollback=true`);
    return;
  }
  if (command === 'dry-run' && !value) return dryRun();
  console.error('Usage: node tools/validate-task-authority-migration.mjs validate-fixture <fixture.json> | dry-run');
  process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(`migration=failed; reason=${error.message}`);
    process.exitCode = 1;
  });
}
