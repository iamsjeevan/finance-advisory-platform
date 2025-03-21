
import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { useFetchNews } from '@/hooks/useFetchNews';
import { NewsData } from '@/types/news';
import { fetchNews } from '@/utils/newsAPI';

interface NewsContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  news: NewsData | null;
  refreshNews: () => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('global');
  const [activeFilter, setActiveFilter] = useState('global');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  
  // Use the hook to fetch initial news data
  const { news: initialNews, isLoading: initialLoading, error: initialError } = useFetchNews();
  
  // Set initial news data when it's available
  useState(() => {
    if (initialNews && !newsData) {
      setNewsData(initialNews);
    }
    setIsLoading(initialLoading);
    if (initialError) {
      setError(initialError);
    }
  });

  // Function to manually refresh news data
  const refreshNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const freshNews = await fetchNews();
      setNewsData(freshNews);
      setError(null);
    } catch (err) {
      setError('Failed to refresh news data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <NewsContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        activeFilter,
        setActiveFilter,
        isLoading,
        setIsLoading,
        error,
        setError,
        news: newsData || initialNews,
        refreshNews
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
