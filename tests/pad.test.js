import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pad } from '../src/pad.js';

test('pad zero-pads a string to the given length', () => {
  assert.equal(pad('1', 2), '01');
  assert.equal(pad('12', 2), '12');
  assert.equal(pad('123', 2), '123');
});
