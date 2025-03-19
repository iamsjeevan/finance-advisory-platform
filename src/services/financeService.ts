
import { User } from "@/context/AuthContext";

export interface FinancialData {
  userId: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  investments: InvestmentData[];
  expenses: ExpenseData[];
  financialGoals: FinancialGoal[];
}

export interface InvestmentData {
  id: string;
  type: 'stocks' | 'bonds' | 'mutual_funds' | 'real_estate' | 'sip' | 'other';
  name: string;
  amount: number;
  annualReturn: number;
  startDate: string;
}

export interface ExpenseData {
  id: string;
  category: 'housing' | 'food' | 'transportation' | 'utilities' | 'healthcare' | 'entertainment' | 'other';
  amount: number;
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  description?: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface InsuranceRecommendation {
  type: string;
  provider: string;
  monthlyPremium: number;
  coverage: number;
  description: string;
}

export interface StockRecommendation {
  ticker: string;
  name: string;
  price: number;
  recommendation: 'buy' | 'sell' | 'hold';
  riskLevel: 'low' | 'medium' | 'high';
  sector: string;
}

export interface SIPRecommendation {
  name: string;
  monthlyAmount: number;
  annualReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

export interface FinancialHealthSummary {
  score: number;
  savingsRate: number;
  debtToIncomeRatio: number;
  emergencyFundStatus: string;
  investmentDiversification: string;
  analysis: string;
}

export interface FinancialPlan {
  insuranceRecommendations: InsuranceRecommendation[];
  stockRecommendations: StockRecommendation[];
  sipRecommendations: SIPRecommendation[];
  investmentDistribution: {category: string; percentage: number}[];
  expenseBreakdown: {category: string; percentage: number}[];
  financialHealthSummary: FinancialHealthSummary;
  recommendations: string[];
  riskTolerance: string;
  emergencyFundTarget: number;
  taxOptimizationTips: string[];
}

// Save financial data to local storage
export const saveFinancialData = (data: FinancialData): void => {
  localStorage.setItem('financial_data', JSON.stringify(data));
};

// Get financial data from local storage
export const getFinancialData = (userId: string): FinancialData | null => {
  const data = localStorage.getItem('financial_data');
  if (data) {
    const parsedData = JSON.parse(data) as FinancialData;
    if (parsedData.userId === userId) {
      return parsedData;
    }
  }
  return null;
};

// Initialize financial data for a new user
export const initializeFinancialData = (user: User): FinancialData => {
  const newData: FinancialData = {
    userId: user.id,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savings: 0,
    investments: [],
    expenses: [],
    financialGoals: []
  };
  
  saveFinancialData(newData);
  return newData;
};

// Generate a financial plan based on user data
export const generateFinancialPlan = (userData: FinancialData): FinancialPlan => {
  // This would typically be an API call to an AI service,
  // but for now we'll generate mock recommendations
  
  // Example data
  const plan: FinancialPlan = {
    insuranceRecommendations: [
      {
        type: "Term Life Insurance",
        provider: "Secure Life",
        monthlyPremium: 45,
        coverage: 500000,
        description: "Term life policy with 20-year coverage period and level premiums."
      },
      {
        type: "Health Insurance",
        provider: "MediShield Plus",
        monthlyPremium: 150,
        coverage: 300000,
        description: "Comprehensive health coverage with low deductibles and co-pays."
      },
      {
        type: "Property Insurance",
        provider: "HomeSecure",
        monthlyPremium: 80,
        coverage: 250000,
        description: "Covers property damage, theft, and liability."
      }
    ],
    stockRecommendations: [
      {
        ticker: "AAPL",
        name: "Apple Inc.",
        price: 174.79,
        recommendation: "buy",
        riskLevel: "medium",
        sector: "Technology"
      },
      {
        ticker: "MSFT",
        name: "Microsoft Corporation",
        price: 338.11,
        recommendation: "buy",
        riskLevel: "low",
        sector: "Technology"
      },
      {
        ticker: "AMZN",
        name: "Amazon.com Inc.",
        price: 145.22,
        recommendation: "hold",
        riskLevel: "medium",
        sector: "Consumer Discretionary"
      },
      {
        ticker: "JNJ",
        name: "Johnson & Johnson",
        price: 162.39,
        recommendation: "buy",
        riskLevel: "low",
        sector: "Healthcare"
      },
      {
        ticker: "VZ",
        name: "Verizon Communications",
        price: 41.81,
        recommendation: "hold",
        riskLevel: "low",
        sector: "Telecommunications"
      }
    ],
    sipRecommendations: [
      {
        name: "Total Market Index Fund",
        monthlyAmount: 300,
        annualReturn: 8.5,
        riskLevel: "medium",
        description: "Broad exposure to the entire stock market with low fees."
      },
      {
        name: "Dividend Growth Fund",
        monthlyAmount: 200,
        annualReturn: 6.5,
        riskLevel: "low",
        description: "Focus on stable companies with growing dividend payments."
      },
      {
        name: "International Equity Fund",
        monthlyAmount: 150,
        annualReturn: 7.8,
        riskLevel: "medium",
        description: "Provides exposure to international markets for diversification."
      },
      {
        name: "Technology Sector Fund",
        monthlyAmount: 100,
        annualReturn: 11.2,
        riskLevel: "high",
        description: "Higher growth potential but with increased volatility."
      }
    ],
    investmentDistribution: [
      { category: "Stocks", percentage: 45 },
      { category: "Bonds", percentage: 25 },
      { category: "Real Estate", percentage: 15 },
      { category: "Cash & Equivalents", percentage: 10 },
      { category: "Alternative Investments", percentage: 5 }
    ],
    expenseBreakdown: [
      { category: "Housing", percentage: 35 },
      { category: "Food", percentage: 15 },
      { category: "Transportation", percentage: 12 },
      { category: "Utilities", percentage: 8 },
      { category: "Healthcare", percentage: 10 },
      { category: "Entertainment", percentage: 7 },
      { category: "Debt Payments", percentage: 8 },
      { category: "Miscellaneous", percentage: 5 }
    ],
    financialHealthSummary: {
      score: 72,
      savingsRate: 15.5,
      debtToIncomeRatio: 0.32,
      emergencyFundStatus: "Below target (2 months vs. recommended 6 months)",
      investmentDiversification: "Moderately diversified, needs international exposure",
      analysis: "Overall financial health is good with room for improvement. Focus on building emergency fund and increasing retirement contributions."
    },
    recommendations: [
      "Increase emergency fund to cover 6 months of expenses",
      "Boost retirement contributions by 5% of income",
      "Consider refinancing high-interest debt",
      "Diversify investment portfolio with international exposure",
      "Review and optimize tax strategies",
      "Set up automatic savings for major financial goals",
      "Increase insurance coverage to protect against potential liabilities"
    ],
    riskTolerance: "Moderate - comfortable with market fluctuations for potentially higher returns, but still want some portfolio stability",
    emergencyFundTarget: 30000,
    taxOptimizationTips: [
      "Maximize contributions to tax-advantaged accounts",
      "Consider tax-loss harvesting for taxable investments",
      "Review potential deductions and credits",
      "Consider Roth conversion strategies"
    ]
  };
  
  return plan;
};
