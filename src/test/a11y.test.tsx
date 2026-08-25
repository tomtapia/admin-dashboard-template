import { screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { defaultSession } from "@/mocks/data";
import { renderApp } from "@/test/test-app";

const seedSession = () => {
  window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));
};

describe("accessibility", () => {
  it("login page has no detectable violations", async () => {
    const { container } = renderApp({ initialEntries: ["/login"] });
    expect(await screen.findByRole("button", { name: /enter dashboard/i })).toBeInTheDocument();
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("overview page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/overview"] });
    await waitFor(() => expect(screen.getByText(/dashboard overview/i)).toBeInTheDocument());
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("users page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/users"] });
    await screen.findByRole("searchbox", { name: /search users/i });
    await waitFor(() =>
      expect(screen.getByText(/access control and roster visibility/i)).toBeInTheDocument(),
    );
    await waitFor(() => expect(screen.getByText(/avery stone/i)).toBeInTheDocument());
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("transactions page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/transactions"] });
    await screen.findByRole("searchbox", { name: /search transactions/i });
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("settings page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/settings"] });
    await waitFor(() =>
      expect(screen.getByText(/workspace settings without the visual noise/i)).toBeInTheDocument(),
    );
    await waitFor(() => expect(screen.getByLabelText(/company name/i)).toBeInTheDocument());
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("user settings page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/settings/user"] });
    expect(
      await screen.findByRole("heading", { name: /personalize your experience/i }),
    ).toBeInTheDocument();
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("mail page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/mail"] });
    await screen.findByRole("heading", { name: /inbox/i, level: 1 });
    await screen.findByText(/your scale plan renews/i);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("calendar page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/calendar"] });
    await screen.findByText(/sprint planning/i);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("profile page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/profile"] });
    await screen.findByText(/avery@northstar\.app/i);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("notifications page has no detectable violations", async () => {
    seedSession();
    const { container } = renderApp({ initialEntries: ["/app/notifications"] });
    await waitFor(() =>
      expect(screen.getByText(/alerts and in-app messages/i)).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        screen.queryByRole("status", { name: /loading list/i }) ?? screen.getByText(/alerts and/i),
      ).toBeInTheDocument(),
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
