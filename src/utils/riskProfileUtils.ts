
import { FormData } from "@/types/financialPlanner";
import indianFinancialData from "@/data/indianFinancialData.json";

export interface RiskProfile {
  level: 'Conservative' | 'Moderate' | 'Aggressive' | 'Very Aggressive';
  description: string;
  stockAllocation: number;
  bondAllocation: number;
  goldAllocation: number;
  recommendations: {
    stocks: any[];
    mutualFunds: any[];
    gold: any[];
    fixedDeposits: any[];
  };
}

export const calculateRiskProfile = (formData: FormData): RiskProfile => {
  const age = formData.age;
  const riskTolerance = formData.riskTolerance;
  const currentSavings = Number(formData.currentSavings) || 0;
  const monthlyInvestment = Number(formData.investmentAmount) || 0;
  
  // Calculate risk score based on multiple factors
  let riskScore = riskTolerance * 10; // Base score from user input
  
  // Age factor (younger = higher risk capacity)
  if (age < 30) riskScore += 20;
  else if (age < 40) riskScore += 10;
  else if (age < 50) riskScore += 0;
  else if (age < 60) riskScore -= 10;
  else riskScore -= 20;
  
  // Investment capacity factor
  if (monthlyInvestment > 10000) riskScore += 15;
  else if (monthlyInvestment > 5000) riskScore += 10;
  else if (monthlyInvestment > 2000) riskScore += 5;
  
  // Savings factor
  if (currentSavings > 1000000) riskScore += 10;
  else if (currentSavings > 500000) riskScore += 5;
  
  // Determine risk profile based on final score
  if (riskScore >= 80) {
    return {
      level: 'Very Aggressive',
      description: 'High growth potential with higher risk. Suitable for young investors with long-term goals.',
      stockAllocation: 80,
      bondAllocation: 10,
      goldAllocation: 10,
      recommendations: {
        stocks: [...indianFinancialData.stocks.smallCap, ...indianFinancialData.stocks.midCap.slice(0, 2)],
        mutualFunds: [
          indianFinancialData.mutualFunds.equity[2], // Small cap
          indianFinancialData.mutualFunds.equity[1]  // Mid cap
        ],
        gold: indianFinancialData.gold.slice(0, 2),
        fixedDeposits: []
      }
    };
  } else if (riskScore >= 60) {
    return {
      level: 'Aggressive',
      description: 'Balanced growth approach with moderate risk. Good for investors with medium-term goals.',
      stockAllocation: 70,
      bondAllocation: 20,
      goldAllocation: 10,
      recommendations: {
        stocks: [...indianFinancialData.stocks.largeCap.slice(0, 2), ...indianFinancialData.stocks.midCap.slice(0, 2)],
        mutualFunds: [
          indianFinancialData.mutualFunds.equity[0], // Large cap
          indianFinancialData.mutualFunds.equity[1]  // Mid cap
        ],
        gold: indianFinancialData.gold.slice(0, 2),
        fixedDeposits: indianFinancialData.fixedDeposits.slice(0, 1)
      }
    };
  } else if (riskScore >= 40) {
    return {
      level: 'Moderate',
      description: 'Balanced approach with steady growth. Suitable for investors seeking stability with growth.',
      stockAllocation: 50,
      bondAllocation: 35,
      goldAllocation: 15,
      recommendations: {
        stocks: indianFinancialData.stocks.largeCap.slice(0, 3),
        mutualFunds: [
          indianFinancialData.mutualFunds.equity[0],  // Large cap
          indianFinancialData.mutualFunds.debt[0]     // Corporate bond
        ],
        gold: indianFinancialData.gold,
        fixedDeposits: indianFinancialData.fixedDeposits.slice(0, 2)
      }
    };
  } else {
    return {
      level: 'Conservative',
      description: 'Capital preservation with minimal risk. Ideal for risk-averse investors nearing retirement.',
      stockAllocation: 20,
      bondAllocation: 60,
      goldAllocation: 20,
      recommendations: {
        stocks: indianFinancialData.stocks.largeCap.slice(0, 2),
        mutualFunds: [
          indianFinancialData.mutualFunds.debt[0],  // Corporate bond
          indianFinancialData.mutualFunds.debt[2]   // Fixed maturity
        ],
        gold: indianFinancialData.gold,
        fixedDeposits: indianFinancialData.fixedDeposits
      }
    };
  }
};

export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatIndianNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};
