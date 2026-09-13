import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  THEME_STORAGE_KEY,
  getStoredTheme,
  setStoredTheme,
  getSystemTheme,
  resolveTheme,
  initThemeToggle,
} from '../src/theme.js';

function withLocalStorage(store, fn) {
  const original = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => {
      store[key] = value;
    },
  };
  try {
    return fn();
  } finally {
    globalThis.localStorage = original;
  }
}

test('getStoredTheme returns the stored value', () => {
  withLocalStorage({ [THEME_STORAGE_KEY]: 'dark' }, () => {
    assert.equal(getStoredTheme(), 'dark');
  });
});

test('getStoredTheme returns null when localStorage throws', () => {
  const original = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: () => {
      throw new Error('blocked');
    },
  };
  try {
    assert.equal(getStoredTheme(), null);
  } finally {
    globalThis.localStorage = original;
  }
});

test('setStoredTheme writes the value and swallows storage errors', () => {
  const store = {};
  withLocalStorage(store, () => {
    setStoredTheme('dark');
    assert.equal(store[THEME_STORAGE_KEY], 'dark');
  });

  const original = globalThis.localStorage;
  globalThis.localStorage = {
    setItem: () => {
      throw new Error('blocked');
    },
  };
  try {
    assert.doesNotThrow(() => setStoredTheme('light'));
  } finally {
    globalThis.localStorage = original;
  }
});

test('getSystemTheme reflects the media query match', () => {
  const original = globalThis.window;
  globalThis.window = { matchMedia: () => ({ matches: true }) };
  try {
    assert.equal(getSystemTheme(), 'dark');
  } finally {
    globalThis.window = original;
  }
});

test('resolveTheme prefers a valid stored theme over the system theme', () => {
  assert.equal(resolveTheme('dark', 'light'), 'dark');
  assert.equal(resolveTheme('light', 'dark'), 'light');
  assert.equal(resolveTheme(null, 'dark'), 'dark');
  assert.equal(resolveTheme('bogus', 'light'), 'light');
});

test('initThemeToggle applies the stored theme and persists changes on toggle', () => {
  const store = { [THEME_STORAGE_KEY]: 'dark' };
  const attributes = {};
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;
  globalThis.document = {
    documentElement: {
      setAttribute: (name, value) => {
        attributes[name] = value;
      },
    },
  };
  globalThis.window = { matchMedia: () => ({ matches: false }) };

  withLocalStorage(store, () => {
    const listeners = {};
    const checkbox = {
      checked: false,
      addEventListener: (event, handler) => {
        listeners[event] = handler;
      },
    };

    initThemeToggle(checkbox);

    assert.equal(attributes['data-theme'], 'dark');
    assert.equal(checkbox.checked, true);

    checkbox.checked = false;
    listeners.change();

    assert.equal(attributes['data-theme'], 'light');
    assert.equal(store[THEME_STORAGE_KEY], 'light');
  });

  globalThis.document = originalDocument;
  globalThis.window = originalWindow;
});
