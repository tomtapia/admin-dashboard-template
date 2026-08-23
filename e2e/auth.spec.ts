import { expect, test } from "@playwright/test";
import { login } from "./helpers";

test("signs in through the mock auth flow", async ({ page }) => {
  await login(page);

  await expect(page.getByRole("heading", { name: /dashboard overview/i })).toBeVisible();
});
