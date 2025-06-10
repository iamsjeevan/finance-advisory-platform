
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
        <h2 className="text-xl font-semibold">Trending Indian Stocks</h2>
        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
          🚀 NSE/BSE Trending
        </Badge>
      </div>
      
      <StockChart />
      
      <div className="grid grid-cols-1 gap-4">
        {stocks.slice(0, 5).map((stock) => (
          <Card key={stock.symbol} className="overflow-hidden border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-lg">{stock.symbol}</h3>
                    <span className="text-sm text-muted-foreground">{stock.name}</span>
                    <Badge variant="outline" className="text-xs">NSE</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-mono font-bold text-lg ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </span>
                    <div className="flex items-center text-sm">
                      {getSentimentIcon(stock.sentiment)}
                      <span className={`ml-1 font-medium ${getSentimentClass(stock.sentiment)}`}>
                        {stock.sentiment.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2 text-sm">📈 Recent Market Headlines</h4>
                <ul className="space-y-1">
                  {stock.headlines.map((headline, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{headline}</span>
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
