// src/components/news/NewsSearchBar.tsx

import { Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// The search bar is now a simpler, "presentational" component.
// It receives an `isLoading` prop to know when to disable itself.
const NewsSearchBar = ({ isLoading }: { isLoading: boolean }) => {
  const [localQuery, setLocalQuery] = useState('');

  const handleSearch = () => {
    // We can re-implement this later if needed.
    // For now, it just shows an alert.
    alert(`Search functionality for "${localQuery}" is not yet implemented.`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search news, stocks, or topics..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSearch}
          disabled={isLoading || !localQuery.trim()}
          className="gap-2"
        >
          <Search size={16} />
          <span>Search</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2" disabled>
          <Filter size={16} />
          <span>Filter</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2" disabled>
          <TrendingUp size={16} />
          <span>Sort</span>
        </Button>
      </div>
    </div>
  );
};

export default NewsSearchBar;