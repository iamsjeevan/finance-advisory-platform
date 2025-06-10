
import { createContext, useState, useContext, ReactNode } from 'react';
import { Watchlist, WatchlistContextType } from '@/types/news';

// Initial watchlists with Indian/Bangalore-based companies
const INITIAL_WATCHLISTS: Watchlist[] = [
  {
    id: '1',
    name: 'Tech Stocks',
    stocks: ['TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM']
  },
  {
    id: '2',
    name: 'Banking Sector',
    stocks: ['HDFCBANK', 'ICICIBANK', 'SBIN', 'KOTAKBANK', 'AXISBANK']
  },
  {
    id: '3',
    name: 'Large Cap',
    stocks: ['RELIANCE', 'TCS', 'HDFCBANK', 'BHARTIARTL', 'ITC']
  }
];

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>(INITIAL_WATCHLISTS);
  const [activeWatchlist, setActiveWatchlist] = useState<string>(INITIAL_WATCHLISTS[0].id);

  const addWatchlist = (name: string) => {
    if (name.trim()) {
      const newWatchlist: Watchlist = {
        id: Date.now().toString(),
        name,
        stocks: []
      };
      setWatchlists([...watchlists, newWatchlist]);
      setActiveWatchlist(newWatchlist.id);
    }
  };

  const removeWatchlist = (id: string) => {
    const filteredWatchlists = watchlists.filter(wl => wl.id !== id);
    setWatchlists(filteredWatchlists);
    if (activeWatchlist === id && filteredWatchlists.length > 0) {
      setActiveWatchlist(filteredWatchlists[0].id);
    }
  };

  const addStockToWatchlist = (watchlistId: string, symbol: string) => {
    if (symbol.trim()) {
      setWatchlists(watchlists.map(wl => {
        if (wl.id === watchlistId && !wl.stocks.includes(symbol.toUpperCase())) {
          return {
            ...wl,
            stocks: [...wl.stocks, symbol.toUpperCase()]
          };
        }
        return wl;
      }));
    }
  };

  const removeStockFromWatchlist = (watchlistId: string, symbol: string) => {
    setWatchlists(watchlists.map(wl => {
      if (wl.id === watchlistId) {
        return {
          ...wl,
          stocks: wl.stocks.filter(s => s !== symbol)
        };
      }
      return wl;
    }));
  };

  return (
    <WatchlistContext.Provider value={{
      watchlists,
      activeWatchlist,
      setActiveWatchlist,
      addWatchlist,
      removeWatchlist,
      addStockToWatchlist,
      removeStockFromWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
