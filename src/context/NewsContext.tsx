
import { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
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
  searchNews: (query: string) => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('global');
  const [activeFilter, setActiveFilter] = useState('global');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  
  // Function to fetch news with a specific query
  const searchNews = useCallback(async (query: string = 'technology') => {
    setIsLoading(true);
    setError(null);
    try {
      const freshNews = await fetchNews(query);
      setNewsData(freshNews);
    } catch (err) {
      setError('Failed to fetch news data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to manually refresh news data
  const refreshNews = useCallback(async () => {
    await searchNews(searchQuery || 'technology');
  }, [searchNews, searchQuery]);

  // Load initial news data
  useEffect(() => {
    searchNews('technology');
  }, [searchNews]);

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
        news: newsData,
        refreshNews,
        searchNews
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
