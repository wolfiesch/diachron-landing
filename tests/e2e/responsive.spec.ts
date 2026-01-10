import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 },
];

test('layout avoids horizontal overflow on common viewports', async ({ page }) => {
  for (const viewport of viewports) {
    await test.step(viewport.name, async () => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      await expect(page.getByTestId('hero-section')).toBeVisible();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth - root.clientWidth;
      });

      expect(overflow, `Horizontal overflow on ${viewport.name}`).toBeLessThanOrEqual(1);
    });
  }
});
