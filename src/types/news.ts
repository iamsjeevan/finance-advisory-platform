
export type SentimentType = 'bullish' | 'bearish' | 'neutral';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  source: string;
  image: string;
  url: string;
  sentiment: SentimentType;
  tickers?: string[];
}

export interface TrendingStock {
  symbol: string;
  name: string;
  change: number;
  sentiment: SentimentType;
  headlines: string[];
}

export interface SectorStock {
  symbol: string;
  name: string;
  change: number;
}

export interface SectorData {
  name: string;
  change: number;
  sentiment: SentimentType;
  topStocks: SectorStock[];
}

export interface NewsData {
  global: NewsItem[];
  financial: NewsItem[];
  trendingStocks: TrendingStock[];
  sectors: SectorData[];
}

export interface Watchlist {
  id: string;
  name: string;
  stocks: string[];
}

export interface WatchlistContextType {
  watchlists: Watchlist[];
  activeWatchlist: string;
  setActiveWatchlist: (id: string) => void;
  addWatchlist: (name: string) => void;
  removeWatchlist: (id: string) => void;
  addStockToWatchlist: (watchlistId: string, symbol: string) => void;
  removeStockFromWatchlist: (watchlistId: string, symbol: string) => void;
}
