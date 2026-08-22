import type { NavItem } from "@/types";

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navItems: NavItem[] = [
  { title: "Overview", href: "/app/overview", icon: "LayoutDashboard" },
  { title: "Analytics", href: "/app/analytics", icon: "LineChart" },
  { title: "Users", href: "/app/users", icon: "Users", roles: ["Owner", "Admin", "Manager"] },
  { title: "Team", href: "/app/team", icon: "UserCog", roles: ["Owner", "Admin"] },
  { title: "Billing", href: "/app/billing", icon: "CreditCard", roles: ["Owner", "Admin"] },
  {
    title: "Transactions",
    href: "/app/transactions",
    icon: "Receipt",
    roles: ["Owner", "Admin", "Manager"],
  },
  {
    title: "Notifications",
    href: "/app/notifications",
    icon: "Bell",
    roles: ["Owner", "Admin", "Manager"],
  },
  {
    title: "Support",
    href: "/app/support",
    icon: "LifeBuoy",
    roles: ["Owner", "Admin", "Manager"],
  },
  { title: "Integrations", href: "/app/integrations", icon: "Plug", roles: ["Owner", "Admin"] },
  { title: "Settings", href: "/app/settings", icon: "Settings" },
];

export const navGroups: NavGroup[] = [
  { label: "Dashboard", items: [navItems[0], navItems[1]] },
  { label: "Manage", items: [navItems[2], navItems[3], navItems[4], navItems[5]] },
  { label: "Engage", items: [navItems[6], navItems[7], navItems[8]] },
  { label: "Settings", items: [navItems[9]] },
];
