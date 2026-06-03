import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { UserPlus, Shield, Package, MapPin, Users, DollarSign, Megaphone } from 'lucide-react';
import type { User, Shipment, CompanyAddress, Financials, ShipmentStatus } from '../../types';

const statusColors: Record<ShipmentStatus, string> = {
  'Received in the Warehouse': 'bg-amber-100 text-amber-800 border-amber-200',
  'Shipped in the Sea': 'bg-blue-100 text-blue-800 border-blue-200',
  'Arrived at Baghdad Warehouse': 'bg-purple-100 text-purple-800 border-purple-200',
  'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-200',
};
const allStatuses: ShipmentStatus[] = ['Received in the Warehouse', 'Shipped in the Sea', 'Arrived at Baghdad Warehouse', 'Delivered'];

export function CreateCustomer({ onCreateCustomer }: { onCreateCustomer: (u: string, p: string, n: string, a: string, ph: string) => void }) {
  const [u, setU] = useState(''); const [p, setP] = useState(''); const [n, setN] = useState(''); const [a, setA] = useState(''); const [ph, setPh] = useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onCreateCustomer(u, p, n, a, ph); setU(''); setP(''); setN(''); setA(''); setPh(''); };
  return (<Card><CardHeader><div className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-blue-600" /><CardTitle>Create Customer Account</CardTitle></div><CardDescription>Add a new customer</CardDescription></CardHeader>
  <CardContent><form onSubmit={handleSubmit} className="space-y-4">
    <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Username *</Label><Input value={u} onChange={e => setU(e.target.value)} required /></div><div className="space-y-2"><Label>Password *</Label><Input type="password" value={p} onChange={e => setP(e.target.value)} required /></div></div>
    <div className="space-y-2"><Label>Full Name *</Label><Input value={n} onChange={e => setN(e.target.value)} required /></div>
    <div className="space-y-2"><Label>Address</Label><Input value={a} onChange={e => setA(e.target.value)} /></div>
    <div className="space-y-2"><Label>Phone</Label><Input value={ph} onChange={e => setPh(e.target.value)} /></div>
    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white"><UserPlus className="h-4 w-4 mr-2" />Create</Button>
  </form></CardContent></Card>);
}

export function CreateAdmin({ onCreateAdmin }: { onCreateAdmin: (u: string, p: string) => void }) {
  const [u, setU] = useState(''); const [p, setP] = useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onCreateAdmin(u, p); setU(''); setP(''); };
  return (<Card><CardHeader><div className="flex items-center gap-2"><Shield className="h-5 w-5 text-purple-600" /><CardTitle>Create Admin Account</CardTitle></div></CardHeader>
  <CardContent><form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2"><Label>Username *</Label><Input value={u} onChange={e => setU(e.target.value)} required /></div>
    <div className="space-y-2"><Label>Password *</Label><Input type="password" value={p} onChange={e => setP(e.target.value)} required /></div>
    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white"><Shield className="h-4 w-4 mr-2" />Create</Button>
  </form></CardContent></Card>);
}

export function AddShipment({ customers, onAddShipment }: { customers: User[]; onAddShipment: (d: { customerId: string; customerName: string; sizeCBM: number; costUSD: number; arrivalDate: string }) => void }) {
  const [custId, setCustId] = useState(''); const [size, setSize] = useState(''); const [cost, setCost] = useState(''); const [date, setDate] = useState('');
  const sel = customers.find(c => c.id === custId);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!sel) return; onAddShipment({ customerId: custId, customerName: sel.name || sel.username, sizeCBM: parseFloat(size), costUSD: parseFloat(cost), arrivalDate: date }); setCustId(''); setSize(''); setCost(''); setDate(''); };
  return (<Card><CardHeader><div className="flex items-center gap-2"><Package className="h-5 w-5 text-blue-600" /><CardTitle>Add Shipment</CardTitle></div></CardHeader>
  <CardContent><form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2"><Label>Customer *</Label><select value={custId} onChange={e => setCustId(e.target.value)} required className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"><option value="">Select customer</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name || c.username}</option>)}</select></div>
    <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Size (CBM) *</Label><Input type="number" step="0.01" value={size} onChange={e => setSize(e.target.value)} required /></div><div className="space-y-2"><Label>Cost (USD) *</Label><Input type="number" step="0.01" value={cost} onChange={e => setCost(e.target.value)} required /></div></div>
    <div className="space-y-2"><Label>Arrival Date *</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} required /></div>
    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white"><Package className="h-4 w-4 mr-2" />Add</Button>
  </form></CardContent></Card>);
}

export function ViewAllShipments({ shipments, onUpdateStatus, title }: { shipments: Shipment[]; onUpdateStatus: (id: string, status: ShipmentStatus) => void; title?: string }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('Received in the Warehouse');
  return (<Card><CardHeader><CardTitle>{title || 'All Shipments'}</CardTitle></CardHeader>
  <CardContent>{shipments.length === 0 ? <p className="text-slate-500 text-center py-8">No shipments found.</p> : (
    <div className="space-y-3">{shipments.map(s => (
      <div key={s.id} className="p-4 border border-slate-200 rounded-xl bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1"><span className="font-mono text-sm font-semibold text-slate-900">{s.trackingNumber}</span><span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[s.status]}`}>{s.status}</span></div>
            <p className="text-sm text-slate-600">{s.customerName} &bull; {s.sizeCBM} CBM &bull; ${s.costUSD.toFixed(2)}</p>
            <p className="text-xs text-slate-400 mt-1">Arrival: {s.arrivalDate}</p>
          </div>
          <div className="flex-shrink-0">{editingId === s.id ? (
            <div className="flex items-center gap-2"><select value={newStatus} onChange={e => setNewStatus(e.target.value as ShipmentStatus)} className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm">{allStatuses.map(st => <option key={st} value={st}>{st}</option>)}</select>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-9" onClick={() => { onUpdateStatus(s.id, newStatus); setEditingId(null); }}>Save</Button>
            <Button size="sm" variant="outline" className="h-9" onClick={() => setEditingId(null)}>Cancel</Button></div>
          ) : <Button size="sm" variant="outline" className="h-9" onClick={() => { setEditingId(s.id); setNewStatus(s.status); }}>Update</Button>}</div>
        </div>
      </div>
    ))}</div>
  )}</CardContent></Card>);
}

export function ViewAllCustomers({ customers }: { customers: User[] }) {
  return (<Card><CardHeader><div className="flex items-center gap-2"><Users className="h-5 w-5 text-blue-600" /><CardTitle>All Customers</CardTitle></div></CardHeader>
  <CardContent>{customers.length === 0 ? <p className="text-slate-500 text-center py-8">No customers.</p> : (
    <div className="space-y-3">{customers.map(c => (
      <div key={c.id} className="p-4 border border-slate-200 rounded-xl bg-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">{(c.name || c.username).charAt(0).toUpperCase()}</div>
        <div><p className="font-semibold text-slate-900">{c.name || c.username}</p><p className="text-xs text-slate-500">{c.phone || 'No phone'} &bull; {c.address || 'No address'}</p></div>
      </div>
    ))}</div>
  )}</CardContent></Card>);
}

export function CompanyAddresses({ addresses, onAddAddress }: { addresses: CompanyAddress[]; onAddAddress: (d: Omit<CompanyAddress, 'id'>) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(''); const [addr, setAddr] = useState(''); const [city, setCity] = useState(''); const [country, setCountry] = useState(''); const [phone, setPhone] = useState(''); const [type, setType] = useState<'company' | 'shipping'>('company');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onAddAddress({ name, address: addr, city, country, phone, type }); setName(''); setAddr(''); setCity(''); setCountry(''); setPhone(''); setShowForm(false); };
  return (<div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-4">{addresses.map(a => (
      <Card key={a.id} className="border-slate-200"><CardContent className="p-5"><div className="flex items-start gap-3"><div className={`p-2 rounded-lg ${a.type === 'company' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}><MapPin className="h-5 w-5" /></div><div><p className="font-semibold text-slate-900">{a.name}</p><p className="text-sm text-slate-600 mt-1">{a.address}</p><p className="text-sm text-slate-500">{a.city}, {a.country}</p><p className="text-xs text-slate-400 mt-1">{a.phone}</p></div></div></CardContent></Card>
    ))}</div>
    {!showForm ? <Button onClick={() => setShowForm(true)} variant="outline" className="border-dashed"><MapPin className="h-4 w-4 mr-2" />Add Address</Button> : (
      <Card><CardHeader><CardTitle>Add Address</CardTitle></CardHeader><CardContent><form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Type</Label><select value={type} onChange={e => setType(e.target.value as 'company' | 'shipping')} className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"><option value="company">Company</option><option value="shipping">Shipping</option></select></div><div className="space-y-2"><Label>Name *</Label><Input value={name} onChange={e => setName(e.target.value)} required /></div></div>
        <div className="space-y-2"><Label>Address *</Label><Input value={addr} onChange={e => setAddr(e.target.value)} required /></div>
        <div className="grid grid-cols-3 gap-4"><div className="space-y-2"><Label>City *</Label><Input value={city} onChange={e => setCity(e.target.value)} required /></div><div className="space-y-2"><Label>Country *</Label><Input value={country} onChange={e => setCountry(e.target.value)} required /></div><div className="space-y-2"><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div></div>
        <div className="flex gap-2"><Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button></div>
      </form></CardContent></Card>
    )}
  </div>);
}

export function AccountsSection({ financials }: { financials: Financials }) {
  return (<div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-emerald-200 bg-emerald-50/50"><CardHeader><div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-emerald-600" /><CardTitle className="text-emerald-900">Delivered Revenue</CardTitle></div></CardHeader><CardContent><p className="text-3xl font-bold text-emerald-700">${financials.deliveredTotal.toFixed(2)}</p><p className="text-sm text-emerald-600 mt-1">{financials.deliveredCount} shipments</p></CardContent></Card>
      <Card className="border-blue-200 bg-blue-50/50"><CardHeader><div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-blue-600" /><CardTitle className="text-blue-900">In Transit Value</CardTitle></div></CardHeader><CardContent><p className="text-3xl font-bold text-blue-700">${financials.inTransitTotal.toFixed(2)}</p><p className="text-sm text-blue-600 mt-1">{financials.inTransitCount} shipments</p></CardContent></Card>
    </div>
    <Card><CardHeader><CardTitle>Financial Summary</CardTitle></CardHeader><CardContent><div className="space-y-3">
      <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-600">Delivered Revenue</span><span className="font-semibold text-emerald-700">${financials.deliveredTotal.toFixed(2)}</span></div>
      <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-600">In Transit Value</span><span className="font-semibold text-blue-700">${financials.inTransitTotal.toFixed(2)}</span></div>
      <div className="flex justify-between py-2"><span className="text-slate-900 font-semibold">Total Value</span><span className="font-bold text-slate-900">${(financials.deliveredTotal + financials.inTransitTotal).toFixed(2)}</span></div>
    </div></CardContent></Card>
  </div>);
}

export function CreateAnnouncement({ onCreateAnnouncement }: { onCreateAnnouncement: (t: string, m: string) => void }) {
  const [title, setTitle] = useState(''); const [message, setMessage] = useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onCreateAnnouncement(title, message); setTitle(''); setMessage(''); };
  return (<Card><CardHeader><div className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-blue-600" /><CardTitle>Send Announcement</CardTitle></div><CardDescription>Send to all customers</CardDescription></CardHeader>
  <CardContent><form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2"><Label>Title *</Label><Input value={title} onChange={e => setTitle(e.target.value)} required /></div>
    <div className="space-y-2"><Label>Message *</Label><textarea value={message} onChange={e => setMessage(e.target.value)} required rows={4} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white"><Megaphone className="h-4 w-4 mr-2" />Send</Button>
  </form></CardContent></Card>);
}