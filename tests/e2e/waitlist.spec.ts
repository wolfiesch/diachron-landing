import { expect, test } from '@playwright/test';

const formspreePattern = 'https://formspree.io/f/**';

test('waitlist form submits successfully', async ({ page }) => {
  let payload: { email?: string } | null = null;

  await page.route(formspreePattern, async (route) => {
    payload = route.request().postDataJSON() as { email?: string };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto('/');

  const emailInput = page.getByTestId('waitlist-hero-email');
  const submitButton = page.getByTestId('waitlist-hero-submit');

  await expect(submitButton).toBeDisabled();
  await emailInput.fill('test@example.com');
  await expect(submitButton).toBeEnabled();

  await submitButton.click();
  await expect(page.getByTestId('waitlist-hero-success')).toBeVisible();

  expect(payload?.email).toBe('test@example.com');
});

test('waitlist form shows an error on failure', async ({ page }) => {
  await page.route(formspreePattern, async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Invalid email address' }),
    });
  });

  await page.goto('/');

  await page.getByTestId('waitlist-hero-email').fill('fail@example.com');
  await page.getByTestId('waitlist-hero-submit').click();

  await expect(page.getByTestId('waitlist-hero-error')).toContainText(
    'Invalid email address',
  );
});
