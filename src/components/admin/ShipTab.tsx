import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ship } from '../../utils/mockData';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Clock, CheckCircle, AlertTriangle, Truck, XCircle } from 'lucide-react';
import type { ShipmentStatus } from '../../types';
const sI: Record<ShipmentStatus, typeof Clock> = { pending: Clock, processing: Clock, in_transit: Truck, out_for_delivery: Truck, delivered: CheckCircle, delayed: AlertTriangle, customs_hold: AlertTriangle, exception: XCircle };
const sC: Record<ShipmentStatus, string> = { pending: 'bg-slate-100 text-slate-700', processing: 'bg-blue-100 text-blue-700', in_transit: 'bg-sky-100 text-sky-700', out_for_delivery: 'bg-indigo-100 text-indigo-700', delivered: 'bg-emerald-100 text-emerald-700', delayed: 'bg-amber-100 text-amber-700', customs_hold: 'bg-orange-100 text-orange-700', exception: 'bg-red-100 text-red-700' };
const ST: ShipmentStatus[] = ['pending', 'processing', 'in_transit', 'out_for_delivery', 'delivered', 'delayed', 'customs_hold', 'exception'];
export default function ShipTab() {
const { t } = useLanguage();
const [list, setList] = useState(ship.all());
const [editId, setEditId] = useState<string | null>(null);
const [newSt, setNewSt] = useState<ShipmentStatus>('pending');
const [showAdd, setShowAdd] = useState(false);
const [cid, setCid] = useState(''); const [cn, setCn] = useState(''); const [sz, setSz] = useState(''); const [co, setCo] = useState(''); const [eta, setEta] = useState('');
const refresh = () => setList(ship.all());
const doUpdate = () => { if (editId) { ship.setStatus(editId, newSt); setEditId(null); refresh(); } };
const doAdd = () => { if (cid && cn && sz && co && eta) { ship.add(cid, cn, Number(sz), Number(co), eta); setShowAdd(false); setCid(''); setCn(''); setSz(''); setCo(''); setEta(''); refresh(); } };
return (
<div className="space-y-4">
<div className="flex items-center justify-between"><h3 className="font-semibold text-slate-800">{t('nav.ship')}</h3><Button size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" />{t('s.add')}</Button></div>
{showAdd && <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3"><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><Input placeholder="Customer ID" value={cid} onChange={e => setCid(e.target.value)} /><Input placeholder="Customer Name" value={cn} onChange={e => setCn(e.target.value)} /><Input placeholder="Size CBM" type="number" value={sz} onChange={e => setSz(e.target.value)} /><Input placeholder="Cost USD" type="number" value={co} onChange={e => setCo(e.target.value)} /><Input placeholder="ETA" type="date" value={eta} onChange={e => setEta(e.target.value)} /></div><div className="flex gap-2"><Button size="sm" onClick={doAdd}>{t('act.save')}</Button><Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>{t('act.cancel')}</Button></div></div>}
<div className="space-y-3">{list.map(s => (
<div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4">
<div className="flex items-start gap-3">
<div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${sC[s.status]}`}>{(() => { const I = sI[s.status]; return <I className="w-5 h-5" />; })()}</div>
<div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><p className="font-semibold text-slate-800">{s.trackingNumber}</p><span className={`text-xs px-2 py-0.5 rounded-full ${sC[s.status]}`}>{t(`status.${s.status}`)}</span></div><p className="text-sm text-slate-600 mt-1">{s.origin} → {s.destination}</p><p className="text-xs text-slate-400 mt-0.5">{s.customerName} · {s.sizeCBM} CBM · ${s.costUSD}</p></div>
<Button size="sm" variant="outline" onClick={() => { setEditId(s.id); setNewSt(s.status); }}>{t('s.update')}</Button>
</div>
{editId === s.id && <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap"><select value={newSt} onChange={e => setNewSt(e.target.value as ShipmentStatus)} className="h-9 rounded-lg border border-slate-300 text-sm px-2 bg-white">{ST.map(st => <option key={st} value={st}>{t(`status.${st}`)}</option>)}</select><Button size="sm" onClick={doUpdate}>{t('act.save')}</Button><Button size="sm" variant="ghost" onClick={() => setEditId(null)}>{t('act.cancel')}</Button></div>}
<div className="mt-3 pt-3 border-t border-slate-100"><p className="text-xs font-medium text-slate-500 mb-2">{t('s.events')}</p><div className="space-y-1">{s.events.map((ev, i) => <div key={i} className="flex items-start gap-2 text-xs"><span className="text-slate-400 w-20 shrink-0">{ev.date}</span><span className={`px-1.5 py-0.5 rounded ${sC[ev.status]}`}>{t(`status.${ev.status}`)}</span><span className="text-slate-600">{ev.location}</span></div>)}</div></div>
</div>))}
{list.length === 0 && <p className="text-center text-slate-400 py-8">{t('s.none')}</p>}
</div>
</div>
);
}