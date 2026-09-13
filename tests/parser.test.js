import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseEdiFile } from '../src/parser.js';

const sample = readFileSync(
  fileURLToPath(new URL('../example_file.850', import.meta.url)),
  'utf8',
);

test('parseEdiFile detects the ISA delimiters', () => {
  const result = parseEdiFile(sample);
  assert.equal(result.elementDelimiter, '*');
  assert.equal(result.componentSeparator, '>');
  assert.equal(result.segmentDelimiter, '~');
});

test('parseEdiFile emits ref/index/data for each non-empty element', () => {
  const result = parseEdiFile(sample);
  assert.ok(result.elements.length > 0);
  const first = result.elements[0];
  assert.equal(first.ref, 'ISA');
  assert.equal(first.index, 1);
});

test('parseEdiFile rejects a file that does not start with ISA', () => {
  assert.throws(() => parseEdiFile('NOT*AN*EDI*FILE'));
});
