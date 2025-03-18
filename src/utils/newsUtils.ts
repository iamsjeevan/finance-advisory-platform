
import { SentimentType } from '@/types/news';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'bullish':
      return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    case 'bearish':
      return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    default:
      return <Minus className="h-4 w-4 text-gray-500" />;
  }
};

export const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'bullish':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'bearish':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

export const getSentimentClass = (sentiment: string) => {
  switch (sentiment) {
    case 'bullish':
      return 'text-green-500';
    case 'bearish':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};
