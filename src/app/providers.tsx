import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, type ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { queryClient } from "@/app/query-client";
import { AuthProvider } from "@/features/auth/auth-context";
import { TenantProvider } from "@/features/tenants/tenant-context";
import { ThemeProvider } from "@/features/theme/theme-context";

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(async () => {
      const module = await import("@tanstack/react-query-devtools");
      return { default: module.ReactQueryDevtools };
    })
  : null;

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TenantProvider>
            {children}
            <Toaster position="top-right" richColors />
          </TenantProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
    {ReactQueryDevtools ? (
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    ) : null}
  </QueryClientProvider>
);
