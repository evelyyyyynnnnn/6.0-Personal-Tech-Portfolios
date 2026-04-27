import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import Calculators from "./pages/Calculators";
import RetirementPlanner from "./pages/RetirementPlanner";
import TaxEngine from "./pages/TaxEngine";
import AssetAllocation from "./pages/AssetAllocation";
import BenefitsOptimizer from "./pages/BenefitsOptimizer";
import AIAdvisor from "./pages/AIAdvisor";
import Consultation from "./pages/Consultation";

function Router() {
  return (
    <>
      <TopNav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/calculators" component={Calculators} />
        <Route path="/planner" component={RetirementPlanner} />
        <Route path="/tax" component={TaxEngine} />
        <Route path="/allocation" component={AssetAllocation} />
        <Route path="/benefits" component={BenefitsOptimizer} />
        <Route path="/ai-advisor" component={AIAdvisor} />
        <Route path="/consultation" component={Consultation} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
