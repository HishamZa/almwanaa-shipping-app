import { Shipment } from '../types';

const SUPABASE_URL = 'https://guxzjqrmzqrmeybdzgxo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1eHpqcXJtenFybWV5YmR6Z3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDIyODQsImV4cCI6MjA4ODQxODI4NH0.Ro9lxMNRUdd2mnh6LtCN5Zd6glSQV9SRqmBkqD0G5hI';
const REST_URL = `${SUPABASE_URL}/rest/v1`;

const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

// Helper to map DB row (snake_case) to App Shipment type (camelCase)
const mapDbRowToShipment = (row: any): Shipment => ({
  id: row.id,
  customerId: row.customer_id,
  customerName: row.customer_name,
  sizeCBM: parseFloat(row.size_cbm),
  costUSD: parseFloat(row.cost_usd),
  arrivalDate: row.arrival_date,
  status: row.status,
  trackingNumber: row.tracking_number,
  createdAt: new Date(row.created_at).toISOString().split('T')[0],
});

export const supabaseShipmentUtils = {
  createShipment: async (data: {
    customerId: string;
    customerName: string;
    sizeCBM: number;
    costUSD: number;
    arrivalDate: string;
  }): Promise<Shipment> => {
    const trackingNumber = `TRK${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    const response = await fetch(`${REST_URL}/shipments`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        customer_id: data.customerId,
        customer_name: data.customerName,
        size_cbm: data.sizeCBM,
        cost_usd: data.costUSD,
        arrival_date: data.arrivalDate,
        tracking_number: trackingNumber,
        status: 'Received in the Warehouse',
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create shipment');
    }

    const [newShipment] = await response.json();
    return mapDbRowToShipment(newShipment);
  },

  getShipmentsByCustomerId: async (customerId: string): Promise<Shipment[]> => {
    const response = await fetch(`${REST_URL}/shipments?customer_id=eq.${customerId}&order=created_at.desc`, {
      headers: headers
    });

    if (!response.ok) throw new Error('Failed to fetch shipments');
    const data = await response.json();
    return data.map(mapDbRowToShipment);
  },

  getAllShipments: async (): Promise<Shipment[]> => {
    const response = await fetch(`${REST_URL}/shipments?order=created_at.desc`, {
      headers: headers
    });

    if (!response.ok) throw new Error('Failed to fetch shipments');
    const data = await response.json();
    return data.map(mapDbRowToShipment);
  },

  updateShipmentStatus: async (shipmentId: string, status: Shipment['status']): Promise<Shipment | null> => {
    const response = await fetch(`${REST_URL}/shipments?id=eq.${shipmentId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ status })
    });

    if (!response.ok) throw new Error('Failed to update shipment');
    
    const [data] = await response.json();
    return data ? mapDbRowToShipment(data) : null;
  },

  getFinancials: async () => {
    const shipments = await supabaseShipmentUtils.getAllShipments();
    
    const delivered = shipments.filter(s => s.status === 'Delivered');
    const inTransit = shipments.filter(s => s.status !== 'Delivered');
    
    const deliveredTotal = delivered.reduce((sum, s) => sum + s.costUSD, 0);
    const inTransitTotal = inTransit.reduce((sum, s) => sum + s.costUSD, 0);
    
    return {
      deliveredTotal,
      deliveredCount: delivered.length,
      inTransitTotal,
      inTransitCount: inTransit.length,
    };
  },
};