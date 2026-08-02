import assert from 'node:assert/strict';
import test from 'node:test';
import { validateFixturePath } from './validate-task-authority-migration.mjs';

test('equivalent fixture proves lossless migration, round trip, idempotency, and rollback', async () => {
  assert.deepEqual(await validateFixturePath('tools/fixtures/task-authority-migration/equivalent.json'), { taskCount: 4 });
});

test('divergent fixture fails instead of silently changing priority', async () => {
  await assert.rejects(
    validateFixturePath('tools/fixtures/task-authority-migration/divergent-priority.json'),
    /lossless migration changes authoritative fields/,
  );
});

test('unsupported source status fails closed', async () => {
  await assert.rejects(
    validateFixturePath('tools/fixtures/task-authority-migration/unsupported-status.json'),
    /status is unsupported: focus/,
  );
});

test('unknown fields fail closed rather than being dropped', async () => {
  await assert.rejects(
    validateFixturePath('tools/fixtures/task-authority-migration/unknown-field.json'),
    /contains unsupported field\(s\): unsupported/,
  );
});

test('duplicate stable IDs fail closed', async () => {
  await assert.rejects(
    validateFixturePath('tools/fixtures/task-authority-migration/duplicate-id.json'),
    /duplicate stable ID: task-fixture-duplicate/,
  );
});

test('a missing destination task fails loss detection', async () => {
  await assert.rejects(
    validateFixturePath('tools/fixtures/task-authority-migration/missing-task.json'),
    /lossless migration task count differs: source=1; candidate=0/,
  );
});
