
import NewsSearchBar from './NewsSearchBar';
import NewsTabs from './NewsTabs';
import WatchlistPanel from './WatchlistPanel';
import { useNews } from '@/context/NewsContext';
import { useEffect } from 'react';

interface NewsDashboardProps {
  onRefresh?: () => void;
}

const NewsDashboard = ({ onRefresh }: NewsDashboardProps) => {
  const { refreshNews } = useNews();
  
  // Connect the parent's refresh function to the context's refresh
  useEffect(() => {
    if (onRefresh) {
      const handleRefresh = async () => {
        await refreshNews();
      };
      
      // Store the original onRefresh function
      const originalOnRefresh = onRefresh;
      
      // Redefine onRefresh to also call refreshNews
      (window as any).handleNewsRefresh = handleRefresh;
    }
    
    return () => {
      // Clean up
      delete (window as any).handleNewsRefresh;
    };
  }, [onRefresh, refreshNews]);
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <NewsSearchBar />
        <NewsTabs />
      </div>
      
      <div className="w-full lg:w-80 xl:w-96 lg:border-l lg:border-border lg:pl-6">
        <WatchlistPanel />
      </div>
    </div>
  );
};

export default NewsDashboard;
