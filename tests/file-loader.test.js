import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileAsText } from '../src/file-loader.js';

function withFileReader(behavior, fn) {
  const original = globalThis.FileReader;
  globalThis.FileReader = class {
    readAsText() {
      queueMicrotask(() => behavior(this));
    }
  };
  return fn().finally(() => {
    globalThis.FileReader = original;
  });
}

test('readFileAsText resolves with the string contents on load', async () => {
  await withFileReader((reader) => {
    reader.result = 'ISA*hello';
    reader.onload();
  }, async () => {
    const text = await readFileAsText({});
    assert.equal(text, 'ISA*hello');
  });
});

test('readFileAsText rejects when the result is not a string', async () => {
  await withFileReader((reader) => {
    reader.result = new ArrayBuffer(0);
    reader.onload();
  }, async () => {
    await assert.rejects(() => readFileAsText({}));
  });
});

test('readFileAsText rejects when the reader errors', async () => {
  await withFileReader((reader) => {
    reader.error = new Error('read failed');
    reader.onerror();
  }, async () => {
    await assert.rejects(() => readFileAsText({}), /read failed/);
  });
});
