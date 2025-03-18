
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Plus, X, ListPlus, Save } from 'lucide-react';
import { Watchlist } from '@/types/news';

// Mock watchlist data
const INITIAL_WATCHLISTS: Watchlist[] = [
  {
    id: '1',
    name: 'Tech Stocks',
    stocks: ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN']
  },
  {
    id: '2',
    name: 'Energy Sector',
    stocks: ['XOM', 'CVX', 'COP', 'BP', 'SLB']
  },
  {
    id: '3',
    name: 'Crypto',
    stocks: ['BTC', 'ETH', 'SOL', 'ADA', 'DOT']
  }
];

const WatchlistPanel = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>(INITIAL_WATCHLISTS);
  const [activeWatchlist, setActiveWatchlist] = useState<string>(INITIAL_WATCHLISTS[0].id);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [isCreatingWatchlist, setIsCreatingWatchlist] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  const currentWatchlist = watchlists.find(wl => wl.id === activeWatchlist);

  const handleAddWatchlist = () => {
    if (newWatchlistName.trim()) {
      const newWatchlist: Watchlist = {
        id: Date.now().toString(),
        name: newWatchlistName,
        stocks: []
      };
      setWatchlists([...watchlists, newWatchlist]);
      setActiveWatchlist(newWatchlist.id);
      setNewWatchlistName('');
      setIsCreatingWatchlist(false);
    }
  };

  const handleRemoveWatchlist = (id: string) => {
    const filteredWatchlists = watchlists.filter(wl => wl.id !== id);
    setWatchlists(filteredWatchlists);
    if (activeWatchlist === id && filteredWatchlists.length > 0) {
      setActiveWatchlist(filteredWatchlists[0].id);
    }
  };

  const handleAddStock = () => {
    if (newSymbol.trim()) {
      const updatedWatchlists = watchlists.map(wl => {
        if (wl.id === activeWatchlist && !wl.stocks.includes(newSymbol.toUpperCase())) {
          return {
            ...wl,
            stocks: [...wl.stocks, newSymbol.toUpperCase()]
          };
        }
        return wl;
      });
      setWatchlists(updatedWatchlists);
      setNewSymbol('');
    }
  };

  const handleRemoveStock = (watchlistId: string, symbol: string) => {
    const updatedWatchlists = watchlists.map(wl => {
      if (wl.id === watchlistId) {
        return {
          ...wl,
          stocks: wl.stocks.filter(s => s !== symbol)
        };
      }
      return wl;
    });
    setWatchlists(updatedWatchlists);
  };

  return (
    <div className="sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Watchlists</h2>
        <Button variant="outline" size="sm" onClick={() => setIsCreatingWatchlist(true)}>
          <ListPlus className="h-4 w-4 mr-2" />
          <span>New</span>
        </Button>
      </div>

      {isCreatingWatchlist && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h3 className="font-medium">Create New Watchlist</h3>
              <Input
                placeholder="Watchlist name"
                value={newWatchlistName}
                onChange={(e) => setNewWatchlistName(e.target.value)}
                className="w-full"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddWatchlist} size="sm" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  <span>Save</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsCreatingWatchlist(false)}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  <span>Cancel</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue={activeWatchlist} onValueChange={setActiveWatchlist} className="w-full">
            <TabsList className="w-full mb-4 grid" style={{ gridTemplateColumns: `repeat(${watchlists.length}, 1fr)` }}>
              {watchlists.map(wl => (
                <TabsTrigger key={wl.id} value={wl.id} className="text-xs sm:text-sm">
                  {wl.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {watchlists.map(wl => (
              <TabsContent key={wl.id} value={wl.id} className="mt-0">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">{wl.name}</h3>
                  {watchlists.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveWatchlist(wl.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add symbol (e.g., AAPL)"
                    value={activeWatchlist === wl.id ? newSymbol : ''}
                    onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                    className="w-full"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleAddStock} 
                    disabled={activeWatchlist !== wl.id || !newSymbol.trim()}
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Separator className="my-3" />
                
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {wl.stocks.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      No stocks added yet. Add some symbols above.
                    </p>
                  ) : (
                    wl.stocks.map(symbol => (
                      <div key={symbol} className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                        <span className="font-mono font-medium">${symbol}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveStock(wl.id, symbol)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WatchlistPanel;
