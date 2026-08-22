import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { cn } from "@/lib/utils";

export const AppShell = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const pageKey = useMemo(() => location.pathname.split("/").at(-1) ?? "overview", [location.pathname]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-50 -translate-y-24 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] shadow-[var(--shadow-card)] transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      >
        Skip to main content
      </a>
      <SidebarNav collapsed={collapsed} />
      <main
        id="main-content"
        className={cn(
          "min-h-screen px-3 py-3 transition-[padding] md:px-4 md:py-4 lg:pl-[19rem]",
          collapsed && "lg:pl-[8rem]",
        )}
      >
        <div className="mx-auto max-w-7xl space-y-5 md:space-y-6">
          <Topbar collapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)} />
          <div key={pageKey} className="animate-[fade-in_320ms_ease]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
