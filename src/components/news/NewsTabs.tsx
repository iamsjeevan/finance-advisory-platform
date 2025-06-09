// src/components/news/NewsTabs.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlobalNewsSection from './GlobalNewsSection';
import FinancialNewsSection from './FinancialNewsSection';
import TrendingStocksSection from './TrendingStocksSection';
import SectorOverviewSection from './SectorOverviewSection';
import { NewsData } from '@/types/news';

interface NewsTabsProps {
  newsData?: NewsData | null;
  isLoading: boolean;
}

const NewsTabs = ({ newsData, isLoading }: NewsTabsProps) => {
  return (
    <Tabs defaultValue="financial" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
        <TabsTrigger value="financial">Financial</TabsTrigger>
        <TabsTrigger value="global">Global</TabsTrigger>
        <TabsTrigger value="trending">Trending</TabsTrigger>
        <TabsTrigger value="sectors">Sectors</TabsTrigger>
      </TabsList>
      
      <TabsContent value="financial" className="mt-0">
        <FinancialNewsSection news={newsData?.financial || []} isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="global" className="mt-0">
        <GlobalNewsSection news={newsData?.global || []} isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="trending" className="mt-0">
        <TrendingStocksSection stocks={newsData?.trendingStocks || []} isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="sectors" className="mt-0">
        <SectorOverviewSection sectors={newsData?.sectors || []} isLoading={isLoading} />
      </TabsContent>
    </Tabs>
  );
};

export default NewsTabs;