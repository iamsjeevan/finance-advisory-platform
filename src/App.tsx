
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Tools from "./pages/Tools";
import AIFinancialPlanner from "./pages/AIFinancialPlanner";

import FinancialPlanning from "./pages/services/FinancialPlanning";
import InvestmentAdvisory from "./pages/services/InvestmentAdvisory";
import TaxPlanning from "./pages/services/TaxPlanning";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ai-financial-planner" element={<AIFinancialPlanner />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/services/financial-planning" element={<FinancialPlanning />} />
          <Route path="/services/investment-advisory" element={<InvestmentAdvisory />} />
          <Route path="/services/tax-planning" element={<TaxPlanning />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
