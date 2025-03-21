
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import NewsDashboard from '@/components/news/NewsDashboard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useNews } from '@/context/NewsContext';

const News = () => {
  const { isLoading, refreshNews } = useNews();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    toast.info("Refreshing news data...");
    await refreshNews();
    setRefreshing(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Financial News Dashboard</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading || refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </Button>
        </div>
        <NewsDashboard />
      </div>
    </MainLayout>
  );
};

export default News;
