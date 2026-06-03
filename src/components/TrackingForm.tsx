import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';

interface TrackingFormProps {
  onTrack: (trackingNumber: string) => void;
  isLoading?: boolean;
}

export function TrackingForm({ onTrack, isLoading }: TrackingFormProps) {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button type="submit" disabled={isLoading} className="h-12 px-6">
          {isLoading ? 'Tracking...' : 'Track'}
        </Button>
      </div>
      <p className="text-sm text-slate-500 mt-2">
        Try: TRK123456789, TRK987654321, or TRK555555555
      </p>
    </form>
  );
}