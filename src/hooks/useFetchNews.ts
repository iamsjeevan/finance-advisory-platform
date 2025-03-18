
import { useState, useEffect } from 'react';
import { NewsData, NewsItem, TrendingStock, SectorData } from '@/types/news';

// Mock data for demonstration
const MOCK_NEWS_DATA: NewsData = {
  global: [
    {
      id: '1',
      title: 'Fed Signals Potential Rate Cuts as Inflation Cools',
      excerpt: 'The Federal Reserve has indicated it may begin cutting interest rates soon as inflation shows signs of moderating.',
      category: 'Economy',
      date: 'Aug 28, 2023',
      source: 'Financial Times',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1470',
      url: '#',
      sentiment: 'bullish'
    },
    {
      id: '2',
      title: 'Global Supply Chain Issues Easing, Report Suggests',
      excerpt: 'Recent data indicates global supply chain bottlenecks are easing, potentially relieving inflation pressures.',
      category: 'Supply Chain',
      date: 'Aug 27, 2023',
      source: 'Bloomberg',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1470',
      url: '#',
      sentiment: 'bullish'
    },
    {
      id: '3',
      title: 'China Announces New Economic Stimulus Package',
      excerpt: 'Chinese authorities unveiled a new economic stimulus package aimed at boosting growth amid property sector challenges.',
      category: 'Global Economy',
      date: 'Aug 26, 2023',
      source: 'Reuters',
      image: 'https://images.unsplash.com/photo-1623674383785-1eb8c444f2f6?auto=format&fit=crop&q=80&w=1470',
      url: '#',
      sentiment: 'neutral'
    },
    {
      id: '4',
      title: 'EU Proposes New Trade Agreement with Southeast Asian Nations',
      excerpt: 'The European Union has proposed a comprehensive trade agreement with ASEAN countries to strengthen economic ties.',
      category: 'Trade',
      date: 'Aug 25, 2023',
      source: 'The Economist',
      image: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?auto=format&fit=crop&q=80&w=1470',
      url: '#',
      sentiment: 'bullish'
    },
  ],
  financial: [
    {
      id: '5',
      title: 'Tesla Announces Major Expansion in Battery Production',
      excerpt: 'Tesla revealed plans to significantly increase battery production capacity to meet growing electric vehicle demand.',
      category: 'Stocks',
      date: 'Aug 28, 2023',
      source: 'CNBC',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1470',
      url: '#',
      sentiment: 'bullish',
      tickers: ['TSLA']
    },
    {
      id: '6',
      title: 'Apple Supplier Reports Production Delays',
      excerpt: 'A key Apple supplier has reported production delays that could impact iPhone availability in the coming quarters.',
      category: 'Stocks',
      date: 'Aug 27, 2023',
      source: 'Wall Street Journal',
      image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1470',
      url: '#',
      sentiment: 'bearish',
      tickers: ['AAPL']
    },
    {
      id: '7',
      title: 'Bitcoin Surges Past $50,000 on ETF Approval Rumors',
      excerpt: 'Bitcoin has surged past $50,000 amid rumors that the SEC may approve a spot Bitcoin ETF in the coming weeks.',
      category: 'Crypto',
      date: 'Aug 26, 2023',
      source: 'CoinDesk',
      image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1470',
      url: '#',
      sentiment: 'bullish',
      tickers: ['BTC']
    },
    {
      id: '8',
      title: 'Oil Prices Drop as OPEC+ Considers Production Increase',
      excerpt: 'Oil prices fell sharply as OPEC+ members discuss a potential increase in production quotas at their upcoming meeting.',
      category: 'Commodities',
      date: 'Aug 25, 2023',
      source: 'Bloomberg',
      image: 'https://images.unsplash.com/photo-1582486225644-4f359760dc8b?auto=format&fit=crop&q=80&w=1470',
      url: '#',
      sentiment: 'bearish',
      tickers: ['CL']
    },
  ],
  trendingStocks: [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', change: 4.28, sentiment: 'bullish', headlines: ['NVIDIA Showcases New AI Chips', 'Analysts Raise NVIDIA Price Targets'] },
    { symbol: 'AAPL', name: 'Apple Inc.', change: -1.53, sentiment: 'bearish', headlines: ['Apple Supplier Reports Production Delays', 'iPhone 15 Demand Concerns Emerge'] },
    { symbol: 'TSLA', name: 'Tesla Inc.', change: 2.76, sentiment: 'bullish', headlines: ['Tesla Announces Battery Production Expansion', 'Tesla Deliveries Expected to Beat Estimates'] },
    { symbol: 'META', name: 'Meta Platforms Inc.', change: 1.15, sentiment: 'bullish', headlines: ['Meta Reports Strong Ad Revenue Growth', 'Horizon Worlds Sees User Increase'] },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', change: 0.25, sentiment: 'neutral', headlines: ['Amazon Warehouse Expansion', 'AWS Growth Slows Slightly'] },
    { symbol: 'MSFT', name: 'Microsoft Corp.', change: 0.87, sentiment: 'bullish', headlines: ['Microsoft Azure Growth Exceeds Expectations', 'New Windows Features Announced'] },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', change: -0.32, sentiment: 'neutral', headlines: ['Google Ad Revenue Steady', 'Antitrust Concerns Persist'] },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', change: -1.28, sentiment: 'bearish', headlines: ['Banking Sector Faces Pressure', 'Interest Rate Uncertainty Impacts Outlook'] },
    { symbol: 'DIS', name: 'Walt Disney Co.', change: 3.42, sentiment: 'bullish', headlines: ['Disney+ Subscriber Growth Accelerates', 'Parks Revenue Sets New Record'] },
    { symbol: 'NFLX', name: 'Netflix Inc.', change: 1.75, sentiment: 'bullish', headlines: ['Netflix Ad Tier Gaining Traction', 'Original Content Driving Engagement'] },
  ],
  sectors: [
    {
      name: 'Technology',
      change: 2.3,
      sentiment: 'bullish',
      topStocks: [
        { symbol: 'NVDA', name: 'NVIDIA Corporation', change: 4.28 },
        { symbol: 'AAPL', name: 'Apple Inc.', change: -1.53 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', change: 0.87 }
      ]
    },
    {
      name: 'Healthcare',
      change: 0.8,
      sentiment: 'neutral',
      topStocks: [
        { symbol: 'JNJ', name: 'Johnson & Johnson', change: 0.45 },
        { symbol: 'PFE', name: 'Pfizer Inc.', change: -0.75 },
        { symbol: 'UNH', name: 'UnitedHealth Group', change: 1.28 }
      ]
    },
    {
      name: 'Energy',
      change: -1.5,
      sentiment: 'bearish',
      topStocks: [
        { symbol: 'XOM', name: 'Exxon Mobil Corp.', change: -1.63 },
        { symbol: 'CVX', name: 'Chevron Corporation', change: -2.15 },
        { symbol: 'COP', name: 'ConocoPhillips', change: -0.89 }
      ]
    },
    {
      name: 'Finance',
      change: -0.7,
      sentiment: 'neutral',
      topStocks: [
        { symbol: 'JPM', name: 'JPMorgan Chase & Co.', change: -1.28 },
        { symbol: 'BAC', name: 'Bank of America Corp.', change: -0.95 },
        { symbol: 'GS', name: 'Goldman Sachs Group', change: 0.67 }
      ]
    },
  ]
};

export const useFetchNews = () => {
  const [news, setNews] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // In a real implementation, you would fetch data from an API here
        // For now, we'll use mock data
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
          setNews(MOCK_NEWS_DATA);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch news data');
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return { news, isLoading, error };
};
