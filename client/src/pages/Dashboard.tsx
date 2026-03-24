import { useState } from "react";
import { Link } from "wouter";
import LendingLayout from "@/components/LendingLayout";
import { deals, formatCurrency, stageColors, riskColors, type DealStage } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, Filter, Plus, TrendingUp, Clock, DollarSign,
  AlertTriangle, ChevronRight, ArrowUpRight, Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const stages: DealStage[] = ['Application', 'Document Review', 'Underwriting', 'Approval', 'Monitoring'];

const pipelineData = [
  { stage: 'Application', count: 2, value: 13000000 },
  { stage: 'Doc Review', count: 2, value: 14500000 },
  { stage: 'Underwriting', count: 2, value: 30500000 },
  { stage: 'Approval', count: 1, value: 22000000 },
  { stage: 'Monitoring', count: 1, value: 35000000 },
];

const velocityData = [
  { week: 'W1', submitted: 4, approved: 2, closed: 1 },
  { week: 'W2', submitted: 6, approved: 4, closed: 3 },
  { week: 'W3', submitted: 5, approved: 5, closed: 4 },
  { week: 'W4', submitted: 8, approved: 6, closed: 5 },
  { week: 'W5', submitted: 7, approved: 7, closed: 6 },
  { week: 'W6', submitted: 9, approved: 8, closed: 7 },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<DealStage | 'All'>('All');

  const filtered = deals.filter(d => {
    const matchSearch = d.borrower.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === 'All' || d.stage === stageFilter;
    return matchSearch && matchStage;
  });

  const totalPipeline = deals.reduce((s, d) => s + d.amount, 0);
  const activeDeals = deals.filter(d => d.stage !== 'Closed').length;
  const alertDeals = deals.filter(d => d.riskRating === 'High' || d.riskRating === 'Watch').length;
  const avgDays = Math.round(deals.filter(d => d.stage !== 'Closed').reduce((s, d) => s + d.daysInStage, 0) / activeDeals);

  return (
    <LendingLayout title="Pipeline Dashboard" subtitle="Real-time commercial lending pipeline">
      <div className="p-4 lg:p-6 space-y-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Pipeline", value: formatCurrency(totalPipeline), sub: `${deals.length} deals`, icon: DollarSign, color: "metric-card-blue", iconColor: "text-blue-400", bg: "bg-blue-400/10" },
            { label: "Active Deals", value: activeDeals.toString(), sub: "Across all stages", icon: Activity, color: "metric-card-green", iconColor: "text-green-400", bg: "bg-green-400/10" },
            { label: "Avg Days in Stage", value: `${avgDays}d`, sub: "vs. 21d industry avg", icon: Clock, color: "metric-card-yellow", iconColor: "text-yellow-400", bg: "bg-yellow-400/10" },
            { label: "Alerts", value: alertDeals.toString(), sub: "Require attention", icon: AlertTriangle, color: "metric-card-red", iconColor: "text-red-400", bg: "bg-red-400/10" },
          ].map((kpi) => (
            <div key={kpi.label} className={`bg-card border border-border rounded-xl p-4 ${kpi.color}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon className={`w-4 h-4 ${kpi.iconColor}`} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-0.5">{kpi.value}</div>
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
              <div className="text-[10px] text-muted-foreground/70 mt-0.5">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pipeline funnel */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Pipeline by Stage</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={pipelineData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 240)" vertical={false} />
                <XAxis dataKey="stage" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} />
                <Tooltip
                  contentStyle={{ background: 'oklch(0.13 0.015 240)', border: '1px solid oklch(0.22 0.015 240)', borderRadius: '8px', color: 'oklch(0.97 0.005 240)', fontSize: '12px' }}
                  formatter={(value: number) => [`${value} deals`, 'Count']}
                />
                <Bar dataKey="count" fill="oklch(0.6 0.18 220)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Velocity */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Deal Velocity (6 Weeks)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={velocityData}>
                <defs>
                  <linearGradient id="submitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.6 0.18 220)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.6 0.18 220)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="closed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.72 0.15 160)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.72 0.15 160)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 240)" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'oklch(0.13 0.015 240)', border: '1px solid oklch(0.22 0.015 240)', borderRadius: '8px', color: 'oklch(0.97 0.005 240)', fontSize: '12px' }} />
                <Area type="monotone" dataKey="submitted" stroke="oklch(0.6 0.18 220)" fill="url(#submitted)" strokeWidth={2} name="Submitted" />
                <Area type="monotone" dataKey="closed" stroke="oklch(0.72 0.15 160)" fill="url(#closed)" strokeWidth={2} name="Closed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stage filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(['All', ...stages] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStageFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                stageFilter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {s} {s !== 'All' && `(${deals.filter(d => d.stage === s).length})`}
            </button>
          ))}
        </div>

        {/* Search & actions */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search deals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border text-sm h-9"
            />
          </div>
          <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter
          </Button>
          <Link href="/documents/DL-2024-004">
            <Button size="sm" className="bg-primary text-primary-foreground gap-1.5">
              <Plus className="w-3.5 h-3.5" /> New Deal
            </Button>
          </Link>
        </div>

        {/* Deal table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Deal ID', 'Borrower', 'Amount', 'Stage', 'Risk', 'AI Score', 'DSCR', 'RM', 'Last Activity', ''].map((h) => (
                    <th key={h} className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((deal) => (
                  <tr key={deal.id} className="border-b border-border/50 hover:bg-white/3 transition-colors group">
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-primary">{deal.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-medium text-foreground">{deal.borrower}</div>
                      <div className="text-[10px] text-muted-foreground">{deal.industry} · {deal.city}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-foreground">{formatCurrency(deal.amount)}</span>
                      <div className="text-[10px] text-muted-foreground">{deal.loanType}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${stageColors[deal.stage]}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${riskColors[deal.riskRating]}`}>
                        {deal.riskRating}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full w-16">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${deal.aiScore}%`,
                              background: deal.aiScore >= 75 ? 'oklch(0.72 0.15 160)' : deal.aiScore >= 60 ? 'oklch(0.78 0.12 80)' : 'oklch(0.62 0.22 25)'
                            }}
                          />
                        </div>
                        <span className="text-xs text-foreground">{deal.aiScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${deal.dscr >= 1.25 ? 'text-green-400' : deal.dscr >= 1.0 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {deal.dscr.toFixed(2)}x
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{deal.rm}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] text-muted-foreground">{deal.lastActivity}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/deals/${deal.id}`}>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-primary hover:text-primary/80">
                          View <ChevronRight className="w-3 h-3" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Showing {filtered.length} of {deals.length} deals</span>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="status-live w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Live — updates every 30s
            </div>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
