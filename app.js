import { parseEdiFile } from './src/parser.js';
import { initThemeToggle } from './src/theme.js';
import { resetView, renderEdiFile } from './src/viewer-ui.js';
import { readFileAsText } from './src/file-loader.js';
import { showToast } from './src/toast.js';

if (typeof document !== 'undefined') {
  const ui = {
    dropZone: document.getElementById('drop-zone'),
    results: document.getElementById('results'),
    viewer: document.getElementById('file-viewer'),
    loadSampleButton: document.getElementById('load-sample'),
    clearButton: document.getElementById('clear'),
  };
  const themeToggleCheckbox = document.getElementById('theme-toggle');
  const fileErrorMessage = document.getElementById('file-error-message');

  initThemeToggle(themeToggleCheckbox);

  const showFileError = (message) => {
    fileErrorMessage.textContent = message;
    showToast('#file-error-toast');
  };

  const parseAndRender = (text) => {
    try {
      renderEdiFile(ui, parseEdiFile(text));
    } catch (err) {
      showFileError(err instanceof Error ? err.message : 'Unable to parse this file.');
    }
  };

  const loadFile = async (/** @type {File} */ file) => {
    const text = await readFileAsText(file);
    parseAndRender(text);
  };

  ui.dropZone.addEventListener('dragover', (evt) => {
    evt.preventDefault();
    ui.dropZone.classList.add('dark');
  });

  ui.dropZone.addEventListener('dragleave', (evt) => {
    evt.preventDefault();
    ui.dropZone.classList.remove('dark');
  });

  ui.dropZone.addEventListener('drop', (evt) => {
    evt.preventDefault();
    ui.dropZone.classList.remove('dark');

    const file = evt.dataTransfer?.items?.[0]?.getAsFile();
    if (file) {
      loadFile(file);
    }
    evt.dataTransfer?.items?.clear();
  });

  ui.loadSampleButton.addEventListener('click', async () => {
    const response = await fetch('example_file.850');
    const text = await response.text();
    parseAndRender(text);
  });

  ui.clearButton.addEventListener('click', () => resetView(ui));
}
