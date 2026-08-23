import { http } from "@/lib/http";
import type { Session } from "@/types";

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

export const logoutRequest = () =>
  http<{ success: boolean }>("/api/auth/logout", { method: "POST" });
