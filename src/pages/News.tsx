// src/pages/News.tsx

import { useQueryClient } from '@tanstack/react-query';
import MainLayout from '@/layouts/MainLayout';
import NewsDashboard from '@/components/news/NewsDashboard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useNewsDataQuery } from '@/hooks/useNewsQuery';

const News = () => {
  // Get the query client instance to interact with the cache
  const queryClient = useQueryClient();
  
  // Use our new hook to get data, loading, and error status
  const { data: newsData, isLoading, isFetching, isError } = useNewsDataQuery();

  const handleRefresh = () => {
    toast.info("Forcing a refresh of all news data...");
    // Invalidate the query. TanStack Query will automatically refetch it.
    queryClient.invalidateQueries({ queryKey: ['newsDashboardData'] });
  };
  
  // Determine if the refresh button should be disabled
  const isRefreshing = isLoading || isFetching;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Financial News Dashboard</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>
        
        {/* Pass all the necessary data down to the dashboard component */}
        <NewsDashboard 
          newsData={newsData} 
          isLoading={isLoading} 
          isError={isError} 
        />
      </div>
    </MainLayout>
  );
};

export default News;