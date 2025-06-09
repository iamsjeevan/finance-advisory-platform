
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Tools from "./pages/Tools";
import News from "./pages/News";
import AIFinancialPlanner from "./pages/AIFinancialPlanner";
import AIFinancialPlannerWizard from "./pages/AIFinancialPlannerWizard";

import FinancialPlanning from "./pages/services/FinancialPlanning";
import InvestmentAdvisory from "./pages/services/InvestmentAdvisory";
import TaxPlanning from "./pages/services/TaxPlanning";
import { WatchlistProvider } from "./context/WatchlistContext";

// Tool pages
import LoanCalculator from "./pages/tools/loan-calculator";
import InvestmentCalculator from "./pages/tools/investment-calculator";
import BudgetPlanner from "./pages/tools/budget-planner";
import NetWorthTracker from "./pages/tools/net-worth-tracker";
import GoalPlanner from "./pages/tools/goal-planner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <WatchlistProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/ai-financial-planner" element={
                <ProtectedRoute>
                  <AIFinancialPlannerWizard />
                </ProtectedRoute>
              } />
              <Route path="/ai-financial-planner-old" element={
                <ProtectedRoute>
                  <AIFinancialPlanner />
                </ProtectedRoute>
              } />
              
              <Route path="/news" element={<News />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Tool Routes */}
              <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
              <Route path="/tools/investment-calculator" element={<InvestmentCalculator />} />
              <Route path="/tools/budget-planner" element={<BudgetPlanner />} />
              <Route path="/tools/net-worth-tracker" element={<NetWorthTracker />} />
              <Route path="/tools/goal-planner" element={<GoalPlanner />} />

              <Route path="/services/financial-planning" element={<FinancialPlanning />} />
              <Route path="/services/investment-advisory" element={<InvestmentAdvisory />} />
              <Route path="/services/tax-planning" element={<TaxPlanning />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WatchlistProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
