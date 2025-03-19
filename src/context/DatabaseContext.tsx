
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { FinancialData, InvestmentData, ExpenseData, FinancialGoal } from '@/services/financeService';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

interface DatabaseContextType {
  saveData: <T>(key: string, data: T) => Promise<void>;
  getData: <T>(key: string) => Promise<T | null>;
  saveFinancialData: (data: FinancialData) => Promise<void>;
  getFinancialData: () => Promise<FinancialData | null>;
  saveInvestment: (investment: InvestmentData) => Promise<void>;
  saveExpense: (expense: ExpenseData) => Promise<void>;
  saveFinancialGoal: (goal: FinancialGoal) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  deleteFinancialGoal: (id: string) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Initialize financial data when user changes
  useEffect(() => {
    const initializeUserData = async () => {
      if (!user) return;
      
      // Check if financial data exists for the user
      const financialData = await getFinancialData();
      
      if (!financialData) {
        // Create initial financial data record
        const { data, error } = await supabase
          .from('financial_data')
          .insert({
            user_id: user.id,
            monthly_income: 0,
            monthly_expenses: 0,
            savings: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select('*')
          .single();
          
        if (error) {
          console.error('Error creating initial financial data:', error);
        } else {
          console.log('Initialized financial data for user:', user.id);
        }
      }
    };
    
    initializeUserData();
  }, [user]);

  // Generic data storage functions
  const saveData = async <T,>(key: string, data: T) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_data')
        .upsert({
          user_id: user.id,
          key: key,
          data: data,
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
    } catch (error: any) {
      console.error(`Error saving data for key ${key}:`, error);
      toast({
        title: "Error Saving Data",
        description: "There was a problem saving your data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getData = async <T,>(key: string): Promise<T | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('data')
        .eq('user_id', user.id)
        .eq('key', key)
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          // Not found, return null
          return null;
        }
        throw error;
      }
      
      return data?.data as T || null;
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      return null;
    }
  };

  // Financial data specific functions
  const saveFinancialData = async (data: Partial<FinancialData>) => {
    if (!user) return;
    
    try {
      // Get existing financial data
      const { data: existingData, error: fetchError } = await supabase
        .from('financial_data')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      // Update or insert financial data
      const { error } = await supabase
        .from('financial_data')
        .upsert({
          id: existingData?.id,
          user_id: user.id,
          monthly_income: data.monthlyIncome || 0,
          monthly_expenses: data.monthlyExpenses || 0,
          savings: data.savings || 0,
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
    } catch (error: any) {
      console.error("Error saving financial data:", error);
      toast({
        title: "Error Saving Data",
        description: "There was a problem saving your financial data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getFinancialData = async (): Promise<FinancialData | null> => {
    if (!user) return null;
    
    try {
      // Get financial data
      const { data: financialData, error: financialError } = await supabase
        .from('financial_data')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (financialError && financialError.code !== 'PGRST116') {
        throw financialError;
      }
      
      if (!financialData) {
        return null;
      }
      
      // Get investments
      const { data: investments, error: investmentsError } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id);
        
      if (investmentsError) throw investmentsError;
      
      // Get expenses
      const { data: expenses, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id);
        
      if (expensesError) throw expensesError;
      
      // Get financial goals
      const { data: goals, error: goalsError } = await supabase
        .from('financial_goals')
        .select('*')
        .eq('user_id', user.id);
        
      if (goalsError) throw goalsError;
      
      // Format to match our FinancialData interface
      const result: FinancialData = {
        userId: user.id,
        monthlyIncome: financialData.monthly_income,
        monthlyExpenses: financialData.monthly_expenses,
        savings: financialData.savings,
        investments: investments.map(inv => ({
          id: inv.id,
          type: inv.type,
          name: inv.name,
          amount: inv.amount,
          annualReturn: inv.annual_return,
          startDate: inv.start_date
        })),
        expenses: expenses.map(exp => ({
          id: exp.id,
          category: exp.category,
          amount: exp.amount,
          recurring: exp.recurring,
          frequency: exp.frequency,
          description: exp.description
        })),
        financialGoals: goals.map(goal => ({
          id: goal.id,
          name: goal.name,
          targetAmount: goal.target_amount,
          currentAmount: goal.current_amount,
          targetDate: goal.target_date,
          priority: goal.priority
        }))
      };
      
      return result;
    } catch (error) {
      console.error("Error retrieving financial data:", error);
      return null;
    }
  };

  // Investment management
  const saveInvestment = async (investment: InvestmentData) => {
    if (!user) return;
    
    try {
      // First, get financial data ID
      const { data: financialData, error: financialError } = await supabase
        .from('financial_data')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      if (financialError) throw financialError;
      
      // Prepare investment data
      const investmentData = {
        id: investment.id,
        user_id: user.id,
        financial_data_id: financialData.id,
        type: investment.type,
        name: investment.name,
        amount: investment.amount,
        annual_return: investment.annualReturn,
        start_date: investment.startDate,
        created_at: new Date().toISOString()
      };
      
      // Upsert the investment
      const { error } = await supabase
        .from('investments')
        .upsert(investmentData);
        
      if (error) throw error;
      
      toast({
        title: "Investment Saved",
        description: "Your investment has been successfully saved.",
      });
    } catch (error: any) {
      console.error("Error saving investment:", error);
      toast({
        title: "Error Saving Investment",
        description: "There was a problem saving your investment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteInvestment = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Investment Deleted",
        description: "Your investment has been successfully deleted.",
      });
    } catch (error: any) {
      console.error("Error deleting investment:", error);
      toast({
        title: "Error Deleting Investment",
        description: "There was a problem deleting your investment. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Expense management
  const saveExpense = async (expense: ExpenseData) => {
    if (!user) return;
    
    try {
      // First, get financial data ID
      const { data: financialData, error: financialError } = await supabase
        .from('financial_data')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      if (financialError) throw financialError;
      
      // Prepare expense data
      const expenseData = {
        id: expense.id,
        user_id: user.id,
        financial_data_id: financialData.id,
        category: expense.category,
        amount: expense.amount,
        recurring: expense.recurring,
        frequency: expense.frequency,
        description: expense.description,
        created_at: new Date().toISOString()
      };
      
      // Upsert the expense
      const { error } = await supabase
        .from('expenses')
        .upsert(expenseData);
        
      if (error) throw error;
      
      toast({
        title: "Expense Saved",
        description: "Your expense has been successfully saved.",
      });
    } catch (error: any) {
      console.error("Error saving expense:", error);
      toast({
        title: "Error Saving Expense",
        description: "There was a problem saving your expense. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteExpense = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Expense Deleted",
        description: "Your expense has been successfully deleted.",
      });
    } catch (error: any) {
      console.error("Error deleting expense:", error);
      toast({
        title: "Error Deleting Expense",
        description: "There was a problem deleting your expense. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Financial goal management
  const saveFinancialGoal = async (goal: FinancialGoal) => {
    if (!user) return;
    
    try {
      // First, get financial data ID
      const { data: financialData, error: financialError } = await supabase
        .from('financial_data')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      if (financialError) throw financialError;
      
      // Prepare goal data
      const goalData = {
        id: goal.id,
        user_id: user.id,
        financial_data_id: financialData.id,
        name: goal.name,
        target_amount: goal.targetAmount,
        current_amount: goal.currentAmount,
        target_date: goal.targetDate,
        priority: goal.priority,
        created_at: new Date().toISOString()
      };
      
      // Upsert the goal
      const { error } = await supabase
        .from('financial_goals')
        .upsert(goalData);
        
      if (error) throw error;
      
      toast({
        title: "Financial Goal Saved",
        description: "Your financial goal has been successfully saved.",
      });
    } catch (error: any) {
      console.error("Error saving financial goal:", error);
      toast({
        title: "Error Saving Financial Goal",
        description: "There was a problem saving your financial goal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteFinancialGoal = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('financial_goals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Financial Goal Deleted",
        description: "Your financial goal has been successfully deleted.",
      });
    } catch (error: any) {
      console.error("Error deleting financial goal:", error);
      toast({
        title: "Error Deleting Financial Goal",
        description: "There was a problem deleting your financial goal. Please try again.",
        variant: "destructive"
      });
    }
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
