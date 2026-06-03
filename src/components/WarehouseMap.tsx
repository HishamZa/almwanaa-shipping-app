import { useState } from 'react';
import { Warehouse } from '../types/shipment';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin } from 'lucide-react';

interface WarehouseMapProps {
  warehouses: Warehouse[];
}

export function WarehouseMap({ warehouses }: WarehouseMapProps) {
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Warehouse Locations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          {/* Simple map background representation */}
          <div className="absolute inset-0 bg-slate-100">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 49%, #cbd5e1 49%, #cbd5e1 51%, transparent 51%),
                  linear-gradient(transparent 49%, #cbd5e1 49%, #cbd5e1 51%, transparent 51%)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>
          </div>

          {/* Warehouse pins */}
          {warehouses.map((warehouse) => (
            <button
              key={warehouse.id}
              onClick={() => setSelectedWarehouse(warehouse)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${warehouse.position.x}%`, top: `${warehouse.position.y}%` }}
            >
              <div className={`relative transition-transform group-hover:scale-110 ${selectedWarehouse?.id === warehouse.id ? 'scale-110' : ''}`}>
                <MapPin className={`h-6 w-6 ${selectedWarehouse?.id === warehouse.id ? 'text-blue-600' : 'text-slate-400'}`} />
                <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${selectedWarehouse?.id === warehouse.id ? 'bg-blue-600' : 'bg-slate-400'}`} />
              </div>
            </button>
          ))}

          {/* Tooltip */}
          {selectedWarehouse && (
            <div
              className="absolute bg-white border border-slate-200 rounded-lg shadow-lg p-3 min-w-48 z-10"
              style={{ left: `${selectedWarehouse.position.x}%`, top: `${selectedWarehouse.position.y - 15}%` }}
            >
              <button
                onClick={() => setSelectedWarehouse(null)}
                className="absolute top-1 right-1 text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
              <p className="font-semibold text-slate-900 text-sm">{selectedWarehouse.name}</p>
              <p className="text-xs text-slate-500 mt-1">{selectedWarehouse.address}</p>
              <p className="text-xs text-slate-500">{selectedWarehouse.city}, {selectedWarehouse.state}</p>
            </div>
          )}
        </div>

        {/* Warehouse list */}
        <div className="space-y-2">
          {warehouses.map((warehouse) => (
            <button
              key={warehouse.id}
              onClick={() => setSelectedWarehouse(warehouse)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedWarehouse?.id === warehouse.id
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <p className="font-medium text-slate-900">{warehouse.name}</p>
              <p className="text-sm text-slate-500">{warehouse.address}, {warehouse.city}, {warehouse.state}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}