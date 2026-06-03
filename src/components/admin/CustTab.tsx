import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { auth } from '../../utils/mockData';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2 } from 'lucide-react';
export default function CustTab() {
const { t } = useLanguage();
const [list, setList] = useState(auth.customers());
const [showAdd, setShowAdd] = useState(false);
const [un, setUn] = useState('');
const [pw, setPw] = useState('');
const refresh = () => setList(auth.customers());
const doAdd = () => { if (un && pw) { auth.addUser(un, pw); setShowAdd(false); setUn(''); setPw(''); refresh(); } };
const doDel = (id: string) => { auth.delUser(id); refresh(); };
return (
<div className="space-y-4">
<div className="flex items-center justify-between"><h3 className="font-semibold text-slate-800">{t('nav.cust')}</h3><Button size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" />{t('c.add')}</Button></div>
{showAdd && <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3"><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><Input placeholder="Username" value={un} onChange={e => setUn(e.target.value)} /><Input placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} /></div><div className="flex gap-2"><Button size="sm" onClick={doAdd}>{t('act.save')}</Button><Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>{t('act.cancel')}</Button></div></div>}
<div className="space-y-3">{list.map(c => (
<div key={c.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0"><span className="text-emerald-700 font-bold text-sm">{(c.name || c.username)[0].toUpperCase()}</span></div>
<div className="flex-1 min-w-0"><p className="font-medium text-slate-800">{c.name || c.username}</p><p className="text-xs text-slate-500">@{c.username} · {c.phone || 'No phone'}</p></div>
<Button size="sm" variant="destructive" onClick={() => doDel(c.id)}><Trash2 className="w-3 h-3" /></Button>
</div>))}
{list.length === 0 && <p className="text-center text-slate-400 py-8">{t('c.none')}</p>}
</div>
</div>
);
}