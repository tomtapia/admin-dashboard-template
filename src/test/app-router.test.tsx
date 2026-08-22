import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/test-app";
import { defaultSession } from "@/mocks/data";

describe("app routing", () => {
  it("shows a theme switcher and persists the selected theme", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));

    renderApp({ initialEntries: ["/app/overview"] });

    await screen.findByText(/dashboard overview/i);
    await user.click(screen.getByRole("button", { name: /theme switcher/i }));
    const midnightOption = await screen.findByRole("menuitemradio", { name: /midnight ops/i });
    await user.click(midnightOption);

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("midnight-ops");
      expect(window.localStorage.getItem("admin-dashboard-theme")).toBe("midnight-ops");
    });
  });

  it("redirects protected routes to login when there is no session", async () => {
    renderApp({ initialEntries: ["/app/overview"] });

    expect(await screen.findByText(/mock sign in/i)).toBeInTheDocument();
  });

  it("renders a skip link for authenticated routes", async () => {
    window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));

    renderApp({ initialEntries: ["/app/overview"] });

    expect(await screen.findByRole("link", { name: /skip to main content/i })).toBeInTheDocument();
  });

  it("logs in and reaches the overview page", async () => {
    const user = userEvent.setup();
    renderApp({ initialEntries: ["/login"] });

    await user.click(screen.getByRole("button", { name: /enter dashboard/i }));

    expect(
      await screen.findByText(/dashboard overview/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  });

  it("renders the denser overview modules for an authenticated session", async () => {
    window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));

    renderApp({ initialEntries: ["/app/overview"] });

    expect(await screen.findByText(/monthly sales & revenue/i)).toBeInTheDocument();
    expect(await screen.findByText(/recent transactions/i)).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: /platform activity/i })).toBeInTheDocument();
  });

  it("renders the users table for an authenticated session", async () => {
    window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));

    renderApp({ initialEntries: ["/app/users"] });

    expect(await screen.findByText(/access control and roster visibility/i)).toBeInTheDocument();
    expect((await screen.findAllByText("Jules Carter")).length).toBeGreaterThan(0);
    expect(await screen.findByRole("searchbox", { name: /search users/i })).toBeInTheDocument();
    expect(
      (await screen.findAllByRole("button", { name: /open actions for avery stone/i })).length,
    ).toBeGreaterThan(0);
  });

  it("loads settings and submits the form", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));

    renderApp({ initialEntries: ["/app/settings"] });

    const companyName = await screen.findByLabelText(/company name/i);
    await user.clear(companyName);
    await user.type(companyName, "Northstar Labs");
    await user.click(screen.getByRole("button", { name: /save settings/i }));

    await waitFor(() => {
      expect(screen.getByText(/settings updated/i)).toBeInTheDocument();
    });
  });
});
