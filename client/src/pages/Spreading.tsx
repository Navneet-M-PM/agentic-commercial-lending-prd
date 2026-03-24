import { useState } from "react";
import LendingLayout from "@/components/LendingLayout";
import { financialData, deals } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { BarChart3, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Zap, Clock, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { toast } from "sonner";

const trendData = [
  { year: 'FY2021', revenue: 18.4, ebitda: 3.26, netIncome: 2.1 },
  { year: 'FY2022', revenue: 21.2, ebitda: 3.88, netIncome: 2.65 },
  { year: 'FY2023', revenue: 24.8, ebitda: 4.72, netIncome: 3.2 },
];

export default function Spreading() {
  const [spreading, setSpreading] = useState(false);
  const [spreadComplete, setSpreadComplete] = useState(true);
  const [progress, setProgress] = useState(100);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const deal = deals[0];

  const runSpread = () => {
    setSpreading(true);
    setSpreadComplete(false);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setSpreading(false);
          setSpreadComplete(true);
          toast.success("Financial spreading complete", { description: "3-year financials spread in 1m 47s. 94% confidence." });
          return 100;
        }
        return p + 2;
      });
    }, 35);
  };

  return (
    <LendingLayout title="Financial Spreading" subtitle={`${deal.borrower} · ${deal.id}`}>
      <div className="p-4 lg:p-6 space-y-6">

        {/* Header strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Document Understanding & Spreading Agent</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="status-live w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                <span className="text-xs text-green-400">Active · 3-year spread complete</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> Spread completed in <span className="text-yellow-400 font-medium">1m 47s</span>
              <span className="text-muted-foreground/60 ml-1">(vs. 3 days manual)</span>
            </div>
            <Button size="sm" onClick={runSpread} disabled={spreading} className="bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 border border-yellow-400/30 gap-1.5">
              <Zap className="w-3.5 h-3.5" /> {spreading ? "Spreading..." : "Re-run Spread"}
            </Button>
          </div>
        </div>

        {/* Progress bar (when running) */}
        {spreading && (
          <div className="bg-card border border-yellow-400/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-yellow-400/10 flex items-center justify-center agent-active">
                <Zap className="w-3 h-3 text-yellow-400" />
              </div>
              <span className="text-xs font-medium text-yellow-400">Spreading Agent Processing...</span>
              <span className="text-xs text-muted-foreground ml-auto">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {progress < 30 ? "Parsing PDF structure..." : progress < 60 ? "Extracting line items..." : progress < 85 ? "Mapping to chart of accounts..." : "Calculating ratios..."}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Income statement spread */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Income Statement Spread</h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> AI Extracted · 97% avg confidence
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5">Line Item</th>
                    <th className="text-right text-[11px] font-medium text-muted-foreground px-4 py-2.5">FY2021</th>
                    <th className="text-right text-[11px] font-medium text-muted-foreground px-4 py-2.5">FY2022</th>
                    <th className="text-right text-[11px] font-medium text-muted-foreground px-4 py-2.5">FY2023</th>
                    <th className="text-right text-[11px] font-medium text-muted-foreground px-4 py-2.5">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {financialData.incomeStatement.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-border/50 cursor-pointer transition-colors ${
                        selectedRow === i ? 'bg-primary/5' : 'hover:bg-white/3'
                      } ${row.label === 'EBITDA' || row.label === 'Net Income' ? 'font-semibold' : ''}`}
                      onClick={() => setSelectedRow(selectedRow === i ? null : i)}
                    >
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-foreground">{row.label}</span>
                          {selectedRow === i && (
                            <span className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">Source: p.12</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">
                        ${(row.fy2021 / 1000000).toFixed(2)}M
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">
                        ${(row.fy2022 / 1000000).toFixed(2)}M
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs font-medium text-foreground">
                        ${(row.fy2023 / 1000000).toFixed(2)}M
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {row.trend === 'up' ? (
                          <TrendingUp className="w-3.5 h-3.5 text-green-400 ml-auto" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 text-red-400 ml-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 bg-muted/20 text-[10px] text-muted-foreground">
              Click any row to see source document reference · All values extracted from FY2023_Annual_Report.pdf
            </div>
          </div>

          {/* Ratios panel */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Key Ratios</h3>
              </div>
              <div className="divide-y divide-border/50">
                {financialData.ratios.map((ratio) => (
                  <div key={ratio.label} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="text-xs font-medium text-foreground">{ratio.label}</div>
                        <div className="text-[10px] text-muted-foreground">{ratio.description}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${ratio.status === 'pass' ? 'text-green-400' : 'text-red-400'}`}>
                          {ratio.label === 'LTV' || ratio.label === 'Gross Margin' || ratio.label === 'Revenue Growth'
                            ? `${ratio.value}%`
                            : `${ratio.value}x`}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {ratio.status === 'pass' ? '✓' : '✗'} Benchmark: {ratio.benchmark}{ratio.label === 'LTV' || ratio.label === 'Gross Margin' || ratio.label === 'Revenue Growth' ? '%' : 'x'}
                        </div>
                      </div>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ratio.status === 'pass' ? 'bg-green-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.min((ratio.value / (ratio.benchmark * 1.5)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flags */}
            <div className="bg-yellow-400/5 border border-yellow-400/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-400">AI Flag — Human Review</span>
              </div>
              <p className="text-xs text-muted-foreground">
                AR days outstanding increased from 42 to 58 days (FY2022 → FY2023). Management attributes to Boeing extended payment terms. Verify with bank statements.
              </p>
              <Button size="sm" variant="outline" className="mt-3 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 text-xs h-7 w-full">
                Mark as Reviewed
              </Button>
            </div>
          </div>
        </div>

        {/* Trend chart */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">3-Year Financial Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trendData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 240)" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip
                contentStyle={{ background: 'oklch(0.13 0.015 240)', border: '1px solid oklch(0.22 0.015 240)', borderRadius: '8px', color: 'oklch(0.97 0.005 240)', fontSize: '12px' }}
                formatter={(v: number) => [`$${v}M`]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'oklch(0.55 0.01 240)' }} />
              <Bar dataKey="revenue" name="Revenue" fill="oklch(0.6 0.18 220)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="ebitda" name="EBITDA" fill="oklch(0.72 0.15 160)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="netIncome" name="Net Income" fill="oklch(0.78 0.12 80)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </LendingLayout>
  );
}
