// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kcrvytvtygpoxcbetlsg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjcnZ5dHZ0eWdwb3hjYmV0bHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzOTUzMjQsImV4cCI6MjA1Nzk3MTMyNH0.QtidZkNZOVblnJ3xRPMSvrjT9iTRmuU8RpstsWkRnYw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);