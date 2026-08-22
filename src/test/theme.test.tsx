import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/test-app";
import { defaultSession } from "@/mocks/data";

describe("theme switching", () => {
  it("applies and persists each available theme", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("admin-dashboard-template:session", JSON.stringify(defaultSession));
    renderApp({ initialEntries: ["/app/overview"] });

    await screen.findByText(/dashboard overview/i);

    const themes: [string, string][] = [
      ["Midnight Ops", "midnight-ops"],
      ["Sunset Ember", "sunset-ember"],
      ["Forest Deep", "forest-deep"],
      ["Core Light", "oneui-ash"],
    ];

    for (const [label, id] of themes) {
      await user.click(screen.getByRole("button", { name: /theme switcher/i }));
      await user.click(screen.getByRole("menuitemradio", { name: new RegExp(label, "i") }));
      await waitFor(() => expect(document.documentElement.dataset.theme).toBe(id));
      await waitFor(() => expect(window.localStorage.getItem("admin-dashboard-theme")).toBe(id));
      await user.keyboard("{Escape}");
    }
  });
});
