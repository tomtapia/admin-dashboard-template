import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CircleAlert, Filter } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/shared/kpi-card";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatePanel } from "@/components/shared/state-panel";
import { cn } from "@/lib/utils";
import { getOverviewRequest } from "@/features/overview/overview-api";
import type { OverviewPayload } from "@/types";

const salesByCategory = [
  { name: "Electronics", current: 4.6, previous: 3.1 },
  { name: "Apparel", current: 3.2, previous: 4.5 },
  { name: "Home", current: 4.1, previous: 2.8 },
  { name: "Groceries", current: 2.4, previous: 1.6 },
];

const demographics = [
  { name: "18-24", value: 22, color: "#3b82f6" },
  { name: "25-34", value: 35, color: "#60a5fa" },
  { name: "35-44", value: 27, color: "#93c5fd" },
  { name: "45+", value: 16, color: "#cbd5e1" },
];

const platformActivity = [
  "Recent events successfully processed 2 minutes ago",
  "Recent events routed to owners 1 hour ago",
  "Recent events completed in the account queue",
] as const;

const transactions = [
  { id: "1", customer: "Northstar Labs", date: "2025-10-13", amount: "$10.00", status: "Status" },
  { id: "2", customer: "Aperture Group", date: "2025-10-12", amount: "$10.00", status: "Status" },
  { id: "4", customer: "Granite Ops", date: "2025-10-11", amount: "$10.00", status: "Status" },
  { id: "5", customer: "Helio Commerce", date: "2025-10-10", amount: "$10.00", status: "Active" },
] as const;

export const OverviewPage = () => {
  const overviewQuery = useQuery<OverviewPayload>({
    queryKey: ["overview"],
    queryFn: getOverviewRequest,
  });
  const canRenderChart = typeof navigator === "undefined" || !/jsdom/i.test(navigator.userAgent);

  if (overviewQuery.isLoading) {
    return <StatePanel kind="loading" title="Loading overview" description="Hydrating metrics and dashboard state." />;
  }

  if (overviewQuery.isError || !overviewQuery.data) {
    return <StatePanel kind="error" title="Could not load overview" description="The mock dashboard endpoint failed." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard Overview"
        description="Track revenue, acquisition, active work and platform activity in one place."
        actions={
          <>
            <Button variant="outline" className="w-full gap-2 md:w-auto">
              <CalendarDays className="h-4 w-4" />
              October 2023
            </Button>
            <Button variant="outline" className="w-full gap-2 md:w-auto">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewQuery.data.kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.65fr]">
        <SectionCard tone="secondary" title="Monthly Sales & Revenue">
          {canRenderChart ? (
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overviewQuery.data.chart}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.24} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--chart-grid)" vertical />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--chart-line)"
                    strokeWidth={2}
                    fill="url(#revenueFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard tone="secondary" title="Sales by Category">
          {canRenderChart ? (
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByCategory} barGap={8}>
                  <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="current" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="previous" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : null}
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.7fr_0.8fr]">
        <SectionCard tone="secondary" title="Recent Transactions">
          <div className="overflow-hidden rounded-[0.75rem] border border-[var(--border)]">
            <div className="grid grid-cols-[56px_1.4fr_1fr_0.8fr_0.9fr] gap-3 border-b border-[var(--border)] bg-[var(--surface-panel)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
              <span>ID</span>
              <span>Customer</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {transactions.map((row) => (
                <div key={row.id} className="grid grid-cols-[56px_1.4fr_1fr_0.8fr_0.9fr] gap-3 px-4 py-3 text-sm">
                  <span>{row.id}</span>
                  <span className="font-medium text-[var(--foreground)]">{row.customer}</span>
                  <span className="text-[var(--muted-foreground)]">{row.date}</span>
                  <span>{row.amount}</span>
                  <span>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-1 text-[11px] font-medium",
                        row.status === "Active"
                          ? "bg-[var(--success-soft)] text-[var(--success)]"
                          : "bg-[var(--surface-secondary)] text-[var(--foreground-muted)]",
                      )}
                    >
                      {row.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard tone="secondary" title="User Demographics">
          {canRenderChart ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={demographics} dataKey="value" innerRadius={52} outerRadius={80} paddingAngle={3}>
                    {demographics.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : null}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {demographics.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard tone="secondary" title="Platform Activity">
          <div className="space-y-3">
            {platformActivity.map((item) => (
              <div key={item} className="flex gap-3 rounded-[0.9rem] border border-[var(--border)] bg-[var(--surface-panel)] px-4 py-3 text-sm text-[var(--foreground-muted)]">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
