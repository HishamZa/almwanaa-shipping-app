export type UserRole = 'admin' | 'customer';
export type Language = 'en' | 'ar';
export type ShipmentStatus = 'Received in the Warehouse' | 'Shipped in the Sea' | 'Arrived at Baghdad Warehouse' | 'Delivered';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
  address: string;
  phone: string;
  shippingMark: string;
  preferredLanguage: Language;
  createdAt: string;
}

export interface Shipment {
  id: string;
  customerId: string;
  customerName: string;
  sizeCBM: number;
  costUSD: number;
  arrivalDate: string;
  status: ShipmentStatus;
  trackingNumber: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  shipmentId: string;
  read: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  createdBy: string;
}

export interface CompanyAddress {
  id: string;
  type: 'company' | 'shipping';
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}

export interface Financials {
  deliveredTotal: number;
  deliveredCount: number;
  inTransitTotal: number;
  inTransitCount: number;
}