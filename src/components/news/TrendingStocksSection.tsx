
import { TrendingStock } from '@/types/news';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import StockChart from '@/components/StockChart';
import { getSentimentIcon, getSentimentClass, formatIndianCurrency } from '@/utils/newsUtils';

interface TrendingStocksSectionProps {
  stocks: TrendingStock[];
  isLoading: boolean;
}

const TrendingStocksSection = ({ stocks, isLoading }: TrendingStocksSectionProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-64" />
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Trending Indian Stocks
        </h2>
        <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20 font-semibold">
          🚀 NSE/BSE Top Movers
        </Badge>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
        <StockChart />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {stocks.slice(0, 5).map((stock) => (
          <Card key={stock.symbol} className="overflow-hidden border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-200 group">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-xl text-primary">{stock.symbol}</h3>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">{stock.name}</span>
                    <Badge variant="outline" className="text-xs font-medium">NSE</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-mono font-bold text-xl ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </span>
                    <div className="flex items-center text-sm bg-muted/50 px-3 py-1 rounded-full">
                      {getSentimentIcon(stock.sentiment)}
                      <span className={`ml-2 font-semibold ${getSentimentClass(stock.sentiment)}`}>
                        {stock.sentiment.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50/50 to-green-50/50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border border-blue-200/30">
                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  Recent Market Headlines
                </h4>
                <ul className="space-y-2">
                  {stock.headlines.map((headline, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-3 p-2 bg-background/50 rounded border-l-2 border-l-orange-300">
                      <span className="text-orange-500 mt-1 text-xs">▪</span>
                      <span className="leading-relaxed">{headline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocksSection;
