import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true, 
  },
  reporter: [
    ['html', { outputFolder: 'test-results/html-report', open: 'never' }], 
    ['json', { outputFile: 'test-results/report.json' }], 
    ['junit', { outputFile: 'test-results/results.xml' }], 
  ],
  outputDir: 'test-results/', 
});
