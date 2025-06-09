// src/hooks/useNewsQuery.ts

import { useQuery } from '@tanstack/react-query';
import { fetchAllNewsData } from '@/utils/newsAPI';
import { NewsData } from '@/types/news';

/**
 * A custom hook to fetch all news dashboard data.
 * It uses TanStack Query to handle caching, loading, and error states.
 */
export const useNewsDataQuery = () => {
  return useQuery<NewsData, Error>({
    // The query key uniquely identifies this data.
    // When you invalidate this key, the data will be refetched.
    queryKey: ['newsDashboardData'],
    
    // The function that will be called to fetch the data.
    queryFn: fetchAllNewsData,
    
    // Optional: How long the data is considered "fresh" (in milliseconds).
    // After 5 minutes, it will be refetched in the background on the next load.
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};