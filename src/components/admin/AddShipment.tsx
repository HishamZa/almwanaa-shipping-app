import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Package } from 'lucide-react';
import { User } from '../../types';

interface AddShipmentProps {
  customers: User[];
  onAddShipment: (data: {
    customerId: string;
    customerName: string;
    sizeCBM: number;
    costUSD: number;
    arrivalDate: string;
  }) => void;
  error?: string;
  success?: string;
}

export function AddShipment({ customers, onAddShipment, error, success }: AddShipmentProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [sizeCBM, setSizeCBM] = useState('');
  const [costUSD, setCostUSD] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === selectedCustomerId);
    if (customer) {
      onAddShipment({
        customerId: customer.id,
        customerName: customer.name || customer.username,
        sizeCBM: parseFloat(sizeCBM),
        costUSD: parseFloat(costUSD),
        arrivalDate,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-emerald-600" />
          <CardTitle>Add New Shipment to Warehouse</CardTitle>
        </div>
        <CardDescription>Register a new shipment for a customer</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Select Customer *</Label>
            <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId} required>
              <SelectTrigger id="customer">
                <SelectValue placeholder="Choose a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.length === 0 ? (
                  <SelectItem value="none" disabled>No customers available</SelectItem>
                ) : (
                  customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name || customer.username} ({customer.username})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Shipment Size (CBM) *</Label>
              <Input
                id="size"
                type="number"
                step="0.01"
                min="0"
                value={sizeCBM}
                onChange={(e) => setSizeCBM(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Expected Cost (USD) *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                min="0"
                value={costUSD}
                onChange={(e) => setCostUSD(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="arrival-date">Arrival Date at Warehouse *</Label>
            <Input
              id="arrival-date"
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
              {success}
            </div>
          )}
          <Button type="submit" className="w-full">
            Add Shipment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}