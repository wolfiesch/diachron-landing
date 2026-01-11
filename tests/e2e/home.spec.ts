import { expect, test } from "@playwright/test";

test("homepage loads core sections", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");

  await expect(page.getByTestId("hero-section")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Git for Agent Actions/i })
  ).toBeVisible();
  await expect(page.getByTestId("problem-section")).toBeVisible();
  await expect(page.getByTestId("solution-section")).toBeVisible();
  await expect(page.getByTestId("quickstart-section")).toBeVisible();
  await expect(page.getByTestId("demo-section")).toBeVisible();
  await expect(page.getByTestId("pricing-section")).toBeVisible();
  await expect(page.getByTestId("cta-section")).toBeVisible();

  const footer = page.locator("footer");
  const year = new Date().getFullYear().toString();
  await expect(footer).toContainText(`© ${year} Diachron.`);

  expect(pageErrors, `Page errors:\n${pageErrors.join("\n")}`).toEqual([]);
});
