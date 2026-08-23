import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  authStorage,
  isSessionExpired,
  loginRequest,
  logoutRequest,
  refreshRequest,
} from "@/features/auth/auth-api";
import { setHttpAuth } from "@/lib/http";
import type { Session } from "@/types";

type AuthContextValue = {
  session: Session | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(() => authStorage.get());
  const sessionRef = useRef<Session | null>(session);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const refreshSession = useMemo(
    () => async (): Promise<boolean> => {
      try {
        const next = await refreshRequest();
        sessionRef.current = next;
        authStorage.set(next);
        setSession(next);
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  const logout = useMemo(
    () => async (): Promise<void> => {
      await logoutRequest().catch(() => undefined);
      authStorage.clear();
      sessionRef.current = null;
      setSession(null);
      navigate("/login", { replace: true });
    },
    [navigate],
  );

  const unauthorized = useMemo(
    () => () => {
      authStorage.clear();
      sessionRef.current = null;
      setSession(null);
      navigate("/login", { replace: true });
    },
    [navigate],
  );

  useEffect(() => {
    setHttpAuth({
      getToken: () => sessionRef.current?.accessToken ?? null,
      refresh: refreshSession,
      unauthorized,
    });
  }, [refreshSession, unauthorized]);

  useEffect(() => {
    if (session?.isAuthenticated && isSessionExpired(session) && session.refreshToken) {
      void refreshSession();
    }
  }, [session, refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session?.isAuthenticated),
      login: async () => {
        const nextSession = await loginRequest();
        sessionRef.current = nextSession;
        authStorage.set(nextSession);
        setSession(nextSession);
        navigate("/app/overview", { replace: true });
      },
      logout,
      refreshSession,
    }),
    [navigate, session, logout, refreshSession],
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
