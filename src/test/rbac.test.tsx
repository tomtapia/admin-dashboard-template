import { screen } from "@testing-library/react";
import { renderApp } from "@/test/test-app";
import { defaultSession } from "@/mocks/data";
import type { Session } from "@/types";

const managerSession: Session = {
  user: {
    id: "m1",
    name: "Dana Manager",
    email: "dana@northstar.app",
    role: "Manager",
    organization: "Northstar",
  },
  isAuthenticated: true,
};

const seed = (session: Session) =>
  window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(session));

describe("role-based access control", () => {
  it("shows every nav item for an Owner session", async () => {
    seed(defaultSession);
    renderApp({ initialEntries: ["/app/overview"] });

    expect(await screen.findByRole("link", { name: /billing/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /integrations/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /team/i })).toBeInTheDocument();
  });

  it("hides role-restricted nav items for a Manager session", async () => {
    seed(managerSession);
    renderApp({ initialEntries: ["/app/overview"] });

    expect(await screen.findByText(/dashboard overview/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /billing/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /integrations/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /team/i })).not.toBeInTheDocument();
  });

  it("redirects a Manager away from a restricted route", async () => {
    seed(managerSession);
    renderApp({ initialEntries: ["/app/billing"] });

    expect(await screen.findByText(/dashboard overview/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /plans, usage and invoices/i }),
    ).not.toBeInTheDocument();
  });

  it("allows an Owner to reach a restricted route", async () => {
    seed(defaultSession);
    renderApp({ initialEntries: ["/app/billing"] });

    expect(
      await screen.findByRole("heading", { name: /plans, usage and invoices/i }),
    ).toBeInTheDocument();
  });
});
