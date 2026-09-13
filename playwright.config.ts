import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'node tests/e2e/serve.js',
    url: 'http://localhost:45678/index.html',
    reuseExistingServer: !process.env['CI'],
  },
  use: {
    baseURL: 'http://localhost:45678',
  },
});
