import { useState, useEffect } from "react";
import LendingLayout from "@/components/LendingLayout";
import { agentActivities, deals } from "@/lib/mockData";
import { Link } from "wouter";
import {
  Activity, Zap, FileSearch, BarChart3, Brain, Shield,
  GitBranch, TrendingUp, AlertTriangle, CheckCircle2, Clock,
  ChevronRight, Filter, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const agentDefs = [
  { name: "Intake & Eligibility", icon: Zap, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30", status: "active", processed: 24, today: 3 },
  { name: "Document Orchestration", icon: FileSearch, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", status: "active", processed: 186, today: 14 },
  { name: "Spreading Agent", icon: BarChart3, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", status: "active", processed: 42, today: 2 },
  { name: "Underwriting Copilot", icon: Brain, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", status: "active", processed: 38, today: 1 },
  { name: "Compliance & Policy", icon: Shield, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30", status: "active", processed: 52, today: 4 },
  { name: "Approval Flow", icon: GitBranch, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30", status: "active", processed: 31, today: 1 },
  { name: "Closing & Booking", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", status: "idle", processed: 18, today: 0 },
  { name: "Monitoring & EWS", icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30", status: "active", processed: 1240, today: 45 },
  { name: "Workout & Recovery", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/30", status: "idle", processed: 8, today: 0 },
];

const newActivities = [
  { id: 11, agent: 'Monitoring & EWS', action: 'Portfolio health check completed — 47 accounts scanned, 2 alerts generated', status: 'completed', time: 'Just now', deal: 'DL-2024-005', icon: 'TrendingUp', color: 'text-orange-400' },
  { id: 12, agent: 'Intake & Eligibility Agent', action: 'New inquiry from Westfield Capital Group — pre-screening initiated', status: 'pending', time: '1 min ago', deal: 'DL-2024-009', icon: 'Zap', color: 'text-blue-400' },
];

export default function AgentFeed() {
  const [activities, setActivities] = useState([...newActivities, ...agentActivities]);
  const [filter, setFilter] = useState<string>('All');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const statusFilters = ['All', 'completed', 'pending', 'alert', 'review'];
  const filtered = filter === 'All' ? activities : activities.filter(a => a.status === filter);

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />;
      case 'alert': return <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />;
      case 'review': return <Clock className="w-3.5 h-3.5 text-yellow-400" />;
      default: return <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />;
    }
  };

  const statusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400/5 border-green-400/20';
      case 'alert': return 'bg-orange-400/5 border-orange-400/20';
      case 'review': return 'bg-yellow-400/5 border-yellow-400/20';
      default: return 'bg-blue-400/5 border-blue-400/20';
    }
  };

  return (
    <LendingLayout title="Agent Activity Feed" subtitle="Real-time autonomous agent operations">
      <div className="p-4 lg:p-6 space-y-6">

        {/* Agent grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {agentDefs.map((agent) => (
            <div key={agent.name} className={`bg-card border rounded-xl p-3 text-center ${agent.status === 'active' ? agent.border : 'border-border'}`}>
              <div className={`w-8 h-8 rounded-lg ${agent.bg} flex items-center justify-center mx-auto mb-2 ${agent.status === 'active' ? 'agent-active' : ''}`}>
                <agent.icon className={`w-4 h-4 ${agent.color}`} />
              </div>
              <div className="text-[9px] font-medium text-foreground leading-tight mb-1">{agent.name}</div>
              <div className={`text-[9px] font-medium ${agent.status === 'active' ? 'text-green-400' : 'text-muted-foreground'}`}>
                {agent.status === 'active' ? '● Active' : '○ Idle'}
              </div>
              <div className="text-[9px] text-muted-foreground mt-1">{agent.today} today</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Actions Today", value: "74", sub: "Across all agents", color: "metric-card-blue" },
            { label: "Avg Response Time", value: "1.4s", sub: "Per agent action", color: "metric-card-green" },
            { label: "Success Rate", value: "98.6%", sub: "Last 30 days", color: "metric-card-yellow" },
            { label: "Human Escalations", value: "3", sub: "Require review", color: "metric-card-red" },
          ].map((s) => (
            <div key={s.label} className={`bg-card border border-border rounded-xl p-4 ${s.color}`}>
              <div className="text-xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-[10px] text-muted-foreground/60">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Live Activity Stream</h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/20">
                <span className="status-live w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                <span className="text-[10px] text-green-400">Live</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {statusFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                      filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setLastRefresh(new Date())}
                className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-border/50 max-h-[600px] overflow-y-auto">
            {filtered.map((activity, idx) => (
              <div key={activity.id} className={`flex items-start gap-4 px-4 py-4 hover:bg-white/2 transition-colors ${idx === 0 ? 'bg-primary/3' : ''}`}>
                {/* Status icon */}
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${statusBg(activity.status)}`}>
                  {statusIcon(activity.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-xs font-semibold ${activity.color}`}>{activity.agent}</span>
                      {idx === 0 && (
                        <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">New</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Link href={`/deals/${activity.deal}`}>
                      <span className="text-[10px] text-primary hover:text-primary/80 cursor-pointer font-mono">{activity.deal}</span>
                    </Link>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
                      activity.status === 'completed' ? 'bg-green-400/10 border-green-400/30 text-green-400' :
                      activity.status === 'alert' ? 'bg-orange-400/10 border-orange-400/30 text-orange-400' :
                      activity.status === 'review' ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' :
                      'bg-blue-400/10 border-blue-400/30 text-blue-400'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-border flex items-center justify-between bg-muted/20">
            <span className="text-xs text-muted-foreground">Showing {filtered.length} activities</span>
            <span className="text-[10px] text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
