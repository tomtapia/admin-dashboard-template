import { expect, test } from "@playwright/test";
import { login } from "./helpers";

test("navigates between module pages", async ({ page }) => {
  await login(page);

  await page.getByRole("link", { name: /users/i }).click();
  await expect(page).toHaveURL(/.*\/app\/users/);
  await expect(
    page.getByRole("heading", { name: /access control and roster visibility/i }),
  ).toBeVisible();
});

test("switches the active workspace", async ({ page }) => {
  await login(page);

  await page.getByRole("button", { name: /switch tenant/i }).click();
  await page.getByRole("menuitemradio", { name: /aurora labs/i }).click();

  await page.getByRole("button", { name: /switch tenant/i }).click();
  await expect(page.getByRole("menuitemradio", { name: /aurora labs/i })).toHaveAttribute(
    "aria-checked",
    "true",
  );
});

test("switches the UI language", async ({ page }) => {
  await login(page);

  await page.getByRole("button", { name: /language/i }).click();
  await page.getByRole("menuitemradio", { name: /español/i }).click();

  await expect(page.getByRole("link", { name: /visión general/i }).first()).toBeVisible();
});

test("opens the theme palette and selects a palette", async ({ page }) => {
  await login(page);

  await page.getByRole("button", { name: /theme switcher/i }).click();
  await page.getByRole("menuitemradio", { name: /midnight ops/i }).click();

  await page.getByRole("button", { name: /theme switcher/i }).click();
  await expect(page.getByRole("menuitemradio", { name: /midnight ops/i })).toHaveAttribute(
    "aria-checked",
    "true",
  );
});
