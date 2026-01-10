import { expect, test } from '@playwright/test';

test('github link points to the repository', async ({ page }) => {
  await page.goto('/');

  const link = page.getByTestId('github-link');
  await expect(link).toHaveAttribute('href', 'https://github.com/wolfiesch/diachron');
  await expect(link).toHaveAttribute('target', '_blank');

  const rel = await link.getAttribute('rel');
  expect(rel).toContain('noopener');
  expect(rel).toContain('noreferrer');
});
