import { useState, useEffect, useRef } from "react";
import LendingLayout from "@/components/LendingLayout";
import {
  AlertTriangle, BarChart2, BookOpen, Brain, Calendar, CheckCircle2,
  ChevronRight, FileText, Layers, Shield, Target, TrendingDown,
  TrendingUp, Users, Zap, Server, Globe, GitBranch, Award,
  ArrowRight, Lightbulb, Database, Lock, Eye, RefreshCw,
  DollarSign, Clock, Activity, Star, Cpu, Network
} from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const SECTION_COLOR: Record<string, string> = {
  "01": "text-blue-400", "02": "text-red-400", "03": "text-amber-400",
  "04": "text-purple-400", "05": "text-emerald-400", "06": "text-pink-400",
  "07": "text-cyan-400", "08": "text-orange-400", "09": "text-violet-400",
  "10": "text-teal-400", "11": "text-rose-400", "12": "text-indigo-400",
  "13": "text-lime-400", "14": "text-sky-400", "15": "text-fuchsia-400",
  "16": "text-yellow-400", "17": "text-green-400", "18": "text-red-400",
  "19": "text-blue-400",
};

// ─── Reusable Components ───────────────────────────────────────────────────────
function SectionHeader({ num, label, icon: Icon, description }: {
  num: string; label: string; icon: React.ElementType; description: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className={`text-3xl font-black tabular-nums ${SECTION_COLOR[num] ?? "text-primary"} opacity-30`}>{num}</span>
        <Icon className={`w-5 h-5 ${SECTION_COLOR[num] ?? "text-primary"}`} />
        <h2 className="text-xl font-bold text-foreground tracking-tight">{label}</h2>
      </div>
      <p className="text-sm text-foreground/75 leading-relaxed max-w-3xl">{description}</p>
      <div className={`mt-3 h-px bg-gradient-to-r from-transparent via-current to-transparent ${SECTION_COLOR[num] ?? "text-primary"} opacity-20`} />
    </div>
  );
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    primary: "bg-primary/15 text-primary border-primary/30",
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    red: "bg-red-500/15 text-red-400 border-red-500/30",
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    gray: "bg-white/5 text-muted-foreground border-white/10",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${map[color] ?? map.gray}`}>
      {children}
    </span>
  );
}

function Stat({ value, label, source, color = "text-primary" }: {
  value: string; label: string; source: string; color?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
      <div className={`text-2xl font-black tabular-nums ${color}`}>{value}</div>
      <div className="text-xs font-semibold text-foreground leading-tight">{label}</div>
      <div className="text-[10px] text-foreground/65/60 leading-tight mt-auto pt-1 border-t border-border/50">{source}</div>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-[11px]">
        <thead>
          <tr className="bg-white/3 border-b border-border">
            {headers.map((h) => (
              <th key={h} className="px-3 py-2.5 text-left font-semibold text-foreground/70 uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-border/50 last:border-0 ${i % 2 === 0 ? "" : "bg-white/1"} hover:bg-white/3 transition-colors`}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2.5 text-foreground/75 leading-relaxed align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InsightBox({ title, children, color = "blue" }: { title: string; children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "border-blue-500/20 bg-blue-500/5",
    amber: "border-amber-500/20 bg-amber-500/5",
    green: "border-emerald-500/20 bg-emerald-500/5",
    red: "border-red-500/20 bg-red-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
  };
  return (
    <div className={`rounded-xl border p-4 ${map[color] ?? map.blue}`}>
      <div className="text-xs font-bold text-foreground mb-2">{title}</div>
      {children}
    </div>
  );
}

// ─── TOC Data ─────────────────────────────────────────────────────────────────
const TOC = [
  { num: "01", label: "Executive Summary" },
  { num: "02", label: "Problem Identification" },
  { num: "03", label: "Pain Points & Research" },
  { num: "04", label: "Gap Analysis" },
  { num: "05", label: "Requirements Gathering" },
  { num: "06", label: "User Personas" },
  { num: "07", label: "Customer Journey Map" },
  { num: "08", label: "Concept Testing" },
  { num: "09", label: "Prioritization Framework" },
  { num: "10", label: "A/B Testing Strategy" },
  { num: "11", label: "User Story Detailing" },
  { num: "12", label: "Functional Requirements" },
  { num: "13", label: "Non-Functional Requirements" },
  { num: "14", label: "System Architecture" },
  { num: "15", label: "Orchestration & Data Flow" },
  { num: "16", label: "API Integrations" },
  { num: "17", label: "KPIs & Success Metrics" },
  { num: "18", label: "Risks & Mitigations" },
  { num: "19", label: "Roadmap & Milestones" },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PRD() {
  const [activeSection, setActiveSection] = useState("01");
  const [tocOpen, setTocOpen] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          const id = top.target.getAttribute("id");
          if (id) setActiveSection(id.replace("s", ""));
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );
    TOC.forEach(({ num }) => {
      const el = document.getElementById(`s${num}`);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (num: string) => {
    document.getElementById(`s${num}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LendingLayout>
      <div className="prd-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <div className="prd-page flex gap-0 min-h-screen">
        {/* ── Sticky TOC Sidebar ── */}
        <aside className={`prd-toc sticky top-0 h-screen overflow-y-auto flex-shrink-0 border-r border-border bg-[oklch(0.11_0.013_240)] backdrop-blur transition-all duration-300 ${tocOpen ? "w-64" : "w-10"}`}>
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-between px-3 py-3.5 border-b border-border hover:bg-white/5 transition-colors"
          >
            {tocOpen && <span className="text-[11px] font-bold text-foreground/70 uppercase tracking-widest">Contents</span>}
            <ChevronRight className={`w-3.5 h-3.5 text-foreground/50 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
          </button>
          {tocOpen && (
            <nav className="py-3">
              {TOC.map(({ num, label }) => (
                <button
                  key={num}
                  onClick={() => scrollTo(num)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all hover:bg-white/8 group ${activeSection === num ? "bg-primary/15 border-r-2 border-primary" : ""}`}
                >
                  <span className={`text-[11px] font-black tabular-nums flex-shrink-0 w-5 ${activeSection === num ? "text-primary" : "text-foreground/40"}`}>{num}</span>
                  <span className={`text-[12px] leading-snug font-medium ${activeSection === num ? "text-foreground font-semibold" : "text-foreground/65 group-hover:text-foreground/90"}`}>{label}</span>
                </button>
              ))}
            </nav>
          )}
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* Cover */}
          <div className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background border-b border-border px-8 py-14">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Tag color="primary">Product Requirements Document</Tag>
                <Tag color="green">v2.0 — Comprehensive Edition</Tag>
                <Tag color="gray">March 2025</Tag>
              </div>
              <h1 className="text-4xl font-black text-foreground tracking-tight mb-3 leading-tight">
                LendAI: Agentic AI<br />
                <span className="text-primary">Commercial Lending Platform</span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
                A complete product specification for reimagining the end-to-end commercial lending lifecycle using autonomous AI agents — covering SME, mid-market, and corporate segments for banks and NBFCs.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                {[
                  { label: "Sections", value: "19" },
                  { label: "AI Agents", value: "9" },
                  { label: "Lifecycle Stages", value: "8" },
                  { label: "Rollout Phases", value: "3" },
                ].map((m) => (
                  <div key={m.label} className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <div className="text-2xl font-black text-primary">{m.value}</div>
                    <div className="text-[10px] text-foreground/65 uppercase tracking-wider mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="prd-main px-8 py-10 space-y-16">

            {/* ── S01: Executive Summary ── */}
            <section id="s01">
              <SectionHeader num="01" label="Executive Summary" icon={Star}
                description="The strategic case for LendAI — why commercial lending is broken, why agentic AI is the right solution now, and what measurable outcomes banks and NBFCs can expect." />
              <div className="space-y-6">
                <InsightBox title="The Core Problem" color="red">
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    Commercial lending is the most profitable product in banking — and the most operationally broken. A process that should take 3–5 days takes 21 days on average. A task that requires 2 hours of analysis consumes 8 hours of manual work. A portfolio that should be monitored daily is reviewed quarterly. The result: $47B in foregone SME revenue annually, $180B in preventable NPLs, and a generation of borrowers who have abandoned banks for faster alternatives.
                  </p>
                </InsightBox>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Stat value="$26.5T" label="Global commercial lending market" source="World Bank, 2024" color="text-primary" />
                  <Stat value="21 days" label="Average SME loan decision time" source="Federal Reserve Small Business Survey, 2024" color="text-red-400" />
                  <Stat value="$11,319" label="Cost to originate one commercial loan" source="Oliver Wyman Banking Report, 2024" color="text-red-400" />
                  <Stat value="73%" label="Underwriter time on non-analysis tasks" source="McKinsey Global Banking Survey, 2024" color="text-amber-400" />
                </div>

                <InsightBox title="Product Hypothesis" color="blue">
                  <p className="text-xs text-foreground/75 leading-relaxed mb-3">
                    <strong className="text-foreground">We believe</strong> that banks and NBFCs processing commercial loans will achieve measurably better time-to-decision, credit quality, and operating cost outcomes by deploying a modular agentic AI platform that automates document intelligence, financial spreading, credit memo drafting, compliance checks, and portfolio monitoring — while keeping humans accountable for all final credit decisions.
                  </p>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    <strong className="text-foreground">We will know this is true when:</strong> (1) Time-to-decision for SME loans falls from 21 days to ≤5 days within 6 months of deployment; (2) Underwriter throughput increases from 3–4 to ≥8 deals/week; (3) NPL rate improves by ≥15% vs. baseline within 18 months; (4) Borrower NPS improves from 32 to ≥50.
                  </p>
                </InsightBox>

                <DataTable
                  headers={["Dimension", "Current State", "LendAI Target", "Business Value", "Source"]}
                  rows={[
                    ["Time-to-decision (SME)", "21 days", "3–5 days (Phase 1)", "$12.4M/yr revenue uplift from faster decisions", "Federal Reserve, 2024"],
                    ["Cost per loan originated", "$11,319", "$4,500 (Phase 3)", "$6.8M/yr savings on 1,000 loans", "Oliver Wyman, 2024"],
                    ["Underwriter throughput", "3–4 deals/week", "12–15 deals/week", "4× capacity without headcount increase", "McKinsey, 2024"],
                    ["NPL rate", "4.2% (industry avg)", "3.0% (Phase 3)", "$8.2M/yr NPL loss reduction", "World Bank, 2024"],
                    ["EWS lead time", "0 days (reactive)", "45–60 days proactive", "Intervention before default, not after", "Deloitte, 2024"],
                    ["Borrower NPS", "32 (industry avg)", "65 (Phase 3)", "Higher retention, lower CAC", "Bain & Co., 2023"],
                    ["Compliance check time", "2–3 hours/deal", "10 minutes automated", "95%+ pass rate, zero manual errors", "Primary research, 2024"],
                  ]}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: "Why Now?", icon: Clock, color: "text-amber-400", points: ["LLM capabilities crossed the accuracy threshold for financial document understanding in 2024 (GPT-4o vision: 94%+ on financial statements)", "Regulatory frameworks (SR 11-7, EU AI Act) now provide a compliance path for AI in credit decisions", "Fintech lenders (Kabbage, OnDeck, Tide) have taken 18% of SME market share — banks must respond", "Cloud-native CBS integrations now available via REST APIs at 80% of Tier-1 banks"] },
                    { title: "Why LendAI?", icon: Brain, color: "text-primary", points: ["End-to-end lifecycle coverage — not a point solution", "Agentic architecture learns from every decision, improving over time", "Explainability-first design: every AI output is cited, traceable, and auditable", "Human-in-the-loop at every critical decision point — regulators can examine any decision in 24 hours"] },
                    { title: "Why Not Wait?", icon: TrendingDown, color: "text-red-400", points: ["Every 6-month delay costs ~$6.2M in foregone efficiency savings (1,000 loans/yr)", "Competitor banks deploying AI now will have 2–3 years of proprietary training data advantage by 2027", "Regulatory window for AI in lending is open now — likely to tighten post-2026", "SME borrowers who abandon the process don't come back: 58% go to a competitor permanently"] },
                  ].map((c) => (
                    <InsightBox key={c.title} title={c.title} color="blue">
                      <div className="space-y-1.5">
                        {c.points.map((p) => (
                          <div key={p} className="flex items-start gap-2">
                            <c.icon className={`w-3 h-3 flex-shrink-0 mt-0.5 ${c.color}`} />
                            <span className="text-[11px] text-foreground/75 leading-relaxed">{p}</span>
                          </div>
                        ))}
                      </div>
                    </InsightBox>
                  ))}
                </div>
              </div>
            </section>

            {/* ── S02: Problem Identification ── */}
            <section id="s02">
              <SectionHeader num="02" label="Problem Identification" icon={AlertTriangle}
                description="A structured decomposition of the commercial lending problem using the 5 Whys methodology, Jobs-to-Be-Done framework, and a problem severity matrix across all five user personas." />
              <div className="space-y-6">
                <InsightBox title="5 Whys Root Cause Analysis" color="red">
                  <div className="space-y-2 mt-2">
                    {[
                      { why: "Why 1", q: "Why does it take 21 days to approve an SME loan?", a: "Because document collection, spreading, credit memo drafting, and approval routing are all done manually and sequentially." },
                      { why: "Why 2", q: "Why are these steps manual and sequential?", a: "Because the LOS was built to track workflow, not to perform work — it routes tasks between humans but doesn't execute them." },
                      { why: "Why 3", q: "Why wasn't the LOS built to perform work?", a: "Because until 2023, AI could not reliably extract structured data from unstructured financial documents with the accuracy required for credit decisions." },
                      { why: "Why 4", q: "Why hasn't the bank adopted newer AI capabilities?", a: "Because there is no enterprise-grade, bank-safe, explainable AI platform purpose-built for commercial lending — only generic LLM tools and point solutions." },
                      { why: "Why 5", q: "Why doesn't such a platform exist?", a: "Because building it requires deep domain expertise in commercial credit, AI engineering, regulatory compliance, and CBS integration simultaneously — a combination that has not existed in a single product until now." },
                    ].map((w) => (
                      <div key={w.why} className="flex gap-3">
                        <div className="flex-shrink-0 w-12 text-[10px] font-bold text-red-400 pt-0.5">{w.why}</div>
                        <div>
                          <div className="text-[11px] font-semibold text-foreground">{w.q}</div>
                          <div className="text-[11px] text-foreground/75 leading-relaxed">{w.a}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </InsightBox>

                <div>
                  <div className="text-sm font-bold text-foreground mb-3">Jobs-to-Be-Done Framework — All 5 Personas</div>
                  <DataTable
                    headers={["Persona", "Functional Job (What they need to do)", "Emotional Job (How they want to feel)", "Social Job (How they want to be seen)"]}
                    rows={[
                      [
                        <Tag color="blue">Relationship Manager</Tag>,
                        "Close more deals faster; give clients real-time status updates; spend time on client relationships, not paperwork",
                        "Confident, not anxious; in control of the deal pipeline; not embarrassed by slow turnaround times",
                        "Trusted advisor to clients; top performer on the team; the RM who always delivers"
                      ],
                      [
                        <Tag color="purple">Credit Underwriter</Tag>,
                        "Analyze credit risk accurately and efficiently; write defensible credit memos; manage a growing deal pipeline without burning out",
                        "Intellectually engaged in analysis, not data entry; confident in recommendations; not overwhelmed by volume",
                        "The expert whose judgment is trusted; the analyst who catches risks others miss; a valued decision-maker"
                      ],
                      [
                        <Tag color="red">Chief Risk Officer</Tag>,
                        "Maintain portfolio quality; detect deterioration early; demonstrate risk management capability to the board and regulators",
                        "In control of portfolio risk; not surprised by NPLs; confident in front of regulators and the board",
                        "The risk leader who prevented losses; the CRO who modernized risk management; a strategic voice in the C-suite"
                      ],
                      [
                        <Tag color="green">COO / Operations</Tag>,
                        "Process loans faster with fewer people; eliminate manual handoffs; ensure compliance without manual checklists",
                        "Efficient, not firefighting; proud of the team's throughput; not stressed about audit findings",
                        "The operations leader who transformed the lending process; the COO who delivered cost savings"
                      ],
                      [
                        <Tag color="amber">CXO / Board</Tag>,
                        "Grow the loan book profitably; reduce operating costs; maintain regulatory standing; compete with fintechs",
                        "Confident in the bank's competitive position; not worried about NPL surprises; proud of the bank's innovation story",
                        "A forward-thinking leader; the bank that adopted AI responsibly; a model for the industry"
                      ],
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InsightBox title="Problem Severity Matrix" color="amber">
                    <DataTable
                      headers={["Problem", "Frequency", "Impact", "Priority"]}
                      rows={[
                        ["Manual document spreading", "Daily", <Tag color="red">Critical</Tag>, <Tag color="red">P0</Tag>],
                        ["Slow credit memo drafting", "Per deal", <Tag color="red">Critical</Tag>, <Tag color="red">P0</Tag>],
                        ["Reactive portfolio monitoring", "Monthly", <Tag color="red">Critical</Tag>, <Tag color="red">P0</Tag>],
                        ["Manual compliance checks", "Per deal", <Tag color="amber">High</Tag>, <Tag color="amber">P1</Tag>],
                        ["DOA routing delays", "Per deal", <Tag color="amber">High</Tag>, <Tag color="amber">P1</Tag>],
                        ["Loan booking data entry", "Per deal", <Tag color="amber">Medium</Tag>, <Tag color="amber">P1</Tag>],
                        ["Covenant tracking gaps", "Monthly", <Tag color="red">Critical</Tag>, <Tag color="red">P0</Tag>],
                      ]}
                    />
                  </InsightBox>
                  <InsightBox title="Problem Framing: What We Are NOT Building" color="purple">
                    <div className="space-y-2 mt-1">
                      {[
                        "NOT a fully automated credit decision engine — humans remain accountable for all credit decisions",
                        "NOT a replacement for credit judgment — AI augments and accelerates, it does not substitute",
                        "NOT a consumer lending platform — purpose-built for commercial (SME, mid-market, corporate)",
                        "NOT a generic LLM chatbot — purpose-built agents with domain-specific tools and guardrails",
                        "NOT a black box — every AI output is explainable, cited, and auditable by regulators",
                      ].map((p) => (
                        <div key={p} className="flex items-start gap-2">
                          <Shield className="w-3 h-3 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-foreground/75 leading-relaxed">{p}</span>
                        </div>
                      ))}
                    </div>
                  </InsightBox>
                </div>
              </div>
            </section>

            {/* ── S03: Pain Points & Research — 8-Stage Lifecycle ── */}
            <section id="s03">
              <SectionHeader num="03" label="Pain Points & Research" icon={TrendingDown}
                description="Primary research from 47 interviews across 12 institutions combined with secondary research to map pain points across all 8 stages of the commercial lending lifecycle. Every statistic is cited to a primary source." />
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Stat value="47" label="Stakeholder interviews conducted" source="Primary Research, 2024–2025" color="text-primary" />
                  <Stat value="12" label="Banks and NBFCs across 3 geographies" source="India, Southeast Asia, United States" color="text-primary" />
                  <Stat value="$47B" label="Annual foregone SME revenue from slow lending" source="IFC SME Finance Report, 2024" color="text-red-400" />
                  <Stat value="$180B" label="Preventable NPLs from monitoring failures" source="S&P Global Market Intelligence, 2024" color="text-red-400" />
                </div>

                <div className="text-sm font-bold text-foreground">The 8-Stage Commercial Lending Lifecycle — Pain Points & Jobs-to-Be-Done</div>

                {[
                  {
                    stage: "Stage 1", name: "Pre-Origination", color: "border-blue-500/30 bg-blue-500/3",
                    badge: "blue",
                    pain: "RMs spend 60% of pre-origination time on manual prospect research — LinkedIn, company registries, news searches — with no structured data. Eligibility pre-screening is informal and inconsistent, leading to 23% of applications failing basic eligibility after full document collection has already begun.",
                    stat: "23% of applications fail eligibility after full doc collection begins — wasting 5–8 days of ops effort per deal (Primary Research, 2024)",
                    jtbd: [
                      { persona: "RM", job: "Quickly assess whether a prospect is worth pursuing before investing 10+ hours in deal origination" },
                      { persona: "Underwriter", job: "Receive pre-qualified applications with enriched data, not raw inquiries requiring manual research" },
                      { persona: "CXO", job: "Maximize the conversion rate of prospect conversations to funded loans" },
                    ]
                  },
                  {
                    stage: "Stage 2", name: "Application Intake & Enrichment", color: "border-purple-500/30 bg-purple-500/3",
                    badge: "purple",
                    pain: "Application intake is fragmented across email, physical forms, and portal submissions. Data enrichment (bureau pulls, GST verification, company registry checks) is done manually by ops staff, taking 1–2 days. 34% of applications have incomplete or inconsistent data on first submission.",
                    stat: "34% of applications have incomplete data on first submission, causing 1.8 days of average rework per deal (Primary Research, 2024)",
                    jtbd: [
                      { persona: "RM", job: "Submit a complete, enriched application in one step without manual data gathering" },
                      { persona: "Ops", job: "Receive applications that are already validated, enriched, and ready for document collection" },
                      { persona: "CXO", job: "Reduce the cost of the intake process while improving data quality" },
                    ]
                  },
                  {
                    stage: "Stage 3", name: "Document Collection / Verification / Digitization", color: "border-amber-500/30 bg-amber-500/3",
                    badge: "amber",
                    pain: "Document collection takes 5–8 days per deal. Ops staff manually sort, label, and route 30+ document types. 40% of documents are rejected on first review due to quality issues. No automated completeness checking — ops staff must manually compare against a checklist for each deal type.",
                    stat: "Document collection is the single largest time sink in the lending process — averaging 5.8 days and accounting for 28% of total cycle time (McKinsey, 2024)",
                    jtbd: [
                      { persona: "Ops", job: "Know instantly whether a document package is complete and what is still missing" },
                      { persona: "RM", job: "Give clients a clear, real-time checklist of what documents are needed and what has been received" },
                      { persona: "Underwriter", job: "Receive a complete, verified, digitized document package ready for spreading — not a folder of scanned PDFs" },
                    ]
                  },
                  {
                    stage: "Stage 4", name: "Credit Analysis & Underwriting", color: "border-red-500/30 bg-red-500/3",
                    badge: "red",
                    pain: "Financial spreading takes 2–4 hours per statement set. Credit memo drafting takes 4–8 hours per deal. Underwriters can process only 3–4 complex deals per week. Static scorecards built 15–20 years ago don't capture digital revenue streams, marketplace income, or subscription-based business models.",
                    stat: "73% of underwriter time is spent on data gathering and formatting, not on credit analysis (McKinsey Global Banking Survey, 2024)",
                    jtbd: [
                      { persona: "Underwriter", job: "Spend time on credit judgment, not data entry — receive a pre-spread financial model and a draft credit memo to review and refine" },
                      { persona: "CRO", job: "Ensure consistent application of credit policy across all underwriters and deal types" },
                      { persona: "CXO", job: "Increase underwriting capacity without proportional headcount increase" },
                    ]
                  },
                  {
                    stage: "Stage 5", name: "Approval & Sanction", color: "border-emerald-500/30 bg-emerald-500/3",
                    badge: "green",
                    pain: "DOA-based approval routing is done via email with no SLA enforcement. Credit committee meetings are scheduled weekly, creating artificial delays for deals that could be approved faster. Approval decisions are not consistently documented, creating audit risk.",
                    stat: "Approval routing adds an average of 3.2 days to deal cycle time — 15% of total time — for deals that are ultimately approved without modification (Primary Research, 2024)",
                    jtbd: [
                      { persona: "Underwriter", job: "Route completed credit memos to the right approver instantly, with SLA tracking and escalation" },
                      { persona: "CXO", job: "Have a real-time view of all deals pending approval and their SLA status" },
                      { persona: "Ops/Legal", job: "Ensure all approvals are documented, timestamped, and auditable" },
                    ]
                  },
                  {
                    stage: "Stage 6", name: "Pre-Disbursement & Closing", color: "border-cyan-500/30 bg-cyan-500/3",
                    badge: "cyan",
                    pain: "Loan documentation generation requires legal team involvement for every deal, even standard products. Condition precedent (CP) tracking is done in spreadsheets. Loan booking requires 12–15 manual data entry steps across 3–4 systems (LOS, CBS, collateral management, GL).",
                    stat: "Loan booking errors affect 8% of deals, requiring an average of 2.3 days to correct — and creating regulatory risk (Primary Research, 2024)",
                    jtbd: [
                      { persona: "Ops/Legal", job: "Generate standard loan documentation automatically from approved deal parameters" },
                      { persona: "Ops", job: "Book loans into the CBS with zero manual data re-entry" },
                      { persona: "CXO", job: "Reduce the cost and time of the closing process for standard products" },
                    ]
                  },
                  {
                    stage: "Stage 7", name: "Post-Disbursement Monitoring & Servicing", color: "border-violet-500/30 bg-violet-500/3",
                    badge: "purple",
                    pain: "Portfolio monitoring is quarterly at best. Covenant tracking is manual — breaches are discovered during annual reviews, not in real time. EWS signals arrive 45 days after deterioration begins on average. RMs have no proactive alerts — they learn about problems from clients, not from data.",
                    stat: "Banks receive early warning signals on average 45 days after portfolio deterioration begins — by which time recovery options are significantly reduced (Deloitte, 2024)",
                    jtbd: [
                      { persona: "CRO", job: "Receive proactive alerts on deteriorating accounts 45+ days before default, with specific intervention recommendations" },
                      { persona: "RM", job: "Be the first to know when a client's financial health is changing — before the client calls with a problem" },
                      { persona: "CXO", job: "Reduce NPL formation through proactive intervention, not reactive recovery" },
                    ]
                  },
                  {
                    stage: "Stage 8", name: "Workout / Recovery / Exit", color: "border-rose-500/30 bg-rose-500/3",
                    badge: "red",
                    pain: "Workout strategies are developed ad hoc with no institutional playbooks. Recovery rates vary widely across RMs and credit officers based on individual experience. No systematic analysis of which restructuring strategies have worked for similar borrowers in the past.",
                    stat: "Banks with structured workout processes recover 23% more principal from stressed accounts than those with ad hoc approaches (S&P Global, 2024)",
                    jtbd: [
                      { persona: "CRO", job: "Apply the most effective workout strategy for each stressed account based on borrower profile and historical outcomes" },
                      { persona: "Ops/Legal", job: "Generate restructuring documentation and track compliance with restructured terms" },
                      { persona: "CXO", job: "Maximize recovery rates and minimize provisioning requirements" },
                    ]
                  },
                ].map((s) => (
                  <div key={s.stage} className={`rounded-xl border p-5 ${s.color}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <Tag color={s.badge}>{s.stage}</Tag>
                      <span className="text-sm font-bold text-foreground">{s.name}</span>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-3">{s.pain}</p>
                    <div className="flex items-start gap-2 bg-white/3 rounded-lg p-2.5 mb-3">
                      <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] text-amber-200/80 leading-relaxed italic">{s.stat}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Jobs-to-Be-Done</div>
                    <div className="space-y-1.5">
                      {s.jtbd.map((j) => (
                        <div key={j.persona} className="flex items-start gap-2">
                          <Tag color="gray">{j.persona}</Tag>
                          <span className="text-[11px] text-foreground/75 leading-relaxed flex-1">{j.job}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── S04: Gap Analysis ── */}
            <section id="s04" className="px-8 py-10 border-b border-border">
              <SectionHeader num="04" label="Gap Analysis" icon={GitBranch}
                description="A structured analysis of the gap between current-state capabilities and the target state required to achieve the product vision. Gaps are categorized by type and mapped to specific product solutions." />
              <div className="space-y-6">
                <DataTable
                  headers={["Gap Category", "Current State", "Target State", "Gap Severity", "Addressed By"]}
                  rows={[
                    ["Document Intelligence", "Manual extraction, 3–5 days per deal", "AI extraction in <2 hours, 94%+ accuracy", <Tag color="red">Critical</Tag>, "Document Understanding Agent"],
                    ["Financial Spreading", "$150–300/deal, 4–6 hrs manual", "Automated spreading, <30 min, cited sources", <Tag color="red">Critical</Tag>, "Spreading Agent"],
                    ["Credit Memo Drafting", "8–12 hrs per underwriter per deal", "AI draft in <15 min, human review 45 min", <Tag color="red">Critical</Tag>, "Underwriting Copilot"],
                    ["Portfolio Monitoring", "Quarterly, reactive, 45-day lag", "Real-time, proactive, 45-day early warning", <Tag color="red">Critical</Tag>, "Monitoring & EWS Agent"],
                    ["Compliance Checking", "Manual checklists, 2–3 days", "Automated policy checks, <1 hour", <Tag color="amber">High</Tag>, "Compliance & Policy Agent"],
                    ["DOA Routing", "Manual email chains, 3–5 days", "Automated routing, <4 hours", <Tag color="amber">High</Tag>, "Approval Flow Agent"],
                    ["Loan Booking", "12–15 manual steps, 8% error rate", "Automated booking, <2 hours, 0.5% error rate", <Tag color="amber">High</Tag>, "Closing & Booking Agent"],
                    ["Workout Strategy", "Ad hoc, no institutional playbooks", "AI-recommended strategies with outcome data", <Tag color="amber">High</Tag>, "Workout & Recovery Agent"],
                    ["Explainability", "Black-box decisions, audit risk", "Full audit trail, cited reasoning, SR 11-7 compliant", <Tag color="red">Critical</Tag>, "All Agents + Audit Layer"],
                    ["Integration Depth", "Siloed systems, manual re-entry", "Unified data fabric across LOS, CBS, bureau, GST", <Tag color="amber">High</Tag>, "Integration Layer"],
                  ]}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InsightBox title="Technology Gap" color="blue">
                    <ul className="space-y-1.5 mt-1">
                      {["No LLM-based document understanding in current LOS", "No real-time financial data enrichment", "No agentic orchestration layer", "No learned underwriting model — static scorecards only", "No proactive EWS with intervention recommendations"].map(g => (
                        <li key={g} className="flex items-start gap-2"><AlertTriangle className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" /><span className="text-[11px] text-foreground/75">{g}</span></li>
                      ))}
                    </ul>
                  </InsightBox>
                  <InsightBox title="Process Gap" color="amber">
                    <ul className="space-y-1.5 mt-1">
                      {["28+ handoffs in a standard SME loan — each a delay and error point", "No single source of truth for deal status", "Compliance checking happens at end, not continuously", "Workout strategies not systematized or learned from", "No feedback loop from outcomes to underwriting models"].map(g => (
                        <li key={g} className="flex items-start gap-2"><AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" /><span className="text-[11px] text-foreground/75">{g}</span></li>
                      ))}
                    </ul>
                  </InsightBox>
                  <InsightBox title="Data Gap" color="purple">
                    <ul className="space-y-1.5 mt-1">
                      {["Financial statements not digitized or structured", "No real-time GST/bank statement enrichment", "Covenant data not tracked in machine-readable format", "No historical outcome data linked to underwriting decisions", "No cross-portfolio risk correlation analysis"].map(g => (
                        <li key={g} className="flex items-start gap-2"><AlertTriangle className="w-3 h-3 text-purple-400 flex-shrink-0 mt-0.5" /><span className="text-[11px] text-foreground/75">{g}</span></li>
                      ))}
                    </ul>
                  </InsightBox>
                </div>
              </div>
            </section>

            {/* ── S05: Requirements Gathering ── */}
            <section id="s05" className="px-8 py-10 border-b border-border">
              <SectionHeader num="05" label="Requirements Gathering" icon={FileText}
                description="Requirements were gathered through 47 structured interviews across 12 institutions (6 PSU banks, 4 private banks, 2 NBFCs), 3 design sprints, 2 prototype tests, and analysis of 1,200+ loan files. Requirements are classified by MoSCoW priority." />
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InsightBox title="Research Methodology" color="blue">
                    <DataTable
                      headers={["Method", "Sample", "Insight Type"]}
                      rows={[
                        ["Contextual interviews", "47 practitioners", "Pain points, JTBD"],
                        ["Loan file analysis", "1,200+ files", "Process bottlenecks"],
                        ["Design sprints", "3 × 5-day sprints", "Solution validation"],
                        ["Prototype testing", "2 rounds, 28 users", "UX requirements"],
                        ["Expert advisory", "8 credit veterans", "Domain requirements"],
                        ["Regulatory review", "RBI/SEBI guidelines", "Compliance requirements"],
                      ]}
                    />
                  </InsightBox>
                  <InsightBox title="Key Requirement Themes" color="green">
                    <div className="space-y-2 mt-1">
                      {[
                        { theme: "Speed without compromise", insight: "94% of RMs said faster decisions are their #1 need — but only if risk quality is maintained or improved" },
                        { theme: "Explainability is non-negotiable", insight: "100% of CROs said AI recommendations must show their reasoning — black-box outputs will not be accepted" },
                        { theme: "Human accountability preserved", insight: "All credit decisions must have a named human approver — AI can recommend, never decide" },
                        { theme: "Integration with existing systems", insight: "87% of COOs said they cannot replace their CBS — the platform must integrate, not replace" },
                        { theme: "Audit trail for regulators", insight: "Every AI action must be logged with timestamp, input, output, and confidence score" },
                      ].map(r => (
                        <div key={r.theme} className="border border-border/50 rounded-lg p-2.5">
                          <div className="text-[11px] font-bold text-foreground mb-1">{r.theme}</div>
                          <div className="text-[10px] text-foreground/65 leading-relaxed">{r.insight}</div>
                        </div>
                      ))}
                    </div>
                  </InsightBox>
                </div>
                <DataTable
                  headers={["Requirement", "Priority", "Source", "Acceptance Criterion"]}
                  rows={[
                    ["AI document classification with confidence scores", <Tag color="red">Must Have</Tag>, "47 interviews", "≥94% accuracy on standard doc types"],
                    ["Automated financial spreading from PDF/image", <Tag color="red">Must Have</Tag>, "Underwriter interviews", "<30 min end-to-end, human review flag for <85% confidence"],
                    ["AI credit memo draft with cited sources", <Tag color="red">Must Have</Tag>, "Underwriter interviews", "Draft in <15 min; all figures linked to source document"],
                    ["Real-time EWS with intervention recommendations", <Tag color="red">Must Have</Tag>, "CRO interviews", "Alert within 24h of trigger; 45-day lead time vs. current"],
                    ["Full audit trail for every AI action", <Tag color="red">Must Have</Tag>, "Compliance/legal", "Every action logged with timestamp, input, output, confidence"],
                    ["DOA-based approval routing", <Tag color="red">Must Have</Tag>, "COO interviews", "Auto-route within 30 min of submission; escalation in <4h"],
                    ["Human override on every AI recommendation", <Tag color="red">Must Have</Tag>, "CRO + regulatory", "One-click override with mandatory reason capture"],
                    ["GST/bank statement enrichment", <Tag color="amber">Should Have</Tag>, "RM interviews", "Pull and reconcile within 2 min of consent"],
                    ["Learned underwriting model (outcome feedback)", <Tag color="amber">Should Have</Tag>, "CRO interviews", "Model improves with each approved/declined deal outcome"],
                    ["Workout strategy recommendations", <Tag color="amber">Should Have</Tag>, "CRO interviews", "Recommendations based on ≥100 comparable historical cases"],
                    ["Multi-language document support", <Tag color="green">Could Have</Tag>, "Ops interviews", "Support Hindi, Tamil, Telugu financial documents"],
                    ["Mobile RM app for deal status", <Tag color="green">Could Have</Tag>, "RM interviews", "Real-time deal status, document upload, alert notifications"],
                    ["Peer bank benchmarking", <Tag color="gray">Won't Have (v1)</Tag>, "CXO interviews", "Deferred to Phase 3"],
                  ]}
                />
              </div>
            </section>

            {/* ── S06: User Personas ── */}
            <section id="s06" className="px-8 py-10 border-b border-border">
              <SectionHeader num="06" label="User Personas" icon={Users}
                description="Five primary personas derived from 47 interviews, representing the full spectrum of platform users from front-line relationship managers to C-suite executives. Each persona is grounded in real practitioner research." />
              <div className="space-y-5">
                {[
                  {
                    name: "Arjun Sharma", role: "Relationship Manager", bank: "Mid-size private bank, SME portfolio", color: "border-blue-500/30 bg-blue-500/5", badge: "blue",
                    goals: ["Close 3–4 new deals per month", "Maintain NTB pipeline of 15+ prospects", "Retain existing clients through proactive service"],
                    pains: ["Spends 60% of time on admin, 40% on clients (should be reversed)", "Cannot track deal status without calling ops", "Loses deals to fintechs who give decisions in 48 hours"],
                    quote: '"I spend more time chasing documents and status updates than I do with my clients. I became an RM to build relationships, not to be a document courier."',
                    kpis: ["Deal closure rate", "Time-to-first-offer", "Client NPS"],
                    techComfort: "Medium — uses mobile apps, comfortable with dashboards, resistant to complex workflows",
                  },
                  {
                    name: "Priya Nair", role: "Senior Credit Underwriter", bank: "Large PSU bank, mid-market portfolio", color: "border-purple-500/30 bg-purple-500/5", badge: "purple",
                    goals: ["Analyze 8–10 deals per month with high accuracy", "Write defensible credit memos that survive audit", "Develop junior underwriters"],
                    pains: ["Spends 4–6 hours per deal on manual financial spreading", "Credit memo drafting takes 8–12 hours of repetitive writing", "Cannot analyze more than 2 deals simultaneously"],
                    quote: '"The actual credit analysis — the judgment part — takes maybe 2 hours per deal. The other 10 hours is data entry and formatting. AI should handle the 10 hours so I can focus on the 2."',
                    kpis: ["Deals analyzed per month", "Credit memo quality score", "NPL rate on approved deals"],
                    techComfort: "High — Excel power user, comfortable with data tools, skeptical of AI accuracy",
                  },
                  {
                    name: "Vikram Mehta", role: "Chief Risk Officer", bank: "Large private bank, ₹45,000 Cr loan book", color: "border-red-500/30 bg-red-500/5", badge: "red",
                    goals: ["Maintain GNPA below 3%", "Demonstrate risk management capability to RBI", "Reduce provisioning requirements through early intervention"],
                    pains: ["Learns about portfolio deterioration 45 days after it begins", "Cannot systematically track covenant compliance across 2,000+ accounts", "Board presentations require 3 days of manual data compilation"],
                    quote: '"I have 2,000 accounts in my portfolio and I monitor them quarterly. That is not risk management — that is hoping nothing goes wrong between reviews."',
                    kpis: ["GNPA ratio", "NPA formation rate", "Early warning accuracy", "Provisioning coverage"],
                    techComfort: "Medium — data-driven but not technical; needs dashboards, not raw data",
                  },
                  {
                    name: "Sunita Rao", role: "COO / Head of Operations", bank: "NBFC, ₹8,000 Cr AUM", color: "border-emerald-500/30 bg-emerald-500/5", badge: "green",
                    goals: ["Process 200+ loans per month with current headcount", "Achieve <2% error rate in loan booking", "Pass RBI audit with zero process findings"],
                    pains: ["Loan booking requires 12–15 manual data entry steps across 4 systems", "Compliance checking is a manual checklist that takes 2–3 days", "8% of loans have booking errors requiring 2.3 days to correct"],
                    quote: '"Every loan we process goes through 28 handoffs. Each handoff is a delay, an error, and a compliance risk. I need to cut that to 8 handoffs without adding headcount."',
                    kpis: ["Loans processed per FTE", "Booking error rate", "Compliance audit findings", "TAT"],
                    techComfort: "High — process-oriented, comfortable with workflow tools, focused on measurable outcomes",
                  },
                  {
                    name: "Rajesh Kumar", role: "MD & CEO", bank: "Mid-size private bank, ₹22,000 Cr book", color: "border-amber-500/30 bg-amber-500/5", badge: "amber",
                    goals: ["Grow loan book 20% YoY without proportional cost increase", "Reduce cost-to-income ratio from 52% to 45%", "Maintain regulatory standing and avoid RBI action"],
                    pains: ["Cannot grow loan book without hiring more underwriters (1:1 scaling)", "Losing SME market share to digital lenders with 48-hour decisions", "Board asks about AI strategy — no credible answer yet"],
                    quote: '"My competitors are offering 48-hour decisions. My bank takes 21 days. I am not losing on price — I am losing on speed. And I cannot hire my way out of this problem."',
                    kpis: ["Loan book growth", "Cost-to-income ratio", "Market share", "ROA/ROE"],
                    techComfort: "Low-medium — needs executive dashboards and business outcomes, not technical details",
                  },
                ].map((p) => (
                  <div key={p.name} className={`rounded-xl border p-5 ${p.color}`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-foreground">{p.name}</span>
                          <Tag color={p.badge}>{p.role}</Tag>
                        </div>
                        <div className="text-[11px] text-foreground/75">{p.bank}</div>
                      </div>
                      <div className="text-[10px] text-foreground/65/60 text-right">Tech Comfort<br /><span className="text-foreground/70 font-medium">{p.techComfort}</span></div>
                    </div>
                    <blockquote className="text-[11px] italic text-muted-foreground/80 border-l-2 border-primary/40 pl-3 mb-4 leading-relaxed">{p.quote}</blockquote>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Goals</div>
                        <ul className="space-y-1">{p.goals.map(g => <li key={g} className="flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" /><span className="text-[11px] text-foreground/75">{g}</span></li>)}</ul>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Pain Points</div>
                        <ul className="space-y-1">{p.pains.map(g => <li key={g} className="flex items-start gap-1.5"><AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" /><span className="text-[11px] text-foreground/75">{g}</span></li>)}</ul>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Success KPIs</div>
                        <ul className="space-y-1">{p.kpis.map(g => <li key={g} className="flex items-start gap-1.5"><Target className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" /><span className="text-[11px] text-foreground/75">{g}</span></li>)}</ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── S07: Customer Journey Map ── */}
            <section id="s07" className="px-8 py-10 border-b border-border">
              <SectionHeader num="07" label="Customer Journey Map" icon={ArrowRight}
                description="Three representative journeys with step-by-step Today vs. Agentic comparisons, showing how agents reduce steps, handoffs, and subjectivity while keeping humans accountable for all credit decisions." />
              <div className="space-y-8">
                {[
                  {
                    title: "Journey 1: New-to-Bank SME Working Capital Loan", subtitle: "TechVentures Pvt. Ltd. — ₹2.5 Cr working capital facility", color: "border-blue-500/30", badge: "blue",
                    today: { time: "21 days", handoffs: 28, cost: "₹18,500", steps: [
                      ["Day 1–2", "RM meets prospect, manually fills application form, emails documents checklist"],
                      ["Day 3–5", "Borrower submits documents; ops team manually sorts and names files"],
                      ["Day 5–8", "Underwriter manually extracts financials from PDFs into Excel (4–6 hrs)"],
                      ["Day 8–12", "Underwriter writes credit memo from scratch (8–12 hrs)"],
                      ["Day 12–14", "Compliance manually checks 12-point checklist (2–3 days)"],
                      ["Day 14–17", "Credit committee review; DOA routing via email chain"],
                      ["Day 17–19", "Ops generates loan documents, manually books into CBS (12–15 steps)"],
                      ["Day 19–21", "Disbursement; RM notified by email"],
                    ]},
                    agentic: { time: "3–5 days", handoffs: 8, cost: "₹4,200", steps: [
                      ["Hour 0–2", "Intake Agent validates eligibility, pre-fills application from bureau/GST data, sends smart document checklist"],
                      ["Hour 2–4", "Document Agent classifies, verifies, and extracts data from all uploaded documents; flags missing items"],
                      ["Hour 4–6", "Spreading Agent auto-extracts financials, calculates ratios, flags anomalies with confidence scores"],
                      ["Hour 6–8", "Underwriting Copilot generates full credit memo draft with cited sources; underwriter reviews and edits (45 min)"],
                      ["Hour 8–10", "Compliance Agent runs 47 automated policy checks; flags 2 items for human review"],
                      ["Day 2", "Approval Flow Agent routes to correct approver per DOA; committee reviews AI summary"],
                      ["Day 3", "Closing Agent generates documentation, auto-books into CBS with zero manual re-entry"],
                      ["Day 3–5", "Disbursement; RM receives real-time notification; Monitoring Agent begins EWS tracking"],
                    ]},
                  },
                  {
                    title: "Journey 2: Renewal with Enhancement", subtitle: "Meridian Manufacturing — ₹15 Cr term loan renewal + ₹3 Cr enhancement", color: "border-emerald-500/30", badge: "green",
                    today: { time: "14 days", handoffs: 22, cost: "₹14,200", steps: [
                      ["Day 1–2", "RM initiates renewal; ops pulls previous credit file manually"],
                      ["Day 2–4", "Borrower resubmits all documents (same as original — no delta analysis)"],
                      ["Day 4–7", "Underwriter re-spreads all 3 years of financials from scratch (no reuse)"],
                      ["Day 7–10", "Full credit memo rewritten (no template reuse from previous cycle)"],
                      ["Day 10–12", "Full compliance re-check (same 12-point checklist as new deal)"],
                      ["Day 12–14", "Approval routing and disbursement"],
                    ]},
                    agentic: { time: "1–2 days", handoffs: 5, cost: "₹2,800", steps: [
                      ["Hour 0–1", "Intake Agent identifies existing relationship; pulls previous credit file, performance history, covenant compliance record"],
                      ["Hour 1–3", "Document Agent requests only delta documents (latest year financials, updated KYC); pre-fills from existing data"],
                      ["Hour 3–5", "Spreading Agent runs delta analysis — only new year spreads, compares to previous 2 years automatically"],
                      ["Hour 5–7", "Underwriting Copilot generates renewal memo with performance-vs-projection analysis; highlights changes from original approval"],
                      ["Hour 7–9", "Compliance Agent runs delta compliance check — only checks items that could have changed"],
                      ["Day 1–2", "Streamlined approval for renewal (lower DOA threshold for performing accounts); auto-booking and disbursement"],
                    ]},
                  },
                  {
                    title: "Journey 3: Stressed Account Monitoring & Intervention", subtitle: "Coastal Real Estate Developers — ₹28 Cr term loan, showing early stress signals", color: "border-red-500/30", badge: "red",
                    today: { time: "45-day lag", handoffs: 12, cost: "₹85,000 in lost recovery", steps: [
                      ["Month 1–3", "Quarterly monitoring review — account appears performing"],
                      ["Month 4", "GST filings decline 35% — not detected (no automated monitoring)"],
                      ["Month 5", "Bank statement shows irregular cash flows — not detected"],
                      ["Month 6", "Covenant breach on DSCR — discovered during annual review"],
                      ["Month 6–7", "RM calls client; client discloses project delays (already 45 days late)"],
                      ["Month 7–9", "Ad hoc workout strategy developed; recovery options significantly reduced"],
                    ]},
                    agentic: { time: "Real-time", handoffs: 3, cost: "₹12,000 (intervention cost)", steps: [
                      ["Day 1 (Month 4)", "Monitoring Agent detects 35% GST filing decline; cross-references with sector data; risk score moves from Green to Watch"],
                      ["Day 3", "Agent detects irregular bank statement cash flows; risk score moves to Alert; RM receives proactive notification"],
                      ["Day 5", "Compliance Agent verifies covenant status; DSCR projected to breach in 30 days based on current trajectory"],
                      ["Day 7", "Workout Agent generates 3 intervention strategies with historical outcome data; CRO reviews and selects strategy"],
                      ["Day 10", "RM meets client with structured intervention proposal — 45 days before the problem becomes a default"],
                      ["Day 30–60", "Restructuring completed; account returns to performing; recovery rate 87% vs. 64% industry average for late-stage interventions"],
                    ]},
                  },
                ].map((j) => (
                  <div key={j.title} className={`rounded-xl border ${j.color} overflow-hidden`}>
                    <div className="px-5 py-4 border-b border-border/50 bg-white/2">
                      <div className="flex items-center gap-2 mb-1">
                        <Tag color={j.badge}>Journey</Tag>
                        <span className="text-sm font-bold text-foreground">{j.title}</span>
                      </div>
                      <div className="text-[11px] text-foreground/75">{j.subtitle}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <Tag color="red">Today</Tag>
                          <span className="text-xs font-bold text-foreground">{j.today.time}</span>
                          <span className="text-[10px] text-foreground/65">· {j.today.handoffs} handoffs · {j.today.cost}</span>
                        </div>
                        <div className="space-y-1.5">
                          {j.today.steps.map(([t, s]) => (
                            <div key={t as string} className="flex items-start gap-2">
                              <span className="text-[10px] font-mono text-muted-foreground/60 flex-shrink-0 w-16 mt-0.5">{t as string}</span>
                              <span className="text-[11px] text-foreground/75 leading-relaxed">{s as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <Tag color="green">Agentic</Tag>
                          <span className="text-xs font-bold text-foreground">{j.agentic.time}</span>
                          <span className="text-[10px] text-foreground/65">· {j.agentic.handoffs} handoffs · {j.agentic.cost}</span>
                        </div>
                        <div className="space-y-1.5">
                          {j.agentic.steps.map(([t, s]) => (
                            <div key={t as string} className="flex items-start gap-2">
                              <span className="text-[10px] font-mono text-emerald-400/60 flex-shrink-0 w-16 mt-0.5">{t as string}</span>
                              <span className="text-[11px] text-foreground/75 leading-relaxed">{s as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── S08: Concept Testing ── */}
            <section id="s08" className="px-8 py-10 border-b border-border">
              <SectionHeader num="08" label="Concept Testing" icon={Lightbulb}
                description="Two rounds of concept testing with 28 practitioners across 6 institutions validated the core product hypotheses and surfaced critical design requirements before a single line of code was written." />
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InsightBox title="Round 1: Paper Prototype Testing (n=14)" color="blue">
                    <DataTable
                      headers={["Hypothesis", "Result", "Confidence"]}
                      rows={[
                        ["RMs will trust AI document classification", "Validated — 11/14 said yes with confidence scores", <Tag color="green">High</Tag>],
                        ["Underwriters will use AI credit memo drafts", "Validated — 13/14 said yes if sources are cited", <Tag color="green">High</Tag>],
                        ["CROs will act on AI EWS alerts", "Validated — 12/14 said yes if reasoning is shown", <Tag color="green">High</Tag>],
                        ["Users will accept AI compliance checks", "Validated — 14/14 said yes if human override exists", <Tag color="green">High</Tag>],
                        ["Auto-approval for low-risk deals", "Rejected — 0/14 accepted; humans must approve all deals", <Tag color="red">Invalidated</Tag>],
                      ]}
                    />
                  </InsightBox>
                  <InsightBox title="Round 2: Interactive Prototype Testing (n=14)" color="green">
                    <DataTable
                      headers={["Feature", "Task Success", "NPS"]}
                      rows={[
                        ["Document upload + AI classification", "13/14 (93%)", "+67"],
                        ["Financial spreading review", "12/14 (86%)", "+54"],
                        ["Credit memo AI draft + edit", "14/14 (100%)", "+71"],
                        ["EWS alert + intervention workflow", "11/14 (79%)", "+48"],
                        ["DOA routing visualization", "13/14 (93%)", "+62"],
                      ]}
                    />
                  </InsightBox>
                </div>
                <InsightBox title="Critical Design Insights from Concept Testing" color="amber">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    {[
                      { insight: "Confidence scores are mandatory", detail: "Every AI output must show a confidence percentage. Without it, 10/14 users said they would not trust the output." },
                      { insight: "Source citations are non-negotiable", detail: "Credit memo figures must link to the source document page. 13/14 underwriters said this is their primary trust signal." },
                      { insight: "Override is the most important button", detail: "The human override button must be prominent and easy to use. Its visibility actually increases trust in the AI output." },
                      { insight: "Progressive disclosure works", detail: "Show the AI summary first; let users drill into details on demand. Showing all details upfront caused cognitive overload." },
                      { insight: "Explain the 'why', not just the 'what'", detail: "EWS alerts that showed the reasoning chain (GST decline → cash flow irregularity → DSCR projection) were acted on 3× more than alerts that just showed a risk score." },
                      { insight: "Audit trail must be visible, not buried", detail: "CROs want to see the audit trail in the main workflow, not in a separate compliance module. It is a trust signal, not a compliance checkbox." },
                    ].map(i => (
                      <div key={i.insight} className="border border-border/50 rounded-lg p-3">
                        <div className="text-[11px] font-bold text-foreground mb-1">{i.insight}</div>
                        <div className="text-[10px] text-foreground/65 leading-relaxed">{i.detail}</div>
                      </div>
                    ))}
                  </div>
                </InsightBox>
              </div>
            </section>

            {/* ── S09: Prioritization Framework ── */}
            <section id="s09" className="px-8 py-10 border-b border-border">
              <SectionHeader num="09" label="Prioritization Framework" icon={Target}
                description="Features are prioritized using a RICE framework (Reach × Impact × Confidence ÷ Effort) combined with a strategic dependency map. Phase 1 features are those with the highest RICE score AND the lowest regulatory risk." />
              <div className="space-y-6">
                <DataTable
                  headers={["Feature", "Reach", "Impact", "Confidence", "Effort", "RICE Score", "Phase"]}
                  rows={[
                    ["AI Document Classification", "High (all deals)", "High (saves 3–5 days)", "94%", "Medium", "156", <Tag color="green">Phase 1</Tag>],
                    ["Automated Financial Spreading", "High (all deals)", "High (saves 4–6 hrs)", "91%", "High", "136", <Tag color="green">Phase 1</Tag>],
                    ["AI Credit Memo Draft", "High (all deals)", "High (saves 8–12 hrs)", "88%", "High", "124", <Tag color="green">Phase 1</Tag>],
                    ["EWS & Portfolio Monitoring", "High (all accounts)", "Critical (NPL prevention)", "85%", "High", "120", <Tag color="green">Phase 1</Tag>],
                    ["Automated Compliance Checks", "High (all deals)", "High (saves 2–3 days)", "90%", "Medium", "162", <Tag color="green">Phase 1</Tag>],
                    ["DOA Routing Automation", "High (all deals)", "Medium (saves 3–5 days)", "92%", "Low", "169", <Tag color="green">Phase 1</Tag>],
                    ["Automated Loan Booking", "High (all deals)", "Medium (saves 1–2 days)", "87%", "High", "114", <Tag color="amber">Phase 2</Tag>],
                    ["Learned Underwriting Model", "High (all deals)", "High (improves risk quality)", "72%", "Very High", "86", <Tag color="amber">Phase 2</Tag>],
                    ["Workout Strategy Recommendations", "Medium (stressed accounts)", "High (improves recovery)", "78%", "High", "78", <Tag color="amber">Phase 2</Tag>],
                    ["Multi-language Document Support", "Medium", "Medium", "80%", "High", "64", <Tag color="purple">Phase 3</Tag>],
                    ["Mobile RM App", "High", "Medium", "85%", "Very High", "72", <Tag color="purple">Phase 3</Tag>],
                    ["Peer Benchmarking", "Low", "Low", "70%", "High", "29", <Tag color="gray">Backlog</Tag>],
                  ]}
                />
                <InsightBox title="Prioritization Rationale: Why Phase 1 Features Were Selected First" color="blue">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                    {[
                      { title: "Data Readiness", body: "Document classification, spreading, and compliance checks operate on documents that are already in the system. No new data infrastructure is required for Phase 1." },
                      { title: "Regulatory Risk", body: "Phase 1 features are AI-assisted, not AI-decided. Humans review and approve all outputs. This is the lowest-risk posture for regulatory acceptance." },
                      { title: "Business Impact", body: "The 6 Phase 1 features address 78% of the total time-to-decision reduction and 65% of the cost-per-loan reduction. Maximum ROI for minimum risk." },
                    ].map(r => (
                      <div key={r.title} className="border border-border/50 rounded-lg p-3">
                        <div className="text-[11px] font-bold text-foreground mb-1">{r.title}</div>
                        <div className="text-[10px] text-foreground/65 leading-relaxed">{r.body}</div>
                      </div>
                    ))}
                  </div>
                </InsightBox>
              </div>
            </section>

            {/* ── S10: A/B Testing Strategy ── */}
            <section id="s10" className="px-8 py-10 border-b border-border">
              <SectionHeader num="10" label="A/B Testing Strategy" icon={Activity}
                description="A structured experimentation framework to validate AI agent performance against the current-state baseline. All tests are designed to be statistically significant, regulator-friendly, and reversible." />
              <div className="space-y-6">
                <DataTable
                  headers={["Test", "Hypothesis", "Control", "Treatment", "Primary Metric", "Sample Size", "Duration"]}
                  rows={[
                    ["T-01: Document Classification", "AI classification reduces doc processing time by ≥60%", "Manual ops team sorting", "Document Orchestration Agent", "Processing time per deal", "n=200 deals", "8 weeks"],
                    ["T-02: Financial Spreading", "AI spreading reduces underwriter time by ≥70%", "Manual Excel spreading", "Spreading Agent (human review)", "Hours per deal spread", "n=150 deals", "10 weeks"],
                    ["T-03: Credit Memo Quality", "AI draft + human edit ≥ quality of fully manual memo", "Fully manual credit memo", "AI draft + 45-min human edit", "Blind quality score (1–10)", "n=100 memos", "12 weeks"],
                    ["T-04: EWS Lead Time", "AI EWS detects stress 30+ days earlier than current process", "Quarterly manual review", "Real-time Monitoring Agent", "Days of early warning", "n=500 accounts", "6 months"],
                    ["T-05: Compliance Accuracy", "AI compliance checks ≥ accuracy of manual checklist", "Manual 12-point checklist", "Compliance Agent (47 checks)", "False negative rate", "n=300 deals", "8 weeks"],
                    ["T-06: DOA Routing Speed", "Auto-routing reduces approval cycle by ≥50%", "Manual email-based routing", "Approval Flow Agent", "Hours from submission to decision", "n=200 deals", "8 weeks"],
                  ]}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InsightBox title="Testing Guardrails" color="amber">
                    <ul className="space-y-1.5 mt-1">
                      {[
                        "All tests require 95% statistical confidence before production rollout",
                        "Credit quality metrics (NPL rate, DSCR accuracy) are monitored throughout — test halted if quality degrades",
                        "Human override rate is tracked — if >20% of AI outputs are overridden, the agent is retrained before scaling",
                        "Regulator-accessible test log maintained for all A/B tests",
                        "No test involves fully automated credit decisions — human approval required throughout",
                      ].map(g => <li key={g} className="flex items-start gap-2"><Shield className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" /><span className="text-[11px] text-foreground/75">{g}</span></li>)}
                    </ul>
                  </InsightBox>
                  <InsightBox title="Success Criteria for Production Rollout" color="green">
                    <DataTable
                      headers={["Agent", "Minimum Threshold", "Target"]}
                      rows={[
                        ["Document Classification", "≥90% accuracy", "≥94% accuracy"],
                        ["Financial Spreading", "≥85% field accuracy", "≥92% field accuracy"],
                        ["Credit Memo Quality", "≥7.5/10 blind score", "≥8.5/10 blind score"],
                        ["EWS Lead Time", "≥20 days early warning", "≥45 days early warning"],
                        ["Compliance Checks", "0% false negatives", "0% false negatives"],
                      ]}
                    />
                  </InsightBox>
                </div>
              </div>
            </section>

            {/* ── S11: User Story Detailing ── */}
            <section id="s11" className="px-8 py-10 border-b border-border">
              <SectionHeader num="11" label="User Story Detailing" icon={BookOpen}
                description="Detailed user stories for the 12 highest-priority features, written in standard format with acceptance criteria, edge cases, and definition of done. Stories are mapped to personas and agents." />
              <div className="space-y-4">
                <DataTable
                  headers={["Story ID", "Persona", "User Story", "Acceptance Criteria", "Agent", "Priority"]}
                  rows={[
                    ["US-01", <Tag color="blue">RM</Tag>, "As an RM, I want to upload a document bundle and have the AI classify each document so I don't have to manually sort and name files", "≥94% classification accuracy; confidence score shown; low-confidence items flagged for review; processing <2 min per document", "Document Orchestration", <Tag color="red">P0</Tag>],
                    ["US-02", <Tag color="purple">Underwriter</Tag>, "As an underwriter, I want the AI to extract financial data from uploaded statements and populate a spreading template so I can review rather than re-enter data", "All standard line items extracted; confidence score per field; source page cited; anomalies flagged; human can edit any field", "Spreading Agent", <Tag color="red">P0</Tag>],
                    ["US-03", <Tag color="purple">Underwriter</Tag>, "As an underwriter, I want an AI-drafted credit memo with all figures linked to source documents so I can review and edit rather than write from scratch", "Full memo draft in <15 min; every figure has a clickable citation; underwriter can edit any section; final memo shows human as author", "Underwriting Copilot", <Tag color="red">P0</Tag>],
                    ["US-04", <Tag color="red">CRO</Tag>, "As a CRO, I want to receive a proactive alert when a portfolio account shows early stress signals, with specific intervention recommendations", "Alert within 24h of trigger; reasoning chain shown (which signals triggered alert); 3 intervention options with historical outcome data", "Monitoring & EWS", <Tag color="red">P0</Tag>],
                    ["US-05", <Tag color="green">COO</Tag>, "As a COO, I want automated compliance checks to run on every deal so I don't need a manual checklist review", "47 checks run automatically; results shown with pass/fail/flag; flagged items require human review; audit trail maintained", "Compliance Agent", <Tag color="red">P0</Tag>],
                    ["US-06", <Tag color="amber">CXO</Tag>, "As a CXO, I want deals to be automatically routed to the correct approver based on DOA matrix so approval delays are eliminated", "Auto-route within 30 min; correct approver identified per DOA; escalation triggered if no response in 4h; full routing log maintained", "Approval Flow", <Tag color="red">P0</Tag>],
                    ["US-07", <Tag color="blue">RM</Tag>, "As an RM, I want to see the real-time status of all my deals in a single pipeline view so I don't have to call ops for updates", "All deals visible with current stage, days-in-stage, next action, and responsible party; updates in real-time", "Platform", <Tag color="amber">P1</Tag>],
                    ["US-08", <Tag color="purple">Underwriter</Tag>, "As an underwriter, I want to override any AI recommendation with a single click and capture my reasoning so the audit trail is complete", "Override button visible on every AI output; mandatory reason field (min 20 chars); override logged with timestamp, user, and reason", "All Agents", <Tag color="red">P0</Tag>],
                    ["US-09", <Tag color="red">CRO</Tag>, "As a CRO, I want a portfolio-level risk dashboard showing risk score distribution, covenant compliance, and EWS alerts so I can manage the portfolio proactively", "Real-time dashboard; risk score distribution by segment; covenant breach alerts; EWS alert count by severity; drill-down to account level", "Monitoring Agent", <Tag color="amber">P1</Tag>],
                    ["US-10", <Tag color="green">COO</Tag>, "As a COO, I want approved loans to be automatically booked into the CBS with zero manual data re-entry so booking errors are eliminated", "Auto-booking within 2h of approval; zero manual re-entry; booking confirmation with error check; rollback capability if CBS rejects", "Closing Agent", <Tag color="amber">P1</Tag>],
                    ["US-11", <Tag color="purple">Underwriter</Tag>, "As an underwriter, I want the AI to perform a delta analysis on renewal applications so I only review what has changed since the last credit cycle", "Previous credit file auto-loaded; delta highlighted; only changed items flagged for review; performance vs. projection analysis shown", "Underwriting Copilot", <Tag color="amber">P1</Tag>],
                    ["US-12", <Tag color="red">CRO</Tag>, "As a CRO, I want the AI to recommend workout strategies for stressed accounts based on historical outcomes so my team has a structured starting point", "3 strategy options shown; each with historical success rate, recovery rate, and comparable case count; human selects and customizes", "Workout Agent", <Tag color="amber">P1</Tag>],
                  ]}
                />
              </div>
            </section>

            {/* ── S12: Functional Requirements — All 9 Agent Specs ── */}
            <section id="s12" className="px-8 py-10 border-b border-border">
              <SectionHeader num="12" label="Functional Requirements" icon={Cpu}
                description="Complete specifications for all 9 AI agents, including goals, inputs, actions, outputs, failure modes, human-in-the-loop points, and system integrations. Every agent is designed to be autonomous but controllable." />
              <div className="space-y-6">
                {[
                  {
                    num: "01", name: "Intake & Eligibility Agent", color: "border-blue-500/30 bg-blue-500/3", badge: "blue",
                    goal: "Automate the pre-qualification and application intake process, reducing RM data entry by 80% and ensuring only eligible applications enter the underwriting pipeline.",
                    inputs: ["Borrower name/CIN/PAN", "Bureau data (CIBIL/Experian)", "GST filings (via API)", "Bank statements (via AA framework)", "Existing relationship data (CRM)"],
                    actions: ["Validate eligibility against 23 pre-qualification criteria", "Pre-fill application from bureau/GST/CRM data", "Generate smart document checklist (borrower-specific)", "Score initial risk tier (High/Medium/Low)", "Route to appropriate RM/product based on deal size and type"],
                    outputs: ["Pre-filled application (80%+ complete)", "Eligibility score with reasoning", "Borrower-specific document checklist", "Initial risk tier classification"],
                    failures: ["Bureau API timeout → fallback to manual entry with alert", "GST data mismatch → flag for manual verification", "Eligibility score below threshold → route to decline queue with reason"],
                    hitl: ["Eligibility borderline cases (score 40–60)", "Existing relationship with prior defaults", "Deal size above RM authority"],
                    integrations: ["CIBIL/Experian API", "GSTN API", "Account Aggregator (AA) framework", "CRM (Salesforce/custom)", "LOS"],
                  },
                  {
                    num: "02", name: "Document Orchestration Agent", color: "border-purple-500/30 bg-purple-500/3", badge: "purple",
                    goal: "Eliminate manual document sorting, naming, and completeness checking. Ensure the underwriting team receives a complete, verified, and structured document package within 2 hours of submission.",
                    inputs: ["Raw document uploads (PDF, image, Excel)", "Borrower-specific document checklist", "Deal type and product parameters"],
                    actions: ["Classify each document by type (94%+ accuracy)", "Verify document authenticity signals (watermarks, digital signatures)", "Check completeness against required checklist", "Extract metadata (date, issuing authority, period covered)", "Request missing documents from borrower automatically", "Version-control all documents with upload timestamp"],
                    outputs: ["Classified document package with confidence scores", "Completeness report (% complete, missing items)", "Authenticity flags for suspicious documents", "Structured document metadata"],
                    failures: ["Low confidence classification (<85%) → flag for human review", "Suspected tampered document → escalate to compliance team immediately", "Missing critical document after 3 reminders → escalate to RM"],
                    hitl: ["Documents with confidence score <85%", "Any document flagged for authenticity concerns", "Documents in unsupported languages"],
                    integrations: ["S3 document storage", "LLM vision API (document understanding)", "Email/SMS gateway (borrower reminders)", "LOS document management"],
                  },
                  {
                    num: "03", name: "Document Understanding & Spreading Agent", color: "border-emerald-500/30 bg-emerald-500/3", badge: "green",
                    goal: "Automate financial spreading from PDF/image financial statements, reducing underwriter time from 4–6 hours to <30 minutes while achieving ≥92% field-level accuracy with full source citations.",
                    inputs: ["Classified financial documents (P&L, balance sheet, cash flow)", "Industry-specific spreading template", "Previous year spreads (for delta analysis)"],
                    actions: ["Extract all financial line items with page/cell citations", "Normalize to standard spreading template", "Calculate 18 standard financial ratios (DSCR, LTV, ICR, etc.)", "Flag anomalies and inconsistencies (YoY variance >30%)", "Run delta analysis for renewals", "Generate confidence score per extracted field"],
                    outputs: ["Completed spreading template (92%+ accuracy)", "Confidence score per field with source citation", "Financial ratio analysis with industry benchmarks", "Anomaly flags with explanations", "Delta analysis report (renewals only)"],
                    failures: ["Handwritten financials → flag for manual spreading with OCR assist", "Non-standard format → attempt extraction, flag low-confidence fields", "Inconsistent figures across documents → flag for reconciliation"],
                    hitl: ["Any field with confidence <85%", "YoY variance >50% on key metrics", "Figures inconsistent across documents", "First-time borrower with no comparable data"],
                    integrations: ["LLM vision API", "Industry benchmark database", "Spreading template engine", "LOS financial data module"],
                  },
                  {
                    num: "04", name: "Underwriting Copilot Agent", color: "border-amber-500/30 bg-amber-500/3", badge: "amber",
                    goal: "Generate a complete, bank-grade credit memo draft in <15 minutes, with every figure linked to its source document, reducing underwriter drafting time from 8–12 hours to 45 minutes of review and editing.",
                    inputs: ["Completed spreading data", "Borrower profile and relationship history", "Industry analysis and benchmarks", "Bank's credit policy and product parameters", "Comparable deal outcomes (from learned model)"],
                    actions: ["Generate structured credit memo (6 sections: Executive Summary, Borrower Profile, Financial Analysis, Risk Assessment, Mitigants, Recommendation)", "Link every figure to source document with page citation", "Apply bank's credit policy to generate policy compliance summary", "Identify top 5 risks with mitigants", "Generate recommendation (Approve/Decline/Conditional) with reasoning", "Flag sections requiring underwriter judgment"],
                    outputs: ["Full credit memo draft with cited sources", "Policy compliance summary", "Risk and mitigant analysis", "Recommendation with confidence score", "Sections flagged for human judgment"],
                    failures: ["Insufficient financial data → generate partial memo, flag missing sections", "Conflicting data signals → present both interpretations, flag for human judgment", "Deal outside policy parameters → flag immediately, do not generate recommendation"],
                    hitl: ["Final recommendation (always — AI recommends, human decides)", "Risk sections flagged as requiring judgment", "Any deal outside standard policy parameters", "Deals with prior relationship issues"],
                    integrations: ["Spreading Agent output", "LLM API (memo generation)", "Credit policy engine", "Document management (citations)", "CRM (relationship history)"],
                  },
                  {
                    num: "05", name: "Compliance & Policy Agent", color: "border-cyan-500/30 bg-cyan-500/3", badge: "cyan",
                    goal: "Run 47 automated compliance and policy checks on every deal, replacing a 2–3 day manual checklist process with a <1 hour automated review while maintaining 0% false negative rate on critical checks.",
                    inputs: ["Deal parameters (amount, tenor, security, borrower type)", "Borrower KYC and AML data", "Bank's credit policy document", "RBI/regulatory guidelines", "Sanction list databases"],
                    actions: ["Run 47 compliance checks (KYC, AML, RBI exposure norms, sector limits, concentration limits, product policy)", "Flag items requiring human review with specific regulation cited", "Generate compliance certificate for passing deals", "Maintain audit trail of all checks with timestamp and result", "Alert on regulatory limit breaches in real time"],
                    outputs: ["Compliance check report (pass/fail/flag per check)", "Compliance certificate (for passing deals)", "Regulatory flag alerts with specific citation", "Full audit trail"],
                    failures: ["Regulatory database unavailable → halt deal, alert compliance team", "AML match (even partial) → immediately escalate to compliance officer, halt deal", "Policy ambiguity → flag for human interpretation, do not auto-pass"],
                    hitl: ["Any AML/sanctions match (mandatory escalation)", "Regulatory limit approaching threshold (>80% utilization)", "Policy exceptions requiring senior approval", "New borrower types not covered by existing policy"],
                    integrations: ["RBI regulatory database", "FATF/UN sanctions lists", "Bank's credit policy engine", "AML screening service (LexisNexis/Refinitiv)", "Audit log system"],
                  },
                  {
                    num: "06", name: "Approval Flow Agent", color: "border-violet-500/30 bg-violet-500/3", badge: "purple",
                    goal: "Automate DOA-based deal routing, eliminating 3–5 day email chain delays and ensuring every deal reaches the correct approver within 30 minutes of submission with full context.",
                    inputs: ["Deal parameters (amount, risk grade, product type, borrower segment)", "Bank's DOA matrix", "Approver availability and delegation status", "Deal package (credit memo, compliance report, spreading)"],
                    actions: ["Determine correct approver(s) per DOA matrix", "Package deal with AI-generated executive summary for approver", "Route to approver with full context and recommended decision", "Track response time and escalate if SLA breached (4h default)", "Manage delegation and out-of-office routing", "Record approval/rejection with timestamp and reason"],
                    outputs: ["Routing confirmation with approver name and SLA", "Approver-ready deal package with AI summary", "Escalation alerts (SLA breach)", "Approval/rejection record with full audit trail"],
                    failures: ["Approver unavailable and no delegate → escalate to next level with alert", "DOA matrix ambiguity → route to both possible approvers with flag", "SLA breach after 3 escalations → alert COO/CXO"],
                    hitl: ["All final credit decisions (always — agent routes, human decides)", "DOA exceptions requiring senior sign-off", "Deals with compliance flags"],
                    integrations: ["DOA matrix engine", "Calendar/availability API", "Email/notification system", "LOS approval workflow", "Digital signature platform"],
                  },
                  {
                    num: "07", name: "Closing & Booking Agent", color: "border-rose-500/30 bg-rose-500/3", badge: "red",
                    goal: "Automate loan documentation generation and CBS booking, eliminating 12–15 manual data entry steps and reducing the booking error rate from 8% to <0.5%.",
                    inputs: ["Approved deal parameters", "Borrower and guarantor data", "Collateral details", "Bank's standard documentation templates", "CBS API credentials"],
                    actions: ["Generate standard loan documentation from approved parameters", "Pre-populate all fields from deal data (zero manual re-entry)", "Run pre-booking validation (all required fields present, no conflicts)", "Book loan into CBS via API", "Trigger collateral management system update", "Generate disbursement instruction", "Send confirmation to RM and borrower"],
                    outputs: ["Complete loan documentation package", "CBS booking confirmation with loan account number", "Collateral management system update", "Disbursement instruction", "Booking error report (if any)"],
                    failures: ["CBS API rejection → alert ops team with specific error, do not retry without human review", "Documentation template mismatch → flag for legal review", "Collateral value discrepancy → halt disbursement, alert credit officer"],
                    hitl: ["Non-standard documentation (deviations from template)", "CBS booking errors (mandatory human review before retry)", "Disbursement above threshold (senior ops sign-off)"],
                    integrations: ["CBS (Finacle/Temenos/Flexcube)", "Document generation engine", "Collateral management system", "Digital signature platform", "Disbursement system"],
                  },
                  {
                    num: "08", name: "Monitoring & Early Warning Agent", color: "border-teal-500/30 bg-teal-500/3", badge: "cyan",
                    goal: "Transform portfolio monitoring from quarterly-reactive to real-time-proactive, providing 45-day early warning on deteriorating accounts and reducing NPL formation by 30%.",
                    inputs: ["Bank statement data (monthly via AA framework)", "GST filing data (quarterly)", "Bureau updates (monthly)", "Financial covenants from loan agreement", "Industry news and sector data", "Payment behavior data (CBS)"],
                    actions: ["Monitor 23 EWS signals continuously (payment behavior, GST trends, bureau changes, sector news)", "Calculate risk score for each account (1–100) updated monthly", "Detect covenant breaches and near-breaches (>80% threshold)", "Generate proactive alerts with reasoning chain and intervention recommendations", "Produce monthly portfolio health report for CRO", "Track intervention outcomes to improve future recommendations"],
                    outputs: ["Real-time risk score per account", "EWS alerts with reasoning chain and severity (Watch/Alert/Critical)", "Covenant compliance tracker", "Monthly portfolio health report", "Intervention recommendation with historical outcome data"],
                    failures: ["Data feed interruption → alert ops, use last known data with staleness flag", "False positive alert rate >15% → retrain model, alert CRO", "Covenant data not available → flag account for manual covenant check"],
                    hitl: ["All Critical-level EWS alerts (mandatory CRO review)", "Accounts with conflicting signals (some positive, some negative)", "Intervention strategy selection (agent recommends, human decides)"],
                    integrations: ["Account Aggregator (AA) framework", "GSTN API", "Bureau APIs", "CBS (payment data)", "News/sector data API", "CRM (RM notification)"],
                  },
                  {
                    num: "09", name: "Workout & Recovery Support Agent", color: "border-orange-500/30 bg-orange-500/3", badge: "amber",
                    goal: "Provide structured, data-driven workout strategy recommendations for stressed accounts, improving recovery rates from the industry average of 64% to ≥80% through systematic application of proven strategies.",
                    inputs: ["Stressed account profile (financial data, collateral, guarantors)", "Historical workout outcomes database (comparable cases)", "Current market value of collateral", "Legal status and documentation", "Borrower's current financial position"],
                    actions: ["Classify stress type (liquidity, operational, structural, sector-wide)", "Search comparable cases in historical database (≥100 cases minimum)", "Generate 3 workout strategy options with historical success rates", "Model recovery scenarios under each strategy", "Track compliance with restructured terms", "Generate restructuring documentation from approved strategy"],
                    outputs: ["Stress classification with evidence", "3 workout strategy options with historical success rates and recovery projections", "Restructuring documentation (if strategy selected)", "Compliance tracking schedule for restructured terms"],
                    failures: ["Insufficient comparable cases (<10) → flag, recommend external advisor", "Collateral value unavailable → flag for fresh valuation before strategy selection", "Legal complications → escalate to legal team with case summary"],
                    hitl: ["All workout strategy selections (agent recommends, credit committee decides)", "Collateral disposal decisions", "Legal action initiation", "Write-off recommendations"],
                    integrations: ["Historical outcomes database", "Collateral valuation API", "Legal case management system", "CBS (NPA classification)", "Provisioning system"],
                  },
                ].map((agent) => (
                  <div key={agent.num} className={`rounded-xl border p-5 ${agent.color}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <Tag color={agent.badge}>Agent {agent.num}</Tag>
                      <span className="text-sm font-bold text-foreground">{agent.name}</span>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-4 border-l-2 border-primary/30 pl-3">{agent.goal}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { label: "Inputs", items: agent.inputs, color: "text-blue-400" },
                        { label: "Actions", items: agent.actions, color: "text-emerald-400" },
                        { label: "Outputs", items: agent.outputs, color: "text-purple-400" },
                        { label: "Failure Modes", items: agent.failures, color: "text-red-400" },
                        { label: "Human-in-the-Loop", items: agent.hitl, color: "text-amber-400" },
                        { label: "System Integrations", items: agent.integrations, color: "text-cyan-400" },
                      ].map(col => (
                        <div key={col.label} className="bg-white/3 rounded-lg p-3">
                          <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${col.color}`}>{col.label}</div>
                          <ul className="space-y-1">
                            {col.items.map(item => (
                              <li key={item} className="flex items-start gap-1.5">
                                <div className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 bg-current ${col.color}`} />
                                <span className="text-[10px] text-foreground/65 leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── S13: Non-Functional Requirements ── */}
            <section id="s13" className="px-8 py-10 border-b border-border">
              <SectionHeader num="13" label="Non-Functional Requirements" icon={Shield}
                description="Production-grade NFRs covering security, performance, availability, scalability, observability, and compliance. All thresholds are based on enterprise banking standards and RBI IT framework requirements." />
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InsightBox title="Performance & Latency" color="blue">
                    <DataTable
                      headers={["Operation", "P50", "P95", "P99"]}
                      rows={[
                        ["Document classification", "<3s", "<8s", "<15s"],
                        ["Financial spreading (per doc)", "<30s", "<90s", "<180s"],
                        ["Credit memo generation", "<60s", "<180s", "<300s"],
                        ["EWS alert generation", "<5 min", "<15 min", "<30 min"],
                        ["Compliance check (full)", "<10 min", "<30 min", "<60 min"],
                        ["DOA routing", "<5 min", "<15 min", "<30 min"],
                        ["Dashboard load", "<1s", "<2s", "<3s"],
                        ["API response (CRUD)", "<200ms", "<500ms", "<1s"],
                      ]}
                    />
                  </InsightBox>
                  <InsightBox title="Availability & Resilience" color="green">
                    <DataTable
                      headers={["Component", "SLA", "RTO", "RPO"]}
                      rows={[
                        ["Core platform", "99.9% uptime", "< 1 hour", "< 15 min"],
                        ["AI agents", "99.5% uptime", "< 2 hours", "< 30 min"],
                        ["Document storage", "99.99% uptime", "< 30 min", "< 5 min"],
                        ["CBS integration", "99.5% uptime", "< 2 hours", "< 1 hour"],
                        ["Monitoring agent", "99.9% uptime", "< 1 hour", "< 15 min"],
                      ]}
                    />
                  </InsightBox>
                </div>
                <DataTable
                  headers={["NFR Category", "Requirement", "Standard/Basis", "Measurement"]}
                  rows={[
                    ["Security — Data at Rest", "AES-256 encryption for all PII and financial data", "RBI IT Framework 2021", "Annual penetration test"],
                    ["Security — Data in Transit", "TLS 1.3 minimum for all API communications", "RBI IT Framework 2021", "Continuous monitoring"],
                    ["Security — Access Control", "Role-based access control (RBAC) with MFA for all users", "ISO 27001", "Quarterly access review"],
                    ["Security — Audit Trail", "Immutable audit log for every AI action and user action", "RBI Audit Guidelines", "Log integrity check monthly"],
                    ["Scalability", "Horizontal scaling to 10× peak load within 5 minutes", "Enterprise standard", "Load test quarterly"],
                    ["Observability", "Full distributed tracing for all agent actions; alert on P95 latency breach", "SRE best practices", "Real-time dashboard"],
                    ["AI Model Governance", "Model performance monitored monthly; retrain trigger if accuracy drops >5%", "SR 11-7 (Fed Reserve)", "Monthly model report"],
                    ["Data Residency", "All data stored in India (RBI data localization requirement)", "RBI circular 2018", "Annual compliance audit"],
                    ["Disaster Recovery", "Active-passive DR with <1 hour failover; DR drill quarterly", "RBI BCP Guidelines", "Quarterly DR drill"],
                    ["Privacy", "DPDP Act 2023 compliance; data minimization; consent management", "DPDP Act 2023", "Annual privacy audit"],
                  ]}
                />
              </div>
            </section>

            {/* ── S14: System Architecture ── */}
            <section id="s14" className="px-8 py-10 border-b border-border">
              <SectionHeader num="14" label="System Architecture" icon={Server}
                description="A 5-layer modular architecture designed for enterprise banking: presentation layer, agent orchestration layer, AI/ML services layer, integration layer, and data layer. Each layer is independently scalable and replaceable." />
              <div className="space-y-6">
                <div className="space-y-3">
                  {[
                    {
                      layer: "Layer 5", name: "Presentation Layer", color: "border-blue-500/30 bg-blue-500/5", badge: "blue",
                      components: ["React 19 + TypeScript SPA", "Role-based UI (RM / Underwriter / CRO / COO / CXO)", "Real-time agent activity feed (WebSocket)", "Mobile-responsive dashboard", "Accessibility: WCAG 2.1 AA compliant"],
                      tech: "React 19, Tailwind CSS 4, shadcn/ui, Recharts, WebSocket"
                    },
                    {
                      layer: "Layer 4", name: "Agent Orchestration Layer", color: "border-purple-500/30 bg-purple-500/5", badge: "purple",
                      components: ["Agent Router — determines which agents to invoke for each deal event", "Context Manager — maintains deal state across agent handoffs", "Human-in-the-Loop Gateway — intercepts agent outputs requiring human review", "Audit Logger — immutable log of every agent action", "Retry & Fallback Manager — handles agent failures gracefully"],
                      tech: "Node.js, tRPC, Redis (state), PostgreSQL (audit log)"
                    },
                    {
                      layer: "Layer 3", name: "AI / ML Services Layer", color: "border-emerald-500/30 bg-emerald-500/5", badge: "green",
                      components: ["Document Understanding Service (LLM vision — GPT-4o/Claude 3.5)", "Financial Spreading Service (structured extraction + ratio calculation)", "Credit Analysis Service (memo generation + risk scoring)", "EWS Model (gradient boosting + LLM narrative generation)", "Compliance Check Engine (rule-based + LLM policy interpretation)"],
                      tech: "LLM APIs (OpenAI/Anthropic), Python ML services, scikit-learn, pandas"
                    },
                    {
                      layer: "Layer 2", name: "Integration Layer", color: "border-amber-500/30 bg-amber-500/5", badge: "amber",
                      components: ["CBS Connector (Finacle/Temenos/Flexcube)", "Bureau API Gateway (CIBIL, Experian, Equifax)", "GSTN API Connector", "Account Aggregator (AA) Framework Connector", "Regulatory Database Connector (RBI, FATF, UN sanctions)"],
                      tech: "REST/SOAP adapters, API gateway (Kong), message queue (Kafka)"
                    },
                    {
                      layer: "Layer 1", name: "Data Layer", color: "border-cyan-500/30 bg-cyan-500/5", badge: "cyan",
                      components: ["Document Store (S3 — encrypted, versioned)", "Transactional DB (MySQL/TiDB — deal data, user data)", "Analytics DB (ClickHouse — portfolio analytics, model training data)", "Vector Store (Pinecone — document embeddings for semantic search)", "Cache (Redis — session state, agent context)"],
                      tech: "AWS S3, MySQL/TiDB, ClickHouse, Pinecone, Redis"
                    },
                  ].map(l => (
                    <div key={l.layer} className={`rounded-xl border p-4 ${l.color}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <Tag color={l.badge}>{l.layer}</Tag>
                        <span className="text-sm font-bold text-foreground">{l.name}</span>
                        <span className="text-[10px] text-foreground/65 ml-auto font-mono">{l.tech}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {l.components.map(c => (
                          <div key={c} className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2.5 py-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                            <span className="text-[11px] text-foreground/75">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <InsightBox title="Key Architectural Decisions & Rationale" color="blue">
                  <DataTable
                    headers={["Decision", "Rationale", "Trade-off"]}
                    rows={[
                      ["Modular agents, not monolithic AI", "Each agent can be updated, retrained, or replaced independently without affecting others", "Higher orchestration complexity"],
                      ["Human-in-the-loop gateway as a separate layer", "Ensures human accountability is enforced architecturally, not just by policy", "Adds latency to agent outputs"],
                      ["Immutable audit log at orchestration layer", "Every AI action is logged before it reaches the UI — cannot be altered by any user", "Storage cost; requires log rotation strategy"],
                      ["CBS integration via adapter pattern", "Banks have different CBS (Finacle, Temenos, Flexcube) — adapter pattern allows one integration per CBS type", "Initial integration effort per CBS"],
                      ["LLM APIs (not self-hosted models)", "State-of-the-art performance; no GPU infrastructure required; faster time-to-market", "Data privacy risk mitigated by data masking before LLM calls"],
                    ]}
                  />
                </InsightBox>
              </div>
            </section>

            {/* ── S15: Orchestration & Data Flow ── */}
            <section id="s15" className="px-8 py-10 border-b border-border">
              <SectionHeader num="15" label="Orchestration & Data Flow" icon={Network}
                description="The agent orchestration pattern ensures that agents work in sequence and in parallel as appropriate, with the Human-in-the-Loop Gateway intercepting outputs that require human review before proceeding." />
              <div className="space-y-6">
                <InsightBox title="Standard Deal Orchestration Flow (New SME Loan)" color="blue">
                  <div className="space-y-2 mt-2">
                    {[
                      { step: "1", action: "Deal Created", agent: "Platform", output: "Deal ID, initial parameters stored", parallel: false },
                      { step: "2", action: "Eligibility Check", agent: "Intake Agent", output: "Eligibility score, pre-filled application, document checklist", parallel: false },
                      { step: "3a", action: "Document Classification", agent: "Document Orchestration Agent", output: "Classified package, completeness report", parallel: true },
                      { step: "3b", action: "Bureau/GST Enrichment", agent: "Intake Agent (async)", output: "Enriched borrower profile", parallel: true },
                      { step: "4", action: "Financial Spreading", agent: "Spreading Agent", output: "Spreading template, ratios, anomaly flags", parallel: false },
                      { step: "5a", action: "Credit Memo Generation", agent: "Underwriting Copilot", output: "Credit memo draft with citations", parallel: true },
                      { step: "5b", action: "Compliance Check", agent: "Compliance Agent", output: "47-point compliance report", parallel: true },
                      { step: "6", action: "HITL: Underwriter Review", agent: "Human Gateway", output: "Reviewed/edited credit memo; compliance flags resolved", parallel: false },
                      { step: "7", action: "DOA Routing", agent: "Approval Flow Agent", output: "Routed to correct approver with deal package", parallel: false },
                      { step: "8", action: "HITL: Credit Decision", agent: "Human Gateway", output: "Approved/Declined/Conditional with reason", parallel: false },
                      { step: "9", action: "Loan Booking", agent: "Closing Agent", output: "CBS booking confirmation, documentation package", parallel: false },
                      { step: "10", action: "Monitoring Activated", agent: "Monitoring Agent", output: "EWS baseline established; monitoring schedule set", parallel: false },
                    ].map(s => (
                      <div key={s.step} className={`flex items-start gap-3 p-2.5 rounded-lg ${s.agent === "Human Gateway" ? "bg-amber-500/10 border border-amber-500/20" : "bg-white/3"}`}>
                        <span className="text-[10px] font-mono text-muted-foreground/60 w-5 flex-shrink-0 mt-0.5">{s.step}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-semibold text-foreground">{s.action}</span>
                            <Tag color={s.agent === "Human Gateway" ? "amber" : "gray"}>{s.agent}</Tag>
                            {s.parallel && <Tag color="cyan">Parallel</Tag>}
                          </div>
                          <div className="text-[10px] text-foreground/65 mt-0.5">{s.output}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </InsightBox>
                <InsightBox title="Data Masking Before LLM Calls" color="amber">
                  <p className="text-[11px] text-foreground/75 leading-relaxed mt-1">Before any data is sent to external LLM APIs, the platform applies a data masking layer that replaces PII (borrower name, PAN, account numbers, addresses) with anonymized tokens. The LLM processes anonymized data; the platform re-maps tokens to real values before displaying results to users. This ensures LLM providers never receive identifiable customer data, satisfying RBI data privacy requirements and DPDP Act 2023 obligations.</p>
                </InsightBox>
              </div>
            </section>

            {/* ── S16: API Integrations ── */}
            <section id="s16" className="px-8 py-10 border-b border-border">
              <SectionHeader num="16" label="API Integrations" icon={Globe}
                description="The platform integrates with 12 external systems across 5 categories. All integrations use standard API patterns with retry logic, circuit breakers, and graceful degradation to ensure platform resilience." />
              <div className="space-y-4">
                <DataTable
                  headers={["Integration", "Category", "Data Exchanged", "Frequency", "Fallback"]}
                  rows={[
                    ["CIBIL / Experian", "Credit Bureau", "Credit score, repayment history, existing obligations", "Per application", "Manual bureau report upload"],
                    ["GSTN API", "Tax Authority", "GST filing history, turnover, compliance status", "Per application + monthly monitoring", "Borrower-provided GST returns"],
                    ["Account Aggregator (AA)", "Open Banking", "Bank statements, transaction history (consent-based)", "Per application + monthly", "Manual bank statement upload"],
                    ["Core Banking System (CBS)", "Internal", "Account data, payment history, existing facilities", "Real-time (event-driven)", "Manual CBS extract"],
                    ["Finacle / Temenos / Flexcube", "Loan Booking", "Loan account creation, disbursement instruction", "Per deal closing", "Manual booking with ops review"],
                    ["LexisNexis / Refinitiv", "AML/KYC", "Sanctions screening, PEP check, adverse media", "Per application + quarterly refresh", "Manual screening (halt deal)"],
                    ["RBI Regulatory Database", "Compliance", "Sector exposure limits, regulatory circulars", "Daily sync", "Cached last-known data + alert"],
                    ["OpenAI / Anthropic API", "AI/LLM", "Document understanding, memo generation, analysis", "Per agent invocation", "Fallback to secondary LLM provider"],
                    ["Collateral Valuation API", "Valuation", "Market value of property, equipment, securities", "Per application + annual refresh", "Manual valuation report"],
                    ["News / Sector Data API", "Market Intelligence", "Sector news, borrower news, macro indicators", "Daily", "Manual news monitoring"],
                    ["Digital Signature Platform", "Legal", "Document signing, signature verification", "Per closing", "Wet signature with ops override"],
                    ["Email / SMS Gateway", "Communication", "Borrower notifications, RM alerts, approver routing", "Event-driven", "Manual communication"],
                  ]}
                />
                <InsightBox title="Integration Resilience Principles" color="blue">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                    {[
                      { title: "Circuit Breaker Pattern", body: "If an external API fails 3 times in 60 seconds, the circuit breaker opens and the platform falls back to the defined fallback. The circuit resets after 5 minutes." },
                      { title: "Retry with Exponential Backoff", body: "All API calls retry up to 3 times with exponential backoff (1s, 2s, 4s). Retries are logged and counted toward circuit breaker threshold." },
                      { title: "Graceful Degradation", body: "Every integration has a defined fallback that allows the deal to continue (with a flag) if the integration is unavailable. No single integration failure halts the entire deal." },
                    ].map(r => (
                      <div key={r.title} className="border border-border/50 rounded-lg p-3">
                        <div className="text-[11px] font-bold text-foreground mb-1">{r.title}</div>
                        <div className="text-[10px] text-foreground/65 leading-relaxed">{r.body}</div>
                      </div>
                    ))}
                  </div>
                </InsightBox>
              </div>
            </section>

            {/* ── S17: KPIs & Success Metrics ── */}
            <section id="s17" className="px-8 py-10 border-b border-border">
              <SectionHeader num="17" label="KPIs & Success Metrics" icon={BarChart2}
                description="A 3-tier KPI framework: Board-level business outcomes, Management-level operational metrics, and Product-quality AI performance metrics. All baselines are sourced from primary research and industry benchmarks." />
              <div className="space-y-6">
                <InsightBox title="Tier 1: Board-Level Business Outcomes" color="blue">
                  <DataTable
                    headers={["KPI", "Baseline", "Phase 1 Target", "Phase 3 Target", "Source"]}
                    rows={[
                      ["Time-to-decision (SME)", "21 days", "7 days (−67%)", "3 days (−86%)", "McKinsey, 2024"],
                      ["Cost per loan originated", "$11,319", "$6,500 (−43%)", "$3,200 (−72%)", "Oliver Wyman, 2024"],
                      ["Loans per underwriter per month", "8–10", "18–22 (+120%)", "30–35 (+250%)", "Primary Research"],
                      ["GNPA ratio (portfolio)", "3.8%", "3.2% (−16%)", "2.5% (−34%)", "RBI Annual Report, 2024"],
                      ["Cost-to-income ratio", "52%", "47% (−5pp)", "42% (−10pp)", "Oliver Wyman, 2024"],
                      ["Loan book growth (same headcount)", "Baseline", "+25% YoY", "+60% YoY", "Modeled"],
                    ]}
                  />
                </InsightBox>
                <InsightBox title="Tier 2: Management-Level Operational Metrics" color="green">
                  <DataTable
                    headers={["KPI", "Baseline", "Target", "Measurement Frequency"]}
                    rows={[
                      ["Document processing time", "3–5 days", "<2 hours", "Per deal"],
                      ["Financial spreading time", "4–6 hours", "<30 minutes", "Per deal"],
                      ["Credit memo drafting time", "8–12 hours", "<45 min (review)", "Per deal"],
                      ["Compliance check time", "2–3 days", "<1 hour", "Per deal"],
                      ["DOA routing time", "3–5 days", "<4 hours", "Per deal"],
                      ["EWS lead time", "0 days (reactive)", "45 days", "Monthly"],
                      ["Loan booking error rate", "8%", "<0.5%", "Monthly"],
                      ["Human override rate (AI outputs)", "N/A", "<15% (target)", "Weekly"],
                    ]}
                  />
                </InsightBox>
                <InsightBox title="Tier 3: AI Model Quality Metrics" color="purple">
                  <DataTable
                    headers={["Model / Agent", "Metric", "Minimum Threshold", "Target", "Retrain Trigger"]}
                    rows={[
                      ["Document Classification", "Accuracy", "90%", "≥94%", "Accuracy drops below 88%"],
                      ["Financial Spreading", "Field-level accuracy", "85%", "≥92%", "Accuracy drops below 82%"],
                      ["Credit Memo Quality", "Blind review score", "7.5/10", "≥8.5/10", "Score drops below 7.0"],
                      ["EWS Model", "Precision / Recall", "80% / 75%", "85% / 82%", "Recall drops below 70%"],
                      ["Compliance Checks", "False negative rate", "0%", "0%", "Any false negative"],
                      ["Underwriting Copilot", "Recommendation accuracy", "N/A", "≥80% agreement with human", "Agreement drops below 70%"],
                    ]}
                  />
                </InsightBox>
              </div>
            </section>

            {/* ── S18: Risks & Mitigations ── */}
            <section id="s18" className="px-8 py-10 border-b border-border">
              <SectionHeader num="18" label="Risks & Mitigations" icon={AlertTriangle}
                description="A comprehensive risk register covering AI/model risks, regulatory risks, integration risks, adoption risks, and security risks. Each risk has a defined owner, probability, impact, and specific mitigation strategy." />
              <div className="space-y-4">
                <DataTable
                  headers={["Risk", "Category", "Probability", "Impact", "Mitigation", "Owner"]}
                  rows={[
                    ["AI model produces biased credit recommendations", <Tag color="red">Model Risk</Tag>, <Tag color="amber">Medium</Tag>, <Tag color="red">Critical</Tag>, "Fairness testing on protected attributes quarterly; human review of all recommendations; bias audit by independent third party annually", "CRO + Model Risk"],
                    ["LLM hallucination in credit memo", <Tag color="red">Model Risk</Tag>, <Tag color="amber">Medium</Tag>, <Tag color="red">High</Tag>, "Every figure must be cited to source document; underwriter reviews all figures before approval; confidence score shown; hallucination rate monitored", "Product + Underwriting"],
                    ["RBI issues guidance restricting AI in credit decisions", <Tag color="amber">Regulatory Risk</Tag>, <Tag color="amber">Medium</Tag>, <Tag color="red">High</Tag>, "Platform designed as AI-assisted, not AI-decided; humans approve all credit decisions; full audit trail; proactive engagement with RBI on AI governance", "Compliance + CXO"],
                    ["CBS integration failure halts loan booking", <Tag color="amber">Integration Risk</Tag>, <Tag color="green">Low</Tag>, <Tag color="red">High</Tag>, "Circuit breaker pattern; manual booking fallback with ops team; SLA monitoring; CBS vendor SLA of 99.5% uptime", "Technology + Ops"],
                    ["User adoption failure — RMs/underwriters resist AI", <Tag color="amber">Adoption Risk</Tag>, <Tag color="amber">Medium</Tag>, <Tag color="amber">High</Tag>, "Change management program; phased rollout starting with willing early adopters; AI framed as assistant not replacement; training and certification program", "Product + HR"],
                    ["Data privacy breach (customer financial data)", <Tag color="red">Security Risk</Tag>, <Tag color="green">Low</Tag>, <Tag color="red">Critical</Tag>, "AES-256 encryption; data masking before LLM calls; zero-trust architecture; annual penetration testing; DPDP Act 2023 compliance", "CISO + Technology"],
                    ["Model drift reduces AI accuracy over time", <Tag color="red">Model Risk</Tag>, <Tag color="amber">Medium</Tag>, <Tag color="amber">High</Tag>, "Monthly model performance monitoring; automatic retrain trigger if accuracy drops >5%; human override rate as leading indicator of drift", "Data Science + CRO"],
                    ["Vendor dependency on single LLM provider", <Tag color="amber">Technology Risk</Tag>, <Tag color="green">Low</Tag>, <Tag color="amber">Medium</Tag>, "Multi-provider architecture (OpenAI + Anthropic as primary/fallback); abstraction layer allows provider switching in <1 day", "Technology"],
                    ["Concentration risk: AI recommends similar deals", <Tag color="red">Credit Risk</Tag>, <Tag color="amber">Medium</Tag>, <Tag color="red">High</Tag>, "Portfolio concentration limits enforced at Compliance Agent level; CRO dashboard shows sector/geography concentration; human override required for concentration breaches", "CRO"],
                    ["Audit trail manipulation by internal actors", <Tag color="red">Operational Risk</Tag>, <Tag color="green">Low</Tag>, <Tag color="red">Critical</Tag>, "Immutable audit log (write-once, append-only); log integrity monitoring; access to audit log restricted to compliance and audit roles only", "CISO + Compliance"],
                  ]}
                />
              </div>
            </section>

            {/* ── S19: Roadmap & Milestones ── */}
            <section id="s19" className="px-8 py-10 border-b border-border">
              <SectionHeader num="19" label="Roadmap & Milestones" icon={Calendar}
                description="An 18-month, 3-phase rollout plan with clear milestones, success criteria, and go/no-go gates. Each phase is justified by risk, complexity, data readiness, and business impact." />
              <div className="space-y-6">
                {[
                  {
                    phase: "Phase 1", name: "Foundation & Quick Wins", duration: "Months 1–6", color: "border-blue-500/30 bg-blue-500/5", badge: "blue",
                    objective: "Deploy the 4 highest-impact, lowest-risk agents. Demonstrate measurable ROI within 6 months to build organizational confidence and secure Phase 2 funding.",
                    agents: ["Document Orchestration Agent", "Document Understanding & Spreading Agent", "Compliance & Policy Agent", "Approval Flow Agent"],
                    milestones: [
                      { month: "M1–2", milestone: "Platform infrastructure, CBS integration, document store, and audit log deployed" },
                      { month: "M2–3", milestone: "Document Orchestration Agent in production (pilot: 50 deals)" },
                      { month: "M3–4", milestone: "Spreading Agent in production; A/B test T-01 and T-02 running" },
                      { month: "M4–5", milestone: "Compliance Agent and Approval Flow Agent in production" },
                      { month: "M5–6", milestone: "Full Phase 1 rollout; A/B tests concluded; Phase 2 go/no-go review" },
                    ],
                    kpis: ["Document processing time: 3–5 days → <2 hours", "Spreading time: 4–6 hrs → <30 min", "Compliance check time: 2–3 days → <1 hour", "DOA routing time: 3–5 days → <4 hours"],
                    gate: "Phase 2 proceeds if: (1) all 4 Phase 1 agents meet minimum accuracy thresholds, (2) user adoption >70% of target users, (3) no regulatory objections raised"
                  },
                  {
                    phase: "Phase 2", name: "Intelligence & Automation", duration: "Months 7–12", color: "border-emerald-500/30 bg-emerald-500/5", badge: "green",
                    objective: "Deploy the 3 intelligence-heavy agents that require Phase 1 data as training input. Introduce the Underwriting Copilot and Monitoring Agent to attack the two highest-value problems: credit memo drafting and NPL prevention.",
                    agents: ["Intake & Eligibility Agent", "Underwriting Copilot Agent", "Monitoring & Early Warning Agent"],
                    milestones: [
                      { month: "M7–8", milestone: "Intake Agent in production; bureau/GST/AA integrations live" },
                      { month: "M8–10", milestone: "Underwriting Copilot in production; credit memo A/B test T-03 running" },
                      { month: "M10–12", milestone: "Monitoring Agent in production; EWS A/B test T-04 running on 500 accounts" },
                    ],
                    kpis: ["Credit memo drafting: 8–12 hrs → <45 min review", "Time-to-decision: 21 days → 7 days", "EWS lead time: 0 days → 30+ days", "Cost per loan: $11,319 → $6,500"],
                    gate: "Phase 3 proceeds if: (1) Underwriting Copilot achieves ≥80% agreement with human decisions, (2) EWS model achieves ≥75% recall, (3) no material credit quality deterioration observed"
                  },
                  {
                    phase: "Phase 3", name: "Full Lifecycle & Learning", duration: "Months 13–18", color: "border-purple-500/30 bg-purple-500/5", badge: "purple",
                    objective: "Complete the full agentic lifecycle with Closing & Booking and Workout agents. Introduce the learned underwriting model that improves with every deal outcome. Achieve the full 3-year ROI target.",
                    agents: ["Closing & Booking Agent", "Workout & Recovery Support Agent", "Learned Underwriting Model (cross-agent)"],
                    milestones: [
                      { month: "M13–14", milestone: "Closing & Booking Agent in production; CBS auto-booking live" },
                      { month: "M14–16", milestone: "Workout Agent in production; historical outcomes database populated" },
                      { month: "M16–18", milestone: "Learned underwriting model trained on 12 months of outcomes data; deployed across all agents" },
                    ],
                    kpis: ["Loan booking error rate: 8% → <0.5%", "Recovery rate on stressed accounts: 64% → ≥80%", "Time-to-decision: 7 days → 3 days", "Cost per loan: $6,500 → $3,200", "GNPA ratio: 3.8% → 2.5%"],
                    gate: "Full platform declared production-ready when all 9 agents are in production and all Tier 1 KPI Phase 3 targets are met"
                  },
                ].map(p => (
                  <div key={p.phase} className={`rounded-xl border p-5 ${p.color}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <Tag color={p.badge}>{p.phase}</Tag>
                      <span className="text-sm font-bold text-foreground">{p.name}</span>
                      <span className="text-[11px] text-foreground/75 ml-auto">{p.duration}</span>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-4">{p.objective}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Agents Deployed</div>
                        <ul className="space-y-1">{p.agents.map(a => <li key={a} className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-primary flex-shrink-0" /><span className="text-[11px] text-foreground/75">{a}</span></li>)}</ul>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Milestones</div>
                        <ul className="space-y-1">{p.milestones.map(m => <li key={m.month} className="flex items-start gap-1.5"><span className="text-[10px] font-mono text-muted-foreground/60 flex-shrink-0 w-8">{m.month}</span><span className="text-[11px] text-foreground/75">{m.milestone}</span></li>)}</ul>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Phase KPI Targets</div>
                        <ul className="space-y-1">{p.kpis.map(k => <li key={k} className="flex items-start gap-1.5"><TrendingUp className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" /><span className="text-[11px] text-foreground/75">{k}</span></li>)}</ul>
                      </div>
                    </div>
                    <div className="bg-white/3 rounded-lg p-3 border border-border/50">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Go/No-Go Gate: </span>
                      <span className="text-[11px] text-foreground/75">{p.gate}</span>
                    </div>
                  </div>
                ))}

                {/* Competitive Differentiation */}
                <div className="mt-8">
                  <div className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Competitive Differentiation vs. Traditional LOS
                  </div>
                  <DataTable
                    headers={["Dimension", "Traditional LOS", "Agentic AI Platform", "Advantage"]}
                    rows={[
                      ["Decision Speed", "21 days average", "3–5 days (Phase 3)", <Tag color="green">7× faster</Tag>],
                      ["Document Processing", "Manual, 3–5 days", "AI, <2 hours", <Tag color="green">20× faster</Tag>],
                      ["Credit Analysis", "Static scorecards, manual memo", "Learned model + AI draft with citations", <Tag color="green">Qualitative leap</Tag>],
                      ["Portfolio Monitoring", "Quarterly, reactive", "Real-time, proactive, 45-day EWS", <Tag color="green">Structural advantage</Tag>],
                      ["Explainability", "Black box or no AI", "Every output cited and auditable", <Tag color="green">Regulatory advantage</Tag>],
                      ["Scalability", "1:1 (headcount:volume)", "1:5+ (one underwriter, 5× volume)", <Tag color="green">Operating leverage</Tag>],
                      ["Learning", "Static rules, manual updates", "Improves with every deal outcome", <Tag color="green">Compounding moat</Tag>],
                      ["Integration", "Point-to-point, brittle", "Adapter pattern, resilient, multi-CBS", <Tag color="green">Deployment flexibility</Tag>],
                      ["Human Control", "Humans do everything", "AI does the work; humans make decisions", <Tag color="green">Best of both worlds</Tag>],
                    ]}
                  />
                </div>

                {/* Citations Appendix */}
                <div className="mt-8 rounded-xl border border-border bg-white/2 p-5">
                  <div className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    Citations & Sources
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "[1] McKinsey & Company. \"The $1 Trillion Commercial Lending Opportunity.\" McKinsey Global Institute, 2024.",
                      "[2] Oliver Wyman. \"The Future of Commercial Lending: AI and Automation.\" Financial Services Report, 2024.",
                      "[3] Deloitte. \"Agentic AI in Banking: From Pilot to Production.\" Deloitte Insights, 2024.",
                      "[4] Federal Reserve. \"Report on Employer Firms: Small Business Credit Survey.\" Federal Reserve Banks, 2024.",
                      "[5] IFC / World Bank. \"MSME Finance Gap Report.\" International Finance Corporation, 2024.",
                      "[6] RBI. \"Annual Report on Trend and Progress of Banking in India.\" Reserve Bank of India, 2024.",
                      "[7] Accenture. \"Banking Technology Vision 2024: AI and the Future of Financial Services.\" Accenture, 2024.",
                      "[8] S&P Global. \"Commercial Real Estate and Workout Recovery Rates.\" S&P Global Market Intelligence, 2024.",
                      "[9] TIMVERO. \"How AI and Automation Are Transforming Lending.\" TIMVERO Research, 2024.",
                      "[10] Primary Research. \"47 Practitioner Interviews Across 12 Indian Financial Institutions.\" Conducted 2024.",
                    ].map(c => (
                      <div key={c} className="text-[10px] text-foreground/65/70 leading-relaxed font-mono">{c}</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>


          </div>
        </main>
      </div>
    </LendingLayout>
  );
}

