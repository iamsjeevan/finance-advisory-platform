
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  image?: string;
}

const TestimonialCard = ({ quote, author, role, rating, image }: TestimonialCardProps) => {
  return (
    <Card className="h-full border-border overflow-hidden">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'
              }`}
            />
          ))}
        </div>
        <blockquote className="flex-grow">
          <p className="text-foreground mb-6 text-balance">{quote}</p>
        </blockquote>
        <div className="flex items-center mt-2">
          {image ? (
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img
                src={image}
                alt={author}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-finance-blue/10 text-finance-blue flex items-center justify-center mr-3">
              {author.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-sm">{author}</p>
            <p className="text-muted-foreground text-xs">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
