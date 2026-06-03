import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { authUtils, shipmentUtils, addressUtils, announcementUtils } from './utils/mockData';
import type { User, Shipment, CompanyAddress, Announcement, Language } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [customers, setCustomers] = useState<User[]>(authUtils.getAllCustomers());
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [addresses, setAddresses] = useState<CompanyAddress[]>(addressUtils.getAddresses());
  const [announcements, setAnnouncements] = useState<Announcement[]>(announcementUtils.getAnnouncements());
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        setCurrentUser(user);
        setCurrentLanguage(user.preferredLanguage || 'en');

        if (user.role === 'customer') {
          setShipments(shipmentUtils.getShipmentsByCustomerId(user.id));
        } else {
          setShipments(shipmentUtils.getAllShipments());
        }
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = authUtils.authenticate(username, password);
    if (user) {
      setCurrentUser(user);
      setLoginError('');
      setCurrentLanguage(user.preferredLanguage || 'en');
      localStorage.setItem('currentUser', JSON.stringify(user));

      if (user.role === 'customer') {
        setShipments(shipmentUtils.getShipmentsByCustomerId(user.id));
      } else {
        setShipments(shipmentUtils.getAllShipments());
      }
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginError('');
    setShipments([]);
    setCurrentLanguage('en');
    localStorage.removeItem('currentUser');
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    if (currentUser) {
      authUtils.updateUserLanguage(currentUser.id, lang);
      const updatedUser = { ...currentUser, preferredLanguage: lang };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const handleCreateCustomer = (username: string, password: string, name: string, address: string, phone: string) => {
    const newUser = authUtils.createUser(username, password, 'customer');
    if (newUser) {
      authUtils.updateUser(newUser.id, { name, address, phone });
      setCustomers(authUtils.getAllCustomers());
    }
  };

  const handleCreateAdmin = (username: string, password: string) => {
    authUtils.createUser(username, password, 'admin');
  };

  const handleAddShipment = (data: {
    customerId: string;
    customerName: string;
    sizeCBM: number;
    costUSD: number;
    arrivalDate: string;
  }) => {
    shipmentUtils.createShipment(data);
    setShipments(shipmentUtils.getAllShipments());
  };

  const handleAddAddress = (data: Omit<CompanyAddress, 'id'>) => {
    addressUtils.addAddress(data);
    setAddresses(addressUtils.getAddresses());
  };

  const handleUpdateShipmentStatus = (shipmentId: string, status: Shipment['status']) => {
    shipmentUtils.updateShipmentStatus(shipmentId, status);
    if (currentUser?.role === 'customer') {
      setShipments(shipmentUtils.getShipmentsByCustomerId(currentUser.id));
    } else {
      setShipments(shipmentUtils.getAllShipments());
    }
  };

  const handleCreateAnnouncement = (title: string, message: string) => {
    announcementUtils.createAnnouncement(title, message, currentUser?.username || 'Admin');
    setAnnouncements(announcementUtils.getAnnouncements());
  };

  const financials = shipmentUtils.getFinancials();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  if (currentUser.role === 'admin') {
    return (
      <AdminDashboard
        user={currentUser}
        customers={customers}
        shipments={shipments}
        addresses={addresses}
        financials={financials}
        onCreateCustomer={handleCreateCustomer}
        onCreateAdmin={handleCreateAdmin}
        onAddShipment={handleAddShipment}
        onAddAddress={handleAddAddress}
        onUpdateShipmentStatus={handleUpdateShipmentStatus}
        onCreateAnnouncement={handleCreateAnnouncement}
        onLogout={handleLogout}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />
    );
  }

  return (
    <CustomerDashboard
      user={currentUser}
      shipments={shipments}
      addresses={addresses}
      announcements={announcements}
      onLogout={handleLogout}
      onLanguageChange={handleLanguageChange}
      currentLanguage={currentLanguage}
    />
  );
}

export default App;