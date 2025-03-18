
import { NewsItem } from '@/types/news';
import NewsCard from '@/components/NewsCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

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

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'bearish':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Financial Market News</h2>
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
                  <Badge key={ticker} variant="outline" className="bg-background/80 backdrop-blur-sm">
                    ${ticker}
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
