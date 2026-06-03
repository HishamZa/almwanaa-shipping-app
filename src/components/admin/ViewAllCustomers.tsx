import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, MapPin } from 'lucide-react';
import { User } from '../../types';

interface ViewAllCustomersProps {
  customers: User[];
}

export function ViewAllCustomers({ customers }: ViewAllCustomersProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <CardTitle>All Registered Customers</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {customers.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No customers registered yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Shipping Mark</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Address</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Phone</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">{customer.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">@{customer.username}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        <MapPin className="h-3 w-3" />
                        {customer.shippingMark || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{customer.address || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{customer.phone || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}