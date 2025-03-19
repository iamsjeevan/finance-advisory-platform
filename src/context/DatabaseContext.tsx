
import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { FinancialData, InvestmentData, ExpenseData, FinancialGoal } from '@/services/financeService';

interface DatabaseContextType {
  saveData: <T>(key: string, data: T) => void;
  getData: <T>(key: string) => T | null;
  saveFinancialData: (data: FinancialData) => void;
  getFinancialData: () => FinancialData | null;
  saveInvestment: (investment: InvestmentData) => void;
  saveExpense: (expense: ExpenseData) => void;
  saveFinancialGoal: (goal: FinancialGoal) => void;
  deleteInvestment: (id: string) => void;
  deleteExpense: (id: string) => void;
  deleteFinancialGoal: (id: string) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // Generic data storage functions
  const saveData = <T,>(key: string, data: T) => {
    if (!user) return;
    const userKey = `${key}_${user.id}`;
    localStorage.setItem(userKey, JSON.stringify(data));
  };

  const getData = <T,>(key: string): T | null => {
    if (!user) return null;
    const userKey = `${key}_${user.id}`;
    const data = localStorage.getItem(userKey);
    return data ? JSON.parse(data) : null;
  };

  // Financial data specific functions
  const saveFinancialData = (data: FinancialData) => {
    if (!user) return;
    localStorage.setItem('financial_data', JSON.stringify(data));
  };

  const getFinancialData = (): FinancialData | null => {
    if (!user) return null;
    const data = localStorage.getItem('financial_data');
    return data ? JSON.parse(data) : null;
  };

  // Investment management
  const saveInvestment = (investment: InvestmentData) => {
    const financialData = getFinancialData();
    if (!financialData) return;

    // If investment exists, update it, otherwise add it
    const existingIndex = financialData.investments.findIndex(inv => inv.id === investment.id);
    
    if (existingIndex >= 0) {
      financialData.investments[existingIndex] = investment;
    } else {
      financialData.investments.push(investment);
    }
    
    saveFinancialData(financialData);
  };

  const deleteInvestment = (id: string) => {
    const financialData = getFinancialData();
    if (!financialData) return;
    
    financialData.investments = financialData.investments.filter(inv => inv.id !== id);
    saveFinancialData(financialData);
  };

  // Expense management
  const saveExpense = (expense: ExpenseData) => {
    const financialData = getFinancialData();
    if (!financialData) return;

    // If expense exists, update it, otherwise add it
    const existingIndex = financialData.expenses.findIndex(exp => exp.id === expense.id);
    
    if (existingIndex >= 0) {
      financialData.expenses[existingIndex] = expense;
    } else {
      financialData.expenses.push(expense);
    }
    
    saveFinancialData(financialData);
  };

  const deleteExpense = (id: string) => {
    const financialData = getFinancialData();
    if (!financialData) return;
    
    financialData.expenses = financialData.expenses.filter(exp => exp.id !== id);
    saveFinancialData(financialData);
  };

  // Financial goal management
  const saveFinancialGoal = (goal: FinancialGoal) => {
    const financialData = getFinancialData();
    if (!financialData) return;

    // If goal exists, update it, otherwise add it
    const existingIndex = financialData.financialGoals.findIndex(g => g.id === goal.id);
    
    if (existingIndex >= 0) {
      financialData.financialGoals[existingIndex] = goal;
    } else {
      financialData.financialGoals.push(goal);
    }
    
    saveFinancialData(financialData);
  };

  const deleteFinancialGoal = (id: string) => {
    const financialData = getFinancialData();
    if (!financialData) return;
    
    financialData.financialGoals = financialData.financialGoals.filter(g => g.id !== id);
    saveFinancialData(financialData);
  };

  return (
    <DatabaseContext.Provider
      value={{
        saveData,
        getData,
        saveFinancialData,
        getFinancialData,
        saveInvestment,
        saveExpense,
        saveFinancialGoal,
        deleteInvestment,
        deleteExpense,
        deleteFinancialGoal
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
