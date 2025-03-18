
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Plus, X, ListPlus } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';
import WatchlistStockItem from './WatchlistStockItem';
import WatchlistForm from './WatchlistForm';

const WatchlistPanel = () => {
  const { 
    watchlists, 
    activeWatchlist, 
    setActiveWatchlist, 
    addWatchlist, 
    removeWatchlist,
    addStockToWatchlist,
    removeStockFromWatchlist
  } = useWatchlist();
  
  const [isCreatingWatchlist, setIsCreatingWatchlist] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  const handleAddStock = () => {
    if (newSymbol.trim()) {
      addStockToWatchlist(activeWatchlist, newSymbol.toUpperCase());
      setNewSymbol('');
    }
  };

  const handleSaveWatchlist = (name: string) => {
    addWatchlist(name);
    setIsCreatingWatchlist(false);
  };

  return (
    <div className="sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Watchlists</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsCreatingWatchlist(true)}
        >
          <ListPlus className="h-4 w-4 mr-2" />
          <span>New</span>
        </Button>
      </div>

      {isCreatingWatchlist && (
        <WatchlistForm 
          onSave={handleSaveWatchlist}
          onCancel={() => setIsCreatingWatchlist(false)}
        />
      )}

      <Card>
        <CardContent className="p-4">
          <Tabs 
            defaultValue={activeWatchlist} 
            onValueChange={setActiveWatchlist} 
            className="w-full"
          >
            <TabsList 
              className="w-full mb-4 grid" 
              style={{ 
                gridTemplateColumns: `repeat(${watchlists.length}, 1fr)` 
              }}
            >
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
                      onClick={() => removeWatchlist(wl.id)}
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
                      <WatchlistStockItem
                        key={symbol}
                        symbol={symbol}
                        watchlistId={wl.id}
                        onRemove={removeStockFromWatchlist}
                      />
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
