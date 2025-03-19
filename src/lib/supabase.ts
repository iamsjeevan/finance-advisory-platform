
import { createClient } from '@supabase/supabase-js';

// Public keys that can be exposed in the client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Tables = {
  financial_data: {
    id: string;
    user_id: string;
    monthly_income: number;
    monthly_expenses: number;
    savings: number;
    created_at: string;
    updated_at: string;
  };
  investments: {
    id: string;
    user_id: string;
    financial_data_id: string;
    type: 'stocks' | 'bonds' | 'mutual_funds' | 'real_estate' | 'sip' | 'other';
    name: string;
    amount: number;
    annual_return: number;
    start_date: string;
    created_at: string;
  };
  expenses: {
    id: string;
    user_id: string;
    financial_data_id: string;
    category: 'housing' | 'food' | 'transportation' | 'utilities' | 'healthcare' | 'entertainment' | 'other';
    amount: number;
    recurring: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
    description: string | null;
    created_at: string;
  };
  financial_goals: {
    id: string;
    user_id: string;
    financial_data_id: string;
    name: string;
    target_amount: number;
    current_amount: number;
    target_date: string;
    priority: 'low' | 'medium' | 'high';
    created_at: string;
  };
};
