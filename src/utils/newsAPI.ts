
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
    date: new Date(article.datetime * 1000).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    source: article.source || 'Finnhub',
    image: article.image || '/og-image.png',
    url: article.url || '#',
    sentiment: getRandomSentiment(),
    tickers: extractGlobalTickers(article.headline || ''),
  }));
};

// Extract global stock tickers from headlines
const extractGlobalTickers = (text: string): string[] => {
  const globalStocks = [
    // US Stocks
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA', 'JPM', 'BAC',
    // Indian Stocks
    'TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM', 'RELIANCE', 'HDFCBANK', 
    'ICICIBANK', 'SBIN', 'KOTAKBANK', 'AXISBANK', 'BHARTIARTL', 'ITC',
    // European Stocks
    'ASML', 'SAP', 'NESN', 'NOVN', 'ROCHE'
  ];
  
  const matches = text.toUpperCase().match(/\b([A-Z]{2,12})\b/g) || [];
  return matches.filter(ticker => globalStocks.includes(ticker)).slice(0, 3);
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
    return getGlobalMockNewsData().global;
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
    return processFinnhubArticles(data, "Global Financial Markets");
  } catch (error) {
    console.error('Error fetching Finnhub financial news:', error);
    return getGlobalMockNewsData().financial;
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
    return getGlobalMockNewsData();
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
        headlines: ['TCS Reports Strong Q3 Results with 15% YoY Growth', 'TCS Wins Major Digital Transformation Deal in Europe'] 
      },
      { 
        symbol: 'RELIANCE', 
        name: 'Reliance Industries', 
        change: -1.23, 
        sentiment: 'bearish' as SentimentType, 
        headlines: ['Reliance Retail Expansion in Tier-2 Cities', 'Oil Price Volatility Impacts Reliance Earnings'] 
      },
      { 
        symbol: 'INFY', 
        name: 'Infosys Limited', 
        change: 3.12, 
        sentiment: 'bullish' as SentimentType, 
        headlines: ['Infosys Launches New AI Platform for Enterprise Clients', 'Strong Digital Transformation Revenue Growth Continues'] 
      },
      { 
        symbol: 'HDFCBANK', 
        name: 'HDFC Bank Limited', 
        change: 0.87, 
        sentiment: 'neutral' as SentimentType, 
        headlines: ['HDFC Bank-HDFC Merger Integration Progressing Well', 'Digital Banking Initiatives Drive Customer Growth'] 
      },
      { 
        symbol: 'BHARTIARTL', 
        name: 'Bharti Airtel Limited', 
        change: 1.95, 
        sentiment: 'bullish' as SentimentType, 
        headlines: ['5G Network Rollout Accelerates Across Major Cities', 'Airtel Africa Operations Show Strong Growth'] 
      }
    ],
    sectors: [
      { 
        name: 'Information Technology', 
        change: 2.8, 
        sentiment: 'bullish' as SentimentType, 
        topStocks: [
          { symbol: 'TCS', name: 'Tata Consultancy Services', change: 2.45 },
          { symbol: 'INFY', name: 'Infosys Limited', change: 3.12 },
          { symbol: 'WIPRO', name: 'Wipro Limited', change: 1.78 }
        ]
      },
      { 
        name: 'Banking & Financial Services', 
        change: 1.2, 
        sentiment: 'neutral' as SentimentType, 
        topStocks: [
          { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', change: 0.87 },
          { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', change: 1.45 },
          { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', change: 0.95 }
        ]
      },
      { 
        name: 'Oil & Gas', 
        change: -0.65, 
        sentiment: 'bearish' as SentimentType, 
        topStocks: [
          { symbol: 'RELIANCE', name: 'Reliance Industries', change: -1.23 },
          { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', change: -0.89 },
          { symbol: 'IOC', name: 'Indian Oil Corporation', change: -0.34 }
        ]
      },
      { 
        name: 'Telecommunications', 
        change: 1.8, 
        sentiment: 'bullish' as SentimentType, 
        topStocks: [
          { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', change: 1.95 },
          { symbol: 'IDEA', name: 'Vodafone Idea Limited', change: 2.34 },
          { symbol: 'JIO', name: 'Jio Platforms Limited', change: 1.67 }
        ]
      }
    ]
  };
}

function getGlobalMockNewsData(): NewsData {
  const mockStocksAndSectors = getIndianMockStocksAndSectors();
  
  return {
    global: [
      { 
        id: 'mock-global-1', 
        title: 'Federal Reserve Maintains Interest Rates Amid Global Economic Uncertainty', 
        excerpt: 'The US Federal Reserve decides to keep interest rates steady as global markets show mixed signals and inflation concerns persist worldwide.', 
        category: 'Global Economy', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Reuters', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'neutral',
        tickers: ['JPM', 'BAC']
      },
      { 
        id: 'mock-global-2', 
        title: 'European Central Bank Signals Potential Rate Cuts for 2024', 
        excerpt: 'ECB President hints at possible monetary policy easing to support eurozone growth amid global economic headwinds.', 
        category: 'International Markets', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Financial Times', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish'
      },
      { 
        id: 'mock-global-3', 
        title: 'China PMI Data Shows Manufacturing Sector Recovery', 
        excerpt: 'Latest purchasing managers index indicates strengthening manufacturing activity in China, boosting global supply chain optimism.', 
        category: 'Manufacturing', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Bloomberg', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish'
      },
      { 
        id: 'mock-global-4', 
        title: 'Oil Prices Surge on OPEC+ Production Cut Announcement', 
        excerpt: 'Crude oil futures climb as OPEC+ members agree to extend production cuts through the second quarter of 2024.', 
        category: 'Commodities', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'CNBC', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish'
      }
    ],
    financial: [
      { 
        id: 'mock-financial-1', 
        title: 'S&P 500 Reaches New All-Time High Driven by Tech Rally', 
        excerpt: 'US stock markets surge to record levels as technology giants report strong quarterly earnings and AI optimism continues.', 
        category: 'Stock Markets', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'MarketWatch', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish',
        tickers: ['AAPL', 'MSFT', 'GOOGL']
      },
      { 
        id: 'mock-financial-2', 
        title: 'Tesla Reports Record Quarterly Deliveries Amid EV Market Growth', 
        excerpt: 'Electric vehicle manufacturer exceeds delivery expectations as global EV adoption accelerates across major markets.', 
        category: 'Automotive', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Wall Street Journal', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish',
        tickers: ['TSLA']
      },
      { 
        id: 'mock-financial-3', 
        title: 'Global Cryptocurrency Market Cap Surpasses $2 Trillion', 
        excerpt: 'Digital asset markets show renewed strength as institutional adoption grows and regulatory clarity improves worldwide.', 
        category: 'Cryptocurrency', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'CoinDesk', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish'
      },
      { 
        id: 'mock-financial-4', 
        title: 'Major Banks Report Strong Q4 Earnings Beat Expectations', 
        excerpt: 'Leading financial institutions post better-than-expected quarterly results driven by robust lending activity and trading revenues.', 
        category: 'Banking', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Financial Express', 
        image: '/og-image.png', 
        url: '#', 
        sentiment: 'bullish',
        tickers: ['JPM', 'BAC', 'WFC']
      }
    ],
    trendingStocks: mockStocksAndSectors.trendingStocks,
    sectors: mockStocksAndSectors.sectors
  };
}
