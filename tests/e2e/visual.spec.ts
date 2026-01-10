import { expect, test } from '@playwright/test';

const snapshots = [
  {
    name: 'hero-desktop',
    viewport: { width: 1280, height: 720 },
    target: 'hero-section',
  },
  {
    name: 'pricing-desktop',
    viewport: { width: 1280, height: 720 },
    target: 'pricing-section',
  },
  {
    name: 'hero-mobile',
    viewport: { width: 375, height: 812 },
    target: 'hero-section',
  },
];

test.describe('visual snapshots', () => {
  for (const snapshot of snapshots) {
    test(snapshot.name, async ({ page }) => {
      await page.setViewportSize(snapshot.viewport);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      await expect(page.getByTestId(snapshot.target)).toHaveScreenshot(
        `${snapshot.name}.png`,
      );
    });
  }
});
