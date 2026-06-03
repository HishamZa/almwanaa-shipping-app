import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { MapPin, Building, Truck, Copy, Check } from 'lucide-react';
import { CompanyAddress, User } from '../../types';

interface CustomerAddressesProps {
  addresses: CompanyAddress[];
  user: User;
}

export function CustomerAddresses({ addresses, user }: CustomerAddressesProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (address: CompanyAddress) => {
    const fullAddress = `${address.name}\n${address.address}\n${address.city}, ${address.country}\n${address.phone || ''}`;
    navigator.clipboard.writeText(fullAddress);
    setCopiedId(address.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Company & Warehouse Addresses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((addr) => (
              <div key={addr.id} className="border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-full ${addr.type === 'company' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {addr.type === 'company' ? <Building className="h-6 w-6" /> : <Truck className="h-6 w-6" />}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAddress(addr)}
                    className="gap-2"
                  >
                    {copiedId === addr.id ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Address
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">{addr.name}</h4>
                    <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full font-medium ${addr.type === 'company' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {addr.type === 'company' ? 'Company Address' : 'Warehouse Address'}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>{addr.address}</p>
                    <p>{addr.city}, {addr.country}</p>
                    {addr.phone && <p className="font-medium">{addr.phone}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}