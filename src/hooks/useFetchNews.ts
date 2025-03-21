
import { useState, useEffect } from 'react';
import { NewsData } from '@/types/news';
import { fetchNews } from '@/utils/newsAPI';

export const useFetchNews = () => {
  const [news, setNews] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch real news data from NewsAPI.ai
        const newsData = await fetchNews();
        setNews(newsData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch news data');
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return { news, isLoading, error };
};
