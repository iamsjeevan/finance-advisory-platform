// src/components/news/NewsDashboard.tsx

import NewsSearchBar from './NewsSearchBar';
import NewsTabs from './NewsTabs';
import WatchlistPanel from './WatchlistPanel';
import { NewsData } from '@/types/news';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface NewsDashboardProps {
  newsData?: NewsData | null;
  isLoading: boolean;
  isError: boolean;
}

const NewsDashboard = ({ newsData, isLoading, isError }: NewsDashboardProps) => {

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load news data. Please try refreshing the page or check your connection.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <NewsSearchBar isLoading={isLoading} />
        <NewsTabs newsData={newsData} isLoading={isLoading} />
      </div>
      
      <div className="w-full lg:w-80 xl:w-96 lg:border-l lg:border-border lg:pl-8">
        <WatchlistPanel />
      </div>
    </div>
  );
};

export default NewsDashboard;