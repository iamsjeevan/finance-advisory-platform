
import { createContext, useState, useContext, ReactNode } from 'react';
import { useFetchNews } from '@/hooks/useFetchNews';
import { NewsData } from '@/types/news';

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
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('global');
  const [activeFilter, setActiveFilter] = useState('global');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use the hook to fetch news data
  const { news, isLoading: newsLoading, error: newsError } = useFetchNews();
  
  // Update the context loading and error states based on the fetched data
  useState(() => {
    setIsLoading(newsLoading);
    if (newsError) {
      setError(newsError);
    }
  });

  return (
    <NewsContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        activeFilter,
        setActiveFilter,
        isLoading: newsLoading, // Use the loading state from useFetchNews
        setIsLoading,
        error: newsError, // Use the error state from useFetchNews
        setError,
        news
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
