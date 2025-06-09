// src/utils/newsAPI.ts

import { toast } from "sonner";
import { NewsData, NewsItem, SentimentType } from "@/types/news";

// 1. Securely access the API key from environment variables
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// 2. Add a check to ensure the key is loaded correctly.
if (!NEWS_API_KEY) {
  const errorMessage = "CRITICAL: News API Key is missing. Please ensure VITE_NEWS_API_KEY is set in your .env.local file and that you have restarted the development server.";
  console.error(errorMessage);
  toast.error("Configuration Error", { description: "The News API key is not configured." });
}

const API_BASE_URL = "https://newsapi.org/v2";

// Helper to process raw articles into our NewsItem format
const processArticles = (articles: any[], category: string): NewsItem[] => {
  if (!articles) return [];
  return articles.map((article, index): NewsItem => ({
    id: article.url || `news-${category}-${index}`,
    title: article.title,
    excerpt: article.description || article.content?.substring(0, 150) + '...' || 'No description available.',
    category: category,
    date: new Date(article.publishedAt).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    source: article.source.name,
    image: article.urlToImage || '/og-image.png',
    url: article.url,
    sentiment: getRandomSentiment(),
    tickers: article.title.match(/\b([A-Z]{1,5})\b/g) || [],
  }));
};

// --- Targeted API Fetching Functions ---

const fetchGlobalNews = async (): Promise<NewsItem[]> => {
  if (!NEWS_API_KEY) return getMockNewsData().global; // Return mock data if key is missing
  const query = "economy OR inflation OR gdp OR 'central bank' OR geopolitical";
  // 3. Ensure the FULL URL is used for the fetch call
  const url = `${API_BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch global news (status: ${response.status})`);
  const data = await response.json();
  return processArticles(data.articles, "Global Economy");
};

const fetchFinancialNews = async (): Promise<NewsItem[]> => {
  if (!NEWS_API_KEY) return getMockNewsData().financial; // Return mock data if key is missing
  // 3. Ensure the FULL URL is used for the fetch call
  const url = `${API_BASE_URL}/top-headlines?category=business&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch financial news (status: ${response.status})`);
  const data = await response.json();
  return processArticles(data.articles, "Financial Markets");
};


// --- Main Function to Aggregate All News Data ---

export const fetchAllNewsData = async (): Promise<NewsData> => {
  try {
    const [global, financial] = await Promise.all([
      fetchGlobalNews(),
      fetchFinancialNews()
    ]);

    const { trendingStocks, sectors } = getMockStocksAndSectors();
    
    return { global, financial, trendingStocks, sectors };
  } catch (error: any) {
    console.error('Full error fetching news data:', error);
    toast.error("Failed to fetch news", { description: error.message || "Please try again later." });
    return getMockNewsData();
  }
};


// --- Mock Data and Helper Functions ---
function getRandomSentiment(): SentimentType {
  const sentiments: SentimentType[] = ['bullish', 'bearish', 'neutral'];
  return sentiments[Math.floor(Math.random() * sentiments.length)];
}

function getMockStocksAndSectors() {
  return {
    trendingStocks: [
      { symbol: 'NVDA', name: 'NVIDIA Corporation', change: 4.28, sentiment: 'bullish' as SentimentType, headlines: ['NVIDIA Showcases New AI Chips', 'Analysts Raise NVIDIA Price Targets'] },
      { symbol: 'AAPL', name: 'Apple Inc.', change: -1.53, sentiment: 'bearish' as SentimentType, headlines: ['Apple Supplier Reports Production Delays', 'iPhone 15 Demand Concerns Emerge'] },
    ],
    sectors: [
      { name: 'Technology', change: 2.3, sentiment: 'bullish' as SentimentType, topStocks: [ { symbol: 'NVDA', name: 'NVIDIA Corporation', change: 4.28 }, { symbol: 'MSFT', name: 'Microsoft Corp.', change: 0.87 }] },
      { name: 'Healthcare', change: -0.8, sentiment: 'neutral' as SentimentType, topStocks: [ { symbol: 'JNJ', name: 'Johnson & Johnson', change: 0.45 }, { symbol: 'UNH', name: 'UnitedHealth Group', change: 1.28 }] }
    ]
  };
}

function getMockNewsData(): NewsData {
  const mockData = getMockStocksAndSectors();
  return {
    global: [ { id: 'mock-g1', title: '[SAMPLE] Fed Signals Potential Rate Cuts', excerpt: 'This is sample data because the API call failed. Check your API key.', category: 'Economy', date: 'Aug 28, 2023', source: 'System', image: '/og-image.png', url: '#', sentiment: 'neutral' }],
    financial: [ { id: 'mock-f1', title: '[SAMPLE] Tesla Announces Major Expansion', excerpt: 'This is sample data because the API call failed. Check your API key.', category: 'Stocks', date: 'Aug 28, 2023', source: 'System', image: '/og-image.png', url: '#', sentiment: 'neutral', tickers: ['TSLA'] }],
    trendingStocks: mockData.trendingStocks,
    sectors: mockData.sectors
  };
}