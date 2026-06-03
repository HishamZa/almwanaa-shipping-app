import { useState } from 'react';
import type { User, Shipment, ShipmentStatus, CompanyAddress, Notification, Announcement, Language } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Package, MapPin, Bell, LogOut, Globe, Truck, Home, Check } from 'lucide-react';

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

export function CustomerDashboard({ user, shipments, addresses, notifications, announcements, onLogout, onLanguageChange, onMarkNotificationRead }: {
  user: User; shipments: Shipment[]; addresses: CompanyAddress[]; notifications: Notification[]; announcements: Announcement[];
  onLogout: () => void; onLanguageChange: (l: Language) => void; onMarkNotificationRead: (id: string) => void;
}) {
  const [lang, setLang] = useState<Language>(user.preferredLanguage || 'en');
  const [showNotif, setShowNotif] = useState(false);
  const ur = notifications.filter(n => !n.read).length;

  const stats = [
    { label: 'In Transit', value: shipments.filter(s => s.status === 'Shipped in the Sea').length, icon: <Truck className="h-5 w-5 text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Delivered', value: shipments.filter(s => s.status === 'Delivered').length, icon: <Check className="h-5 w-5 text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'In Warehouse', value: shipments.filter(s => s.status === 'Received in the Warehouse' || s.status === 'Arrived at Baghdad Warehouse').length, icon: <Home className="h-5 w-5 text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Total CBM', value: shipments.reduce((a, s) => a + s.sizeCBM, 0).toFixed(1), icon: <Package className="h-5 w-5 text-purple-600" />, bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col w-full">
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3 min-w-0">
            <img src="https://iili.io/qzL5Xx2.md.png" alt="Logo" className="h-10 w-auto object-contain flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-slate-900 truncate">My Shipments</h1>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{user.name || user.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={() => { const l = lang === 'en' ? 'ar' : 'en'; setLang(l); onLanguageChange(l); }} className="rounded-xl h-9 px-3 text-xs"><Globe className="h-4 w-4 mr-1" />{lang === 'en' ? 'AR' : 'EN'}</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowNotif(!showNotif)} className="rounded-xl h-9 px-3 text-xs relative"><Bell className="h-4 w-4" />{ur > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">{ur}</span>}</Button>
            <Button variant="outline" size="sm" onClick={onLogout} className="rounded-xl border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 h-9 px-3 text-xs"><LogOut className="h-3.5 w-3.5 mr-1" />Logout</Button>
          </div>
        </div>
      </header>

      {showNotif && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setShowNotif(false)}>
          <div className="absolute right-4 top-16 w-80 max-h-96 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-4" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 mb-3">Notifications</h3>
            {notifications.length === 0 ? <p className="text-slate-400 text-sm">No notifications</p> : (
              <div className="space-y-2">{notifications.map(n => (
                <div key={n.id} onClick={() => { if (!n.read) onMarkNotificationRead(n.id); }} className={`p-3 rounded-xl border cursor-pointer transition-colors ${n.read ? 'bg-white border-slate-100' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'}`}>
                  <p className={`text-sm ${n.read ? 'text-slate-500' : 'text-blue-900 font-medium'}`}>{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{n.createdAt}</p>
                </div>
              ))}</div>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {announcements.length > 0 && (
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3"><Bell className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" /><div><h3 className="font-semibold text-blue-900 text-sm">{announcements[0].title}</h3><p className="text-blue-700 text-sm mt-1">{announcements[0].message}</p></div></div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((c, i) => (
            <Card key={i} className="border-slate-200/80"><CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3"><div className={`p-2.5 ${c.bg} rounded-xl`}>{c.icon}</div><div><p className="text-xs text-slate-500 font-medium">{c.label}</p><p className="text-xl font-bold text-slate-900">{c.value}</p></div></div>
            </CardContent></Card>
          ))}
        </div>

        <Card className="border-slate-200/80">
          <CardHeader className="pb-4"><CardTitle className="text-lg flex items-center gap-2"><Package className="h-5 w-5 text-blue-600" />My Shipments ({shipments.length})</CardTitle></CardHeader>
          <CardContent>
            {shipments.length === 0 ? (
              <div className="text-center py-12 text-slate-400"><Package className="h-12 w-12 mx-auto mb-3 opacity-50" /><p className="font-medium">No shipments found</p></div>
            ) : (
              <div className="space-y-4">{shipments.map(s => (
                <div key={s.id} className="p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <StBadge status={s.status} />
                    <span className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded">#{s.id}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-400 text-xs block mb-1">CBM</span><span className="font-bold text-slate-900 text-lg">{s.sizeCBM}</span></div>
                    <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-400 text-xs block mb-1">Cost</span><span className="font-bold text-emerald-700 text-lg">${s.costUSD}</span></div>
                    <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-400 text-xs block mb-1">Arrival</span><span className="font-semibold text-slate-900">{s.arrivalDate}</span></div>
                    <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-400 text-xs block mb-1">Created</span><span className="font-semibold text-slate-900">{s.createdAt}</span></div>
                  </div>
                </div>
              ))}</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80">
          <CardHeader className="pb-4"><CardTitle className="text-lg flex items-center gap-2"><MapPin className="h-5 w-5 text-blue-600" />Company Addresses</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">{addresses.map(a => (
              <div key={a.id} className="p-4 bg-white rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 text-sm">{a.label}</h4><p className="text-slate-600 text-sm mt-1">{a.address}</p><p className="text-slate-500 text-xs mt-1">{a.contactName} &bull; {a.phone}</p></div>
            ))}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}