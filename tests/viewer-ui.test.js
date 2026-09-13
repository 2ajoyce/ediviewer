import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resetView, renderEdiFile } from '../src/viewer-ui.js';

class FakeElement {
  constructor(tag) {
    this.tagName = tag;
    this.children = [];
    this.className = '';
    this.hidden = false;
    this.disabled = false;
    this._textContent = '';
  }

  set textContent(value) {
    this._textContent = value;
    this.children = [];
  }

  get textContent() {
    return this._textContent + this.children.map((c) => c.textContent).join('');
  }

  appendChild(el) {
    this.children.push(el);
    return el;
  }

  append(...els) {
    els.forEach((el) => this.appendChild(el));
  }
}

function withFakeDocument(fn) {
  const original = globalThis.document;
  globalThis.document = { createElement: (tag) => new FakeElement(tag) };
  try {
    return fn();
  } finally {
    globalThis.document = original;
  }
}

function makeUi() {
  return {
    dropZone: new FakeElement('section'),
    results: new FakeElement('div'),
    viewer: new FakeElement('div'),
    clearButton: new FakeElement('button'),
    loadSampleButton: new FakeElement('button'),
  };
}

test('resetView hides results and clears the viewer', () => {
  const ui = makeUi();
  ui.dropZone.hidden = true;
  ui.results.hidden = false;
  ui.viewer.textContent = 'stale content';
  ui.clearButton.disabled = false;
  ui.loadSampleButton.disabled = true;

  resetView(ui);

  assert.equal(ui.dropZone.hidden, false);
  assert.equal(ui.results.hidden, true);
  assert.equal(ui.viewer.textContent, '');
  assert.equal(ui.clearButton.disabled, true);
  assert.equal(ui.loadSampleButton.disabled, false);
});

test('renderEdiFile shows the results and populates the viewer', () => {
  withFakeDocument(() => {
    const ui = makeUi();
    ui.dropZone.hidden = false;
    ui.results.hidden = true;

    renderEdiFile(ui, {
      elementDelimiter: '*',
      componentSeparator: '>',
      segmentDelimiter: '~',
      elements: [
        { ref: 'ISA', index: 1, data: '00', segment: 0 },
        { ref: 'ISA', index: 2, data: '  ', segment: 0 },
        { ref: 'GS', index: 1, data: 'PO', segment: 1 },
      ],
    });

    assert.equal(ui.dropZone.hidden, true);
    assert.equal(ui.results.hidden, false);
    assert.equal(ui.clearButton.disabled, false);
    assert.equal(ui.loadSampleButton.disabled, true);

    const text = ui.viewer.textContent;
    assert.match(text, /Element Delimiter:.*\*/);
    assert.match(text, /Component Separator:.*>/);
    assert.match(text, /Segment Delimiter:.*~/);
    assert.match(text, /ISA-01.*00/);
    assert.match(text, /GS-01.*PO/);

    const [summary, elements] = ui.viewer.children;
    assert.equal(summary.className, 'summary');
    assert.equal(elements.className, 'elements');
    assert.equal(elements.children.length, 2, 'one segment-group per distinct segment');
  });
});
