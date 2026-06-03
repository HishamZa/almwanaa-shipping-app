import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { DollarSign, TrendingUp, Package, AlertCircle } from 'lucide-react';

interface Financials {
  deliveredTotal: number;
  deliveredCount: number;
  inTransitTotal: number;
  inTransitCount: number;
}

interface AccountsSectionProps {
  financials?: Financials;
}

export function AccountsSection({ financials }: AccountsSectionProps) {
  // Provide default values to prevent undefined errors
  const {
    deliveredTotal = 0,
    deliveredCount = 0,
    inTransitTotal = 0,
    inTransitCount = 0,
  } = financials || {};

  const profit = deliveredTotal * 0.15; // Assuming 15% profit margin

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Delivered Shipments Revenue */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-emerald-900">Delivered Shipments</h3>
                <Package className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-700">Total Revenue</span>
                  <span className="font-bold text-emerald-900">${deliveredTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-700">Shipment Count</span>
                  <span className="font-medium text-emerald-900">{deliveredCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-700">Average Value</span>
                  <span className="font-medium text-emerald-900">
                    ${deliveredCount > 0 ? (deliveredTotal / deliveredCount).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* In-Transit Shipments Value */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-blue-900">In-Transit Shipments</h3>
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Total Value</span>
                  <span className="font-bold text-blue-900">${inTransitTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Shipment Count</span>
                  <span className="font-medium text-blue-900">{inTransitCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profit Summary */}
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">Estimated Profit (15%)</h3>
                <p className="text-sm text-slate-500">Based on delivered shipments revenue</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">${profit.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}