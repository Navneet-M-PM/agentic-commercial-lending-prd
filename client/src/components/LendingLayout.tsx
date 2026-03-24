import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, FileText, BarChart3, Brain, Activity,
  GitBranch, Shield, TrendingUp, LineChart, ChevronLeft,
  ChevronRight, Zap, Bell, Settings, LogOut, Menu, X,
  Building2, AlertTriangle, Calculator, BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Pipeline Dashboard", badge: null },
  { href: "/agents", icon: Activity, label: "Agent Activity Feed", badge: "Live" },
  { href: "/documents/DL-2024-001", icon: FileText, label: "Document Processing", badge: null },
  { href: "/spreading/DL-2024-001", icon: BarChart3, label: "Financial Spreading", badge: null },
  { href: "/credit-memo/DL-2024-001", icon: Brain, label: "Credit Memo AI", badge: null },
  { href: "/approval/DL-2024-003", icon: GitBranch, label: "Approval Workflow", badge: null },
  { href: "/compliance/DL-2024-001", icon: Shield, label: "Compliance", badge: null },
  { href: "/portfolio", icon: TrendingUp, label: "Portfolio Monitoring", badge: "2 Alerts" },
  { href: "/metrics", icon: LineChart, label: "KPI Metrics", badge: null },
  { href: "/roi-calculator", icon: Calculator, label: "ROI Calculator", badge: "New" },
  { href: "/prd", icon: BookOpen, label: "Product PRD", badge: "19 Sections" },
];

interface LendingLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function LendingLayout({ children, title, subtitle }: LendingLayoutProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 h-full flex flex-col
          bg-[oklch(0.11_0.013_240)] border-r border-border
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[60px]' : 'w-[240px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-border ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-bold text-foreground leading-tight">LendAI</div>
              <div className="text-[10px] text-muted-foreground">Commercial Platform</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href.split('/').slice(0, 2).join('/'));
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                    transition-all duration-150 group relative
                    ${isActive
                      ? 'bg-primary/15 text-primary border-l-2 border-primary pl-[10px]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                  {!collapsed && (
                    <>
                      <span className="text-xs font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge
                          className={`text-[9px] px-1.5 py-0 h-4 ${
                            item.badge === 'Live'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }`}
                        >
                          {item.badge === 'Live' && <span className="status-live mr-1 inline-block w-1.5 h-1.5 rounded-full bg-green-400" />}
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {/* Tooltip for collapsed */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                      {item.label}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-border p-2 space-y-1">
          {!collapsed && (
            <div className="px-3 py-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">SC</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground truncate">Sarah Chen</div>
                <div className="text-[10px] text-muted-foreground">Senior RM</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-[oklch(0.11_0.013_240)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {title && (
              <div>
                <h1 className="text-sm font-semibold text-foreground">{title}</h1>
                {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="status-live w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              <span className="text-[10px] text-green-400 font-medium">9 Agents Active</span>
            </div>
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-400" />
            </button>
            <Link href="/metrics">
              <button className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
