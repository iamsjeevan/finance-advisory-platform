
import { createClient } from '@supabase/supabase-js';

// Use the values directly from the Supabase project
const supabaseUrl = "https://kcrvytvtygpoxcbetlsg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjcnZ5dHZ0eWdwb3hjYmV0bHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzOTUzMjQsImV4cCI6MjA1Nzk3MTMyNH0.QtidZkNZOVblnJ3xRPMSvrjT9iTRmuU8RpstsWkRnYw";

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
