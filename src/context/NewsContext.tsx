
import { createContext, useContext, ReactNode, useState } from 'react';
import { NewsData, NewsItem, TrendingStock, SectorData } from '@/types/news';
import { useFetchNews } from '@/hooks/useFetchNews';

interface NewsContextType {
  news: NewsData | null;
  isLoading: boolean;
  error: Error | null;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [activeFilter, setActiveFilter] = useState('global');
  const [searchQuery, setSearchQuery] = useState('');
  const { news, isLoading, error } = useFetchNews();

  return (
    <NewsContext.Provider value={{
      news,
      isLoading,
      error,
      activeFilter,
      setActiveFilter,
      searchQuery,
      setSearchQuery
    }}>
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
