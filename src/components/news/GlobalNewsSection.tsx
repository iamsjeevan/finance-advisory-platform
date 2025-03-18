
import { NewsItem } from '@/types/news';
import NewsCard from '@/components/NewsCard';
import { Skeleton } from '@/components/ui/skeleton';

interface GlobalNewsSectionProps {
  news: NewsItem[];
  isLoading: boolean;
}

const GlobalNewsSection = ({ news, isLoading }: GlobalNewsSectionProps) => {
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
      <h2 className="text-xl font-semibold">Global Economic News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            excerpt={item.excerpt}
            category={item.category}
            date={item.date}
            image={item.image}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalNewsSection;
