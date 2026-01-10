import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no serious accessibility violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze();

  const violations = results.violations.filter(
    (violation) => violation.impact === 'critical' || violation.impact === 'serious',
  );
  const summary = violations
    .map((violation) => `${violation.id}: ${violation.nodes.length} nodes`)
    .join('\n');

  expect(violations, summary).toEqual([]);
});
