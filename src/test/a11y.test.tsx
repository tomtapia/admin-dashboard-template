import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";
import { expect as vitestExpect } from "vitest";
import { toHaveNoViolations } from "jest-axe";
import { renderApp } from "@/test/test-app";
import { defaultSession } from "@/mocks/data";

vitestExpect.extend(toHaveNoViolations);

describe("accessibility", () => {
  it("login page has no detectable violations", async () => {
    const { container } = renderApp({ initialEntries: ["/login"] });
    expect(await screen.findByRole("button", { name: /enter dashboard/i })).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("overview page has no detectable violations", async () => {
    window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));
    const { container } = renderApp({ initialEntries: ["/app/overview"] });
    await waitFor(() => expect(screen.getByText(/dashboard overview/i)).toBeInTheDocument());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
