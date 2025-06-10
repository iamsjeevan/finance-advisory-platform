
// src/utils/newsAPI.ts

import { toast } from "sonner";
import { NewsData, NewsItem, SentimentType } from "@/types/news";

// Finnhub API key
const FINNHUB_API_KEY = "cvh31uhr01qi76d68rv0cvh31uhr01qi76d68rvg";
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

// Helper to process Finnhub articles into our NewsItem format
const processFinnhubArticles = (articles: any[], category: string): NewsItem[] => {
  if (!articles || !Array.isArray(articles)) return [];
  
  return articles.slice(0, 10).map((article, index): NewsItem => ({
    id: article.id?.toString() || `finnhub-${category}-${index}`,
    title: article.headline || 'No headline available',
    excerpt: article.summary || article.headline?.substring(0, 150) + '...' || 'No description available.',
    category: category,
    date: new Date(article.datetime * 1000).toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    source: article.source || 'Finnhub',
    image: article.image || '/og-image.png',
    url: article.url || '#',
    sentiment: getRandomSentiment(),
    tickers: extractIndianTickers(article.headline || ''),
  }));
};

// Extract Indian stock tickers from headlines
const extractIndianTickers = (text: string): string[] => {
  const indianStocks = [
    'TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM', 'RELIANCE', 'HDFCBANK', 
    'ICICIBANK', 'SBIN', 'KOTAKBANK', 'AXISBANK', 'BHARTIARTL', 'ITC',
    'HINDUNILVR', 'LT', 'ULTRACEMCO', 'MARUTI', 'ASIANPAINT', 'NESTLEIND',
    'BAJFINANCE', 'POWERGRID', 'NTPC', 'ONGC', 'COALINDIA'
  ];
  
  const matches = text.toUpperCase().match(/\b([A-Z]{2,12})\b/g) || [];
  return matches.filter(ticker => indianStocks.includes(ticker)).slice(0, 3);
};

// Fetch general market news from Finnhub
const fetchFinnhubGeneralNews = async (): Promise<NewsItem[]> => {
  try {
    const url = `${FINNHUB_BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return processFinnhubArticles(data, "Global Economy");
  } catch (error) {
    console.error('Error fetching Finnhub general news:', error);
    return getIndianMockNewsData().global;
  }
};

// Fetch financial/forex news from Finnhub
const fetchFinnhubFinancialNews = async (): Promise<NewsItem[]> => {
  try {
    const url = `${FINNHUB_BASE_URL}/news?category=forex&token=${FINNHUB_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return processFinnhubArticles(data, "Financial Markets");
  } catch (error) {
    console.error('Error fetching Finnhub financial news:', error);
    return getIndianMockNewsData().financial;
  }
};

// Main function to aggregate all news data
export const fetchAllNewsData = async (): Promise<NewsData> => {
  try {
    const [global, financial] = await Promise.all([
      fetchFinnhubGeneralNews(),
      fetchFinnhubFinancialNews()
    ]);

    const { trendingStocks, sectors } = getIndianMockStocksAndSectors();
    
    return { global, financial, trendingStocks, sectors };
  } catch (error: any) {
    console.error('Error fetching news data:', error);
    toast.error("Failed to fetch news", { description: "Using demo data instead." });
    return getIndianMockNewsData();
  }
};

// Helper functions
function getRandomSentiment(): SentimentType {
  const sentiments: SentimentType[] = ['bullish', 'bearish', 'neutral'];
  return sentiments[Math.floor(Math.random() * sentiments.length)];
}

function getIndianMockStocksAndSectors() {
  return {
    trendingStocks: [
      { 
        symbol: 'TCS', 
        name: 'Tata Consultancy Services', 
        change: 2.45, 
        sentiment: 'bullish' as SentimentType, 
        headlines: ['TCS Reports Strong Q3 Results', 'TCS Wins Major Banking Deal in Europe'] 
      },
      { 
        symbol: 'RELIANCE', 
        name: 'Reliance Industries', 
        change: -1.23, 
        sentiment: 'bearish' as SentimentType, 
        headlines: ['Reliance Retail Expansion Plans', 'Oil Price Impact on Reliance'] 
      },
      { 
        symbol: 'INFY', 
        name: 'Infosys Limited', 
        change: 3.12, 
        sentiment: 'bullish' as SentimentType, 
        headlines: ['Infosys AI Platform Launch', 'Strong Digital Transformation Growth'] 
      },
      { 
        symbol: 'HDFCBANK', 
        name: 'HDFC Bank Limited', 
        change: 0.87, 
        sentiment: 'neutral' as SentimentType, 
        headlines: ['HDFC Bank Merger Updates', 'Digital Banking Initiatives'] 
      },
      { 
        symbol: 'BHARTIARTL', 
        name: 'Bharti Airtel Limited', 
        change: 1.95, 
        sentiment: 'bullish' as SentimentType, 
        headlines: ['5G Rollout Acceleration', 'Africa Operations Growth'] 
      }
    ],
    sectors: [
      { 
        name: 'Information Technology', 
        change: 2.8, 
        sentiment: 'bullish' as SentimentType, 
        topStocks: [
          { symbol: 'TCS', name: 'Tata Consultancy Services', change: 2.45 },
          { symbol: 'INFY', name: 'Infosys Limited', change: 3.12 }
        ]
      },
      { 
        name: 'Banking & Financial Services', 
        change: 1.2, 
        sentiment: 'neutral' as SentimentType, 
        topStocks: [
          { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', change: 0.87 },
          { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', change: 1.45 }
        ]
      },
      { 
        name: 'Oil & Gas', 
        change: -0.65, 
        sentiment: 'bearish' as SentimentType, 
        topStocks: [
          { symbol: 'RELIANCE', name: 'Reliance Industries', change: -1.23 },
          { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', change: -0.89 }
        ]
      },
      { 
        name: 'Telecommunications', 
        change: 1.8, 
        sentiment: 'bullish' as SentimentType, 
        topStocks: [
          { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', change: 1.95 },
          { symbol: 'IDEA', name: 'Vodafone Idea Limited', change: 2.34 }
        ]
      }
    ]
  };
}

function getIndianMockNewsData(): NewsData {
  const mockStocksAndSectors = getIndianMockStocksAndSectors();
  
  return {
    global: [
      { 
        id: 'mock-global-1', 
        title: 'RBI Keeps Repo Rate Unchanged at 6.5%', 
        excerpt: 'Reserve Bank of India maintains accommodative stance amid inflation concerns and global economic uncertainty.', 
        category: 'Economy', 
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Economic Times', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'neutral',
        tickers: ['RBI']
      },
      { 
        id: 'mock-global-2', 
        title: 'India GDP Growth Expected at 6.3% for FY24', 
        excerpt: 'Government economic survey projects steady growth driven by domestic consumption and investment recovery.', 
        category: 'Economy', 
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Business Standard', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish'
      },
      { 
        id: 'mock-global-3', 
        title: 'Monsoon Forecast Positive for Agricultural Sector', 
        excerpt: 'IMD predicts normal monsoon, boosting hopes for agricultural output and rural demand recovery.', 
        category: 'Agriculture', 
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Hindu BusinessLine', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish'
      },
      { 
        id: 'mock-global-4', 
        title: 'Foreign Portfolio Investment Flows Turn Positive', 
        excerpt: 'FPIs invest ₹15,000 crores in Indian markets this month after three months of outflows.', 
        category: 'Investment', 
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Mint', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish'
      }
    ],
    financial: [
      { 
        id: 'mock-financial-1', 
        title: 'Sensex Hits New All-Time High Above 73,000', 
        excerpt: 'BSE Sensex reaches record levels driven by strong earnings and positive global sentiment.', 
        category: 'Stock Market', 
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'CNBC TV18', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish',
        tickers: ['SENSEX', 'TCS', 'RELIANCE']
      },
      { 
        id: 'mock-financial-2', 
        title: 'TCS Announces ₹18,000 Crore Share Buyback', 
        excerpt: 'India\'s largest IT services company announces significant shareholder return program.', 
        category: 'Corporate Action', 
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Financial Express', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish',
        tickers: ['TCS']
      },
      { 
        id: 'mock-financial-3', 
        title: 'HDFC Bank-HDFC Merger Creates Banking Giant', 
        excerpt: 'Successful merger creates India\'s largest private sector bank with enhanced market position.', 
        category: 'Banking', 
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Money Control', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish',
        tickers: ['HDFCBANK']
      },
      { 
        id: 'mock-financial-4', 
        title: 'Reliance New Energy Ventures Gets ₹50,000 Crore Investment', 
        excerpt: 'Major funding round for renewable energy initiatives as India pushes green transition.', 
        category: 'Energy', 
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Bloomberg Quint', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish',
        tickers: ['RELIANCE']
      }
    ],
    trendingStocks: mockStocksAndSectors.trendingStocks,
    sectors: mockStocksAndSectors.sectors
  };
}
