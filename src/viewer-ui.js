import { pad } from './pad.js';

/**
 * @typedef {{dropZone: HTMLElement, results: HTMLElement, viewer: HTMLElement, clearButton: HTMLButtonElement, loadSampleButton: HTMLButtonElement}} ViewerUi
 */

/**
 * @param {ViewerUi} ui
 */
export function resetView(ui) {
  ui.dropZone.hidden = false;
  ui.results.hidden = true;
  ui.viewer.textContent = '';
  ui.clearButton.disabled = true;
  ui.loadSampleButton.disabled = false;
}

function makeLabel(text) {
  const small = document.createElement('small');
  small.textContent = text;
  return small;
}

function makeValue(text) {
  const code = document.createElement('code');
  code.textContent = text;
  return code;
}

function buildSummary(ediFile) {
  const summary = document.createElement('div');
  summary.className = 'summary';
  [
    ['Element Delimiter: ', ediFile.elementDelimiter],
    ['Component Separator: ', ediFile.componentSeparator],
    ['Segment Delimiter: ', ediFile.segmentDelimiter],
  ].forEach(([label, value]) => {
    const line = document.createElement('div');
    line.append(makeLabel(label), makeValue(value));
    summary.appendChild(line);
  });
  return summary;
}

function buildElements(ediFile) {
  const elements = document.createElement('div');
  elements.className = 'elements';
  let currentGroup = null;
  let currentSegment = null;
  ediFile.elements.forEach((element) => {
    if (currentGroup === null || element.segment !== currentSegment) {
      currentGroup = document.createElement('div');
      currentGroup.className = 'segment-group';
      currentSegment = element.segment;
      elements.appendChild(currentGroup);
    }

    const row = document.createElement('div');
    row.className = 'element-row';
    row.append(
      makeLabel(`${element.ref}-${pad(element.index.toString(), 2)} : `),
      makeValue(element.data),
    );
    currentGroup.appendChild(row);
  });
  return elements;
}

/**
 * @param {ViewerUi} ui
 * @param {import('./parser.js').EdiFile} ediFile
 */
export function renderEdiFile(ui, ediFile) {
  ui.dropZone.hidden = true;
  ui.results.hidden = false;
  ui.viewer.textContent = '';
  ui.clearButton.disabled = false;
  ui.loadSampleButton.disabled = true;

  ui.viewer.appendChild(buildSummary(ediFile));
  ui.viewer.appendChild(buildElements(ediFile));
}
