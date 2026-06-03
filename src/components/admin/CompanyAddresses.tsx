import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
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
import { MapPin, Plus, Building, Truck } from 'lucide-react';
import { CompanyAddress } from '../../types';

interface CompanyAddressesProps {
  addresses: CompanyAddress[];
  onAddAddress: (data: Omit<CompanyAddress, 'id'>) => void;
}

export function CompanyAddresses({ addresses, onAddAddress }: CompanyAddressesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [type, setType] = useState<'company' | 'shipping'>('company');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAddress({ type, name, address, city, country, phone });
    setIsAdding(false);
    setName('');
    setAddress('');
    setCity('');
    setCountry('');
    setPhone('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Company & Shipping Addresses</CardTitle>
          <Button onClick={() => setIsAdding(!isAdding)}>
            <Plus className="h-4 w-4 mr-2" />
            {isAdding ? 'Cancel' : 'Add Address'}
          </Button>
        </CardHeader>
        <CardContent>
          {isAdding && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 bg-slate-50 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Address Type</Label>
                  <Select value={type} onValueChange={(v: any) => setType(v)}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company">Company Address</SelectItem>
                      <SelectItem value="shipping">Shipping Address</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name/Label</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Main Office"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="addr">Street Address</Label>
                <Input
                  id="addr"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Save Address
              </Button>
            </form>
          )}

          <div className="space-y-4">
            {addresses.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No addresses added yet</p>
            ) : (
              addresses.map((addr) => (
                <div key={addr.id} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg">
                  <div className={`p-3 rounded-full ${addr.type === 'company' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {addr.type === 'company' ? <Building className="h-5 w-5" /> : <Truck className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{addr.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${addr.type === 'company' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {addr.type === 'company' ? 'Company' : 'Shipping'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{addr.address}</p>
                    <p className="text-sm text-slate-600">{addr.city}, {addr.country}</p>
                    {addr.phone && <p className="text-sm text-slate-500">{addr.phone}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}