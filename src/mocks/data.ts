import type { OverviewPayload, SettingsPayload, Session, UserRecord } from "@/types";

export const defaultSession: Session = {
  user: {
    id: "usr_admin_001",
    name: "Avery Stone",
    email: "avery@northstar.app",
    role: "Owner",
    organization: "Northstar",
  },
  isAuthenticated: true,
};

export const overviewPayload: OverviewPayload = {
  kpis: [
    { id: "arr", label: "ARR", value: 482000, change: 14, tone: "positive" },
    { id: "accounts", label: "Active Accounts", value: 1284, change: 8, tone: "positive" },
    { id: "retention", label: "Retention", value: 94, change: 2, tone: "positive" },
    { id: "tickets", label: "Open Tickets", value: 38, change: -5, tone: "neutral" },
  ],
  chart: [
    { name: "Jan", revenue: 24000, activeUsers: 320 },
    { name: "Feb", revenue: 27000, activeUsers: 360 },
    { name: "Mar", revenue: 29500, activeUsers: 410 },
    { name: "Apr", revenue: 32200, activeUsers: 465 },
    { name: "May", revenue: 36100, activeUsers: 520 },
    { name: "Jun", revenue: 40200, activeUsers: 592 },
  ],
  activity: [
    { id: "act_1", title: "Q2 expansion won", subtitle: "Northstar Pro upgraded 28 seats", at: "8m ago" },
    { id: "act_2", title: "Billing anomaly resolved", subtitle: "Finance workflow reconciled automatically", at: "34m ago" },
    { id: "act_3", title: "New manager invited", subtitle: "Sandra Lee joined Customer Ops", at: "2h ago" },
  ],
};

export const usersPayload: UserRecord[] = [
  {
    id: "usr_001",
    name: "Avery Stone",
    email: "avery@northstar.app",
    role: "Owner",
    status: "Active",
    lastActiveAt: "Just now",
  },
  {
    id: "usr_002",
    name: "Jules Carter",
    email: "jules@northstar.app",
    role: "Admin",
    status: "Active",
    lastActiveAt: "12 minutes ago",
  },
  {
    id: "usr_003",
    name: "Maya Lin",
    email: "maya@northstar.app",
    role: "Support",
    status: "Invited",
    lastActiveAt: "Pending invite",
  },
  {
    id: "usr_004",
    name: "Noah Kim",
    email: "noah@northstar.app",
    role: "Analyst",
    status: "Paused",
    lastActiveAt: "2 days ago",
  },
];

export const settingsPayload: SettingsPayload = {
  profile: {
    companyName: "Northstar",
    contactEmail: "ops@northstar.app",
    timezone: "America/New_York",
  },
  preferences: {
    weeklyDigest: true,
    productUpdates: false,
  },
};
