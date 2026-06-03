import type { User, Shipment, Notification, Announcement, CompanyAddress, ShipmentStatus, Financials, Language } from './types';

let users: User[] = [
  { id: 'admin-1', username: 'Almwanaa', password: '12872000', role: 'admin', name: 'System Administrator', address: '', phone: '', shippingMark: '', preferredLanguage: 'en', createdAt: '2025-01-01' },
  { id: 'customer-1', username: 'test', password: '12341234', role: 'customer', name: 'Test Customer', address: '123 Test Street, Baghdad', phone: '+964-770-000-0000', shippingMark: 'TM-001', preferredLanguage: 'en', createdAt: '2025-01-15' },
];

let shipments: Shipment[] = [
  { id: 's1', customerId: 'customer-1', customerName: 'Test Customer', sizeCBM: 1.5, costUSD: 150, arrivalDate: '2025-05-20', status: 'Received in the Warehouse', trackingNumber: 'TRK-RCV-001', createdAt: '2025-04-14' },
  { id: 's2', customerId: 'customer-1', customerName: 'Test Customer', sizeCBM: 2.0, costUSD: 200, arrivalDate: '2025-05-25', status: 'Shipped in the Sea', trackingNumber: 'TRK-SHP-002', createdAt: '2025-04-10' },
  { id: 's3', customerId: 'customer-1', customerName: 'Test Customer', sizeCBM: 0.5, costUSD: 50, arrivalDate: '2025-04-10', status: 'Delivered', trackingNumber: 'TRK-DLV-003', createdAt: '2025-04-01' },
  { id: 's4', customerId: 'customer-1', customerName: 'Test Customer', sizeCBM: 3.0, costUSD: 300, arrivalDate: '2025-06-05', status: 'Arrived at Baghdad Warehouse', trackingNumber: 'TRK-BGH-004', createdAt: '2025-04-20' },
];

let notifications: Notification[] = [];
let announcements: Announcement[] = [
  { id: 'ann-1', title: 'Welcome to the New System', message: 'We are excited to launch our new shipment tracking system.', createdAt: new Date().toISOString(), createdBy: 'System' },
];

let companyAddresses: CompanyAddress[] = [
  { id: 'addr-1', type: 'company', name: 'موقع الشركة', address: 'بغداد - زيونة شارع اسواق الاء', city: 'بغداد', country: 'العراق', phone: '07766900224 - 07766900225' },
  { id: 'addr-2', type: 'shipping', name: 'Guangzhou Warehouse', address: '广州市南沙区新垦镇红港村长堤西路中自编324号A12道 宇哲仓库', city: 'Guangzhou', country: 'China', phone: '18828514141' },
];

export const db = {
  auth: (u: string, p: string): User | null => users.find(x => x.username === u && x.password === p) || null,
  addUser: (u: string, p: string, r: UserRole): User | null => {
    if (users.find(x => x.username === u)) return null;
    const n: User = { id: `${r}-${Date.now()}`, username: u, password: p, role: r, name: '', address: '', phone: '', shippingMark: '', preferredLanguage: 'en', createdAt: new Date().toISOString().split('T')[0] };
    users.push(n); return n;
  },
  updateUser: (id: string, d: Partial<User>): User | null => {
    const i = users.findIndex(x => x.id === id);
    if (i !== -1) { users[i] = { ...users[i], ...d }; return users[i]; } return null;
  },
  customers: (): User[] => users.filter(x => x.role === 'customer'),
  
  shipments: (): Shipment[] => [...shipments],
  customerShipments: (id: string): Shipment[] => shipments.filter(x => x.customerId === id),
  addShipment: (d: { customerId: string; customerName: string; sizeCBM: number; costUSD: number; arrivalDate: string }): Shipment => {
    const s: Shipment = { id: `s-${Date.now()}`, ...d, status: 'Received in the Warehouse', trackingNumber: `TRK${Math.random().toString(36).substring(2, 11).toUpperCase()}`, createdAt: new Date().toISOString().split('T')[0] };
    shipments.push(s);
    notifications.push({ id: `n-${Date.now()}`, userId: d.customerId, message: `New shipment ${s.trackingNumber} received.`, shipmentId: s.id, read: false, createdAt: new Date().toISOString() });
    return s;
  },
  updateStatus: (id: string, status: ShipmentStatus): Shipment | null => {
    const i = shipments.findIndex(x => x.id === id);
    if (i !== -1) { const old = shipments[i].status; shipments[i].status = status; if (old !== status) notifications.push({ id: `n-${Date.now()}`, userId: shipments[i].customerId, message: `Shipment ${shipments[i].trackingNumber} updated to: ${status}`, shipmentId: id, read: false, createdAt: new Date().toISOString() }); return shipments[i]; } return null;
  },
  financials: (): Financials => {
    const d = shipments.filter(s => s.status === 'Delivered');
    const t = shipments.filter(s => s.status !== 'Delivered');
    return { deliveredTotal: d.reduce((a, s) => a + s.costUSD, 0), deliveredCount: d.length, inTransitTotal: t.reduce((a, s) => a + s.costUSD, 0), inTransitCount: t.length };
  },

  addresses: (): CompanyAddress[] => [...companyAddresses],
  addAddress: (d: Omit<CompanyAddress, 'id'>): CompanyAddress => { const a: CompanyAddress = { id: `a-${Date.now()}`, ...d }; companyAddresses.push(a); return a; },

  announcements: (): Announcement[] => [...announcements].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  addAnnouncement: (title: string, message: string, by: string): Announcement => { const a: Announcement = { id: `ann-${Date.now()}`, title, message, createdAt: new Date().toISOString(), createdBy: by }; announcements.unshift(a); return a; },

  notifications: (userId: string): Notification[] => notifications.filter(n => n.userId === userId),
  markRead: (id: string): void => { const n = notifications.find(x => x.id === id); if (n) n.read = true; },
};