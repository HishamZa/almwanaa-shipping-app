import { Shipment, Warehouse } from '../types/shipment';

export const mockShipments: Record<string, Shipment> = {
  'TRK123456789': {
    trackingNumber: 'TRK123456789',
    status: 'in-transit',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    estimatedDelivery: '2025-04-15',
    events: [
      {
        id: '1',
        date: '2025-04-10',
        status: 'pending',
        location: 'Los Angeles, CA',
        description: 'Package received from sender',
      },
      {
        id: '2',
        date: '2025-04-11',
        status: 'in-transit',
        location: 'Phoenix, AZ',
        description: 'Departed facility',
      },
      {
        id: '3',
        date: '2025-04-12',
        status: 'in-transit',
        location: 'Denver, CO',
        description: 'Arrived at sorting facility',
      },
      {
        id: '4',
        date: '2025-04-13',
        status: 'in-transit',
        location: 'Chicago, IL',
        description: 'In transit to destination',
      },
    ],
  },
  'TRK987654321': {
    trackingNumber: 'TRK987654321',
    status: 'delivered',
    origin: 'Seattle, WA',
    destination: 'Miami, FL',
    estimatedDelivery: '2025-04-08',
    events: [
      {
        id: '1',
        date: '2025-04-03',
        status: 'pending',
        location: 'Seattle, WA',
        description: 'Package received from sender',
      },
      {
        id: '2',
        date: '2025-04-05',
        status: 'in-transit',
        location: 'Dallas, TX',
        description: 'Departed facility',
      },
      {
        id: '3',
        date: '2025-04-08',
        status: 'delivered',
        location: 'Miami, FL',
        description: 'Delivered to front desk',
      },
    ],
  },
  'TRK555555555': {
    trackingNumber: 'TRK555555555',
    status: 'exception',
    origin: 'Boston, MA',
    destination: 'Atlanta, GA',
    estimatedDelivery: '2025-04-14',
    events: [
      {
        id: '1',
        date: '2025-04-09',
        status: 'pending',
        location: 'Boston, MA',
        description: 'Package received from sender',
      },
      {
        id: '2',
        date: '2025-04-11',
        status: 'in-transit',
        location: 'Washington, DC',
        description: 'Departed facility',
      },
      {
        id: '3',
        date: '2025-04-13',
        status: 'exception',
        location: 'Charlotte, NC',
        description: 'Delivery attempted - no access',
      },
    ],
  },
};

export const mockWarehouses: Warehouse[] = [
  {
    id: 'wh1',
    name: 'West Coast Hub',
    address: '123 Logistics Blvd',
    city: 'Los Angeles',
    state: 'CA',
    position: { x: 15, y: 65 },
  },
  {
    id: 'wh2',
    name: 'Central Distribution',
    address: '456 Shipping Way',
    city: 'Chicago',
    state: 'IL',
    position: { x: 55, y: 40 },
  },
  {
    id: 'wh3',
    name: 'East Coast Facility',
    address: '789 Delivery Drive',
    city: 'New York',
    state: 'NY',
    position: { x: 85, y: 35 },
  },
];

export const getShipmentByTrackingNumber = (trackingNumber: string): Shipment | null => {
  return mockShipments[trackingNumber] || null;
};

export const updateShipmentStatus = (trackingNumber: string, newStatus: Shipment['status']): boolean => {
  const shipment = mockShipments[trackingNumber];
  if (shipment) {
    shipment.status = newStatus;
    return true;
  }
  return false;
};