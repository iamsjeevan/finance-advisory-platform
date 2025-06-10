
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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Indian Market Sectors
        </h2>
        <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/20 font-semibold">
          📊 Sector Performance
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectors.map((sector) => (
          <Card key={sector.name} className="overflow-hidden border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-4 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-3">
                  <span className="font-bold">{sector.name}</span>
                  <Badge variant="outline" className="text-xs font-medium bg-background/80">NSE</Badge>
                </CardTitle>
                <div className="flex items-center gap-3">
                  <span className={`font-bold text-lg ${sector.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {sector.change >= 0 ? '+' : ''}{sector.change}%
                  </span>
                  <div className="p-1 rounded-full bg-background/50">
                    {getSentimentIcon(sector.sentiment)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4 border">
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  Top Performing Stocks
                </h4>
                <div className="space-y-3">
                  {sector.topStocks.map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center p-3 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <span className="font-bold font-mono text-primary">{stock.symbol}</span>
                        <span className="text-xs text-muted-foreground max-w-[120px] truncate bg-muted px-2 py-1 rounded">{stock.name}</span>
                      </div>
                      <span className={`font-mono text-sm font-bold px-2 py-1 rounded ${stock.change >= 0 ? 'text-green-600 bg-green-50 dark:bg-green-950/20' : 'text-red-600 bg-red-50 dark:bg-red-950/20'}`}>
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
