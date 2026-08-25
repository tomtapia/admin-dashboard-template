import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { defaultSession } from "@/mocks/data";
import { renderApp } from "@/test/test-app";

const seed = () =>
  window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));

describe("ui kit page", () => {
  it("renders the design system sections", async () => {
    seed();
    renderApp({ initialEntries: ["/app/ui"] });

    expect(await screen.findByRole("heading", { name: /ui kit/i, level: 1 })).toBeInTheDocument();
    for (const section of [
      /typography/i,
      /buttons/i,
      /badges/i,
      /form controls/i,
      /overlays/i,
      /loading/i,
    ]) {
      expect(screen.getByRole("heading", { name: section })).toBeInTheDocument();
    }
  });

  it("fires a toast when a button variant is clicked", async () => {
    const user = userEvent.setup();
    seed();
    renderApp({ initialEntries: ["/app/ui"] });
    await screen.findByRole("heading", { name: /buttons/i });

    await user.click(screen.getByRole("button", { name: /^outline$/i }));
    expect(await screen.findByText(/outline button clicked/i)).toBeInTheDocument();
  });

  it("toggles the switch and counts input characters", async () => {
    const user = userEvent.setup();
    seed();
    renderApp({ initialEntries: ["/app/ui"] });
    await screen.findByRole("heading", { name: /form controls/i });

    const input = screen.getByLabelText(/company name/i);
    await user.clear(input);
    await user.type(input, "Acme");
    expect(screen.getByText(/4 characters/i)).toBeInTheDocument();

    const digest = screen.getByRole("switch", { name: /weekly digest/i });
    await user.click(digest);
    expect(digest).not.toBeChecked();
  });
});
