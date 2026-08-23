import type { NavItem } from "@/types";

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navItems: NavItem[] = [
  { title: "nav.overview", href: "/app/overview", icon: "LayoutDashboard" },
  { title: "nav.analytics", href: "/app/analytics", icon: "LineChart" },
  { title: "nav.users", href: "/app/users", icon: "Users", roles: ["Owner", "Admin", "Manager"] },
  { title: "nav.team", href: "/app/team", icon: "UserCog", roles: ["Owner", "Admin"] },
  { title: "nav.billing", href: "/app/billing", icon: "CreditCard", roles: ["Owner", "Admin"] },
  {
    title: "nav.transactions",
    href: "/app/transactions",
    icon: "Receipt",
    roles: ["Owner", "Admin", "Manager"],
  },
  {
    title: "nav.notifications",
    href: "/app/notifications",
    icon: "Bell",
    roles: ["Owner", "Admin", "Manager"],
  },
  {
    title: "nav.support",
    href: "/app/support",
    icon: "LifeBuoy",
    roles: ["Owner", "Admin", "Manager"],
  },
  { title: "nav.integrations", href: "/app/integrations", icon: "Plug", roles: ["Owner", "Admin"] },
  { title: "nav.settings", href: "/app/settings", icon: "Settings" },
];

export const navGroups: NavGroup[] = [
  { label: "nav.group.dashboard", items: [navItems[0], navItems[1]] },
  { label: "nav.group.manage", items: [navItems[2], navItems[3], navItems[4], navItems[5]] },
  { label: "nav.group.engage", items: [navItems[6], navItems[7], navItems[8]] },
  { label: "nav.group.settings", items: [navItems[9]] },
];
