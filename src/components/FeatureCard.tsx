
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border border-border overflow-hidden group card-hover">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-finance-blue/10 flex items-center justify-center text-finance-blue mb-5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
