import { Link, useParams } from "wouter";
import LendingLayout from "@/components/LendingLayout";
import { deals, formatCurrency, stageColors, riskColors, agentActivities } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, FileText, BarChart3, Brain, Shield, GitBranch,
  CheckCircle2, Circle, Clock, AlertTriangle, ChevronRight,
  Building2, User, MapPin, Calendar, TrendingUp, Activity
} from "lucide-react";

const journeySteps = [
  { stage: "Application Intake", agent: "Intake & Eligibility Agent", status: "completed", date: "Mar 1, 2024", duration: "< 1 hour", actions: ["Pre-screening completed", "Eligibility confirmed", "RM notified", "Deal created in LOS"] },
  { stage: "Document Collection", agent: "Document Orchestration Agent", status: "completed", date: "Mar 1–3, 2024", duration: "2 days", actions: ["14 documents requested", "12 received & classified", "2 missing items flagged", "Client notified automatically"] },
  { stage: "Financial Spreading", agent: "Document Understanding & Spreading Agent", status: "completed", date: "Mar 3, 2024", duration: "2 hours", actions: ["3-year financials spread", "Ratios calculated", "Trend analysis generated", "1 item flagged for review"] },
  { stage: "Credit Analysis", agent: "Underwriting Copilot", status: "active", date: "Mar 4, 2024", duration: "In progress", actions: ["Draft credit memo generated", "8 risk factors identified", "AI Score: 82/100", "Awaiting underwriter review"] },
  { stage: "Compliance Review", agent: "Compliance & Policy Agent", status: "pending", date: "—", duration: "~1 hour", actions: ["BSA/AML screening", "OFAC check", "Policy rule validation", "CRA assessment"] },
  { stage: "Approval Routing", agent: "Approval Flow Agent", status: "pending", date: "—", duration: "~1 day", actions: ["DOA matrix routing", "Committee scheduling", "Decision capture", "Condition letter generation"] },
  { stage: "Closing & Booking", agent: "Closing & Booking Agent", status: "pending", date: "—", duration: "~1 day", actions: ["Loan docs generated", "Signatures collected", "Core banking booking", "Disbursement initiated"] },
];

export default function DealDetail() {
  const params = useParams();
  const dealId = params.id || 'DL-2024-001';
  const deal = deals.find(d => d.id === dealId) || deals[0];
  const dealActivities = agentActivities.filter(a => a.deal === deal.id).slice(0, 4);

  return (
    <LendingLayout title={deal.id} subtitle={deal.borrower}>
      <div className="p-4 lg:p-6 space-y-6">

        {/* Back + Header */}
        <div className="flex items-start justify-between">
          <Link href="/dashboard">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Pipeline
            </button>
          </Link>
        </div>

        {/* Deal header card */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{deal.borrower}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${stageColors[deal.stage]}`}>{deal.stage}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${riskColors[deal.riskRating]}`}>{deal.riskRating} Risk</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{deal.city}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />Submitted {deal.submittedDate}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 max-w-lg">{deal.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-2xl font-bold text-foreground">{formatCurrency(deal.amount)}</div>
              <div className="text-xs text-muted-foreground">{deal.loanType}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-xs text-muted-foreground">AI Score</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 bg-muted rounded-full">
                    <div className="h-full rounded-full bg-green-400" style={{ width: `${deal.aiScore}%` }} />
                  </div>
                  <span className="text-sm font-bold text-green-400">{deal.aiScore}/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-border">
            {[
              { label: "DSCR", value: `${deal.dscr}x`, status: deal.dscr >= 1.25 ? "pass" : "fail", benchmark: "Min 1.25x" },
              { label: "LTV", value: `${deal.ltv}%`, status: deal.ltv <= 75 ? "pass" : "fail", benchmark: "Max 75%" },
              { label: "Industry", value: deal.industry, status: "neutral", benchmark: "" },
              { label: "RM", value: deal.rm, status: "neutral", benchmark: "" },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-[10px] text-muted-foreground mb-1">{m.label}</div>
                <div className={`text-sm font-semibold ${m.status === 'pass' ? 'text-green-400' : m.status === 'fail' ? 'text-red-400' : 'text-foreground'}`}>{m.value}</div>
                {m.benchmark && <div className="text-[10px] text-muted-foreground">{m.benchmark}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">Journey Progress</span>
            <span className="text-xs text-muted-foreground">{deal.progress}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full progress-glow transition-all duration-500" style={{ width: `${deal.progress}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            {['Application', 'Documents', 'Spreading', 'Underwriting', 'Approval', 'Closing', 'Active'].map((s, i) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-1.5 h-1.5 rounded-full ${i * 14 <= deal.progress ? 'bg-primary' : 'bg-muted'}`} />
                <span className="text-[9px] text-muted-foreground mt-1 hidden sm:block">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey timeline + quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Timeline */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-5">Agent Journey Timeline</h3>
            <div className="space-y-0">
              {journeySteps.map((step, idx) => (
                <div key={step.stage} className="relative flex gap-4 pb-6 last:pb-0">
                  {idx < journeySteps.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="flex-shrink-0 mt-0.5">
                    {step.status === 'completed' ? (
                      <div className="w-8 h-8 rounded-full bg-green-400/15 border border-green-400/30 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                    ) : step.status === 'active' ? (
                      <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center agent-active">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium text-foreground">{step.stage}</div>
                        <div className="text-[10px] text-primary mt-0.5">{step.agent}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[10px] text-muted-foreground">{step.date}</div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground justify-end mt-0.5">
                          <Clock className="w-2.5 h-2.5" />{step.duration}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {step.actions.map((action) => (
                        <span key={action} className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          step.status === 'completed' ? 'bg-green-400/5 border-green-400/20 text-green-400/80' :
                          step.status === 'active' ? 'bg-primary/5 border-primary/20 text-primary/80' :
                          'bg-muted border-border text-muted-foreground'
                        }`}>
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions + recent activity */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "View Documents", href: `/documents/${deal.id}`, icon: FileText, color: "text-purple-400" },
                  { label: "Financial Spreading", href: `/spreading/${deal.id}`, icon: BarChart3, color: "text-yellow-400" },
                  { label: "Credit Memo", href: `/credit-memo/${deal.id}`, icon: Brain, color: "text-green-400" },
                  { label: "Compliance Check", href: `/compliance/${deal.id}`, icon: Shield, color: "text-red-400" },
                  { label: "Approval Workflow", href: `/approval/${deal.id}`, icon: GitBranch, color: "text-blue-400" },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                      <span className="text-xs text-foreground flex-1">{action.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent agent activity */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Recent Agent Activity</h3>
              {dealActivities.length > 0 ? (
                <div className="space-y-3">
                  {dealActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                        activity.status === 'completed' ? 'bg-green-400' :
                        activity.status === 'alert' ? 'bg-orange-400' :
                        activity.status === 'review' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                      <div>
                        <div className="text-[10px] text-primary font-medium">{activity.agent}</div>
                        <div className="text-[10px] text-muted-foreground">{activity.action}</div>
                        <div className="text-[9px] text-muted-foreground/60 mt-0.5">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground text-center py-4">No recent activity for this deal</div>
              )}
              <Link href="/agents">
                <button className="mt-3 w-full text-[10px] text-primary hover:text-primary/80 transition-colors">
                  View all agent activity →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
