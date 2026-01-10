import { test } from '@playwright/test';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
];

test.describe('visual capture', () => {
  for (const viewport of viewports) {
    test(`full page - ${viewport.name}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.getByTestId('main-content').waitFor();
      await page.evaluate(() => document.fonts.ready);

      const screenshotPath = testInfo.outputPath(`full-page-${viewport.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      await testInfo.attach(`full-page-${viewport.name}`, {
        path: screenshotPath,
        contentType: 'image/png',
      });
    });
  }
});
