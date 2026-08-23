import {
  Bell,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  Plug,
  Receipt,
  Settings,
  UserCog,
  UserRoundCog,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { navGroups } from "@/components/layout/nav-items";
import { useAuth } from "@/features/auth/auth-context";
import { canAccess } from "@/lib/rbac";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  LineChart,
  Users,
  UserCog,
  UserRoundCog,
  CreditCard,
  Receipt,
  Bell,
  LifeBuoy,
  Plug,
  Settings,
};

export const SidebarNav = ({ collapsed }: { collapsed: boolean }) => {
  const { session } = useAuth();
  const { t } = useTranslation();
  const role = session?.user.role;
  const visibleGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canAccess(role, item.roles)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={cn(
        "fixed inset-y-4 left-4 z-20 hidden border border-[var(--sidebar-border)] bg-[var(--sidebar)] px-4 py-5 text-[var(--sidebar-foreground)] shadow-[var(--shadow-panel)] lg:flex lg:flex-col",
        collapsed ? "w-24 rounded-[1rem]" : "w-[16.25rem] rounded-[1rem]",
      )}
    >
      <nav className="space-y-6 overflow-y-auto">
        {visibleGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            {!collapsed ? (
              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sidebar-muted)]">
                {t(group.label)}
              </p>
            ) : null}
            {group.items.map((item) => {
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
                  {!collapsed ? <span>{t(item.title)}</span> : null}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto rounded-[0.9rem] border border-[var(--sidebar-border)] bg-[var(--sidebar-elevated)] p-4">
        {!collapsed ? (
          <>
            <p className="text-xs font-medium text-[var(--sidebar-muted)]">Workspace status</p>
            <p className="mt-2 text-sm text-[var(--sidebar-foreground)]">
              Everything looks stable today.
            </p>
          </>
        ) : (
          <div className="h-10 rounded-xl bg-[var(--sidebar)]" />
        )}
      </div>
    </aside>
  );
};
