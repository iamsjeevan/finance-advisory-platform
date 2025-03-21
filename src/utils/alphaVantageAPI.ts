import { toast } from "sonner";

// Alpha Vantage API key
const ALPHA_VANTAGE_API_KEY = "M6N4JMMF4KTQOVEN";

export interface StockData {
  date: string;
  value: number;
}

export interface StockMetadata {
  symbol: string;
  name: string;
  lastRefreshed: string;
  timeZone: string;
}

export interface StockDataResponse {
  metadata: StockMetadata;
  data: StockData[];
  changePercent: number;
}

// Function to fetch time series data for a specific stock
export const fetchStockTimeSeries = async (
  symbol: string,
  interval: 'daily' | 'weekly' | 'monthly' = 'daily',
  outputSize: 'compact' | 'full' = 'compact'
): Promise<StockDataResponse> => {
  try {
    let functionName;
    switch (interval) {
      case 'weekly':
        functionName = 'TIME_SERIES_WEEKLY';
        break;
      case 'monthly':
        functionName = 'TIME_SERIES_MONTHLY';
        break;
      case 'daily':
      default:
        functionName = 'TIME_SERIES_DAILY';
        break;
    }

    const url = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&outputsize=${outputSize}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const jsonData = await response.json();
    
    // Handle API error responses
    if (jsonData['Error Message']) {
      throw new Error(jsonData['Error Message']);
    }
    
    if (jsonData['Note']) {
      console.warn('Alpha Vantage API limit note:', jsonData['Note']);
      toast.warning("API rate limit reached. Some data may be stale.");
    }
    
    // Parse the response based on the interval
    let timeSeriesKey;
    switch (interval) {
      case 'weekly':
        timeSeriesKey = 'Weekly Time Series';
        break;
      case 'monthly':
        timeSeriesKey = 'Monthly Time Series';
        break;
      case 'daily':
      default:
        timeSeriesKey = 'Time Series (Daily)';
        break;
    }
    
    const timeSeries = jsonData[timeSeriesKey];
    const metaData = jsonData['Meta Data'];
    
    if (!timeSeries || !metaData) {
      throw new Error('Invalid response format from Alpha Vantage API');
    }
    
    // Convert time series data to our format
    const stockData: StockData[] = [];
    const dates = Object.keys(timeSeries).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    
    dates.forEach((date) => {
      stockData.push({
        date: date,
        value: parseFloat(timeSeries[date]['4. close'])
      });
    });
    
    // Calculate percent change
    const firstValue = parseFloat(timeSeries[dates[0]]['4. close']);
    const lastValue = parseFloat(timeSeries[dates[dates.length - 1]]['4. close']);
    const changePercent = ((lastValue - firstValue) / firstValue) * 100;
    
    return {
      metadata: {
        symbol: metaData['2. Symbol'],
        name: symbol, // Alpha Vantage doesn't provide company name, only symbol
        lastRefreshed: metaData['3. Last Refreshed'],
        timeZone: metaData['5. Time Zone'] || 'US/Eastern'
      },
      data: stockData,
      changePercent: Number(changePercent.toFixed(2))
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    toast.error("Failed to fetch stock data. Using sample data instead.");
    throw error;
  }
};

// Function to fetch multiple stocks data
export const fetchMultipleStocks = async (
  symbols: string[],
  interval: 'daily' | 'weekly' | 'monthly' = 'daily',
): Promise<Record<string, StockDataResponse>> => {
  const results: Record<string, StockDataResponse> = {};
  
  // For demo purposes, we use Promise.all, but in production,
  // you might want to implement rate limiting
  try {
    const stockDataPromises = symbols.map(symbol => 
      fetchStockTimeSeries(symbol, interval)
        .then(data => {
          results[symbol] = data;
        })
        .catch(error => {
          console.error(`Error fetching data for ${symbol}:`, error);
          // Return null for failed requests
          return null;
        })
    );
    
    await Promise.all(stockDataPromises);
    return results;
  } catch (error) {
    console.error('Error fetching multiple stocks:', error);
    toast.error("Failed to fetch stock data. Using fallback data.");
    throw error;
  }
};

// Get the appropriate time range for interval
export const getTimeRangeForInterval = (interval: 'daily' | 'weekly' | 'monthly'): number => {
  switch (interval) {
    case 'weekly':
      return 90; // ~3 months
    case 'monthly':
      return 365; // ~1 year
    case 'daily':
    default:
      return 30; // ~1 month
  }
};

// Map Alpha Vantage interval to days for UI display
export const intervalToDays = (interval: 'daily' | 'weekly' | 'monthly'): number => {
  switch (interval) {
    case 'weekly':
      return 90;
    case 'monthly':
      return 365;
    case 'daily':
    default:
      return 30;
  }
};

// Generate fallback data if API fails
export const generateFallbackData = (
  symbol: string, 
  name: string, 
  trend: 'up' | 'down' | 'flat', 
  days: number
): StockDataResponse => {
  const data = [];
  let lastValue = trend === 'up' ? 150 : trend === 'down' ? 250 : 200;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Create random fluctuations
    const change = trend === 'up' 
      ? Math.random() * 10 - 3  // Upward trend: more likely to go up
      : trend === 'down' 
        ? Math.random() * 10 - 7  // Downward trend: more likely to go down
        : Math.random() * 6 - 3;  // Flat trend: equal chance of up or down
    
    lastValue = Math.max(50, lastValue + change);
    data.push({
      date: currentDate.toISOString().split('T')[0],
      value: lastValue
    });
  }
  
  const firstValue = data[0].value;
  const lastValueData = data[data.length - 1].value;
  const changePercent = ((lastValueData - firstValue) / firstValue) * 100;
  
  return {
    metadata: {
      symbol,
      name,
      lastRefreshed: new Date().toISOString(),
      timeZone: 'US/Eastern'
    },
    data,
    changePercent: Number(changePercent.toFixed(2))
  };
};
