import type { Page } from "@playwright/test";

export async function login(page: Page): Promise<void> {
  await page.goto("/");
  await page.getByRole("button", { name: /enter dashboard/i }).click();
  await page.waitForURL("**/app/overview");
}
