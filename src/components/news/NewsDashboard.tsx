
import NewsSearchBar from './NewsSearchBar';
import NewsTabs from './NewsTabs';
import WatchlistPanel from './WatchlistPanel';
import { NewsProvider } from '@/context/NewsContext';

const NewsDashboard = () => {
  return (
    <NewsProvider>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <NewsSearchBar />
          <NewsTabs />
        </div>
        
        <div className="w-full lg:w-80 xl:w-96 lg:border-l lg:border-border lg:pl-6">
          <WatchlistPanel />
        </div>
      </div>
    </NewsProvider>
  );
};

export default NewsDashboard;
