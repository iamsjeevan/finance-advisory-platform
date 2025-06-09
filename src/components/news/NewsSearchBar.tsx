
import { Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNews } from '@/context/NewsContext';
import { useState } from 'react';

const NewsSearchBar = () => {
  const { searchQuery, setSearchQuery, searchNews, isLoading } = useNews();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = async () => {
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      await searchNews(localQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search news, stocks, or topics..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background"
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
          disabled={isLoading}
          className="gap-2"
        >
          <Search size={16} />
          <span>Search</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter size={16} />
          <span>Filter</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <TrendingUp size={16} />
          <span>Sort</span>
        </Button>
      </div>
    </div>
  );
};

export default NewsSearchBar;
