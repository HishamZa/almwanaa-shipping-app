export interface ShipmentEvent {
  id: string;
  date: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'exception';
  location: string;
  description: string;
}

export interface Shipment {
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'exception';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  events: ShipmentEvent[];
}

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  position: { x: number; y: number };
}