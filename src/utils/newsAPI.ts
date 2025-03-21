import { toast } from "sonner";
import { NewsData, NewsItem } from "@/types/news";

// NewsAPI.ai API key
const NEWS_API_KEY = "84dc6045-11ce-405c-b2a0-fe46cd6280c0";

export interface NewsAPIResponse {
  articles: {
    id: string;
    title: string;
    body: string;
    source: {
      title: string;
    };
    dateTime: string;
    concepts: Array<{
      uri: string;
      label: {
        eng: string;
      };
      type: string;
    }>;
    categories: Array<{
      uri: string;
      label: {
        eng: string;
      };
    }>;
    sentiment: number;
    image: string;
    url: string;
  }[];
}

export const fetchNews = async (): Promise<NewsData> => {
  try {
    const response = await fetch("https://eventregistry.org/api/v1/article/getArticles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "action": "getArticles",
        "keyword": ["finance", "stocks", "market"],
        "sourceLocationUri": [
          "http://en.wikipedia.org/wiki/United_States",
          "http://en.wikipedia.org/wiki/Canada",
          "http://en.wikipedia.org/wiki/United_Kingdom"
        ],
        "ignoreSourceGroupUri": "paywall/paywalled_sources",
        "articlesPage": 1,
        "articlesCount": 100,
        "articlesSortBy": "date",
        "articlesSortByAsc": false,
        "dataType": [
          "news"
        ],
        "forceMaxDataTimeWindow": 31,
        "resultType": "articles",
        "articleBodyLen": 300, // Limit body length to reduce payload size
        "apiKey": NEWS_API_KEY
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json() as NewsAPIResponse;
    
    // Process the news data into our format
    const processedData: NewsData = {
      global: [],
      financial: [],
      trendingStocks: [],
      sectors: []
    };
    
    // Filter and map articles to our NewsItem format
    data.articles.forEach(article => {
      // Determine category
      let category = "General";
      if (article.categories && article.categories.length > 0) {
        category = article.categories[0].label.eng.split('/').pop() || "General";
      }
      
      // Create news item
      const newsItem: NewsItem = {
        id: article.id,
        title: article.title,
        excerpt: article.body ? article.body.substring(0, 200) + '...' : '',
        category: category,
        date: new Date(article.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: article.source.title,
        image: article.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80', // Fallback image
        url: article.url,
        sentiment: getSentimentLabel(article.sentiment)
      };
      
      // Identify stock tickers in concepts
      const tickers: string[] = [];
      if (article.concepts) {
        article.concepts.forEach(concept => {
          if (concept.type === "company" && concept.label.eng) {
            // Try to extract stock ticker - this is an approximation
            const match = concept.label.eng.match(/\(([A-Z]+)\)/);
            if (match && match[1]) {
              tickers.push(match[1]);
            }
          }
        });
      }
      
      // If tickers found, add them to the news item
      if (tickers.length > 0) {
        newsItem.tickers = tickers;
      }
      
      // Categorize articles
      if (category === "Economy" || category === "World" || category === "Global") {
        processedData.global.push(newsItem);
      } else {
        processedData.financial.push(newsItem);
      }
    });
    
    // Ensure we have some data in each category even if classification wasn't perfect
    if (processedData.global.length === 0 && processedData.financial.length > 0) {
      processedData.global = processedData.financial.slice(0, 4);
    }
    
    if (processedData.financial.length === 0 && processedData.global.length > 0) {
      processedData.financial = processedData.global.slice(0, 4);
    }
    
    // Keep existing mock data for trending stocks and sectors (which we can't easily get from this API)
    const { trendingStocks, sectors } = getMockStocksAndSectors();
    processedData.trendingStocks = trendingStocks;
    processedData.sectors = sectors;
    
    return processedData;
  } catch (error) {
    console.error('Error fetching news data:', error);
    toast.error("Failed to fetch news data. Using sample data instead.");
    return getMockNewsData();
  }
};

// Helper function to convert sentiment score to sentiment label
function getSentimentLabel(score: number): 'bullish' | 'bearish' | 'neutral' {
  if (score > 0.2) return 'bullish';
  if (score < -0.2) return 'bearish';
  return 'neutral';
}

// Mock data to use as fallback
function getMockNewsData(): NewsData {
  // Use the same format as in useFetchNews.ts but return it directly
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
    trendingStocks: getMockStocksAndSectors().trendingStocks,
    sectors: getMockStocksAndSectors().sectors
  };
}

// Helper to get mock stocks and sectors
function getMockStocksAndSectors() {
  return {
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
}
