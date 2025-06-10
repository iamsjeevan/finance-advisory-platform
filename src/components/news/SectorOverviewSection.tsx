
import { SectorData } from '@/types/news';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getSentimentIcon } from '@/utils/newsUtils';

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Indian Market Sectors</h2>
        <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/20">
          📊 Sector Analysis
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectors.map((sector) => (
          <Card key={sector.name} className="overflow-hidden border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  {sector.name}
                  <Badge variant="outline" className="text-xs">NSE</Badge>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${sector.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {sector.change >= 0 ? '+' : ''}{sector.change}%
                  </span>
                  {getSentimentIcon(sector.sentiment)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  🏆 Top Performing Stocks
                </h4>
                <div className="space-y-3">
                  {sector.topStocks.map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center p-2 bg-background rounded border">
                      <div className="flex items-center gap-2">
                        <span className="font-medium font-mono">{stock.symbol}</span>
                        <span className="text-xs text-muted-foreground max-w-[120px] truncate">{stock.name}</span>
                      </div>
                      <span className={`font-mono text-sm font-medium ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SectorOverviewSection;
