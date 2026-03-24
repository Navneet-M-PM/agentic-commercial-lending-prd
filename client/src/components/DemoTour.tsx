import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { X, ChevronRight, ChevronLeft, Play, Zap, FileText, BarChart3, Brain, GitBranch, CheckCircle2, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TourStep {
  id: number;
  title: string;
  description: string;
  route: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  highlight: string;
  duration: string;
  agentName: string;
}

const tourSteps: TourStep[] = [
  {
    id: 1,
    title: "Pipeline Dashboard",
    description: "Start here to see the full lending pipeline. 6 live deals across every stage — Application, Document Review, Underwriting, Approval, and Monitoring. Each deal shows an AI risk score, days in stage, and deal size at a glance.",
    route: "/dashboard",
    icon: Zap,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10 border-blue-400/20",
    highlight: "Notice the AI risk scores (0–100) and the 'Days in Stage' counter — the platform flags any deal stalled beyond SLA.",
    duration: "~45 sec",
    agentName: "Intake & Eligibility Agent",
  },
  {
    id: 2,
    title: "Document AI Processing",
    description: "Click into TechVentures Capital's document folder. Watch the AI classify 14 document types in real-time, check completeness against the deal checklist, and flag a suspicious tax return for human review.",
    route: "/documents/DL-2024-001",
    icon: FileText,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10 border-purple-400/20",
    highlight: "The Document Orchestration Agent classifies documents at 94% accuracy. Any item below 85% confidence is automatically queued for human review.",
    duration: "~60 sec",
    agentName: "Document Orchestration Agent",
  },
  {
    id: 3,
    title: "AI Financial Spreading",
    description: "The Spreading Agent has auto-extracted 3 years of financials from PDF statements. See DSCR at 1.42x, revenue growth at 23% CAGR, and 6 flagged line items where confidence dropped below threshold.",
    route: "/spreading/DL-2024-001",
    icon: BarChart3,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10 border-yellow-400/20",
    highlight: "What took a senior analyst 72 hours now takes 2 hours — with source citations for every extracted number. Click any cell to see the source document page.",
    duration: "~60 sec",
    agentName: "Document Understanding & Spreading Agent",
  },
  {
    id: 4,
    title: "AI Credit Memo",
    description: "The Underwriting Copilot has drafted a full credit memo — executive summary, financial analysis, risk factors, and recommended structure. Every data point is a clickable citation linking back to the source document.",
    route: "/credit-memo/DL-2024-001",
    icon: Brain,
    color: "text-green-400",
    bgColor: "bg-green-400/10 border-green-400/20",
    highlight: "Try the 'Generate Live Memo' button — this calls a real AI model to generate a fresh credit memo from the financial data in real-time.",
    duration: "~90 sec",
    agentName: "Underwriting Copilot Agent",
  },
  {
    id: 5,
    title: "Approval Workflow",
    description: "The Approval Flow Agent has read the deal parameters ($4.5M, risk score 82) and automatically routed to VP Credit + RM per the DOA matrix. See the full approval chain, committee scheduling, and condition letter.",
    route: "/approval/DL-2024-003",
    icon: GitBranch,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10 border-cyan-400/20",
    highlight: "The entire routing decision — which approvers, which committee, which conditions — is automated and auditable. Humans make the decision; agents handle everything else.",
    duration: "~45 sec",
    agentName: "Approval Flow Agent",
  },
];

interface DemoTourProps {
  onClose?: () => void;
}

export default function DemoTour({ onClose }: DemoTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [, navigate] = useLocation();

  const step = tourSteps[currentStep];

  const handleStart = useCallback(() => {
    setHasStarted(true);
    setCurrentStep(0);
    navigate(tourSteps[0].route);
  }, [navigate]);

  const handleNext = useCallback(() => {
    if (currentStep < tourSteps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      navigate(tourSteps[next].route);
    } else {
      // Tour complete
      setIsOpen(false);
      setHasStarted(false);
      setCurrentStep(0);
    }
  }, [currentStep, navigate]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      navigate(tourSteps[prev].route);
    }
  }, [currentStep, navigate]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setHasStarted(false);
    setCurrentStep(0);
    onClose?.();
  }, [onClose]);

  const handleJumpToStep = useCallback((idx: number) => {
    setCurrentStep(idx);
    navigate(tourSteps[idx].route);
  }, [navigate]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 group"
        title="Start Guided Demo Tour"
      >
        <Map className="w-4 h-4" />
        <span className="text-sm font-semibold">Demo Tour</span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-card border border-border shadow-2xl cursor-pointer hover:bg-card/80 transition-colors"
        onClick={() => setIsMinimized(false)}
      >
        <Map className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium text-foreground">
          {hasStarted ? `Step ${currentStep + 1}/${tourSteps.length}` : "Demo Tour"}
        </span>
        <ChevronRight className="w-3 h-3 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] rounded-2xl border border-border bg-[oklch(0.13_0.015_240)] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[oklch(0.11_0.013_240)]">
        <div className="flex items-center gap-2">
          <Map className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Guided Demo Tour</span>
          <Badge className="text-[9px] px-1.5 py-0 h-4 bg-primary/20 text-primary border-primary/30">
            5 min
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            title="Minimize"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
          </button>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!hasStarted ? (
        /* Welcome screen */
        <div className="p-5">
          <div className="text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
              <Play className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">5-Minute Platform Tour</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Walk through a complete SME loan journey — from application submission to approval — and see how 5 AI agents work together to reduce time-to-decision from 21 days to 4 days.
            </p>
          </div>

          {/* Step previews */}
          <div className="space-y-2 mb-5">
            {tourSteps.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card/50">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${s.bgColor} ${s.color} border`}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground">{s.title}</div>
                  <div className="text-[10px] text-muted-foreground">{s.agentName}</div>
                </div>
                <span className="text-[10px] text-muted-foreground">{s.duration}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={handleStart}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            size="sm"
          >
            <Play className="w-3.5 h-3.5" />
            Start Tour
          </Button>
        </div>
      ) : (
        /* Active tour */
        <div>
          {/* Progress bar */}
          <div className="h-1 bg-border">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
            />
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 px-4 pt-3 pb-1">
            {tourSteps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleJumpToStep(idx)}
                className={`transition-all duration-200 rounded-full ${
                  idx === currentStep
                    ? 'w-6 h-2 bg-primary'
                    : idx < currentStep
                    ? 'w-2 h-2 bg-primary/50'
                    : 'w-2 h-2 bg-border'
                }`}
                title={s.title}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="px-4 py-3">
            {/* Step header */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${step.bgColor} border`}>
                <step.icon className={`w-4 h-4 ${step.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] text-muted-foreground font-medium">
                    Step {currentStep + 1} of {tourSteps.length}
                  </span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground">{step.duration}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                <div className="text-[10px] text-muted-foreground">{step.agentName}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {step.description}
            </p>

            {/* Highlight callout */}
            <div className={`flex gap-2 p-3 rounded-lg border ${step.bgColor} mb-4`}>
              <Zap className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${step.color}`} />
              <p className={`text-[11px] leading-relaxed ${step.color}`}>
                {step.highlight}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex-1 border-border text-foreground hover:bg-white/5 gap-1 text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Back
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                className="flex-2 bg-primary text-primary-foreground hover:bg-primary/90 gap-1 text-xs px-5"
              >
                {currentStep === tourSteps.length - 1 ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Finish Tour
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
