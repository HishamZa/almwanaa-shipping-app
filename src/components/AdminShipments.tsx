import { useState } from 'react';
import type { User, Shipment, ShipmentStatus } from '../types';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Package, Plus, Home, Truck, MapPin, Check } from 'lucide-react';

function StBadge({ status }: { status: ShipmentStatus }) {
  const c: Record<ShipmentStatus, string> = {
    'Received in the Warehouse': 'bg-slate-100 text-slate-700',
    'Shipped in the Sea': 'bg-blue-100 text-blue-700',
    'Arrived at Baghdad Warehouse': 'bg-indigo-100 text-indigo-700',
    'Delivered': 'bg-emerald-100 text-emerald-700',
  };
  const ic: Record<ShipmentStatus, React.ReactNode> = {
    'Received in the Warehouse': <Home className="h-3.5 w-3.5" />,
    'Shipped in the Sea': <Truck className="h-3.5 w-3.5" />,
    'Arrived at Baghdad Warehouse': <MapPin className="h-3.5 w-3.5" />,
    'Delivered': <Check className="h-3.5 w-3.5" />,
  };
  return <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${c[status]}`}>{ic[status]}{status}</span>;
}

const ALL_ST: ShipmentStatus[] = ['Received in the Warehouse', 'Shipped in the Sea', 'Arrived at Baghdad Warehouse', 'Delivered'];

export function AdminShipments({ shipments, customers, onUpdateStatus, onAddShipment }: {
  shipments: Shipment[]; customers: User[];
  onUpdateStatus: (id: string, st: ShipmentStatus) => void;
  onAddShipment: (d: { customerId: string; customerName: string; sizeCBM: number; costUSD: number; arrivalDate: string }) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [sC, setSC] = useState('');
  const [sB, setSB] = useState('');
  const [sU, setSU] = useState('');
  const [sD, setSD] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const cust = customers.find(x => x.id === sC);
    if (!cust) { setErr('Please select a customer'); return; }
    const cbm = parseFloat(sB);
    const cost = parseFloat(sU);
    if (isNaN(cbm) || cbm <= 0) { setErr('Invalid CBM'); return; }
    if (isNaN(cost) || cost <= 0) { setErr('Invalid cost'); return; }
    if (!sD) { setErr('Please select arrival date'); return; }
    onAddShipment({ customerId: cust.id, customerName: cust.name || cust.username, sizeCBM: cbm, costUSD: cost, arrivalDate: sD });
    setSC(''); setSB(''); setSU(''); setSD(''); setErr('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/80">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2"><Package className="h-5 w-5 text-blue-600" />All Shipments ({shipments.length})</CardTitle>
            <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold h-9 px-4 text-xs"><Plus className="h-4 w-4 mr-1.5" />Add Shipment</Button>
          </div>
        </CardHeader>
        <CardContent>
          {shipments.length === 0 ? (
            <div className="text-center py-12 text-slate-400"><Package className="h-12 w-12 mx-auto mb-3 opacity-50" /><p className="font-medium">No shipments yet</p></div>
          ) : (
            <div className="space-y-3">{shipments.map(s => (
              <div key={s.id} className="p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3"><StBadge status={s.status} /><span className="text-xs text-slate-400 font-mono">#{s.id}</span></div>
                  <select value={s.status} onChange={e => onUpdateStatus(s.id, e.target.value as ShipmentStatus)} className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                    {ALL_ST.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                  <div className="bg-slate-50 rounded-lg p-2.5"><span className="text-slate-400 text-xs block mb-0.5">Customer</span><span className="font-semibold text-slate-900 truncate">{s.customerName}</span></div>
                  <div className="bg-slate-50 rounded-lg p-2.5"><span className="text-slate-400 text-xs block mb-0.5">CBM</span><span className="font-bold text-slate-900">{s.sizeCBM}</span></div>
                  <div className="bg-slate-50 rounded-lg p-2.5"><span className="text-slate-400 text-xs block mb-0.5">Cost</span><span className="font-bold text-emerald-700">${s.costUSD}</span></div>
                  <div className="bg-slate-50 rounded-lg p-2.5"><span className="text-slate-400 text-xs block mb-0.5">Arrival</span><span className="font-semibold text-slate-900">{s.arrivalDate}</span></div>
                  <div className="bg-slate-50 rounded-lg p-2.5"><span className="text-slate-400 text-xs block mb-0.5">Created</span><span className="font-semibold text-slate-900">{s.createdAt}</span></div>
                </div>
              </div>
            ))}</div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-4"><CardTitle className="text-lg flex items-center gap-2"><Plus className="h-5 w-5 text-blue-600" />New Shipment</CardTitle></CardHeader>
          <CardContent>
            {err && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium mb-4">{err}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium text-sm">Customer</Label>
                  <select value={sC} onChange={e => setSC(e.target.value)} required className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select customer</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name || c.username}</option>)}
                  </select>
                </div>
                <div className="space-y-2"><Label className="text-slate-700 font-medium text-sm">Size (CBM)</Label><Input type="number" step="0.1" min="0.1" value={sB} onChange={e => setSB(e.target.value)} placeholder="e.g. 2.5" required className="h-10 rounded-xl border-slate-200" /></div>
                <div className="space-y-2"><Label className="text-slate-700 font-medium text-sm">Cost (USD)</Label><Input type="number" step="0.01" min="1" value={sU} onChange={e => setSU(e.target.value)} placeholder="e.g. 500" required className="h-10 rounded-xl border-slate-200" /></div>
                <div className="space-y-2"><Label className="text-slate-700 font-medium text-sm">Arrival Date</Label><Input type="date" value={sD} onChange={e => setSD(e.target.value)} required className="h-10 rounded-xl border-slate-200" /></div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold h-10 px-6">Create Shipment</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setErr(''); }} className="rounded-xl border-slate-200 h-10 px-6">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}