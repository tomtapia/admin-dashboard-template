import type { NavItem } from "@/types";

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navItems: NavItem[] = [
  { title: "Overview", href: "/app/overview", icon: "LayoutDashboard" },
  { title: "Analytics", href: "/app/analytics", icon: "LineChart" },
  { title: "Users", href: "/app/users", icon: "Users" },
  { title: "Team", href: "/app/team", icon: "UserCog" },
  { title: "Billing", href: "/app/billing", icon: "CreditCard" },
  { title: "Transactions", href: "/app/transactions", icon: "Receipt" },
  { title: "Notifications", href: "/app/notifications", icon: "Bell" },
  { title: "Support", href: "/app/support", icon: "LifeBuoy" },
  { title: "Integrations", href: "/app/integrations", icon: "Plug" },
  { title: "Settings", href: "/app/settings", icon: "Settings" },
];

export const navGroups: NavGroup[] = [
  { label: "Dashboard", items: [navItems[0], navItems[1]] },
  { label: "Manage", items: [navItems[2], navItems[3], navItems[4], navItems[5]] },
  { label: "Engage", items: [navItems[6], navItems[7], navItems[8]] },
  { label: "Settings", items: [navItems[9]] },
];
