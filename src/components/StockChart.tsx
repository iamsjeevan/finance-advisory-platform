
import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const generateSampleData = (trend: 'up' | 'down' | 'flat', days: number) => {
  const data = [];
  let lastValue = trend === 'up' ? 150 : trend === 'down' ? 250 : 200;

  for (let i = 0; i < days; i++) {
    // Create random fluctuations
    const change = trend === 'up' 
      ? Math.random() * 10 - 3  // Upward trend: more likely to go up
      : trend === 'down' 
        ? Math.random() * 10 - 7  // Downward trend: more likely to go down
        : Math.random() * 6 - 3;  // Flat trend: equal chance of up or down
    
    lastValue = Math.max(50, lastValue + change);
    data.push({
      date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: lastValue
    });
  }
  
  return data;
};

const timeRanges = [
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: '1Y', days: 365 },
];

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', trend: 'up' as const },
  { symbol: 'MSFT', name: 'Microsoft Corp.', trend: 'up' as const },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', trend: 'flat' as const },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', trend: 'up' as const },
  { symbol: 'META', name: 'Meta Platforms Inc.', trend: 'down' as const },
];

const StockChart = () => {
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [selectedRange, setSelectedRange] = useState(timeRanges[1]); // Default to 1 month
  const [chartData, setChartData] = useState<any[]>([]);
  const [changePercent, setChangePercent] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = generateSampleData(selectedStock.trend, selectedRange.days);
    setChartData(data);
    
    // Calculate percent change
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    const percentChange = ((lastValue - firstValue) / firstValue) * 100;
    setChangePercent(Number(percentChange.toFixed(2)));
  }, [selectedStock, selectedRange]);

  const getChangeColor = () => {
    if (changePercent > 0) return 'text-green-500';
    if (changePercent < 0) return 'text-red-500';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changePercent > 0) return <ArrowUpRight size={16} className="text-green-500" />;
    if (changePercent < 0) return <ArrowDownRight size={16} className="text-red-500" />;
    return <Minus size={16} className="text-muted-foreground" />;
  };

  return (
    <Card className="overflow-hidden shadow-subtle">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <h3 className="font-medium text-lg">{selectedStock.name}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <Badge variant="outline" className="font-mono">
                {selectedStock.symbol}
              </Badge>
              <div className="flex items-center space-x-1">
                {getChangeIcon()}
                <span className={`text-sm font-medium ${getChangeColor()}`}>
                  {changePercent > 0 ? '+' : ''}{changePercent}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>
      </div>
      <CardContent className="p-0">
        <div className="p-5">
          <div ref={chartRef} className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={
                    changePercent > 0 
                      ? 'rgba(16, 185, 129, 1)' 
                      : changePercent < 0 
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
