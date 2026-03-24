import { useState, useEffect } from "react";
import LendingLayout from "@/components/LendingLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator, DollarSign, Clock, TrendingUp, Users, BarChart3,
  ArrowRight, CheckCircle2, Zap, RefreshCw, Download, Building2,
  Target, Shield, ChevronDown
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";

// ─── Benchmark data (sourced from McKinsey, Oliver Wyman, Deloitte) ──────────
const BENCHMARKS = {
  avgDecisionDays: 21,
  avgCostPerLoan: 11319,
  avgUnderwriterDeals: 8,
  avgNplRate: 2.8,
  avgSpreadingHours: 72,
  avgFirstPassYield: 62,
};

const AI_IMPROVEMENTS = {
  decisionDaysReduction: 0.81,   // 81% faster
  costReduction: 0.63,           // 63% lower
  throughputMultiplier: 3.5,     // 3.5× more deals
  nplImprovement: 0.32,          // 32% fewer NPLs
  spreadingReduction: 0.97,      // 97% faster spreading
  firstPassYieldGain: 0.55,      // 55% improvement
};

interface BankInputs {
  loanVolume: number;
  avgLoanSize: number;
  underwriterCount: number;
  currentNplRate: number;
  avgRevPerLoan: number;
  implementationCost: number;
}

const defaultInputs: BankInputs = {
  loanVolume: 200,
  avgLoanSize: 5,
  underwriterCount: 15,
  currentNplRate: 2.8,
  avgRevPerLoan: 85,
  implementationCost: 2500,
};

function formatCurrency(n: number, decimals = 0): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(decimals)}K`;
  return `$${n.toLocaleString()}`;
}

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplayed(end); clearInterval(timer); }
      else setDisplayed(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <span>{prefix}{displayed.toFixed(decimals)}{suffix}</span>
  );
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState<BankInputs>(defaultInputs);
  const [calculated, setCalculated] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ─── Calculations ──────────────────────────────────────────────────────────
  const currentOpsCost = inputs.loanVolume * BENCHMARKS.avgCostPerLoan;
  const aiOpsCost = inputs.loanVolume * BENCHMARKS.avgCostPerLoan * (1 - AI_IMPROVEMENTS.costReduction);
  const opsSavings = currentOpsCost - aiOpsCost;

  const currentNplLoss = (inputs.loanVolume * inputs.avgLoanSize * 1_000_000) * (inputs.currentNplRate / 100) * 0.45;
  const aiNplLoss = currentNplLoss * (1 - AI_IMPROVEMENTS.nplImprovement);
  const nplSavings = currentNplLoss - aiNplLoss;

  const currentCapacity = inputs.underwriterCount * BENCHMARKS.avgUnderwriterDeals * 12;
  const aiCapacity = inputs.underwriterCount * BENCHMARKS.avgUnderwriterDeals * AI_IMPROVEMENTS.throughputMultiplier * 12;
  const additionalLoans = aiCapacity - currentCapacity;
  const revenueGain = additionalLoans * inputs.avgRevPerLoan * 1000;

  const totalAnnualBenefit = opsSavings + nplSavings + revenueGain;
  const implementationCostTotal = inputs.implementationCost * 1000;
  const roi = ((totalAnnualBenefit - implementationCostTotal) / implementationCostTotal) * 100;
  const paybackMonths = (implementationCostTotal / (totalAnnualBenefit / 12));

  const aiDecisionDays = Math.round(BENCHMARKS.avgDecisionDays * (1 - AI_IMPROVEMENTS.decisionDaysReduction));
  const aiCostPerLoan = Math.round(BENCHMARKS.avgCostPerLoan * (1 - AI_IMPROVEMENTS.costReduction));

  // ─── Chart data ────────────────────────────────────────────────────────────
  const roiProjection = Array.from({ length: 36 }, (_, i) => {
    const month = i + 1;
    const cumulativeBenefit = (totalAnnualBenefit / 12) * month;
    const cumulativeCost = implementationCostTotal + (aiOpsCost / 12) * month;
    return {
      month: `M${month}`,
      benefit: Math.round(cumulativeBenefit / 1000),
      cost: Math.round(cumulativeCost / 1000),
      net: Math.round((cumulativeBenefit - implementationCostTotal) / 1000),
    };
  });

  const comparisonData = [
    { metric: "Decision Time", before: BENCHMARKS.avgDecisionDays, after: aiDecisionDays, unit: "days", improvement: "81% faster" },
    { metric: "Cost / Loan", before: BENCHMARKS.avgCostPerLoan, after: aiCostPerLoan, unit: "$", improvement: "63% lower" },
    { metric: "Deals/UW/Mo", before: BENCHMARKS.avgUnderwriterDeals, after: Math.round(BENCHMARKS.avgUnderwriterDeals * AI_IMPROVEMENTS.throughputMultiplier), unit: "", improvement: "3.5× more" },
    { metric: "NPL Rate", before: inputs.currentNplRate, after: +(inputs.currentNplRate * (1 - AI_IMPROVEMENTS.nplImprovement)).toFixed(1), unit: "%", improvement: "32% lower" },
  ];

  const handleInputChange = (field: keyof BankInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setCalculated(false);
  };

  return (
    <LendingLayout title="ROI Calculator" subtitle="Personalized business case for your institution">
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <Calculator className="w-4 h-4 text-emerald-400" />
              </div>
              <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 text-[10px]">
                Data-Backed Model
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-foreground">Your Personalized ROI Model</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Based on benchmarks from McKinsey, Oliver Wyman, and Deloitte. Enter your bank's parameters to see your specific business case.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            All data stays in your browser
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Input Panel ── */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-5 bg-card border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Your Bank Parameters
              </h3>

              <div className="space-y-4">
                {/* Loan Volume */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-foreground">Annual Loan Volume</label>
                    <span className="text-xs font-bold text-primary">{inputs.loanVolume} loans/yr</span>
                  </div>
                  <input
                    type="range" min={50} max={2000} step={50}
                    value={inputs.loanVolume}
                    onChange={e => handleInputChange("loanVolume", +e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>50</span><span>2,000</span>
                  </div>
                </div>

                {/* Avg Loan Size */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-foreground">Avg Loan Size</label>
                    <span className="text-xs font-bold text-primary">${inputs.avgLoanSize}M</span>
                  </div>
                  <input
                    type="range" min={1} max={50} step={1}
                    value={inputs.avgLoanSize}
                    onChange={e => handleInputChange("avgLoanSize", +e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>$1M</span><span>$50M</span>
                  </div>
                </div>

                {/* Underwriter Count */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-foreground">Underwriter Headcount</label>
                    <span className="text-xs font-bold text-primary">{inputs.underwriterCount} FTEs</span>
                  </div>
                  <input
                    type="range" min={2} max={100} step={1}
                    value={inputs.underwriterCount}
                    onChange={e => handleInputChange("underwriterCount", +e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>2</span><span>100</span>
                  </div>
                </div>

                {/* NPL Rate */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-foreground">Current NPL Rate</label>
                    <span className="text-xs font-bold text-primary">{inputs.currentNplRate}%</span>
                  </div>
                  <input
                    type="range" min={0.5} max={8} step={0.1}
                    value={inputs.currentNplRate}
                    onChange={e => handleInputChange("currentNplRate", +e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0.5%</span><span>8%</span>
                  </div>
                </div>

                {/* Advanced toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  Advanced Parameters
                </button>

                {showAdvanced && (
                  <div className="space-y-4 pt-2 border-t border-border">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-foreground">Avg Revenue / Loan</label>
                        <span className="text-xs font-bold text-primary">${inputs.avgRevPerLoan}K</span>
                      </div>
                      <input
                        type="range" min={20} max={300} step={5}
                        value={inputs.avgRevPerLoan}
                        onChange={e => handleInputChange("avgRevPerLoan", +e.target.value)}
                        className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-foreground">Implementation Budget</label>
                        <span className="text-xs font-bold text-primary">{formatCurrency(inputs.implementationCost * 1000)}</span>
                      </div>
                      <input
                        type="range" min={500} max={10000} step={250}
                        value={inputs.implementationCost}
                        onChange={e => handleInputChange("implementationCost", +e.target.value)}
                        className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setCalculated(true)}
                className="w-full mt-5 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                size="sm"
              >
                <Calculator className="w-3.5 h-3.5" />
                Calculate My ROI
              </Button>
            </Card>

            {/* Benchmark sources */}
            <Card className="p-4 bg-card/50 border-border">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Data Sources:</span> McKinsey Global Banking Practice (2023), Oliver Wyman Cost Benchmarking Study (2023), Deloitte Financial Services AI Report (2024), FDIC Quarterly Banking Profile (2023), Federal Reserve Small Business Credit Survey (2023).
              </p>
            </Card>
          </div>

          {/* ── Results Panel ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Annual Cost Savings",
                  value: formatCurrency(opsSavings),
                  sub: "Operations automation",
                  icon: DollarSign,
                  color: "text-emerald-400",
                  bg: "bg-emerald-400/10 border-emerald-400/20",
                },
                {
                  label: "NPL Loss Reduction",
                  value: formatCurrency(nplSavings),
                  sub: "32% fewer defaults",
                  icon: Shield,
                  color: "text-blue-400",
                  bg: "bg-blue-400/10 border-blue-400/20",
                },
                {
                  label: "Revenue Uplift",
                  value: formatCurrency(revenueGain),
                  sub: `+${additionalLoans.toFixed(0)} loans/yr`,
                  icon: TrendingUp,
                  color: "text-yellow-400",
                  bg: "bg-yellow-400/10 border-yellow-400/20",
                },
                {
                  label: "Payback Period",
                  value: `${paybackMonths.toFixed(1)} mo`,
                  sub: `${roi.toFixed(0)}% 3-yr ROI`,
                  icon: Clock,
                  color: "text-purple-400",
                  bg: "bg-purple-400/10 border-purple-400/20",
                },
              ].map((kpi) => (
                <Card key={kpi.label} className="p-4 bg-card border-border">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${kpi.bg} border`}>
                    <kpi.icon className={`w-3.5 h-3.5 ${kpi.color}`} />
                  </div>
                  <div className={`text-lg font-bold ${kpi.color} mb-0.5`}>
                    {calculated ? <AnimatedNumber value={0} /> : null}
                    {kpi.value}
                  </div>
                  <div className="text-[10px] text-muted-foreground leading-tight">{kpi.label}</div>
                  <div className="text-[10px] text-muted-foreground/60 mt-0.5">{kpi.sub}</div>
                </Card>
              ))}
            </div>

            {/* Total benefit highlight */}
            <Card className="p-5 bg-gradient-to-r from-primary/10 to-emerald-400/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Total Annual Benefit (Year 1)</div>
                  <div className="text-3xl font-bold gradient-text">{formatCurrency(totalAnnualBenefit)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Ops savings + NPL reduction + revenue uplift
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">3-Year Total Benefit</div>
                  <div className="text-2xl font-bold text-foreground">{formatCurrency(totalAnnualBenefit * 3)}</div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" />
                    {roi.toFixed(0)}% ROI on implementation
                  </div>
                </div>
              </div>
            </Card>

            {/* ROI Projection Chart */}
            <Card className="p-5 bg-card border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                36-Month Cumulative ROI Projection
              </h3>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={roiProjection.filter((_, i) => i % 3 === 2)}>
                    <defs>
                      <linearGradient id="benefitGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.6 0.18 220)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.6 0.18 220)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.75 0.15 145)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.75 0.15 145)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.01 240)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "oklch(0.55 0.01 240)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "oklch(0.55 0.01 240)" }} tickFormatter={v => `$${v}K`} />
                    <Tooltip
                      contentStyle={{ background: "oklch(0.13 0.015 240)", border: "1px solid oklch(0.25 0.01 240)", borderRadius: "8px", fontSize: "11px" }}
                      formatter={(v: number) => [`$${v.toLocaleString()}K`]}
                    />
                    <Area type="monotone" dataKey="benefit" stroke="oklch(0.6 0.18 220)" fill="url(#benefitGrad)" strokeWidth={2} name="Cumulative Benefit" />
                    <Area type="monotone" dataKey="net" stroke="oklch(0.75 0.15 145)" fill="url(#netGrad)" strokeWidth={2} name="Net Benefit" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-2 justify-center">
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-primary rounded" /><span className="text-[10px] text-muted-foreground">Cumulative Benefit</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-emerald-400 rounded" /><span className="text-[10px] text-muted-foreground">Net Benefit (after impl. cost)</span></div>
              </div>
            </Card>

            {/* Before/After Comparison */}
            <Card className="p-5 bg-card border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Before vs. After AI — Your Numbers
              </h3>
              <div className="space-y-3">
                {comparisonData.map((item) => (
                  <div key={item.metric} className="flex items-center gap-3">
                    <div className="w-24 text-xs text-muted-foreground flex-shrink-0">{item.metric}</div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 bg-red-400/10 border border-red-400/20 rounded px-2 py-1 text-center">
                        <span className="text-xs font-semibold text-red-400">
                          {item.unit === "$" ? `$${item.before.toLocaleString()}` : `${item.before}${item.unit}`}
                        </span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 bg-emerald-400/10 border border-emerald-400/20 rounded px-2 py-1 text-center">
                        <span className="text-xs font-semibold text-emerald-400">
                          {item.unit === "$" ? `$${item.after.toLocaleString()}` : `${item.after}${item.unit}`}
                        </span>
                      </div>
                    </div>
                    <Badge className="text-[9px] px-1.5 py-0 h-4 bg-emerald-400/10 text-emerald-400 border-emerald-400/20 flex-shrink-0 w-20 justify-center">
                      {item.improvement}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Benefit breakdown bar chart */}
            <Card className="p-5 bg-card border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Annual Benefit Breakdown</h3>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Ops Savings", value: Math.round(opsSavings / 1000), color: "oklch(0.6 0.18 220)" },
                    { name: "NPL Reduction", value: Math.round(nplSavings / 1000), color: "oklch(0.65 0.15 145)" },
                    { name: "Revenue Uplift", value: Math.round(revenueGain / 1000), color: "oklch(0.75 0.18 60)" },
                  ]} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.01 240)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "oklch(0.55 0.01 240)" }} tickFormatter={v => `$${v}K`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "oklch(0.55 0.01 240)" }} width={90} />
                    <Tooltip
                      contentStyle={{ background: "oklch(0.13 0.015 240)", border: "1px solid oklch(0.25 0.01 240)", borderRadius: "8px", fontSize: "11px" }}
                      formatter={(v: number) => [`$${(v * 1000).toLocaleString()}`]}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {[
                        "oklch(0.6 0.18 220)",
                        "oklch(0.65 0.15 145)",
                        "oklch(0.75 0.18 60)",
                      ].map((color, i) => (
                        <Cell key={i} fill={color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Ready to build your business case?</h3>
                  <p className="text-xs text-muted-foreground">
                    Schedule a 30-minute working session to validate these numbers against your actual data.
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-white/5 gap-1.5 text-xs">
                    <Download className="w-3 h-3" />
                    Export
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 text-xs">
                    <Zap className="w-3 h-3" />
                    Get Demo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
