
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Filter, TrendingUp } from 'lucide-react';
import GlobalNewsSection from './GlobalNewsSection';
import FinancialNewsSection from './FinancialNewsSection';
import TrendingStocksSection from './TrendingStocksSection';
import SectorOverviewSection from './SectorOverviewSection';
import WatchlistPanel from './WatchlistPanel';
import { useFetchNews } from '@/hooks/useFetchNews';

const NewsDashboard = () => {
  const [activeTab, setActiveTab] = useState('global');
  const { news, isLoading, error } = useFetchNews();

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search news, stocks, or topics..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <TrendingUp size={16} />
              <span>Sort</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="mt-0">
            <GlobalNewsSection news={news?.global || []} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="financial" className="mt-0">
            <FinancialNewsSection news={news?.financial || []} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="trending" className="mt-0">
            <TrendingStocksSection stocks={news?.trendingStocks || []} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="sectors" className="mt-0">
            <SectorOverviewSection sectors={news?.sectors || []} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="w-full lg:w-80 xl:w-96 lg:border-l lg:border-border lg:pl-6">
        <WatchlistPanel />
      </div>
    </div>
  );
};

export default NewsDashboard;
