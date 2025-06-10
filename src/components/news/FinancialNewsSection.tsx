
import { NewsItem } from '@/types/news';
import NewsCard from '@/components/NewsCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getSentimentIcon, getSentimentColor } from '@/utils/newsUtils';

interface FinancialNewsSectionProps {
  news: NewsItem[];
  isLoading: boolean;
}

const FinancialNewsSection = ({ news, isLoading }: FinancialNewsSectionProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Indian Financial Market News</h2>
        <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
          🇮🇳 India Focus
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div key={item.id} className="relative">
            <NewsCard
              title={item.title}
              excerpt={item.excerpt}
              category={item.category}
              date={item.date}
              image={item.image}
              url={item.url}
            />
            {item.tickers && item.tickers.length > 0 && (
              <div className="absolute top-4 right-4 flex gap-2">
                {item.tickers.map((ticker) => (
                  <Badge key={ticker} variant="outline" className="bg-background/80 backdrop-blur-sm font-mono">
                    {ticker}
                  </Badge>
                ))}
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge variant="outline" className={`flex items-center gap-1 ${getSentimentColor(item.sentiment)}`}>
                {getSentimentIcon(item.sentiment)}
                <span className="capitalize">{item.sentiment}</span>
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialNewsSection;
