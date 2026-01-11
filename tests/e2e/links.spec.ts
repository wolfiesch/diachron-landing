import { expect, test } from "@playwright/test";

test("github link points to the repository", async ({ page }) => {
  await page.goto("/");

  const link = page.getByTestId("github-link");
  await expect(link).toHaveAttribute(
    "href",
    "https://github.com/wolfiesch/diachron"
  );
  await expect(link).toHaveAttribute("target", "_blank");

  const rel = await link.getAttribute("rel");
  expect(rel).toContain("noopener");
  expect(rel).toContain("noreferrer");
});

test("pricing anchor link points to pricing section", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: /pricing/i }).first();
  await expect(link).toHaveAttribute("href", "/#pricing");

  await link.click();
  await expect(page).toHaveURL(/.*#pricing/);
  await expect(page.getByTestId("pricing-section")).toBeInViewport();
});

test("get started anchor link points to hero waitlist", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: /get started/i });
  await expect(link).toHaveAttribute("href", "/#waitlist");

  await link.click();
  await expect(page).toHaveURL(/.*#waitlist/);
  await expect(page.getByTestId("hero-section")).toBeInViewport();
});
