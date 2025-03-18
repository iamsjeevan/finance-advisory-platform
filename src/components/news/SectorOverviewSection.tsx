
import { SectorData } from '@/types/news';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface SectorOverviewSectionProps {
  sectors: SectorData[];
  isLoading: boolean;
}

const SectorOverviewSection = ({ sectors, isLoading }: SectorOverviewSectionProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'bearish':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Sector Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectors.map((sector) => (
          <Card key={sector.name} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{sector.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${sector.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {sector.change >= 0 ? '+' : ''}{sector.change}%
                  </span>
                  {getSentimentIcon(sector.sentiment)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <h4 className="text-sm font-medium mb-3">Top Performing Stocks</h4>
              <div className="space-y-3">
                {sector.topStocks.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stock.symbol}</span>
                      <span className="text-xs text-muted-foreground">{stock.name}</span>
                    </div>
                    <span className={`font-mono text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SectorOverviewSection;
