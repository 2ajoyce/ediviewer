import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const samplePath = fileURLToPath(new URL('../../example_file.850', import.meta.url));

test('shows the drop-zone prompt on load with Clear disabled', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Drop Your File Here')).toBeVisible();
  await expect(page.locator('#file-viewer')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Clear' })).toBeDisabled();
});

test('Load Sample Data renders the parsed delimiters and elements', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Load Sample Data' }).click();

  await expect(page.locator('#file-viewer')).toBeVisible();
  await expect(page.getByText('Element Delimiter:')).toBeVisible();
  await expect(page.getByText('ISA-01')).toBeVisible();
});

test('Clear returns to the drop-zone prompt and disables itself', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Load Sample Data' }).click();
  await expect(page.locator('#file-viewer')).toBeVisible();

  await page.getByRole('button', { name: 'Clear' }).click();

  await expect(page.getByText('Drop Your File Here')).toBeVisible();
  await expect(page.locator('#file-viewer')).toBeHidden();
  await expect(page.locator('#file-viewer')).toBeEmpty();
  await expect(page.getByRole('button', { name: 'Clear' })).toBeDisabled();
});

test('theme toggle defaults to system preference and persists the explicit choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  const toggle = page.getByRole('checkbox', { name: 'Dark Mode' });
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  await expect(toggle).not.toBeChecked();

  await toggle.check();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toBeChecked();

  await page.reload();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('checkbox', { name: 'Dark Mode' })).toBeChecked();
});

test('dropping the sample file renders the same output as Load Sample Data', async ({ page }) => {
  const buffer = readFileSync(samplePath);

  await page.goto('/');
  const dataTransfer = await page.evaluateHandle((data) => {
    const dt = new DataTransfer();
    const file = new File([data], 'example_file.850', { type: 'text/plain' });
    dt.items.add(file);
    return dt;
  }, buffer.toString('utf8'));

  await page.dispatchEvent('#drop-zone', 'drop', { dataTransfer });

  await expect(page.locator('#file-viewer')).toBeVisible();
  await expect(page.getByText('ISA-01')).toBeVisible();
});

test('Load Sample Data disables itself and re-enables after Clear', async ({ page }) => {
  await page.goto('/');
  const loadSampleButton = page.getByRole('button', { name: 'Load Sample Data' });

  await expect(loadSampleButton).toBeEnabled();

  await loadSampleButton.click();
  await expect(page.locator('#file-viewer')).toBeVisible();
  await expect(loadSampleButton).toBeDisabled();

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(loadSampleButton).toBeEnabled();
});

test('can load, clear, and reload sample data across multiple cycles', async ({ page }) => {
  await page.goto('/');

  for (let i = 0; i < 2; i += 1) {
    await page.getByRole('button', { name: 'Load Sample Data' }).click();
    await expect(page.locator('#file-viewer')).toBeVisible();
    await expect(page.getByText('ISA-01')).toBeVisible();

    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.getByText('Drop Your File Here')).toBeVisible();
    await expect(page.locator('#file-viewer')).toBeEmpty();
  }
});

test('dragover highlights the drop-zone and dragleave clears it', async ({ page }) => {
  await page.goto('/');
  const dropZone = page.locator('#drop-zone');
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer());

  await expect(dropZone).not.toHaveClass(/dark/);

  await page.dispatchEvent('#drop-zone', 'dragover', { dataTransfer });
  await expect(dropZone).toHaveClass(/dark/);

  await page.dispatchEvent('#drop-zone', 'dragleave', { dataTransfer });
  await expect(dropZone).not.toHaveClass(/dark/);
});

test('dragover class is cleared after a drop', async ({ page }) => {
  const buffer = readFileSync(samplePath);
  await page.goto('/');
  const dropZone = page.locator('#drop-zone');
  const dataTransfer = await page.evaluateHandle((data) => {
    const dt = new DataTransfer();
    const file = new File([data], 'example_file.850', { type: 'text/plain' });
    dt.items.add(file);
    return dt;
  }, buffer.toString('utf8'));

  await page.dispatchEvent('#drop-zone', 'dragover', { dataTransfer });
  await expect(dropZone).toHaveClass(/dark/);

  await page.dispatchEvent('#drop-zone', 'drop', { dataTransfer });

  await expect(page.locator('#file-viewer')).toBeVisible();
  await expect(dropZone).not.toHaveClass(/dark/);
});

test('dropping a file with no usable items leaves the drop-zone prompt in place', async ({ page }) => {
  await page.goto('/');
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer());

  await page.dispatchEvent('#drop-zone', 'drop', { dataTransfer });

  await expect(page.getByText('Drop Your File Here')).toBeVisible();
  await expect(page.locator('#file-viewer')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Clear' })).toBeDisabled();
});

test('dropping a file that is not a valid EDI document shows an error toast', async ({ page }) => {
  await page.goto('/');
  const dataTransfer = await page.evaluateHandle(() => {
    const dt = new DataTransfer();
    const file = new File(['not an edi file'], 'not-edi.txt', { type: 'text/plain' });
    dt.items.add(file);
    return dt;
  });

  await page.dispatchEvent('#drop-zone', 'drop', { dataTransfer });

  // Parsing throws for non-ISA content; the app surfaces this as a danger
  // toast rather than showing a broken or partial viewer.
  await expect(page.getByText('Drop Your File Here')).toBeVisible();
  await expect(page.locator('#file-viewer')).toBeHidden();

  const toast = page.locator('#file-error-toast');
  await expect(toast).toHaveClass(/show/);
  await expect(toast).toHaveClass(/danger/);
  await expect(toast).toContainText('Invalid File');
});

test('theme toggle can be switched back to light after enabling dark mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  const toggle = page.getByRole('checkbox', { name: 'Dark Mode' });
  await toggle.check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await toggle.uncheck();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(toggle).not.toBeChecked();

  await page.reload();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('checkbox', { name: 'Dark Mode' })).not.toBeChecked();
});
