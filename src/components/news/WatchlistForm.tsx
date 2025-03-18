
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Save, X } from 'lucide-react';

interface WatchlistFormProps {
  onSave: (name: string) => void;
  onCancel: () => void;
}

const WatchlistForm = ({ onSave, onCancel }: WatchlistFormProps) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      setName('');
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-medium">Create New Watchlist</h3>
          <Input
            placeholder="Watchlist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="w-full">
              <Save className="h-4 w-4 mr-2" />
              <span>Save</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCancel}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              <span>Cancel</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchlistForm;
