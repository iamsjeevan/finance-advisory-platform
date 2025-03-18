
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlobalNewsSection from './GlobalNewsSection';
import FinancialNewsSection from './FinancialNewsSection';
import TrendingStocksSection from './TrendingStocksSection';
import SectorOverviewSection from './SectorOverviewSection';
import { useNews } from '@/context/NewsContext';

const NewsTabs = () => {
  const { news, isLoading, activeFilter, setActiveFilter } = useNews();

  return (
    <Tabs defaultValue={activeFilter} onValueChange={setActiveFilter} className="w-full">
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
  );
};

export default NewsTabs;
