import { useState } from 'react';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Shipment } from '../types/shipment';
import { Shield, User } from 'lucide-react';

interface StaffModeToggleProps {
  shipment: Shipment | null;
  onUpdateStatus: (status: Shipment['status']) => void;
}

export function StaffModeToggle({ shipment, onUpdateStatus }: StaffModeToggleProps) {
  const [isStaffMode, setIsStaffMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Shipment['status'] | ''>('');

  const handleUpdate = () => {
    if (selectedStatus && shipment) {
      onUpdateStatus(selectedStatus);
      setSelectedStatus('');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2">
        {isStaffMode && shipment && (
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg shadow-lg p-2">
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Shipment['status'])}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="New status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="exception">Exception</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={handleUpdate}
              disabled={!selectedStatus}
              className="h-9"
            >
              Update
            </Button>
          </div>
        )}
        <Button
          variant={isStaffMode ? 'default' : 'outline'}
          size="sm"
          onClick={() => setIsStaffMode(!isStaffMode)}
          className="h-9"
        >
          {isStaffMode ? (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Staff Mode
            </>
          ) : (
            <>
              <User className="h-4 w-4 mr-2" />
              Staff Mode
            </>
          )}
        </Button>
      </div>
    </div>
  );
}