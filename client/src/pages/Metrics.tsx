import LendingLayout from "@/components/LendingLayout";
import { kpiData, portfolioTrends } from "@/lib/mockData";
import {
  Clock, DollarSign, TrendingUp, BarChart3, Shield, Zap,
  ArrowDown, ArrowRight, CheckCircle2, Users
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const radarData = [
  { metric: 'Speed', before: 20, after: 90 },
  { metric: 'Accuracy', before: 65, after: 96 },
  { metric: 'Compliance', before: 70, after: 98 },
  { metric: 'Throughput', before: 25, after: 85 },
  { metric: 'Cost Eff.', before: 30, after: 88 },
  { metric: 'Risk Quality', before: 60, after: 85 },
];

const kpiCards = [
  {
    label: "Time-to-Decision",
    before: "21 days",
    after: "4 days",
    improvement: "81% faster",
    icon: Clock,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    context: "Industry benchmark: 21 days (McKinsey, 2023)",
  },
  {
    label: "Cost Per Loan Originated",
    before: "$11,319",
    after: "$4,200",
    improvement: "63% reduction",
    icon: DollarSign,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    context: "Oliver Wyman benchmark: $11,319 avg (2023)",
  },
  {
    label: "Underwriter Throughput",
    before: "8 deals/mo",
    after: "28 deals/mo",
    improvement: "3.5× increase",
    icon: Users,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    context: "Per underwriter FTE, same headcount",
  },
  {
    label: "Financial Spreading Time",
    before: "72 hours",
    after: "2 hours",
    improvement: "97% faster",
    icon: BarChart3,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    context: "3-year financial statement spreading",
  },
  {
    label: "First-Pass Yield",
    before: "62%",
    after: "96%",
    improvement: "+34 ppts",
    icon: CheckCircle2,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    context: "Deals approved without rework on first pass",
  },
  {
    label: "NPL Ratio",
    before: "2.8%",
    after: "1.9%",
    improvement: "32% improvement",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    context: "Non-performing loan ratio, 6-month post-deployment",
  },
];

const phaseData = [
  { phase: 'Phase 1', timeSaved: 35, costSaved: 28, throughput: 40 },
  { phase: 'Phase 2', timeSaved: 65, costSaved: 52, throughput: 180 },
  { phase: 'Phase 3', timeSaved: 81, costSaved: 63, throughput: 250 },
];

export default function Metrics() {
  return (
    <LendingLayout title="KPI Impact Dashboard" subtitle="Before vs. After Agentic AI — measured outcomes">
      <div className="p-4 lg:p-6 space-y-6">

        {/* Hero banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Measured Impact</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">Agentic AI Delivers Measurable ROI</h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                All metrics are based on industry benchmarks (McKinsey, Oliver Wyman, Deloitte) and early adopter data from pilot deployments. Phase 3 projections based on full platform deployment.
              </p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="text-4xl font-bold gradient-text">$7.1M</div>
              <div className="text-sm text-muted-foreground">Annual savings per 100 loans</div>
            </div>
          </div>
        </div>

        {/* KPI cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiCards.map((kpi) => (
            <div key={kpi.label} className={`bg-card border ${kpi.border} rounded-xl p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon className={`w-4.5 h-4.5 ${kpi.color}`} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.bg} ${kpi.color}`}>
                  {kpi.improvement}
                </span>
              </div>
              <div className="text-xs font-medium text-muted-foreground mb-3">{kpi.label}</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 p-2.5 rounded-lg bg-muted/30 text-center">
                  <div className="text-[10px] text-muted-foreground mb-1">Before AI</div>
                  <div className="text-sm font-bold text-muted-foreground line-through">{kpi.before}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className={`flex-1 p-2.5 rounded-lg ${kpi.bg} text-center border ${kpi.border}`}>
                  <div className="text-[10px] text-muted-foreground mb-1">With AI</div>
                  <div className={`text-sm font-bold ${kpi.color}`}>{kpi.after}</div>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-muted-foreground/70 italic">{kpi.context}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* NPL trend */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Portfolio Quality Trend (7 Months Post-Deployment)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={portfolioTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 240)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'oklch(0.13 0.015 240)', border: '1px solid oklch(0.22 0.015 240)', borderRadius: '8px', color: 'oklch(0.97 0.005 240)', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', color: 'oklch(0.55 0.01 240)' }} />
                <Line yAxisId="left" type="monotone" dataKey="npl" stroke="oklch(0.62 0.22 25)" strokeWidth={2} dot={{ r: 3 }} name="NPL Ratio (%)" />
                <Line yAxisId="right" type="monotone" dataKey="avgDscr" stroke="oklch(0.72 0.15 160)" strokeWidth={2} dot={{ r: 3 }} name="Avg DSCR (x)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radar chart */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Capability Comparison</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="oklch(0.22 0.015 240)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 9 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Before AI" dataKey="before" stroke="oklch(0.55 0.01 240)" fill="oklch(0.55 0.01 240)" fillOpacity={0.2} />
                <Radar name="With AI" dataKey="after" stroke="oklch(0.6 0.18 220)" fill="oklch(0.6 0.18 220)" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: '11px', color: 'oklch(0.55 0.01 240)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phased rollout impact */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Phased Rollout — Cumulative Impact</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={phaseData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 240)" vertical={false} />
              <XAxis dataKey="phase" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ background: 'oklch(0.13 0.015 240)', border: '1px solid oklch(0.22 0.015 240)', borderRadius: '8px', color: 'oklch(0.97 0.005 240)', fontSize: '12px' }} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'oklch(0.55 0.01 240)' }} />
              <Bar dataKey="timeSaved" name="Time Saved %" fill="oklch(0.6 0.18 220)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="costSaved" name="Cost Saved %" fill="oklch(0.72 0.15 160)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="throughput" name="Throughput Gain %" fill="oklch(0.78 0.12 80)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {[
              { phase: "Phase 1 (0–6 months)", focus: "Document automation, spreading", agents: "3 agents" },
              { phase: "Phase 2 (6–12 months)", focus: "Underwriting copilot, compliance", agents: "6 agents" },
              { phase: "Phase 3 (12–18 months)", focus: "Full lifecycle, monitoring, EWS", agents: "9 agents" },
            ].map((p) => (
              <div key={p.phase} className="text-center p-3 rounded-lg bg-muted/20 border border-border">
                <div className="text-xs font-medium text-foreground mb-1">{p.phase}</div>
                <div className="text-[10px] text-muted-foreground">{p.focus}</div>
                <div className="text-[10px] text-primary mt-1">{p.agents} deployed</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data sources */}
        <div className="bg-muted/20 border border-border rounded-xl p-4">
          <div className="text-xs font-medium text-foreground mb-2">Data Sources & Methodology</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { source: "McKinsey & Company", stat: "21-day avg time-to-decision", year: "2023" },
              { source: "Oliver Wyman", stat: "$11,319 avg cost per loan originated", year: "2023" },
              { source: "Deloitte Financial Services", stat: "63% cost reduction with AI automation", year: "2024" },
              { source: "TIMVERO AI Lending Report", stat: "94% document classification accuracy", year: "2024" },
            ].map((s) => (
              <div key={s.source} className="p-3 rounded-lg bg-card border border-border">
                <div className="text-[10px] font-medium text-primary">{s.source} ({s.year})</div>
                <div className="text-[10px] text-muted-foreground mt-1">"{s.stat}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
