import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DealDetail from "./pages/DealDetail";
import Documents from "./pages/Documents";
import Spreading from "./pages/Spreading";
import CreditMemo from "./pages/CreditMemo";
import AgentFeed from "./pages/AgentFeed";
import ApprovalWorkflow from "./pages/ApprovalWorkflow";
import Compliance from "./pages/Compliance";
import Portfolio from "./pages/Portfolio";
import Metrics from "./pages/Metrics";
import NotFound from "./pages/NotFound";
import ROICalculator from "./pages/ROICalculator";
import DemoTour from "./components/DemoTour";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/deals/:id" component={DealDetail} />
      <Route path="/documents/:id?" component={Documents} />
      <Route path="/spreading/:id?" component={Spreading} />
      <Route path="/credit-memo/:id?" component={CreditMemo} />
      <Route path="/agents" component={AgentFeed} />
      <Route path="/approval/:id?" component={ApprovalWorkflow} />
      <Route path="/compliance/:id?" component={Compliance} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/metrics" component={Metrics} />
      <Route path="/roi-calculator" component={ROICalculator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <DemoTour />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
