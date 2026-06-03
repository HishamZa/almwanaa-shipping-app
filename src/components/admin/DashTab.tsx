import { useLanguage } from '../../contexts/LanguageContext';
import { ship } from '../../utils/mockData';
import { Clock, CheckCircle, AlertTriangle, Truck, XCircle } from 'lucide-react';
import type { ShipmentStatus } from '../../types';
const sI: Record<ShipmentStatus, typeof Clock> = { pending: Clock, processing: Clock, in_transit: Truck, out_for_delivery: Truck, delivered: CheckCircle, delayed: AlertTriangle, customs_hold: AlertTriangle, exception: XCircle };
const sC: Record<ShipmentStatus, string> = { pending: 'bg-slate-100 text-slate-700', processing: 'bg-blue-100 text-blue-700', in_transit: 'bg-sky-100 text-sky-700', out_for_delivery: 'bg-indigo-100 text-indigo-700', delivered: 'bg-emerald-100 text-emerald-700', delayed: 'bg-amber-100 text-amber-700', customs_hold: 'bg-orange-100 text-orange-700', exception: 'bg-red-100 text-red-700' };
export default function DashTab() {
const { t } = useLanguage();
const st = ship.stats();
const recent = ship.all().slice(0, 5);
const cards = [{ label: t('d.rev'), value: `$${st.revenue.toLocaleString()}`, bg: 'bg-emerald-50' }, { label: t('d.act'), value: String(st.active), bg: 'bg-blue-50' }, { label: t('d.del'), value: String(st.delivered), bg: 'bg-green-50' }, { label: t('d.tot'), value: String(st.total), bg: 'bg-purple-50' }];
return (
<div className="space-y-6">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{cards.map((c, i) => <div key={i} className={`${c.bg} rounded-xl border border-slate-200 p-5`}><p className="text-sm text-slate-600">{c.label}</p><p className="text-2xl font-bold text-slate-900 mt-1">{c.value}</p></div>)}</div>
<div className="bg-white rounded-xl border border-slate-200 p-5">
<h3 className="font-semibold text-slate-800 mb-4">{t('d.recent')}</h3>
<div className="space-y-3">{recent.map(s => { const Icon = sI[s.status]; return (
<div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
<div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sC[s.status]}`}><Icon className="w-4 h-4" /></div>
<div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-800 truncate">{s.trackingNumber}</p><p className="text-xs text-slate-500">{s.origin} → {s.destination}</p></div>
<span className={`text-xs px-2 py-1 rounded-full ${sC[s.status]}`}>{t(`status.${s.status}`)}</span>
</div>); })}</div>
</div>
</div>
);
}