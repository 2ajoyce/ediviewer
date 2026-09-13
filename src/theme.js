export const THEME_STORAGE_KEY = 'theme';

/**
 * @returns {string | null}
 */
export function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * @param {string} theme
 */
export function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (e.g. private browsing) — theme still applies for this session
  }
}

/**
 * @returns {'dark' | 'light'}
 */
export function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * @param {string | null} stored
 * @param {'dark' | 'light'} systemTheme
 * @returns {'dark' | 'light'}
 */
export function resolveTheme(stored, systemTheme) {
  return stored === 'dark' || stored === 'light' ? stored : systemTheme;
}

/**
 * @param {HTMLInputElement} checkbox
 */
export function initThemeToggle(checkbox) {
  const stored = getStoredTheme();
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  }
  checkbox.checked = resolveTheme(stored, getSystemTheme()) === 'dark';

  checkbox.addEventListener('change', () => {
    const next = checkbox.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    setStoredTheme(next);
  });
}
