import { Shipment } from '../types/shipment';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ShipmentHistoryProps {
  shipment: Shipment;
}

const statusIcons = {
  pending: Clock,
  'in-transit': Truck,
  delivered: CheckCircle,
  exception: AlertCircle,
};

const statusColors = {
  pending: 'bg-slate-100 text-slate-600 border-slate-200',
  'in-transit': 'bg-blue-100 text-blue-600 border-blue-200',
  delivered: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  exception: 'bg-red-100 text-red-600 border-red-200',
};

const statusLabels = {
  pending: 'Pending',
  'in-transit': 'In Transit',
  delivered: 'Delivered',
  exception: 'Exception',
};

export function ShipmentHistory({ shipment }: ShipmentHistoryProps) {
  const StatusIcon = statusIcons[shipment.status];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">Shipment Details</CardTitle>
            <p className="text-slate-500 text-sm mt-1">
              Tracking: {shipment.trackingNumber}
            </p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusColors[shipment.status]}`}>
            <StatusIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{statusLabels[shipment.status]}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">From</p>
            <p className="font-medium text-slate-900">{shipment.origin}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">To</p>
            <p className="font-medium text-slate-900">{shipment.destination}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Est. Delivery</p>
            <p className="font-medium text-slate-900">{shipment.estimatedDelivery}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Tracking History</h3>
          <div className="space-y-0">
            {shipment.events.map((event, index) => {
              const EventIcon = statusIcons[event.status];
              const isLast = index === shipment.events.length - 1;
              
              return (
                <div key={event.id} className="flex gap-4 pb-6 relative">
                  {!isLast && (
                    <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-slate-200" />
                  )}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${statusColors[event.status]}`}>
                    <EventIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{event.description}</p>
                        <p className="text-sm text-slate-500">{event.location}</p>
                      </div>
                      <p className="text-sm text-slate-400 whitespace-nowrap">{event.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}