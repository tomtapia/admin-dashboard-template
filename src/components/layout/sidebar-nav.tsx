import {
  BarChart3,
  ChartColumnBig,
  CircleHelp,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
};

const secondaryItems = [
  { title: "Analytics", icon: ChartColumnBig },
  { title: "Sales", icon: ShoppingBag },
  { title: "Products", icon: Package },
  { title: "Reports", icon: FileBarChart2 },
  { title: "Help", icon: CircleHelp },
  { title: "Logout", icon: LogOut },
] as const;

export const SidebarNav = ({ collapsed }: { collapsed: boolean }) => (
  <aside
    className={cn(
      "fixed inset-y-4 left-4 z-20 hidden border border-[var(--sidebar-border)] bg-[var(--sidebar)] px-4 py-5 text-[var(--sidebar-foreground)] shadow-[var(--shadow-panel)] lg:flex lg:flex-col",
      collapsed ? "w-24 rounded-[1rem]" : "w-[16.25rem] rounded-[1rem]",
    )}
  >
    <div className="mb-8 flex items-center gap-3 px-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
        <BarChart3 className="h-4 w-4" />
      </div>
      {!collapsed ? (
        <div>
          <p className="text-sm font-semibold text-[var(--sidebar-foreground)]">ADMIN DASH</p>
          <p className="text-xs text-[var(--sidebar-muted)]">Workspace</p>
        </div>
      ) : null}
    </div>

    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                isActive
                  ? "bg-[var(--sidebar-active)] text-[var(--sidebar-active-foreground)]"
                  : "text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-foreground)]",
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed ? <span>{item.title}</span> : null}
          </NavLink>
        );
      })}

      {!collapsed ? (
        <>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[var(--sidebar-muted)] transition-colors hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-foreground)]"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </>
      ) : null}
    </nav>

    <div className="mt-auto rounded-[0.9rem] border border-[var(--sidebar-border)] bg-[var(--sidebar-elevated)] p-4">
      {!collapsed ? (
        <>
          <p className="text-xs font-medium text-[var(--sidebar-muted)]">Workspace status</p>
          <p className="mt-2 text-sm text-[var(--sidebar-foreground)]">Everything looks stable today.</p>
        </>
      ) : (
        <div className="h-10 rounded-xl bg-[var(--sidebar)]" />
      )}
    </div>
  </aside>
);
