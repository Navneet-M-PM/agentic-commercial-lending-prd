import { Link } from "wouter";
import { ArrowRight, Brain, FileSearch, BarChart3, Shield, TrendingUp, Activity, Zap, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Activity, title: "Pipeline Dashboard", desc: "Real-time view of all deals across every lending stage", href: "/dashboard", color: "text-blue-400", bg: "bg-blue-400/10" },
  { icon: FileSearch, title: "Document AI", desc: "Instant classification and completeness checking", href: "/documents/DL-2024-001", color: "text-purple-400", bg: "bg-purple-400/10" },
  { icon: BarChart3, title: "Auto Spreading", desc: "94% faster financial statement analysis", href: "/spreading/DL-2024-001", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { icon: Brain, title: "Credit Memo AI", desc: "AI-drafted memos with clickable source citations", href: "/credit-memo/DL-2024-001", color: "text-green-400", bg: "bg-green-400/10" },
  { icon: Zap, title: "Agent Activity", desc: "Live feed of all autonomous agent actions", href: "/agents", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { icon: Shield, title: "Compliance", desc: "Automated policy checks and audit trail", href: "/compliance/DL-2024-001", color: "text-red-400", bg: "bg-red-400/10" },
  { icon: TrendingUp, title: "Portfolio Monitor", desc: "Early warning alerts 45 days before default", href: "/portfolio", color: "text-orange-400", bg: "bg-orange-400/10" },
  { icon: BarChart3, title: "KPI Metrics", desc: "Before/after AI impact on time, cost, quality", href: "/metrics", color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

const stats = [
  { value: "81%", label: "Faster Time-to-Decision", sub: "21 days → 4 days" },
  { value: "63%", label: "Lower Cost Per Loan", sub: "$11,319 → $4,200" },
  { value: "3×", label: "Underwriter Throughput", sub: "8 → 28 deals/month" },
  { value: "45 days", label: "Early Warning Lead Time", sub: "vs. reactive monitoring" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-base font-bold text-foreground">LendAI</div>
            <div className="text-[10px] text-muted-foreground tracking-wider uppercase">Agentic Commercial Lending</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="status-live w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <span className="text-[11px] text-green-400 font-medium">Platform Live — 9 Agents Active</span>
          </div>
          <Link href="/dashboard">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Enter Platform <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            Enterprise-Grade Agentic AI for Commercial Lending
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            The Future of
            <span className="gradient-text block">Commercial Lending</span>
            is Autonomous
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Nine specialized AI agents work in concert to automate document processing, financial spreading, credit analysis, and portfolio monitoring — while keeping humans in control of every credit decision.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8">
                Explore the Platform <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/metrics">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-white/5 gap-2 px-8">
                View KPI Impact <BarChart3 className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12 border-y border-border bg-card/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              End-to-End Lending Intelligence
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every stage of the commercial lending lifecycle, reimagined with autonomous AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div className="group p-5 rounded-xl border border-border bg-card card-hover cursor-pointer h-full">
                  <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{feature.desc}</p>
                  <div className={`flex items-center gap-1 text-xs ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Explore <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Agent architecture */}
      <section className="px-6 py-12 bg-card/20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-foreground mb-2">9 Specialized AI Agents</h2>
            <p className="text-sm text-muted-foreground">Each agent has a defined scope, clear handoff points, and full audit trail</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Intake & Eligibility", color: "text-blue-400 border-blue-400/30 bg-blue-400/5" },
              { name: "Document Orchestration", color: "text-purple-400 border-purple-400/30 bg-purple-400/5" },
              { name: "Document Understanding & Spreading", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5" },
              { name: "Underwriting Copilot", color: "text-green-400 border-green-400/30 bg-green-400/5" },
              { name: "Compliance & Policy", color: "text-red-400 border-red-400/30 bg-red-400/5" },
              { name: "Approval Flow", color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5" },
              { name: "Closing & Booking", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5" },
              { name: "Monitoring & Early Warning", color: "text-orange-400 border-orange-400/30 bg-orange-400/5" },
              { name: "Workout & Recovery Support", color: "text-rose-400 border-rose-400/30 bg-rose-400/5" },
            ].map((agent) => (
              <div key={agent.name} className={`px-3 py-1.5 rounded-full border text-xs font-medium ${agent.color}`}>
                <span className="status-live mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                {agent.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to see it in action?</h2>
          <p className="text-muted-foreground mb-8">Walk through a complete SME loan journey — from application to approval in under 4 days.</p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-10">
              Launch Demo Platform <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          LendAI — Agentic AI Commercial Lending Platform · Demo Environment · All data is simulated for demonstration purposes
        </p>
      </footer>
    </div>
  );
}
