
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  url: string;
}

const NewsCard = ({ title, excerpt, category, date, image, url }: NewsCardProps) => {
  return (
    <Card className="overflow-hidden border-border group card-hover">
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            <span>Read More</span>
            <ArrowRight size={14} className="ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
