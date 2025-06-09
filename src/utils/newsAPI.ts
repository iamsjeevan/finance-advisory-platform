
import { toast } from "sonner";
import { NewsData, NewsItem, SentimentType } from "@/types/news";

// News API key
const NEWS_API_KEY = "d419d653d7834787b58583906ace65e0";

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }[];
}

export const fetchNews = async (query: string = "technology"): Promise<NewsData> => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=12&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json() as NewsAPIResponse;
    
    if (data.status !== "ok" || !data.articles) {
      throw new Error("Invalid API response");
    }
    
    // Process the news data into our format
    const processedData: NewsData = {
      global: [],
      financial: [],
      trendingStocks: [],
      sectors: []
    };
    
    // Convert News API articles to our NewsItem format
    data.articles.forEach((article, index) => {
      // Determine category based on content
      let category = "General";
      const title = article.title.toLowerCase();
      const description = (article.description || "").toLowerCase();
      
      if (title.includes("bitcoin") || title.includes("crypto") || description.includes("crypto")) {
        category = "Crypto";
      } else if (title.includes("stock") || title.includes("market") || description.includes("investment")) {
        category = "Stocks";
      } else if (title.includes("economy") || title.includes("gdp") || description.includes("economy")) {
        category = "Economy";
      } else if (title.includes("tech") || title.includes("ai") || description.includes("technology")) {
        category = "Technology";
      }
      
      // Create news item
      const newsItem: NewsItem = {
        id: `news-${index}`,
        title: article.title,
        excerpt: article.description || article.content?.substring(0, 200) + '...' || 'No description available',
        category: category,
        date: new Date(article.publishedAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        source: article.source.name,
        image: article.urlToImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
        url: article.url,
        sentiment: getRandomSentiment() // Since News API doesn't provide sentiment
      };
      
      // Categorize articles
      if (category === "Economy" || category === "Global") {
        processedData.global.push(newsItem);
      } else {
        processedData.financial.push(newsItem);
      }
    });
    
    // Ensure we have some data in each category
    if (processedData.global.length === 0 && processedData.financial.length > 0) {
      processedData.global = processedData.financial.slice(0, Math.min(4, processedData.financial.length));
    }
    
    if (processedData.financial.length === 0 && processedData.global.length > 0) {
      processedData.financial = processedData.global.slice(0, Math.min(4, processedData.global.length));
    }
    
    // Add mock data for trending stocks and sectors (which News API doesn't provide)
    const { trendingStocks, sectors } = getMockStocksAndSectors();
    processedData.trendingStocks = trendingStocks;
    processedData.sectors = sectors;
    
    return processedData;
  } catch (error) {
    console.error('Error fetching news data:', error);
    toast.error("Failed to fetch news data. Please try again later.");
    return getMockNewsData();
  }
};

// Helper function to generate random sentiment since News API doesn't provide it
function getRandomSentiment(): SentimentType {
  const sentiments: SentimentType[] = ['bullish', 'bearish', 'neutral'];
  return sentiments[Math.floor(Math.random() * sentiments.length)];
}

// Mock data to use as fallback
function getMockNewsData(): NewsData {
  return {
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
      }
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
      }
    ],
    trendingStocks: getMockStocksAndSectors().trendingStocks,
    sectors: getMockStocksAndSectors().sectors
  };
}

// Helper to get mock stocks and sectors
function getMockStocksAndSectors() {
  return {
    trendingStocks: [
      { symbol: 'NVDA', name: 'NVIDIA Corporation', change: 4.28, sentiment: 'bullish' as SentimentType, headlines: ['NVIDIA Showcases New AI Chips', 'Analysts Raise NVIDIA Price Targets'] },
      { symbol: 'AAPL', name: 'Apple Inc.', change: -1.53, sentiment: 'bearish' as SentimentType, headlines: ['Apple Supplier Reports Production Delays', 'iPhone 15 Demand Concerns Emerge'] },
      { symbol: 'TSLA', name: 'Tesla Inc.', change: 2.76, sentiment: 'bullish' as SentimentType, headlines: ['Tesla Announces Battery Production Expansion', 'Tesla Deliveries Expected to Beat Estimates'] },
      { symbol: 'META', name: 'Meta Platforms Inc.', change: 1.15, sentiment: 'bullish' as SentimentType, headlines: ['Meta Reports Strong Ad Revenue Growth', 'Horizon Worlds Sees User Increase'] },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', change: 0.25, sentiment: 'neutral' as SentimentType, headlines: ['Amazon Warehouse Expansion', 'AWS Growth Slows Slightly'] },
    ],
    sectors: [
      {
        name: 'Technology',
        change: 2.3,
        sentiment: 'bullish' as SentimentType,
        topStocks: [
          { symbol: 'NVDA', name: 'NVIDIA Corporation', change: 4.28 },
          { symbol: 'AAPL', name: 'Apple Inc.', change: -1.53 },
          { symbol: 'MSFT', name: 'Microsoft Corp.', change: 0.87 }
        ]
      },
      {
        name: 'Healthcare',
        change: 0.8,
        sentiment: 'neutral' as SentimentType,
        topStocks: [
          { symbol: 'JNJ', name: 'Johnson & Johnson', change: 0.45 },
          { symbol: 'PFE', name: 'Pfizer Inc.', change: -0.75 },
          { symbol: 'UNH', name: 'UnitedHealth Group', change: 1.28 }
        ]
      }
    ]
  };
}
