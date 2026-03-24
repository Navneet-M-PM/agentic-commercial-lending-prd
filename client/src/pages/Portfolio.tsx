import { useState } from "react";
import { Link } from "wouter";
import LendingLayout from "@/components/LendingLayout";
import { portfolioAccounts, formatCurrency } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, AlertTriangle, CheckCircle2, TrendingDown,
  Activity, ChevronRight, Eye, Bell, Shield, BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const riskTrendData = [
  { month: 'Oct', green: 38, yellow: 6, red: 2 },
  { month: 'Nov', green: 37, yellow: 7, red: 2 },
  { month: 'Dec', green: 36, yellow: 7, red: 3 },
  { month: 'Jan', green: 35, yellow: 8, red: 3 },
  { month: 'Feb', green: 34, yellow: 9, red: 3 },
  { month: 'Mar', green: 33, yellow: 10, red: 3 },
];

const covenantData = [
  { borrower: "Meridian Tech Solutions", covenant: "DSCR ≥ 1.25x", actual: "1.42x", status: "pass", trend: "stable" },
  { borrower: "Meridian Tech Solutions", covenant: "Leverage ≤ 4.0x", actual: "2.8x", status: "pass", trend: "improving" },
  { borrower: "Pacific Rim Manufacturing", covenant: "Current Ratio ≥ 1.2x", actual: "1.18x", status: "breach", trend: "declining" },
  { borrower: "Pacific Rim Manufacturing", covenant: "DSCR ≥ 1.20x", actual: "1.09x", status: "breach", trend: "declining" },
  { borrower: "Lakeside Hospitality Group", covenant: "RevPAR Growth ≥ 0%", actual: "-4.2%", status: "watch", trend: "declining" },
  { borrower: "Summit Retail Partners", covenant: "Occupancy ≥ 85%", actual: "79%", status: "watch", trend: "declining" },
];

export default function Portfolio() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const alerts = portfolioAccounts.filter(a => a.riskFlag === 'red' || a.riskFlag === 'yellow');

  const totalExposure = portfolioAccounts.reduce((s, a) => s + a.outstandingBalance, 0);
  const greenCount = portfolioAccounts.filter(a => a.riskFlag === 'green').length;
  const yellowCount = portfolioAccounts.filter(a => a.riskFlag === 'yellow').length;
  const redCount = portfolioAccounts.filter(a => a.riskFlag === 'red').length;

  return (
    <LendingLayout title="Portfolio Monitoring" subtitle="Early warning system · 46 active accounts">
      <div className="p-4 lg:p-6 space-y-6">

        {/* Alert banner */}
        {alerts.length > 0 && (
          <div className="bg-orange-400/5 border border-orange-400/30 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-orange-400 mb-1">
                {alerts.length} accounts require attention
              </div>
              <p className="text-xs text-muted-foreground">
                Monitoring & Early Warning Agent has detected financial deterioration signals in {alerts.length} portfolio accounts.
                Early intervention recommended — average lead time is <span className="text-orange-400 font-medium">45 days before covenant breach</span>.
              </p>
            </div>
            <Button size="sm" className="bg-orange-400/20 text-orange-400 hover:bg-orange-400/30 border border-orange-400/30 text-xs h-7 flex-shrink-0">
              Review Alerts
            </Button>
          </div>
        )}

        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Exposure", value: formatCurrency(totalExposure), sub: "46 accounts", color: "metric-card-blue", icon: BarChart3, iconColor: "text-blue-400", bg: "bg-blue-400/10" },
            { label: "Healthy Accounts", value: `${greenCount}`, sub: "No issues detected", color: "metric-card-green", icon: CheckCircle2, iconColor: "text-green-400", bg: "bg-green-400/10" },
            { label: "Watch List", value: `${yellowCount}`, sub: "Monitor closely", color: "metric-card-yellow", icon: Activity, iconColor: "text-yellow-400", bg: "bg-yellow-400/10" },
            { label: "Critical Alerts", value: `${redCount}`, sub: "Immediate action", color: "metric-card-red", icon: AlertTriangle, iconColor: "text-red-400", bg: "bg-red-400/10" },
          ].map((kpi) => (
            <div key={kpi.label} className={`bg-card border border-border rounded-xl p-4 ${kpi.color}`}>
              <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center mb-2`}>
                <kpi.icon className={`w-4 h-4 ${kpi.iconColor}`} />
              </div>
              <div className="text-xl font-bold text-foreground">{kpi.value}</div>
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
              <div className="text-[10px] text-muted-foreground/60">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Risk distribution trend */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Portfolio Risk Distribution (6M)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.72 0.15 160)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.72 0.15 160)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 240)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'oklch(0.13 0.015 240)', border: '1px solid oklch(0.22 0.015 240)', borderRadius: '8px', color: 'oklch(0.97 0.005 240)', fontSize: '12px' }} />
                <Area type="monotone" dataKey="green" stroke="oklch(0.72 0.15 160)" fill="url(#green)" strokeWidth={2} name="Healthy" />
                <Line type="monotone" dataKey="yellow" stroke="oklch(0.78 0.12 80)" strokeWidth={2} dot={false} name="Watch" />
                <Line type="monotone" dataKey="red" stroke="oklch(0.62 0.22 25)" strokeWidth={2} dot={false} name="Critical" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Covenant tracker */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Covenant Tracker</h3>
            </div>
            <div className="divide-y divide-border/50 max-h-[220px] overflow-y-auto">
              {covenantData.map((c, i) => (
                <div key={i} className={`flex items-center gap-3 px-4 py-2.5 ${c.status === 'breach' ? 'bg-red-400/3' : c.status === 'watch' ? 'bg-yellow-400/3' : ''}`}>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${c.status === 'pass' ? 'bg-green-400' : c.status === 'breach' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-medium text-foreground truncate">{c.borrower}</div>
                    <div className="text-[9px] text-muted-foreground">{c.covenant}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-xs font-bold ${c.status === 'pass' ? 'text-green-400' : c.status === 'breach' ? 'text-red-400' : 'text-yellow-400'}`}>{c.actual}</div>
                    <div className="text-[9px] text-muted-foreground">{c.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio accounts table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Portfolio Accounts</h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="status-live w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Monitoring & EWS Agent — scanning every 6 hours
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {['Risk', 'Borrower', 'Outstanding', 'DSCR', 'Risk Score', 'EWS Signal', 'Last Review', 'Action'].map(h => (
                    <th key={h} className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {portfolioAccounts.map((account) => (
                  <tr key={account.id} className={`border-b border-border/50 hover:bg-white/2 transition-colors ${account.riskFlag === 'red' ? 'bg-red-400/3' : account.riskFlag === 'yellow' ? 'bg-yellow-400/3' : ''}`}>
                    <td className="px-4 py-3">
                      <div className={`w-3 h-3 rounded-full ${account.riskFlag === 'green' ? 'bg-green-400' : account.riskFlag === 'yellow' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-medium text-foreground">{account.borrower}</div>
                      <div className="text-[10px] text-muted-foreground">{account.industry}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-foreground">{formatCurrency(account.outstandingBalance)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${account.dscr >= 1.25 ? 'text-green-400' : account.dscr >= 1.0 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {account.dscr.toFixed(2)}x
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-muted rounded-full">
                          <div className={`h-full rounded-full ${account.riskScore >= 70 ? 'bg-green-400' : account.riskScore >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${account.riskScore}%` }} />
                        </div>
                        <span className="text-xs text-foreground">{account.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        account.ewsSignal === 'Normal' ? 'bg-green-400/10 border-green-400/30 text-green-400' :
                        account.ewsSignal === 'Watch' ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' :
                        'bg-red-400/10 border-red-400/30 text-red-400'
                      }`}>
                        {account.ewsSignal}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] text-muted-foreground">{account.lastReview}</span>
                    </td>
                    <td className="px-4 py-3">
                      {account.riskFlag !== 'green' && (
                        <Link href={`/deals/${account.dealId}`}>
                          <Button size="sm" variant="outline" className={`h-6 text-[10px] px-2 ${
                            account.riskFlag === 'red' ? 'border-red-400/30 text-red-400 hover:bg-red-400/10' : 'border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10'
                          }`}>
                            Review
                          </Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
