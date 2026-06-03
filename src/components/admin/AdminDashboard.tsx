import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CreateCustomer } from './CreateCustomer';
import { CreateAdmin } from './CreateAdmin';
import { AddShipment } from './AddShipment';
import { CompanyAddresses } from './CompanyAddresses';
import { ViewAllCustomers } from './ViewAllCustomers';
import { ViewAllShipments } from './ViewAllShipments';
import { AccountsSection } from './AccountsSection';
import { CreateAnnouncement } from './CreateAnnouncement';
import { Users, Shield, Package, LogOut, MapPin, DollarSign, List, Megaphone, Truck, Menu, X, LayoutGrid } from 'lucide-react';
import type { User, Shipment, CompanyAddress, Financials, Language } from '../../types';

type AdminView =
  | 'dashboard'
  | 'create-customer'
  | 'create-admin'
  | 'add-shipment'
  | 'addresses'
  | 'view-customers'
  | 'view-shipments'
  | 'delivered-shipments'
  | 'accounts'
  | 'announcements';

interface AdminDashboardProps {
  user: User;
  customers: User[];
  shipments: Shipment[];
  addresses: CompanyAddress[];
  financials: Financials;
  onCreateCustomer: (username: string, password: string, name: string, address: string, phone: string) => void;
  onCreateAdmin: (username: string, password: string) => void;
  onAddShipment: (data: { customerId: string; customerName: string; sizeCBM: number; costUSD: number; arrivalDate: string }) => void;
  onAddAddress: (data: Omit<CompanyAddress, 'id'>) => void;
  onUpdateShipmentStatus: (shipmentId: string, status: Shipment['status']) => void;
  onCreateAnnouncement: (title: string, message: string) => void;
  onLogout: () => void;
  onLanguageChange: (lang: Language) => void;
  currentLanguage: Language;
}

export function AdminDashboard({
  user,
  customers,
  shipments,
  addresses,
  financials,
  onCreateCustomer,
  onCreateAdmin,
  onAddShipment,
  onAddAddress,
  onUpdateShipmentStatus,
  onCreateAnnouncement,
  onLogout,
  onLanguageChange,
  currentLanguage,
}: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [success, setSuccess] = useState('');

  const handleCreateCustomer = (username: string, password: string, name: string, address: string, phone: string) => {
    setSuccess('');
    onCreateCustomer(username, password, name, address, phone);
    setSuccess('Customer account created successfully!');
  };

  const handleCreateAdmin = (username: string, password: string) => {
    setSuccess('');
    onCreateAdmin(username, password);
    setSuccess('Administrator account created successfully!');
  };

  const handleAddShipment = (data: { customerId: string; customerName: string; sizeCBM: number; costUSD: number; arrivalDate: string }) => {
    setSuccess('');
    onAddShipment(data);
    setSuccess(`Shipment added successfully! Notification sent to ${data.customerName}.`);
  };

  const handleCreateAnnouncement = (title: string, message: string) => {
    setSuccess('');
    onCreateAnnouncement(title, message);
    setSuccess('Announcement sent to all customers!');
  };

  const navItems: { id: AdminView; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'create-customer', label: 'Create Customer', icon: Users },
    { id: 'create-admin', label: 'Create Admin', icon: Shield },
    { id: 'add-ipment', label: 'Add Shipment', icon: Package },
    { id: 'view-shipments', label: 'Manage Shipments', icon: Truck },
    { id: 'delivered-shipments', label: 'Delivered History', icon: List },
    { id: 'view-customers', label: 'All Customers', icon: Users },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'accounts', label: 'Financials', icon: DollarSign },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 start-0 z-50 w-72 bg-white border-e border-slate-200 shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden lg:border-0'}`}>
        <div className="p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://iili.io/qzL5Xx2.md.png" alt="Almwanaa Logo" className="h-10 w-auto object-contain" />
              <div>
                <h1 className="font-bold text-slate-900 text-lg tracking-tight">Admin Panel</h1>
                <p className="text-xs text-slate-500 font-medium">Management System</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</div>
          {navItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentView(item.id); setSuccess(''); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2">System</div>
          {navItems.slice(6).map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentView(item.id); setSuccess(''); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-3 px-2">
            <button onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ar' : 'en')} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              {currentLanguage === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {user.name?.charAt(0) || user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name || user.username}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl h-10 text-sm font-medium" onClick={onLogout}>
            <LogOut className="h-4 w-4 me-2" />Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!isSidebarOpen && (
                <Button variant="outline" size="sm" onClick={() => setIsSidebarOpen(true)} className="h-9 w-9 rounded-lg border-slate-200 hover:bg-slate-100 p-0">
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {navItems.find(i => i.id === currentView)?.label}
                </h2>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {success && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />{success}
              </div>
            )}

            {currentView === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard title="Total Customers" value={customers.length} icon={Users} color="blue" />
                  <StatCard title="Total Shipments" value={shipments.length} icon={Package} color="purple" />
                  <StatCard title="In Transit" value={financials.inTransitCount} icon={Truck} color="blue" subValue={`$${financials.inTransitTotal.toFixed(2)} value`} />
                  <StatCard title="Revenue" value={`$${financials.deliveredTotal.toFixed(2)}`} icon={DollarSign} color="emerald" subValue={`${financials.deliveredCount} delivered`} />
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 border-slate-200 shadow-sm">
                    <CardHeader><CardTitle className="text-base font-semibold">Quick Actions</CardTitle></CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <QuickActionButton label="Add Shipment" icon={Package} onClick={() => setCurrentView('add-shipment')} />
                        <QuickActionButton label="New Customer" icon={Users} onClick={() => setCurrentView('create-customer')} />
                        <QuickActionButton label="Announce" icon={Megaphone} onClick={() => setCurrentView('announcements')} />
                        <QuickActionButton label="View All" icon={List} onClick={() => setCurrentView('view-shipments')} />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200 shadow-sm bg-slate-50">
                    <CardHeader><CardTitle className="text-base font-semibold text-slate-900">System Status</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Database</span>
                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Server Load</span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full border border-blue-200">12%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentView === 'create-customer' && <CreateCustomer onCreateCustomer={handleCreateCustomer} />}
            {currentView === 'create-admin' && <CreateAdmin onCreateAdmin={handleCreateAdmin} />}
            {currentView === 'add-shipment' && <AddShipment customers={customers} onAddShipment={handleAddShipment} />}
            {currentView === 'addresses' && <CompanyAddresses addresses={addresses} onAddAddress={onAddAddress} />}
            {currentView === 'view-customers' && <ViewAllCustomers customers={customers} />}
            {currentView === 'view-shipments' && <ViewAllShipments shipments={shipments} onUpdateStatus={onUpdateShipmentStatus} />}
            {currentView === 'delivered-shipments' && <ViewAllShipments shipments={shipments.filter(s => s.status === 'Delivered')} onUpdateStatus={onUpdateShipmentStatus} title="Delivered Shipments" />}
            {currentView === 'accounts' && <AccountsSection financials={financials} />}
            {currentView === 'announcements' && <CreateAnnouncement onCreateAnnouncement={handleCreateAnnouncement} />}
          </div>
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'blue' | 'purple' | 'emerald' | 'amber';
  subValue?: string;
}

function StatCard({ title, value, icon: Icon, color, subValue }: StatCardProps) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
  };

  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            {subValue && <p className="text-xs text-slate-400 mt-1">{subValue}</p>}
          </div>
          <div className={`p-3 rounded-xl border ${colorClasses[color] || colorClasses.blue} group-hover:scale-110 transition-transform`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionButton({ label, icon: Icon, onClick }: { label: string; icon: React.ElementType; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all group">
      <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors mb-2">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium text-slate-600 group-hover:text-blue-700">{label}</span>
    </button>
  );
}