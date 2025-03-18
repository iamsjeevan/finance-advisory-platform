
import { TrendingStock } from '@/types/news';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import StockChart from '@/components/StockChart';
import { getSentimentIcon, getSentimentClass } from '@/utils/newsUtils';

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
      <h2 className="text-xl font-semibold">Trending Stocks</h2>
      
      <StockChart />
      
      <div className="grid grid-cols-1 gap-4">
        {stocks.slice(0, 5).map((stock) => (
          <Card key={stock.symbol} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{stock.symbol}</h3>
                    <span className="text-sm text-muted-foreground">{stock.name}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className={`font-mono font-medium ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </span>
                    <div className="flex items-center ml-3 text-sm">
                      {getSentimentIcon(stock.sentiment)}
                      <span className={`ml-1 ${getSentimentClass(stock.sentiment)}`}>
                        {stock.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 text-sm">
                <h4 className="font-medium mb-1">Recent Headlines</h4>
                <ul className="space-y-1">
                  {stock.headlines.map((headline, index) => (
                    <li key={index} className="text-muted-foreground">• {headline}</li>
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
