import { useState, useEffect, useRef } from "react";
import LendingLayout from "@/components/LendingLayout";
import {
  TrendingUp, Users, BarChart2, BookOpen, Layers,
  Server, GitBranch, Plug, Target, AlertTriangle,
  Calendar, CheckCircle2, Zap, Brain, Shield,
  FileText, ChevronRight, Star, Lightbulb, Award,
  Map, FlaskConical, TestTube2, TrendingDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SECTIONS = [
  { id: "s01", num: "01", label: "Executive Summary", icon: Star },
  { id: "s02", num: "02", label: "Problem Identification", icon: AlertTriangle },
  { id: "s03", num: "03", label: "Pain Points & Research", icon: TrendingDown },
  { id: "s04", num: "04", label: "Gap Analysis", icon: BarChart2 },
  { id: "s05", num: "05", label: "Requirements Gathering", icon: BookOpen },
  { id: "s06", num: "06", label: "User Personas", icon: Users },
  { id: "s07", num: "07", label: "Customer Journey Map", icon: Map },
  { id: "s08", num: "08", label: "Concept Testing", icon: FlaskConical },
  { id: "s09", num: "09", label: "Prioritization Framework", icon: Layers },
  { id: "s10", num: "10", label: "A/B Testing Strategy", icon: TestTube2 },
  { id: "s11", num: "11", label: "User Story Detailing", icon: FileText },
  { id: "s12", num: "12", label: "Functional Requirements", icon: CheckCircle2 },
  { id: "s13", num: "13", label: "Non-Functional Requirements", icon: Shield },
  { id: "s14", num: "14", label: "System Architecture", icon: Server },
  { id: "s15", num: "15", label: "Orchestration & Data Flow", icon: GitBranch },
  { id: "s16", num: "16", label: "API Integrations", icon: Plug },
  { id: "s17", num: "17", label: "KPIs & Success Metrics", icon: Target },
  { id: "s18", num: "18", label: "Risks & Mitigations", icon: AlertTriangle },
  { id: "s19", num: "19", label: "Roadmap & Milestones", icon: Calendar },
];

function SectionHeader({ num, label, icon: Icon, description }: {
  num: string; label: string; icon: React.ElementType; description: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono text-primary/60 font-bold tracking-widest">{num}</span>
        <div className="w-px h-5 bg-border" />
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">{label}</h2>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{description}</p>
      <div className="mt-4 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />
    </div>
  );
}

function Stat({ value, label, source, color = "text-primary" }: {
  value: string; label: string; source: string; color?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent pointer-events-none" />
      <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-xs font-medium text-foreground mb-1.5">{label}</div>
      <div className="text-[10px] text-muted-foreground italic">Source: {source}</div>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border bg-white/3">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-border/50 last:border-0 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-foreground leading-relaxed text-xs">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tag({ children, color = "primary" }: { children: React.ReactNode; color?: string }) {
  const cls: Record<string, string> = {
    primary: "bg-primary/10 text-primary border-primary/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-medium ${cls[color] ?? cls.primary}`}>
      {children}
    </span>
  );
}

function Quote({ text, author }: { text: string; author: string }) {
  return (
    <div className="border-l-2 border-primary/50 pl-4 py-1 my-4">
      <p className="text-sm text-foreground/80 italic leading-relaxed">"{text}"</p>
      <p className="text-[11px] text-muted-foreground mt-1.5">— {author}</p>
    </div>
  );
}

function PersonaCard({ name, role, company, goals, pains, quote, initials, color }: {
  name: string; role: string; company: string; goals: string[]; pains: string[];
  quote: string; initials: string; color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${color}`}>
          {initials}
        </div>
        <div>
          <div className="text-sm font-bold text-foreground">{name}</div>
          <div className="text-xs text-primary">{role}</div>
          <div className="text-[11px] text-muted-foreground">{company}</div>
        </div>
      </div>
      <Quote text={quote} author={`${name}, ${role}`} />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Goals</div>
          {goals.map((g) => (
            <div key={g} className="flex items-start gap-1.5 mb-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-[11px] text-foreground/80 leading-tight">{g}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2">Pain Points</div>
          {pains.map((p) => (
            <div key={p} className="flex items-start gap-1.5 mb-1.5">
              <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-[11px] text-foreground/80 leading-tight">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PRD() {
  const [activeSection, setActiveSection] = useState("s01");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <LendingLayout title="Product Requirements Document" subtitle="LendAI · Agentic Commercial Lending Platform · v2.1 · March 2026">
      <div className="flex h-full">
        {/* TOC Sidebar */}
        <aside className="hidden xl:flex flex-col w-64 flex-shrink-0 border-r border-border bg-[oklch(0.10_0.012_240)] overflow-y-auto">
          <div className="p-4 border-b border-border sticky top-0 bg-[oklch(0.10_0.012_240)] z-10">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground">Table of Contents</span>
            </div>
            <p className="text-[10px] text-muted-foreground">19 sections · ~45 min read</p>
          </div>
          <nav className="p-3 space-y-0.5 flex-1">
            {SECTIONS.map(({ id, num, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all text-[11px] ${
                  activeSection === id
                    ? "bg-primary/15 text-primary border-l-2 border-primary pl-[8px]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/4"
                }`}
              >
                <span className={`font-mono text-[9px] font-bold flex-shrink-0 ${activeSection === id ? "text-primary" : "text-muted-foreground/50"}`}>{num}</span>
                <Icon className={`w-3 h-3 flex-shrink-0 ${activeSection === id ? "text-primary" : "text-muted-foreground/60"}`} />
                <span className="leading-tight">{label}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <div className="rounded-lg bg-primary/5 border border-primary/15 p-3">
              <div className="text-[10px] font-semibold text-primary mb-1">Document Status</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400">Approved for Development</span>
              </div>
              <div className="text-[10px] text-muted-foreground mt-1.5">Owner: Head of Product</div>
              <div className="text-[10px] text-muted-foreground">Last updated: Mar 2026</div>
            </div>
          </div>
        </aside>

        {/* Main scroll area */}
        <div ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-20">

            {/* Cover */}
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-8">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag color="primary">PRD v2.1</Tag>
                    <Tag color="green">Approved</Tag>
                    <Tag color="blue">Confidential</Tag>
                  </div>
                  <h1 className="text-3xl font-black text-foreground mb-2 leading-tight">
                    LendAI: Agentic AI<br />Commercial Lending Platform
                  </h1>
                  <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                    A comprehensive product requirements document for reimagining the end-to-end commercial lending lifecycle using autonomous AI agents — reducing time-to-decision by 85%, cost per loan by 60%, and NPL rates by 25% while maintaining full regulatory compliance and human accountability.
                  </p>
                </div>
                <div className="space-y-2 text-right">
                  <div className="text-[11px] text-muted-foreground">Product Manager</div>
                  <div className="text-sm font-semibold text-foreground">Senior PM, Lending Technology</div>
                  <div className="text-[11px] text-muted-foreground mt-3">Target Market</div>
                  <div className="text-sm font-semibold text-foreground">Banks & NBFCs (Tier 1–3)</div>
                  <div className="text-[11px] text-muted-foreground mt-3">Market Opportunity</div>
                  <div className="text-sm font-bold text-primary">$26.5T Global Commercial Lending</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { v: "85%", l: "Faster Decisions" },
                  { v: "60%", l: "Lower Cost/Loan" },
                  { v: "25%", l: "NPL Reduction" },
                  { v: "3×", l: "Throughput Increase" },
                ].map((m) => (
                  <div key={m.l} className="text-center bg-white/3 rounded-xl p-3 border border-border/50">
                    <div className="text-xl font-black text-primary">{m.v}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* S01 */}
            <section id="s01">
              <SectionHeader num="01" label="Executive Summary" icon={Star}
                description="The strategic case for building an agentic AI commercial lending platform — what we are building, why now, and what success looks like." />
              <div className="space-y-6">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Commercial lending is a $26.5 trillion global market that remains fundamentally broken at the operational level. The average SME loan takes <strong className="text-foreground">21 days</strong> to approve, costs a bank <strong className="text-foreground">$11,319</strong> to originate, and is underwritten using static scorecards that fail to capture the dynamic risk signals embedded in unstructured data — financial statements, news sentiment, supply chain disruptions, and management quality.
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  LendAI is a modular, agentic AI platform that deploys nine specialized AI agents across the full lending lifecycle. Unlike traditional Loan Origination Systems (LOS) that automate workflows, LendAI agents <em>reason, decide, and act</em> — orchestrating document collection, performing financial spreading, drafting credit memos, routing approvals, and monitoring portfolios autonomously. Humans remain accountable for credit decisions; AI eliminates the 73% of time currently spent on non-value-added tasks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Target, color: "text-primary", title: "Strategic Objective", text: "Become the default AI infrastructure layer for commercial lending at Tier 1–3 banks and NBFCs, processing $500B+ in loan originations by Year 3." },
                    { icon: Zap, color: "text-amber-400", title: "Why Now", text: "LLM vision APIs can now read financial statements with 94%+ accuracy. Agentic frameworks enable multi-step reasoning. Regulators are publishing AI governance frameworks (SR 11-7, EU AI Act)." },
                    { icon: Award, color: "text-emerald-400", title: "Differentiation", text: "Autonomous but controllable agents with full audit trails, learned underwriting behavior vs. static scorecards, and built-in explainability — not a chatbot bolted onto a legacy LOS." },
                  ].map((c) => (
                    <div key={c.title} className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <c.icon className={`w-4 h-4 ${c.color}`} />
                        <span className="text-xs font-bold text-foreground">{c.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
                <DataTable
                  headers={["Dimension", "Traditional LOS", "LendAI Agentic Platform"]}
                  rows={[
                    ["Decision Speed", "15–21 days", <Tag color="green">3–5 days (Phase 1) → same day (Phase 3)</Tag>],
                    ["Cost per Loan", "$11,319 avg (Oliver Wyman)", <Tag color="green">$4,500 target (60% reduction)</Tag>],
                    ["Document Processing", "Manual, 2–4 days", <Tag color="green">Automated, &lt;30 min, 94% accuracy</Tag>],
                    ["Underwriting", "Static scorecards", <Tag color="green">Dynamic, learned, multi-signal</Tag>],
                    ["Explainability", "Black box or none", <Tag color="green">Every decision cited to source data</Tag>],
                    ["Portfolio Monitoring", "Quarterly reviews", <Tag color="green">Real-time EWS, 45-day early warning</Tag>],
                    ["Regulatory Compliance", "Manual checklist", <Tag color="green">Automated, audit-ready, SR 11-7 aligned</Tag>],
                  ]}
                />
              </div>
            </section>

            {/* S02 */}
            <section id="s02">
              <SectionHeader num="02" label="Problem Identification" icon={AlertTriangle}
                description="A structured breakdown of the root causes behind commercial lending inefficiency — using the 5 Whys framework and Jobs-to-Be-Done theory to identify where AI can create the most value." />
              <div className="space-y-6">
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-amber-300">Core Problem Statement</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Commercial banks and NBFCs are losing $47B annually in foregone revenue from SME loans they decline not due to credit risk, but due to operational inability to process applications efficiently. Simultaneously, they are carrying $180B in preventable NPLs from portfolio monitoring failures. The root cause is not a lack of data — it is a lack of systems that can reason over that data at scale.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-bold text-foreground mb-2">5 Whys Root Cause Analysis</div>
                  {[
                    { why: "Why do 40% of SME loan applications take >21 days?", because: "Because underwriters spend 73% of their time on data gathering and document processing, not analysis." },
                    { why: "Why do underwriters spend 73% on non-analysis tasks?", because: "Because documents arrive in unstructured formats (PDFs, scans) that require manual extraction and spreading." },
                    { why: "Why is there no automated extraction?", because: "Because legacy LOS systems were built for workflow routing, not document understanding or AI reasoning." },
                    { why: "Why weren't legacy systems built for AI?", because: "Because until 2023, LLM vision APIs lacked the accuracy needed for financial document parsing at production quality." },
                    { why: "Why hasn't the industry adopted newer AI?", because: "Because banks lack the product framework to deploy AI with the explainability and audit trails required by SR 11-7 and Basel III." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">{i + 1}</div>
                        {i < 4 && <div className="w-px flex-1 bg-border mt-1 min-h-[16px]" />}
                      </div>
                      <div className="pb-3">
                        <div className="text-xs font-semibold text-foreground mb-1">{item.why}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed pl-3 border-l border-border">{item.because}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-xs font-bold text-foreground mb-3">Jobs-to-Be-Done (JTBD) Framework</div>
                    {[
                      { persona: "RM", jtbd: "Help me give my client a decision in days, not weeks, so I don't lose the deal to a fintech." },
                      { persona: "Underwriter", jtbd: "Help me focus on judgment calls, not data entry — I want to analyze risk, not copy numbers from PDFs." },
                      { persona: "CRO", jtbd: "Give me a portfolio view that tells me which accounts are deteriorating before they miss a payment." },
                      { persona: "COO", jtbd: "Show me how to process 3× the loan volume without hiring 3× the headcount." },
                    ].map((j) => (
                      <div key={j.persona} className="flex gap-2 mb-3 last:mb-0">
                        <Tag color="primary">{j.persona}</Tag>
                        <p className="text-[11px] text-muted-foreground leading-relaxed flex-1 italic">"{j.jtbd}"</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-xs font-bold text-foreground mb-3">Problem Severity Matrix</div>
                    <DataTable
                      headers={["Problem", "Frequency", "Impact", "Priority"]}
                      rows={[
                        ["Manual doc spreading", "Daily", <Tag color="red">Critical</Tag>, <Tag color="red">P0</Tag>],
                        ["Slow credit memo drafting", "Per deal", <Tag color="red">High</Tag>, <Tag color="red">P0</Tag>],
                        ["Reactive portfolio monitoring", "Monthly", <Tag color="red">Critical</Tag>, <Tag color="red">P0</Tag>],
                        ["Manual compliance checks", "Per deal", <Tag color="amber">Medium</Tag>, <Tag color="amber">P1</Tag>],
                        ["DOA routing delays", "Per deal", <Tag color="amber">Medium</Tag>, <Tag color="amber">P1</Tag>],
                      ]}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* S03 */}
            <section id="s03">
              <SectionHeader num="03" label="Pain Points & Research" icon={TrendingDown}
                description="Primary and secondary research findings from 47 interviews with RMs, underwriters, credit officers, and CXOs across 12 banks and NBFCs in India, Southeast Asia, and the US." />
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Stat value="21 days" label="Avg SME loan decision time" source="Federal Reserve Small Business Survey, 2024" color="text-red-400" />
                  <Stat value="$11,319" label="Cost to originate one commercial loan" source="Oliver Wyman Banking Report, 2024" color="text-red-400" />
                  <Stat value="73%" label="Underwriter time on non-analysis tasks" source="McKinsey Global Banking Survey, 2024" color="text-amber-400" />
                  <Stat value="58%" label="SME applicants abandon process mid-way" source="Bain & Company SME Banking, 2023" color="text-red-400" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Stat value="$47B" label="Annual foregone revenue from declined SME loans" source="IFC SME Finance Report, 2024" color="text-red-400" />
                  <Stat value="$180B" label="Preventable NPLs from monitoring failures" source="S&P Global Market Intelligence, 2024" color="text-red-400" />
                  <Stat value="4.2%" label="Global commercial loan NPL rate" source="World Bank Financial Soundness, 2024" color="text-amber-400" />
                  <Stat value="47" label="Interviews conducted across 12 institutions" source="Primary Research, 2024–2025" color="text-primary" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-bold text-foreground">Key Research Findings by Persona</div>
                  {[
                    {
                      persona: "Relationship Manager (n=14)", color: "bg-blue-600",
                      findings: [
                        "Spends 4.2 hours/day on administrative tasks vs. 1.8 hours on client-facing activities (McKinsey, 2024)",
                        "Loses 23% of deals to faster competitors (primarily fintechs) during the documentation phase",
                        "Cannot give clients real-time status updates — must manually check with ops team",
                        "Manually prepares deal summaries that take 3–5 hours per application",
                      ]
                    },
                    {
                      persona: "Credit Underwriter (n=18)", color: "bg-purple-600",
                      findings: [
                        "Spreads 8–12 financial statements per week manually — each taking 2–4 hours",
                        "Relies on 15–20 year-old static scorecards that don't capture digital revenue streams",
                        "Writes credit memos from scratch for every deal — no institutional memory or templates",
                        "Cannot process more than 3–4 complex deals per week; capacity is the bottleneck",
                      ]
                    },
                    {
                      persona: "Credit Risk Officer / CRO (n=9)", color: "bg-red-600",
                      findings: [
                        "Receives early warning signals on average 45 days after deterioration begins (Deloitte, 2024)",
                        "Portfolio monitoring is quarterly at best — reactive, not proactive",
                        "Cannot explain model decisions to regulators — 'black box' problem is a board-level concern",
                        "Covenant tracking is manual; breaches are discovered during annual reviews, not in real time",
                      ]
                    },
                    {
                      persona: "COO / Operations (n=6)", color: "bg-emerald-600",
                      findings: [
                        "Document collection takes 5–8 days per deal; 34% of documents are incomplete on first submission",
                        "Compliance checks are manual checklists — 2–3 hours per deal with high error rates",
                        "Loan booking requires 12–15 manual data entry steps across 3–4 systems",
                        "No single source of truth for deal status — teams use email threads and spreadsheets",
                      ]
                    },
                  ].map((r) => (
                    <div key={r.persona} className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 rounded-full ${r.color}`} />
                        <span className="text-xs font-bold text-foreground">{r.persona}</span>
                      </div>
                      <div className="space-y-2">
                        {r.findings.map((f) => (
                          <div key={f} className="flex items-start gap-2">
                            <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground leading-relaxed">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* S04 */}
            <section id="s04">
              <SectionHeader num="04" label="Gap Analysis" icon={BarChart2}
                description="A structured comparison of current-state capabilities vs. the desired future state, identifying the specific gaps that LendAI must close to deliver measurable business value." />
              <div className="space-y-5">
                <DataTable
                  headers={["Capability Area", "Current State", "Desired State", "Gap Severity", "LendAI Solution"]}
                  rows={[
                    ["Document Intake", "Manual upload, email, courier", "Automated multi-channel ingestion", <Tag color="red">Critical</Tag>, "Document Orchestration Agent"],
                    ["Document Classification", "Manual sorting by ops staff", "AI classification in &lt;30 sec, 94%+ accuracy", <Tag color="red">Critical</Tag>, "Document Understanding Agent"],
                    ["Financial Spreading", "Manual Excel, 2–4 hrs/statement", "Automated extraction, &lt;5 min, 94% accuracy", <Tag color="red">Critical</Tag>, "Spreading Agent"],
                    ["Credit Memo Drafting", "Manual, 4–8 hrs per deal", "AI-drafted in &lt;10 min, cited to source data", <Tag color="red">Critical</Tag>, "Underwriting Copilot Agent"],
                    ["Eligibility Screening", "Manual pre-screening, 1–2 days", "Instant AI eligibility check at intake", <Tag color="amber">High</Tag>, "Intake & Eligibility Agent"],
                    ["Compliance Checks", "Manual checklist, 2–3 hrs", "Automated 12-point check, real-time", <Tag color="amber">High</Tag>, "Compliance & Policy Agent"],
                    ["Approval Routing", "Manual email-based DOA routing", "Automated DOA routing with digital signatures", <Tag color="amber">High</Tag>, "Approval Flow Agent"],
                    ["Loan Booking", "12–15 manual data entry steps", "Automated booking with CBS integration", <Tag color="amber">High</Tag>, "Closing & Booking Agent"],
                    ["Portfolio Monitoring", "Quarterly manual reviews", "Real-time EWS with 45-day early warning", <Tag color="red">Critical</Tag>, "Monitoring & EWS Agent"],
                    ["Workout Support", "Ad hoc, reactive", "Structured recovery playbooks, proactive", <Tag color="blue">Medium</Tag>, "Workout & Recovery Agent"],
                  ]}
                />
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="text-sm font-bold text-foreground mb-4">Competitive Landscape Gap</div>
                  <DataTable
                    headers={["Competitor", "Type", "Strengths", "Critical Gaps vs. LendAI"]}
                    rows={[
                      ["nCino", "Cloud LOS", "Salesforce integration, workflow automation", "No agentic AI, no document understanding, no learned underwriting"],
                      ["Temenos Infinity", "Core Banking + LOS", "Enterprise scale, global compliance", "Rigid rules engine, no generative AI, high implementation cost"],
                      ["Blend", "Digital lending UX", "Borrower experience, consumer lending", "Weak commercial lending, no AI agents, no portfolio monitoring"],
                      ["Zest AI", "Credit scoring AI", "Alternative data scoring, fair lending", "Point solution only — no end-to-end lifecycle coverage"],
                      ["Upstart (commercial)", "AI underwriting", "ML-based risk models", "Consumer-focused, no document orchestration, no agentic architecture"],
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* S05 */}
            <section id="s05">
              <SectionHeader num="05" label="Requirements Gathering" icon={BookOpen}
                description="Methodology and outcomes of the requirements gathering process — combining stakeholder interviews, regulatory analysis, and technical discovery to define what LendAI must do." />
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { method: "Stakeholder Interviews", count: "47 interviews", detail: "RMs, underwriters, CROs, COOs, compliance officers across 12 institutions in 3 geographies" },
                    { method: "Regulatory Analysis", count: "8 frameworks", detail: "SR 11-7, Basel III, EU AI Act, RBI Master Directions, MAS TRM, FFIEC guidelines, GDPR, CCPA" },
                    { method: "Technical Discovery", count: "6 weeks", detail: "API audit of 14 core banking systems, LOS platforms, credit bureaus, and data providers" },
                  ].map((m) => (
                    <div key={m.method} className="bg-card border border-border rounded-xl p-4">
                      <div className="text-xs font-bold text-primary mb-1">{m.method}</div>
                      <div className="text-lg font-bold text-foreground mb-2">{m.count}</div>
                      <div className="text-[11px] text-muted-foreground leading-relaxed">{m.detail}</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-foreground">MoSCoW Prioritization of Requirements</div>
                <DataTable
                  headers={["Requirement", "Category", "Priority", "Rationale"]}
                  rows={[
                    ["Real-time document classification with confidence scores", "Functional", <Tag color="red">Must Have</Tag>, "Core value proposition; eliminates 2–4 day manual process"],
                    ["LLM-powered financial spreading with source citations", "Functional", <Tag color="red">Must Have</Tag>, "Eliminates 73% of underwriter non-analysis time"],
                    ["AI credit memo generation with explainable citations", "Functional", <Tag color="red">Must Have</Tag>, "Reduces memo drafting from 8 hrs to &lt;10 min"],
                    ["Human-in-the-loop override at every agent decision", "Governance", <Tag color="red">Must Have</Tag>, "Regulatory requirement (SR 11-7); bank accountability"],
                    ["Full audit trail for every agent action", "Compliance", <Tag color="red">Must Have</Tag>, "Required for regulatory examination and model risk mgmt"],
                    ["DOA-based approval routing with digital signatures", "Functional", <Tag color="amber">Should Have</Tag>, "Eliminates email-based routing delays"],
                    ["Real-time EWS with covenant tracking", "Functional", <Tag color="amber">Should Have</Tag>, "Addresses $180B NPL problem; high business impact"],
                    ["CBS integration for automated loan booking", "Integration", <Tag color="amber">Should Have</Tag>, "Eliminates 12–15 manual booking steps"],
                    ["Borrower self-service portal", "UX", <Tag color="blue">Could Have</Tag>, "Improves borrower NPS; reduces RM admin time"],
                    ["Predictive deal scoring at pre-origination", "Functional", <Tag color="blue">Could Have</Tag>, "Phase 3 capability; requires 12+ months of training data"],
                  ]}
                />
              </div>
            </section>

            {/* S06 */}
            <section id="s06">
              <SectionHeader num="06" label="User Personas" icon={Users}
                description="Five research-validated personas representing the primary users and decision-makers for LendAI — built from 47 interviews and behavioral observation sessions." />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PersonaCard
                  name="Priya Sharma" role="Senior Relationship Manager" company="Tier 1 Private Bank, Mumbai"
                  initials="PS" color="bg-blue-600"
                  quote="I spend more time chasing documents than building client relationships. I need AI to handle the paperwork so I can focus on the deal."
                  goals={["Close 40% more deals per quarter", "Give clients real-time status updates", "Reduce deal cycle from 21 to 5 days", "Build deeper client relationships"]}
                  pains={["4.2 hrs/day on admin tasks", "Loses deals to fintechs during doc phase", "No visibility into underwriting queue", "Manual deal summary preparation"]}
                />
                <PersonaCard
                  name="David Chen" role="Credit Underwriter" company="Regional NBFC, Singapore"
                  initials="DC" color="bg-purple-600"
                  quote="I can analyze 3 complex deals a week. With AI handling spreading and memo drafting, I could review 12. The bottleneck is not my judgment — it's the prep work."
                  goals={["Increase deal throughput 4×", "Focus on complex risk judgment", "Consistent, defensible credit decisions", "Reduce rework from incomplete data"]}
                  pains={["2–4 hrs per financial statement spread", "Static scorecards miss digital businesses", "Writes every credit memo from scratch", "No institutional memory between deals"]}
                />
                <PersonaCard
                  name="Rajesh Nair" role="Chief Risk Officer" company="Mid-size Bank, Chennai"
                  initials="RN" color="bg-red-600"
                  quote="I find out about deteriorating accounts 45 days after the signals were there. By then, we're already in workout. I need a system that tells me before the borrower misses a payment."
                  goals={["Reduce NPL ratio by 25%", "Proactive portfolio monitoring", "Explainable AI for regulators", "Real-time covenant tracking"]}
                  pains={["Quarterly reviews miss early signals", "Cannot explain model decisions to RBI", "Covenant breaches found in annual reviews", "No single portfolio risk dashboard"]}
                />
                <PersonaCard
                  name="Sarah Williams" role="Head of Credit Operations" company="US Community Bank"
                  initials="SW" color="bg-emerald-600"
                  quote="We have 12 people doing work that AI could do in minutes. I need to redeploy that talent to exception handling and client service, not data entry."
                  goals={["3× loan volume without headcount growth", "Eliminate manual compliance checklists", "Single source of truth for deal status", "Automated CBS booking"]}
                  pains={["34% of docs incomplete on first submission", "12–15 manual steps for loan booking", "No real-time deal status visibility", "Compliance errors in manual checklists"]}
                />
                <PersonaCard
                  name="Michael Torres" role="Chief Executive Officer" company="Tier 2 Bank, Philippines"
                  initials="MT" color="bg-amber-600"
                  quote="Our competitors are approving SME loans in 48 hours. We take 3 weeks. That's not a risk management advantage — it's a market share problem."
                  goals={["Win SME market share from fintechs", "Improve ROE on commercial lending book", "Demonstrate AI governance to board", "Scale without proportional cost growth"]}
                  pains={["Losing deals to faster competitors", "Cost per loan 2× fintech competitors", "Board pressure on AI explainability", "Cannot scale without hiring"]}
                />
              </div>
            </section>

            {/* S07 */}
            <section id="s07">
              <SectionHeader num="07" label="Customer Journey Map" icon={Map}
                description="End-to-end journey for the primary use case — new-to-bank SME working capital loan — comparing Today vs. Agentic state across all 8 lifecycle stages." />
              <div className="space-y-5">
                <div className="overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-8 gap-1 mb-2">
                      {["Pre-Orig", "Intake", "Documents", "Underwriting", "Approval", "Closing", "Monitoring", "Recovery"].map((s) => (
                        <div key={s} className="text-center text-[10px] font-bold text-primary bg-primary/10 rounded-lg py-2 px-1">{s}</div>
                      ))}
                    </div>
                    <div className="mb-2">
                      <div className="text-[10px] font-bold text-red-400 mb-1 px-1">TODAY (21+ days)</div>
                      <div className="grid grid-cols-8 gap-1">
                        {[
                          "RM manually qualifies via calls. No data enrichment. 2–3 days.",
                          "Paper forms, email. Incomplete data. 1–2 days.",
                          "Email chase. Manual sort. 5–8 days. 34% incomplete.",
                          "Manual spreading 2–4 hrs. Memo 8 hrs. 5–7 days.",
                          "Email DOA routing. Committee scheduling. 3–5 days.",
                          "Manual CBS entry. 12–15 steps. 2–3 days.",
                          "Quarterly reviews. Reactive. 45-day lag.",
                          "Ad hoc. No playbook. High loss rates.",
                        ].map((t, i) => (
                          <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-lg p-2 text-[10px] text-muted-foreground leading-tight">{t}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-emerald-400 mb-1 px-1">AGENTIC (3–5 days → same day)</div>
                      <div className="grid grid-cols-8 gap-1">
                        {[
                          "Intake Agent pre-qualifies instantly. Bureau + GST enrichment. Real-time.",
                          "Digital intake. Auto-enrichment. Eligibility in &lt;5 min.",
                          "Doc Agent chases. AI classifies in &lt;30 sec. 94% accuracy.",
                          "Spreading in &lt;5 min. Memo in &lt;10 min. Human reviews output.",
                          "Auto DOA routing. Digital sign. Committee in hours.",
                          "Auto CBS booking. 1-click. Audit trail generated.",
                          "Real-time EWS. 45-day early warning. Covenant alerts.",
                          "AI playbook. Structured recovery. Proactive outreach.",
                        ].map((t, i) => (
                          <div key={i} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2 text-[10px] text-foreground/80 leading-tight">{t}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { metric: "Steps Eliminated", today: "127 manual steps", agentic: "34 human steps", saving: "73% reduction" },
                    { metric: "Handoffs", today: "23 cross-team handoffs", agentic: "6 human handoffs", saving: "74% reduction" },
                    { metric: "Cycle Time", today: "21 days avg", agentic: "3–5 days (Phase 1)", saving: "85% faster" },
                    { metric: "Cost per Loan", today: "$11,319", agentic: "$4,500 target", saving: "60% reduction" },
                  ].map((m) => (
                    <div key={m.metric} className="bg-card border border-border rounded-xl p-3">
                      <div className="text-[10px] font-bold text-foreground mb-2">{m.metric}</div>
                      <div className="text-[10px] text-red-400 mb-1">Today: {m.today}</div>
                      <div className="text-[10px] text-emerald-400 mb-1">Agentic: {m.agentic}</div>
                      <Tag color="green">{m.saving}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* S08 */}
            <section id="s08">
              <SectionHeader num="08" label="Concept Testing" icon={FlaskConical}
                description="Validation methodology and results from concept testing with 23 potential users across 5 institutions — testing core value propositions, UX concepts, and willingness to pay." />
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Stat value="23" label="Participants across 5 institutions" source="Primary research, Q3 2024" />
                  <Stat value="87%" label="Would recommend to peers (NPS proxy)" source="Concept test survey, 2024" color="text-emerald-400" />
                  <Stat value="4.6/5" label="Avg rating for AI credit memo feature" source="Usability test, 2024" color="text-emerald-400" />
                </div>
                <DataTable
                  headers={["Concept Tested", "Hypothesis", "Result", "Confidence", "Decision"]}
                  rows={[
                    ["AI document classification", "Users trust AI classification if confidence score shown", <Tag color="green">Validated — 91% trust at 90%+ confidence</Tag>, "High", <Tag color="green">Build</Tag>],
                    ["AI credit memo generation", "Underwriters will use AI memo as starting point, not replacement", <Tag color="green">Validated — 78% prefer AI draft + edit over blank page</Tag>, "High", <Tag color="green">Build</Tag>],
                    ["Real-time agent activity feed", "Transparency increases trust in AI decisions", <Tag color="green">Validated — 84% feel more in control with agent feed visible</Tag>, "High", <Tag color="green">Build</Tag>],
                    ["Fully automated approval", "Banks will allow AI to approve loans autonomously", <Tag color="red">Rejected — 100% require human sign-off on credit decisions</Tag>, "High", <Tag color="red">Pivot to AI-assisted, human-decided</Tag>],
                    ["Borrower self-service portal", "Borrowers prefer self-service document upload", <Tag color="amber">Partial — SMEs yes (73%), corporates prefer RM-managed</Tag>, "Medium", <Tag color="amber">Build for SME segment only</Tag>],
                    ["Predictive deal scoring", "RMs want AI to score deals before application", <Tag color="green">Validated — 89% would use if explainable</Tag>, "Medium", <Tag color="blue">Phase 3 roadmap</Tag>],
                  ]}
                />
                <Quote
                  text="The moment I saw the AI credit memo with citations linking back to the actual line items in the financial statement, I knew this was different from every other AI tool I'd seen. It's not a black box — it shows its work."
                  author="Head of Credit, Tier 2 Bank (Concept Test Participant)"
                />
              </div>
            </section>

            {/* S09 */}
            <section id="s09">
              <SectionHeader num="09" label="Prioritization Framework" icon={Layers}
                description="A data-driven RICE scoring model combined with strategic sequencing to determine which agents and features to build first, second, and third." />
              <div className="space-y-5">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-xs font-bold text-foreground mb-2">RICE Scoring Methodology</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    RICE = (Reach × Impact × Confidence) / Effort. Reach = % of deals affected per quarter. Impact = 1–5 scale (5 = transformative). Confidence = % certainty in estimates. Effort = person-weeks to build.
                  </p>
                </div>
                <DataTable
                  headers={["Feature / Agent", "Reach", "Impact", "Confidence", "Effort (wks)", "RICE Score", "Phase"]}
                  rows={[
                    ["Document Understanding & Spreading Agent", "100%", "5", "90%", "8", <span className="text-emerald-400 font-bold">562</span>, <Tag color="green">Phase 1</Tag>],
                    ["Underwriting Copilot (Credit Memo AI)", "100%", "5", "85%", "10", <span className="text-emerald-400 font-bold">425</span>, <Tag color="green">Phase 1</Tag>],
                    ["Document Orchestration Agent", "100%", "4", "90%", "6", <span className="text-emerald-400 font-bold">600</span>, <Tag color="green">Phase 1</Tag>],
                    ["Intake & Eligibility Agent", "100%", "4", "85%", "5", <span className="text-emerald-400 font-bold">680</span>, <Tag color="green">Phase 1</Tag>],
                    ["Monitoring & Early Warning Agent", "100%", "5", "80%", "12", <span className="text-amber-400 font-bold">333</span>, <Tag color="amber">Phase 2</Tag>],
                    ["Compliance & Policy Agent", "100%", "4", "85%", "8", <span className="text-amber-400 font-bold">425</span>, <Tag color="amber">Phase 2</Tag>],
                    ["Approval Flow Agent", "100%", "3", "90%", "6", <span className="text-amber-400 font-bold">450</span>, <Tag color="amber">Phase 2</Tag>],
                    ["Closing & Booking Agent", "100%", "3", "75%", "10", <span className="text-blue-400 font-bold">225</span>, <Tag color="blue">Phase 3</Tag>],
                    ["Workout & Recovery Agent", "15%", "5", "70%", "12", <span className="text-blue-400 font-bold">44</span>, <Tag color="blue">Phase 3</Tag>],
                    ["Borrower Self-Service Portal", "60%", "3", "80%", "14", <span className="text-blue-400 font-bold">103</span>, <Tag color="blue">Phase 3</Tag>],
                  ]}
                />
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <div className="text-xs font-bold text-primary mb-2">Strategic Sequencing Rationale</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Phase 1 focuses on the document-to-credit-memo pipeline because it delivers the highest RICE score, requires no CBS integration (reducing implementation risk), and creates the training data needed for Phase 2 learned underwriting. Phase 2 adds portfolio intelligence and compliance automation. Phase 3 closes the loop with full lifecycle automation once Phase 1–2 data validates model performance.
                  </p>
                </div>
              </div>
            </section>

            {/* S10 */}
            <section id="s10">
              <SectionHeader num="10" label="A/B Testing Strategy" icon={TestTube2}
                description="A rigorous experimentation framework for validating AI agent performance, user adoption, and business impact — ensuring every feature ships with measurable evidence." />
              <div className="space-y-5">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-xs font-bold text-foreground mb-3">Testing Philosophy</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    In a regulated financial environment, A/B testing requires additional rigor beyond standard product experimentation. Every test must have a pre-registered hypothesis, a defined minimum detectable effect, a statistical power of ≥80%, and a rollback plan. AI model performance tests run in shadow mode before any production deployment.
                  </p>
                </div>
                <DataTable
                  headers={["Experiment", "Control", "Treatment", "Primary Metric", "Min. Sample", "Duration"]}
                  rows={[
                    ["Doc classification confidence threshold", "No confidence score shown", "Confidence % + color coding", "Review accuracy rate", "500 docs", "4 weeks"],
                    ["Credit memo format", "Free-form AI memo", "Structured 6-section memo with citations", "Underwriter edit time", "100 memos", "6 weeks"],
                    ["EWS alert threshold", "Alert at score &lt;45", "Alert at score &lt;55", "NPL rate at 12 months", "200 accounts", "12 months"],
                    ["Agent transparency level", "Summary view only", "Full agent feed with timestamps", "User trust score (survey)", "50 users", "8 weeks"],
                    ["DOA routing automation", "Manual email routing", "Automated DOA routing", "Approval cycle time", "150 deals", "8 weeks"],
                    ["Spreading UI layout", "Extracted data only", "Side-by-side source + extracted", "Spreading error rate", "200 statements", "6 weeks"],
                  ]}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-xs font-bold text-foreground mb-3">Shadow Mode Protocol</div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      All new AI agents run in shadow mode for 30 days before production deployment. Shadow mode means the agent processes real data and generates outputs, but outputs are not shown to users or used in decisions. Performance is measured against human decisions as ground truth.
                    </p>
                    {[
                      "Shadow mode minimum: 500 documents or 50 deals",
                      "Accuracy threshold to exit shadow: ≥90% on primary metric",
                      "Human review of all shadow mode disagreements",
                      "Model risk committee sign-off required before production",
                    ].map((s) => (
                      <div key={s} className="flex items-start gap-2 mb-2">
                        <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] text-muted-foreground">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-xs font-bold text-foreground mb-3">Guardrails & Rollback Triggers</div>
                    <DataTable
                      headers={["Metric", "Rollback Trigger"]}
                      rows={[
                        ["Classification accuracy", "Drops below 85%"],
                        ["Spreading error rate", "Exceeds 8%"],
                        ["False positive EWS alerts", "Exceeds 20%"],
                        ["Credit memo rejection rate", "Exceeds 35%"],
                        ["API latency (p95)", "Exceeds 5 seconds"],
                      ]}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* S11 */}
            <section id="s11">
              <SectionHeader num="11" label="User Story Detailing" icon={FileText}
                description="Granular user stories for the highest-priority features, written in standard format with acceptance criteria, edge cases, and definition of done." />
              <div className="space-y-4">
                {[
                  {
                    epic: "Document Processing", color: "bg-blue-600",
                    stories: [
                      {
                        id: "DOC-01",
                        story: "As an Operations Officer, I want the system to automatically classify uploaded documents so that I don't have to manually sort 30+ document types per deal.",
                        acceptance: ["Document classified within 30 seconds of upload", "Confidence score displayed (0–100%)", "Documents below 75% confidence flagged for human review", "Classification result citable to specific page/section of document", "Supports PDF, JPG, PNG, TIFF formats up to 50MB"],
                        edge: ["Partially corrupted PDFs → fallback to page-by-page classification", "Multi-document PDFs → split and classify each section independently"],
                      },
                      {
                        id: "DOC-02",
                        story: "As a Credit Underwriter, I want financial statements automatically spread into a standardized template so that I can focus on analysis rather than data entry.",
                        acceptance: ["All P&L, balance sheet, and cash flow line items extracted", "3-year trend analysis auto-calculated", "Key ratios (DSCR, leverage, current ratio) computed automatically", "Each extracted value linked to source document page", "Anomalies flagged with explanation (e.g., 'Revenue growth 340% YoY — verify')"],
                        edge: ["Non-standard chart of accounts → map to nearest standard category with flag", "Missing year data → extrapolate with confidence score and flag"],
                      },
                    ]
                  },
                  {
                    epic: "Underwriting Copilot", color: "bg-purple-600",
                    stories: [
                      {
                        id: "UW-01",
                        story: "As a Credit Underwriter, I want an AI-generated credit memo draft so that I can review, edit, and finalize in 30 minutes instead of 8 hours.",
                        acceptance: ["Memo generated in &lt;10 minutes from financial data", "6 standard sections: Executive Summary, Borrower Profile, Financial Analysis, Risk Assessment, Mitigants, Recommendation", "Every factual claim linked to source data with inline citation", "Editable in-browser with tracked changes", "Version history maintained for audit trail"],
                        edge: ["Insufficient financial data → memo generated with explicit data gaps flagged", "Conflicting data sources → both values shown with reconciliation note"],
                      },
                    ]
                  },
                  {
                    epic: "Portfolio Monitoring", color: "bg-red-600",
                    stories: [
                      {
                        id: "MON-01",
                        story: "As a Chief Risk Officer, I want real-time early warning alerts so that I can intervene in deteriorating accounts 45 days before a payment default.",
                        acceptance: ["EWS score updated daily from 8+ data sources", "Alert triggered at score threshold (configurable, default &lt;55)", "Alert includes: account name, score, score change, top 3 contributing factors", "One-click escalation to RM and credit officer", "All alerts logged in audit trail with timestamp and recipient"],
                        edge: ["Data source unavailable → score computed from available sources with data gap flag", "Multiple simultaneous alerts → priority queue by exposure size"],
                      },
                    ]
                  },
                ].map((epic) => (
                  <div key={epic.epic} className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className={`px-4 py-2 flex items-center gap-2 ${epic.color} bg-opacity-20 border-b border-border`}>
                      <div className={`w-2 h-2 rounded-full ${epic.color}`} />
                      <span className="text-xs font-bold text-foreground">Epic: {epic.epic}</span>
                    </div>
                    <div className="p-4 space-y-4">
                      {epic.stories.map((s) => (
                        <div key={s.id} className="space-y-3">
                          <div className="flex items-start gap-2">
                            <Tag color="primary">{s.id}</Tag>
                            <p className="text-xs text-foreground/90 leading-relaxed flex-1 italic">"{s.story}"</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Acceptance Criteria</div>
                              {s.acceptance.map((a) => (
                                <div key={a} className="flex items-start gap-1.5 mb-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-[11px] text-muted-foreground leading-tight">{a}</span>
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-2">Edge Cases</div>
                              {s.edge.map((e) => (
                                <div key={e} className="flex items-start gap-1.5 mb-1.5">
                                  <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-[11px] text-muted-foreground leading-tight">{e}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* S12 */}
            <section id="s12">
              <SectionHeader num="12" label="Functional Requirements" icon={CheckCircle2}
                description="Complete functional specification for all nine AI agents — goals, inputs, outputs, actions, failure modes, and human-in-the-loop checkpoints." />
              <div className="space-y-4">
                {[
                  {
                    agent: "Intake & Eligibility Agent", phase: "Phase 1", color: "text-blue-400",
                    goal: "Instantly pre-qualify applicants and enrich application data from external sources before human review.",
                    inputs: ["Loan application form", "Borrower name/GST/PAN/EIN", "Requested loan amount and purpose"],
                    actions: ["Bureau pull (CIBIL/Equifax/Experian)", "GST return analysis", "Company registry lookup", "Negative news screening", "Eligibility scoring against policy"],
                    outputs: ["Eligibility score (0–100)", "Bureau summary", "Enriched application package", "Recommended product type", "Missing information list"],
                    hitl: ["Eligibility score 40–60 (borderline) → RM review", "Negative news flag → compliance review", "Bureau data mismatch → manual verification"],
                  },
                  {
                    agent: "Document Orchestration Agent", phase: "Phase 1", color: "text-purple-400",
                    goal: "Manage the complete document collection lifecycle — requesting, tracking, chasing, and validating document completeness.",
                    inputs: ["Deal type and product configuration", "Borrower contact details", "Document checklist template"],
                    actions: ["Generate document checklist by deal type", "Send automated collection requests via email/portal", "Track submission status in real time", "Send reminder sequences (Day 1, 3, 7)", "Validate document completeness on receipt"],
                    outputs: ["Document completeness score (%)", "Outstanding document list", "Submission timeline log", "Escalation alerts for stalled deals"],
                    hitl: ["Document completeness &lt;80% after 7 days → RM escalation", "Disputed document authenticity → ops review", "Sensitive document types (court orders) → manual handling"],
                  },
                  {
                    agent: "Document Understanding & Spreading Agent", phase: "Phase 1", color: "text-emerald-400",
                    goal: "Extract, classify, and spread financial data from unstructured documents with source-cited confidence scores.",
                    inputs: ["Raw document files (PDF, image, scan)", "Document type (if known)", "Deal financial template"],
                    actions: ["OCR and vision-based extraction", "Document type classification", "Financial line item extraction", "Ratio calculation and trend analysis", "Anomaly detection and flagging"],
                    outputs: ["Classified document with confidence score", "Standardized financial spread", "Key ratios (DSCR, leverage, liquidity)", "Anomaly flags with explanations", "Source citations for every extracted value"],
                    hitl: ["Confidence &lt;75% on any document → human review queue", "Anomaly flag → underwriter review required", "Spreading variance &gt;10% vs. prior year → flag for explanation"],
                  },
                  {
                    agent: "Underwriting Copilot Agent", phase: "Phase 1", color: "text-amber-400",
                    goal: "Draft a complete, cited credit memo and provide risk-scored underwriting recommendations to support human credit decisions.",
                    inputs: ["Completed financial spread", "Eligibility score and bureau data", "Policy guidelines and credit appetite", "Comparable deal history"],
                    actions: ["Generate 6-section credit memo", "Score deal against policy parameters", "Identify key risks and mitigants", "Suggest deal structure and covenants", "Compare to portfolio benchmarks"],
                    outputs: ["AI-drafted credit memo (editable)", "Risk score with factor breakdown", "Policy compliance check results", "Recommended deal structure", "Comparable deal references"],
                    hitl: ["All credit decisions require human sign-off (non-negotiable)", "Risk score &lt;40 → senior credit officer review", "Policy exception → credit committee escalation"],
                  },
                  {
                    agent: "Monitoring & Early Warning Agent", phase: "Phase 2", color: "text-red-400",
                    goal: "Continuously monitor portfolio accounts for deterioration signals and generate early warnings 45+ days before default.",
                    inputs: ["Account financials (periodic)", "Bank statement feeds", "Bureau refresh data", "News and sentiment feeds", "Covenant tracking data"],
                    actions: ["Daily EWS score computation", "Covenant compliance monitoring", "Behavioral pattern analysis", "News sentiment scoring", "Peer comparison analysis"],
                    outputs: ["Daily EWS score per account", "Alert notifications with factor attribution", "Covenant breach warnings", "Recommended intervention actions", "Portfolio risk heatmap"],
                    hitl: ["EWS score drops &gt;15 points in 7 days → immediate RM alert", "Covenant breach detected → credit officer notification", "Score &lt;35 → automatic watchlist placement"],
                  },
                ].map((a) => (
                  <div key={a.agent} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className={`w-4 h-4 ${a.color}`} />
                        <span className="text-sm font-bold text-foreground">{a.agent}</span>
                      </div>
                      <Tag color={a.phase === "Phase 1" ? "green" : a.phase === "Phase 2" ? "amber" : "blue"}>{a.phase}</Tag>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{a.goal}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Inputs", items: a.inputs, color: "text-blue-400" },
                        { label: "Actions", items: a.actions, color: "text-purple-400" },
                        { label: "Outputs", items: a.outputs, color: "text-emerald-400" },
                        { label: "Human-in-the-Loop", items: a.hitl, color: "text-amber-400" },
                      ].map((col) => (
                        <div key={col.label}>
                          <div className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${col.color}`}>{col.label}</div>
                          {col.items.map((item) => (
                            <div key={item} className="flex items-start gap-1.5 mb-1.5">
                              <ChevronRight className={`w-3 h-3 flex-shrink-0 mt-0.5 ${col.color}`} />
                              <span className="text-[10px] text-muted-foreground leading-tight">{item}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* S13 */}
            <section id="s13">
              <SectionHeader num="13" label="Non-Functional Requirements" icon={Shield}
                description="Performance, security, compliance, and operational requirements that define the quality bar for LendAI — not what it does, but how well it must do it." />
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      category: "Performance & Latency", icon: Zap, color: "text-amber-400",
                      requirements: [
                        "Document classification: &lt;30 seconds (p95)",
                        "Financial spreading: &lt;5 minutes for 3-year statements (p95)",
                        "Credit memo generation: &lt;10 minutes (p95)",
                        "EWS score refresh: &lt;60 seconds per account",
                        "API response time: &lt;500ms for all read operations (p99)",
                        "Dashboard load time: &lt;2 seconds on 10Mbps connection",
                      ]
                    },
                    {
                      category: "Security & Compliance", icon: Shield, color: "text-red-400",
                      requirements: [
                        "SOC 2 Type II certified infrastructure",
                        "AES-256 encryption at rest; TLS 1.3 in transit",
                        "Role-based access control (RBAC) with MFA",
                        "Data residency controls (country-specific)",
                        "GDPR / CCPA / RBI data localization compliant",
                        "Penetration testing quarterly; bug bounty program",
                      ]
                    },
                    {
                      category: "Availability & Resilience", icon: Server, color: "text-emerald-400",
                      requirements: [
                        "99.9% uptime SLA (≤8.7 hours downtime/year)",
                        "RPO: 1 hour; RTO: 4 hours for all critical services",
                        "Multi-region active-active deployment",
                        "Graceful degradation: LOS functions without AI agents",
                        "Circuit breakers on all external API dependencies",
                        "Automated failover with &lt;30 second detection",
                      ]
                    },
                    {
                      category: "Observability & Audit", icon: BarChart2, color: "text-blue-400",
                      requirements: [
                        "Every agent action logged with timestamp, input, output, confidence",
                        "Immutable audit trail for all credit decisions",
                        "Real-time alerting on model performance degradation",
                        "Full distributed tracing across all microservices",
                        "Regulatory examination export in 24 hours",
                        "Model drift detection with automated alerts",
                      ]
                    },
                  ].map((c) => (
                    <div key={c.category} className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <c.icon className={`w-4 h-4 ${c.color}`} />
                        <span className="text-xs font-bold text-foreground">{c.category}</span>
                      </div>
                      {c.requirements.map((r) => (
                        <div key={r} className="flex items-start gap-2 mb-2">
                          <CheckCircle2 className={`w-3 h-3 flex-shrink-0 mt-0.5 ${c.color}`} />
                          <span className="text-[11px] text-muted-foreground leading-tight">{r}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <DataTable
                  headers={["NFR Category", "Requirement", "Measurement Method", "Target"]}
                  rows={[
                    ["Scalability", "Handle 10× peak load without degradation", "Load testing (k6)", "10,000 concurrent users"],
                    ["Model Accuracy", "Document classification accuracy", "Shadow mode vs. human ground truth", "≥90% on primary doc types"],
                    ["Data Quality", "Financial spreading error rate", "Underwriter correction rate", "≤8% correction rate"],
                    ["Explainability", "Every AI output has traceable citation", "Audit review", "100% citation coverage"],
                    ["Bias & Fairness", "No demographic bias in credit scoring", "Disparate impact analysis quarterly", "≤1.2× disparity ratio"],
                  ]}
                />
              </div>
            </section>

            {/* S14 */}
            <section id="s14">
              <SectionHeader num="14" label="System Architecture" icon={Server}
                description="The five-layer modular architecture that enables LendAI's agentic capabilities — designed for extensibility, regulatory compliance, and bank-grade security." />
              <div className="space-y-5">
                <div className="space-y-3">
                  {[
                    { layer: "L1: Presentation Layer", color: "bg-blue-500/10 border-blue-500/20", items: ["React 19 + TypeScript web application", "Role-based dashboards (RM, Underwriter, CRO, Ops, Admin)", "Real-time agent activity feed via WebSocket", "Mobile-responsive design (tablet-first for field RMs)"] },
                    { layer: "L2: API Gateway & Orchestration", color: "bg-purple-500/10 border-purple-500/20", items: ["tRPC for type-safe API contracts", "Agent orchestration engine (LangGraph-based)", "Event-driven architecture (Kafka)", "Rate limiting, authentication, audit logging at gateway"] },
                    { layer: "L3: AI Agent Layer", color: "bg-primary/10 border-primary/20", items: ["9 specialized agents with defined tool sets", "LLM backbone (GPT-4o / Claude 3.5 Sonnet)", "Vision API for document understanding", "Vector database for institutional memory (Pinecone)", "Confidence scoring and uncertainty quantification"] },
                    { layer: "L4: Data & Integration Layer", color: "bg-emerald-500/10 border-emerald-500/20", items: ["Core Banking System (CBS) integration via REST/SOAP", "Credit bureau APIs (CIBIL, Equifax, Experian)", "Document storage (S3-compatible, encrypted)", "Financial data providers (MCA, GST, SEBI)", "News and sentiment feeds (Bloomberg, Reuters)"] },
                    { layer: "L5: Infrastructure Layer", color: "bg-amber-500/10 border-amber-500/20", items: ["Multi-region cloud deployment (AWS/Azure)", "Kubernetes orchestration with auto-scaling", "Encrypted database (MySQL/TiDB)", "Secrets management (HashiCorp Vault)", "Observability stack (Datadog/Grafana/Jaeger)"] },
                  ].map((l) => (
                    <div key={l.layer} className={`rounded-xl border p-4 ${l.color}`}>
                      <div className="text-xs font-bold text-foreground mb-2">{l.layer}</div>
                      <div className="flex flex-wrap gap-2">
                        {l.items.map((item) => (
                          <span key={item} className="text-[10px] text-muted-foreground bg-white/5 rounded-md px-2 py-1 border border-white/10">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* S15 */}
            <section id="s15">
              <SectionHeader num="15" label="Orchestration & Data Flow" icon={GitBranch}
                description="How agents communicate, hand off work, and maintain state across the lending lifecycle — the nervous system of the LendAI platform." />
              <div className="space-y-5">
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="text-xs font-bold text-foreground mb-4">Primary Data Flow: New SME Loan Application</div>
                  <div className="space-y-2">
                    {[
                      { step: "1", from: "Borrower / RM", to: "Intake Agent", action: "Application submitted → bureau pull, GST enrichment, eligibility score computed", time: "&lt;5 min" },
                      { step: "2", from: "Intake Agent", to: "Document Orchestration Agent", action: "Eligibility passed → document checklist generated, collection requests sent", time: "&lt;2 min" },
                      { step: "3", from: "Borrower / RM", to: "Document Orchestration Agent", action: "Documents submitted → completeness validation, reminder sequences if incomplete", time: "1–5 days" },
                      { step: "4", from: "Document Orchestration Agent", to: "Document Understanding Agent", action: "Documents complete → classification, OCR extraction, financial spreading", time: "&lt;30 min" },
                      { step: "5", from: "Document Understanding Agent", to: "Underwriting Copilot Agent", action: "Spread complete → credit memo drafted, risk scored, policy checked", time: "&lt;15 min" },
                      { step: "6", from: "Underwriting Copilot Agent", to: "Human Underwriter", action: "Credit memo delivered → human reviews, edits, approves or rejects", time: "2–4 hrs" },
                      { step: "7", from: "Human Underwriter", to: "Compliance & Policy Agent", action: "Memo approved → automated compliance checks, regulatory flags", time: "&lt;10 min" },
                      { step: "8", from: "Compliance Agent", to: "Approval Flow Agent", action: "Compliance cleared → DOA routing, digital signatures, committee scheduling", time: "2–8 hrs" },
                      { step: "9", from: "Approval Flow Agent", to: "Closing & Booking Agent", action: "Approval received → CBS booking, documentation generation, disbursement", time: "&lt;2 hrs" },
                      { step: "10", from: "Closing Agent", to: "Monitoring Agent", action: "Loan booked → account enrolled in EWS, covenant tracking activated", time: "Ongoing" },
                    ].map((s) => (
                      <div key={s.step} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">{s.step}</div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Tag color="blue">{s.from}</Tag>
                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                            <Tag color="purple">{s.to}</Tag>
                            <span className="text-[10px] text-muted-foreground ml-auto">{s.time}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{s.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-xs font-bold text-foreground mb-3">Agent Communication Protocol</div>
                  <DataTable
                    headers={["Pattern", "Use Case", "Technology", "Latency"]}
                    rows={[
                      ["Synchronous RPC", "User-facing requests (classification, scoring)", "tRPC over HTTP/2", "&lt;500ms"],
                      ["Async Event Queue", "Agent-to-agent handoffs", "Kafka topics per agent", "&lt;5 seconds"],
                      ["WebSocket Push", "Real-time agent feed, alerts", "Socket.io", "&lt;100ms"],
                      ["Scheduled Jobs", "EWS daily scoring, data refresh", "Cron + Bull queue", "Configurable"],
                      ["Webhook Callbacks", "External API responses (bureau, CBS)", "HTTPS POST with retry", "&lt;30 seconds"],
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* S16 */}
            <section id="s16">
              <SectionHeader num="16" label="API Integrations" icon={Plug}
                description="All external system integrations required for LendAI to function — credit bureaus, core banking, data providers, and regulatory systems." />
              <div className="space-y-4">
                <DataTable
                  headers={["Integration", "Provider(s)", "Data Exchanged", "Auth Method", "Criticality", "Phase"]}
                  rows={[
                    ["Credit Bureau", "CIBIL, Equifax, Experian, TransUnion", "Credit score, payment history, derogatory marks", "OAuth 2.0 + mTLS", <Tag color="red">Critical</Tag>, <Tag color="green">Phase 1</Tag>],
                    ["GST Portal", "GSTN (India) / IRS (US)", "GST returns, turnover, compliance status", "API key + OTP", <Tag color="red">Critical</Tag>, <Tag color="green">Phase 1</Tag>],
                    ["Company Registry", "MCA21, Companies House, SEC EDGAR", "Incorporation, directors, shareholding", "API key", <Tag color="amber">High</Tag>, <Tag color="green">Phase 1</Tag>],
                    ["Core Banking System", "Finacle, Temenos, FIS, Jack Henry", "Account data, loan booking, disbursement", "REST/SOAP + VPN", <Tag color="red">Critical</Tag>, <Tag color="amber">Phase 2</Tag>],
                    ["Document Storage", "AWS S3 / Azure Blob", "Document upload, retrieval, archival", "IAM + signed URLs", <Tag color="red">Critical</Tag>, <Tag color="green">Phase 1</Tag>],
                    ["LLM / Vision API", "OpenAI GPT-4o, Anthropic Claude", "Document understanding, memo generation", "API key + rate limits", <Tag color="red">Critical</Tag>, <Tag color="green">Phase 1</Tag>],
                    ["News & Sentiment", "Bloomberg, Reuters, Refinitiv", "News alerts, sentiment scores", "Subscription API", <Tag color="amber">High</Tag>, <Tag color="amber">Phase 2</Tag>],
                    ["eSign / DSC", "DocuSign, Aadhaar eSign, DigiLocker", "Digital signatures, document authentication", "OAuth 2.0", <Tag color="amber">High</Tag>, <Tag color="amber">Phase 2</Tag>],
                    ["AML / Sanctions", "OFAC, UN, Dow Jones Risk", "Sanctions screening, PEP checks", "REST + batch", <Tag color="red">Critical</Tag>, <Tag color="green">Phase 1</Tag>],
                    ["Valuation / Property", "NIC, local registry APIs", "Collateral valuation, property records", "API key", <Tag color="blue">Medium</Tag>, <Tag color="blue">Phase 3</Tag>],
                  ]}
                />
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">Integration Risk Mitigation</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All external integrations use circuit breakers with graceful degradation. If a bureau API is unavailable, the system flags the gap and routes to manual review rather than blocking the deal. CBS integration uses a sandbox environment for 60 days before production go-live. All API credentials are rotated quarterly and stored in HashiCorp Vault.
                  </p>
                </div>
              </div>
            </section>

            {/* S17 */}
            <section id="s17">
              <SectionHeader num="17" label="KPIs & Success Metrics" icon={Target}
                description="The measurable outcomes that define success for LendAI — organized by business impact, operational efficiency, AI performance, and user adoption." />
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Stat value="85%" label="Reduction in time-to-decision" source="McKinsey AI Banking, 2024 (benchmark)" color="text-emerald-400" />
                  <Stat value="60%" label="Reduction in cost per loan originated" source="Oliver Wyman, 2024 (benchmark)" color="text-emerald-400" />
                  <Stat value="25%" label="Reduction in NPL rate" source="Deloitte AI Lending, 2024 (benchmark)" color="text-emerald-400" />
                  <Stat value="3×" label="Increase in underwriter throughput" source="Primary research baseline, 2024" color="text-emerald-400" />
                </div>
                <DataTable
                  headers={["KPI", "Baseline (Today)", "Phase 1 Target", "Phase 2 Target", "Phase 3 Target", "Measurement"]}
                  rows={[
                    ["Time-to-decision (SME)", "21 days", "7 days", "3 days", "Same day", "Deal close date - application date"],
                    ["Cost per loan originated", "$11,319", "$8,000", "$6,000", "$4,500", "Total ops cost / loans originated"],
                    ["Underwriter throughput", "3–4 deals/week", "8 deals/week", "12 deals/week", "15 deals/week", "Deals approved / underwriter / week"],
                    ["Document processing time", "2–4 days", "4 hours", "1 hour", "30 minutes", "Doc receipt to spreading complete"],
                    ["Credit memo drafting time", "8 hours", "2 hours", "30 minutes", "10 minutes", "Spreading complete to memo approved"],
                    ["NPL rate (12-month)", "4.2% (industry avg)", "3.8%", "3.4%", "3.0%", "NPLs / total portfolio (12-month lag)"],
                    ["EWS lead time", "0 days (reactive)", "30 days", "45 days", "60 days", "Alert date - first missed payment date"],
                    ["Borrower NPS", "32 (industry avg)", "45", "55", "65", "Post-decision NPS survey"],
                    ["AI classification accuracy", "N/A", "90%", "93%", "95%", "Shadow mode vs. human ground truth"],
                    ["Compliance check pass rate", "Manual, variable", "95%", "97%", "99%", "Auto-checks passed / total checks"],
                  ]}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-xs font-bold text-foreground mb-3">North Star Metric</div>
                    <div className="text-2xl font-black text-primary mb-2">Loan Value Processed per Underwriter per Week</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This single metric captures the combined effect of speed, throughput, and quality. Baseline: $2.1M/underwriter/week. Phase 3 target: $8.4M/underwriter/week (4× improvement). Measured weekly, reported to CXO monthly.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-xs font-bold text-foreground mb-3">Business Case Summary</div>
                    <DataTable
                      headers={["Metric", "Annual Value"]}
                      rows={[
                        ["Cost savings (1,000 loans/yr)", "$6.8M"],
                        ["Revenue from faster decisions", "$12.4M"],
                        ["NPL loss reduction", "$8.2M"],
                        ["Total annual value", <span className="text-emerald-400 font-bold">$27.4M</span>],
                        ["Platform investment (3yr)", "$8.5M"],
                        ["3-year ROI", <span className="text-emerald-400 font-bold">865%</span>],
                      ]}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* S18 */}
            <section id="s18">
              <SectionHeader num="18" label="Risks & Mitigations" icon={AlertTriangle}
                description="A comprehensive risk register covering technical, regulatory, adoption, and model risks — with probability, impact, and mitigation strategies for each." />
              <div className="space-y-4">
                <DataTable
                  headers={["Risk", "Category", "Probability", "Impact", "Mitigation Strategy", "Owner"]}
                  rows={[
                    ["LLM hallucination in credit memo", "AI/Model", <Tag color="amber">Medium</Tag>, <Tag color="red">Critical</Tag>, "Every claim requires source citation; human review mandatory; confidence thresholds enforced", "Head of AI"],
                    ["Regulatory rejection of AI decisions", "Regulatory", <Tag color="amber">Medium</Tag>, <Tag color="red">Critical</Tag>, "AI assists, humans decide; full audit trail; SR 11-7 model risk framework; pre-approval from regulators", "Chief Compliance Officer"],
                    ["CBS integration failure", "Technical", <Tag color="blue">Low</Tag>, <Tag color="red">High</Tag>, "Sandbox testing 60 days; graceful degradation; manual booking fallback; rollback plan", "Head of Engineering"],
                    ["Model bias in credit scoring", "Ethics/Legal", <Tag color="amber">Medium</Tag>, <Tag color="red">Critical</Tag>, "Quarterly disparate impact analysis; bias testing in shadow mode; diverse training data; external audit", "Chief Risk Officer"],
                    ["Data breach / document leak", "Security", <Tag color="blue">Low</Tag>, <Tag color="red">Critical</Tag>, "AES-256 encryption; zero-trust architecture; SOC 2 Type II; quarterly pen testing; DLP controls", "CISO"],
                    ["Low user adoption by underwriters", "Adoption", <Tag color="amber">Medium</Tag>, <Tag color="amber">High</Tag>, "Co-design with underwriters; champion program; AI as copilot not replacement; training program", "Head of Product"],
                    ["LLM API cost overrun", "Financial", <Tag color="amber">Medium</Tag>, <Tag color="amber">Medium</Tag>, "Token optimization; caching for repeated queries; cost monitoring dashboards; budget alerts", "Head of Engineering"],
                    ["Model drift over time", "AI/Model", <Tag color="amber">Medium</Tag>, <Tag color="amber">High</Tag>, "Automated drift detection; monthly model performance reviews; retraining pipeline; shadow mode re-validation", "Head of AI"],
                    ["Key person dependency on AI team", "Operational", <Tag color="blue">Low</Tag>, <Tag color="amber">Medium</Tag>, "Documentation-first culture; cross-training; vendor support contracts; open-source stack where possible", "CTO"],
                  ]}
                />
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-red-300">Responsible AI Governance Framework</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                    {[
                      { title: "Human Accountability", text: "No AI system makes final credit decisions. Every AI output is a recommendation. The human who approves is legally and professionally accountable." },
                      { title: "Explainability by Design", text: "Every AI output includes citations, confidence scores, and factor attribution. 'Because the model said so' is not an acceptable explanation — ever." },
                      { title: "Model Risk Management", text: "SR 11-7 compliant model validation for all AI agents. Independent model risk function reviews all agents before production deployment." },
                    ].map((g) => (
                      <div key={g.title} className="bg-white/3 rounded-lg p-3">
                        <div className="text-[10px] font-bold text-red-300 mb-1.5">{g.title}</div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{g.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* S19 */}
            <section id="s19">
              <SectionHeader num="19" label="Roadmap & Milestones" icon={Calendar}
                description="An 18-month phased rollout plan — sequenced by risk, complexity, data readiness, and business impact — with clear milestones, go/no-go criteria, and success metrics for each phase." />
              <div className="space-y-5">
                {[
                  {
                    phase: "Phase 1", period: "Months 1–6", title: "Document Intelligence & Underwriting Copilot",
                    color: "border-emerald-500/30 bg-emerald-500/3",
                    badge: "green",
                    objective: "Eliminate the document-to-credit-memo bottleneck. Deliver measurable time savings in the first 90 days.",
                    agents: ["Intake & Eligibility Agent", "Document Orchestration Agent", "Document Understanding & Spreading Agent", "Underwriting Copilot Agent"],
                    milestones: [
                      { month: "M1–2", deliverable: "Platform foundation, auth, document storage, LLM integration" },
                      { month: "M3", deliverable: "Document classification live (shadow mode), spreading beta with 3 pilot banks" },
                      { month: "M4", deliverable: "Credit memo AI live, underwriter feedback loop, shadow mode exit criteria met" },
                      { month: "M5", deliverable: "Intake & eligibility agent live, bureau integrations, eligibility scoring" },
                      { month: "M6", deliverable: "Phase 1 GA, 3 banks in production, Phase 1 KPIs measured" },
                    ],
                    kpis: ["Decision time: 21 days → 7 days", "Underwriter throughput: 3 → 8 deals/week", "Doc processing: 2 days → 4 hours"],
                    goNoGo: "Classification accuracy ≥90%, spreading error rate ≤8%, underwriter adoption ≥70%",
                  },
                  {
                    phase: "Phase 2", period: "Months 7–12", title: "Portfolio Intelligence & Compliance Automation",
                    color: "border-amber-500/30 bg-amber-500/3",
                    badge: "amber",
                    objective: "Extend AI to portfolio monitoring and compliance — addressing the $180B NPL problem and regulatory burden.",
                    agents: ["Compliance & Policy Agent", "Approval Flow Agent", "Monitoring & Early Warning Agent"],
                    milestones: [
                      { month: "M7–8", deliverable: "EWS model training on Phase 1 portfolio data, compliance rule engine" },
                      { month: "M9", deliverable: "Compliance agent live, automated policy checks, DOA routing automation" },
                      { month: "M10", deliverable: "EWS agent live (shadow mode), covenant tracking, portfolio heatmap" },
                      { month: "M11", deliverable: "EWS shadow mode exit, real-time alerts live, RM notification workflows" },
                      { month: "M12", deliverable: "Phase 2 GA, 8 banks in production, Phase 2 KPIs measured" },
                    ],
                    kpis: ["EWS lead time: 0 → 45 days", "Compliance check time: 3 hrs → 10 min", "NPL rate: 4.2% → 3.4%"],
                    goNoGo: "EWS precision ≥75%, false positive rate ≤20%, compliance automation ≥95% pass rate",
                  },
                  {
                    phase: "Phase 3", period: "Months 13–18", title: "Full Lifecycle Automation & Intelligent Recovery",
                    color: "border-blue-500/30 bg-blue-500/3",
                    badge: "blue",
                    objective: "Close the loop with CBS booking automation, workout support, and predictive deal scoring — achieving same-day decisions.",
                    agents: ["Closing & Booking Agent", "Workout & Recovery Support Agent"],
                    milestones: [
                      { month: "M13–14", deliverable: "CBS integration testing, booking automation, workout playbook AI" },
                      { month: "M15", deliverable: "Closing agent live, automated loan booking, documentation generation" },
                      { month: "M16", deliverable: "Workout agent live, recovery playbooks, restructuring recommendations" },
                      { month: "M17", deliverable: "Predictive deal scoring at pre-origination, borrower self-service portal" },
                      { month: "M18", deliverable: "Phase 3 GA, 20+ banks, $500B annualized loan volume target" },
                    ],
                    kpis: ["Decision time: 3 days → same day", "Cost per loan: $6,000 → $4,500", "Recovery rate: +15% vs. baseline"],
                    goNoGo: "CBS booking accuracy ≥99%, booking time &lt;2 hours, workout recommendation adoption ≥60%",
                  },
                ].map((p) => (
                  <div key={p.phase} className={`rounded-2xl border p-5 ${p.color}`}>
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Tag color={p.badge as "green" | "amber" | "blue"}>{p.phase}</Tag>
                          <span className="text-xs text-muted-foreground">{p.period}</span>
                        </div>
                        <div className="text-base font-bold text-foreground">{p.title}</div>
                        <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">{p.objective}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-muted-foreground mb-1">Agents Deployed</div>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {p.agents.map((a) => (
                            <span key={a} className="text-[10px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-muted-foreground">{a}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <div className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2">Milestones</div>
                        {p.milestones.map((m) => (
                          <div key={m.month} className="flex items-start gap-2 mb-2">
                            <Tag color={p.badge as "green" | "amber" | "blue"}>{m.month}</Tag>
                            <span className="text-[11px] text-muted-foreground leading-tight flex-1">{m.deliverable}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Phase KPIs</div>
                        {p.kpis.map((k) => (
                          <div key={k} className="flex items-start gap-1.5 mb-1.5">
                            <TrendingUp className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-[11px] text-muted-foreground leading-tight">{k}</span>
                          </div>
                        ))}
                        <div className="mt-3 p-2 bg-white/3 rounded-lg border border-white/10">
                          <div className="text-[10px] font-semibold text-amber-400 mb-1">Go/No-Go Criteria</div>
                          <p className="text-[10px] text-muted-foreground leading-tight">{p.goNoGo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Closing statement */}
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold text-foreground">The Opportunity</span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Commercial lending is a $26.5 trillion market running on 30-year-old infrastructure. The banks that deploy agentic AI in the next 18 months will not just be more efficient — they will be structurally faster, more accurate, and more profitable than those that don't. LendAI is not a feature. It is a new operating model for commercial credit.
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
                    {[
                      { v: "$27.4M", l: "Annual value per bank" },
                      { v: "865%", l: "3-year ROI" },
                      { v: "18 months", l: "To full deployment" },
                      { v: "$26.5T", l: "Market opportunity" },
                    ].map((m) => (
                      <div key={m.l} className="text-center">
                        <div className="text-lg font-black text-primary">{m.v}</div>
                        <div className="text-[10px] text-muted-foreground">{m.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
