export type NavItem = {
  title: string;
  href: string;
  icon: string;
};

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    role: "Owner" | "Admin" | "Manager";
    organization: string;
  };
  isAuthenticated: boolean;
};

export type DashboardKpi = {
  id: string;
  label: string;
  value: number;
  change: number;
  tone: "positive" | "neutral";
};

export type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  at: string;
};

export type ChartPoint = {
  name: string;
  revenue: number;
  activeUsers: number;
};

export type OverviewPayload = {
  kpis: DashboardKpi[];
  activity: ActivityItem[];
  chart: ChartPoint[];
};

export type UserStatus = "Active" | "Invited" | "Paused";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Support" | "Analyst";
  status: UserStatus;
  lastActiveAt: string;
  avatarUrl?: string;
};

export type SettingsPayload = {
  profile: {
    companyName: string;
    contactEmail: string;
    timezone: string;
  };
  preferences: {
    weeklyDigest: boolean;
    productUpdates: boolean;
  };
};
