import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { authStorage, loginRequest, logoutRequest } from "@/features/auth/auth-api";
import type { Session } from "@/types";

type AuthContextValue = {
  session: Session | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(() => authStorage.get());

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session?.isAuthenticated),
      login: async () => {
        const nextSession = await loginRequest();
        authStorage.set(nextSession);
        setSession(nextSession);
        navigate("/app/overview", { replace: true });
      },
      logout: async () => {
        await logoutRequest();
        authStorage.clear();
        setSession(null);
        navigate("/login", { replace: true });
      },
    }),
    [navigate, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
