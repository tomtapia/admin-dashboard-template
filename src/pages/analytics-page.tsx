import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatePanel } from "@/components/shared/state-panel";
import { KpiCard } from "@/components/shared/kpi-card";
import { DataTable, type Column } from "@/components/shared/data-table";
import { getAnalyticsRequest } from "@/features/analytics/analytics-api";
import type { AnalyticsPayload, ChannelPerf, CohortRow } from "@/types";

export const AnalyticsPage = () => {
  const analyticsQuery = useQuery<AnalyticsPayload>({
    queryKey: ["analytics"],
    queryFn: getAnalyticsRequest,
  });
  const canRenderChart = typeof navigator === "undefined" || !/jsdom/i.test(navigator.userAgent);

  if (analyticsQuery.isLoading) {
    return (
      <StatePanel
        kind="loading"
        title="Loading analytics"
        description="Aggregating funnel and retention data."
      />
    );
  }

  if (analyticsQuery.isError || !analyticsQuery.data) {
    return (
      <StatePanel
        kind="error"
        title="Analytics unavailable"
        description="The analytics endpoint failed."
      />
    );
  }

  const { funnel, channels, cohorts, mrr } = analyticsQuery.data;
  const totalVisitors = funnel[0]?.value ?? 0;
  const conversions = funnel[funnel.length - 1]?.value ?? 0;

  const channelColumns: Column<ChannelPerf>[] = [
    {
      key: "channel",
      header: "Channel",
      render: (row) => <span className="font-medium text-[var(--foreground)]">{row.channel}</span>,
    },
    { key: "visitors", header: "Visitors", render: (row) => row.visitors.toLocaleString() },
    {
      key: "conversions",
      header: "Conversions",
      render: (row) => row.conversions.toLocaleString(),
    },
  ];

  const cohortColumns: Column<CohortRow>[] = [
    {
      key: "cohort",
      header: "Cohort",
      render: (row) => <span className="font-medium text-[var(--foreground)]">{row.cohort}</span>,
    },
    ...cohorts[0].retention.map((_, week) => ({
      key: `w${week}`,
      header: `W${week + 1}`,
      render: (row: CohortRow) => `${row.retention[week]}%`,
    })),
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics"
        title="Reports and product health"
        description="Conversion funnel, acquisition channels, retention cohorts and recurring revenue."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          kpi={{
            id: "visitors",
            label: "Visitors",
            value: totalVisitors,
            change: 12,
            tone: "positive",
          }}
        />
        <KpiCard
          kpi={{
            id: "conversions",
            label: "Conversions",
            value: conversions,
            change: 6,
            tone: "positive",
          }}
        />
        <KpiCard
          kpi={{
            id: "mrr",
            label: "MRR",
            value: mrr[mrr.length - 1]?.revenue ?? 0,
            change: 9,
            tone: "positive",
          }}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Conversion funnel">
          {canRenderChart ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnel} layout="vertical">
                  <CartesianGrid horizontal={false} stroke="var(--chart-grid)" />
                  <XAxis
                    type="number"
                    stroke="var(--muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="stage"
                    stroke="var(--muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                    width={90}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="var(--accent)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Acquisition channels">
          {canRenderChart ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channels}>
                  <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                  <XAxis
                    dataKey="channel"
                    stroke="var(--muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="var(--accent)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="conversions" fill="#93c5fd" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : null}
        </SectionCard>
      </div>

      <SectionCard title="Recurring revenue" description="Monthly recurring revenue over time.">
        {canRenderChart ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrr}>
                <defs>
                  <linearGradient id="mrrFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.24} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--chart-grid)" vertical />
                <XAxis
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                />
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
                  fill="url(#mrrFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : null}
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Retention cohorts" description="Weekly retention by signup cohort.">
          <DataTable columns={cohortColumns} rows={cohorts} getRowKey={(row) => row.cohort} />
        </SectionCard>

        <SectionCard title="Channel performance">
          <DataTable columns={channelColumns} rows={channels} getRowKey={(row) => row.channel} />
        </SectionCard>
      </div>
    </div>
  );
};
