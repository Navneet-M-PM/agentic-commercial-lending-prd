import { useState } from "react";
import LendingLayout from "@/components/LendingLayout";
import { complianceChecks, deals } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  Shield, CheckCircle2, AlertTriangle, XCircle, Clock,
  FileText, Eye, Download, Zap, Search, Filter
} from "lucide-react";
import { toast } from "sonner";

const auditTrail = [
  { time: "Mar 4, 2024 09:14", agent: "Compliance & Policy Agent", action: "BSA/AML screening initiated for Meridian Tech Solutions", result: "Pass", icon: "shield" },
  { time: "Mar 4, 2024 09:14", agent: "Compliance & Policy Agent", action: "OFAC SDN list check completed — no matches found", result: "Pass", icon: "shield" },
  { time: "Mar 4, 2024 09:15", agent: "Compliance & Policy Agent", action: "Beneficial ownership verification completed (4 owners)", result: "Pass", icon: "shield" },
  { time: "Mar 4, 2024 09:16", agent: "Compliance & Policy Agent", action: "CRA assessment — loan qualifies as community development", result: "Pass", icon: "shield" },
  { time: "Mar 4, 2024 09:17", agent: "Compliance & Policy Agent", action: "Policy rule check: LTV 68% vs max 75% — within limits", result: "Pass", icon: "shield" },
  { time: "Mar 4, 2024 09:17", agent: "Compliance & Policy Agent", action: "Policy rule check: DSCR 1.42x vs min 1.25x — within limits", result: "Pass", icon: "shield" },
  { time: "Mar 4, 2024 09:18", agent: "Compliance & Policy Agent", action: "Industry concentration check — Tech sector at 18% (limit 25%)", result: "Pass", icon: "shield" },
  { time: "Mar 4, 2024 09:19", agent: "Compliance & Policy Agent", action: "Environmental risk flag — Phase I ESA required for real estate collateral", result: "Flag", icon: "alert" },
  { time: "Mar 4, 2024 09:20", agent: "Compliance & Policy Agent", action: "Compliance summary report generated and attached to deal file", result: "Complete", icon: "check" },
];

export default function Compliance() {
  const [runningCheck, setRunningCheck] = useState(false);
  const [checkProgress, setCheckProgress] = useState(0);
  const deal = deals[0];

  const passCount = complianceChecks.filter(c => c.status === 'pass').length;
  const failCount = complianceChecks.filter(c => c.status === 'fail').length;
  const flagCount = complianceChecks.filter(c => c.status === 'flag').length;
  const pendingCount = complianceChecks.filter(c => c.status === 'pending').length;

  const runCompliance = () => {
    setRunningCheck(true);
    setCheckProgress(0);
    const interval = setInterval(() => {
      setCheckProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setRunningCheck(false);
          toast.success("Compliance check complete", {
            description: `${passCount} passed, ${flagCount} flagged, ${failCount} failed.`,
          });
          return 100;
        }
        return p + 5;
      });
    }, 80);
  };

  return (
    <LendingLayout title="Compliance Dashboard" subtitle={`${deal.borrower} · ${deal.id}`}>
      <div className="p-4 lg:p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Compliance & Policy Agent</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="status-live w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                <span className="text-xs text-green-400">All checks complete · 1 flag requires review</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-border text-muted-foreground gap-1.5 text-xs h-8">
              <Download className="w-3.5 h-3.5" /> Export Report
            </Button>
            <Button size="sm" onClick={runCompliance} disabled={runningCheck} className="bg-red-400/20 text-red-400 hover:bg-red-400/30 border border-red-400/30 gap-1.5 text-xs h-8">
              <Zap className="w-3.5 h-3.5" /> {runningCheck ? "Running..." : "Re-run Checks"}
            </Button>
          </div>
        </div>

        {/* Progress when running */}
        {runningCheck && (
          <div className="bg-card border border-red-400/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-red-400/10 flex items-center justify-center agent-active">
                <Shield className="w-3 h-3 text-red-400" />
              </div>
              <span className="text-xs font-medium text-red-400">Running compliance checks...</span>
              <span className="text-xs text-muted-foreground ml-auto">{checkProgress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-red-400 rounded-full transition-all duration-100" style={{ width: `${checkProgress}%` }} />
            </div>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Passed", value: passCount, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10", border: "metric-card-green" },
            { label: "Flagged", value: flagCount, icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "metric-card-yellow" },
            { label: "Failed", value: failCount, icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", border: "metric-card-red" },
            { label: "Pending", value: pendingCount, icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10", border: "metric-card-blue" },
          ].map((s) => (
            <div key={s.label} className={`bg-card border border-border rounded-xl p-4 ${s.border}`}>
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Checks list */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Compliance Checks</h3>
              <span className="text-xs text-muted-foreground">{complianceChecks.length} checks</span>
            </div>
            <div className="divide-y divide-border/50">
              {complianceChecks.map((check) => (
                <div key={check.id} className={`flex items-start gap-3 px-4 py-4 hover:bg-white/2 transition-colors ${
                  check.status === 'flag' ? 'bg-yellow-400/3' : check.status === 'fail' ? 'bg-red-400/3' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    check.status === 'pass' ? 'bg-green-400/10' :
                    check.status === 'flag' ? 'bg-yellow-400/10' :
                    check.status === 'fail' ? 'bg-red-400/10' : 'bg-blue-400/10'
                  }`}>
                    {check.status === 'pass' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> :
                     check.status === 'flag' ? <AlertTriangle className="w-4 h-4 text-yellow-400" /> :
                     check.status === 'fail' ? <XCircle className="w-4 h-4 text-red-400" /> :
                     <Clock className="w-4 h-4 text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-medium text-foreground">{check.rule}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{check.category}</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        check.status === 'pass' ? 'bg-green-400/10 border-green-400/30 text-green-400' :
                        check.status === 'flag' ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' :
                        check.status === 'fail' ? 'bg-red-400/10 border-red-400/30 text-red-400' :
                        'bg-blue-400/10 border-blue-400/30 text-blue-400'
                      }`}>
                        {check.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{check.details}</p>
                    {check.status === 'flag' && (
                      <div className="mt-2 flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 h-6 text-[10px] px-2">
                          Review & Clear
                        </Button>
                        <Button size="sm" variant="outline" className="border-border text-muted-foreground h-6 text-[10px] px-2">
                          Add Note
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit trail */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Audit Trail</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Immutable log of all agent actions</p>
            </div>
            <div className="divide-y divide-border/50 max-h-[500px] overflow-y-auto">
              {auditTrail.map((entry, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      entry.result === 'Pass' ? 'bg-green-400/10' :
                      entry.result === 'Flag' ? 'bg-yellow-400/10' : 'bg-blue-400/10'
                    }`}>
                      {entry.result === 'Pass' ? <CheckCircle2 className="w-3 h-3 text-green-400" /> :
                       entry.result === 'Flag' ? <AlertTriangle className="w-3 h-3 text-yellow-400" /> :
                       <CheckCircle2 className="w-3 h-3 text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-muted-foreground/70">{entry.time}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{entry.action}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border bg-muted/20">
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Tamper-proof · Regulator-accessible
              </div>
            </div>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
