
import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Minus, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { 
  fetchStockTimeSeries, 
  generateFallbackData, 
  StockDataResponse, 
  intervalToDays 
} from '@/utils/alphaVantageAPI';

const timeRanges = [
  { label: '1W', days: 7, interval: 'daily' as const },
  { label: '1M', days: 30, interval: 'daily' as const },
  { label: '3M', days: 90, interval: 'weekly' as const },
  { label: '6M', days: 180, interval: 'weekly' as const },
  { label: '1Y', days: 365, interval: 'monthly' as const },
];

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', trend: 'up' as const },
  { symbol: 'MSFT', name: 'Microsoft Corp.', trend: 'up' as const },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', trend: 'flat' as const },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', trend: 'up' as const },
  { symbol: 'META', name: 'Meta Platforms Inc.', trend: 'down' as const },
];

const StockChart = ({ simplified = false }) => {
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [selectedRange, setSelectedRange] = useState(timeRanges[1]); // Default to 1 month
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch stock data using React Query
  const { 
    data: stockData, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['stockData', selectedStock.symbol, selectedRange.interval],
    queryFn: async () => {
      try {
        return await fetchStockTimeSeries(
          selectedStock.symbol, 
          selectedRange.interval, 
          'compact'
        );
      } catch (err) {
        // If the API fails, return fallback data
        console.error('Error fetching stock data, using fallback:', err);
        return generateFallbackData(
          selectedStock.symbol, 
          selectedStock.name, 
          selectedStock.trend, 
          intervalToDays(selectedRange.interval)
        );
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchInterval: simplified ? false : 5 * 60 * 1000, // Auto refresh every 5 minutes if not simplified
  });

  const getChangeColor = () => {
    if (!stockData) return 'text-muted-foreground';
    if (stockData.changePercent > 0) return 'text-green-500';
    if (stockData.changePercent < 0) return 'text-red-500';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (!stockData) return <Minus size={16} className="text-muted-foreground" />;
    if (stockData.changePercent > 0) return <ArrowUpRight size={16} className="text-green-500" />;
    if (stockData.changePercent < 0) return <ArrowDownRight size={16} className="text-red-500" />;
    return <Minus size={16} className="text-muted-foreground" />;
  };

  const handleRefresh = () => {
    toast.info("Refreshing stock data...");
    refetch();
  };

  // Format the data for the chart - limit the number of data points based on the range
  const formatChartData = (data: StockDataResponse | undefined) => {
    if (!data || !data.data) return [];
    
    // If we have more than 60 data points, sample them
    let formattedData = [...data.data];
    if (formattedData.length > 60) {
      const sampleInterval = Math.floor(formattedData.length / 60);
      formattedData = formattedData.filter((_, index) => index % sampleInterval === 0);
    }
    
    // Format the date for display
    return formattedData.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: item.value
    }));
  };

  const chartData = formatChartData(stockData);

  return (
    <Card className="overflow-hidden shadow-subtle">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <h3 className="font-medium text-lg">
              {isLoading ? 'Loading...' : stockData?.metadata.name || selectedStock.name}
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              <Badge variant="outline" className="font-mono">
                {selectedStock.symbol}
              </Badge>
              {!isLoading && stockData && (
                <div className="flex items-center space-x-1">
                  {getChangeIcon()}
                  <span className={`text-sm font-medium ${getChangeColor()}`}>
                    {stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent}%
                  </span>
                </div>
              )}
              {isError && (
                <Badge variant="outline" className="text-red-500 border-red-300">
                  Error loading data
                </Badge>
              )}
            </div>
          </div>
          {!simplified && (
            <div className="flex flex-wrap gap-2 items-center">
              {stocks.map((stock) => (
                <Button 
                  key={stock.symbol}
                  variant={stock.symbol === selectedStock.symbol ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStock(stock)}
                  className="text-xs h-8"
                >
                  {stock.symbol}
                </Button>
              ))}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefresh} 
                disabled={isLoading}
                className="h-8 w-8 ml-1"
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <CardContent className="p-0">
        <div className="p-5">
          <div ref={chartRef} className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={chartData} 
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#8E9196' }}
                  tickMargin={10}
                  minTickGap={30}
                />
                <YAxis 
                  domain={['dataMin - 10', 'dataMax + 10']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#8E9196' }}
                  tickMargin={10}
                  width={40}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '0.5rem',
                    border: '1px solid #f3f4f6',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '0.5rem 1rem',
                  }}
                  labelStyle={{ fontWeight: 600, marginBottom: '0.25rem' }}
                  itemStyle={{ fontSize: '0.875rem' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={
                    !stockData ? 'rgba(107, 114, 128, 1)' :
                    stockData.changePercent > 0 
                      ? 'rgba(16, 185, 129, 1)' 
                      : stockData.changePercent < 0 
                        ? 'rgba(239, 68, 68, 1)' 
                        : 'rgba(107, 114, 128, 1)'
                  }
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4">
            {timeRanges.map((range) => (
              <Button 
                key={range.label}
                variant={range === selectedRange ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRange(range)}
                className="mx-1"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
