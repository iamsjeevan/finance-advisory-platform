
import { Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNews } from '@/context/NewsContext';

const NewsSearchBar = () => {
  const { searchQuery, setSearchQuery } = useNews();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search news, stocks, or topics..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
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
