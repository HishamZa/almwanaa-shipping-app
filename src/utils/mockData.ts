import type { User, Shipment, Notification, Announcement, CompanyAddress, ShipmentStatus, Financials, Language } from '../types';

const defaultAdmin: User = {
  id: 'admin-1',
  username: 'Almwanaa',
  password: '12872000',
  role: 'admin',
  name: 'System Administrator',
  address: '',
  phone: '',
  shippingMark: '',
  preferredLanguage: 'en',
  createdAt: '2025-01-01',
};

const defaultCustomer: User = {
  id: 'customer-1',
  username: 'test',
  password: '12341234',
  role: 'customer',
  name: 'Test Customer',
  address: '123 Test Street, Baghdad',
  phone: '+964-770-000-0000',
  shippingMark: 'TM-001',
  preferredLanguage: 'en',
  createdAt: '2025-01-15',
};

let users: User[] = [defaultAdmin, defaultCustomer];

let shipments: Shipment[] = [
  {
    id: 'shipment-1',
    customerId: 'customer-1',
    customerName: 'Test Customer',
    sizeCBM: 1.5,
    costUSD: 150.00,
    arrivalDate: '2025-05-20',
    status: 'Received in the Warehouse',
    trackingNumber: 'TRK-RCV-001',
    createdAt: '2025-04-14',
  },
  {
    id: 'shipment-2',
    customerId: 'customer-1',
    customerName: 'Test Customer',
    sizeCBM: 2.0,
    costUSD: 200.00,
    arrivalDate: '2025-05-25',
    status: 'Shipped in the Sea',
    trackingNumber: 'TRK-SHP-002',
    createdAt: '2025-04-10',
  },
  {
    id: 'shipment-3',
    customerId: 'customer-1',
    customerName: 'Test Customer',
    sizeCBM: 0.5,
    costUSD: 50.00,
    arrivalDate: '2025-04-10',
    status: 'Delivered',
    trackingNumber: 'TRK-DLV-003',
    createdAt: '2025-04-01',
  },
  {
    id: 'shipment-4',
    customerId: 'customer-1',
    customerName: 'Test Customer',
    sizeCBM: 3.0,
    costUSD: 300.00,
    arrivalDate: '2025-06-05',
    status: 'Arrived at Baghdad Warehouse',
    trackingNumber: 'TRK-BGH-004',
    createdAt: '2025-04-20',
  },
];

let notifications: Notification[] = [];

let announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Welcome to the New System',
    message: 'We are excited to launch our new shipment tracking system. Please check your dashboard regularly for updates.',
    createdAt: new Date().toISOString(),
    createdBy: 'System',
  },
];

let companyAddresses: CompanyAddress[] = [
  {
    id: 'addr-1',
    type: 'company',
    name: 'موقع الشركة',
    address: 'بغداد - زيونة شارع اسواق الاء',
    city: 'بغداد',
    country: 'العراق',
    phone: '07766900224 - 07766900225',
  },
  {
    id: 'addr-2',
    type: 'shipping',
    name: 'Guangzhou Warehouse',
    address: '广州市南沙区新垦镇红港村长堤西路中自编324号A12道 宇哲仓库',
    city: 'Guangzhou',
    country: 'China',
    phone: '18828514141',
  },
];

export const authUtils = {
  authenticate: (username: string, password: string): User | null => {
    const user = users.find((u: User) => u.username === username && u.password === password);
    return user || null;
  },

  createUser: (username: string, password: string, role: 'admin' | 'customer'): User | null => {
    if (users.find((u: User) => u.username === username)) {
      return null;
    }
    const newUser: User = {
      id: `${role}-${Date.now()}`,
      username,
      password,
      role,
      name: '',
      address: '',
      phone: '',
      shippingMark: '',
      preferredLanguage: 'en',
      createdAt: new Date().toISOString().split('T')[0],
    };
    users.push(newUser);
    return newUser;
  },

  updateUser: (userId: string, updates: Partial<User>): User | null => {
    const index = users.findIndex((u: User) => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      return users[index];
    }
    return null;
  },

  updateUserLanguage: (userId: string, language: Language): User | null => {
    const index = users.findIndex((u: User) => u.id === userId);
    if (index !== -1) {
      users[index].preferredLanguage = language;
      return users[index];
    }
    return null;
  },

  getAllCustomers: (): User[] => {
    return users.filter((u: User) => u.role === 'customer');
  },
};

export const shipmentUtils = {
  createShipment: (data: {
    customerId: string;
    customerName: string;
    sizeCBM: number;
    costUSD: number;
    arrivalDate: string;
  }): Shipment => {
    const shipment: Shipment = {
      id: `shipment-${Date.now()}`,
      customerId: data.customerId,
      customerName: data.customerName,
      sizeCBM: data.sizeCBM,
      costUSD: data.costUSD,
      arrivalDate: data.arrivalDate,
      status: 'Received in the Warehouse',
      trackingNumber: `TRK${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    shipments.push(shipment);

    const notification: Notification = {
      id: `notif-${Date.now()}`,
      userId: data.customerId,
      message: `New shipment ${shipment.trackingNumber} has been received in the warehouse.`,
      shipmentId: shipment.id,
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifications.push(notification);

    return shipment;
  },

  getShipmentsByCustomerId: (customerId: string): Shipment[] => {
    return shipments.filter((s: Shipment) => s.customerId === customerId);
  },

  getAllShipments: (): Shipment[] => {
    return shipments;
  },

  updateShipmentStatus: (shipmentId: string, status: ShipmentStatus): Shipment | null => {
    const index = shipments.findIndex((s: Shipment) => s.id === shipmentId);
    if (index !== -1) {
      const oldStatus = shipments[index].status;
      shipments[index].status = status;

      if (oldStatus !== status) {
        const notif: Notification = {
          id: `notif-${Date.now()}`,
          userId: shipments[index].customerId,
          message: `Shipment ${shipments[index].trackingNumber} status updated to: ${status}`,
          shipmentId: shipmentId,
          read: false,
          createdAt: new Date().toISOString(),
        };
        notifications.push(notif);
      }

      return shipments[index];
    }
    return null;
  },

  getFinancials: (): Financials => {
    const delivered = shipments.filter((s: Shipment) => s.status === 'Delivered');
    const inTransit = shipments.filter((s: Shipment) => s.status !== 'Delivered');

    const deliveredTotal = delivered.reduce((sum: number, s: Shipment) => sum + s.costUSD, 0);
    const inTransitTotal = inTransit.reduce((sum: number, s: Shipment) => sum + s.costUSD, 0);

    return {
      deliveredTotal,
      deliveredCount: delivered.length,
      inTransitTotal,
      inTransitCount: inTransit.length,
    };
  },
};

export const addressUtils = {
  getAddresses: (): CompanyAddress[] => {
    return companyAddresses;
  },

  addAddress: (data: Omit<CompanyAddress, 'id'>): CompanyAddress => {
    const newAddress: CompanyAddress = {
      id: `addr-${Date.now()}`,
      ...data,
    };
    companyAddresses.push(newAddress);
    return newAddress;
  },
};

export const announcementUtils = {
  getAnnouncements: (): Announcement[] => {
    return announcements.sort((a: Announcement, b: Announcement) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createAnnouncement: (title: string, message: string, createdBy: string): Announcement => {
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      message,
      createdAt: new Date().toISOString(),
      createdBy,
    };
    announcements.unshift(newAnnouncement);
    return newAnnouncement;
  },
};

export const notificationUtils = {
  getNotificationsByUserId: (userId: string): Notification[] => {
    return notifications.filter((n: Notification) => n.userId === userId);
  },

  markAsRead: (notificationId: string): void => {
    const notif = notifications.find((n: Notification) => n.id === notificationId);
    if (notif) {
      notif.read = true;
    }
  },
};