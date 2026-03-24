import { useState } from "react";
import LendingLayout from "@/components/LendingLayout";
import { approvalWorkflow, deals, formatCurrency } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  GitBranch, CheckCircle2, Clock, User, Brain,
  Shield, ChevronRight, AlertTriangle, Building2, DollarSign,
  ArrowRight, Zap
} from "lucide-react";
import { toast } from "sonner";

const doaMatrix = [
  { level: "RM + Branch Manager", limit: "$2M", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
  { level: "VP Credit + RM", limit: "$5M", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  { level: "Senior Credit Committee", limit: "$25M", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  { level: "Chief Credit Officer", limit: "$50M", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  { level: "Board Credit Committee", limit: "$50M+", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30" },
];

export default function ApprovalWorkflow() {
  const [approving, setApproving] = useState(false);
  const workflow = approvalWorkflow;
  const deal = deals.find(d => d.id === workflow.deal) || deals[2];

  const handleApprove = () => {
    setApproving(true);
    setTimeout(() => {
      setApproving(false);
      toast.success("Deal approved by Senior Credit Committee", {
        description: "Approval Flow Agent routing to Closing & Booking Agent.",
      });
    }, 2000);
  };

  const getStageIcon = (stage: typeof workflow.stages[0]) => {
    if (stage.approver.includes('AI')) {
      return <Brain className="w-4 h-4 text-primary" />;
    }
    if (stage.status === 'approved') return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    if (stage.status === 'pending') return <Clock className="w-4 h-4 text-yellow-400 agent-active" />;
    return <div className="w-4 h-4 rounded-full border border-muted-foreground" />;
  };

  return (
    <LendingLayout title="Approval Workflow" subtitle={`${deal.borrower} · ${deal.id}`}>
      <div className="p-4 lg:p-6 space-y-6">

        {/* Deal summary */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{deal.borrower}</div>
                <div className="text-xs text-muted-foreground">{deal.id} · {deal.loanType}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{formatCurrency(deal.amount)}</div>
                <div className="text-xs text-muted-foreground">Loan Amount</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{deal.aiScore}/100</div>
                <div className="text-xs text-muted-foreground">AI Score</div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/30">
                <div className="text-xs font-medium text-yellow-400">Pending Committee</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Approval stages */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Approval Chain</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                {workflow.stages.filter(s => s.status === 'approved').length}/{workflow.stages.length} stages complete
              </div>
            </div>

            <div className="p-5 space-y-0">
              {workflow.stages.map((stage, idx) => (
                <div key={stage.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {idx < workflow.stages.length - 1 && (
                    <div className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${
                      stage.status === 'approved' ? 'bg-green-400/40' : 'bg-border'
                    }`} />
                  )}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                      stage.status === 'approved' ? 'bg-green-400/10 border-green-400/30' :
                      stage.status === 'pending' ? 'bg-yellow-400/10 border-yellow-400/30' :
                      'bg-muted border-border'
                    }`}>
                      {getStageIcon(stage)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium text-foreground">{stage.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {stage.approver.includes('AI') ? (
                            <Brain className="w-3 h-3 text-primary" />
                          ) : (
                            <User className="w-3 h-3 text-muted-foreground" />
                          )}
                          <span className={`text-xs ${stage.approver.includes('AI') ? 'text-primary' : 'text-muted-foreground'}`}>
                            {stage.approver}
                          </span>
                          <span className="text-[10px] text-muted-foreground/60">· {stage.role}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {stage.date && <div className="text-[10px] text-muted-foreground">{stage.date}</div>}
                        <div className={`text-[10px] font-medium mt-0.5 ${
                          stage.status === 'approved' ? 'text-green-400' :
                          stage.status === 'pending' ? 'text-yellow-400' :
                          'text-muted-foreground'
                        }`}>
                          {stage.status === 'approved' ? '✓ Approved' : stage.status === 'pending' ? '⏳ Pending' : '○ Waiting'}
                        </div>
                      </div>
                    </div>
                    {stage.comment && (
                      <div className="mt-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50">
                        <p className="text-xs text-muted-foreground italic">"{stage.comment}"</p>
                      </div>
                    )}
                    {stage.status === 'pending' && (
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={handleApprove}
                          disabled={approving}
                          className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 h-7 text-xs gap-1.5"
                        >
                          {approving ? (
                            <><div className="w-3 h-3 rounded-full border-2 border-green-400 border-t-transparent animate-spin" /> Approving...</>
                          ) : (
                            <><CheckCircle2 className="w-3 h-3" /> Approve</>
                          )}
                        </Button>
                        <Button size="sm" variant="outline" className="border-border text-muted-foreground h-7 text-xs">
                          Request Changes
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-400/30 text-red-400 hover:bg-red-400/10 h-7 text-xs">
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOA matrix + AI routing */}
          <div className="space-y-4">
            {/* AI routing explanation */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">AI Routing Logic</h3>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] text-primary font-bold">1</span>
                  </div>
                  <span>Approval Flow Agent reads deal amount ($22M) and risk score (88)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] text-primary font-bold">2</span>
                  </div>
                  <span>Matches against DOA matrix — $22M requires Senior Credit Committee</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] text-primary font-bold">3</span>
                  </div>
                  <span>Schedules committee meeting, sends memo package to all approvers</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] text-primary font-bold">4</span>
                  </div>
                  <span>Captures decision, generates condition letter, routes to closing</span>
                </div>
              </div>
            </div>

            {/* DOA Matrix */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Delegation of Authority</h3>
              </div>
              <div className="divide-y divide-border/50">
                {doaMatrix.map((level, i) => (
                  <div key={level.level} className={`flex items-center gap-3 px-4 py-3 ${i === 2 ? 'bg-yellow-400/5' : ''}`}>
                    <div className={`w-6 h-6 rounded-full ${level.bg} border ${level.border} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-[9px] font-bold ${level.color}`}>{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-foreground">{level.level}</div>
                      <div className={`text-[10px] ${level.color}`}>Up to {level.limit}</div>
                    </div>
                    {i === 2 && (
                      <div className="text-[9px] px-1.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                        Current
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Expected Timeline</h3>
              <div className="space-y-2">
                {[
                  { label: "Committee Meeting", value: "Today, 3:00 PM" },
                  { label: "Decision Expected", value: "Today, 5:00 PM" },
                  { label: "Condition Letter", value: "Tomorrow AM" },
                  { label: "Closing Target", value: "Mar 12, 2024" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                Total time-to-decision: <span className="text-green-400 font-medium">4 days</span>
                <span className="text-muted-foreground/60 ml-1">(vs. 21d industry avg)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}


