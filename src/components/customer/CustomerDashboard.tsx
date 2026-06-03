import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Package, Bell, LogOut, CheckCircle, ArrowRight, MapPin, X, Box, DollarSign, Calendar, Truck, Clock } from 'lucide-react';
import { User, Shipment, Notification, CompanyAddress, Announcement } from '../../types';
import { notificationUtils } from '../../utils/mockData';
import { CustomerAddresses } from './CustomerAddresses';
import { AnnouncementsList } from './AnnouncementsList';
import { ShippingMarkGenerator } from './ShippingMarkGenerator';

type CustomerView = 'shipments' | 'addresses' | 'announcements';
type ShipmentFilter = 'all' | 'active' | 'delivered';

interface CustomerDashboardProps {
  user: User;
  shipments: Shipment[];
  addresses: CompanyAddress[];
  announcements: Announcement[];
  onLogout: () => void;
}

export function CustomerDashboard({ user, shipments, addresses, announcements, onLogout }: CustomerDashboardProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentView, setCurrentView] = useState<CustomerView>('shipments');
  const [filter, setFilter] = useState<ShipmentFilter>('all');
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  useEffect(() => {
    setNotifications(notificationUtils.getNotificationsByUserId(user.id));
  }, [user.id]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    notificationUtils.markAsRead(notificationId);
    setNotifications(notificationUtils.getNotificationsByUserId(user.id));
  };

  const filteredShipments = shipments.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'delivered') return s.status === 'Delivered';
    if (filter === 'active') return s.status !== 'Delivered';
    return true;
  });

  const getProgress = (status: Shipment['status']) => {
    switch (status) {
      case 'Received in the Warehouse': return 25;
      case 'Shipped in the Sea': return 50;
      case 'Arrived at Baghdad Warehouse': return 75;
      case 'Delivered': return 100;
      default: return 0;
    }
  };

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'Received in the Warehouse': return 'bg-slate-500';
      case 'Shipped in the Sea': return 'bg-blue-500';
      case 'Arrived at Baghdad Warehouse': return 'bg-indigo-500';
      case 'Delivered': return 'bg-emerald-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col w-full overflow-x-hidden">
      {/* Modern Header - Responsive */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-md bg-white/90">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {/* Logo Image */}
              <img 
                src="https://iili.io/qzL5Xx2.md.png" 
                alt="Almwanaa Logo" 
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight truncate">Customer Portal</h1>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">
                  Welcome, {user.name || user.username}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Notification Dropdown Wrapper */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
                  className="relative rounded-xl hover:bg-slate-100 h-9 w-9 sm:h-10 sm:w-10 transition-all duration-200 ease-out active:scale-90 active:bg-slate-200 group"
                >
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 group-hover:text-slate-900 transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] sm:text-[10px] rounded-full h-4 w-4 sm:h-4.5 sm:w-4.5 flex items-center justify-center font-bold border-2 border-white shadow-sm animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Notification Dropdown */}
                {isNotificationPanelOpen && (
                  <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-[600px] flex flex-col animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 ease-out">
                    {/* Dropdown Header */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                            <Bell className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                            <p className="text-[10px] text-slate-500">{unreadCount} unread</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setIsNotificationPanelOpen(false)}
                          className="h-7 w-7 rounded-lg hover:bg-slate-200 transition-colors active:scale-95"
                        >
                          <X className="h-3.5 w-3.5 text-slate-500" />
                        </Button>
                      </div>
                    </div>

                    {/* Dropdown Content */}
                    <div className="flex-1 overflow-y-auto p-3">
                      {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <div className="bg-slate-100 w-14 h-14 rounded-full flex items-center justify-center mb-3">
                            <Bell className="h-7 w-7 text-slate-300" />
                          </div>
                          <p className="text-slate-600 font-semibold text-sm">All caught up!</p>
                          <p className="text-xs text-slate-400 mt-1">No new notifications.</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-xl border transition-all duration-200 ${
                                notification.read 
                                  ? 'bg-slate-50 border-slate-100' 
                                  : 'bg-white border-blue-100 shadow-sm'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <p className="text-xs text-slate-800 leading-snug font-medium break-words">{notification.message}</p>
                                {!notification.read && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1 shadow-sm shadow-blue-300" />
                                )}
                              </div>
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/50">
                                <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                                  <Clock className="h-2.5 w-2.5" />
                                  {new Date(notification.createdAt).toLocaleDateString()}
                                </p>
                                {!notification.read && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 text-[10px] text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-1.5 font-medium transition-colors active:scale-95"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    Mark read
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1" />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm font-medium transition-all active:scale-95"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4 me-1.5 sm:me-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation Tabs - Responsive Full Width on Mobile */}
        <div className="flex gap-1 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 sm:mb-8 w-full overflow-x-auto no-scrollbar">
          {[
            { id: 'shipments' as CustomerView, label: 'My Shipments', icon: Package },
            { id: 'addresses' as CustomerView, label: 'Addresses', icon: MapPin },
            { id: 'announcements' as CustomerView, label: 'Announcements', icon: Bell },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`
                  flex items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 relative overflow-hidden flex-1 whitespace-nowrap active:scale-95
                  ${isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Shipments View */}
        {currentView === 'shipments' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <StatCard 
                title="Total Shipments" 
                value={shipments.length} 
                icon={Box} 
                color="slate"
              />
              <StatCard 
                title="In Transit" 
                value={shipments.filter(s => s.status !== 'Delivered').length} 
                icon={Truck} 
                color="blue"
              />
              <StatCard 
                title="Delivered" 
                value={shipments.filter(s => s.status === 'Delivered').length} 
                icon={CheckCircle} 
                color="emerald"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 p-1 bg-slate-900/50 rounded-xl w-fit">
              {(['all', 'active', 'delivered'] as ShipmentFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`
                    px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-all
                    ${filter === f 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }
                  `}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Shipments List */}
            <div className="space-y-4">
              {filteredShipments.length === 0 ? (
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-slate-800 p-4 rounded-full mb-4">
                      <Package className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No Shipments Found</h3>
                    <p className="text-slate-400 text-sm max-w-xs">
                      {filter === 'all' 
                        ? "You haven't made any shipments yet." 
                        : `No ${filter} shipments available.`}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredShipments.map((shipment) => (
                  <Card key={shipment.id} className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-slate-800 rounded-xl">
                            <Package className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Tracking Number</p>
                            <p className="text-sm sm:text-base font-bold text-white">{shipment.trackingNumber}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          shipment.status === 'Delivered' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          {shipment.status}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>Progress</span>
                          <span>{getProgress(shipment.status)}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getStatusColor(shipment.status)} transition-all duration-500 ease-out`}
                            style={{ width: `${getProgress(shipment.status)}%` }}
                          />
                        </div>
                      </div>

                      {/* Shipment Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Size (CBM)</p>
                          <p className="font-semibold text-white">{shipment.sizeCBM}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Cost (USD)</p>
                          <p className="font-semibold text-white">${shipment.costUSD.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Est. Arrival</p>
                          <p className="font-semibold text-white">{new Date(shipment.arrivalDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Created</p>
                          <p className="font-semibold text-white">{new Date(shipment.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Addresses View */}
        {currentView === 'addresses' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ShippingMarkGenerator user={user} />
            <CustomerAddresses addresses={addresses} />
          </div>
        )}

        {/* Announcements View */}
        {currentView === 'announcements' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AnnouncementsList announcements={announcements} />
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: 'slate' | 'blue' | 'emerald' | 'indigo' | 'amber';
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    slate: 'bg-slate-800 text-slate-400',
    blue: 'bg-blue-500/10 text-blue-400',
    emerald: 'bg-emerald-500/10 text-emerald-400',
    indigo: 'bg-indigo-500/10 text-indigo-400',
    amber: 'bg-amber-500/10 text-amber-400',
  };

  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mb-1">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}