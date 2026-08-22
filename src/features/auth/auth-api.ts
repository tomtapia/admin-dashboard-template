import { http } from "@/lib/http";
import type { OverviewPayload, Session, SettingsPayload, UserRecord } from "@/types";

const SESSION_STORAGE_KEY = "admin-dashboard-template:session";

export const authStorage = {
  get: () => {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  },
  set: (session: Session) => {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  },
  clear: () => {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  },
};

export const loginRequest = () => http<Session>("/api/auth/login", { method: "POST" });

export const logoutRequest = () => http<{ success: boolean }>("/api/auth/logout", { method: "POST" });

export const getOverviewRequest = () => http<OverviewPayload>("/api/dashboard/overview");

export const getUsersRequest = (search = "") =>
  http<UserRecord[]>(`/api/users?search=${encodeURIComponent(search)}`);

export const getSettingsRequest = () => http<SettingsPayload>("/api/settings");

export const updateSettingsRequest = (payload: SettingsPayload) =>
  http<SettingsPayload>("/api/settings", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
