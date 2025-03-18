
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface WatchlistStockItemProps {
  symbol: string;
  watchlistId: string;
  onRemove: (watchlistId: string, symbol: string) => void;
}

const WatchlistStockItem = ({ symbol, watchlistId, onRemove }: WatchlistStockItemProps) => {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
      <span className="font-mono font-medium">${symbol}</span>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onRemove(watchlistId, symbol)}
        className="h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WatchlistStockItem;
