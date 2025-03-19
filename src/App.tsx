
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import News from './pages/News';
import AIFinancialPlanner from './pages/AIFinancialPlanner';
import AIFinancialPlannerWizard from './pages/AIFinancialPlannerWizard';
import Tools from './pages/Tools';
import LoanCalculator from './pages/tools/loan-calculator';
import InvestmentCalculator from './pages/tools/investment-calculator';
import BudgetPlanner from './pages/tools/budget-planner';
import NetWorthTracker from './pages/tools/net-worth-tracker';
import GoalPlanner from './pages/tools/goal-planner';
import FinancialPlanning from './pages/services/FinancialPlanning';
import InvestmentAdvisory from './pages/services/InvestmentAdvisory';
import TaxPlanning from './pages/services/TaxPlanning';
import Dashboard from './pages/Dashboard';

import { NewsProvider } from './context/NewsContext';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <NewsProvider>
        <WatchlistProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/ai-financial-planner" element={<AIFinancialPlanner />} />
            <Route path="/ai-financial-planner-wizard" element={<AIFinancialPlannerWizard />} />
            <Route path="/tools" element={<Tools />} />
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
          <Toaster />
        </WatchlistProvider>
      </NewsProvider>
    </AuthProvider>
  );
};

export default App;
