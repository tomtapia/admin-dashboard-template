import { delay, http, HttpResponse } from "msw";
import { defaultSession, overviewPayload, settingsPayload, usersPayload } from "@/mocks/data";
import type { SettingsPayload } from "@/types";

let activeSession = defaultSession;
let activeSettings = settingsPayload;

export const resetMockState = () => {
  activeSession = defaultSession;
  activeSettings = settingsPayload;
};

export const handlers = [
  http.get("/api/auth/session", async () => {
    await delay(250);
    return HttpResponse.json(activeSession);
  }),
  http.post("/api/auth/login", async () => {
    await delay(450);
    activeSession = defaultSession;
    return HttpResponse.json(activeSession);
  }),
  http.post("/api/auth/logout", async () => {
    await delay(120);
    activeSession = { ...defaultSession, isAuthenticated: false };
    return HttpResponse.json({ success: true });
  }),
  http.get("/api/dashboard/overview", async () => {
    await delay(320);
    return HttpResponse.json(overviewPayload);
  }),
  http.get("/api/users", async ({ request }) => {
    await delay(260);
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";

    if (!search) {
      return HttpResponse.json(usersPayload);
    }

    return HttpResponse.json(
      usersPayload.filter((user) => {
        const haystack = `${user.name} ${user.email} ${user.role}`.toLowerCase();
        return haystack.includes(search);
      }),
    );
  }),
  http.get("/api/settings", async () => {
    await delay(220);
    return HttpResponse.json(activeSettings);
  }),
  http.patch("/api/settings", async ({ request }) => {
    await delay(420);
    const updates = (await request.json()) as SettingsPayload;
    activeSettings = updates;
    return HttpResponse.json(activeSettings);
  }),
];
