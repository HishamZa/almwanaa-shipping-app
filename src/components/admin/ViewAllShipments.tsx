import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Package, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import { Shipment } from '../../types';

interface ViewAllShipmentsProps {
  shipments: Shipment[];
  deliveredOnly?: boolean;
  onUpdateStatus: (shipmentId: string, status: Shipment['status']) => void;
}

export function ViewAllShipments({ shipments, deliveredOnly = false, onUpdateStatus }: ViewAllShipmentsProps) {
  const filteredShipments = deliveredOnly 
    ? shipments.filter(s => s.status === 'Delivered')
    : shipments.filter(s => s.status !== 'Delivered');

  const getStatusIcon = (status: Shipment['status']) => {
    switch (status) {
      case 'Received in the Warehouse':
        return <Package className="h-4 w-4 text-slate-500" />;
      case 'Shipped in the Sea':
        return <ArrowRight className="h-4 w-4 text-blue-600" />;
      case 'Arrived at Baghdad Warehouse':
        return <MapPin className="h-4 w-4 text-indigo-600" />;
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
    }
  };

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'Received in the Warehouse':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Shipped in the Sea':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Arrived at Baghdad Warehouse':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-emerald-600" />
          <CardTitle>{deliveredOnly ? 'Delivered Shipments' : 'All Active Shipments'}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {filteredShipments.length === 0 ? (
          <p className="text-slate-500 text-center py-8">
            {deliveredOnly ? 'No delivered shipments yet' : 'No active shipments'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Tracking #</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Size (CBM)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Est. Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Arrival Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                  {!deliveredOnly && <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">{shipment.trackingNumber}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{shipment.customerName}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{shipment.sizeCBM}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">${shipment.costUSD.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{shipment.arrivalDate}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                        {getStatusIcon(shipment.status)}
                        {shipment.status}
                      </span>
                    </td>
                    {!deliveredOnly && (
                      <td className="py-3 px-4">
                        <Select
                          value={shipment.status}
                          onValueChange={(value: any) => onUpdateStatus(shipment.id, value)}
                        >
                          <SelectTrigger className="w-40 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Received in the Warehouse">Received</SelectItem>
                            <SelectItem value="Shipped in the Sea">Shipped</SelectItem>
                            <SelectItem value="Arrived at Baghdad Warehouse">In Baghdad</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    )}
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